export function isDemo() {
    if (
        process.env.CRM_DEMO === "true" &&
        process.env.NODE_ENV !== "development"
    )
        throw new Error("CRM_DEMO is allowed only in local development.");
    return (
        process.env.CRM_DEMO === "true" &&
        process.env.NODE_ENV === "development"
    );
}
export function allowedEmails() {
    if (isDemo()) return ["alan@example.test", "lorraine@example.test"];
    const emails = String(process.env.CRM_ALLOWED_EMAILS || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    if (
        emails.length !== 2 ||
        new Set(emails).size !== 2 ||
        emails.some((s) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
    )
        throw new Error("Configure exactly two CRM_ALLOWED_EMAILS.");
    return emails;
}
export function isAllowedEmail(email) {
    return (
        typeof email === "string" &&
        allowedEmails().includes(email.trim().toLowerCase())
    );
}
export function adminOrigin(req) {
    if (process.env.NODE_ENV === "development") {
        const host = req.headers.host || "";
        if (!/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host))
            throw new Error("Local CRM requires a loopback hostname.");
        return `http://${host}`;
    }
    const url = new URL(
        process.env.ADMIN_SITE_URL || "https://admin.dralorraine.com"
    );
    if (url.protocol !== "https:")
        throw new Error("ADMIN_SITE_URL must use HTTPS.");
    if (req.headers.host !== url.host)
        throw new Error("CRM requires the configured admin host.");
    return url.origin;
}
export function privateHeaders(res) {
    res.setHeader("Cache-Control", "private, no-store, max-age=0");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.setHeader("Referrer-Policy", "no-referrer");
}
export function assertSameOrigin(req) {
    const origin = adminOrigin(req);
    if (
        req.headers.origin !== origin ||
        (req.headers["sec-fetch-site"] &&
            !["same-origin", "none"].includes(req.headers["sec-fetch-site"]))
    ) {
        const error = new Error("Origem inválida.");
        error.status = 403;
        throw error;
    }
    if (
        !String(req.headers["content-type"] || "").startsWith(
            "application/json"
        )
    ) {
        const error = new Error("Envie JSON.");
        error.status = 415;
        throw error;
    }
}
export function safeNext(value) {
    return typeof value === "string" &&
        /^\/admin(?:\/(?:pacientes(?:\/[a-zA-Z0-9_-]+)?|atendimentos|retornos|reativacao|aniversarios|ranking|online))?(?:\?[^#]*)?$/.test(
            value
        ) &&
        !/[\\\r\n]/.test(value)
        ? value
        : "/admin";
}
