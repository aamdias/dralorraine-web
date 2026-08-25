import Link from "next/link";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { StructuredData, breadcrumbSchema, faqSchema, personSchema, practiceSchema } from "@components/StructuredData";
import { TreatmentVisual } from "@components/TreatmentVisual";
import { treatments, treatmentBySlug } from "@data/treatments";
import { absoluteUrl, SITE } from "@utils/site";

const SectionTitle = ({ children, id }) => (
    <h2 id={id} className="scroll-mt-32 font-display text-[2.4rem] sm:text-5xl font-light leading-[1.05] tracking-[-0.015em] text-ink">{children}</h2>
);

export default function TreatmentPage({ treatment }) {
    const path = `/tratamentos/${treatment.slug}`;
    const medicalProcedure = {
        "@type": "MedicalProcedure",
        "@id": `${absoluteUrl(path)}#procedure`,
        name: treatment.procedureName,
        description: treatment.description,
        howPerformed: "Procedimento presencial, após avaliação individual, em Campinas, São Paulo.",
        provider: { "@id": SITE.url + "/#consultorio" },
        performer: { "@id": SITE.url + "/#lorraine" }
    };

    return (
        <Layout>
            <SEO title={`${treatment.name} | Dra. Lorraine Souza`} description={treatment.description} keywords={`${treatment.procedureName}, dermatologia Campinas, Dra. Lorraine Souza`} url={path} />
            <StructuredData graph={[
                personSchema(),
                practiceSchema(),
                breadcrumbSchema([{ name: "Início", path: "/" }, { name: "Tratamentos", path: "/tratamentos" }, { name: treatment.procedureName, path }]),
                medicalProcedure,
                faqSchema(treatment.faqs)
            ]} />

            <main className="bg-paper text-slate">
                <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
                    <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_58%,#FAF6F0_100%)]" />
                    <div aria-hidden className="absolute -right-24 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-rose/60 blur-3xl" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/tratamentos" className="inline-flex text-sm text-stone hover:text-copper-dark transition-colors mb-12">← Todos os tratamentos</Link>
                        <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">{treatment.eyebrow}</p>
                        <h1 className="max-w-5xl font-display font-light text-[3.15rem] sm:text-display-xl leading-[0.98] tracking-[-0.025em] text-balance">{treatment.title}</h1>
                        <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-8 text-stone">Atendimento presencial com a Dra. Lorraine Souza em Campinas, São Paulo. Médica formada pela UNICAMP e R3 em Dermatologia.</p>
                    </div>
                </section>

                <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xl sm:text-2xl leading-9 text-ink font-light">{treatment.intro}</p>
                    </div>

                    <TreatmentVisual slug={treatment.slug} />

                    <div className="mt-20 grid gap-14 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-24">
                        <div className="max-w-3xl">
                            <section className="mt-16 pt-14 border-t border-line">
                                <SectionTitle id="para-quem">Quando pode fazer sentido?</SectionTitle>
                                <ul className="mt-8 space-y-4">
                                    {treatment.idealFor.map((item) => <li key={item} className="flex gap-4 leading-7"><span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-copper" />{item}</li>)}
                                </ul>
                                <p className="mt-8 leading-7">Esses pontos não substituem a avaliação. A indicação depende do diagnóstico, do momento da sua pele, de condições de saúde e das suas expectativas.</p>
                            </section>

                            <section className="mt-16 pt-14 border-t border-line">
                                <SectionTitle id="como-e-planejado">Como a Dra. Lorraine planeja o tratamento</SectionTitle>
                                <p className="mt-7 leading-7">{treatment.approach}</p>
                                <div className="mt-9 border-l border-copper bg-sand px-6 py-6 sm:px-8 leading-7 text-ink">Nenhum procedimento é vendido como obrigação: a proposta só avança quando a indicação é segura e faz sentido para você.</div>
                            </section>

                            <section className="mt-16 pt-14 border-t border-line">
                                <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-5">Presença local</p>
                                <SectionTitle id="atendimento-em-campinas">Atendimento presencial em Campinas</SectionTitle>
                                <p className="mt-7 leading-7">A Dra. Lorraine realiza o procedimento de {treatment.procedureName.toLocaleLowerCase("pt-BR")} presencialmente no consultório em Campinas, São Paulo. Antes de qualquer aplicação, a consulta permite examinar sua pele, revisar seu histórico e decidir se esse tratamento é realmente indicado para você.</p>
                            </section>

                            <section className="mt-16 pt-14 border-t border-line">
                                <SectionTitle id="o-que-esperar">O que esperar</SectionTitle>
                                <p className="mt-7 leading-7">{treatment.expectations}</p>
                                <p className="mt-5 leading-7">Antes do procedimento, informe medicamentos em uso, alergias, condições de saúde, gestação ou amamentação, procedimentos prévios e qualquer reação relevante. Essas informações orientam uma decisão segura.</p>
                            </section>

                            <section className="mt-16 pt-14 border-t border-line">
                                <SectionTitle id="perguntas-frequentes">Perguntas frequentes</SectionTitle>
                                <div className="mt-8 border-t border-line">
                                    {treatment.faqs.map((faq) => <section key={faq.q} className="py-7 border-b border-line"><h3 className="font-display text-2xl font-light text-ink leading-tight">{faq.q}</h3><p className="mt-3 leading-7">{faq.a}</p></section>)}
                                </div>
                            </section>
                        </div>

                        <aside className="lg:pt-2">
                            <div className="lg:sticky lg:top-28 border border-line bg-sand p-7 sm:p-8">
                                <p className="text-xs uppercase tracking-label text-copper-dark font-medium">Avaliação individual</p>
                                <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] text-ink">O primeiro passo é a consulta.</h2>
                                <p className="mt-5 text-sm leading-6 text-stone">Em Campinas, a avaliação presencial permite examinar a pele e conversar sobre indicação, alternativas e cuidados.</p>
                                <Link href="/consulta/agendar" className="inline-flex mt-7 bg-ink px-5 py-3.5 text-sm font-medium text-paper hover:bg-copper-dark transition-colors">Agendar consulta</Link>
                                <p className="mt-7 pt-6 border-t border-line text-xs leading-5 text-stone">Conteúdo educativo. Não substitui avaliação médica individual.</p>
                            </div>
                        </aside>
                    </div>
                </article>
            </main>
        </Layout>
    );
}

export const getStaticPaths = () => ({ paths: treatments.map((treatment) => ({ params: { slug: treatment.slug } })), fallback: false });

export const getStaticProps = ({ params }) => ({ props: { treatment: treatmentBySlug(params.slug) } });
