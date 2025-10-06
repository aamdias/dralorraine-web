/** @type {import('next').NextConfig} */

const { createSecureHeaders } = require("next-secure-headers");
const path = require("path");
const fs = require("fs");

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    },
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["s.gravatar.com"]
    },
    env: {
        siteTitle: "Dra. Lorraine - Mentoria e Serviços para Residência Médica",
        siteDescription: "Serviços especializados para aprovação na residência médica em São Paulo: currículo profissional, mentoria individual e anotações de estudo. Aprovada em UNICAMP, USP, UNIFESP e PUC.",
        siteKeywords: "residência médica, currículo residência médica, mentoria residência médica, UNICAMP, USP, UNIFESP, PUC, dermatologia, aprovação residência, São Paulo",
        siteUrl: "https://dralaorraine.com.br",
        siteImagePreviewUrl: "/lolo-portrait-home-page.png",
        twitterHandle: "@dralaorraine"
    },
    headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    ...createSecureHeaders(),
                    // HSTS Preload: https://hstspreload.org/
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload"
                    }
                ]
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*"
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*"
            }
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true
};

module.exports = nextConfig;
