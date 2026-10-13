import { sendCode, verifyCode } from "@utils/crm/auth.mjs";
import { assertSameOrigin, privateHeaders } from "@utils/crm/runtime.mjs";
import { recordAccess } from "@utils/crm/store.mjs";
export const config = { api: { bodyParser: { sizeLimit: "8kb" } } };
export default async function handler(req, res) {
    privateHeaders(res);
    if (req.method !== "POST")
        return res.status(405).json({ error: "Método não permitido." });
    try {
        assertSameOrigin(req);
        const email =
            typeof req.body?.email === "string"
                ? req.body.email.trim().toLowerCase()
                : "";
        if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return res.status(400).json({ error: "Informe um e-mail válido." });
        if (req.body.action === "send")
            return res.json({ ok: true, ...(await sendCode(email, req, res)) });
        if (req.body.action !== "verify")
            return res.status(400).json({ error: "Ação inválida." });
        const user = await verifyCode(email, req.body.code, req, res);
        if (!user)
            return res
                .status(401)
                .json({ error: "Código inválido ou expirado." });
        await recordAccess(user.email, "sign_in");
        return res.json({ ok: true });
    } catch (error) {
        return res.status(error.status || 503).json({
            error: error.status
                ? error.message
                : "Acesso indisponível. Verifique a configuração do CRM."
        });
    }
}
