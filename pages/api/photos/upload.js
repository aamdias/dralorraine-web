import { handleUpload } from "@vercel/blob/client";

// ────────────────────────────────────────────────────────────────────────────
// Server-signed direct-to-Blob upload.
//
// How it works:
// 1. Client calls `upload()` from `@vercel/blob/client` with a filename.
// 2. That call hits this route with `type: "blob.generate-client-token"`.
// 3. We inspect the pathname, validate it, and return a short-lived token
//    signed with BLOB_READ_WRITE_TOKEN from the server.
// 4. The client uploads the file bytes straight to Vercel Blob using that
//    token (bytes never pass through this function — no 4.5 MB body limit).
// 5. The client stores the returned blob metadata with the intake.
//
// Security notes:
// - Pathname prefix is validated as `consulta-photos/` so callers can't write
//   elsewhere in the bucket.
// - allowedContentTypes restricts to common image formats.
// - `addRandomSuffix: true` prevents guessable URLs.
// - `maximumSizeInBytes` bounds upload size (10 MB per file).
// ────────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const jsonResponse = await handleUpload({
            body: req.body,
            request: req,
            onBeforeGenerateToken: async (pathname /* , clientPayload */) => {
                if (!pathname.startsWith("consulta-photos/")) {
                    throw new Error("Invalid upload path");
                }

                return {
                    allowedContentTypes: [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/webp",
                        "image/heic",
                        "image/heif"
                    ],
                    addRandomSuffix: true,
                    maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB
                    tokenPayload: JSON.stringify({
                        ts: Date.now()
                    })
                };
            }
        });

        res.status(200).json(jsonResponse);
    } catch (err) {
        console.error("[upload handler error]", err);
        res.status(400).json({ error: err?.message || "Upload failed" });
    }
}
