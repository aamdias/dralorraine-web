import {
    randomBytes,
    randomInt,
    createHash,
    timingSafeEqual
} from "node:crypto";
import {
    isDemo,
    isAllowedEmail,
    adminOrigin,
    privateHeaders
} from "./runtime.mjs";
const TTL = 8 * 60 * 60 * 1000;
const hash = (value) => createHash("sha256").update(value).digest("hex");
function demoState() {
    return (globalThis.__crmDemoAuth ||= {
        codes: new Map(),
        sessions: new Map()
    });
}
function cookie(req, name) {
    return (
        req.cookies?.[name] ||
        String(req.headers.cookie || "")
            .split(";")
            .map((v) => v.trim())
            .find((v) => v.startsWith(`${name}=`))
            ?.slice(name.length + 1)
    );
}
function appendCookie(res, value) {
    const prior = res.getHeader("Set-Cookie");
    res.setHeader("Set-Cookie", [
        ...(Array.isArray(prior) ? prior : prior ? [prior] : []),
        value
    ]);
}
export async function neonServer(req, res) {
    const { createAuthServer, serializeSetCookie, extractNeonAuthCookies } =
        await import("@neondatabase/auth/server");
    const baseUrl = process.env.NEON_AUTH_BASE_URL,
        secret = process.env.NEON_AUTH_COOKIE_SECRET;
    if (
        !baseUrl ||
        !secret ||
        secret.length < 32 ||
        new URL(baseUrl).protocol !== "https:"
    )
        throw new Error(
            "Configure Neon Auth URL and a 32+ character cookie secret."
        );
    return createAuthServer({
        baseUrl,
        cookieSecret: secret,
        sessionDataTtl: 60,
        sameSite: "strict",
        context: () => ({
            getCookies: () => extractNeonAuthCookies(req.headers.cookie || ""),
            setCookie: (name, value, options) =>
                appendCookie(
                    res,
                    serializeSetCookie({ name, value, ...options })
                ),
            getHeader: (name) => req.headers[name.toLowerCase()] || null,
            getOrigin: () => adminOrigin(req),
            getFramework: () => "nextjs-pages"
        }),
        log: {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {}
        }
    });
}
export async function currentUser(req, res) {
    adminOrigin(req);
    privateHeaders(res);
    if (isDemo()) {
        const token = cookie(req, "crm_demo_session"),
            data = token ? demoState().sessions.get(hash(token)) : null;
        if (!data || data.expires <= Date.now() || !isAllowedEmail(data.email))
            return null;
        return {
            id: data.email,
            email: data.email,
            name: data.email.startsWith("lorraine") ? "Lorraine" : "Alan",
            demo: true
        };
    }
    const auth = await neonServer(req, res);
    const { data, error } = await auth.getSession({
        query: { disableCookieCache: "true" }
    });
    if (
        error ||
        !data?.user ||
        !data?.session ||
        !data.user.emailVerified ||
        !isAllowedEmail(data.user.email)
    )
        return null;
    const created = new Date(data.session.createdAt).getTime();
    if (!Number.isFinite(created) || Date.now() - created > TTL) return null;
    return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name || data.user.email,
        demo: false
    };
}
export async function requireAdmin(ctx) {
    let user = null;
    try {
        user = await currentUser(ctx.req, ctx.res);
    } catch {
        privateHeaders(ctx.res);
    }
    return user
        ? null
        : { redirect: { destination: "/admin/login", permanent: false } };
}
export async function sendCode(email, req, res) {
    if (!isAllowedEmail(email)) return {};
    if (isDemo()) {
        const state = demoState(),
            now = Date.now(),
            previous = state.codes.get(email);
        if (previous && previous.sent + 60000 > now) {
            const e = new Error(
                "Aguarde um minuto antes de pedir outro código."
            );
            e.status = 429;
            throw e;
        }
        const code = String(randomInt(100000, 1000000));
        state.codes.set(email, {
            digest: hash(code),
            expires: now + 5 * 60 * 1000,
            sent: now,
            attempts: 0
        });
        return { demoCode: code };
    }
    const auth = await neonServer(req, res);
    const { error } = await auth.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in"
    });
    if (error) {
        const e = new Error(
            error.status === 429
                ? "Aguarde antes de pedir outro código."
                : "Não foi possível enviar o código. Tente novamente."
        );
        e.status = error.status === 429 ? 429 : 502;
        throw e;
    }
    return {};
}
export async function verifyCode(email, otp, req, res) {
    if (
        !isAllowedEmail(email) ||
        typeof otp !== "string" ||
        !/^\d{6}$/.test(otp)
    )
        return null;
    if (isDemo()) {
        const state = demoState(),
            challenge = state.codes.get(email);
        if (
            !challenge ||
            challenge.expires <= Date.now() ||
            challenge.attempts >= 5
        )
            return null;
        challenge.attempts++;
        if (
            !timingSafeEqual(
                Buffer.from(challenge.digest),
                Buffer.from(hash(otp))
            )
        )
            return null;
        state.codes.delete(email);
        const token = randomBytes(32).toString("base64url");
        state.sessions.set(hash(token), { email, expires: Date.now() + TTL });
        appendCookie(
            res,
            `crm_demo_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
                TTL / 1000
            }`
        );
        return { id: email, email, demo: true };
    }
    const auth = await neonServer(req, res);
    const { data, error } = await auth.signIn.emailOtp({ email, otp });
    if (error || !data?.user?.emailVerified || !isAllowedEmail(data.user.email))
        return null;
    return { id: data.user.id, email: data.user.email, demo: false };
}
export async function signOut(req, res) {
    if (isDemo()) {
        const token = cookie(req, "crm_demo_session");
        if (token) demoState().sessions.delete(hash(token));
        appendCookie(
            res,
            "crm_demo_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
        );
        return;
    }
    const auth = await neonServer(req, res);
    const { error } = await auth.signOut();
    if (error) throw new Error("Não foi possível encerrar a sessão.");
}
