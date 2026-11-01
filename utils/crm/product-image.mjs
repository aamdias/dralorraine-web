import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";
import { request } from "node:https";
import { ValidationError } from "./model.mjs";

const blocked = new BlockList();
for (const [ip, bits] of [
    ["0.0.0.0", 8],
    ["10.0.0.0", 8],
    ["100.64.0.0", 10],
    ["127.0.0.0", 8],
    ["169.254.0.0", 16],
    ["172.16.0.0", 12],
    ["192.0.0.0", 24],
    ["192.0.2.0", 24],
    ["192.168.0.0", 16],
    ["198.18.0.0", 15],
    ["198.51.100.0", 24],
    ["203.0.113.0", 24],
    ["224.0.0.0", 3]
])
    blocked.addSubnet(ip, bits, "ipv4");
export function publicImageUrl(value) {
    let url;
    try {
        url = new URL(value);
    } catch {
        throw new ValidationError("Informe o link direto HTTPS da foto.");
    }
    if (
        url.protocol !== "https:" ||
        url.username ||
        url.password ||
        (url.port && url.port !== "443") ||
        isIP(url.hostname) ||
        !url.hostname.includes(".")
    )
        throw new ValidationError(
            "Use uma URL HTTPS pública, sem credenciais."
        );
    return url;
}
export const isPublicImageAddress = (address) =>
    isIP(address) === 4 && !blocked.check(address, "ipv4");
export async function importProductImage(value, redirects = 0) {
    const url = publicImageUrl(value);
    const addresses = await lookup(url.hostname, { family: 4, all: true });
    if (
        !addresses.length ||
        addresses.some((a) => !isPublicImageAddress(a.address))
    )
        throw new ValidationError("Endereço de imagem não permitido.");
    // Pin the validated address to prevent DNS rebinding; TLS still verifies the original hostname.
    const result = await new Promise((resolve, reject) => {
        const req = request(
            url,
            {
                agent: false,
                headers: {
                    Accept: "image/jpeg,image/png,image/webp",
                    "User-Agent": "Lorraine-Product-Image/1.0"
                },
                lookup: (_host, options, callback) =>
                    callback(
                        null,
                        options.all
                            ? [{ address: addresses[0].address, family: 4 }]
                            : addresses[0].address,
                        4
                    )
            },
            (res) => {
                if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
                    res.resume();
                    resolve({ redirect: res.headers.location });
                    return;
                }
                if (
                    res.statusCode !== 200 ||
                    !["image/jpeg", "image/png", "image/webp"].includes(
                        res.headers["content-type"]?.split(";")[0]
                    )
                ) {
                    res.resume();
                    reject(
                        new ValidationError(
                            "O link deve abrir uma foto JPEG, PNG ou WebP."
                        )
                    );
                    return;
                }
                const chunks = [];
                let size = 0;
                res.on("data", (chunk) => {
                    size += chunk.length;
                    if (size > 4 * 1024 * 1024) {
                        req.destroy(
                            new ValidationError("A foto deve ter até 4 MB.")
                        );
                    } else chunks.push(chunk);
                });
                res.on("error", reject);
                res.on("end", () =>
                    resolve({
                        data: `data:${
                            res.headers["content-type"].split(";")[0]
                        };base64,${Buffer.concat(chunks).toString("base64")}`
                    })
                );
            }
        );
        const timer = setTimeout(
            () =>
                req.destroy(
                    new ValidationError(
                        "O site da foto demorou para responder."
                    )
                ),
            10000
        );
        req.on("close", () => clearTimeout(timer));
        req.on("error", reject);
        req.end();
    });
    if (result.redirect) {
        if (redirects >= 3)
            throw new ValidationError(
                "Redirecionamentos demais no link da foto."
            );
        return importProductImage(
            new URL(result.redirect, url).href,
            redirects + 1
        );
    }
    if (!result.data) throw new ValidationError("Foto indisponível.");
    return result.data;
}
