import { currentUser } from "@utils/crm/auth.mjs";
import { assertSameOrigin, privateHeaders } from "@utils/crm/runtime.mjs";
import { importProductImage } from "@utils/crm/product-image.mjs";
export const config = { api: { bodyParser: { sizeLimit: "4kb" } } };
export default async function handler(req, res) {
    privateHeaders(res);
    if (req.method !== "POST") return res.status(405).end();
    try {
        assertSameOrigin(req);
        if (!(await currentUser(req, res)))
            return res
                .status(401)
                .json({ error: "Sua sessão expirou. Entre novamente." });
        if (typeof req.body?.url !== "string" || req.body.url.length > 2000)
            return res.status(400).json({ error: "Link inválido." });
        return res.json({ image: await importProductImage(req.body.url) });
    } catch (error) {
        return res
            .status(error.status || 422)
            .json({
                error: error.status
                    ? error.message
                    : "Não foi possível importar. Envie a foto do produto pelo computador."
            });
    }
}
