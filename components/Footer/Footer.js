import Link from "next/link";
import { SectionContainer } from "@components/Section";
import { Logo } from "@components/Logo";

const NAV_COLUMNS = [
    {
        title: "Serviços",
        items: [
            { label: "Consulta", href: "/consulta" },
            { label: "Blog", href: "/blog" },
            { label: "Mentoria", href: "/mentoria" },
            { label: "Anotações", href: "/anotacoes" },
            { label: "Currículo", href: "/curriculo" }
        ]
    },
    {
        title: "Sobre",
        items: [
            { label: "Sobre mim", href: "/#personal-history" },
            { label: "Aprovações", href: "/#results" }
        ]
    },
    {
        title: "Legal",
        items: [
            { label: "Política de Privacidade", href: "/politica-de-privacidade" },
            { label: "Termos de Uso", href: "/termos-de-uso" },
            {
                label: "Consentimento · Telemedicina",
                href: "/consentimento-telemedicina"
            }
        ]
    }
];

/**
 * Footer — assinatura da marca sobre Papel (brandbook §02, §04).
 * O bloco escuro do site é o CTA final; o rodapé volta ao papel para
 * fechar a página no mesmo tom em que ela começa.
 */
export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer
            id="footer"
            className="bg-paper text-ink"
        >
            <SectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12">
                    {/* Identity */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            aria-label="Ir para a página inicial"
                            className="inline-block"
                        >
                            <Logo
                                lockup="horizontal"
                                tone="copper"
                                markClassName="h-[52px] w-auto"
                            />
                        </Link>
                        <p className="text-stone text-base leading-relaxed max-w-sm mt-7">
                            Dra. Lorraine Souza
                            <br />
                            <span className="text-stone text-sm">
                                Dermatologia · R3 em Dermatologia na UNICAMP
                            </span>
                        </p>
                        <p className="text-stone text-xs leading-relaxed mt-7 max-w-sm">
                            Conteúdo educativo e atendimento clínico. Este site
                            não substitui avaliação médica presencial quando
                            indicada.
                        </p>
                    </div>

                    {/* Nav columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {NAV_COLUMNS.map((col) => (
                            <div key={col.title}>
                                <h3 className="font-sans text-xs uppercase tracking-label text-copper-dark font-medium mb-5">
                                    {col.title}
                                </h3>
                                <ul className="space-y-3">
                                    {col.items.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                className="text-slate hover:text-copper-dark text-sm transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-line py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone">
                    <span>
                        © {year} Dra. Lorraine Souza. Todos os direitos
                        reservados.
                    </span>
                    <span className="tracking-label uppercase">
                        Dermatologia · Mentoria · Conteúdo
                    </span>
                </div>
            </SectionContainer>
        </footer>
    );
};
