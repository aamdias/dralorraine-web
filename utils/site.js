/**
 * Identidade do site em um lugar só.
 *
 * Antes disso o domínio aparecia em três grafias pelo repositório
 * (`dralorraine.com.br`, `www.dralorraine.com` e o typo `dralaorraine.com.br`),
 * o que quebrava sitemap, canonical e dados estruturados ao mesmo tempo.
 * Qualquer URL absoluta — canonical, Open Graph, JSON-LD, e-mail — sai daqui.
 */

const FALLBACK_URL = "https://www.dralorraine.com";

/** Sem barra no fim: as URLs são montadas como `${SITE.url}${path}`. */
const normalize = (value) =>
    (value || FALLBACK_URL).trim().replace(/\/+$/, "");

export const SITE = {
    url: normalize(process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL),
    name: "Dra. Lorraine Souza",
    fullName: "Dra. Lorraine Souza · Dermatologia",
    specialty: "Dermatologia",
    email: "contato@dralorraine.com",
    locale: "pt_BR",
    // Atendimento presencial. Endereço e telefone ficam de fora do schema
    // até serem confirmados — cidade e estado já bastam para busca local.
    city: "Campinas",
    region: "SP",
    regionName: "São Paulo",
    country: "BR",
    instagram: "https://www.instagram.com/dralaorraine",
    logo: "/ls-monogram.svg",
    defaultImage: "/lolo-portrait-consulta.jpg"
};

/** Monta uma URL absoluta a partir de um caminho do site. */
export const absoluteUrl = (path = "/") => {
    if (!path) return SITE.url;
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;
};
