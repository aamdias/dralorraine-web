/** @type {import('next-sitemap').IConfig} */

// O sitemap só era gerado se alguém rodasse next-sitemap à mão — não havia
// script de postbuild, então nunca existiu sitemap.xml em produção.
// O package.json agora roda isto depois do build.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dralorraine.com";

// Rastreadores de LLM. Estar aqui é o que permite que o site seja citado em
// resposta gerada por IA — bloquear (ou omitir) tira a marca desse canal.
const AI_CRAWLERS = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot",
    "Applebot-Extended",
    "Bingbot",
    "meta-externalagent",
    "Amazonbot",
    "cohere-ai",
    "DuckAssistBot",
    "MistralAI-User"
];

module.exports = {
    siteUrl: SITE_URL,
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: "monthly",
    autoLastmod: true,
    // Fluxo de agendamento, área restrita e rotas de API não entram no índice.
    exclude: ["/consulta/agendar", "/mentoria/check-out", "/admin", "/admin/*"],
    transform: async (config, path) => {
        // A home e a página de consulta são as portas de entrada.
        const priority =
            path === "/" ? 1.0 : path === "/consulta" ? 0.9 : 0.7;

        return {
            loc: path,
            changefreq: config.changefreq,
            priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined
        };
    },
    robotsTxtOptions: {
        policies: [
            ...AI_CRAWLERS.map((userAgent) => ({
                userAgent,
                allow: "/"
            })),
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api", "/consulta/agendar", "/mentoria/check-out"]
            }
        ],
        additionalSitemaps: [`${SITE_URL}/sitemap.xml`]
    }
};
