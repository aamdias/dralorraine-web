import test from "node:test";
import assert from "node:assert/strict";
import {
    currentUser,
    sendCode,
    verifyCode,
    signOut
} from "../../utils/crm/auth.mjs";
import {
    isDemo,
    allowedEmails,
    assertSameOrigin,
    safeNext
} from "../../utils/crm/runtime.mjs";
const req = {
    headers: {
        host: "127.0.0.1:3000",
        origin: "http://127.0.0.1:3000",
        "content-type": "application/json"
    }
};
function response() {
    const headers = new Map();
    return {
        setHeader: (k, v) => headers.set(k, v),
        getHeader: (k) => headers.get(k)
    };
}
test("local email codes are one-use, bounded, revocable and never accept the old password cookie", async () => {
    process.env.NODE_ENV = "development";
    process.env.CRM_DEMO = "true";
    const res = response();
    const { demoCode } = await sendCode("alan@example.test", req, res);
    assert.match(demoCode, /^\d{6}$/);
    assert.equal(
        await verifyCode("alan@example.test", "000000", req, res),
        null
    );
    assert.equal(
        (await verifyCode("alan@example.test", demoCode, req, res)).email,
        "alan@example.test"
    );
    assert.equal(
        await verifyCode("alan@example.test", demoCode, req, res),
        null
    );
    const authenticated = {
        headers: {
            ...req.headers,
            cookie: res.getHeader("Set-Cookie")[0].split(";")[0]
        }
    };
    assert.equal(
        (await currentUser(authenticated, response())).email,
        "alan@example.test"
    );
    assert.equal(
        await currentUser(
            {
                headers: {
                    ...req.headers,
                    cookie: "admin_auth=legacy-password-token"
                }
            },
            response()
        ),
        null
    );
    await signOut(authenticated, response());
    assert.equal(await currentUser(authenticated, response()), null);
    const { demoCode: expiredCode } = await sendCode(
        "alan@example.test",
        req,
        response()
    );
    const originalNow = Date.now;
    Date.now = () => originalNow() + 6 * 60 * 1000;
    try {
        assert.equal(
            await verifyCode("alan@example.test", expiredCode, req, response()),
            null
        );
    } finally {
        Date.now = originalNow;
    }
    assert.deepEqual(
        await sendCode("outsider@example.test", req, response()),
        {}
    );
    const { demoCode: second } = await sendCode(
        "lorraine@example.test",
        req,
        response()
    );
    for (let i = 0; i < 5; i++)
        assert.equal(
            await verifyCode(
                "lorraine@example.test",
                "000000",
                req,
                response()
            ),
            null
        );
    assert.equal(
        await verifyCode("lorraine@example.test", second, req, response()),
        null
    );
    await assert.rejects(
        () => sendCode("lorraine@example.test", req, response()),
        (e) => e.status === 429
    );
});
test("production fails closed for demo mode, invalid allowlists, wrong origins and redirects", () => {
    process.env.NODE_ENV = "production";
    process.env.CRM_DEMO = "true";
    assert.throws(isDemo);
    delete process.env.CRM_DEMO;
    process.env.CRM_ALLOWED_EMAILS = "";
    assert.throws(allowedEmails);
    process.env.CRM_ALLOWED_EMAILS = "a@example.test,a@example.test";
    assert.throws(allowedEmails);
    process.env.CRM_ALLOWED_EMAILS = "alan@example.test,lorraine@example.test";
    assert.equal(allowedEmails().length, 2);
    assert.throws(() =>
        assertSameOrigin({
            headers: {
                host: "admin.dralorraine.com",
                origin: "https://evil.example",
                "content-type": "application/json"
            }
        })
    );
    assert.throws(() =>
        assertSameOrigin({
            headers: {
                host: "dralorraine.com",
                origin: "https://dralorraine.com",
                "content-type": "application/json"
            }
        })
    );
    assert.equal(safeNext("//evil.example"), "/admin");
    assert.equal(safeNext("/admin//evil.example"), "/admin");
    assert.equal(
        safeNext("/admin/online?consulta=42"),
        "/admin/online?consulta=42"
    );
    assert.equal(safeNext("/admin\\evil"), "/admin");
});
test("Neon adapter uses OTP APIs, sanitizes cookies and validates revoked/unauthorized sessions upstream", async () => {
    process.env.NODE_ENV = "production";
    delete process.env.CRM_DEMO;
    process.env.CRM_ALLOWED_EMAILS = "alan@example.test,lorraine@example.test";
    process.env.NEON_AUTH_BASE_URL = "https://unit.neon.tech/neondb/auth";
    process.env.NEON_AUTH_COOKIE_SECRET =
        "test-secret-32-characters-long-xxxxxxxx";
    const production = {
        headers: {
            host: "admin.dralorraine.com",
            origin: "https://admin.dralorraine.com",
            "content-type": "application/json",
            cookie: "__Secure-neonauth.session_token=upstream-token"
        }
    };
    const original = globalThis.fetch;
    const calls = [];
    let email = "alan@example.test",
        verified = true,
        revoked = false,
        createdAt = new Date().toISOString();
    globalThis.fetch = async (url, options) => {
        calls.push({ url, options });
        const path = new URL(url).pathname;
        const user = {
                id: "owner-id",
                email,
                emailVerified: verified,
                name: "Alan"
            },
            session = {
                id: "session-id",
                createdAt,
                expiresAt: new Date(Date.now() + 86400000).toISOString()
            };
        if (path.endsWith("/send-verification-otp"))
            return Response.json({ success: true });
        if (path.endsWith("/sign-in/email-otp"))
            return Response.json(
                { user, token: "upstream-token" },
                {
                    headers: {
                        "Set-Cookie":
                            "__Secure-neonauth.session_token=upstream-token; Path=/; HttpOnly; Secure; SameSite=None; Partitioned"
                    }
                }
            );
        if (path.endsWith("/get-session"))
            return Response.json(revoked ? null : { user, session });
        if (path.endsWith("/sign-out")) return Response.json({ success: true });
        throw new Error(`Unexpected endpoint ${path}`);
    };
    try {
        assert.deepEqual(
            await sendCode("outsider@example.test", production, response()),
            {}
        );
        assert.equal(calls.length, 0);
        assert.deepEqual(
            await sendCode("alan@example.test", production, response()),
            {}
        );
        assert.equal(JSON.parse(calls.at(-1).options.body).type, "sign-in");
        const res = response();
        assert.equal(
            (await verifyCode("alan@example.test", "123456", production, res))
                .email,
            "alan@example.test"
        );
        const cookies = res.getHeader("Set-Cookie");
        assert.ok(
            cookies.every(
                (c) =>
                    !c.includes("Partitioned") &&
                    c.includes("SameSite=Strict") &&
                    c.includes("Secure") &&
                    !c.includes("Domain=")
            )
        );
        assert.equal(
            (await currentUser(production, response())).email,
            "alan@example.test"
        );
        assert.ok(calls.at(-1).url.includes("disableCookieCache=true"));
        assert.equal(
            new Headers(calls.at(-1).options.headers).get("origin"),
            "https://admin.dralorraine.com"
        );
        revoked = true;
        assert.equal(await currentUser(production, response()), null);
        revoked = false;
        email = "outsider@example.test";
        assert.equal(await currentUser(production, response()), null);
        email = "alan@example.test";
        verified = false;
        assert.equal(await currentUser(production, response()), null);
        verified = true;
        createdAt = new Date(Date.now() - 9 * 3600000).toISOString();
        assert.equal(await currentUser(production, response()), null);
        await signOut(production, response());
        assert.ok(calls.at(-1).url.endsWith("/sign-out"));
    } finally {
        globalThis.fetch = original;
    }
});
