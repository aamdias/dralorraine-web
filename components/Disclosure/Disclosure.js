/**
 * Disclosure — revelação progressiva (brandbook §04).
 *
 * Um bloco fechado por padrão: o título fica visível, o corpo abre no clique.
 * Serve para não despejar texto de uma vez — a pessoa escolhe o que ler.
 *
 * Construído sobre <details>/<summary> de propósito: funciona sem JS, é
 * acessível por teclado e o Ctrl+F do navegador encontra o conteúdo fechado
 * nos browsers que suportam `hidden="until-found"`.
 *
 * Marcação da marca: fio de 1px, cantos retos, "+" em cobre que gira 45°.
 * Sem sombra, sem cantos arredondados.
 */
export const Disclosure = ({
    title,
    meta,
    children,
    defaultOpen = false,
    tone = "paper"
}) => {
    const isDark = tone === "ink";

    return (
        <details
            open={defaultOpen}
            className={`group border-b ${
                isDark ? "border-paper/15" : "border-line"
            }`}
        >
            <summary
                className={`cursor-pointer list-none py-6 flex items-baseline justify-between gap-6 transition-colors ${
                    isDark
                        ? "text-paper hover:text-rose"
                        : "text-ink hover:text-copper-dark"
                }`}
            >
                <span className="flex-1">
                    <span className="block font-medium text-lg leading-snug">
                        {title}
                    </span>
                    {meta && (
                        <span
                            className={`block mt-1.5 text-xs uppercase tracking-label font-medium ${
                                isDark ? "text-paper/50" : "text-stone"
                            }`}
                        >
                            {meta}
                        </span>
                    )}
                </span>
                <span
                    aria-hidden
                    className={`text-2xl font-light leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45 ${
                        isDark ? "text-rose" : "text-copper-dark"
                    }`}
                >
                    +
                </span>
            </summary>
            <div
                className={`pb-6 pr-10 leading-relaxed ${
                    isDark ? "text-paper/70" : "text-stone"
                }`}
            >
                {children}
            </div>
        </details>
    );
};

/** Lista de disclosures com o fio superior fechando o bloco. */
export const DisclosureList = ({ children, tone = "paper" }) => (
    <div
        className={`border-t ${
            tone === "ink" ? "border-paper/30" : "border-ink"
        }`}
    >
        {children}
    </div>
);
