import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { FAQ } from "@components/FAQ";
import SEO from "@components/SEO/SEO";

const images = [
    "/resume-example-1.png",
    "/resume-example-2.png",
    "/resume-example-3.png"
];

const scores = [
    { institution: "UNICAMP", score: "10", logo: "/unicamp.png" },
    { institution: "USP — São Paulo", score: "10", logo: "/usp-sp.png" },
    { institution: "UNIFESP", score: "9.5", logo: "/unifesp-sp.png" }
];

const benefits = [
    {
        n: "01",
        title: "Diferenciação",
        description:
            "Destaque-se entre os candidatos com um currículo profissional, estrategicamente estruturado para as bancas de SP."
    },
    {
        n: "02",
        title: "Valorização",
        description:
            "Suas conquistas e experiências apresentadas de forma impactante — nenhuma atividade relevante subestimada."
    },
    {
        n: "03",
        title: "Organização",
        description:
            "Informações claras, objetivas e visualmente atraentes. Um documento fácil de avaliar em poucos segundos."
    },
    {
        n: "04",
        title: "Otimização",
        description:
            "Foco nos elementos mais valorizados pelas bancas. O que pesa, em primeiro plano; o resto, no lugar certo."
    },
    {
        n: "05",
        title: "Profissionalismo",
        description:
            "Design moderno e layout adequado aos padrões profissionais da área médica — sem excessos, sem ruído."
    },
    {
        n: "06",
        title: "Confiança",
        description:
            "Apresente-se com segurança, sabendo que seu currículo está impecável e pronto para cada banca."
    }
];

const inclusions = [
    "Feito pela mesma pessoa que elaborou o currículo da Dra. Lorraine",
    "Design exclusivo de quem tem experiência em tecnologia",
    "100% personalizado para você e para cada instituição",
    "Até 3 currículos para 3 instituições diferentes",
    "Entrega em até 30 dias após coleta dos certificados",
    "30 dias de suporte pós-entrega para ajustes"
];

export default function Curriculo() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(null);
    const containerRef = useRef(null);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (startX === null) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
        setStartX(null);
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                mainEntity: faqItems.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text:
                            typeof item.answer === "string"
                                ? item.answer
                                : item.answer.props.children.join(" ")
                    }
                }))
            },
            {
                "@type": "Person",
                name: "Dra. Lorraine Almeida",
                jobTitle:
                    "Médica Dermatologista e Mentora para Residência Médica",
                description:
                    "Médica aprovada em 1º lugar em Dermatologia na UNICAMP, com aprovações em USP-SP, USP-RP e UNIFESP.",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "São Paulo",
                    addressRegion: "SP",
                    addressCountry: "BR"
                },
                alumniOf: [
                    {
                        "@type": "EducationalOrganization",
                        name: "UNICAMP - Universidade Estadual de Campinas"
                    }
                ],
                knowsAbout: [
                    "Residência Médica",
                    "Dermatologia",
                    "Preparação para Provas",
                    "Currículo Médico",
                    "UNICAMP",
                    "USP",
                    "UNIFESP"
                ],
                sameAs: ["https://www.instagram.com/dralaorraine"]
            },
            {
                "@type": "Organization",
                name: "Dra. Lorraine - Serviços para Residência Médica",
                description:
                    "Serviços para aprovação em residência médica: elaboração de currículo profissional, mentoria individual e material de estudo.",
                url: "https://dralaorraine.com.br",
                logo: "https://dralaorraine.com.br/newlogo-dralorraine-web.svg",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "São Paulo",
                    addressRegion: "SP",
                    addressCountry: "BR"
                },
                founder: {
                    "@type": "Person",
                    name: "Dra. Lorraine Almeida"
                },
                areaServed: {
                    "@type": "State",
                    name: "São Paulo"
                },
                serviceType: [
                    "Elaboração de Currículo para Residência Médica",
                    "Mentoria Individual",
                    "Material de Estudo"
                ],
                knowsAbout: [
                    "UNICAMP",
                    "USP",
                    "UNIFESP",
                    "PUC Campinas",
                    "Residência Médica"
                ]
            },
            {
                "@type": "Service",
                serviceType: "Elaboração de Currículo para Residência Médica",
                provider: {
                    "@type": "Organization",
                    name: "Dra. Lorraine - Serviços para Residência Médica"
                },
                areaServed: {
                    "@type": "State",
                    name: "São Paulo"
                },
                audience: {
                    "@type": "Audience",
                    audienceType: "Médicos candidatos a residência médica"
                },
                offers: {
                    "@type": "Offer",
                    price: "1500",
                    priceCurrency: "BRL",
                    availability: "https://schema.org/InStock",
                    description:
                        "Currículo profissional personalizado para residência médica em instituições de São Paulo (UNICAMP, USP, UNIFESP, PUC)"
                }
            }
        ]
    };

    return (
        <Layout>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />
            </Head>
            <SEO
                title="Currículo Profissional para Residência Médica | Dra. Lorraine"
                description="Currículo premium para residência médica em São Paulo. Experiência comprovada com notas 10 em UNICAMP e USP-SP e 9.5 em UNIFESP."
                keywords="currículo residência médica, UNICAMP residência, USP residência, UNIFESP residência, PUC residência"
            />

            <div className="bg-[#FAF6F0] text-[#1C1917]">
                {/* ============ HERO ============ */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-8"
                                >
                                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                        Serviço especializado
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
                                        Currículo profissional para{" "}
                                        <span className="italic text-[#9A4639]">
                                            residência médica
                                        </span>
                                        .
                                    </h1>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-14 lg:mb-16"
                                >
                                    <p className="text-lg text-[#57534E] leading-relaxed max-w-lg">
                                        Um currículo estrategicamente
                                        elaborado, próximo ao que me levou às
                                        melhores notas em UNICAMP, USP-SP e
                                        UNIFESP.
                                    </p>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-2">
                                        <Button
                                            href="#servico"
                                            className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Quero meu currículo
                                        </Button>
                                        <a
                                            href="#resultados"
                                            className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors py-2"
                                        >
                                            Ver resultados
                                        </a>
                                    </div>
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.7 }}
                            >
                                <div className="relative max-w-[440px] mx-auto lg:max-w-none">
                                    <div
                                        aria-hidden
                                        className="absolute -inset-6 lg:-inset-10 bg-[#9A4639]/[0.06] rounded-[4px]"
                                    />
                                    <div
                                        ref={containerRef}
                                        onTouchStart={handleTouchStart}
                                        onTouchEnd={handleTouchEnd}
                                        className="relative bg-[#E7E2D9] overflow-hidden rounded-[3px] shadow-[0_40px_80px_-30px_rgba(139,58,47,0.28)] cursor-grab active:cursor-grabbing"
                                        style={{ aspectRatio: "21/29.7" }}
                                    >
                                        <img
                                            src={images[currentIndex]}
                                            alt={`Exemplo de currículo ${
                                                currentIndex + 1
                                            }`}
                                            className="w-full h-full object-contain bg-[#FAF6F0]"
                                            draggable="false"
                                        />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setCurrentIndex(index)
                                                }
                                                aria-label={`Ver exemplo ${
                                                    index + 1
                                                }`}
                                                className={`h-1.5 transition-all ${
                                                    index === currentIndex
                                                        ? "bg-[#9A4639] w-8"
                                                        : "bg-[#1C1917]/20 w-2 hover:bg-[#1C1917]/40"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ BENEFITS ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    Por que investir
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Um currículo que{" "}
                                    <span className="italic">te valoriza</span>{" "}
                                    e facilita a avaliação da banca.
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#3C3833] leading-relaxed">
                                    Em instituições concorridas, cada ponto
                                    conta. Um documento bem elaborado garante
                                    que nenhuma conquista fique de fora.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
                            {benefits.map((b, i) => (
                                <MotionBTTContainer
                                    key={b.n}
                                    transition={{
                                        delay: 0.15 + i * 0.06,
                                        duration: 0.5
                                    }}
                                >
                                    <div className="border-t border-[#1C1917]/25 pt-6">
                                        <div className="text-sm font-mono text-[#9A4639] tracking-[0.15em] mb-4">
                                            {b.n}
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] mb-3 text-[#1C1917]">
                                            {b.title}
                                        </h3>
                                        <p className="text-[#3C3833] leading-relaxed">
                                            {b.description}
                                        </p>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ RESULTS / SCORES ============ */}
                <section
                    id="resultados"
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#FAF6F0] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    Resultados alcançados
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                    Notas reais em{" "}
                                    <span className="italic">bancas de SP</span>
                                    .
                                </h2>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid md:grid-cols-3 gap-0 border-t border-[#E7E2D9]">
                            {scores.map((s, i) => (
                                <MotionBTTContainer
                                    key={s.institution}
                                    transition={{
                                        delay: 0.15 + i * 0.08,
                                        duration: 0.5
                                    }}
                                >
                                    <div className="border-b border-[#E7E2D9] md:border-b-0 md:border-r last:border-r-0 py-10 lg:py-14 px-4 lg:px-8 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                            <img
                                                src={s.logo}
                                                alt={s.institution}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.24em] text-[#57534E] font-medium mb-3">
                                            {s.institution}
                                        </div>
                                        <div className="text-6xl lg:text-7xl font-light text-[#9A4639] tracking-tight leading-none">
                                            {s.score}
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium mt-4">
                                            Nota em currículo
                                        </div>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>

                        <MotionBTTContainer
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <p className="mt-12 text-sm text-[#57534E] leading-relaxed max-w-3xl">
                                <span className="font-medium text-[#1C1917]">
                                    Importante:
                                </span>{" "}
                                garantimos um currículo profissionalmente
                                elaborado, em total conformidade com os
                                requisitos de cada instituição. As notas finais
                                dependem do histórico de cada candidato. Os
                                resultados acima são exemplos reais.
                            </p>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ SERVICE / PRICING ============ */}
                <section
                    id="servico"
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#1C1917] text-[#FAF6F0] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#E4B5AC] font-medium">
                                    Invista na sua aprovação
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Currículo{" "}
                                    <span className="italic text-[#E4B5AC]">
                                        premium
                                    </span>
                                    .
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#FAF6F0]/70 leading-relaxed">
                                    Um processo colaborativo, conduzido por
                                    quem conquistou as melhores notas nas
                                    bancas de São Paulo.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="bg-[#2A2724] border border-[#FAF6F0]/10 p-8 lg:p-14">
                                    <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start mb-12 pb-12 border-b border-[#FAF6F0]/15">
                                        <div>
                                            <div className="text-xs uppercase tracking-[0.24em] text-[#E4B5AC] font-medium mb-4">
                                                Investimento único
                                            </div>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-6xl lg:text-7xl font-light text-[#FAF6F0] tracking-tight leading-none">
                                                    R$ 1.500
                                                </span>
                                            </div>
                                            <div className="text-xs uppercase tracking-[0.22em] text-[#FAF6F0]/50 font-medium mt-4">
                                                Até 3 currículos
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[#FAF6F0]/80 leading-relaxed mb-6">
                                                Currículos personalizados para
                                                até 3 instituições à sua
                                                escolha, acompanhados de
                                                mentoria individual com a Dra.
                                                Lorraine sobre como valorizar
                                                sua trajetória.
                                            </p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {["Currículo 1", "Currículo 2", "Currículo 3"].map(
                                                    (label) => (
                                                        <div
                                                            key={label}
                                                            className="border border-[#FAF6F0]/15 p-3 text-center text-xs uppercase tracking-[0.18em] text-[#FAF6F0]/70 font-medium"
                                                        >
                                                            {label}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs uppercase tracking-[0.24em] text-[#E4B5AC] font-medium mb-6">
                                        O que está incluído
                                    </div>
                                    <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-[#FAF6F0]/85 mb-12">
                                        {inclusions.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="text-[#E4B5AC] mt-[2px]"
                                                >
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        href="https://aamdias.notion.site/28499f313a2a80ee9f21d7cdd02a0212?pvs=105"
                                        className="bg-[#FAF6F0] hover:bg-[#9A4639] text-[#1C1917] hover:text-[#FAF6F0] font-medium w-full justify-center py-[18px] rounded-none transition-colors duration-300"
                                    >
                                        Quero meu currículo
                                    </Button>

                                    <div className="text-center mt-6 text-xs uppercase tracking-[0.22em] text-[#FAF6F0]/40 font-medium">
                                        Processo 100% online · Pagamento
                                        facilitado
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ CROSS-LINKS ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#FAF6F0]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-16">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    Outros serviços
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                    Prepare-se{" "}
                                    <span className="italic">
                                        completamente
                                    </span>{" "}
                                    para a residência.
                                </h2>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid md:grid-cols-2 gap-0 border-t border-[#E7E2D9]">
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Link
                                    href="/mentoria"
                                    className="group block border-b md:border-b-0 md:border-r border-[#E7E2D9] py-10 lg:py-14 px-2 lg:px-8 hover:bg-[#F3EADB]/40 transition-colors duration-300 h-full"
                                >
                                    <div className="text-xs uppercase tracking-[0.24em] text-[#57534E] font-medium mb-4">
                                        Mentoria individual
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] text-[#1C1917] group-hover:text-[#9A4639] transition-colors duration-300 mb-4">
                                        Orientação completa para sua preparação.
                                    </h3>
                                    <p className="text-[#57534E] leading-relaxed mb-6">
                                        Estratégias de estudo, organização de
                                        rotina e preparação específica para as
                                        instituições de São Paulo.
                                    </p>
                                    <div className="text-sm font-medium text-[#1C1917] group-hover:text-[#9A4639] transition-colors">
                                        Conhecer a mentoria
                                        <span
                                            aria-hidden
                                            className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </div>
                                </Link>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Link
                                    href="/anotacoes"
                                    className="group block border-b md:border-b-0 border-[#E7E2D9] py-10 lg:py-14 px-2 lg:px-8 hover:bg-[#F3EADB]/40 transition-colors duration-300 h-full"
                                >
                                    <div className="text-xs uppercase tracking-[0.24em] text-[#57534E] font-medium mb-4">
                                        Anotações originais
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] text-[#1C1917] group-hover:text-[#9A4639] transition-colors duration-300 mb-4">
                                        +140 anotações que me aprovaram.
                                    </h3>
                                    <p className="text-[#57534E] leading-relaxed mb-6">
                                        Material completo organizado por
                                        especialidade, cobrindo Clínica
                                        Médica, Cirurgia, GO, Pediatria e
                                        Preventiva.
                                    </p>
                                    <div className="text-sm font-medium text-[#1C1917] group-hover:text-[#9A4639] transition-colors">
                                        Conhecer as anotações
                                        <span
                                            aria-hidden
                                            className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </div>
                                </Link>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ FAQ ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    Perguntas frequentes
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                    Dúvidas sobre{" "}
                                    <span className="italic">currículo</span>{" "}
                                    para residência.
                                </h2>
                            </MotionBTTContainer>
                        </div>

                        <MotionBTTContainer
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <FAQ items={faqItems} />
                        </MotionBTTContainer>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

const faqItems = [
    {
        question:
            "Quais documentos preciso anexar ao meu currículo para residência médica?",
        answer: (
            <div className="space-y-3">
                <p>
                    Os documentos necessários variam por instituição, mas
                    geralmente incluem:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Comprovantes de atividades acadêmicas:</strong>{" "}
                        certificados de monitoria, iniciação científica, ligas
                        acadêmicas
                    </li>
                    <li>
                        <strong>Publicações científicas:</strong> artigos
                        publicados, resumos em anais de congressos
                    </li>
                    <li>
                        <strong>Certificados de cursos:</strong> extensão
                        universitária, especializações, workshops
                    </li>
                    <li>
                        <strong>Comprovantes de participação em eventos:</strong>{" "}
                        congressos, simpósios, jornadas científicas
                    </li>
                    <li>
                        <strong>Histórico escolar:</strong> algumas instituições
                        exigem
                    </li>
                    <li>
                        <strong>Diploma de graduação:</strong> cópia autenticada
                    </li>
                </ul>
                <p className="mt-3">
                    <strong>Dica importante:</strong> mantenha todos os
                    documentos digitalizados em alta resolução e organizados
                    por categoria. Nosso serviço assume que a pessoa
                    interessada possui os documentos legítimos.
                </p>
            </div>
        )
    },
    {
        question: "Quem será responsável por elaborar meu currículo?",
        answer: (
            <div className="space-y-3">
                <p>
                    Seu currículo será elaborado por <strong>Alan Dias</strong>,
                    que traz uma experiência única para esse serviço:
                </p>
                <p>
                    Alan é Gerente de Produto no Jusbrasil e possui formação em
                    Engenharia Mecânica pelo Instituto Tecnológico de
                    Aeronáutica (ITA). Ao longo dos últimos 7 anos, construiu
                    sua carreira em startups de tecnologia de destaque, com
                    passagens por Trybe e Quero Educação.
                </p>
                <p>
                    Desde 2024, atua no Jusbrasil desenvolvendo soluções de IA
                    para apoiar advogados na pesquisa jurídica. Atualmente, é
                    gerente de produto do Jus IA, assistente jurídico baseado
                    em inteligência artificial generativa que transforma a
                    forma como profissionais do Direito acessam e utilizam
                    informação jurídica.
                </p>
                <p className="mt-3">
                    <strong>Por que isso importa?</strong> Alan combina
                    experiência em design de produto nas melhores empresas de
                    tecnologia do Brasil com profundo entendimento de como
                    estruturar informações complexas de forma clara e
                    impactante.
                </p>
            </div>
        )
    },
    {
        question:
            "Vocês já tiveram resultados comprovados em instituições de São Paulo?",
        answer: (
            <div className="space-y-3">
                <p>
                    Sim! Nosso serviço já conquistou excelentes resultados nas
                    principais instituições de São Paulo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>UNICAMP:</strong> Nota 10 em currículo
                    </li>
                    <li>
                        <strong>USP-SP:</strong> Nota 10 em currículo
                    </li>
                    <li>
                        <strong>UNIFESP:</strong> Nota 9.5 em currículo
                    </li>
                </ul>
                <p className="mt-3">
                    Oferecemos até 3 currículos personalizados para diferentes
                    instituições, respeitando as particularidades de cada uma.
                </p>
                <p className="mt-2">
                    <strong>Atenção:</strong> as notas finais dependem do
                    histórico acadêmico e profissional individual de cada
                    candidato. Garantimos a qualidade profissional do
                    documento e a conformidade com os requisitos
                    institucionais.
                </p>
            </div>
        )
    },
    {
        question:
            "Quanto tempo leva para fazer um currículo profissional para residência?",
        answer:
            "O processo leva em média 20 a 30 dias após a coleta completa de todos os certificados e documentos. Este prazo inclui: (1) encontro inicial para entendimento do seu contexto, (2) análise e organização da documentação, (3) elaboração do design e estruturação do conteúdo, (4) revisões e ajustes, (5) entrega final com suporte de 30 dias. É importante iniciar o processo com antecedência em relação aos prazos de inscrição."
    },
    {
        question: "Vale a pena investir em um currículo profissional?",
        answer: (
            <div className="space-y-3">
                <p>Sim, e os dados comprovam isso:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Diferencial competitivo:</strong> em
                        instituições concorridas, cada ponto do currículo pode
                        ser decisivo
                    </li>
                    <li>
                        <strong>Valorização adequada:</strong> um currículo bem
                        estruturado garante que nenhuma atividade relevante
                        seja subestimada
                    </li>
                    <li>
                        <strong>Economia de tempo:</strong> evita retrabalho e
                        garante que o documento esteja correto desde a
                        primeira entrega
                    </li>
                    <li>
                        <strong>Experiência comprovada:</strong> prestado pela
                        mesma pessoa que elaborou o currículo que me levou às
                        melhores notas nas bancas
                    </li>
                    <li>
                        <strong>Investimento único:</strong> R$ 1.500 por um
                        serviço que pode definir sua carreira médica
                    </li>
                </ul>
            </div>
        )
    },
    {
        question: "Como funciona o processo de elaboração do currículo?",
        answer: (
            <div className="space-y-3">
                <p>O processo é colaborativo e dividido em etapas claras:</p>
                <ol className="list-decimal pl-6 space-y-3">
                    <li>
                        <strong>Preenchimento de formulário:</strong> você
                        preenche o formulário de interesse com suas
                        informações básicas
                    </li>
                    <li>
                        <strong>Contato individual:</strong> entramos em
                        contato via WhatsApp para tirar dúvidas e escolher o
                        método de pagamento
                    </li>
                    <li>
                        <strong>Contratação:</strong> assinatura do contrato e
                        realização do pagamento
                    </li>
                    <li>
                        <strong>Mentoria com Dra. Lô:</strong> agendamento de
                        mentoria para te ajudar a se planejar para a
                        residência
                    </li>
                    <li>
                        <strong>Coleta de informações:</strong> início da
                        coleta e preparação dos currículos
                    </li>
                    <li>
                        <strong>Revisões colaborativas:</strong> reuniões e
                        checkpoints para revisar os currículos em andamento
                    </li>
                    <li>
                        <strong>Entrega final:</strong> entrega de cada
                        currículo em PDF em até 30 dias após o envio dos
                        dados necessários
                    </li>
                </ol>
                <p className="mt-3">
                    Todo o processo é 100% online e você participa ativamente
                    das decisões.
                </p>
            </div>
        )
    }
];
