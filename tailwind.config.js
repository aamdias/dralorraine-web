/** @type {import('tailwindcss').Config} */

/**
 * Design tokens — Manual de marca Lorraine Souza v1.0 (2026).
 * See docs/brandbook.md before adding or changing anything here.
 *
 * Rule of thumb: components consume the semantic names below
 * (paper / sand / line / rose / copper / stone / slate / ink),
 * never raw hex.
 */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./utils/**/*.{js,jsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                // As variáveis vêm de next/font (utils/fonts.js + _app.js).
                // O fallback dentro do var() é obrigatório: sem ele, uma
                // variável ausente invalida a declaração inteira e a página
                // cai no serif padrão do navegador.
                //
                // Cormorant Garamond — títulos, números grandes, citações.
                display: [
                    "var(--font-display, 'Cormorant Garamond')",
                    "serif"
                ],
                // Inter — corpo, labels, botões, formulários, tabelas.
                sans: ["var(--font-body, Inter)", "sans-serif"],
                body: ["var(--font-body, Inter)", "sans-serif"],
                title: ["var(--font-display, 'Cormorant Garamond')", "serif"]
            },
            fontSize: {
                // Escala display (Cormorant) — brandbook §03
                "display-xl": [
                    "5rem",
                    { lineHeight: "5.125rem", letterSpacing: "-0.02em" }
                ],
                "display-l": [
                    "3.5rem",
                    { lineHeight: "3.6875rem", letterSpacing: "-0.015em" }
                ],
                "display-m": [
                    "2.5rem",
                    { lineHeight: "2.75rem", letterSpacing: "-0.01em" }
                ],
                "display-s": ["1.75rem", { lineHeight: "2.125rem" }],
                // Escala de interface (Inter)
                lead: ["1.125rem", { lineHeight: "1.875rem" }],
                body: ["1rem", { lineHeight: "1.625rem" }],
                label: [
                    "0.75rem",
                    { lineHeight: "1rem", letterSpacing: "0.24em" }
                ],
                // Legado — mantido para páginas ainda não migradas
                h1: ["3.5rem", { lineHeight: "3.75rem" }],
                h2: ["2.25rem", { lineHeight: "2.625rem" }],
                h3: ["1.875rem", { lineHeight: "2.25rem" }],
                h4: ["1.5rem", { lineHeight: "2rem" }],
                h5: ["1.25rem", { lineHeight: "1.75rem" }],
                h6: ["1.125rem", { lineHeight: "1.5rem" }],
                mini: ["0.75rem", { lineHeight: "1.5rem" }]
            },
            letterSpacing: {
                label: "0.24em",
                index: "0.15em",
                lockup: "0.12em"
            },
            borderRadius: {
                // Raio zero é assinatura da marca. `rounded` == `rounded-none`.
                DEFAULT: "0px"
            },
            colors: {
                // ---- Paleta da marca (brandbook §02) ----
                paper: "#FAF6F0", // fundo padrão
                sand: "#F1ECE4", // seções alternadas, cards
                line: "#E7E2D9", // fios de 1px, divisores
                rose: "#E7D3C4", // marca em fundo escuro, tarjas
                copper: {
                    DEFAULT: "#B48967", // fios, números, ícones — nunca texto pequeno
                    dark: "#8C6248" // links, eyebrows, ênfase em texto
                },
                stone: "#57534E", // texto secundário, labels
                slate: "#3C3833", // corpo em seção Areia
                ink: "#1C1917", // títulos, botão primário, superfície escura

                // ---- Legado (depreciado) ----
                // Ainda referenciado por styles/core/components/*.scss e por
                // páginas não migradas. Não usar em código novo.
                black: {
                    DEFAULT: "#000000",
                    50: "#E6E6E6",
                    100: "#CCCCCC",
                    200: "#999999",
                    300: "#666666",
                    400: "#333333",
                    500: "#000000"
                },
                white: {
                    DEFAULT: "#FFFFFF",
                    50: "#FFFFFF",
                    100: "#FCFCFC",
                    300: "#FAFAFA",
                    500: "#F7F7F7",
                    600: "#C7C7C7",
                    700: "#949494",
                    800: "#636363",
                    900: "#303030"
                },
                primary: {
                    500: "#FAFAFA",
                    600: "#E3E3E3",
                    700: "#C7C7C7",
                    800: "#A6A6A6",
                    900: "#787878"
                },
                secondary: {
                    500: "#9FD8CB",
                    600: "#FFA929",
                    700: "#EB8D00"
                },
                badge: "#F1F5F9",
                badgeText: "#475569"
            }
        }
    },
    plugins: []
};
