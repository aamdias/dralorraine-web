import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";

export default function Document() {
    return (
        <Html lang="pt-BR" className="scroll-smooth">
            <Head />
            <body className="bg-paper text-ink font-sans antialiased">
                <Main />
                <NextScript />
                <Analytics />
            </body>
        </Html>
    );
}
