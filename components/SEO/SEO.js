import Head from "next/head";
import { SITE, absoluteUrl } from "@utils/site";

/**
 * Metadados por página.
 *
 * Passe sempre `url` com o caminho da página (ex.: "/consulta"): é o que
 * gera o canonical e o og:url corretos. Sem ele, toda página se declara
 * como a home — buscadores tratam isso como conteúdo duplicado.
 */
const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = "website",
    noindex = false
}) => {
    const metaDescription = description || process.env.siteDescription;
    const metaKeywords = keywords || process.env.siteKeywords;
    const imagePreview = absoluteUrl(image || SITE.defaultImage);
    const pageUrl = absoluteUrl(url || "/");

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />

            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            {metaKeywords && (
                <meta name="keywords" content={metaKeywords} />
            )}

            {/* Canonical: uma URL por página, sempre no domínio de produção */}
            <link rel="canonical" href={pageUrl} />

            {/* Páginas de fluxo e área restrita ficam fora do índice.
                max-image-preview:large libera a imagem grande em resultados
                ricos e em respostas geradas por IA. */}
            <meta
                name="robots"
                content={
                    noindex
                        ? "noindex, nofollow"
                        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                }
            />

            {/* {Open Graph} */}
            <meta property="og:type" content={type} key="ogtype" />
            <meta property="og:locale" content={SITE.locale} key="oglocale" />
            <meta property="og:url" content={pageUrl} key="ogurl" />
            <meta property="og:image" content={imagePreview} key="ogimage" />
            <meta
                property="og:image:alt"
                content={`${SITE.name} — ${SITE.specialty}`}
                key="ogimagealt"
            />
            <meta
                property="og:site_name"
                content={SITE.name}
                key="ogsitename"
            />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta
                property="og:description"
                content={metaDescription}
                key="ogdesc"
            />

            {/* { Twitter } */}
            <meta
                name="twitter:card"
                content="summary_large_image"
                key="twcard"
            />
            <meta name="twitter:title" content={title} key="twtitle" />
            <meta
                name="twitter:description"
                content={metaDescription}
                key="twdesc"
            />
            <meta name="twitter:image" content={imagePreview} key="twimage" />

            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            {/* Monograma em SVG: é o que navegadores modernos usam.
                Os PNGs seguem como fallback legado. Ver docs/brandbook.md §01. */}
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#B48967"
            />

            <meta name="msapplication-TileColor" content="#B48967" />
            <meta name="theme-color" content="#FAF6F0" />
        </Head>
    );
};

export default SEO;
