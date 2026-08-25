import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { StructuredData, breadcrumbSchema, faqSchema, personSchema } from "@components/StructuredData";
import { SITE, absoluteUrl } from "@utils/site";

const faqs = [
    { q: "Existe idade certa para começar Botox?", a: "Não. A decisão não deve partir da idade, mas da queixa, da anatomia, da qualidade da pele e da avaliação de segurança. Para algumas pessoas, pode fazer sentido; para outras, não é a melhor escolha naquele momento." },
    { q: "Botox preventivo é obrigatório?", a: "Não. Prevenção não é uma regra nem uma corrida contra o tempo. A toxina pode ser discutida quando há linhas dinâmicas que incomodam, mas a indicação é individual." },
    { q: "Posso fazer Botox se a ruga já aparece em repouso?", a: "A toxina pode atuar no componente muscular da linha. Quando há uma marca presente mesmo sem expressão, a avaliação também considera a qualidade da pele e outras possibilidades de cuidado." },
    { q: "Quem deve adiar a aplicação?", a: "Condições de saúde, medicamentos, alergias, gestação, amamentação e tratamentos recentes precisam ser relatados na consulta. É essa análise que define se o procedimento é apropriado e seguro para você." },
    { q: "A Dra. Lorraine faz Botox em Campinas?", a: "Sim. A Dra. Lorraine realiza aplicações de toxina botulínica presencialmente em Campinas, após avaliação dermatológica individual." }
];

const SectionTitle = ({ children, id }) => <h2 id={id} className="scroll-mt-32 font-display text-[2.35rem] sm:text-5xl font-light leading-[1.05] tracking-[-0.015em] mt-16 mb-6 text-ink">{children}</h2>;

export default function BotoxArticle() {
    return (
        <Layout>
            <SEO
                title="Quando fazer Botox? Para quem a toxina é indicada | Dra. Lorraine"
                description="Quando fazer Botox e para quem a toxina botulínica pode ser indicada? Entenda os sinais, expectativas e a importância da avaliação individual com a Dra. Lorraine em Campinas."
                keywords="quando fazer botox, para quem botox é indicado, botox preventivo, botox Campinas, toxina botulínica Campinas"
                image="/blog-botox-anatomia.jpg"
                imageAlt="Ilustração educativa dos músculos faciais e linhas de expressão"
                url="/blog/botox"
                type="article"
                publishedTime="2026-08-24T00:00:00-03:00"
                modifiedTime="2026-08-25T00:00:00-03:00"
                section="Procedimentos dermatológicos"
            />
            <StructuredData graph={[
                personSchema(),
                breadcrumbSchema([{ name: "Início", path: "/" }, { name: "Blog", path: "/blog" }, { name: "Quando fazer Botox?", path: "/blog/botox" }]),
                {
                    "@type": "BlogPosting",
                    "@id": absoluteUrl("/blog/botox") + "#article",
                    headline: "Quando fazer Botox? Para quem a toxina botulínica costuma ser indicada",
                    description: "Quando fazer Botox e para quem a toxina botulínica pode ser indicada? Um guia para apoiar uma decisão individual e segura.",
                    datePublished: "2026-08-24",
                    dateModified: "2026-08-25",
                    inLanguage: "pt-BR",
                    mainEntityOfPage: absoluteUrl("/blog/botox"),
                    articleSection: "Procedimentos dermatológicos",
                    keywords: ["quando fazer Botox", "para quem Botox é indicado", "Botox em Campinas"],
                    about: { "@type": "MedicalProcedure", name: "Toxina botulínica" },
                    author: { "@id": SITE.url + "/#lorraine" },
                    publisher: { "@id": SITE.url + "/#lorraine" },
                    image: absoluteUrl("/blog-botox-anatomia.jpg")
                },
                faqSchema(faqs)
            ]} />

            <header className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20 bg-[linear-gradient(165deg,#E9E1D4_0%,#F3ECE3_58%,#FAF6F0_100%)]">
                <div aria-hidden className="absolute -top-52 -right-44 h-[38rem] w-[38rem] rounded-full bg-rose/50 blur-3xl" />
                <div aria-hidden className="absolute left-[7%] bottom-0 h-px w-[86%] bg-[linear-gradient(90deg,transparent,#B48967,transparent)]" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
                    <Link href="/blog" className="inline-flex text-sm text-stone hover:text-copper-dark transition-colors mb-12">← Voltar para o blog</Link>
                    <p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">Decisão de tratamento · Toxina botulínica</p>
                    <h1 className="font-display font-light text-[3.05rem] sm:text-[4.8rem] leading-[0.99] tracking-[-0.025em] text-balance">Quando fazer Botox? Para quem a toxina botulínica costuma ser indicada.</h1>
                    <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-8 text-stone">A pergunta não é “qual idade?”. É se esse procedimento faz sentido para a sua expressão, sua pele e o resultado que você quer buscar.</p>
                    <div className="mt-10 pt-6 border-t border-copper/45 flex flex-wrap gap-x-7 gap-y-2 text-sm text-stone"><span>Por Dra. Lorraine Souza</span><span>Atualizado em 25 de agosto de 2026</span><span>7 min de leitura</span></div>
                </div>
            </header>

            <article className="bg-paper text-slate">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_190px] gap-14 lg:gap-20">
                        <div className="text-lg leading-8">
                            <p className="text-xl sm:text-2xl leading-9 text-ink font-light">No consultório, a dúvida raramente vem como “quero toxina botulínica”. Ela costuma vir como: “minha testa parece cansada”, “essa marca me incomoda nas fotos” ou “tenho medo de perder a expressão”. São perguntas mais úteis, porque a decisão começa pelo que você percebe, não pela idade de alguém na internet.</p>

                            <SectionTitle id="o-que-a-toxina-trata">O que a toxina botulínica pode tratar e o que ela não promete</SectionTitle>
                            <p>Botox é uma marca conhecida de toxina botulínica. Na dermatologia estética, ela pode ser usada para suavizar temporariamente linhas que aparecem com a contração dos músculos: por exemplo, ao franzir a testa, elevar as sobrancelhas ou sorrir.</p>
                            <p className="mt-5">Isso é diferente de prometer “apagar rugas” ou mudar um rosto. Quando uma marca já está presente em repouso, quando a queixa é de textura ou quando há perda de suporte em outra região, a toxina pode não ser a única ferramenta. Talvez nem seja a principal.</p>

                            <div className="my-12 overflow-hidden border border-line bg-sand">
                                <Image src="/blog-botox-anatomia.jpg" alt="Ilustração educativa dos músculos faciais e linhas de expressão" width={1400} height={787} className="w-full h-auto" priority />
                                <p className="px-5 py-4 text-sm leading-6 text-stone">A avaliação considera como seu rosto se movimenta, e não uma fotografia estática ou um modelo de resultado.</p>
                            </div>

                            <SectionTitle id="quando-faz-sentido">Quando fazer Botox pode fazer sentido?</SectionTitle>
                            <p>A toxina pode entrar na conversa quando linhas dinâmicas incomodam você, quando deseja suavizar um movimento específico ou quando busca uma estratégia de prevenção que seja coerente com sua pele e suas prioridades. Não é necessário esperar uma linha ficar profunda, mas também não existe obrigação de “começar cedo”.</p>
                            <p className="mt-5">Uma boa pergunta para se fazer é: <strong>o que eu gostaria de ver diferente, sem deixar de reconhecer meu rosto?</strong> A resposta ajuda mais do que seguir uma idade fixa. Algumas pessoas querem suavizar o vinco entre as sobrancelhas; outras querem manter tudo como está. As duas escolhas são válidas.</p>

                            <SectionTitle id="para-quem-e-indicado">Para quem Botox costuma ser indicado?</SectionTitle>
                            <p>Em geral, a indicação é considerada para pessoas que têm linhas associadas ao movimento muscular e desejam tratá-las de maneira temporária. A consulta verifica se a queixa é realmente dinâmica, se há expectativa realista e se é um momento adequado para o procedimento.</p>
                            <p className="mt-5">Também há situações em que vale pausar e avaliar com mais cuidado: condições de saúde, medicamentos, alergias, gestação, amamentação, procedimentos recentes ou uma expectativa que o tratamento não consegue cumprir. Não é uma lista para se autodiagnosticar; é o contexto que precisa ser discutido com a médica.</p>

                            <blockquote className="my-12 border-l border-copper pl-6 sm:pl-8 font-display text-3xl sm:text-4xl leading-tight font-light text-ink">A melhor idade para fazer Botox não é uma data no calendário. É quando existe uma indicação bem entendida e uma decisão que continua parecendo sua.</blockquote>

                            <SectionTitle id="como-e-planejado">Como eu planejo Botox em Campinas</SectionTitle>
                            <p>Na consulta presencial em Campinas, começo observando a sua anatomia, força muscular, simetrias, pele e expressões habituais. Depois conversamos sobre o que você quer preservar. A indicação, os pontos e as doses não seguem um mapa igual para todas as pessoas.</p>
                            <p className="mt-5">A autoridade técnica importa justamente aqui. Ser médica formada pela UNICAMP e R3 em Dermatologia orienta uma avaliação que olha para o rosto inteiro, para a segurança e para as alternativas, não apenas para a área mais comentada nas redes.</p>

                            <SectionTitle id="seguranca">Segurança também faz parte da decisão</SectionTitle>
                            <p>Toxina botulínica é um medicamento. A Anvisa orienta que o procedimento seja realizado por profissional habilitado, em serviço autorizado pela vigilância sanitária, com produto regularizado e seguindo as indicações, doses e intervalos da bula.</p>
                            <div className="mt-8 border border-copper/45 bg-sand p-6 sm:p-8 text-base leading-7"><p className="font-medium text-ink mb-2">Após a aplicação, procure atendimento médico imediatamente se houver visão borrada, queda importante das pálpebras, fala arrastada, dificuldade para engolir ou respirar.</p><p>Esses sintomas precisam de avaliação sem demora. Eventos graves são incomuns, mas segurança é parte essencial do cuidado.</p></div>

                            <SectionTitle id="proximo-passo">O próximo passo é a avaliação, não uma decisão pronta</SectionTitle>
                            <p>Se você procura Botox em Campinas, a consulta é o momento de tirar dúvidas, rever expectativas e decidir, com calma, se a toxina botulínica é a escolha certa. Às vezes será; em outras, o plano pode ser skincare, outro procedimento ou nenhum procedimento agora.</p>
                            <div className="mt-12 bg-ink text-paper p-8 sm:p-10"><p className="text-xs uppercase tracking-label text-rose font-medium">Consulta dermatológica em Campinas</p><h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.02] mt-5">Uma decisão que começa pela escuta.</h2><p className="mt-5 max-w-xl text-paper/75 leading-7">Conheça como funciona a aplicação de toxina botulínica e agende uma avaliação presencial.</p><div className="flex flex-wrap gap-4 mt-8"><Link href="/tratamentos/toxina-botulinica" className="inline-flex border border-paper/50 px-6 py-4 text-sm font-medium hover:bg-paper hover:text-ink transition-colors">Conhecer o tratamento</Link><Link href="/consulta/agendar" className="inline-flex bg-paper text-ink px-6 py-4 text-sm font-medium hover:bg-rose transition-colors">Agendar consulta</Link></div></div>

                            <SectionTitle id="perguntas-frequentes">Perguntas frequentes</SectionTitle>
                            <div className="border-t border-line">{faqs.map((faq) => <section key={faq.q} className="py-7 border-b border-line"><h3 className="font-display text-2xl font-light text-ink leading-tight">{faq.q}</h3><p className="mt-3 text-base leading-7">{faq.a}</p></section>)}</div>

                            <div className="mt-12 pt-7 border-t border-line text-sm leading-6 text-stone"><p className="font-medium text-ink">Referência de segurança</p><a className="mt-2 inline-block underline underline-offset-4 hover:text-copper-dark" href="https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2025/anvisa-e-ministerio-da-saude-alertam-para-risco-de-botulismo-iatrogenico-apos-uso-de-toxina-botulinica" target="_blank" rel="noreferrer">Orientação da Anvisa e do Ministério da Saúde sobre toxina botulínica</a><p className="mt-3">Este conteúdo é educativo e não substitui uma avaliação médica individual.</p></div>
                        </div>

                        <aside className="hidden lg:block lg:pt-3"><nav aria-label="Navegação deste artigo" className="lg:sticky lg:top-28 border-t border-b border-line py-5 text-sm text-stone"><p className="text-xs uppercase tracking-label text-copper-dark font-medium mb-4">Neste artigo</p><ol className="space-y-3 leading-5 list-none p-0 m-0"><li><a href="#o-que-a-toxina-trata" className="hover:text-copper-dark">O que ela trata</a></li><li><a href="#quando-faz-sentido" className="hover:text-copper-dark">Quando faz sentido</a></li><li><a href="#para-quem-e-indicado" className="hover:text-copper-dark">Para quem é indicada</a></li><li><a href="#como-e-planejado" className="hover:text-copper-dark">Como é planejado</a></li><li><a href="#seguranca" className="hover:text-copper-dark">Segurança</a></li><li><a href="#perguntas-frequentes" className="hover:text-copper-dark">Perguntas frequentes</a></li></ol></nav></aside>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
