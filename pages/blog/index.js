import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import { PageIntro } from "@components/Layout/PageIntro";
import styles from "@components/Layout/Site.module.scss";
import { absoluteUrl } from "@utils/site";
import SEO from "@components/SEO/SEO";
import {
    StructuredData,
    IDS,
    breadcrumbSchema,
    personSchema,
    webSiteSchema
} from "@components/StructuredData";

const posts = [
    {
        category: "Envelhecimento saudável",
        title: "Bioestimulador de colágeno: o que ele tem a ver com envelhecer bem?",
        excerpt:
            "A relação vai além da flacidez. Entenda o que os bioestimuladores podem fazer, o que não prometem e por que a indicação deve ser individual.",
        href: "/blog/bioestimulador-de-colageno",
        date: "28 de agosto de 2026",
        dateTime: "2026-08-28",
        readTime: "6 min de leitura",
        image: "/blog-bioestimulador-colageno-hero.png",
        imageAlt:
            "Mulher adulta em uma clínica dermatológica, com aparência natural e expressão serena"
    },
    {
        category: "Dermatologia clínica",
        title: "O que o goleiro Alisson tem no rosto? Entenda a rosácea",
        excerpt:
            "Rosácea não é falta de cuidado nem simplesmente acne. Entenda os sinais, os gatilhos e como a avaliação dermatológica orienta o tratamento.",
        href: "/blog/rosacea-alisson-becker",
        date: "Publicado em 26 de agosto de 2026",
        dateTime: "2026-08-26",
        readTime: "8 min de leitura",
        image: "/alisson-becker-rosacea.png",
        imageAlt:
            "Alisson Becker, goleiro brasileiro, em retrato durante uma partida"
    },
    {
        category: "Procedimentos",
        title: "Quando fazer Botox? Para quem a toxina botulínica costuma ser indicada",
        excerpt:
            "A decisão não começa pela idade. Entenda o que observar, para quem pode haver indicação e como avaliar expectativas antes da aplicação.",
        href: "/blog/botox",
        date: "Atualizado em 25 de agosto de 2026",
        dateTime: "2026-08-25",
        readTime: "7 min de leitura"
    }
];

function PostCard({ post }) {
    const titleId = post.href.split("/").pop();

    return (
        <article>
            <Link
                href={post.href}
                aria-labelledby={titleId}
                className={`group grid border border-line bg-sand transition-colors hover:border-copper/60 hover:bg-paper ${
                    post.image
                        ? "md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
                        : ""
                }`}
            >
                {post.image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-line md:order-2 md:aspect-auto md:min-h-[18rem]">
                        <Image
                            src={post.image}
                            alt={post.imageAlt}
                            fill
                            sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw"
                            className="object-cover object-[50%_25%]"
                        />
                    </div>
                )}
                <div className="flex min-w-0 flex-col items-start gap-4 p-6 sm:gap-5 sm:p-9 md:order-1 lg:p-12">
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm">
                        <span className="text-xs font-medium uppercase tracking-label text-copper-dark">
                            {post.category}
                        </span>
                        <time dateTime={post.dateTime} className="text-stone">
                            {post.date}
                        </time>
                    </div>
                    <h3
                        id={titleId}
                        className="m-0 max-w-3xl text-[clamp(30px,4vw,49px)] font-light leading-[1.04] tracking-[-0.02em] text-ink transition-colors group-hover:text-copper-dark"
                    >
                        {post.title}
                    </h3>
                    <p className="m-0 max-w-xl text-base leading-7 text-stone">
                        {post.excerpt}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm">
                        <span className={styles.textLink}>Ler artigo</span>
                        <span className="text-stone">{post.readTime}</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default function Blog() {
    return (
        <Layout>
            <SEO
                title="Blog de Dermatologia | Dra. Lorraine Souza"
                description="Conteúdo claro e baseado em ciência sobre dermatologia, cuidados com a pele e procedimentos estéticos, por Dra. Lorraine Souza."
                url="/blog"
            />
            <StructuredData
                graph={[
                    personSchema(),
                    webSiteSchema(),
                    breadcrumbSchema([
                        { name: "Início", path: "/" },
                        { name: "Blog", path: "/blog" }
                    ]),
                    {
                        "@type": "Blog",
                        "@id": absoluteUrl("/blog#blog"),
                        name: "Blog da Dra. Lorraine",
                        url: absoluteUrl("/blog"),
                        inLanguage: "pt-BR",
                        author: { "@id": IDS.person }
                    }
                ]}
            />

            <PageIntro
                eyebrow="Blog · Dermatologia"
                title={
                    <>
                        Informação para você cuidar da pele com mais{" "}
                        <em>segurança</em>.
                    </>
                }
                lead="Aqui eu traduzo a dermatologia para a vida real: com ciência, clareza e espaço para as particularidades de cada pele."
            />
            <section
                className={`${styles.container} py-14 sm:py-20 lg:py-28`}
                aria-labelledby="recent-posts"
            >
                <h2
                    id="recent-posts"
                    className="mb-8 text-[clamp(34px,4.4vw,64px)] leading-[1.04] tracking-[-0.02em] sm:mb-12"
                >
                    Artigos recentes
                </h2>
                <div className="grid gap-5 sm:gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.href} post={post} />
                    ))}
                </div>
            </section>
        </Layout>
    );
}
