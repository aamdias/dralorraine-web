import crypto from "crypto";

// ────────────────────────────────────────────────────────────────────────────
// Minimal signed-cookie auth for /admin/* pages.
//
// Why custom, not next-auth / iron-session?
//   - One user (Dra. Lorraine), one password. A full auth library is overkill.
//   - HMAC-signed cookie is stateless, survives redeploys, doesn't need a
//     session store.
//
// Env vars required:
//   ADMIN_PASSWORD       — the password typed in at /admin/login
//   ADMIN_SESSION_SECRET — 32+ random bytes (run:
//                         `openssl rand -hex 32`) — signs the cookie
//
// Cookie format: `<base64url(payload)>.<base64url(hmacSha256(payload))>`
// Payload: { exp } in milliseconds. Default session lifetime: 24h.
// ────────────────────────────────────────────────────────────────────────────

const COOKIE_NAME = "admin_auth";
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function getSecret() {
    const s = process.env.ADMIN_SESSION_SECRET;
    if (!s || s.length < 16) {
        throw new Error(
            "ADMIN_SESSION_SECRET env var missing or too short (need ≥16 chars)"
        );
    }
    return s;
}

export function signToken(payload) {
    const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const sig = crypto
        .createHmac("sha256", getSecret())
        .update(data)
        .digest("base64url");
    return `${data}.${sig}`;
}

export function verifyToken(token) {
    if (!token || typeof token !== "string") return null;
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;

    let expected;
    try {
        expected = crypto
            .createHmac("sha256", getSecret())
            .update(data)
            .digest("base64url");
    } catch {
        return null;
    }

    // Constant-time compare
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;

    let payload;
    try {
        payload = JSON.parse(Buffer.from(data, "base64url").toString());
    } catch {
        return null;
    }

    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
}

export function createSessionCookie({ ttlMs = DEFAULT_TTL_MS } = {}) {
    const token = signToken({ exp: Date.now() + ttlMs });
    const maxAge = Math.floor(ttlMs / 1000);
    const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
    return `${COOKIE_NAME}=${token}; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearSessionCookie() {
    const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
    return `${COOKIE_NAME}=; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=0`;
}

// Parse a cookie header string for the admin cookie. Next.js API routes
// already parse req.cookies, but getServerSideProps receives raw headers.
export function readTokenFromRequest(req) {
    // API route path
    if (req.cookies && req.cookies[COOKIE_NAME]) {
        return req.cookies[COOKIE_NAME];
    }
    // getServerSideProps path
    const cookieHeader = req.headers?.cookie || "";
    const match = cookieHeader
        .split(";")
        .map((s) => s.trim())
        .find((s) => s.startsWith(`${COOKIE_NAME}=`));
    return match ? match.slice(COOKIE_NAME.length + 1) : null;
}

// Use from getServerSideProps to gate /admin/* pages.
export function requireAdmin(ctx) {
    const token = readTokenFromRequest(ctx.req);
    const payload = verifyToken(token);
    if (!payload) {
        return {
            redirect: {
                destination: `/admin/login?next=${encodeURIComponent(ctx.resolvedUrl || "/admin/consultas")}`,
                permanent: false
            }
        };
    }
    return null; // ok, caller proceeds
}

// Constant-time password compare.
export function passwordMatches(input) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || typeof input !== "string") return false;
    const a = Buffer.from(input);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
}
