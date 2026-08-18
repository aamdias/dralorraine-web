import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Results } from "@components/Results";
import { Monogram } from "@components/Logo";
import { Chevron } from "@components/Chevron";
import SEO from "@components/SEO/SEO";
import {
    StructuredData,
    personSchema,
    practiceSchema,
    webSiteSchema
} from "@components/StructuredData";
import Image from "next/image";
import Link from "next/link";

const PORTRAIT_SRC = "/lolo-portrait-consulta.jpg";

const stats = [
    { figure: "UNICAMP", label: "Formação em Medicina" },
    { figure: "2026", label: "R3 em Dermatologia" },
    { figure: "+140", label: "Anotações de residência" },
    { figure: "São Paulo", label: "Atendimento" }
];

const services = [
    {
        n: "01",
        tag: "Para pacientes",
        title: "Consulta de dermatologia",
        description:
            "Uma hora de avaliação completa, conduta personalizada e 14 dias de suporte.",
        href: "/consulta",
        cta: "Ver a consulta"
    },
    {
        n: "02",
        tag: "Para médicos em preparação",
        title: "Mentoria individual",
        description:
            "Acompanhamento estratégico com quem conquistou o 1º lugar em Dermato na UNICAMP. Planeje, ajuste rotina e chegue lá.",
        href: "/mentoria",
        cta: "Conhecer mentoria"
    },
    {
        n: "03",
        tag: "Material de estudo",
        title: "Anotações originais",
        description:
            "+140 anotações organizadas por grande área. É o mesmo material que levou às aprovações em UNICAMP, USP-RP, USP-SP e PUCC.",
        href: "/anotacoes",
        cta: "Ver anotações"
    },
    {
        n: "04",
        tag: "Preparação",
        title: "Currículo para residência",
        description:
            "Modelo de currículo estratégico, valorizando trajetória e conquistas para provas que consideram o documento.",
        href: "/curriculo",
        cta: "Ver currículo"
    }
];

const paths = [
    {
        eyebrow: "Para pacientes",
        title: "Diagnóstico preciso e uma conduta que você entende.",
        items: [
            "Uma hora de consulta, com avaliação dermatológica completa.",
            "Conduta por escrito, baseada em evidência, com o porquê de cada passo.",
            "14 dias de suporte direto comigo para ajustar o tratamento."
        ],
        cta: {
            label: "Agendar consulta",
            href: "/consulta/agendar",
            primary: true
        }
    },
    {
        eyebrow: "Para médicos em preparação",
        title: "Quatro aprovações em Dermatologia. Método, não sorte.",
        items: [
            "1º lugar na UNICAMP e na PUC Campinas, aprovada também na USP-RP e USP-SP.",
            "Plano de estudo, rotina e revisão desenhados para o seu semestre.",
            "Poucos médicos por vez, porque mentoria individual exige atenção real."
        ],
        cta: { label: "Conhecer a mentoria", href: "/mentoria", primary: false }
    }
];

export default function Home() {
    return (
        <Layout>
            <SEO
                title="Dra. Lorraine Souza | Dermatologista em Campinas e videoconsulta"
                description="Dermatologista formada pela UNICAMP e R3 em Dermatologia na UNICAMP. Consulta presencial em Campinas, São Paulo, e videoconsulta. Também mentoria para residência médica."
                url="/"
                type="profile"
            />
            <StructuredData
                graph={[personSchema(), practiceSchema(), webSiteSchema()]}
            />

            <div className="bg-paper text-ink">
                {/* ============ HERO ============ */}
                {/* O campo de fundo sobe atrás do header fixo (que fica
                    transparente no topo da home), então header e primeira
                    dobra leem como um bloco só. Papel prensado: gradiente
                    quente + grão + um halo de cobre atrás do retrato.
                    Nada de sombra — ver docs/brandbook.md §04. */}
                <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-[7.5rem] lg:pb-20">
                    <div
                        aria-hidden
                        className="absolute inset-0 -z-20 bg-[linear-gradient(172deg,#E9E1D4_0%,#F0EAE0_30%,#F7F2EA_62%,#FAF6F0_88%,#FAF6F0_100%)]"
                    />
                    <div
                        aria-hidden
                        className="absolute -z-20 -top-[28%] right-[-45%] w-[150%] sm:right-[-10%] sm:w-[68%] h-[145%] rounded-full bg-[radial-gradient(closest-side,rgba(180,137,103,0.32),rgba(180,137,103,0.10)_55%,transparent_100%)]"
                    />
                    <div
                        aria-hidden
                        className="absolute -z-20 -top-[10%] -left-[18%] h-[95%] w-[58%] rounded-full bg-[radial-gradient(closest-side,rgba(231,211,196,0.55),transparent_100%)]"
                    />
                    {/* Grão de papel: dá a textura de letterpress que a marca pede */}
                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10 opacity-[0.35] mix-blend-multiply bg-[url('/noise.webp')] bg-repeat bg-[length:220px_220px]"
                    />
                    {/* Fio de cobre fechando a dobra */}
                    <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(180,137,103,0.45)_28%,rgba(180,137,103,0.45)_72%,transparent)]"
                    />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-12 lg:gap-16 items-center">
                            {/* Fio de margem: âncora editorial da coluna de texto */}
                            <div
                                aria-hidden
                                className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-[linear-gradient(180deg,transparent,rgba(180,137,103,0.55)_18%,rgba(180,137,103,0.55)_82%,transparent)]"
                            />
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-6"
                                >
                                    <div className="text-xs uppercase tracking-label text-copper-dark font-medium leading-relaxed">
                                        Dermatologia · Campinas e videoconsulta
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h1 className="font-display font-light text-[2.75rem] sm:text-5xl lg:text-[5rem] leading-[1.03] tracking-[-0.02em] mb-7 text-balance">
                                        Dermatologia com ciência, escuta e{" "}
                                        <span className="italic text-copper-dark">
                                            cuidado
                                        </span>
                                        .
                                    </h1>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-10 lg:mb-11"
                                >
                                    <p className="text-lg text-stone leading-[1.7] max-w-lg">
                                        Sou médica pela UNICAMP e R3 em
                                        Dermatologia na UNICAMP. Atendo no
                                        consultório, em Campinas, e por
                                        videoconsulta, de onde você estiver.
                                        Também acompanho médicos em preparação
                                        para a residência.
                                    </p>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-9 py-2">
                                        <Button
                                            href="/consulta/agendar"
                                            className="bg-ink hover:bg-copper-dark text-paper font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Agendar consulta
                                        </Button>
                                        <a
                                            href="#solutions"
                                            className="text-ink hover:text-copper-dark font-medium underline underline-offset-[6px] decoration-1 decoration-copper/50 hover:decoration-copper-dark transition-colors py-2 text-center sm:text-left"
                                        >
                                            Ver todos os serviços
                                        </a>
                                    </div>
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.7 }}
                            >
                                {/* Fio de canto + tinta de cobre: enquadramento
                                    editorial, sem sombra (brandbook §04/§05). */}
                                <div className="relative max-w-[420px] mx-auto lg:max-w-[440px] lg:mr-0 lg:ml-auto">
                                    <div
                                        aria-hidden
                                        className="absolute -inset-4 lg:-inset-7 bg-copper/[0.08]"
                                    />
                                    <div
                                        aria-hidden
                                        className="absolute -top-4 -left-4 lg:-top-7 lg:-left-7 w-16 lg:w-[88px] h-px bg-copper"
                                    />
                                    <div
                                        aria-hidden
                                        className="absolute -top-4 -left-4 lg:-top-7 lg:-left-7 w-px h-16 lg:h-[88px] bg-copper"
                                    />
                                    <div className="relative aspect-[3/4] bg-line overflow-hidden">
                                        <Image
                                            src={PORTRAIT_SRC}
                                            alt="Dra. Lorraine Souza"
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 1024px) 90vw, 40vw"
                                        />
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ STATS STRIP ============ */}
                <section className="bg-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
                            {stats.map((s, i) => (
                                <MotionBTTContainer
                                    key={i}
                                    transition={{
                                        delay: 0.1 + i * 0.08,
                                        duration: 0.5
                                    }}
                                >
                                    <div>
                                        <div className="font-display font-light text-3xl lg:text-[2.5rem] text-ink leading-[1.1]">
                                            {s.figure}
                                        </div>
                                        <div className="mt-2.5 text-[11px] uppercase tracking-[0.18em] text-stone font-medium leading-relaxed">
                                            {s.label}
                                        </div>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ PERSONAL HISTORY ============ */}
                <section
                    id="personal-history"
                    className="py-20 lg:py-28 bg-sand scroll-mt-24"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-[88px]">
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-6"
                                >
                                    <div className="text-xs uppercase tracking-label text-copper-dark font-medium">
                                        Sobre mim
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h2 className="font-display font-light text-4xl lg:text-[3.5rem] leading-[1.06] tracking-[-0.015em] mb-0">
                                        Médica pela UNICAMP e{" "}
                                        <span className="italic">
                                            1º lugar
                                        </span>{" "}
                                        em Dermato na UNICAMP.
                                    </h2>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.35, duration: 0.6 }}
                                >
                                    <Monogram
                                        decorative
                                        className="h-14 w-auto mt-11 opacity-50"
                                    />
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <div className="space-y-6 text-slate text-lg leading-[1.7]">
                                    <p>
                                        Sou médica formada pela UNICAMP, onde a
                                        dermatologia se tornou meu foco desde a
                                        graduação. Minha trajetória combina
                                        estudo intenso, prática clínica e a
                                        curiosidade constante de cuidar melhor
                                        da pele de cada pessoa.
                                    </p>
                                    <p>
                                        Na preparação para a residência,
                                        conquistei o 1º lugar em Dermatologia
                                        na UNICAMP, além de aprovações em
                                        USP-RP, USP-SP e PUC Campinas. Esse
                                        resultado nasceu de método,
                                        consistência e escolhas bem feitas ao
                                        longo do caminho.
                                    </p>
                                    <p>
                                        Hoje, como R3 em Dermatologia na
                                        UNICAMP, levo essa mesma combinação de
                                        ciência, organização e escuta para as
                                        consultas e para a mentoria de médicos
                                        que também estão construindo seus
                                        próximos passos.
                                    </p>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ RESULTS ============ */}
                <Results />

                {/* ============ SOLUTIONS ============ */}
                <section
                    id="solutions"
                    className="py-20 lg:py-28 bg-paper scroll-mt-24"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-[72px]">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-label text-copper-dark font-medium">
                                    Como posso te ajudar
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="font-display font-light text-4xl lg:text-[3.5rem] leading-[1.06] tracking-[-0.015em] mb-5">
                                    Dois caminhos, uma{" "}
                                    <span className="italic">mesma origem</span>
                                    .
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-stone leading-[1.7]">
                                    Atendo quem busca cuidado em dermatologia e
                                    acompanho quem está a caminho da
                                    residência.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="space-y-0 border-t border-line">
                            {services.map((s, i) => (
                                <MotionBTTContainer
                                    key={s.n}
                                    transition={{
                                        delay: 0.15 + i * 0.05,
                                        duration: 0.5
                                    }}
                                >
                                    <Link
                                        href={s.href}
                                        className="group block border-b border-line py-8 lg:py-9 transition-colors duration-300 hover:bg-sand"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 lg:gap-12 items-start lg:items-center px-1 lg:px-2">
                                            <div className="flex items-baseline gap-5">
                                                <div className="text-[13px] font-mono text-copper tracking-index">
                                                    {s.n}
                                                </div>
                                                <div className="hidden sm:block text-xs uppercase tracking-[0.2em] text-stone font-medium lg:w-[184px]">
                                                    {s.tag}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-display font-normal text-[1.6rem] lg:text-[2rem] leading-[1.15] text-ink group-hover:text-copper-dark transition-colors duration-300 mb-0">
                                                    {s.title}
                                                </h3>
                                                <p className="mt-2.5 text-stone leading-[1.65] max-w-2xl">
                                                    {s.description}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium text-ink group-hover:text-copper-dark transition-colors whitespace-nowrap">
                                                {s.cta}
                                                <span className="ml-2 inline-block text-copper align-middle transition-transform duration-300 group-hover:translate-x-1">
                                                    <Chevron />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ CLOSING CTA (superfície escura) ============ */}
                <section className="py-20 lg:py-[120px] bg-ink text-paper">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <Monogram
                                    tone="rose"
                                    decorative
                                    className="h-14 lg:h-[60px] w-auto"
                                />
                                <h2 className="font-display font-light text-4xl lg:text-[3.75rem] leading-[1.06] tracking-[-0.02em] mt-9 mb-0 text-paper max-w-3xl">
                                    Comece por onde fizer{" "}
                                    <span className="italic text-rose">
                                        mais sentido
                                    </span>{" "}
                                    para você.
                                </h2>
                                <p className="text-lg text-paper/70 leading-[1.7] max-w-lg mt-8 lg:mt-10">
                                    Nos dois caminhos, você fala direto comigo.
                                </p>
                            </div>
                        </MotionBTTContainer>

                        <MotionBTTContainer
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {/* Grade de 1px: os fios são o próprio divisor */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/[0.16] border border-paper/[0.16] mt-12 lg:mt-16">
                                {paths.map((p) => (
                                    <div
                                        key={p.eyebrow}
                                        className="bg-ink p-8 lg:p-12 flex flex-col"
                                    >
                                        <div className="text-[11px] uppercase tracking-label text-copper font-medium">
                                            {p.eyebrow}
                                        </div>
                                        <h3 className="font-display font-normal text-[1.6rem] lg:text-[2rem] leading-[1.2] text-paper mt-5 mb-0">
                                            {p.title}
                                        </h3>
                                        <ul className="mt-6 space-y-3.5 text-[15px] text-paper/[0.72] leading-relaxed">
                                            {p.items.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex gap-3.5"
                                                >
                                                    <span
                                                        aria-hidden
                                                        className="w-3.5 h-px bg-copper mt-[11px] flex-none"
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-auto pt-8">
                                            <Link
                                                href={p.cta.href}
                                                role="button"
                                                className={`inline-flex items-center justify-center px-8 py-4 text-[15px] font-medium rounded-none transition-colors duration-300 ${
                                                    p.cta.primary
                                                        ? "bg-paper text-ink hover:bg-rose"
                                                        : "border border-paper/50 text-paper hover:bg-paper hover:text-ink hover:border-paper"
                                                }`}
                                            >
                                                {p.cta.label}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MotionBTTContainer>

                        <p className="text-center text-[13px] text-paper/45 leading-[1.7] mt-14 lg:mt-16 mx-auto max-w-xl">
                            Não sabe qual caminho é o seu? Escreva para{" "}
                            <a
                                href="mailto:contato@dralorraine.com"
                                className="text-rose hover:text-paper transition-colors"
                            >
                                contato@dralorraine.com
                            </a>
                            . Eu mesma respondo.
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
