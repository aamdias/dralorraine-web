import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { StructuredData, breadcrumbSchema, faqSchema, personSchema } from "@components/StructuredData";
import { SITE, absoluteUrl } from "@utils/site";

const faqs = [
    {
        q: "Bioestimulador de colágeno é a mesma coisa que preenchimento?",
        a: "Não necessariamente. Preenchedores e bioestimuladores têm materiais, mecanismos e objetivos diferentes. Alguns produtos podem proporcionar efeito de suporte ao mesmo tempo em que estimulam uma resposta de colágeno. A escolha depende da queixa, da região e do plano de tratamento individual."
    },
    {
        q: "O bioestimulador substitui skincare e protetor solar?",
        a: "Não. Fotoproteção, rotina de cuidados e acompanhamento dermatológico continuam importantes para a saúde da pele. O procedimento, quando indicado, pode fazer parte de uma estratégia mais ampla — não substituí-la."
    },
    {
        q: "O resultado é imediato?",
        a: "A resposta relacionada ao colágeno é gradual e varia de pessoa para pessoa. Dependendo do produto e do objetivo, pode haver mudanças iniciais ligadas ao próprio procedimento, mas o acompanhamento é o que permite avaliar a evolução com segurança."
    },
    {
        q: "Quantas sessões são necessárias?",
        a: "Não existe um número universal. Produto, área tratada, qualidade da pele, grau de flacidez, histórico e objetivo influenciam o planejamento. Essa definição deve ser feita na consulta."
    },
    {
        q: "Quem pode fazer bioestimulador de colágeno?",
        a: "A indicação é individual. Na consulta, são avaliados o histórico de saúde, medicamentos, alergias, pele, anatomia e expectativas. Em algumas situações, o procedimento pode não ser indicado ou precisar ser adiado."
    }
];

const SectionTitle = ({ children, id }) => (
    <h2
        id={id}
        className="scroll-mt-32 mt-16 mb-6 font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.015em] text-ink sm:text-5xl"
    >
        {children}
    </h2>
);

export default function BioestimuladorDeColagenoArticle() {
    return (
        <Layout>
            <SEO
                title="Bioestimulador de colágeno: envelhecer bem começa antes da flacidez | Dra. Lorraine"
                description="Entenda a relação entre bioestimulador de colágeno e envelhecer bem: o que o procedimento faz, o que não promete e por que a indicação precisa ser individual."
                keywords="bioestimulador de colágeno, envelhecer bem, flacidez, bioestimulador Campinas, dermatologista Campinas"
                image="/blog-bioestimulador-colageno-hero.png"
                imageAlt="Mulher adulta em consulta dermatológica, representando uma abordagem cuidadosa para envelhecer bem"
                url="/blog/bioestimulador-de-colageno"
                type="article"
                publishedTime="2026-08-28T00:00:00-03:00"
                modifiedTime="2026-08-28T00:00:00-03:00"
                section="Procedimentos dermatológicos"
            />
            <StructuredData
                graph={[
                    personSchema(),
                    breadcrumbSchema([
                        { name: "Início", path: "/" },
                        { name: "Blog", path: "/blog" },
                        { name: "Bioestimulador de colágeno", path: "/blog/bioestimulador-de-colageno" }
                    ]),
                    {
                        "@type": "BlogPosting",
                        "@id": absoluteUrl("/blog/bioestimulador-de-colageno") + "#article",
                        headline: "Bioestimulador de colágeno: o que ele tem a ver com envelhecer bem?",
                        description: "Um guia educativo sobre a relação entre bioestimuladores de colágeno, qualidade da pele e uma abordagem individual para envelhecer bem.",
                        datePublished: "2026-08-28",
                        dateModified: "2026-08-28",
                        inLanguage: "pt-BR",
                        mainEntityOfPage: absoluteUrl("/blog/bioestimulador-de-colageno"),
                        articleSection: "Procedimentos dermatológicos",
                        keywords: ["bioestimulador de colágeno", "envelhecer bem", "flacidez", "dermatologista em Campinas"],
                        about: { "@type": "MedicalProcedure", name: "Bioestimulação de colágeno" },
                        author: { "@id": SITE.url + "/#lorraine" },
                        publisher: { "@id": SITE.url + "/#lorraine" },
                        image: absoluteUrl("/blog-bioestimulador-colageno-hero.png")
                    },
                    faqSchema(faqs)
                ]}
            />

            <header className="relative overflow-hidden bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_58%,#FAF6F0_100%)] pt-36 pb-16 sm:pt-44 sm:pb-20">
                <div aria-hidden className="absolute -top-52 -right-44 h-[38rem] w-[38rem] rounded-full bg-rose/50 blur-3xl" />
                <div aria-hidden className="absolute bottom-0 left-[7%] h-px w-[86%] bg-[linear-gradient(90deg,transparent,#B48967,transparent)]" />
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
                    <Link href="/blog" className="mb-12 inline-flex text-sm text-stone transition-colors hover:text-copper-dark">
                        ← Voltar para o blog
                    </Link>
                    <p className="mb-6 text-xs font-medium uppercase tracking-label text-copper-dark">
                        Envelhecimento saudável · Bioestimuladores
                    </p>
                    <h1 className="text-balance font-display text-[3.05rem] font-light leading-[0.99] tracking-[-0.025em] sm:text-[4.8rem]">
                        Bioestimulador de colágeno: o que ele tem a ver com envelhecer bem?
                    </h1>
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-stone sm:text-xl">
                        Envelhecer bem não é tentar congelar o tempo. É entender o que muda na pele e escolher, com critério, o que faz sentido cuidar.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-copper/45 pt-6 text-sm text-stone">
                        <span>Por Dra. Lorraine Souza</span>
                        <span>28 de agosto de 2026</span>
                        <span>6 min de leitura</span>
                    </div>
                </div>
            </header>

            <article className="bg-paper text-slate">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
                    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-20">
                        <div className="text-lg leading-8">
                            <p className="text-xl font-light leading-9 text-ink sm:text-2xl">
                                Quando se fala em envelhecimento, muita gente pensa primeiro em rugas. Mas, ao longo do tempo, a pele também muda em espessura, elasticidade, textura e capacidade de sustentação. É aí que o colágeno entra na conversa — e que os bioestimuladores podem ter um papel, quando bem indicados.
                            </p>

                            <figure className="my-10 overflow-hidden border border-line bg-sand">
                                <Image
                                    src="/blog-bioestimulador-colageno-hero.png"
                                    alt="Mulher adulta em uma clínica dermatológica, com aparência natural e expressão serena"
                                    width={1774}
                                    height={887}
                                    className="h-auto w-full"
                                    priority
                                />
                                <figcaption className="border-t border-line px-5 py-4 text-sm leading-6 text-stone">
                                    Envelhecer bem tem mais a ver com preservar identidade e saúde da pele do que perseguir um rosto sem movimento.
                                </figcaption>
                            </figure>

                            <SectionTitle id="a-relacao" >A relação que pouca gente explica</SectionTitle>
                            <p>
                                Colágeno é uma proteína que ajuda a formar a estrutura de suporte de vários tecidos do corpo, incluindo a pele. Com o passar dos anos, fatores naturais do envelhecimento, exposição solar acumulada, tabagismo e outras características individuais participam das mudanças que percebemos no espelho.
                            </p>
                            <p className="mt-5">
                                Por isso, cuidar do envelhecimento não precisa começar quando a flacidez já incomoda muito. Em alguns casos, conversar cedo sobre qualidade da pele e estímulo de colágeno permite construir um plano mais gradual, realista e respeitoso com a fisionomia de cada pessoa. Isso não significa que todo mundo precise fazer um procedimento — significa que existe uma conversa mais ampla do que “preencher ou não preencher”.
                            </p>

                            <blockquote className="my-12 border-l border-copper pl-6 font-display text-3xl font-light leading-tight text-ink sm:pl-8 sm:text-4xl">
                                O melhor cuidado não é o que apaga a passagem do tempo. É o que acompanha suas mudanças sem apagar quem você é.
                            </blockquote>

                            <SectionTitle id="o-que-e">O que é um bioestimulador de colágeno?</SectionTitle>
                            <p>
                                Bioestimulador é o nome usado para materiais injetáveis que, em contextos e regiões específicos, podem desencadear uma resposta do organismo relacionada à formação de colágeno. Entre os materiais utilizados na dermatologia estão, por exemplo, o ácido poli-L-láctico e a hidroxiapatita de cálcio. Eles não são todos iguais: têm características, indicações, técnicas e perfis de segurança próprios.
                            </p>
                            <p className="mt-5">
                                Esse é um ponto importante: bioestimular não é “injetar colágeno pronto”, nem é sinônimo de preenchimento. O objetivo pode ser trabalhar, de forma gradual, aspectos como qualidade da pele e suporte dos tecidos. O que será tratado — e se esse é o tratamento adequado — depende de uma avaliação presencial.
                            </p>

                            <figure className="my-10 overflow-hidden border border-line bg-sand">
                                <Image
                                    src="/blog-bioestimulador-colageno-derme.png"
                                    alt="Ilustração educativa da pele mostrando uma rede de fibras de colágeno na derme"
                                    width={1774}
                                    height={887}
                                    className="h-auto w-full"
                                />
                                <figcaption className="flex flex-col gap-3 border-t border-line px-5 py-4 text-sm leading-6 text-stone sm:flex-row sm:items-center sm:justify-between">
                                    <span>Esquema educativo: o colágeno é parte da rede de suporte da derme. A resposta a um tratamento varia conforme pessoa, produto e planejamento.</span>
                                    <a href="/blog-bioestimulador-colageno-derme.png" target="_blank" rel="noreferrer" className="w-fit shrink-0 border-b border-copper-dark text-copper-dark hover:text-ink">Ampliar imagem</a>
                                </figcaption>
                            </figure>

                            <SectionTitle id="o-que-ele-nao-faz">O que ele não promete</SectionTitle>
                            <p>
                                Um bioestimulador não interrompe o envelhecimento, não substitui o protetor solar e não entrega o mesmo resultado para todas as pessoas. Também não é uma solução automática para qualquer queixa de flacidez, rugas ou perda de volume. Promessas de “rejuvenescer muitos anos” simplificam demais uma decisão médica.
                            </p>
                            <p className="mt-5">
                                Resultados podem ser progressivos e o acompanhamento é parte do processo. A resposta depende de fatores como anatomia, qualidade da pele, idade, hábitos, produto escolhido, área tratada e técnica. Uma avaliação responsável também considera quando outra abordagem — ou nenhum procedimento naquele momento — é mais coerente.
                            </p>

                            <SectionTitle id="envelhecer-bem">Então, como ele se relaciona com envelhecer bem?</SectionTitle>
                            <p>
                                Envelhecer bem é um conceito pessoal. Para algumas pessoas, significa manter a pele com aparência descansada; para outras, tratar mudanças que passaram a incomodar, sem perder expressão. O bioestimulador pode integrar esse cuidado quando existe indicação para trabalhar a estrutura e a qualidade dos tecidos de maneira planejada.
                            </p>
                            <p className="mt-5">
                                A diferença está na intenção. Em vez de perseguir uma transformação imediata, o plano busca entender o rosto e a pele como um todo: o que já funciona bem, o que merece atenção e qual resultado continua parecendo verdadeiro para você.
                            </p>

                            <SectionTitle id="seguranca">Segurança começa antes do procedimento</SectionTitle>
                            <p>
                                Por ser um procedimento injetável, a decisão exige consulta médica, produto regularizado e técnica apropriada. Histórico de saúde, uso de medicamentos, alergias, doenças de pele, tendência a cicatrizes e tratamentos recentes precisam entrar na conversa. Gestação, amamentação e outras situações clínicas também devem ser avaliadas individualmente.
                            </p>
                            <div className="mt-8 border border-copper/45 bg-sand p-6 text-base leading-7 sm:p-8">
                                <p className="mb-2 font-medium text-ink">Uma boa consulta não começa pela seringa.</p>
                                <p>Ela começa por ouvir sua queixa, examinar a pele e discutir benefícios possíveis, limites, alternativas e riscos. Produtos estéticos devem ser regularizados; no Brasil, a situação pode ser consultada nos canais oficiais da Anvisa.</p>
                            </div>

                            <SectionTitle id="na-consulta">Como eu avalio a indicação em Campinas</SectionTitle>
                            <p>
                                Na consulta, observo pele, anatomia, movimentos, proporções e as mudanças que mais importam para você. O plano pode incluir fotoproteção, skincare, tratamento de manchas, tecnologias, outros procedimentos ou apenas acompanhamento. Bioestimulador é uma possibilidade — não uma resposta pronta.
                            </p>
                            <p className="mt-5">
                                A ideia é que você saia entendendo a decisão. Quando há indicação, definimos produto, regiões, número de etapas e acompanhamento de forma individual. Quando não há, a melhor conduta é reconhecer isso com clareza.
                            </p>

                            <div className="mt-12 bg-ink p-8 text-paper sm:p-10">
                                <p className="text-xs font-medium uppercase tracking-label text-rose">Consulta dermatológica em Campinas</p>
                                <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] sm:text-5xl">Cuidar da pele é também cuidar da sua história.</h2>
                                <p className="mt-5 max-w-xl leading-7 text-paper/75">Converse sobre suas prioridades e descubra se o bioestimulador faz sentido no seu plano de cuidado.</p>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link href="/tratamentos/bioestimulador-de-colageno" className="inline-flex border border-paper/50 px-6 py-4 text-sm font-medium transition-colors hover:bg-paper hover:text-ink">Conhecer o tratamento</Link>
                                    <Link href="/consulta/agendar" className="inline-flex bg-paper px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-rose">Agendar consulta</Link>
                                </div>
                            </div>

                            <SectionTitle id="perguntas-frequentes">Perguntas frequentes</SectionTitle>
                            <div className="border-t border-line">
                                {faqs.map((faq) => (
                                    <section key={faq.q} className="border-b border-line py-7">
                                        <h3 className="font-display text-2xl font-light leading-tight text-ink">{faq.q}</h3>
                                        <p className="mt-3 text-base leading-7">{faq.a}</p>
                                    </section>
                                ))}
                            </div>

                            <div className="mt-12 border-t border-line pt-7 text-sm leading-6 text-stone">
                                <p className="font-medium text-ink">Referências médicas</p>
                                <ul className="mt-2 space-y-2">
                                    <li><a className="underline underline-offset-4 hover:text-copper-dark" href="https://www.accessdata.fda.gov/cdrh_docs/pdf3/P030050S002C.pdf" target="_blank" rel="noreferrer">FDA: guia ao paciente sobre ácido poli-L-láctico injetável</a></li>
                                    <li><a className="underline underline-offset-4 hover:text-copper-dark" href="https://www.accessdata.fda.gov/cdrh_docs/pdf5/p050037c.pdf" target="_blank" rel="noreferrer">FDA: instruções de uso de hidroxiapatita de cálcio injetável</a></li>
                                    <li><a className="underline underline-offset-4 hover:text-copper-dark" href="https://www.gov.br/anvisa/pt-br/comunicacao/campanhas/estetica/consulta-de-produtos" target="_blank" rel="noreferrer">Anvisa: consulta de produtos para saúde regularizados</a></li>
                                </ul>
                                <p className="mt-3">Este conteúdo é educativo e não substitui uma avaliação médica individual.</p>
                            </div>
                        </div>

                        <aside className="hidden lg:block lg:pt-3">
                            <nav aria-label="Navegação deste artigo" className="sticky top-28 border-t border-b border-line py-5 text-sm text-stone">
                                <p className="mb-4 text-xs font-medium uppercase tracking-label text-copper-dark">Neste artigo</p>
                                <ol className="m-0 list-none space-y-3 p-0 leading-5">
                                    <li><a href="#a-relacao" className="hover:text-copper-dark">A relação com o envelhecimento</a></li>
                                    <li><a href="#o-que-e" className="hover:text-copper-dark">O que é bioestimulador</a></li>
                                    <li><a href="#o-que-ele-nao-faz" className="hover:text-copper-dark">O que ele não promete</a></li>
                                    <li><a href="#envelhecer-bem" className="hover:text-copper-dark">Envelhecer bem</a></li>
                                    <li><a href="#seguranca" className="hover:text-copper-dark">Segurança</a></li>
                                    <li><a href="#perguntas-frequentes" className="hover:text-copper-dark">Perguntas frequentes</a></li>
                                </ol>
                            </nav>
                        </aside>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
