import Head from "next/head";
import { SITE, absoluteUrl } from "@utils/site";

/**
 * Dados estruturados (JSON-LD).
 *
 * É o que faz buscadores e LLMs entenderem *quem* é a Dra. Lorraine, *o que*
 * ela oferece e *onde* atende — em vez de tentar adivinhar pelo texto. Os
 * `@id` são estáveis e reutilizados entre as páginas, para que tudo se
 * resolva como uma entidade só, e não como várias parecidas.
 */

export const IDS = {
    person: `${SITE.url}/#lorraine`,
    practice: `${SITE.url}/#consultorio`,
    website: `${SITE.url}/#website`
};

const AREA_SERVED = [
    { "@type": "City", name: SITE.city, address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country
    } },
    { "@type": "AdministrativeArea", name: SITE.regionName },
    { "@type": "Country", name: "Brasil" }
];

/** A médica. Base de identidade para tudo mais. */
export const personSchema = () => ({
    "@type": "Physician",
    "@id": IDS.person,
    name: SITE.name,
    givenName: "Lorraine",
    familyName: "Souza",
    jobTitle: "Médica dermatologista",
    medicalSpecialty: "Dermatology",
    description:
        "Médica formada pela UNICAMP e R3 em Dermatologia na UNICAMP, aprovada em 1º lugar em Dermatologia na UNICAMP e na PUC Campinas, com aprovações em USP-RP e USP-SP. Atende em Campinas, São Paulo, e por videoconsulta.",
    url: SITE.url,
    image: absoluteUrl(SITE.defaultImage),
    email: `mailto:${SITE.email}`,
    knowsLanguage: "pt-BR",
    areaServed: AREA_SERVED,
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "UNICAMP (Universidade Estadual de Campinas)"
    },
    knowsAbout: [
        "Dermatologia",
        "Dermatologia clínica",
        "Cosmiatria",
        "Acne",
        "Rosácea",
        "Melasma",
        "Queda de cabelo",
        "Toxina botulínica",
        "Preenchimento com ácido hialurônico",
        "Bioestimulador de colágeno",
        "Peelings",
        "Microagulhamento",
        "Teledermatologia",
        "Residência médica em Dermatologia"
    ],
    sameAs: [SITE.instagram]
});

/** O consultório como negócio local — é o que responde "dermatologista em Campinas". */
export const practiceSchema = () => ({
    "@type": "MedicalBusiness",
    "@id": IDS.practice,
    name: SITE.fullName,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.defaultImage),
    email: `mailto:${SITE.email}`,
    priceRange: "$$",
    currenciesAccepted: "BRL",
    areaServed: AREA_SERVED,
    address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country
    },
    founder: { "@id": IDS.person },
    employee: { "@id": IDS.person },
    medicalSpecialty: "Dermatology",
    availableService: [
        {
            "@type": "MedicalTherapy",
            name: "Consulta dermatológica presencial",
            description:
                "Consulta no consultório em Campinas, São Paulo, com exame de pele presencial e procedimentos de cosmiatria na própria visita."
        },
        {
            "@type": "MedicalTherapy",
            name: "Videoconsulta em dermatologia",
            description:
                "Consulta de uma hora por vídeo, com análise prévia de fotos, conduta por escrito e 14 dias de suporte por mensagem."
        },
        {
            "@type": "MedicalProcedure",
            name: "Toxina botulínica",
            howPerformed: "Aplicação presencial no consultório em Campinas, São Paulo."
        },
        {
            "@type": "MedicalProcedure",
            name: "Preenchimento com ácido hialurônico",
            howPerformed: "Aplicação presencial no consultório em Campinas, São Paulo."
        },
        {
            "@type": "MedicalProcedure",
            name: "Bioestimulador de colágeno",
            howPerformed: "Aplicação presencial no consultório em Campinas, São Paulo."
        },
        {
            "@type": "MedicalProcedure",
            name: "Peelings",
            howPerformed: "Realizado presencialmente no consultório em Campinas, São Paulo."
        },
        {
            "@type": "MedicalProcedure",
            name: "Microagulhamento",
            howPerformed: "Realizado presencialmente no consultório em Campinas, São Paulo."
        }
    ]
});

export const webSiteSchema = () => ({
    "@type": "WebSite",
    "@id": IDS.website,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "pt-BR",
    publisher: { "@id": IDS.person }
});

/** Trilha de navegação — ajuda o buscador a mostrar a hierarquia do site. */
export const breadcrumbSchema = (items) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path)
    }))
});

/**
 * FAQ. É o formato que mais aparece em resposta de LLM e em rich result,
 * porque já vem como par pergunta/resposta.
 */
export const faqSchema = (faqs) => ({
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a }
    }))
});

/** Renderiza um @graph único — um bloco por página, nunca vários. */
export const StructuredData = ({ graph }) => (
    <Head>
        <script
            type="application/ld+json"
            key="structured-data"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": graph
                })
            }}
        />
    </Head>
);
