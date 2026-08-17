/**

=========================================================
** Fonts — Manual de marca §03
=========================================================

Cormorant Garamond carrega os títulos (ecoa a serifa do monograma).
Inter carrega corpo e interface. Nada além dessas duas famílias.

Exposto como as CSS variables `--font-body` / `--font-display` em
pages/_app.js e consumido pelo Tailwind via `font-sans` / `font-display`.

Importante: next/font não funciona em pages/_document.js. As variáveis
precisam ser declaradas a partir do _app.js — foi o que quebrou na
primeira tentativa desta migração.

**/

import {
    Inter as createInter,
    Cormorant_Garamond as createCormorant
} from "next/font/google";

export const inter = createInter({
    weight: ["300", "400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-body"
});

export const cormorantGaramond = createCormorant({
    weight: ["300", "400", "500"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-display"
});
