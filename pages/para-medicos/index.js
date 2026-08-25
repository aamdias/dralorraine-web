import Link from "next/link";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { StructuredData, breadcrumbSchema, personSchema } from "@components/StructuredData";

const offers = [
    { number: "01", title: "Mentoria para residência", text: "Acompanhamento individual para organizar estratégia, rotina e revisão na preparação para a residência médica.", href: "/mentoria", cta: "Conhecer mentoria" },
    { number: "02", title: "Anotações originais", text: "Material de estudo organizado por grandes áreas, construído ao longo da preparação para as provas de residência.", href: "/anotacoes", cta: "Ver anotações" },
    { number: "03", title: "Currículo para residência", text: "Estrutura e orientação para apresentar sua trajetória de forma clara em processos que avaliam o currículo.", href: "/curriculo", cta: "Conhecer currículo" }
];

export default function ForDoctorsPage() {
    return (
        <Layout>
            <SEO title="Para Médicos | Dra. Lorraine Souza" description="Mentoria, anotações e currículo para médicos em preparação para a residência, com a Dra. Lorraine Souza, formada pela UNICAMP e aprovada em Dermatologia." url="/para-medicos" />
            <StructuredData graph={[personSchema(), breadcrumbSchema([{ name: "Início", path: "/" }, { name: "Para médicos", path: "/para-medicos" }])]} />
            <main className="bg-paper text-ink">
                <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
                    <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_52%,#FAF6F0_100%)]" />
                    <div aria-hidden className="absolute -left-24 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-rose/60 blur-3xl" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">Para médicos</p>
                        <h1 className="max-w-4xl font-display font-light text-[3.25rem] sm:text-display-xl leading-[0.98] tracking-[-0.025em] text-balance">Estratégia para a residência, de quem já percorreu esse <span className="italic text-copper-dark">caminho</span>.</h1>
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-stone">Mentoria e materiais para médicos em preparação. Dra. Lorraine é formada pela UNICAMP, R3 em Dermatologia e foi aprovada em 1º lugar em Dermatologia na UNICAMP e na PUC Campinas.</p>
                    </div>
                </section>
                <section className="border-y border-line"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20"><div className="grid lg:grid-cols-3 gap-px border border-line bg-line">{offers.map((offer) => <Link key={offer.href} href={offer.href} className="group bg-paper p-8 sm:p-10 hover:bg-sand transition-colors"><span className="text-xs uppercase tracking-label text-copper-dark font-medium">{offer.number}</span><h2 className="mt-9 font-display text-4xl font-light leading-[1.04] group-hover:text-copper-dark transition-colors">{offer.title}</h2><p className="mt-6 leading-7 text-stone">{offer.text}</p><span className="inline-flex mt-9 text-sm font-medium underline underline-offset-8 decoration-copper">{offer.cta}</span></Link>)}</div></div></section>
            </main>
        </Layout>
    );
}
