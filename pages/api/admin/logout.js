import { currentUser, signOut } from "@utils/crm/auth.mjs";
import { assertSameOrigin, privateHeaders } from "@utils/crm/runtime.mjs";
import { recordAccess } from "@utils/crm/store.mjs";
export default async function handler(req, res) {
    privateHeaders(res);
    if (req.method !== "POST")
        return res.status(405).json({ error: "Método não permitido." });
    try {
        assertSameOrigin(req);
        const user = await currentUser(req, res);
        await signOut(req, res);
        if (user) await recordAccess(user.email, "sign_out");
        return res.json({ ok: true });
    } catch (error) {
        return res
            .status(error.status || 503)
            .json({ error: "Não foi possível sair. Tente novamente." });
    }
}
