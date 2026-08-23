/**
 * Identidade do site em um lugar só.
 *
 * Antes disso o domínio aparecia em três grafias pelo repositório
 * (`dralorraine.com.br`, `www.dralorraine.com` e o typo `dralaorraine.com.br`),
 * o que quebrava sitemap, canonical e dados estruturados ao mesmo tempo.
 * Qualquer URL absoluta — canonical, Open Graph, JSON-LD, e-mail — sai daqui.
 */

import { SITE_NAME, SITE_URL } from "../config/site";

export const SITE = {
    url: SITE_URL,
    name: SITE_NAME,
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
