/**
 * Marca Dra. Lorraine Souza — monograma LS + lockups.
 * Manual de marca §01. Ver docs/brandbook.md antes de alterar.
 *
 * O monograma é o ativo central; o nome tipografado só aparece no lockup.
 * SVG inline (e não <img>) para que o traço herde a cor do tom escolhido
 * e para evitar um request extra no header.
 *
 * Tamanhos mínimos (§01):
 *   lockup horizontal  ≥ 40px de altura
 *   lockup vertical    ≥ 72px de altura
 *   monograma isolado  ≥ 24px de altura
 *
 * O descritor DERMATOLOGIA é tipografado em Inter 500 · 10px · 0,24em:
 * abaixo de 12px a serifa fina do Cormorant desaparece em tela.
 */

import { MONOGRAM_L, MONOGRAM_S } from "@utils/brand.mjs";

/**
 * Tons permitidos (§01 — "não recolorir: só cobre, tinta, rosa ou papel").
 * `mark` pinta o monograma, `type` pinta nome + descritor,
 * `rule` pinta o fio divisor do lockup horizontal.
 */
const TONES = {
    copper: { mark: "#B48967", type: "#8C6248", rule: "#E7E2D9" },
    ink: { mark: "#1C1917", type: "#1C1917", rule: "#E7E2D9" },
    rose: { mark: "#E7D3C4", type: "#E7D3C4", rule: "rgba(250,246,240,0.24)" },
    paper: { mark: "#FAF6F0", type: "#FAF6F0", rule: "rgba(250,246,240,0.24)" }
};

export const Monogram = ({
    tone = "copper",
    className = "h-6 w-auto",
    ariaLabel = "Lorraine Souza",
    decorative = false
}) => (
    <svg
        viewBox="308 207 410 610"
        xmlns="http://www.w3.org/2000/svg"
        fill={(TONES[tone] || TONES.copper).mark}
        className={className}
        role={decorative ? "presentation" : "img"}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : ariaLabel}
    >
        <path d={MONOGRAM_L} />
        <path d={MONOGRAM_S} />
    </svg>
);

const Wordmark = ({ tone, nameSize, descriptorSize, align }) => {
    const { type } = TONES[tone] || TONES.copper;

    return (
        <span className={align === "center" ? "block text-center" : "block"}>
            <span
                className="block font-display leading-none tracking-lockup"
                style={{ fontSize: nameSize, color: type }}
            >
                LORRAINE SOUZA
            </span>
            <span
                className="mt-1.5 block font-sans font-medium leading-none tracking-label"
                style={{ fontSize: descriptorSize, color: type }}
            >
                DERMATOLOGIA
            </span>
        </span>
    );
};

/**
 * @param {"horizontal"|"vertical"|"monogram"} lockup
 * @param {"copper"|"ink"|"rose"|"paper"} tone
 */
export const Logo = ({
    lockup = "horizontal",
    tone = "copper",
    className = "",
    markClassName,
    ariaLabel = "Dra. Lorraine Souza, Dermatologia"
}) => {
    const { rule } = TONES[tone] || TONES.copper;

    if (lockup === "monogram") {
        return (
            <Monogram
                tone={tone}
                className={markClassName || "h-8 w-auto"}
                ariaLabel={ariaLabel}
            />
        );
    }

    if (lockup === "vertical") {
        return (
            <span
                className={`inline-flex flex-col items-center gap-5 ${className}`}
                role="img"
                aria-label={ariaLabel}
            >
                <Monogram
                    tone={tone}
                    className={markClassName || "h-14 w-auto"}
                    decorative
                />
                <Wordmark
                    tone={tone}
                    nameSize="19px"
                    descriptorSize="10px"
                    align="center"
                />
            </span>
        );
    }

    return (
        <span
            className={`inline-flex items-center gap-4 ${className}`}
            role="img"
            aria-label={ariaLabel}
        >
            <Monogram
                tone={tone}
                className={markClassName || "h-9 w-auto"}
                decorative
            />
            <span
                aria-hidden
                className="block h-8 w-px"
                style={{ background: rule }}
            />
            <Wordmark tone={tone} nameSize="17px" descriptorSize="10px" />
        </span>
    );
};
