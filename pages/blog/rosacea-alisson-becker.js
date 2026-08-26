import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { StructuredData, breadcrumbSchema, faqSchema, personSchema } from "@components/StructuredData";
import { SITE, absoluteUrl } from "@utils/site";

const faqs = [
    { q: "Rosácea é acne?", a: "Não. As duas podem causar lesões semelhantes a espinhas, mas são condições diferentes. A rosácea costuma vir acompanhada de vermelhidão central persistente ou de crises de rubor e sensibilidade. A avaliação presencial ajuda a diferenciá-las e a reconhecer quando coexistem." },
    { q: "Rosácea tem cura?", a: "A rosácea é uma condição crônica, mas seus sinais e sintomas podem ser controlados. O plano é individual e pode reunir proteção solar, cuidados suaves com a pele, identificação de gatilhos, medicamentos e, em situações selecionadas, procedimentos para a vermelhidão ou vasos visíveis." },
    { q: "Quais fatores podem piorar a rosácea?", a: "Os gatilhos variam entre as pessoas. Calor, sol, bebidas alcoólicas, alimentos picantes, exercícios intensos e estresse são exemplos frequentes. Observar o que acontece com a sua pele é mais útil do que seguir uma lista rígida." },
    { q: "Rosácea pode afetar os olhos?", a: "Pode. Ardor, ressecamento, sensação de areia, olhos vermelhos, sensibilidade à luz ou alterações nas pálpebras merecem avaliação. Queixas oculares não devem ser tratadas apenas como irritação comum." },
    { q: "A Dra. Lorraine trata rosácea em Campinas?", a: "Sim. A Dra. Lorraine avalia e acompanha rosácea em consulta dermatológica em Campinas. O tratamento é definido conforme os sinais na pele, a sensibilidade, a rotina e os objetivos de cada pessoa." }
];

const SectionTitle = ({ children, id }) => (
    <h2 id={id} className="scroll-mt-32 font-display text-[2.35rem] sm:text-5xl font-light leading-[1.05] tracking-[-0.015em] mt-16 mb-6 text-ink">
        {children}
    </h2>
);

export default function RosaceaAlissonBeckerArticle() {
    return (
        <Layout>
            <SEO
                title="Rosácea: o que a vermelhidão do Alisson Becker ajuda a entender | Dra. Lorraine"
                description="A rosácea associada publicamente ao goleiro Alisson Becker chama atenção para uma condição inflamatória comum. Entenda sinais, gatilhos e tratamento com a Dra. Lorraine em Campinas."
                keywords="rosácea, rosácea Alisson Becker, rosto vermelho, dermatologista rosácea Campinas, tratamento rosácea"
                image="/alisson-becker-rosacea.png"
                imageAlt="Alisson Becker, goleiro brasileiro, em retrato durante uma partida"
                url="/blog/rosacea-alisson-becker"
                type="article"
                publishedTime="2026-08-26T00:00:00-03:00"
                modifiedTime="2026-08-26T00:00:00-03:00"
                section="Dermatologia clínica"
            />
            <StructuredData graph={[
                personSchema(),
                breadcrumbSchema([
                    { name: "Início", path: "/" },
                    { name: "Blog", path: "/blog" },
                    { name: "Rosácea: o que a vermelhidão do Alisson Becker ajuda a entender", path: "/blog/rosacea-alisson-becker" }
                ]),
                {
                    "@type": "BlogPosting",
                    "@id": absoluteUrl("/blog/rosacea-alisson-becker") + "#article",
                    headline: "Rosácea: o que a vermelhidão no rosto do goleiro Alisson ajuda a entender",
                    description: "Um guia educativo sobre rosácea: sinais, gatilhos, diagnóstico e possibilidades de tratamento dermatológico.",
                    datePublished: "2026-08-26",
                    dateModified: "2026-08-26",
                    inLanguage: "pt-BR",
                    mainEntityOfPage: absoluteUrl("/blog/rosacea-alisson-becker"),
                    articleSection: "Dermatologia clínica",
                    keywords: ["rosácea", "rosácea Alisson Becker", "tratamento de rosácea", "dermatologista em Campinas"],
                    about: { "@type": "MedicalCondition", name: "Rosácea" },
                    author: { "@id": SITE.url + "/#lorraine" },
                    publisher: { "@id": SITE.url + "/#lorraine" },
                    image: absoluteUrl("/alisson-becker-rosacea.png"),
                    isAccessibleForFree: true
                },
                faqSchema(faqs)
            ]} />

            <header className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20 bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_58%,#FAF6F0_100%)]">
                <div aria-hidden className="absolute -top-52 -right-44 h-[38rem] w-[38rem] rounded-full bg-rose/50 blur-3xl" />
                <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
                    <Image src="/alisson-becker-rosacea.png" alt="" fill priority sizes="46vw" className="object-cover object-[50%_17%] grayscale sepia-[.18] contrast-125 brightness-[.82] opacity-85" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,#F3ECE3_0%,rgba(243,236,227,.95)_15%,rgba(243,236,227,.34)_42%,transparent_68%)]" />
                    <div className="absolute inset-0 bg-copper/10 mix-blend-color" />
                </div>
                <div aria-hidden className="absolute left-[7%] bottom-0 h-px w-[86%] bg-[linear-gradient(90deg,transparent,#B48967,transparent)]" />
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <Link href="/blog" className="inline-flex text-sm text-stone hover:text-copper-dark transition-colors mb-12">← Voltar para o blog</Link>
                    <div className="max-w-[36rem]">
                        <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">Dermatologia clínica · Rosácea</p>
                        <h1 className="font-display font-light text-[3.05rem] sm:text-[4.8rem] leading-[0.99] tracking-[-0.025em] text-balance">Rosácea: o que a vermelhidão no rosto do goleiro Alisson ajuda a entender.</h1>
                        <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-8 text-stone">O assunto que chamou atenção no futebol abre espaço para falar de uma condição comum, tratável e muito mais complexa do que “ficar vermelho”.</p>
                        <div className="mt-10 pt-6 border-t border-copper/45 flex flex-wrap gap-x-7 gap-y-2 text-sm text-stone"><span>Por Dra. Lorraine Souza</span><span>Publicado em 26 de agosto de 2026</span><span>8 min de leitura</span></div>
                    </div>
                </div>
            </header>

            <article className="bg-paper text-slate">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_190px] gap-14 lg:gap-20">
                        <div className="text-lg leading-8">
                            <p className="text-xl sm:text-2xl leading-9 text-ink font-light">A vermelhidão no rosto do goleiro Alisson Becker voltou a ser assunto nas redes e na imprensa. A associação pública com rosácea pode ser um ponto de partida útil. Ela não serve para fazer diagnóstico à distância, mas para entender por que essa condição merece uma conversa dermatológica cuidadosa.</p>

                            <div className="mt-8 border border-copper/45 bg-sand p-6 sm:p-8 text-base leading-7"><p className="font-medium text-ink mb-2">Uma imagem não fecha diagnóstico.</p><p>Rosácea, acne, dermatite seborreica, irritação por produtos e outras condições podem se parecer. Este artigo explica a rosácea de forma educativa; não confirma o diagnóstico de uma pessoa a partir de fotos ou vídeos.</p></div>

                            <figure className="my-10 overflow-hidden border border-line bg-sand">
                                <Image src="/alisson-becker-rosacea.png" alt="Alisson Becker, goleiro brasileiro, em retrato durante uma partida" width={1200} height={1600} className="max-h-[42rem] w-full object-cover object-[50%_17%]" />
                                <figcaption className="border-t border-line px-5 py-4 text-sm leading-6 text-stone">Foto: Instagram/Reprodução / Boa Forma</figcaption>
                            </figure>

                            <SectionTitle id="o-que-e-rosacea">O que é rosácea?</SectionTitle>
                            <p>Rosácea é uma condição inflamatória crônica que aparece, em geral, na parte central do rosto: bochechas, nariz, testa e queixo. Ela pode alternar momentos de melhora e piora. Em algumas pessoas, o sinal mais marcante é o rubor que vem e vai; em outras, a vermelhidão se torna mais persistente.</p>
                            <p className="mt-5">Ardor, queimação, sensibilidade, ressecamento, vasos aparentes e lesões semelhantes a espinhas também podem fazer parte do quadro. Nem todo mundo apresenta todos esses sinais, e eles não têm a mesma intensidade ao longo do tempo.</p>

                            <SectionTitle id="por-que-nao-e-so-acne">Por que não é “só acne”</SectionTitle>
                            <p>As pápulas e pústulas da rosácea podem ser confundidas com espinhas. Essa semelhança é uma das razões pelas quais tantas pessoas tentam, por conta própria, uma rotina agressiva de acne e acabam com a pele ainda mais sensibilizada.</p>
                            <p className="mt-5">A diferença não deve ser decidida no espelho. Na consulta, observamos a distribuição das lesões, a presença de vermelhidão e vasos, a sensibilidade da pele, produtos em uso, medicamentos, história de crises e possíveis diagnósticos associados. Acne e rosácea podem até coexistir.</p>

                            <blockquote className="my-12 border-l border-copper pl-6 sm:pl-8 font-display text-3xl sm:text-4xl leading-tight font-light text-ink">Vermelhidão recorrente não é necessariamente vaidade, alergia ou “pele quente”: pode ser um sinal que merece investigação.</blockquote>

                            <SectionTitle id="gatilhos">O que pode desencadear ou piorar uma crise</SectionTitle>
                            <p>Não existe uma lista que vale igualmente para todas as pessoas. Calor, sol, variações bruscas de temperatura, atividade física intensa, bebidas alcoólicas, alimentos picantes e estresse são gatilhos relatados com frequência. Para algumas pessoas, determinados cosméticos ou sabonetes também têm impacto.</p>
                            <p className="mt-5">O objetivo não é viver evitando tudo. É perceber padrões, proteger a barreira da pele e montar uma rotina que seja possível manter. Um registro simples de crises pode ajudar muito na consulta.</p>

                            <SectionTitle id="olhos">Rosácea também pode envolver os olhos</SectionTitle>
                            <p>Olhos secos, sensação de areia, ardor, lacrimejamento, pálpebras irritadas ou vermelhidão ocular podem ter relação com rosácea. Esses sintomas merecem atenção porque o cuidado pode exigir acompanhamento conjunto com oftalmologia.</p>
                            <p className="mt-5">Se houver dor ocular, alteração visual, sensibilidade forte à luz ou piora importante, a avaliação deve ser mais rápida.</p>

                            <SectionTitle id="tratamento">Como tratamos rosácea em dermatologia</SectionTitle>
                            <p>Rosácea não tem uma solução única. Isso é uma boa notícia: o tratamento pode ser escolhido de acordo com o que incomoda e com o que a pele precisa naquele momento. Em geral, o plano combina cuidados gentis, fotoproteção adequada e identificação de gatilhos individuais.</p>
                            <p className="mt-5">Quando necessário, a dermatologista pode indicar medicamentos tópicos ou orais para a inflamação e lesões, além de tecnologias para vermelhidão persistente e vasos aparentes. A escolha, o momento e a segurança dos procedimentos dependem da avaliação da pele, do tom de pele, da sensibilidade e do histórico de cada paciente.</p>

                            <div className="mt-12 bg-ink text-paper p-8 sm:p-10"><p className="text-xs uppercase tracking-label text-rose font-medium">Consulta dermatológica em Campinas</p><h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.02] mt-5">Tratamento começa com o diagnóstico certo.</h2><p className="mt-5 max-w-xl text-paper/75 leading-7">Se sua pele fica vermelha com facilidade, arde ou apresenta lesões recorrentes, uma consulta ajuda a separar hipóteses e construir um plano realista.</p><div className="flex flex-wrap gap-4 mt-8"><Link href="/consulta" className="inline-flex border border-paper/50 px-6 py-4 text-sm font-medium hover:bg-paper hover:text-ink transition-colors">Como funciona a consulta</Link><Link href="/consulta/agendar" className="inline-flex bg-paper text-ink px-6 py-4 text-sm font-medium hover:bg-rose transition-colors">Agendar consulta</Link></div></div>

                            <SectionTitle id="perguntas-frequentes">Perguntas frequentes</SectionTitle>
                            <div className="border-t border-line">{faqs.map((faq) => <section key={faq.q} className="py-7 border-b border-line"><h3 className="font-display text-2xl font-light text-ink leading-tight">{faq.q}</h3><p className="mt-3 text-base leading-7">{faq.a}</p></section>)}</div>

                            <div className="mt-12 pt-7 border-t border-line text-sm leading-6 text-stone"><p className="font-medium text-ink">Referências médicas e contexto</p><ul className="mt-2 space-y-2"><li><a className="underline underline-offset-4 hover:text-copper-dark" href="https://www.aad.org/public/diseases/rosacea/what-is/overview" target="_blank" rel="noreferrer">American Academy of Dermatology: visão geral da rosácea</a></li><li><a className="underline underline-offset-4 hover:text-copper-dark" href="https://www.aad.org/public/diseases/rosacea/treatment/diagnosis-treat" target="_blank" rel="noreferrer">American Academy of Dermatology: diagnóstico e tratamento</a></li><li><a className="underline underline-offset-4 hover:text-copper-dark" href="https://www.aad.org/public/diseases/rosacea/treatment/necessary" target="_blank" rel="noreferrer">American Academy of Dermatology: rosácea ocular e necessidade de tratamento</a></li><li><a className="underline underline-offset-4 hover:text-copper-dark" href="https://saude.abril.com.br/medicina/o-que-o-goleiro-alisson-tem-na-pele/" target="_blank" rel="noreferrer">Veja Saúde: reportagem sobre a associação pública entre Alisson Becker e rosácea</a></li></ul><p className="mt-3">Este conteúdo é educativo e não substitui uma avaliação médica individual.</p></div>
                        </div>

                        <aside className="hidden lg:block lg:pt-3"><nav aria-label="Navegação deste artigo" className="lg:sticky lg:top-28 border-t border-b border-line py-5 text-sm text-stone"><p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-4">Neste artigo</p><ol className="space-y-3 leading-5 list-none p-0 m-0"><li><a href="#o-que-e-rosacea" className="hover:text-copper-dark">O que é rosácea</a></li><li><a href="#por-que-nao-e-so-acne" className="hover:text-copper-dark">Rosácea e acne</a></li><li><a href="#gatilhos" className="hover:text-copper-dark">Gatilhos</a></li><li><a href="#olhos" className="hover:text-copper-dark">Olhos</a></li><li><a href="#tratamento" className="hover:text-copper-dark">Tratamento</a></li><li><a href="#perguntas-frequentes" className="hover:text-copper-dark">Perguntas frequentes</a></li></ol></nav></aside>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
