import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Results } from "@components/Results";
import SEO from "@components/SEO/SEO";

const stats = [
    { figure: "1º", label: "UNICAMP" },
    { figure: "2º", label: "USP-RP" },
    { figure: "1º", label: "PUC Campinas" },
    { figure: "3º", label: "USP-SP" }
];

const problems = [
    {
        n: "01",
        title: "Planejamento de estudos",
        description:
            "Como escolher o que estudar, em que ordem e como manter constância ao longo dos meses?"
    },
    {
        n: "02",
        title: "Organização da rotina",
        description:
            "Como conciliar estudos para residência com plantões, trabalho e vida pessoal sem entrar em colapso?"
    },
    {
        n: "03",
        title: "Mentalidade e saúde",
        description:
            "Como manter a mente sã, o sono em dia e a motivação alta em um ambiente tão competitivo?"
    }
];

const benefits = [
    {
        title: "Tempo de estudo mais eficiente",
        description:
            "Tomada de decisão sobre resolução de questões e priorização — o fator que mais pesa na hora da aprovação."
    },
    {
        title: "Conhecimento das instituições",
        description:
            "UNICAMP, USP, UNIFESP, PUCC — cada prova tem estilo próprio. Você vai conhecer o que importa em cada uma."
    },
    {
        title: "Rotina que sustenta a constância",
        description:
            "Avaliação de como você usa o seu tempo hoje e ajustes para manter a cadência até a prova."
    },
    {
        title: "Preparação para prática e currículo",
        description:
            "Em muitas instituições, prova prática e currículo definem a lista final. A gente trabalha isso a fundo."
    }
];

const mentorshipInclusions = [
    "Encontros mensais individuais",
    "Grupo de estudos exclusivo",
    "Plano de estudos personalizado",
    "Suporte via WhatsApp",
    "Material exclusivo e simulados",
    "Preparação para prova prática"
];

const avulsaInclusions = [
    "Encontro de até 1h30 via Google Meet",
    "Avaliação personalizada do seu momento",
    "Direcionamento para estudos",
    "Orientação sobre o que e como estudar",
    "Definição de metas e próximos passos"
];

export default function MentorshipPage() {
    return (
        <Layout>
            <SEO
                title="Mentoria para Residência Médica | Dra. Lorraine Souza"
                description="Mentoria personalizada com quem conquistou o 1º lugar em Dermato na UNICAMP. Planejamento, rotina e preparação até a aprovação."
            />

            <div className="bg-[#FAF6F0] text-[#1C1917]">
                {/* ============ HERO ============ */}
                <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <MotionBTTContainer
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                <span className="w-1.5 h-1.5 bg-[#9A4639] rounded-full" />
                                Turma 2026 · Inscrições abertas
                            </div>
                        </MotionBTTContainer>

                        <MotionBTTContainer
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4.5rem] font-light leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
                                Sua aprovação em{" "}
                                <span className="italic text-[#9A4639]">
                                    residência
                                </span>{" "}
                                começa no planejamento.
                            </h1>
                        </MotionBTTContainer>

                        <MotionBTTContainer
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mb-14 lg:mb-16"
                        >
                            <p className="text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto">
                                Mentoria individual com quem conquistou o 1º
                                lugar em Dermatologia na UNICAMP. Do
                                planejamento à aprovação, com o tempo e o
                                método que funcionam pra você.
                            </p>
                        </MotionBTTContainer>

                        {/* Stats */}
                        <MotionBTTContainer
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mb-14 lg:mb-16"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 max-w-3xl mx-auto border-t border-[#E7E2D9] pt-10">
                                {stats.map((s, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-4xl lg:text-5xl font-light text-[#9A4639] tracking-tight">
                                            {s.figure}
                                        </div>
                                        <div className="mt-3 text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MotionBTTContainer>

                        <MotionBTTContainer
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                                <Button
                                    href="https://queroserdermato.com.br"
                                    target="_blank"
                                    className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                >
                                    Conhecer Mentoria QSD 2026
                                </Button>
                                <a
                                    href="#opcoes"
                                    className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors py-2"
                                >
                                    Ver todas as opções
                                </a>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ PROBLEMS ============ */}
                <section className="py-20 lg:py-24 border-t border-[#E7E2D9] bg-[#F3EADB]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-16">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    Você já passou por isso?
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Três desafios que{" "}
                                    <span className="italic">
                                        quase todo mundo
                                    </span>{" "}
                                    enfrenta.
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#3C3833] leading-relaxed">
                                    Esses desafios são mais comuns do que você
                                    imagina — e eu sei exatamente como
                                    superá-los.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
                            {problems.map((p, i) => (
                                <MotionBTTContainer
                                    key={p.n}
                                    transition={{
                                        delay: 0.15 + i * 0.08,
                                        duration: 0.5
                                    }}
                                >
                                    <div className="border-t border-[#1C1917]/30 pt-6">
                                        <div className="text-sm font-mono text-[#9A4639] tracking-[0.15em] mb-4">
                                            {p.n}
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-light tracking-[-0.01em] mb-4 text-[#1C1917]">
                                            {p.title}
                                        </h3>
                                        <p className="text-[#3C3833] leading-relaxed">
                                            {p.description}
                                        </p>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>

                        <MotionBTTContainer
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-16 lg:mt-20"
                        >
                            <div className="text-center max-w-xl mx-auto">
                                <p className="text-lg text-[#3C3833] leading-relaxed mb-2">
                                    Vivi na prática cada um desses desafios.
                                </p>
                                <p className="text-xl lg:text-2xl font-light italic text-[#1C1917]">
                                    Deixa eu te contar como superamos juntos.
                                </p>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ RESULTS ============ */}
                <Results />

                {/* ============ TESTIMONIAL ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mb-12 text-center"
                        >
                            <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                História de sucesso
                            </div>
                        </MotionBTTContainer>

                        <MotionBTTContainer
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <blockquote className="relative">
                                <div
                                    aria-hidden
                                    className="text-6xl lg:text-8xl font-light italic text-[#9A4639]/30 absolute -top-4 -left-2 select-none leading-none"
                                >
                                    “
                                </div>
                                <p className="text-2xl lg:text-[2rem] font-light leading-[1.35] tracking-[-0.01em] text-[#1C1917] pl-8 lg:pl-14">
                                    Você foi o melhor investimento. Um guia pra
                                    calcular a rota — pra me acelerar quando eu
                                    tava parando, pra me frear quando eu tava
                                    rápido demais.
                                </p>
                                <footer className="mt-8 pl-8 lg:pl-14">
                                    <div className="h-px w-10 bg-[#9A4639] mb-4" />
                                    <div className="text-sm text-[#1C1917] font-medium">
                                        Flávia Freitas
                                    </div>
                                    <div className="text-xs uppercase tracking-[0.22em] text-[#57534E] mt-1">
                                        Aprovada · UNICAMP & USP-RP
                                    </div>
                                </footer>
                            </blockquote>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ BENEFITS ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#FAF6F0]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    O que você leva
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                    Quatro frentes que a{" "}
                                    <span className="italic">mentoria</span>{" "}
                                    trabalha com você.
                                </h2>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 lg:gap-y-16">
                            {benefits.map((b, i) => (
                                <MotionBTTContainer
                                    key={i}
                                    transition={{
                                        delay: 0.15 + i * 0.08,
                                        duration: 0.5
                                    }}
                                >
                                    <div className="border-t border-[#E7E2D9] pt-6">
                                        <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] mb-4 text-[#1C1917]">
                                            {b.title}
                                        </h3>
                                        <p className="text-[#57534E] leading-relaxed">
                                            {b.description}
                                        </p>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ OPTIONS (PRICING) ============ */}
                <section
                    id="opcoes"
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    Opções de mentoria
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Escolha o formato que faz sentido{" "}
                                    <span className="italic text-[#9A4639]">
                                        agora
                                    </span>
                                    .
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#3C3833] leading-relaxed">
                                    Programa anual completo ou sessão individual
                                    para um ponto específico — você decide.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                            {/* Primary — Full program */}
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="bg-[#1C1917] text-[#FAF6F0] h-full flex flex-col p-8 lg:p-10">
                                    <div className="text-xs uppercase tracking-[0.24em] text-[#E4B5AC] font-medium mb-6">
                                        Programa anual
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-light tracking-[-0.01em] mb-3">
                                        Mentoria QSD 2026
                                    </h3>
                                    <p className="text-[#FAF6F0]/60 text-sm mb-8">
                                        Acompanhamento contínuo durante toda sua
                                        preparação.
                                    </p>

                                    <ul className="space-y-3 text-[#FAF6F0]/85 flex-grow mb-10">
                                        {mentorshipInclusions.map((item, i) => (
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
                                        href="https://queroserdermato.com.br"
                                        target="_blank"
                                        className="bg-[#FAF6F0] hover:bg-[#9A4639] text-[#1C1917] hover:text-[#FAF6F0] font-medium w-full justify-center py-[16px] rounded-none transition-colors duration-300"
                                    >
                                        Conhecer o programa
                                    </Button>
                                </div>
                            </MotionBTTContainer>

                            {/* Secondary — One-off */}
                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div className="bg-[#FAF6F0] border border-[#E7E2D9] h-full flex flex-col p-8 lg:p-10">
                                    <div className="text-xs uppercase tracking-[0.24em] text-[#9A4639] font-medium mb-6">
                                        Sessão única
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-light tracking-[-0.01em] mb-3">
                                        Mentoria Avulsa
                                    </h3>
                                    <p className="text-[#57534E] text-sm mb-6">
                                        Sessão individual para tirar dúvidas
                                        específicas e ajustar o rumo.
                                    </p>

                                    <div className="border-t border-[#E7E2D9] pt-6 mb-6">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-sm text-[#57534E] line-through">
                                                R$499
                                            </span>
                                            <span className="text-4xl font-light text-[#1C1917] tracking-tight">
                                                R$ 399
                                            </span>
                                            <span className="text-sm text-[#57534E]">
                                                ,90
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 text-[#3C3833] flex-grow mb-10">
                                        {avulsaInclusions.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="text-[#9A4639] mt-[2px]"
                                                >
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        href="https://pay.hotmart.com/V91028431Y?checkoutMode=10&bid=1756811102458"
                                        target="_blank"
                                        className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium w-full justify-center py-[16px] rounded-none transition-colors duration-300"
                                    >
                                        Agendar sessão
                                    </Button>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
