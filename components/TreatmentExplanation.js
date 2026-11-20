const explanations = {
    "toxina-botulinica": {
        title: "Como a toxina age entre o nervo e o músculo",
        intro: "Para um músculo se contrair, o nervo libera acetilcolina na junção neuromuscular. A toxina reduz temporariamente a liberação dessa mensagem nos pontos tratados.",
        steps: [
            {
                title: "Aplicação direcionada",
                text: "Depois de observar anatomia e movimento, a médica aplica pequenas quantidades nos músculos selecionados."
            },
            {
                title: "Menos sinal nervoso",
                text: "No terminal do nervo, a toxina reduz a liberação de acetilcolina. Ela não preenche a pele nem bloqueia os receptores do músculo."
            },
            {
                title: "Menor contração",
                text: "Com menos mensagem chegando à fibra muscular, o músculo tratado contrai com menos força por um período."
            },
            {
                title: "Linha dinâmica mais suave",
                text: "Com menos dobra repetida sobre a pele, a linha que aparece com a expressão pode suavizar de forma gradual e temporária."
            }
        ]
    },
    "bioestimulador-de-colageno": {
        title: "Por que o resultado é gradual",
        steps: [
            {
                title: "Aplicação planejada",
                text: "O produto e os pontos são definidos depois da avaliação da pele e da anatomia."
            },
            {
                title: "Resposta ao longo do tempo",
                text: "O objetivo é estimular um processo gradual, não criar uma mudança imediata."
            },
            {
                title: "Evolução acompanhada",
                text: "Qualidade e firmeza são reavaliadas ao longo do plano indicado para cada pessoa."
            }
        ]
    },
    "preenchimento-com-acido-hialuronico": {
        title: "Preencher não significa aumentar tudo",
        steps: [
            {
                title: "Leitura do rosto inteiro",
                text: "A avaliação considera proporções, contornos e o que você deseja preservar."
            },
            {
                title: "Pontos específicos",
                text: "O ácido hialurônico pode oferecer suporte ou volume onde existe indicação."
            },
            {
                title: "Integração aos seus traços",
                text: "O planejamento busca coerência com sua fisionomia, sem perseguir um rosto padrão."
            }
        ]
    },
    peelings: {
        title: "O que significa renovação controlada",
        steps: [
            {
                title: "Escolha do agente",
                text: "Tipo de pele, diagnóstico e rotina orientam qual peeling pode fazer sentido."
            },
            {
                title: "Ação na superfície",
                text: "O procedimento promove uma renovação controlada, com intensidade individualizada."
            },
            {
                title: "Recuperação e cuidado",
                text: "Fotoproteção e cuidados posteriores fazem parte do processo e do resultado."
            }
        ]
    },
    microagulhamento: {
        title: "Como funcionam as microperfurações controladas",
        steps: [
            {
                title: "Perfurações pequenas",
                text: "O dispositivo cria microperfurações repetidas e controladas na pele."
            },
            {
                title: "Processo de reparo",
                text: "A pele inicia uma resposta de recuperação depois do procedimento."
            },
            {
                title: "Mudança progressiva",
                text: "Textura e cicatrizes são acompanhadas ao longo do plano, que pode exigir mais de uma sessão."
            }
        ]
    }
};

export function TreatmentExplanation({ slug }) {
    const explanation = explanations[slug];
    if (!explanation) return null;

    return (
        <section
            className="mt-14 border-t border-line pt-12 sm:mt-20 sm:pt-16"
            aria-labelledby={`visual-${slug}`}
        >
            <h2
                id={`visual-${slug}`}
                className="mb-0 font-display text-4xl font-light leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl"
            >
                {explanation.title}
            </h2>
            {explanation.intro && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-stone">
                    {explanation.intro}
                </p>
            )}
            <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                {explanation.steps.map(({ title, text }) => (
                    <li key={title} className="border-t border-line py-4">
                        <h3 className="mb-2 font-display text-3xl font-light leading-tight text-ink">
                            {title}
                        </h3>
                        <p className="m-0 max-w-xl leading-7 text-stone">
                            {text}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
