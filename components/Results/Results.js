import { MotionBTTContainer } from "@components/Motion";

const approvals = [
    {
        rank: "1º",
        institution: "UNICAMP",
        note: "Dermatologia · Universidade Estadual de Campinas"
    },
    {
        rank: "2º",
        institution: "USP Ribeirão Preto",
        note: "Dermatologia · Faculdade de Medicina de Ribeirão Preto"
    },
    {
        rank: "1º",
        institution: "PUC Campinas",
        note: "Dermatologia · Pontifícia Universidade Católica"
    },
    {
        rank: "3º",
        institution: "USP São Paulo",
        note: "Dermatologia · Faculdade de Medicina da USP"
    }
];

/**
 * Aprovações — brandbook §03/§04.
 * Os números grandes usam cobre puro: são elemento gráfico acima de 32px,
 * onde o contraste 2,9:1 é aceitável. Texto pequeno nunca em cobre puro.
 */
export const Results = () => {
    return (
        <section
            id="results"
            className="py-20 lg:py-28 bg-paper scroll-mt-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-14 lg:mb-[72px]">
                    <MotionBTTContainer
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="text-xs uppercase tracking-label text-copper-dark font-medium">
                            Aprovações · 2023
                        </div>
                    </MotionBTTContainer>

                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h2 className="font-display font-light text-4xl lg:text-[3.5rem] leading-[1.06] tracking-[-0.015em] mb-0">
                            Quatro aprovações em{" "}
                            <span className="italic">Dermatologia</span> nas
                            instituições mais concorridas do país.
                        </h2>
                        <p className="text-lg text-stone leading-[1.7] mt-8">
                            Os números são a minha colocação em cada processo
                            seletivo.
                        </p>
                    </MotionBTTContainer>
                </div>

                {/* Cabeçalho da tabela: sem ele, "1º" e "2º" viram números
                    soltos e ninguém sabe que são a colocação.
                    Só a partir de sm — na coluna de 64px do mobile os rótulos
                    em caixa alta com 0,24em de tracking se sobrepõem. No
                    mobile quem explica é a frase acima da tabela. */}
                <div className="hidden sm:grid sm:grid-cols-[92px_1fr_auto] gap-9 pb-4 border-b border-line">
                    <div className="text-xs uppercase tracking-label text-stone font-medium">
                        Colocação
                    </div>
                    <div className="text-xs uppercase tracking-label text-stone font-medium">
                        Instituição
                    </div>
                    <div className="text-xs uppercase tracking-label text-stone font-medium">
                        Chamada
                    </div>
                </div>
                {/* No mobile a tabela ainda precisa de uma linha superior */}
                <div aria-hidden className="sm:hidden border-b border-line" />

                <div>
                    {approvals.map((a, i) => (
                        <MotionBTTContainer
                            key={i}
                            transition={{
                                delay: 0.15 + i * 0.08,
                                duration: 0.5
                            }}
                        >
                            <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[92px_1fr_auto] gap-5 sm:gap-9 items-baseline py-6 lg:py-8 border-b border-line">
                                <div className="font-display font-light text-[2.75rem] lg:text-[4rem] text-copper leading-none">
                                    <span className="sr-only">
                                        {`${a.rank} lugar em `}
                                    </span>
                                    <span aria-hidden>{a.rank}</span>
                                </div>
                                <div>
                                    <div className="font-display font-normal text-2xl lg:text-[1.75rem] text-ink leading-[1.2]">
                                        {a.institution}
                                    </div>
                                    <div className="mt-1.5 text-sm text-stone">
                                        {a.note}
                                    </div>
                                </div>
                                <div className="hidden sm:block text-xs uppercase tracking-label text-stone font-medium">
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
