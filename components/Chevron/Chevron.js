/**
 * Chevron — indicador de avanço nos botões e linhas de ação.
 *
 * Substitui a seta "→": o chevron de traço fino conversa melhor com os fios
 * de 1px do sistema (brandbook §04). Mesma espessura do ícone de menu.
 *
 * Herda a cor por `currentColor`, então o pai decide o tom — normalmente
 * cobre ao lado de um rótulo em tinta.
 */
export const Chevron = ({ className = "h-3.5 w-3.5" }) => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
    >
        <path d="M9 5l7 7-7 7" />
    </svg>
);
