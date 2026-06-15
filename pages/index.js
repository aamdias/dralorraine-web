import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Results } from "@components/Results";
import SEO from "@components/SEO/SEO";
import Image from "next/image";
import Link from "next/link";

const PORTRAIT_SRC = "/lolo-portrait-consulta.jpg";

const stats = [
    { figure: "UNICAMP", label: "Formação em Medicina" },
    { figure: "2023", label: "R1 em Dermatologia" },
    { figure: "+140", label: "Anotações de residência" },
    { figure: "São Paulo", label: "Atendimento" }
];

const services = [
    {
        n: "01",
        tag: "Para pacientes",
        title: "Consulta de cosmeatria",
        description:
            "Videoconsulta de 40 minutos com avaliação completa, conduta personalizada e 14 dias de suporte.",
        href: "/consulta",
        cta: "Agendar consulta",
        featured: true
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
            "+140 anotações organizadas por grande área — o mesmo material que levou à aprovação em UNICAMP, USP-RP, USP-SP e PUCC.",
        href: "/anotacoes",
        cta: "Ver anotações"
    },
    {
        n: "04",
        tag: "Método de estudo",
        title: "Template no Notion",
        description:
            "Sistema de revisão e organização digital. Cadernos digitais que substituem as pilhas de papel e tornam a revisão eficaz.",
        href: "/notion",
        cta: "Ver template"
    },
    {
        n: "05",
        tag: "Preparação",
        title: "Currículo para residência",
        description:
            "Modelo de currículo estratégico, valorizando trajetória e conquistas para provas que consideram o documento.",
        href: "/curriculo",
        cta: "Ver currículo"
    }
];

export default function Home() {
    return (
        <Layout>
            <SEO
                title="Dra. Lorraine Souza | Cosmeatria · Mentoria · Residência"
                description="Médica pela UNICAMP e R3 em Dermatologia na UNICAMP. Videoconsulta em cosmeatria, mentoria para residência médica, anotações, template Notion e currículo."
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
                                        Dra. Lorraine Souza
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
                                        Cosmeatria com ciência, escuta e{" "}
                                        <span className="italic text-[#9A4639]">
                                            cuidado
                                        </span>
                                        .
                                    </h1>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-14 lg:mb-16"
                                >
                                    <p className="text-lg text-[#57534E] leading-relaxed max-w-lg">
                                        Sou médica pela UNICAMP e R3 em
                                        Dermatologia na UNICAMP. Atendo pacientes
                                        por videoconsulta e
                                        acompanho médicos em preparação para
                                        residência — compartilhando o que
                                        aprendi ao longo da jornada.
                                    </p>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-2">
                                        <Button
                                            href="/consulta"
                                            className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Agendar consulta
                                        </Button>
                                        <a
                                            href="#solutions"
                                            className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors py-2"
                                        >
                                            Ver todos os serviços
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
                                    <div className="relative aspect-[3/4] bg-[#E7E2D9] overflow-hidden rounded-[3px] shadow-[0_40px_80px_-30px_rgba(139,58,47,0.28)]">
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
                <section className="border-t border-[#E7E2D9] bg-[#FAF6F0]">
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
                                        <div className="text-2xl lg:text-3xl font-light text-[#1C1917] tracking-tight">
                                            {s.figure}
                                        </div>
                                        <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#57534E] font-medium">
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
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-6"
                                >
                                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                        De onde eu venho
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                        Da Zona Leste de São Paulo ao{" "}
                                        <span className="italic">
                                            1º lugar
                                        </span>{" "}
                                        em Dermato na UNICAMP.
                                    </h2>
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <div className="space-y-6 text-[#3C3833] text-lg leading-relaxed">
                                    <p>
                                        Sou paulistana, nascida na Zona Leste.
                                        Foi em São José dos Campos que comecei
                                        a trilhar o caminho da medicina — fiz
                                        ensino técnico em Análises Clínicas e
                                        estudei em um cursinho popular. Três
                                        anos depois, passei na UNICAMP, que se
                                        tornou minha segunda casa.
                                    </p>
                                    <p>
                                        Durante a graduação me apaixonei pela
                                        dermatologia. Após colar grau em
                                        janeiro de 2021, dediquei dois anos à
                                        preparação para a residência médica,
                                        conciliando estudos, trabalho e saúde
                                        mental.
                                    </p>
                                    <p>
                                        Depois de muitos{" "}
                                        <span className="italic">nãos</span>,
                                        vieram os <em>sins</em>: UNICAMP,
                                        USP-RP, USP-SP e PUC Campinas. Hoje,
                                        vejo que cada passo tinha um propósito
                                        — e é essa experiência que trago para
                                        cada paciente e cada mentorado.
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
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#FAF6F0] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    Como posso te ajudar
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Dois caminhos, uma{" "}
                                    <span className="italic">mesma origem</span>
                                    .
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#57534E] leading-relaxed">
                                    Atendo quem busca cuidado em cosmeatria e
                                    acompanho quem está a caminho da
                                    residência.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="space-y-0 border-t border-[#E7E2D9]">
                            {services.map((s, i) => (
                                <MotionBTTContainer
                                    key={s.n}
                                    transition={{
                                        delay: 0.15 + i * 0.05,
                                        duration: 0.5
                                    }}
                                >
                                    <a
                                        href={s.href}
                                        className="group block border-b border-[#E7E2D9] py-8 lg:py-10 transition-colors duration-300 hover:bg-[#F3EADB]/40"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-12 items-start lg:items-center px-1 lg:px-2">
                                            <div className="flex items-baseline gap-6">
                                                <div className="text-sm font-mono text-[#9A4639] tracking-[0.15em]">
                                                    {s.n}
                                                </div>
                                                <div className="hidden sm:block text-xs uppercase tracking-[0.24em] text-[#57534E] font-medium lg:w-44">
                                                    {s.tag}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] text-[#1C1917] group-hover:text-[#9A4639] transition-colors duration-300">
                                                    {s.title}
                                                </h3>
                                                <p className="mt-3 text-[#57534E] leading-relaxed max-w-2xl">
                                                    {s.description}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium text-[#1C1917] group-hover:text-[#9A4639] transition-colors whitespace-nowrap">
                                                {s.cta}
                                                <span
                                                    aria-hidden
                                                    className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                                                >
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ CLOSING CTA ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB]">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <MotionBTTContainer
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <h2 className="text-4xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em] mb-8">
                                Vamos conversar sobre{" "}
                                <span className="italic text-[#9A4639]">
                                    a sua próxima etapa
                                </span>
                                ?
                            </h2>
                        </MotionBTTContainer>

                        <MotionBTTContainer
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-12"
                        >
                            <p className="text-lg text-[#57534E] leading-relaxed max-w-xl mx-auto">
                                Seja pra cuidar da pele ou encurtar o caminho
                                até a residência, estou aqui.
                            </p>
                        </MotionBTTContainer>

                        <MotionBTTContainer
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                                <Button
                                    href="/consulta"
                                    className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                >
                                    Agendar consulta
                                </Button>
                                <Link
                                    href="/mentoria"
                                    className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors py-2"
                                >
                                    Conhecer mentoria
                                </Link>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
