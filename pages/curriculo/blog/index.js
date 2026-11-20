import { Layout } from "@components/Layout";
import { PageIntro } from "@components/Layout/PageIntro";
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
                <PageIntro
                    backLink={{ href: "/curriculo", label: "Serviço de currículo" }}
                    eyebrow="Currículo em foco · Para médicos"
                    title={<>Cada edital pede uma <em>leitura atenta</em>.</>}
                    lead="Guias para entender o que a banca avalia, reunir os comprovantes certos e apresentar sua trajetória com clareza."
                />

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
