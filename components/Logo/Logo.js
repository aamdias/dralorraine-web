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

const MONOGRAM_L =
    "M 312.80 212.28 A 0.38 0.37 -0.0 0 1 313.18 211.91 L 419.35 211.91 A 0.61 0.60 0.0 0 1 419.96 212.51 L 419.96 215.86 A 0.81 0.81 0.0 0 1 419.16 216.67 C 412.02 216.78 405.02 218.35 399.59 222.74 C 391.31 229.45 390.61 242.67 390.60 252.25 Q 390.53 305.46 390.59 665.96 A 0.41 0.41 0.0 0 0 391.00 666.37 Q 440.72 666.39 490.75 666.31 C 509.29 666.28 529.55 664.11 547.58 657.84 C 565.30 651.67 579.33 640.41 588.44 624.00 A 0.84 0.84 0.0 0 1 589.39 623.60 L 592.34 624.43 A 0.76 0.76 0.0 0 1 592.86 625.37 L 577.79 678.93 A 1.18 1.17 7.8 0 1 576.66 679.78 L 312.74 679.78 A 0.63 0.63 0.0 0 1 312.11 679.15 L 312.11 676.02 A 0.62 0.61 -3.7 0 1 312.65 675.41 C 316.95 674.84 321.19 674.50 324.78 673.30 Q 338.94 668.53 341.44 652.99 Q 342.79 644.54 342.80 636.03 Q 342.84 494.82 342.68 264.77 Q 342.67 250.96 342.15 243.52 Q 341.81 238.58 340.13 232.84 C 336.45 220.23 325.07 216.94 313.26 216.41 A 0.48 0.48 0.0 0 1 312.80 215.93 L 312.80 212.28 Z";

const MONOGRAM_S =
    "M 685.60 460.92 C 666.16 436.98 643.12 415.96 613.46 406.63 C 580.89 396.39 539.54 398.10 512.68 421.95 C 498.09 434.90 491.68 452.03 494.92 471.15 Q 497.37 485.70 507.75 497.19 C 521.23 512.09 538.49 522.24 556.22 532.02 C 572.55 541.02 590.60 550.30 609.62 559.66 Q 629.86 569.62 649.19 581.29 Q 667.52 592.35 682.83 607.91 Q 706.26 631.74 712.06 663.49 Q 717.93 695.58 707.78 725.81 C 693.28 768.99 652.91 796.89 610.11 806.85 Q 566.89 816.90 523.62 809.61 Q 501.74 805.93 478.92 796.56 Q 441.15 781.06 410.82 753.34 A 0.72 0.72 0.0 0 1 410.72 752.39 L 423.58 734.28 A 0.76 0.75 42.5 0 1 424.77 734.23 C 454.62 769.75 496.24 793.39 542.50 798.95 Q 576.41 803.03 607.65 792.40 C 619.26 788.45 631.84 780.96 641.20 772.30 Q 663.11 752.05 667.82 722.85 Q 670.92 703.63 666.50 685.74 C 655.86 642.69 614.71 620.65 579.26 601.50 Q 575.07 599.24 534.06 577.95 Q 508.26 564.55 487.20 548.07 Q 475.46 538.87 466.95 526.03 C 456.50 510.25 453.16 491.93 455.27 473.49 C 457.80 451.36 470.36 430.89 487.28 416.76 C 509.39 398.29 538.95 389.49 567.43 388.17 Q 620.24 385.71 666.72 413.07 Q 684.40 423.48 700.48 437.03 A 0.80 0.79 -54.9 0 1 700.65 438.05 L 686.83 460.84 A 0.76 0.75 -48.7 0 1 685.60 460.92 Z";

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
