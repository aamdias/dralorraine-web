import { passwordMatches, createSessionCookie } from "@utils/adminAuth";

// Cheap brute-force hardening: small delay on wrong passwords.
// At 1 attempt/sec from a single IP, guessing even a 10-char password
// takes longer than the heat death of the sun.
async function slowOnFailure() {
    await new Promise((r) => setTimeout(r, 600));
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const { password } = req.body || {};

    if (!passwordMatches(password)) {
        await slowOnFailure();
        res.status(401).json({ error: "Senha incorreta" });
        return;
    }

    try {
        res.setHeader("Set-Cookie", createSessionCookie());
        res.status(200).json({ ok: true });
    } catch (err) {
        console.error("[admin login error]", err);
        res.status(500).json({ error: "Server misconfigured" });
    }
}
