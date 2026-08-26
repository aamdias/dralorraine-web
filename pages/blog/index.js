import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import {
    StructuredData,
    breadcrumbSchema,
    personSchema,
    webSiteSchema
} from "@components/StructuredData";

const posts = [
    {
        category: "Dermatologia clínica",
        title: "Rosácea: o que a vermelhidão no rosto do goleiro Alisson ajuda a entender",
        excerpt:
            "Rosácea não é falta de cuidado nem simplesmente acne. Entenda os sinais, os gatilhos e como a avaliação dermatológica orienta o tratamento.",
        href: "/blog/rosacea-alisson-becker",
        date: "Publicado em 26 de agosto de 2026",
        readTime: "8 min de leitura",
        image: "/alisson-becker-rosacea.png",
        imageAlt: "Alisson Becker, goleiro brasileiro, em retrato durante uma partida"
    },
    {
        category: "Procedimentos",
        title: "Quando fazer Botox? Para quem a toxina botulínica costuma ser indicada",
        excerpt:
            "A decisão não começa pela idade. Entenda o que observar, para quem pode haver indicação e como avaliar expectativas antes da aplicação.",
        href: "/blog/botox",
        date: "Atualizado em 25 de agosto de 2026",
        readTime: "7 min de leitura"
    }
];

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
                        "@id": "https://www.dralorraine.com/blog/#blog",
                        name: "Blog da Dra. Lorraine",
                        url: "https://www.dralorraine.com/blog",
                        inLanguage: "pt-BR",
                        author: { "@id": "https://www.dralorraine.com/#lorraine" }
                    }
                ]}
            />

            <div className="bg-paper text-ink">
                <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_48%,#FAF6F0_100%)]"
                    />
                    <div
                        aria-hidden
                        className="absolute -right-24 -top-40 h-[34rem] w-[34rem] rounded-full bg-rose/60 blur-3xl"
                    />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">
                            Blog · Dermatologia
                        </p>
                        <h1 className="font-display font-light text-[3.2rem] sm:text-display-xl leading-[0.98] tracking-[-0.025em] max-w-3xl text-balance">
                            Informação para você cuidar da pele com mais{" "}
                            <span className="italic text-copper-dark">segurança</span>.
                        </h1>
                        <p className="mt-8 text-lg leading-8 text-stone max-w-2xl">
                            Aqui eu traduzo a dermatologia para a vida real: com
                            ciência, clareza e espaço para as particularidades de
                            cada pele.
                        </p>
                    </div>
                </section>

                <section className="border-y border-line bg-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
                        <div className="flex items-end justify-between gap-6 mb-10">
                            <div>
                                <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-3">
                                    Comece por aqui
                                </p>
                                <h2 className="font-display text-4xl font-light">Artigos recentes</h2>
                            </div>
                            <span className="hidden sm:block text-sm text-stone">Conteúdo educativo</span>
                        </div>

                        <div className="grid gap-6">
                            {posts.map((post) => post.image ? (
                                <article
                                    key={post.href}
                                    className="group relative isolate h-[24rem] cursor-pointer overflow-hidden border border-line bg-[#eee6db] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-copper/60 hover:shadow-[0_18px_45px_rgba(74,52,38,.10)] focus-within:ring-2 focus-within:ring-copper focus-within:ring-offset-4 focus-within:ring-offset-paper"
                                >
                                    <Link href={post.href} aria-label={`Ler ${post.title}`} className="absolute inset-0 z-20 focus:outline-none">
                                        <span className="sr-only">Ler artigo: {post.title}</span>
                                    </Link>
                                    <div aria-hidden className="absolute inset-y-0 right-0 w-full sm:w-[58%]">
                                        <Image
                                            src={post.image}
                                            alt={post.imageAlt}
                                            fill
                                            sizes="(min-width: 1024px) 52vw, (min-width: 640px) 58vw, 100vw"
                                            className="object-cover object-[50%_18%] grayscale sepia-[.18] contrast-125 brightness-[.82] opacity-70 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-75"
                                        />
                                        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,#eee6db_0%,rgba(238,230,219,.96)_16%,rgba(238,230,219,.4)_45%,rgba(238,230,219,.04)_72%)]" />
                                        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(180,137,103,.16),transparent_48%)] mix-blend-multiply" />
                                    </div>
                                    <div className="relative z-10 flex h-full max-w-3xl flex-col p-7 sm:p-8">
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-label text-copper-dark font-medium">
                                            <span>{post.category}</span>
                                            <span aria-hidden className="h-1 w-1 rounded-full bg-copper" />
                                            <span className="normal-case tracking-normal text-stone font-normal">{post.date}</span>
                                        </div>
                                        <h3 className="mt-6 max-w-2xl font-display text-[2.45rem] sm:text-[3.1rem] font-light leading-[.98] tracking-[-0.025em]">
                                            {post.title}
                                        </h3>
                                        <p className="mt-4 max-w-xl text-stone leading-7">{post.excerpt}</p>
                                        <div className="mt-auto flex items-center gap-6 pt-6 text-sm font-medium">
                                            <span className="underline underline-offset-8 decoration-copper">Ler artigo</span>
                                            <span className="text-stone">{post.readTime}</span>
                                        </div>
                                    </div>
                                </article>
                            ) : (
                                <article
                                    key={post.href}
                                    className="group relative h-[24rem] cursor-pointer border border-line bg-sand p-7 sm:p-8 lg:p-10 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-copper/60 hover:shadow-[0_18px_45px_rgba(74,52,38,.10)] focus-within:ring-2 focus-within:ring-copper focus-within:ring-offset-4 focus-within:ring-offset-paper"
                                >
                                    <Link href={post.href} aria-label={`Ler ${post.title}`} className="absolute inset-0 z-20 focus:outline-none">
                                        <span className="sr-only">Ler artigo: {post.title}</span>
                                    </Link>
                                    <div className="relative z-10 grid h-full gap-7 lg:grid-cols-[0.9fr_2.1fr] lg:gap-14">
                                        <div>
                                            <p className="text-xs uppercase tracking-label text-copper-dark font-medium">
                                                {post.category}
                                            </p>
                                            <p className="mt-4 text-sm text-stone">{post.date}</p>
                                        </div>
                                        <div className="flex h-full flex-col">
                                            <h3 className="font-display text-[2.35rem] sm:text-5xl font-light leading-[1.03] tracking-[-0.02em]">
                                                {post.title}
                                            </h3>
                                            <p className="mt-6 max-w-2xl text-stone leading-7">{post.excerpt}</p>
                                            <div className="mt-auto flex items-center gap-6 pt-6 text-sm font-medium">
                                                <span className="underline underline-offset-8 decoration-copper">Ler artigo</span>
                                                <span className="text-stone">{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
