import Link from "next/link";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import {
    StructuredData,
    breadcrumbSchema,
    personSchema
} from "@components/StructuredData";
import ArticleCard from "@components/CurriculumBlog/ArticleCard";
import ServiceCTA from "@components/CurriculumBlog/ServiceCTA";
import { CURRICULUM_BLOG_PATH, unicampArticle } from "@data/curriculum";
import { absoluteUrl, SITE } from "@utils/site";

export default function CurriculumBlog() {
    return (
        <Layout careerPage>
            <SEO
                title="Blog de currículo para residência médica | Dra. Lorraine"
                description="Guias de editais, análise curricular e organização de comprovantes para a residência médica. Comece pelo edital da UNICAMP 2027."
                url={CURRICULUM_BLOG_PATH}
            />
            <StructuredData
                graph={[
                    personSchema(),
                    breadcrumbSchema([
                        { name: "Início", path: "/" },
                        { name: "Currículo", path: "/curriculo" },
                        {
                            name: "Blog de currículo",
                            path: CURRICULUM_BLOG_PATH
                        }
                    ]),
                    {
                        "@type": "Blog",
                        "@id": `${absoluteUrl(CURRICULUM_BLOG_PATH)}#blog`,
                        name: "Currículo em foco · Dra. Lorraine Souza",
                        description:
                            "Editais e organização do currículo para residência médica.",
                        url: absoluteUrl(CURRICULUM_BLOG_PATH),
                        inLanguage: "pt-BR",
                        publisher: { "@id": `${SITE.url}/#lorraine` },
                        blogPost: [
                            {
                                "@type": "BlogPosting",
                                headline: unicampArticle.title,
                                url: absoluteUrl(unicampArticle.href),
                                datePublished: unicampArticle.date
                            }
                        ]
                    }
                ]}
            />
            <div className="bg-paper text-ink">
                <header className="bg-sand pb-16 pt-32 sm:pb-24 sm:pt-44">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/curriculo"
                            className="inline-flex py-3 text-sm text-stone underline decoration-copper underline-offset-8"
                        >
                            Serviço de currículo
                        </Link>
                        <p className="mb-6 mt-10 text-xs font-medium uppercase tracking-label text-copper-dark">
                            Currículo em foco · Para médicos
                        </p>
                        <h1 className="mb-0 max-w-4xl font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                            Cada edital pede uma{" "}
                            <span className="italic text-copper-dark">
                                leitura atenta
                            </span>
                            .
                        </h1>
                        <p className="mb-0 mt-8 max-w-2xl text-lg leading-8 text-stone">
                            Guias para entender o que a banca avalia, reunir os
                            comprovantes certos e apresentar sua trajetória com
                            clareza.
                        </p>
                    </div>
                </header>
                <section
                    className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
                    aria-labelledby="guides"
                >
                    <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
                        <h2 id="guides" className="mb-0 text-4xl font-light">
                            Guias de currículo
                        </h2>
                        <span className="text-sm text-stone">
                            Fontes oficiais · Orientações práticas
                        </span>
                    </div>
                    <ArticleCard />
                    <p className="mb-0 mt-7 max-w-2xl text-sm leading-7 text-stone">
                        Cada guia identifica o ano e o tipo de acesso do edital
                        consultado. Confira sempre os comunicados e as
                        retificações da instituição antes de enviar seus
                        documentos.
                    </p>
                </section>
                <ServiceCTA />
            </div>
        </Layout>
    );
}
