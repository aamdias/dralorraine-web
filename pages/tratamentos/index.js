import Link from "next/link";
import { Layout } from "@components/Layout";
import { PageIntro } from "@components/Layout/PageIntro";
import SEO from "@components/SEO/SEO";
import { StructuredData, breadcrumbSchema, personSchema, practiceSchema } from "@components/StructuredData";
import { treatments } from "@data/treatments";

export default function TreatmentsIndex() {
    return (
        <Layout>
            <SEO
                title="Tratamentos Dermatológicos | Dra. Lorraine Souza"
                description="Tratamentos dermatológicos e de cosmiatria em Campinas e São Paulo com a Dra. Lorraine Souza, médica formada pela UNICAMP e R3 em Dermatologia. Conheça as opções e agende sua avaliação."
                keywords="tratamentos dermatológicos Campinas, tratamentos dermatológicos São Paulo, procedimentos de cosmiatria, Dra Lorraine Souza"
                url="/tratamentos"
            />
            <StructuredData graph={[
                personSchema(),
                practiceSchema(),
                breadcrumbSchema([{ name: "Início", path: "/" }, { name: "Tratamentos", path: "/tratamentos" }]),
                {
                    "@type": "ItemList",
                    name: "Tratamentos dermatológicos em Campinas e São Paulo",
                    itemListElement: treatments.map((treatment, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: treatment.procedureName,
                        url: `https://dralorraine.com/tratamentos/${treatment.slug}`
                    }))
                }
            ]} />

            <div className="bg-paper text-ink">
                <PageIntro
                    eyebrow="Tratamentos dermatológicos"
                    title={<>Procedimentos que começam por uma <em>boa indicação</em>.</>}
                    lead="Cada pele, rosto e objetivo pede uma conversa própria. A indicação começa por uma avaliação individual, sem protocolos prontos."
                    meta={<><span className="text-xs uppercase tracking-label text-copper-dark">Atendimento presencial</span><span>A Dra. Lorraine realiza estes procedimentos presencialmente em Campinas e São Paulo.</span></>}
                />

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
                            <p className="text-xs uppercase tracking-label text-rose font-medium">Consulta presencial em Campinas e São Paulo</p>
                            <h2 className="mt-5 font-display text-4xl sm:text-6xl font-light leading-[1.02]">Nem toda queixa pede o mesmo procedimento.</h2>
                            <p className="mt-6 max-w-2xl text-paper/75 leading-7">A consulta é o espaço para entender o que incomoda, examinar sua pele e decidir com clareza se há indicação. Isso inclui reconhecer quando a melhor escolha é não fazer um procedimento agora.</p>
                        </div>
                        <Link href="/consulta/agendar" className="inline-flex justify-center self-end bg-paper px-6 py-4 text-sm font-medium text-ink hover:bg-rose transition-colors">Agendar consulta</Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
