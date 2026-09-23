import { useState, useRef, useEffect } from "react";
import {
    animate,
    motion,
    useInView,
    useReducedMotion
} from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import { Chevron } from "@components/Chevron";
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
    {
        institution: "UNICAMP",
        name: "Universidade Estadual de Campinas",
        score: 10,
        logo: "/unicamp.png"
    },
    {
        institution: "USP São Paulo",
        name: "Faculdade de Medicina da USP",
        score: 10,
        logo: "/usp-sp.png"
    },
    {
        institution: "UNIFESP",
        name: "Universidade Federal de São Paulo",
        score: 9.5,
        logo: "/unifesp-sp.png"
    }
];

const MAX_SCORE = 10;

const formatScore = (value, decimals = 0) =>
    value.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

const decimalsOf = (value) => (Number.isInteger(value) ? 0 : 1);

const averageScore =
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length;

const maxScoreCount = scores.filter((s) => s.score === MAX_SCORE).length;

/**
 * Número que conta de 0 até o valor quando entra na tela.
 * O HTML do servidor já traz o valor final (SEO e sem JS); a contagem só
 * acontece no cliente e é pulada com prefers-reduced-motion.
 */
const CountUp = ({ value, decimals = 0, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const reduceMotion = useReducedMotion();
    const [display, setDisplay] = useState(value);
    const [armed, setArmed] = useState(false);

    useEffect(() => {
        if (reduceMotion) return;
        setDisplay(0);
        setArmed(true);
    }, [reduceMotion]);

    useEffect(() => {
        if (!armed || !isInView) return;
        const controls = animate(0, value, {
            duration: 1.4,
            delay,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: setDisplay
        });
        return () => controls.stop();
    }, [armed, isInView, value, delay]);

    return (
        <span ref={ref} className="lining-nums tabular-nums">
            {formatScore(display, decimals)}
        </span>
    );
};

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
            "Suas conquistas e experiências apresentadas de forma impactante, sem nenhuma atividade relevante subestimada."
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
            "Design moderno e layout adequado aos padrões profissionais da área médica, sem excessos e sem ruído."
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

/**
 * Barra fina que preenche até a nota. O observer fica no trilho (que tem
 * largura), não na barra: um elemento de largura zero não entra em vista
 * de forma confiável.
 */
const ScoreBar = ({ ratio, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const reduceMotion = useReducedMotion();

    return (
        <div
            ref={ref}
            aria-hidden
            className="relative h-[3px] bg-ink/10 mb-5 overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 bg-copper origin-left"
                initial={{ scaleX: reduceMotion ? ratio : 0 }}
                animate={{ scaleX: isInView || reduceMotion ? ratio : 0 }}
                transition={{
                    duration: 1.4,
                    delay,
                    ease: [0.16, 1, 0.3, 1]
                }}
            />
        </div>
    );
};

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
                name: "Dra. Lorraine Souza",
                jobTitle:
                    "Médica e Mentora para Residência Médica",
                description:
                    "Médica pela UNICAMP, R3 em Dermatologia na UNICAMP e aprovada em 1º lugar, com aprovações em USP-SP, USP-RP e UNIFESP.",
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
                url: "https://dralorraine.com",
                logo: "https://dralorraine.com/ls-monogram.svg",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "São Paulo",
                    addressRegion: "SP",
                    addressCountry: "BR"
                },
                founder: {
                    "@type": "Person",
                    name: "Dra. Lorraine Souza"
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
                    price: "2490",
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
                url="/curriculo"
            />

            <div className="bg-paper text-ink">
                {/* ============ HERO ============ */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-8"
                                >
                                    <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium">
                                        Serviço especializado
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
                                        Currículo profissional para{" "}
                                        <span className="italic text-copper-dark">
                                            residência médica
                                        </span>
                                        .
                                    </h1>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-14 lg:mb-16"
                                >
                                    <p className="text-lg text-stone leading-relaxed max-w-lg">
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
                                            className="bg-ink hover:bg-copper-dark text-paper font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Quero meu currículo
                                        </Button>
                                        <a
                                            href="#resultados"
                                            className="text-ink hover:text-copper-dark font-medium underline underline-offset-[6px] decoration-1 decoration-copper/40 hover:decoration-copper transition-colors py-2"
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
                                        className="absolute -inset-6 lg:-inset-10 bg-copper/[0.06] rounded-[4px]"
                                    />
                                    <div
                                        ref={containerRef}
                                        onTouchStart={handleTouchStart}
                                        onTouchEnd={handleTouchEnd}
                                        className="relative bg-line overflow-hidden rounded-[3px] shadow-[0_40px_80px_-30px_rgba(139,58,47,0.28)] cursor-grab active:cursor-grabbing"
                                        style={{ aspectRatio: "21/29.7" }}
                                    >
                                        <img
                                            src={images[currentIndex]}
                                            alt={`Exemplo de currículo ${
                                                currentIndex + 1
                                            }`}
                                            className="w-full h-full object-contain bg-paper"
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
                                                        ? "bg-copper w-8"
                                                        : "bg-ink/20 w-2 hover:bg-ink/40"
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
                <section className="py-20 lg:py-28 border-t border-line bg-sand">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium">
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
                                <p className="text-lg text-slate leading-relaxed">
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
                                    <div className="border-t border-ink/25 pt-6">
                                        <div className="text-sm font-mono text-copper-dark tracking-[0.15em] mb-4">
                                            {b.n}
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] mb-3 text-ink">
                                            {b.title}
                                        </h3>
                                        <p className="text-slate leading-relaxed">
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
                    className="py-20 lg:py-32 border-t border-line bg-paper scroll-mt-24 overflow-hidden"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-end mb-14 lg:mb-20">
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-6"
                                >
                                    <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium">
                                        Resultados alcançados
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h2 className="text-4xl lg:text-[3.5rem] font-light leading-[1.06] tracking-[-0.02em] mb-6">
                                        Notas reais em{" "}
                                        <span className="italic text-copper-dark">
                                            bancas de SP
                                        </span>
                                        .
                                    </h2>
                                    <p className="text-lg text-stone leading-relaxed max-w-xl">
                                        A nota de currículo que o mesmo
                                        processo conquistou nas três
                                        instituições mais disputadas de São
                                        Paulo.
                                    </p>
                                </MotionBTTContainer>
                            </div>

                            {/* Resumo: média + notas máximas */}
                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <div className="grid grid-cols-2 border-y border-ink/20">
                                    <div className="py-6 pr-4 border-r border-line">
                                        <div className="font-display font-light text-6xl lg:text-7xl text-copper leading-none tracking-tight">
                                            <CountUp
                                                value={averageScore}
                                                decimals={1}
                                            />
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.22em] text-stone font-medium mt-3">
                                            Média nas 3 bancas
                                        </div>
                                    </div>
                                    <div className="py-6 pl-6">
                                        <div className="font-display font-light text-6xl lg:text-7xl text-copper leading-none tracking-tight">
                                            <span className="lining-nums">
                                                {maxScoreCount}
                                            </span>
                                            <span className="text-3xl lg:text-4xl text-stone/60 lining-nums">
                                                /{scores.length}
                                            </span>
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.22em] text-stone font-medium mt-3">
                                            Notas máximas
                                        </div>
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
                            {scores.map((s, i) => {
                                const isMax = s.score === MAX_SCORE;
                                const decimals = decimalsOf(s.score);
                                return (
                                    <MotionBTTContainer
                                        key={s.institution}
                                        transition={{
                                            delay: 0.15 + i * 0.1,
                                            duration: 0.6
                                        }}
                                        className="h-full"
                                    >
                                        <article className="group relative h-full bg-sand border border-line hover:border-copper/60 p-7 lg:p-9 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(140,98,72,0.35)]">
                                            <span
                                                aria-hidden
                                                className="absolute top-0 left-0 right-0 h-[3px] bg-copper"
                                            />

                                            <div className="flex items-center justify-between gap-4 mb-10 lg:mb-12">
                                                <div className="flex items-center gap-4 min-w-0">
                                                    <div className="w-12 h-12 flex-none flex items-center justify-center bg-paper border border-line p-1.5">
                                                        <img
                                                            src={s.logo}
                                                            alt=""
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-xs uppercase tracking-[0.22em] text-ink font-medium">
                                                            {s.institution}
                                                        </div>
                                                        <div className="text-sm text-stone mt-1 leading-snug">
                                                            {s.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-baseline gap-2 mb-8">
                                                <span className="sr-only">
                                                    {`Nota ${formatScore(
                                                        s.score,
                                                        decimals
                                                    )} de ${MAX_SCORE} em currículo`}
                                                </span>
                                                <span
                                                    aria-hidden
                                                    className="font-display font-light text-[6.5rem] lg:text-[8rem] text-copper leading-[0.85] tracking-[-0.03em]"
                                                >
                                                    <CountUp
                                                        value={s.score}
                                                        decimals={decimals}
                                                        delay={0.2 + i * 0.15}
                                                    />
                                                </span>
                                                <span
                                                    aria-hidden
                                                    className="font-display font-light text-3xl lg:text-4xl text-stone/60 lining-nums"
                                                >
                                                    /{MAX_SCORE}
                                                </span>
                                            </div>

                                            <ScoreBar
                                                ratio={s.score / MAX_SCORE}
                                                delay={0.2 + i * 0.15}
                                            />

                                            <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                                                <div className="text-xs uppercase tracking-[0.22em] text-stone font-medium whitespace-nowrap">
                                                    Nota em currículo
                                                </div>
                                                {isMax && (
                                                    <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-copper-dark font-medium border border-copper/50 px-2.5 py-1 whitespace-nowrap">
                                                        Nota máxima
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    </MotionBTTContainer>
                                );
                            })}
                        </div>

                        <MotionBTTContainer
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="mt-12 lg:mt-14 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 border-t border-line pt-8">
                                <p className="text-sm text-stone leading-relaxed max-w-3xl flex-1 my-0">
                                    <span className="font-medium text-ink">
                                        Importante:
                                    </span>{" "}
                                    garantimos um currículo profissionalmente
                                    elaborado, em total conformidade com os
                                    requisitos de cada instituição. As notas
                                    finais dependem do histórico de cada
                                    candidato. Os resultados acima são
                                    exemplos reais.
                                </p>
                                <a
                                    href="#servico"
                                    className="flex-none text-ink hover:text-copper-dark font-medium underline underline-offset-[6px] decoration-1 decoration-copper/40 hover:decoration-copper transition-colors"
                                >
                                    Quero um currículo assim
                                </a>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ SERVICE / PRICING ============ */}
                <section
                    id="servico"
                    className="py-20 lg:py-28 border-t border-line bg-ink text-paper scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-rose font-medium">
                                    Invista na sua aprovação
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Currículo{" "}
                                    <span className="italic text-rose">
                                        premium
                                    </span>
                                    .
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-paper/70 leading-relaxed">
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
                                <div className="bg-[#2A2724] border border-paper/10 p-8 lg:p-14">
                                    <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start mb-12 pb-12 border-b border-paper/15">
                                        <div>
                                            <div className="text-xs uppercase tracking-[0.24em] text-rose font-medium mb-4">
                                                Investimento único
                                            </div>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-6xl lg:text-7xl font-light text-paper tracking-tight leading-none">
                                                    R$ 2.490
                                                </span>
                                            </div>
                                            <div className="text-xs uppercase tracking-[0.22em] text-paper/50 font-medium mt-4">
                                                Até 3 currículos
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-paper/80 leading-relaxed mb-6">
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
                                                            className="border border-paper/15 p-3 text-center text-xs uppercase tracking-[0.18em] text-paper/70 font-medium"
                                                        >
                                                            {label}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs uppercase tracking-[0.24em] text-rose font-medium mb-6">
                                        O que está incluído
                                    </div>
                                    <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-paper/85 mb-12">
                                        {inclusions.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3.5"
                                            >
                                                <span aria-hidden className="w-3.5 h-px bg-rose mt-[11px] flex-none" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        href="https://aamdias.notion.site/28499f313a2a80ee9f21d7cdd02a0212?pvs=105"
                                        className="bg-paper hover:bg-copper-dark text-ink hover:text-paper font-medium w-full justify-center py-[18px] rounded-none transition-colors duration-300"
                                    >
                                        Quero meu currículo
                                    </Button>

                                    <div className="text-center mt-6 text-xs uppercase tracking-[0.22em] text-paper/40 font-medium">
                                        Processo 100% online · Pagamento
                                        facilitado
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ CROSS-LINKS ============ */}
                <section className="py-20 lg:py-28 border-t border-line bg-paper">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-16">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium">
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

                        <div className="grid md:grid-cols-2 gap-0 border-t border-line">
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Link
                                    href="/mentoria"
                                    className="group block border-b md:border-b-0 md:border-r border-line py-10 lg:py-14 px-2 lg:px-8 hover:bg-sand/40 transition-colors duration-300 h-full"
                                >
                                    <div className="text-xs uppercase tracking-[0.24em] text-stone font-medium mb-4">
                                        Mentoria individual
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] text-ink group-hover:text-copper-dark transition-colors duration-300 mb-4">
                                        Orientação completa para sua preparação.
                                    </h3>
                                    <p className="text-stone leading-relaxed mb-6">
                                        Estratégias de estudo, organização de
                                        rotina e preparação específica para as
                                        instituições de São Paulo.
                                    </p>
                                    <div className="text-sm font-medium text-ink group-hover:text-copper-dark transition-colors">
                                        Conhecer a mentoria
                                        <span className="ml-2 inline-block text-copper align-middle transition-transform duration-300 group-hover:translate-x-1">
                                            <Chevron />
                                        </span>
                                    </div>
                                </Link>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Link
                                    href="/anotacoes"
                                    className="group block border-b md:border-b-0 border-line py-10 lg:py-14 px-2 lg:px-8 hover:bg-sand/40 transition-colors duration-300 h-full"
                                >
                                    <div className="text-xs uppercase tracking-[0.24em] text-stone font-medium mb-4">
                                        Anotações originais
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] text-ink group-hover:text-copper-dark transition-colors duration-300 mb-4">
                                        +140 anotações que me aprovaram.
                                    </h3>
                                    <p className="text-stone leading-relaxed mb-6">
                                        Material completo organizado por
                                        especialidade, cobrindo Clínica
                                        Médica, Cirurgia, GO, Pediatria e
                                        Preventiva.
                                    </p>
                                    <div className="text-sm font-medium text-ink group-hover:text-copper-dark transition-colors">
                                        Conhecer as anotações
                                        <span className="ml-2 inline-block text-copper align-middle transition-transform duration-300 group-hover:translate-x-1">
                                            <Chevron />
                                        </span>
                                    </div>
                                </Link>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ FAQ ============ */}
                <section className="py-20 lg:py-28 border-t border-line bg-sand">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium">
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
                        <strong>Investimento único:</strong> R$ 2.490 por um
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
