import Link from "next/link";
import { useRouter } from "next/router";

export const NAV_ITEMS = [
    { name: "Sobre mim", href: "/" },
    { name: "Consulta", href: "/consulta" },
    { name: "Mentoria", href: "/mentoria" },
    { name: "Anotações", href: "/anotacoes" },
    { name: "Currículo", href: "/curriculo" }
];

export const useIsActive = () => {
    const router = useRouter();
    return (href) =>
        href === "/"
            ? router.pathname === "/"
            : router.pathname.startsWith(href);
};

/** Navegação horizontal — só a partir de lg. */
export const Nav = ({ isTransparent = false }) => {
    const isActive = useIsActive();

    return (
        <nav className="hidden lg:block" aria-label="Navegação principal">
            <ul className="flex items-center gap-7 list-none m-0 p-0 whitespace-nowrap">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={`inline-flex items-center text-[15px] transition-colors duration-300 ${
                                    isTransparent
                                        ? active
                                            ? "text-paper"
                                            : "text-paper/70 hover:text-paper"
                                        : active
                                        ? "text-ink"
                                        : "text-stone hover:text-copper-dark"
                                }`}
                            >
                                <span className="relative">
                                    {item.name}
                                    {active && (
                                        <span
                                            aria-hidden
                                            className="absolute -bottom-1.5 left-0 right-0 h-px bg-copper"
                                        />
                                    )}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

/**
 * Botão de menu — alvo de toque de 44px, escondido a partir de lg.
 * O ícone é SVG inline de propósito: é o controle primário de navegação no
 * mobile e não pode depender do fetch em runtime da API do Iconify.
 * Fios de 1px, como o resto do sistema (brandbook §04).
 */
export const NavToggle = ({ isOpen, onToggle, isTransparent = false }) => (
    <button
        type="button"
        onClick={onToggle}
        aria-controls="mobile-nav"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar menu principal" : "Abrir menu principal"}
        className={`lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 rounded-none transition-colors duration-300 ${
            isTransparent ? "text-paper" : "text-ink hover:text-copper-dark"
        }`}
    >
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
        >
            {isOpen ? (
                <>
                    <path d="M5 5 19 19" />
                    <path d="M19 5 5 19" />
                </>
            ) : (
                <>
                    <path d="M3 7h18" />
                    <path d="M3 12h18" />
                    <path d="M3 17h18" />
                </>
            )}
        </svg>
    </button>
);

/**
 * Painel mobile — papel sobre fio de 1px, cantos retos (brandbook §04).
 * Ancorado abaixo do header (o <header> é `relative`), com o CTA primário
 * no fim: no mobile ele não cabe na barra, mas não pode sumir do caminho.
 */
export const MobileNav = ({ isOpen, onNavigate }) => {
    const isActive = useIsActive();

    return (
        <div
            id="mobile-nav"
            hidden={!isOpen}
            className="lg:hidden absolute left-0 right-0 top-full bg-paper border-t border-b border-line shadow-none max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
            <nav aria-label="Navegação principal">
                <ul className="list-none m-0 p-0">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li
                                key={item.name}
                                className="border-b border-line last:border-b-0"
                            >
                                <Link
                                    href={item.href}
                                    onClick={onNavigate}
                                    aria-current={active ? "page" : undefined}
                                    className={`flex items-center px-4 sm:px-6 py-4 text-base transition-colors ${
                                        active
                                            ? "text-copper-dark"
                                            : "text-ink hover:text-copper-dark"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="px-4 sm:px-6 py-5 border-t border-line">
                <Link
                    href="/consulta"
                    role="button"
                    onClick={onNavigate}
                    className="flex items-center justify-center w-full px-6 py-4 bg-ink text-paper text-[15px] font-medium rounded-none transition-colors duration-300 hover:bg-copper-dark"
                >
                    Agendar consulta
                </Link>
            </div>
        </div>
    );
};
