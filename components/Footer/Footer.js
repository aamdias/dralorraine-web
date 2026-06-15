import Link from "next/link";
import { SectionContainer } from "@components/Section";
import { Logo } from "@components/Logo";

const NAV_COLUMNS = [
    {
        title: "Serviços",
        items: [
            { label: "Consulta", href: "/consulta" },
            { label: "Mentoria", href: "/mentoria" },
            { label: "Anotações", href: "/anotacoes" },
            { label: "Notion", href: "/notion" },
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

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer
            id="footer"
            className="bg-[#1C1917] text-[#FAF6F0] border-t border-[#2A2724]"
        >
            <SectionContainer className="wrap wrap-px">
                <div className="py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* Identity */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            aria-label="Ir para a página inicial"
                            className="inline-block"
                        >
                            <Logo variant="light" className="h-7 w-auto" />
                        </Link>
                        <p className="text-[#FAF6F0]/70 text-base leading-relaxed max-w-sm mt-6">
                            Dra. Lorraine Souza
                            <br />
                            <span className="text-[#FAF6F0]/50 text-sm">
                                Cosmeatria · R3 em Dermatologia na UNICAMP
                            </span>
                        </p>
                        <p className="text-[#FAF6F0]/40 text-xs leading-relaxed mt-8 max-w-sm">
                            Conteúdo educativo e atendimento clínico. Este site
                            não substitui avaliação médica presencial quando
                            indicada.
                        </p>
                    </div>

                    {/* Nav columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {NAV_COLUMNS.map((col) => (
                            <div key={col.title}>
                                <h3 className="text-xs uppercase tracking-[0.24em] text-[#FAF6F0]/50 font-medium mb-5">
                                    {col.title}
                                </h3>
                                <ul className="space-y-3">
                                    {col.items.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                className="text-[#FAF6F0]/80 hover:text-[#FAF6F0] text-sm transition-colors"
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

                <div className="border-t border-[#FAF6F0]/10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#FAF6F0]/40">
                    <span>© {year} Dra. Lorraine Souza. Todos os direitos reservados.</span>
                    <span className="tracking-[0.24em] uppercase">
                        Cosmeatria · Mentoria · Conteúdo
                    </span>
                </div>
            </SectionContainer>
        </footer>
    );
};
