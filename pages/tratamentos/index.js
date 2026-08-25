import Link from "next/link";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { StructuredData, breadcrumbSchema, personSchema, practiceSchema } from "@components/StructuredData";
import { treatments } from "@data/treatments";

export default function TreatmentsIndex() {
    return (
        <Layout>
            <SEO
                title="Tratamentos Dermatológicos | Dra. Lorraine Souza"
                description="Tratamentos dermatológicos e de cosmiatria em Campinas com a Dra. Lorraine Souza, médica formada pela UNICAMP e R3 em Dermatologia. Conheça as opções e agende sua avaliação."
                keywords="tratamentos dermatológicos Campinas, procedimentos estéticos Campinas, Dra Lorraine Souza"
                url="/tratamentos"
            />
            <StructuredData graph={[
                personSchema(),
                practiceSchema(),
                breadcrumbSchema([{ name: "Início", path: "/" }, { name: "Tratamentos", path: "/tratamentos" }]),
                {
                    "@type": "ItemList",
                    name: "Tratamentos dermatológicos em Campinas",
                    itemListElement: treatments.map((treatment, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: treatment.procedureName,
                        url: `https://dralorraine.com/tratamentos/${treatment.slug}`
                    }))
                }
            ]} />

            <main className="bg-paper text-ink">
                <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
                    <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_52%,#FAF6F0_100%)]" />
                    <div aria-hidden className="absolute -right-24 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-rose/60 blur-3xl" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">Tratamentos dermatológicos</p>
                        <h1 className="max-w-4xl font-display font-light text-[3.25rem] sm:text-display-xl leading-[0.98] tracking-[-0.025em] text-balance">Procedimentos que começam por uma <span className="italic text-copper-dark">boa indicação</span>.</h1>
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-stone">Cada pele, rosto e objetivo pede uma conversa própria. A indicação começa por uma avaliação individual, sem protocolos prontos.</p>
                        <div className="mt-10 flex max-w-2xl flex-col gap-2 border-l border-copper pl-5 sm:flex-row sm:items-baseline sm:gap-5">
                            <span className="text-xs uppercase tracking-label text-copper-dark font-medium">Atendimento presencial</span>
                            <span className="text-sm leading-6 text-stone">A Dra. Lorraine realiza estes procedimentos no consultório em Campinas, São Paulo.</span>
                        </div>
                    </div>
                </section>

                <section className="border-y border-line">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
                        <div className="grid lg:grid-cols-3 gap-px border border-line bg-line">
                            {treatments.map((treatment, index) => (
                                <Link key={treatment.slug} href={`/tratamentos/${treatment.slug}`} className={`group min-h-[18rem] bg-paper p-7 sm:p-9 transition-colors hover:bg-sand ${index === treatments.length - 1 ? "lg:col-span-2" : ""}`}>
                                    <span className="text-xs uppercase tracking-label text-copper-dark font-medium">{String(index + 1).padStart(2, "0")}</span>
                                    <h2 className="mt-8 max-w-md font-display text-4xl font-light leading-[1.03] tracking-[-0.02em] group-hover:text-copper-dark transition-colors">{treatment.name}</h2>
                                    <p className="mt-5 max-w-lg leading-7 text-stone">{treatment.intro}</p>
                                    <span className="inline-flex mt-8 text-sm font-medium underline underline-offset-8 decoration-copper">Conhecer tratamento</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-ink text-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-20 items-end">
                        <div>
                            <p className="text-xs uppercase tracking-label text-rose font-medium">Consulta presencial em Campinas</p>
                            <h2 className="mt-5 font-display text-4xl sm:text-6xl font-light leading-[1.02]">Nem toda queixa pede o mesmo procedimento.</h2>
                            <p className="mt-6 max-w-2xl text-paper/75 leading-7">A consulta é o espaço para entender o que incomoda, examinar sua pele e decidir com clareza se há indicação. Isso inclui reconhecer quando a melhor escolha é não fazer um procedimento agora.</p>
                        </div>
                        <Link href="/consulta/agendar" className="inline-flex justify-center self-end bg-paper px-6 py-4 text-sm font-medium text-ink hover:bg-rose transition-colors">Agendar consulta</Link>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
