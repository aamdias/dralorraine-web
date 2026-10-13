import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { get } from "@vercel/blob";
import { currentUser } from "@utils/crm/auth.mjs";
import { intakeDetails } from "@utils/crm/store.mjs";
import { privateHeaders, isDemo } from "@utils/crm/runtime.mjs";
export default async function handler(req, res) {
    privateHeaders(res);
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (req.method !== "GET") return res.status(405).end();
    try {
        const user = await currentUser(req, res);
        if (!user) return res.status(401).end();
        if (isDemo()) return res.status(404).end();
        const id = Number(req.query.intake),
            index = Number(req.query.index);
        if (
            !Number.isSafeInteger(id) ||
            id < 1 ||
            !Number.isSafeInteger(index) ||
            index < 0
        )
            return res.status(400).end();
        const record = await intakeDetails(id, user.email),
            photo = record.photos?.[index];
        if (
            typeof photo?.pathname !== "string" ||
            !photo.pathname.startsWith("consulta-photos/") ||
            photo.pathname.includes("..")
        )
            return res.status(404).end();
        const result = await get(photo.pathname, {
            access: "private",
            useCache: false
        });
        if (!result || result.statusCode !== 200) return res.status(404).end();
        if (
            ![
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
                "image/heic",
                "image/heif"
            ].includes(result.blob.contentType) ||
            result.blob.size > 10 * 1024 * 1024
        )
            return res.status(415).end();
        res.setHeader("Content-Type", result.blob.contentType);
        res.setHeader("Content-Disposition", "inline");
        await pipeline(Readable.fromWeb(result.stream), res);
    } catch {
        if (!res.headersSent) res.status(503).end();
        else res.end();
    }
}
