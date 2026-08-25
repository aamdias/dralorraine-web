import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import {
    StructuredData,
    breadcrumbSchema,
    faqSchema,
    personSchema
} from "@components/StructuredData";
import { SITE, absoluteUrl } from "@utils/site";

const faqs = [
    {
        q: "Botox e toxina botulínica são a mesma coisa?",
        a: "Botox é uma marca de toxina botulínica. Na prática, o termo Botox costuma ser usado para se referir ao tratamento com toxina botulínica, mas existem diferentes produtos e cada um deve ser escolhido e aplicado por um profissional habilitado."
    },
    {
        q: "O Botox deixa o rosto sem expressão?",
        a: "Não precisa deixar. Um plano bem indicado considera a anatomia, a força muscular e a expressão que a pessoa deseja preservar. O objetivo pode ser suavizar movimentos específicos mantendo naturalidade."
    },
    {
        q: "Quanto tempo dura o efeito da toxina botulínica?",
        a: "A duração varia conforme a região tratada, o produto, a dose, a musculatura e a resposta individual. Por isso, o intervalo entre aplicações deve ser definido na consulta e respeitar a recomendação do produto utilizado."
    },
    {
        q: "Quem pode aplicar toxina botulínica?",
        a: "O procedimento deve ser realizado por profissional habilitado, em serviço autorizado pela vigilância sanitária, com medicamento regularizado e dentro das orientações de bula."
    },
    {
        q: "A Dra. Lorraine faz Botox em Campinas?",
        a: "Sim. A Dra. Lorraine realiza aplicações de toxina botulínica presencialmente em Campinas, após consulta dermatológica para avaliar indicação, segurança e objetivos individuais."
    }
];

const ArticleHeader = () => (
    <header className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20 bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_58%,#FAF6F0_100%)]">
        <div aria-hidden className="absolute -top-52 -right-44 h-[38rem] w-[38rem] rounded-full bg-rose/50 blur-3xl" />
        <div aria-hidden className="absolute left-[7%] bottom-0 h-px w-[86%] bg-[linear-gradient(90deg,transparent,#B48967,transparent)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Link href="/blog" className="inline-flex text-sm text-stone hover:text-copper-dark transition-colors mb-12">
                ← Voltar para o blog
            </Link>
            <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">Procedimentos · Toxina botulínica</p>
            <h1 className="font-display font-light text-[3.05rem] sm:text-[4.8rem] leading-[0.99] tracking-[-0.025em] text-balance">
                Botox em Campinas: quando faz sentido e o que esperar do tratamento
            </h1>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-8 text-stone">
                Uma conversa honesta sobre toxina botulínica: sem fórmulas prontas, com foco em segurança, naturalidade e indicação individual.
            </p>
            <div className="mt-10 pt-6 border-t border-copper/45 flex flex-wrap gap-x-7 gap-y-2 text-sm text-stone">
                <span>Por Dra. Lorraine Souza</span>
                <span>24 de agosto de 2026</span>
                <span>6 min de leitura</span>
            </div>
        </div>
    </header>
);

const SectionTitle = ({ children, id }) => (
    <h2 id={id} className="scroll-mt-32 font-display text-[2.35rem] sm:text-5xl font-light leading-[1.05] tracking-[-0.015em] mt-16 mb-6 text-ink">
        {children}
    </h2>
);

export default function BotoxArticle() {
    return (
        <Layout>
            <SEO
                title="Botox em Campinas: quando faz sentido | Dra. Lorraine"
                description="Botox em Campinas com a Dra. Lorraine: entenda como funciona a toxina botulínica, para quem pode ser indicada e quais cuidados tornam o tratamento seguro e natural."
                keywords="botox, toxina botulínica, botox Campinas, dermatologista Campinas, procedimento estético"
                image="/blog-botox-anatomia.jpg"
                imageAlt="Ilustração educativa dos músculos faciais e linhas de expressão"
                url="/blog/botox"
                type="article"
                publishedTime="2026-08-24T00:00:00-03:00"
                modifiedTime="2026-08-24T00:00:00-03:00"
                section="Procedimentos dermatológicos"
            />
            <StructuredData
                graph={[
                    personSchema(),
                    breadcrumbSchema([
                        { name: "Início", path: "/" },
                        { name: "Blog", path: "/blog" },
                        { name: "Botox em Campinas: quando faz sentido e o que esperar do tratamento", path: "/blog/botox" }
                    ]),
                    {
                        "@type": "BlogPosting",
                        "@id": absoluteUrl("/blog/botox") + "#article",
                        headline: "Botox em Campinas: quando faz sentido e o que esperar do tratamento",
                        description: "Botox em Campinas com a Dra. Lorraine: entenda como funciona a toxina botulínica, para quem pode ser indicada e quais cuidados tornam o tratamento seguro e natural.",
                        datePublished: "2026-08-24",
                        dateModified: "2026-08-24",
                        inLanguage: "pt-BR",
                        mainEntityOfPage: absoluteUrl("/blog/botox"),
                        articleSection: "Procedimentos dermatológicos",
                        keywords: ["Botox em Campinas", "toxina botulínica", "dermatologista em Campinas"],
                        about: {
                            "@type": "MedicalProcedure",
                            name: "Toxina botulínica"
                        },
                        author: { "@id": SITE.url + "/#lorraine" },
                        publisher: { "@id": SITE.url + "/#lorraine" },
                        image: absoluteUrl("/blog-botox-anatomia.jpg")
                    },
                    faqSchema(faqs)
                ]}
            />

            <ArticleHeader />

            <article className="bg-paper text-slate">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_190px] gap-14 lg:gap-20">
                        <div className="text-[1.0625rem] leading-8">
                            <p className="font-display text-[2rem] sm:text-[2.25rem] font-light leading-[1.25] text-ink mb-9">
                                Quando alguém me pergunta sobre Botox, eu começo por uma ideia importante: não existe um rosto ideal. Existe o seu rosto, o seu movimento e o que faz sentido para você.
                            </p>
                            <p>
                                Botox é o nome mais conhecido para o tratamento com toxina botulínica. Na dermatologia estética, ela pode ser usada para suavizar temporariamente linhas que aparecem com a contração dos músculos, por exemplo, ao franzir a testa, sorrir ou elevar as sobrancelhas.
                            </p>

                            <SectionTitle id="como-funciona">Como a toxina botulínica funciona?</SectionTitle>
                            <p>
                                A toxina botulínica age na comunicação entre nervo e músculo. Quando aplicada de forma criteriosa, diminui temporariamente a contração de músculos específicos. É por isso que as linhas de expressão ligadas a esse movimento podem ficar mais suaves.
                            </p>
                            <p className="mt-5">
                                O resultado não é imediato e não deveria ser padronizado. A técnica, os pontos de aplicação e a quantidade precisam ser definidos olhando para a anatomia e para o objetivo de cada pessoa.
                            </p>
                            <figure className="my-12 border border-line bg-sand p-3 sm:p-4">
                                <Image
                                    src="/blog-botox-anatomia.jpg"
                                    alt="Ilustração educativa dos músculos faciais e linhas de expressão"
                                    width={1800}
                                    height={1200}
                                    className="w-full h-auto"
                                    sizes="(max-width: 768px) 100vw, 760px"
                                />
                                <figcaption className="px-3 pt-4 pb-2 text-sm leading-6 text-stone">
                                    A toxina botulínica atua sobre músculos específicos. Por isso, o planejamento precisa considerar o seu movimento, não apenas uma região do rosto.
                                </figcaption>
                            </figure>

                            <SectionTitle id="quando-faz-sentido">Quando o tratamento pode fazer sentido?</SectionTitle>
                            <p>
                                A indicação não depende só da idade ou da profundidade de uma ruga. Ela começa com uma conversa: o que incomoda você? Quais expressões gostaria de manter? Há assimetrias, características da pele ou tratamentos prévios que precisam entrar no planejamento?
                            </p>
                            <p className="mt-5">
                                Em algumas pessoas, a toxina pode ser uma boa ferramenta para linhas dinâmicas. Em outras, o cuidado pode envolver skincare, fotoproteção, outros procedimentos ou simplesmente não fazer nada naquele momento. A consulta existe justamente para separar expectativa de indicação.
                            </p>

                            <blockquote className="my-12 border-l border-copper pl-6 sm:pl-8 font-display text-3xl sm:text-4xl leading-tight font-light text-ink">
                                Naturalidade não é fazer pouco por regra. É fazer o que respeita a sua anatomia e a sua intenção.
                            </blockquote>

                            <SectionTitle id="o-que-esperar">O que esperar depois da aplicação?</SectionTitle>
                            <p>
                                Depois do procedimento, a resposta aparece de forma gradual. O acompanhamento permite avaliar a evolução e conversar sobre eventuais ajustes quando indicados. A duração do efeito é individual: varia com a região tratada, a musculatura, o produto e a resposta do organismo.
                            </p>
                            <p className="mt-5">
                                Também é importante ter expectativas realistas. A toxina atua sobre o componente muscular da linha; a qualidade da pele, marcas que já estão presentes em repouso e outros fatores do envelhecimento podem precisar de uma estratégia complementar.
                            </p>

                            <SectionTitle id="seguranca">Segurança é parte do resultado</SectionTitle>
                            <p>
                                Toxina botulínica é um medicamento e deve ser tratada com a seriedade que isso exige. A Anvisa orienta que o procedimento seja feito por profissional habilitado, em serviço autorizado pela vigilância sanitária e com produto regularizado, seguindo bula, doses e intervalos recomendados.
                            </p>
                            <p className="mt-5">
                                Antes de aplicar, conte sobre suas condições de saúde, medicamentos em uso, alergias, gestação ou amamentação, procedimentos prévios e qualquer reação que já tenha tido. Essa conversa não é burocracia: ela ajuda a decidir se aquele é o momento e o tratamento adequados.
                            </p>
                            <div className="mt-8 border border-copper/45 bg-sand p-6 sm:p-8 text-base leading-7">
                                <p className="font-medium text-ink mb-2">Um cuidado importante</p>
                                <p>
                                    Procure atendimento médico imediato se, após uma aplicação, surgirem sintomas como visão borrada, queda importante das pálpebras, fala arrastada, dificuldade para engolir ou respirar. Esses eventos são raros, mas precisam de avaliação sem demora.
                                </p>
                            </div>

                            <SectionTitle id="botox-em-campinas">Botox em Campinas, com avaliação individual</SectionTitle>
                            <p>
                                A Dra. Lorraine realiza aplicações de Botox em Campinas, sempre presencialmente e após avaliação dermatológica. O ponto de partida é entender a sua anatomia, a qualidade da pele e o resultado que você gostaria de buscar, sem seguir um protocolo igual para todo mundo.
                            </p>
                            <p className="mt-5">
                                Se você procura Botox em Campinas, a consulta é o momento de esclarecer dúvidas, revisar contraindicações e construir uma proposta de tratamento segura e coerente com você.
                            </p>

                            <SectionTitle id="perguntas-frequentes">Perguntas frequentes</SectionTitle>
                            <div className="border-t border-line">
                                {faqs.map((faq) => (
                                    <section key={faq.q} className="py-7 border-b border-line">
                                        <h3 className="font-display text-2xl font-light text-ink leading-tight">{faq.q}</h3>
                                        <p className="mt-3 text-base leading-7">{faq.a}</p>
                                    </section>
                                ))}
                            </div>

                            <SectionTitle id="consulta">A consulta é o primeiro passo</SectionTitle>
                            <p>
                                Se você considera fazer Botox, eu prefiro começar pela avaliação. É nela que entendemos sua pele, suas expressões e suas expectativas para decidir, juntas, se a toxina botulínica é uma boa escolha e como fazer isso de um jeito seguro e coerente com você.
                            </p>

                            <div className="mt-12 bg-ink text-paper p-8 sm:p-10">
                                <p className="text-xs uppercase tracking-label text-rose font-medium">Consulta dermatológica</p>
                                <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.02] mt-5">Cuidado que começa pela escuta.</h2>
                                <p className="mt-5 max-w-xl text-paper/75 leading-7">Atendimento presencial em Campinas e por videoconsulta, com avaliação individual e conduta explicada com clareza.</p>
                                <Link href="/consulta/agendar" className="inline-flex mt-8 bg-paper text-ink px-6 py-4 text-sm font-medium hover:bg-rose transition-colors">
                                    Agendar consulta
                                </Link>
                            </div>

                            <div className="mt-12 pt-7 border-t border-line text-sm leading-6 text-stone">
                                <p className="font-medium text-ink">Referência de segurança</p>
                                <a className="mt-2 inline-block underline underline-offset-4 hover:text-copper-dark" href="https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2025/anvisa-alerta-sobre-risco-de-botulismo-apos-administracao-da-toxina-botulinica" target="_blank" rel="noreferrer">
                                    Alerta da Anvisa sobre o uso de toxina botulínica
                                </a>
                                <p className="mt-3">Este conteúdo é educativo e não substitui uma avaliação médica individual.</p>
                            </div>
                        </div>

                        <aside className="hidden lg:block lg:pt-3">
                            <nav aria-label="Navegação deste artigo" className="lg:sticky lg:top-28 border-t border-b border-line py-5 text-sm text-stone">
                                <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-4">Neste artigo</p>
                                <ol className="space-y-3 leading-5 list-none p-0 m-0">
                                    <li><a href="#como-funciona" className="hover:text-copper-dark transition-colors">Como funciona</a></li>
                                    <li><a href="#quando-faz-sentido" className="hover:text-copper-dark transition-colors">Quando faz sentido</a></li>
                                    <li><a href="#o-que-esperar" className="hover:text-copper-dark transition-colors">O que esperar</a></li>
                                    <li><a href="#seguranca" className="hover:text-copper-dark transition-colors">Segurança</a></li>
                                    <li><a href="#botox-em-campinas" className="hover:text-copper-dark transition-colors">Botox em Campinas</a></li>
                                    <li><a href="#perguntas-frequentes" className="hover:text-copper-dark transition-colors">Perguntas frequentes</a></li>
                                </ol>
                            </nav>
                        </aside>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
