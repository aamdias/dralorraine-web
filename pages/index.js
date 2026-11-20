import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "@components/Layout";
import { Chevron } from "@components/Chevron";
import { Disclosure } from "@components/Disclosure";
import { Monogram } from "@components/Logo";
import SEO from "@components/SEO/SEO";
import {
    StructuredData,
    personSchema,
    practiceSchema,
    webSiteSchema
} from "@components/StructuredData";
import { BookingLink, WHATSAPP_HREF } from "@components/Layout/SiteActions";
import siteStyles from "@components/Layout/Site.module.scss";
import {
    HomeIntro,
    useHomeIntro,
    useScrollReveals
} from "@components/Home/HomeMotion";
import styles from "@components/Home/Home.module.scss";
import { SITE } from "@utils/site";

const heroPhoto = "/images/home/lo-8282-hd.jpg";
const manifesto =
    "Antes de propor qualquer tratamento, eu quero entender a sua *pele,* a sua rotina e o que trouxe você até aqui. Ciência para decidir, escuta para entender, *cuidado* para acompanhar.";
const formation = [
    {
        title: "Diagnóstico preciso",
        description:
            "Formação em hospital universitário, com casos de todos os níveis de complexidade.",
        proof: "Medicina e residência · UNICAMP"
    },
    {
        title: "Conduta baseada em evidência",
        description:
            "Cada indicação parte do que a ciência sustenta, explicada para você entender.",
        proof: "R3 em Dermatologia · 2026"
    },
    {
        title: "Método no seu tratamento",
        description:
            "O mesmo método que me levou ao 1º lugar em Dermatologia organiza o seu plano de cuidado.",
        proof: "1º lugar · Dermatologia UNICAMP"
    }
];
const rankings = [
    [1, "UNICAMP"],
    [2, "USP Ribeirão Preto"],
    [1, "PUC Campinas"],
    [3, "USP São Paulo"]
];
const consultationSteps = [
    "Avaliação dermatológica completa",
    "Conduta por escrito, com o porquê de cada passo",
    "14 dias de suporte direto comigo"
];
const places = [
    ["Campinas", "Consultório"],
    ["São Paulo", "Consultório"],
    ["Videoconsulta", "De qualquer lugar do Brasil"]
];
const citiesOnMap = [
    { name: "Campinas", x: 405.5, y: 226.9 },
    { name: "São Paulo", x: 434.2, y: 273.7 }
];
const resources = [
    {
        title: "Mentoria individual",
        description: "Com quem conquistou o 1º lugar em Dermato na UNICAMP.",
        href: "/mentoria"
    },
    {
        title: "Anotações originais",
        description: "+140 anotações organizadas por grande área.",
        href: "/anotacoes"
    },
    {
        title: "Currículo para residência",
        description: "Um currículo que valoriza a sua trajetória.",
        href: "/curriculo"
    }
];

function Index({ children }) {
    return (
        <span aria-hidden="true" className={styles.index}>
            {children}
        </span>
    );
}

function Eyebrow({ number, children, reveal = true }) {
    return (
        <p className={styles.eyebrow} data-reveal={reveal ? "up" : undefined}>
            <Index>{number}</Index>
            <span>{children}</span>
        </p>
    );
}

function Hero({ introState }) {
    return (
        <section
            className={styles.hero}
            data-intro={introState}
            aria-labelledby="home-title"
        >
            <div className={styles.heroText}>
                <div>
                    <p className={styles.heroEyebrow}>Dermatologia · UNICAMP</p>
                    <h1 id="home-title">
                        <span>
                            <span>Dermatologia com</span>
                        </span>{" "}
                        <span>
                            <span>ciência, escuta</span>
                        </span>{" "}
                        <span>
                            <span>
                                e <em>cuidado</em>.
                            </span>
                        </span>
                    </h1>
                    <p className={styles.heroLead}>
                        Atendo em Campinas, São Paulo e por videoconsulta.
                    </p>
                    <div className={styles.heroActions}>
                        <BookingLink />
                        <Link href="#servicos" className={siteStyles.textLink}>
                            Ver todos os serviços
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.heroPhoto}>
                <Image
                    src={heroPhoto}
                    alt="Dra. Lorraine Souza de perfil"
                    quality={88}
                    fill
                    priority
                    sizes="(min-width: 960px) 46vw, 100vw"
                />
            </div>
        </section>
    );
}

function Manifesto({ sectionRef }) {
    return (
        <section
            className={styles.manifesto}
            ref={sectionRef}
            aria-label="Como eu trabalho"
        >
            <div className={styles.manifestoSticky}>
                <div className={styles.manifestoContent}>
                    <Eyebrow number="01" reveal={false}>
                        Como eu trabalho
                    </Eyebrow>
                    <p className={styles.manifestoQuote}>
                        {manifesto.split(" ").map((word, index) => {
                            const Tag = word.startsWith("*") ? "em" : "span";
                            return (
                                <Tag data-manifesto-word key={index}>
                                    {word.replaceAll("*", "")}{" "}
                                </Tag>
                            );
                        })}
                    </p>
                    <div className={styles.signature}>
                        <Monogram decorative className="h-[30px] w-auto" />
                        <span>Dra. Lorraine Souza</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section
            id="sobre"
            tabIndex={-1}
            className={styles.about}
            aria-labelledby="about-title"
        >
            <span id="personal-history" className={styles.previousAnchor} />
            <div className={`${siteStyles.container} ${styles.aboutGrid}`}>
                <div className={styles.aboutPhoto} data-reveal="clip">
                    <Image
                        src="/images/home/lorraine-about-hd.jpg"
                        alt="Dra. Lorraine Souza sorrindo"
                        quality={88}
                        fill
                        sizes="(min-width: 1280px) 560px, (min-width: 1030px) 45vw, 95vw"
                    />
                </div>
                <div className={styles.aboutText}>
                    <Eyebrow number="02">Sobre mim</Eyebrow>
                    <h2
                        id="about-title"
                        className={styles.largeHeading}
                        data-reveal="up"
                    >
                        Médica pela UNICAMP e <em>1º lugar</em> em Dermato na
                        UNICAMP.
                    </h2>
                    <p data-reveal="up">
                        A dermatologia é meu foco desde a graduação. Hoje, como
                        R3 na UNICAMP, levo ciência, organização e escuta para
                        as consultas e para a mentoria de médicos.
                    </p>
                </div>
            </div>
        </section>
    );
}

function Formation() {
    return (
        <section
            id="results"
            className={styles.formation}
            aria-labelledby="formation-title"
        >
            <div className={siteStyles.container}>
                <Eyebrow number="03">Formação</Eyebrow>
                <h2
                    id="formation-title"
                    className={styles.heading}
                    data-reveal="up"
                >
                    O que a minha formação muda na <em>sua consulta</em>.
                </h2>
                <ol className={styles.formationGrid}>
                    {formation.map(({ title, description, proof }, index) => (
                        <li key={title} data-reveal="up">
                            <Index>0{index + 1}</Index>
                            <div>
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <div className={styles.proof}>{proof}</div>
                            </div>
                        </li>
                    ))}
                </ol>
                <div className={styles.rankingsIntro} data-reveal="up">
                    <h3 className={styles.heading}>
                        Aprovada para a residência em <em>Dermatologia</em> nas
                        instituições mais concorridas de São Paulo.
                    </h3>
                    <Disclosure title="O que isso significa?" variant="inline">
                        <p className={styles.disclosureText}>
                            Depois da faculdade, o médico faz a residência para
                            se especializar, e a entrada é por prova.
                            Dermatologia está entre as especialidades mais
                            disputadas do país: em 2023, fui aprovada em quatro
                            desses processos, todos em 1ª chamada. Os números
                            abaixo são a minha colocação em cada um.
                        </p>
                    </Disclosure>
                </div>
                <ul className={styles.rankings}>
                    {rankings.map(([place, institution]) => (
                        <li key={institution} data-reveal="up">
                            <div className={styles.rankNumber}>
                                {place}
                                <span>º</span>
                            </div>
                            <div className={styles.rankInstitution}>
                                {institution}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function Consultation() {
    return (
        <section
            id="consulta"
            tabIndex={-1}
            className={styles.consultation}
            aria-labelledby="consultation-title"
        >
            <div className={styles.consultationPhoto} data-reveal="clip">
                <Image
                    src="/images/home/lo-8137-hd.jpg"
                    alt="Dra. Lorraine Souza sentada no consultório"
                    quality={88}
                    fill
                    sizes="(min-width: 900px) 50vw, 100vw"
                />
            </div>
            <div className={styles.consultationText}>
                <Eyebrow number="04">A consulta</Eyebrow>
                <h2
                    id="consultation-title"
                    className={styles.heading}
                    data-reveal="up"
                >
                    Do diagnóstico ao <em>acompanhamento</em>.
                </h2>
                <ol className={styles.steps}>
                    {consultationSteps.map((step, index) => (
                        <li key={step} data-reveal="up">
                            <Index>0{index + 1}</Index>
                            <span>{step}</span>
                        </li>
                    ))}
                </ol>
                <div className={styles.consultationActions} data-reveal="up">
                    <BookingLink />
                    <Link href="/consulta" className={siteStyles.textLink}>
                        Ver a consulta
                    </Link>
                </div>
            </div>
        </section>
    );
}

function Locations() {
    return (
        <section
            id="onde"
            className={styles.locations}
            aria-labelledby="locations-title"
        >
            <div className={`${siteStyles.container} ${styles.locationsGrid}`}>
                <div>
                    <Eyebrow number="05">Onde atendo</Eyebrow>
                    <h2
                        id="locations-title"
                        className={styles.heading}
                        data-reveal="up"
                    >
                        Campinas, São Paulo e <em>onde você estiver</em>.
                    </h2>
                    <dl className={styles.locationList}>
                        {places.map(([place, description]) => (
                            <div key={place} data-reveal="up">
                                <dt>{place}</dt>
                                <dd>{description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className={styles.map} data-reveal="up">
                    <Image
                        src="/map-sp.svg"
                        alt="Mapa do estado de São Paulo com Campinas e a capital marcadas"
                        fill
                        sizes="(min-width: 1080px) 60vw, 100vw"
                        unoptimized
                    />
                    <svg aria-hidden="true" viewBox="0 0 600 401">
                        <path
                            className={styles.mapRoute}
                            d="M405.5 226.9 Q 440 240 434.2 273.7"
                        />
                        {citiesOnMap.map(({ name, x, y }) => (
                            <g key={name}>
                                <circle cx={x} cy={y} r="30" fillOpacity=".1" />
                                <circle cx={x} cy={y} r="16" fillOpacity=".2" />
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="5.5"
                                    className={styles.mapDot}
                                />
                            </g>
                        ))}
                    </svg>
                    <span aria-hidden="true" className={styles.campinas}>
                        Campinas
                    </span>
                    <span aria-hidden="true" className={styles.saoPaulo}>
                        São Paulo
                    </span>
                </div>
            </div>
        </section>
    );
}

const featuredTreatments = [
    {
        slug: "toxina-botulinica",
        title: "Botox",
        description: "Pode suavizar linhas de expressão."
    },
    {
        slug: "bioestimulador-de-colageno",
        title: "Bioestimulador de colágeno",
        description: "Ajuda na firmeza da pele ao longo do tempo."
    },
    {
        slug: "preenchimento-com-acido-hialuronico",
        title: "Preenchimento facial",
        description: "Pode dar suporte ou volume em pontos do rosto."
    }
];

function Services() {
    return (
        <section
            id="servicos"
            tabIndex={-1}
            className={styles.services}
            aria-labelledby="services-title"
        >
            <span id="solutions" className={styles.previousAnchor} />
            <div className={siteStyles.container}>
                <Eyebrow number="06">Como posso te ajudar</Eyebrow>
                <h2
                    id="services-title"
                    className={styles.largeHeading}
                    data-reveal="up"
                >
                    Dois caminhos, uma <em>mesma origem</em>.
                </h2>
                <div className={styles.serviceGrid}>
                    <article className={styles.patientCard} data-reveal="up">
                        <Monogram decorative className={styles.cardMark} />
                        <div className={styles.cardLabel}>
                            <span>Para pacientes</span>
                            <Index>01</Index>
                        </div>
                        <h3>
                            Consulta de <em>dermatologia</em>
                        </h3>
                        <ul className={styles.benefits}>
                            <li>Avaliação completa</li>
                            <li>Conduta por escrito</li>
                            <li>14 dias de suporte</li>
                        </ul>
                        <div
                            id="procedimentos"
                            className={styles.patientProcedures}
                        >
                            <h4>Procedimentos</h4>
                            <ul>
                                {featuredTreatments.map(
                                    ({ slug, title, description }) => (
                                        <li key={slug}>
                                            <Link href={`/tratamentos/${slug}`}>
                                                {title}
                                            </Link>
                                            <span>{description}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className={styles.patientActions}>
                            <BookingLink />
                            <Link
                                href="/consulta"
                                className={siteStyles.textLink}
                            >
                                Ver a consulta
                            </Link>
                        </div>
                    </article>
                    <article className={styles.doctorCard} data-reveal="up">
                        <div className={styles.cardLabel}>
                            <span>Para médicos em preparação</span>
                            <Index>02</Index>
                        </div>
                        <h3>
                            Preparação para a <em>residência</em>
                        </h3>
                        <ul className={styles.doctorResources}>
                            {resources.map(({ title, description, href }) => (
                                <li key={href}>
                                    <Link href={href}>
                                        <div>
                                            <span>{title}</span>
                                            <p>{description}</p>
                                        </div>
                                        <span
                                            className={styles.resourceChevron}
                                        >
                                            <Chevron className="h-[13px] w-[13px]" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}

function Closing() {
    return (
        <section className={styles.closing} aria-labelledby="closing-title">
            <div className={siteStyles.container}>
                <Monogram
                    tone="rose"
                    decorative
                    className="mx-auto h-14 w-auto"
                />
                <h2 id="closing-title" data-reveal="up">
                    Comece por onde fizer <em>mais sentido</em> para você.
                </h2>
                <p className={styles.closingLead} data-reveal="up">
                    Nos dois caminhos, você fala direto comigo.
                </p>
                <div className={styles.closingActions} data-reveal="up">
                    <BookingLink className={styles.lightButton} />
                    <a
                        className={`${siteStyles.button} ${styles.outlineButton}`}
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Falar no WhatsApp
                    </a>
                </div>
                <p className={styles.closingContact}>
                    Não sabe qual caminho é o seu? Escreva para{" "}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Eu mesma
                    respondo.
                </p>
            </div>
        </section>
    );
}

export default function Home() {
    const mainRef = useRef(null);
    const manifestoRef = useRef(null);
    const introState = useHomeIntro();
    useScrollReveals(mainRef, manifestoRef);

    return (
        <Layout
            home
            introState={introState}
            mainRef={mainRef}
            className={styles.home}
        >
            <SEO
                title="Dra. Lorraine Souza | Dermatologia em Campinas, São Paulo e online"
                description="Médica formada pela UNICAMP e R3 em Dermatologia na UNICAMP. Consulta em Campinas, São Paulo e por videoconsulta. Mentoria para residência médica."
                url="/"
                type="profile"
                image={heroPhoto}
                imageAlt="Dra. Lorraine Souza de perfil"
            />
            <StructuredData
                graph={[
                    personSchema(heroPhoto),
                    practiceSchema(heroPhoto),
                    webSiteSchema()
                ]}
            />
            <HomeIntro stage={introState} />
            <Hero introState={introState} />
            <Manifesto sectionRef={manifestoRef} />
            <About />
            <Formation />
            <Consultation />
            <Locations />
            <Services />
            <Closing />
        </Layout>
    );
}
