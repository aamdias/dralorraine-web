import { currentUser } from "@utils/crm/auth.mjs";
import { privateHeaders } from "@utils/crm/runtime.mjs";
import { productDetails } from "@utils/crm/store.mjs";
export default async function handler(req, res) {
    privateHeaders(res);
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (req.method !== "GET") return res.status(405).end();
    try {
        const user = await currentUser(req, res);
        if (!user) return res.status(401).end();
        if (
            typeof req.query.id !== "string" ||
            !/^[a-zA-Z0-9_-]{1,80}$/.test(req.query.id)
        )
            return res.status(400).end();
        const { image } = await productDetails(req.query.id, user.email);
        if (!image) return res.status(404).end();
        res.setHeader(
            "Content-Type",
            image.startsWith("data:image/png") ? "image/png" : "image/jpeg"
        );
        return res.send(Buffer.from(image.split(",")[1], "base64"));
    } catch (error) {
        return res.status(error.status || 503).end();
    }
}
