import Link from "next/link";
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
                            {posts.map((post) => (
                                <article
                                    key={post.href}
                                    className="group border border-line bg-sand p-7 sm:p-10 lg:p-12 transition-colors hover:bg-[#ece4da]"
                                >
                                    <div className="grid lg:grid-cols-[0.9fr_2.1fr] gap-7 lg:gap-14">
                                        <div>
                                            <p className="text-xs uppercase tracking-label text-copper-dark font-medium">
                                                {post.category}
                                            </p>
                                            <p className="mt-4 text-sm text-stone">{post.date}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[2.35rem] sm:text-5xl font-light leading-[1.03] tracking-[-0.02em]">
                                                <Link href={post.href} className="hover:text-copper-dark transition-colors">
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-6 max-w-2xl text-stone leading-7">{post.excerpt}</p>
                                            <div className="mt-8 flex items-center gap-6 text-sm font-medium">
                                                <Link href={post.href} className="underline underline-offset-8 decoration-copper hover:text-copper-dark transition-colors">
                                                    Ler artigo
                                                </Link>
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
