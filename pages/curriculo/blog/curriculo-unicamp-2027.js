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
import { FAQ } from "@components/FAQ";
import ServiceCTA from "@components/CurriculumBlog/ServiceCTA";
import CriteriaGuide from "@components/CurriculumBlog/CriteriaGuide";
import ArticleNavigation from "@components/CurriculumBlog/ArticleNavigation";
import { Chevron } from "@components/Chevron";
import DocumentChecklist from "@components/CurriculumBlog/DocumentChecklist";
import {
    unicampArticle as post,
    CURRICULUM_BLOG_PATH,
    CURRICULUM_OFFER
} from "@data/curriculum";
import { absoluteUrl, SITE } from "@utils/site";
import styles from "@components/CurriculumBlog/Article.module.scss";

const sections = [
    ["peso", "Quanto vale o currículo"],
    ["criterios", "O que pontua em 2027"],
    ["mudancas", "O que mudou no edital"],
    ["documentos", "Como organizar os documentos"],
    ["calendario", "Datas da segunda fase"],
    ["checklist", "Checklist de conferência"],
    ["duvidas", "Dúvidas frequentes"]
];

const faqs = [
    {
        q: "Quanto vale a análise curricular na residência médica da Unicamp 2027?",
        a: "No acesso direto, a análise curricular vale 10% da nota final e a prova da primeira fase vale 90%. O currículo reúne até 100 pontos em dez grupos. As notas das duas fases são normalizadas para a escala de 0 a 10."
    },
    {
        q: "O que pontua no currículo da Unicamp 2027?",
        a: "São dez grupos: pós-graduação da faculdade de origem, hospital de ensino, iniciação científica, artigos, trabalhos em congressos, liga acadêmica, monitoria/CCI, extensão, representação em colegiados e organização estudantil. Cada grupo tem teto e exigências próprias de comprovação."
    },
    {
        q: "Como enviar os documentos da análise curricular da Unicamp?",
        a: "O edital de acesso direto 2027 prevê um PDF único de até 5 MB, na sequência: formulário de avaliação, comprovantes dos itens, diploma ou declaração de conclusão, histórico escolar e currículo Lattes atualizado. Confira também o formulário e os comunicados da edição antes do envio."
    },
    {
        q: "O currículo Lattes sozinho é suficiente?",
        a: "Não. Ele faz parte do pacote, junto do formulário de avaliação e dos documentos exigidos. Use a sequência do item 5.2 do edital e confira os comunicados publicados para a segunda fase."
    },
    {
        q: "Preciso ter mestrado para pontuar no primeiro item?",
        a: "Esse item trata dos programas de pós-graduação da faculdade em que você cursou Medicina. Não é uma exigência de mestrado pessoal. Solicite a declaração adequada à sua instituição de origem."
    },
    {
        q: "Um certificado garante os pontos da atividade?",
        a: "Não automaticamente. A atividade e sua comprovação precisam cumprir as condições do item. Confira período, carga horária, autoria, função e emissor antes de incluí-la no cálculo."
    },
    {
        q: "Posso usar o formulário do processo anterior?",
        a: "Use arquivos antigos apenas para se familiarizar com a organização. Para o envio, consulte o formulário da edição e do programa corretos. Em 17 de outubro de 2026, o formulário da segunda fase de 2027 ainda não estava listado na página oficial consultada."
    },
    {
        q: "O serviço de currículo garante aprovação ou nota máxima?",
        a: "Não. A preparação ajuda a organizar e apresentar a trajetória documentada. A pontuação depende das atividades elegíveis, dos comprovantes e da avaliação da banca. Você pode conhecer o serviço e seu escopo na página de currículo."
    }
];

function Source({ page = 6, children = "Conferir no edital" }) {
    return (
        <a
            href={`${post.edital}#page=${page}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.source}
        >
            {children}{" "}
            <span className="sr-only">(PDF oficial, abre em nova aba)</span>
        </a>
    );
}

function Section({ id, title, children }) {
    return (
        <section id={id} className={styles.section}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}

export default function UnicampCurriculumArticle() {
    return (
        <Layout careerPage className={styles.pageLayout}>
            <SEO
                title={post.title}
                description={post.description}
                url={post.href}
                type="article"
                publishedTime={post.date}
                modifiedTime={post.date}
                section="Currículo para residência médica"
                image="/images/curriculum/unicamp-hc-entrada.png"
                imageAlt="Hospital de Clínicas da Unicamp, em Campinas"
            />
            <StructuredData
                graph={[
                    personSchema(),
                    breadcrumbSchema([
                        { name: "Início", path: "/" },
                        { name: "Currículo", path: "/curriculo" },
                        {
                            name: "Blog de currículo",
                            path: CURRICULUM_BLOG_PATH
                        },
                        { name: "Currículo UNICAMP 2027", path: post.href }
                    ]),
                    {
                        "@type": "BlogPosting",
                        "@id": `${absoluteUrl(post.href)}#article`,
                        headline: post.title,
                        description: post.description,
                        datePublished: post.date,
                        dateModified: post.date,
                        inLanguage: "pt-BR",
                        mainEntityOfPage: absoluteUrl(post.href),
                        isPartOf: {
                            "@id": `${absoluteUrl(CURRICULUM_BLOG_PATH)}#blog`
                        },
                        author: {
                            "@type": "Organization",
                            "@id": `${absoluteUrl(post.href)}#equipe-editorial`,
                            name: "Equipe de currículo da Dra. Lorraine Souza",
                            url: `${absoluteUrl(post.href)}#equipe-editorial`
                        },
                        abstract: post.summary,
                        about: [
                            {
                                "@type": "Thing",
                                name: "Análise curricular na residência médica"
                            },
                            {
                                "@type": "CollegeOrUniversity",
                                name: "Universidade Estadual de Campinas (Unicamp)"
                            }
                        ],
                        publisher: { "@id": `${SITE.url}/#lorraine` },
                        image: absoluteUrl(
                            "/images/curriculum/unicamp-hc-entrada.png"
                        ),
                        articleSection: "Currículo para residência médica",
                        citation: [post.edital, post.officialPage]
                    },
                    faqSchema(faqs)
                ]}
            />
            <div className="bg-paper text-ink">
                <header className={styles.hero}>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav
                            aria-label="Você está em"
                            className={styles.breadcrumb}
                        >
                            <Link href="/curriculo">Currículo</Link>
                            <span aria-hidden="true">/</span>
                            <Link href={CURRICULUM_BLOG_PATH}>Guias</Link>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page">UNICAMP 2027</span>
                        </nav>
                        <div className={styles.heroGrid}>
                            <div className={styles.heroCopy}>
                                <p className={styles.eyebrow}>
                                    Residência médica · Acesso direto · 2027
                                </p>
                                <h1>{post.title}</h1>
                                <p className={styles.heroSubtitle}>
                                    O que pontua na residência médica, quais
                                    comprovantes reunir e como preparar seu
                                    currículo para a segunda fase.
                                </p>
                                <p className={styles.heroDescription}>
                                    Guia de acesso direto com as regras do
                                    edital oficial, exemplos práticos e
                                    orientações para organizar os documentos.
                                </p>
                                <a
                                    href="#criterios"
                                    className={styles.readLink}
                                >
                                    Ver os 10 grupos de pontuação <Chevron />
                                </a>
                            </div>
                            <figure className={styles.heroPhoto}>
                                <div className={styles.heroImage}>
                                    <Image
                                        src="/images/curriculum/unicamp-hc-entrada.png"
                                        alt="Entrada do Hospital de Clínicas da Unicamp, com o portal e a placa de identificação"
                                        fill
                                        priority
                                        sizes="(max-width: 767px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                <figcaption>
                                    Hospital de Clínicas da Unicamp · Campinas
                                </figcaption>
                            </figure>
                        </div>
                        <div className={styles.heroMeta}>
                            <a href="#equipe-editorial">
                                Equipe de currículo · Dra. Lorraine Souza
                            </a>
                            <span>
                                Revisado em{" "}
                                <time dateTime={post.date}>
                                    {post.displayDate}
                                </time>
                            </span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                <div
                    className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${styles.readingLayout}`}
                >
                    <ArticleNavigation
                        sections={sections}
                        officialPage={post.officialPage}
                    />
                    <article
                        id="leitura"
                        className={styles.article}
                        aria-label={post.title}
                    >
                        <div
                            className={styles.quickFacts}
                            aria-label="Resumo da análise curricular"
                        >
                            <div>
                                <strong>
                                    90<span>%</span>
                                </strong>
                                <span>Prova da primeira fase</span>
                            </div>
                            <div>
                                <strong>
                                    10<span>%</span>
                                </strong>
                                <span>Análise curricular</span>
                            </div>
                            <div>
                                <strong>10</strong>
                                <span>Grupos de pontuação</span>
                            </div>
                        </div>
                        <p>
                            {post.summary}{" "}
                            <Source page={5}>
                                Ver peso e critérios no edital
                            </Source>
                        </p>
                        <p>
                            Este guia explica os grupos de pontuação e os
                            documentos da segunda fase. Se você concorre a uma
                            especialidade com pré-requisito, consulte o edital
                            específico daquela seleção.
                        </p>

                        <Section
                            id="peso"
                            title="Quanto vale o currículo na UNICAMP?"
                        >
                            <p>
                                O peso do currículo é uma razão para cuidar da
                                documentação sem perder de vista a preparação
                                para a prova. Uma atividade bem comprovada pode
                                contribuir para a classificação; um projeto
                                visual, sozinho, não cria pontuação.
                            </p>
                            <div
                                className={styles.weightVisual}
                                aria-label="A prova vale noventa por cento e o currículo dez por cento da nota final"
                            >
                                <div className={styles.weightLabels}>
                                    <span>Prova · 90%</span>
                                    <span>Currículo · 10%</span>
                                </div>
                                <div
                                    className={styles.weightBar}
                                    aria-hidden="true"
                                >
                                    <span />
                                    <span />
                                </div>
                            </div>
                            <p>
                                O currículo reúne até 100 pontos, que entram na
                                nota da segunda fase. As duas fases são
                                normalizadas para a escala de 0 a 10. Sem
                                considerar bonificações, uma prova com nota 8 e
                                um currículo com nota 7 resultam em nota final
                                7,9.{" "}
                                <Source page={5}>
                                    Pesos e normalização no edital
                                </Source>
                            </p>
                            <div className={styles.note}>
                                <strong>
                                    Apresentação e pontuação têm funções
                                    diferentes.
                                </strong>
                                <p>
                                    A apresentação facilita a leitura. A
                                    pontuação depende do enquadramento no
                                    edital. Comece pelo critério, confira a
                                    evidência e só então pense no acabamento do
                                    documento.
                                </p>
                            </div>
                            <p>
                                Na prática, monte uma relação simples: atividade
                                realizada, item do edital, comprovante
                                disponível e pendência. Isso permite perceber
                                cedo o que precisa de uma declaração mais
                                completa ou de uma informação que não aparece no
                                certificado.
                            </p>
                        </Section>

                        <Section
                            id="criterios"
                            title="O que pontua no currículo da Unicamp 2027?"
                        >
                            <p>
                                Nem todo certificado responde à mesma pergunta.
                                Os dois primeiros grupos tratam da sua faculdade
                                de graduação; os demais, das atividades que você
                                desenvolveu. Escolha um tema para conhecer os
                                exemplos, as faixas e os comprovantes.
                            </p>
                            <CriteriaGuide />
                            <div className={styles.note}>
                                <strong>
                                    O teto é um limite, não uma pontuação
                                    automática.
                                </strong>
                                <p>
                                    Os exemplos ajudam a entender os termos. O
                                    enquadramento depende da atividade e da
                                    documentação. Quando a redação deixar uma
                                    dúvida, consulte a COREME e os
                                    esclarecimentos da edição antes de fechar
                                    seu cálculo.
                                </p>
                            </div>
                        </Section>
                        <figure className={styles.campusPhoto}>
                            <Image
                                src="/images/curriculum/unicamp-hc-aerea.jpg"
                                alt="Vista aérea do Hospital de Clínicas da Unicamp e de seu entorno"
                                width={889}
                                height={562}
                                sizes="(max-width: 1023px) 100vw, 760px"
                            />
                            <figcaption>
                                <span>
                                    Um lugar para imaginar o seu próximo
                                    capítulo.
                                </span>
                                Hospital de Clínicas da Unicamp, em Campinas.
                                Foto: Caius Lucilius/HC Unicamp.{" "}
                                <a
                                    href="https://www.hc.unicamp.br/imprensa/banco-de-imagens/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Fonte da imagem
                                </a>
                            </figcaption>
                        </figure>

                        <Section
                            id="mudancas"
                            title="O que mudou: cuidado com listas de anos anteriores"
                        >
                            <p>
                                Em 2027, extensão tem grupo próprio e cursos de
                                aprimoramento deixam de aparecer como categoria
                                separada. Liga acadêmica e representação
                                institucional exigem atenção ao período mínimo
                                de dois semestres.{" "}
                                <Source page={8}>Ver grupos 6 a 10</Source>
                            </p>
                            <p>
                                O efeito prático é simples: uma pasta organizada
                                para outra edição precisa passar por uma nova
                                revisão. O certificado continua registrando sua
                                experiência, mas a forma de incluí-lo depende
                                das regras atuais.
                            </p>
                            <h3>Três cuidados ao reaproveitar seu material</h3>
                            <ul>
                                <li>
                                    <strong>Releia os nomes dos grupos.</strong>{" "}
                                    Não copie a classificação antiga sem
                                    comparar a descrição atual.
                                </li>
                                <li>
                                    <strong>
                                        Confira as condições, além do título.
                                    </strong>{" "}
                                    Uma atividade chamada “extensão” precisa ser
                                    examinada pelo que foi realizado e
                                    comprovado.
                                </li>
                                <li>
                                    <strong>
                                        Anote dúvidas antes de calcular.
                                    </strong>{" "}
                                    Se uma faixa de carga horária ou um tipo de
                                    declaração deixar margem para interpretação,
                                    consulte a COREME pelo canal indicado no
                                    edital.
                                </li>
                            </ul>
                            <p>
                                Essa conferência é especialmente útil para não
                                gastar tempo buscando um certificado que não
                                resolve a exigência e deixar para depois uma
                                declaração institucional que demora mais para
                                ser emitida.
                            </p>
                        </Section>

                        <Section
                            id="documentos"
                            title="Como organizar os documentos para a segunda fase"
                        >
                            <p>
                                O edital prevê um PDF único de até 5 MB, nesta
                                sequência: formulário, comprovantes dos itens,
                                diploma ou declaração de conclusão, histórico e
                                Lattes atualizado.{" "}
                                <Source>Ver itens 5.2 a 5.2.2</Source>
                            </p>
                            <p>
                                A preparação passa por relacionar cada
                                experiência ao edital, conferir as informações e
                                construir uma apresentação clara. Esse é o
                                trabalho que desenvolvemos com você no nosso
                                serviço de currículo. As etapas abaixo ajudam a
                                entender o que precisa estar pronto.
                            </p>
                            <h3>
                                1. Faça um inventário antes de montar o arquivo
                            </h3>
                            <p>
                                Crie uma pasta de originais e uma planilha ou
                                lista com três colunas: o que tenho, a que item
                                corresponde e o que falta conferir. Dê nomes
                                reconhecíveis aos arquivos, como
                                “monitoria_anatomia_2025.pdf”, sem depender de
                                abrir cada um para saber seu conteúdo.
                            </p>
                            <h3>2. Resolva pendências na origem</h3>
                            <p>
                                Procure a secretaria, o orientador ou a
                                organização da atividade com um pedido objetivo.
                                Explique qual informação está ausente e peça um
                                documento que registre os fatos. Não altere por
                                conta própria o conteúdo de um certificado.
                            </p>
                            <h3>
                                3. Monte a versão de envio a partir da versão
                                conferida
                            </h3>
                            <p>
                                A pasta de trabalho pode conter rascunhos e
                                materiais de apoio. O arquivo enviado deve ser
                                uma versão revisada. Evite inserir uma capa ou
                                uma página extra que desloque a sequência pedida
                                sem conferir antes se isso cabe nas instruções.
                            </p>
                            <h3>4. Comprima, abra e leia novamente</h3>
                            <p>
                                Reduzir o tamanho do arquivo não pode tornar
                                assinaturas, carimbos ou datas ilegíveis. Abra o
                                PDF final em outro leitor, percorra todas as
                                páginas e verifique se o arquivo está completo.
                                Um PDF pequeno que não permite conferir a
                                atividade não resolve o problema.
                            </p>
                            <aside
                                className={styles.serviceBridge}
                                aria-labelledby="preparacao-personalizada"
                            >
                                <p className={styles.eyebrow}>
                                    Preparação personalizada
                                </p>
                                <h3 id="preparacao-personalizada">
                                    Da sua pasta de documentos ao currículo
                                    pronto para revisar.
                                </h3>
                                <p>
                                    Você compartilha sua trajetória e os
                                    comprovantes. Nosso serviço combina
                                    organização do material, apresentação
                                    personalizada e mentoria individual com a
                                    Dra. Lorraine para apoiar seu planejamento
                                    para a residência.
                                </p>
                                <dl className={styles.serviceSteps}>
                                    <div>
                                        <dt>Organização para a Unicamp</dt>
                                        <dd>
                                            Relacionamos suas experiências aos
                                            grupos do edital e organizamos os
                                            comprovantes para a preparação do
                                            currículo.
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Elaboração e revisão com você</dt>
                                        <dd>
                                            Criamos uma apresentação
                                            personalizada. Você confere os
                                            dados, revisa a proposta e pede os
                                            ajustes antes da versão final.
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>PDF final e acompanhamento</dt>
                                        <dd>
                                            A entrega é em PDF, com 30 dias de
                                            suporte pós-entrega para ajustes.
                                            Cada contratação é dedicada a uma
                                            instituição.
                                        </dd>
                                    </div>
                                </dl>
                                <div className={styles.serviceAction}>
                                    <span>
                                        <strong>
                                            {CURRICULUM_OFFER.label}
                                        </strong>{" "}
                                        {CURRICULUM_OFFER.unit} · elaboração,
                                        revisão e suporte
                                    </span>
                                    <Link
                                        href="/curriculo#servico"
                                        className={styles.serviceLink}
                                    >
                                        Conhecer a preparação do meu currículo
                                        <Chevron />
                                    </Link>
                                </div>
                            </aside>
                        </Section>

                        <Section
                            id="calendario"
                            title="Datas para ter no seu planejamento"
                        >
                            <dl className={styles.dates}>
                                <div>
                                    <dt>Prova da primeira fase</dt>
                                    <dd>15 de novembro de 2026</dd>
                                </div>
                                <div>
                                    <dt>
                                        Classificados para a análise curricular
                                    </dt>
                                    <dd>2 de dezembro de 2026, às 16h</dd>
                                </div>
                                <div>
                                    <dt>Envio dos documentos</dt>
                                    <dd>
                                        4 de dezembro, às 9h, a 8 de dezembro de
                                        2026, às 16h
                                    </dd>
                                </div>
                            </dl>
                            <Source page={17}>
                                Calendário oficial, item 20
                            </Source>
                            <p>
                                Horários de Brasília. Confira eventuais
                                alterações na{" "}
                                <a
                                    href={post.officialPage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    página oficial do processo seletivo
                                </a>
                                . Planeje a documentação antes da abertura do
                                envio e reserve tempo para verificar o
                                recebimento no sistema. Não deixe a única cópia
                                do seu trabalho dentro da plataforma de
                                inscrição.
                            </p>
                        </Section>

                        <Section
                            id="checklist"
                            title="Seu checklist de conferência"
                        >
                            <p>
                                Use a lista como uma última passagem pelos
                                pontos de organização. Para cada marcação, vale
                                conseguir responder “onde eu conferi isso?” e
                                voltar ao documento quando necessário.
                            </p>
                            <DocumentChecklist />
                        </Section>

                        <Section
                            id="duvidas"
                            title="Dúvidas frequentes sobre o currículo da UNICAMP"
                        >
                            <FAQ
                                items={faqs.map(({ q, a }) => ({
                                    question: q,
                                    answer: a
                                }))}
                            />
                        </Section>

                        <footer className={styles.sources}>
                            <h2>Fontes e atualização</h2>
                            <p>
                                Consulta editorial em {post.displayDate}. O
                                conteúdo trata do acesso direto e não substitui
                                o edital, os formulários e as retificações da
                                seleção.
                            </p>
                            <ul>
                                <li>
                                    <Source page={1}>
                                        Edital oficial UNICAMP 2027 · Acesso
                                        direto
                                    </Source>
                                </li>
                                <li>
                                    <a
                                        href={post.officialPage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        FCM/UNICAMP · Comunicados do processo
                                        seletivo 2027
                                    </a>
                                </li>
                            </ul>
                            <div
                                id="equipe-editorial"
                                className="mt-8 flex scroll-mt-28 items-start gap-5 border-t border-line pt-8"
                            >
                                <Image
                                    src="/lolo-portrait-home-page.png"
                                    width={64}
                                    height={80}
                                    alt="Dra. Lorraine Souza"
                                    className="h-20 w-16 shrink-0 object-cover object-top"
                                />
                                <div>
                                    <strong className="text-base text-ink">
                                        Equipe de currículo da Dra. Lorraine
                                        Souza
                                    </strong>
                                    <p className="mb-0 mt-2 text-sm leading-6">
                                        Conteúdo para médicos em preparação para
                                        a residência. Conheça a{" "}
                                        <Link href="/curriculo">
                                            elaboração de currículo
                                        </Link>{" "}
                                        e a{" "}
                                        <Link href="/mentoria">
                                            mentoria individual
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </article>
                </div>
                <ServiceCTA />
            </div>
        </Layout>
    );
}
