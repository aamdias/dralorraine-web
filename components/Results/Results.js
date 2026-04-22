import { MotionBTTContainer } from "@components/Motion";

const approvals = [
    {
        rank: "1º",
        institution: "UNICAMP",
        note: "Dermatologia · Universidade Estadual de Campinas"
    },
    {
        rank: "2º",
        institution: "USP — Ribeirão Preto",
        note: "Dermatologia · Faculdade de Medicina de Ribeirão Preto"
    },
    {
        rank: "1º",
        institution: "PUC Campinas",
        note: "Dermatologia · Pontifícia Universidade Católica"
    },
    {
        rank: "3º",
        institution: "USP — São Paulo",
        note: "Dermatologia · Faculdade de Medicina da USP"
    }
];

export const Results = () => {
    return (
        <section
            id="results"
            className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#FAF6F0] scroll-mt-24"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-14 lg:mb-20">
                    <MotionBTTContainer
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                            Aprovações · 2023
                        </div>
                    </MotionBTTContainer>

                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                            Quatro aprovações em{" "}
                            <span className="italic">Dermatologia</span> nas
                            instituições mais concorridas do país.
                        </h2>
                    </MotionBTTContainer>
                </div>

                <div className="border-t border-[#E7E2D9]">
                    {approvals.map((a, i) => (
                        <MotionBTTContainer
                            key={i}
                            transition={{
                                delay: 0.15 + i * 0.08,
                                duration: 0.5
                            }}
                        >
                            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[80px_1fr_auto] gap-4 sm:gap-8 items-baseline py-7 lg:py-8 border-b border-[#E7E2D9]">
                                <div className="text-5xl lg:text-6xl font-light text-[#9A4639] tracking-tight leading-none">
                                    {a.rank}
                                </div>
                                <div>
                                    <div className="text-xl lg:text-2xl font-light text-[#1C1917] tracking-[-0.01em]">
                                        {a.institution}
                                    </div>
                                    <div className="mt-1 text-sm text-[#57534E]">
                                        {a.note}
                                    </div>
                                </div>
                                <div className="hidden sm:block text-xs uppercase tracking-[0.24em] text-[#57534E] font-medium">
                                    Aprovada em 1ª chamada
                                </div>
                            </div>
                        </MotionBTTContainer>
                    ))}
                </div>
            </div>
        </section>
    );
};
