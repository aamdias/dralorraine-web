import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export const NAV_ITEMS = [
    { name: "Sobre mim", href: "/" },
    { name: "Consulta", href: "/consulta" },
    {
        name: "Tratamentos",
        href: "/tratamentos",
        children: [
            { name: "Visão geral", href: "/tratamentos" },
            { name: "Botox · toxina botulínica", href: "/tratamentos/toxina-botulinica" },
            { name: "Bioestimulador de colágeno", href: "/tratamentos/bioestimulador-de-colageno" },
            { name: "Preenchimento com ácido hialurônico", href: "/tratamentos/preenchimento-com-acido-hialuronico" },
            { name: "Peelings", href: "/tratamentos/peelings" },
            { name: "Microagulhamento", href: "/tratamentos/microagulhamento" }
        ]
    },
    { name: "Blog", href: "/blog" },
    {
        name: "Para médicos",
        href: "/para-medicos",
        children: [
            { name: "Visão geral", href: "/para-medicos" },
            { name: "Mentoria", href: "/mentoria" },
            { name: "Anotações", href: "/anotacoes" },
            { name: "Currículo", href: "/curriculo" },
            { name: "Paciente Zero", href: "https://pacientezero.com.br", external: true }
        ]
    }
];

export const useIsActive = () => {
    const router = useRouter();
    return (href) => href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);
};

const ChevronDown = ({ className = "" }) => (
    <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`h-3.5 w-3.5 transition-transform duration-200 ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
    >
        <path d="m3 6 5 5 5-5" />
    </svg>
);

const navItemClass = (active, isTransparent) => `relative inline-flex h-11 items-center text-[15px] transition-colors duration-200 ${
    isTransparent
        ? active ? "text-paper" : "text-paper/70 hover:text-paper"
        : active ? "text-ink" : "text-stone hover:text-copper-dark"
}`;

/** Navegação desktop com dropdowns controlados e fechamento previsível. */
export const Nav = ({ isTransparent = false }) => {
    const router = useRouter();
    const isActive = useIsActive();
    const navRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(null);

    useEffect(() => {
        setOpenMenu(null);
    }, [router.asPath]);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setOpenMenu(null);
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        window.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    return (
        <nav ref={navRef} className="hidden lg:block" aria-label="Navegação principal">
            <ul className="flex items-center gap-5 list-none m-0 p-0 whitespace-nowrap">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);

                    if (!item.children) {
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    aria-current={active ? "page" : undefined}
                                    className={navItemClass(active, isTransparent)}
                                >
                                    {item.name}
                                    {active && <span aria-hidden className="absolute bottom-0.5 left-0 right-0 h-px bg-copper" />}
                                </Link>
                            </li>
                        );
                    }

                    const isOpen = openMenu === item.name;
                    return (
                        <li key={item.name} className="relative">
                            <button
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={isOpen}
                                aria-controls={`desktop-menu-${item.name.replace(/\s/g, "-").toLowerCase()}`}
                                onClick={() => setOpenMenu(isOpen ? null : item.name)}
                                className={`${navItemClass(active, isTransparent)} gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-paper`}
                            >
                                {item.name}
                                <ChevronDown className={isOpen ? "rotate-180" : ""} />
                                {active && <span aria-hidden className="absolute bottom-0.5 left-0 right-0 h-px bg-copper" />}
                            </button>

                            {isOpen && (
                                <div
                                    id={`desktop-menu-${item.name.replace(/\s/g, "-").toLowerCase()}`}
                                    className="absolute right-0 top-full z-50 pt-3"
                                >
                                    <ul role="menu" className="w-[20rem] border border-line border-t-copper bg-paper p-2 shadow-[0_22px_55px_-32px_rgba(44,38,34,0.48)]">
                                        {item.children.map((child, index) => {
                                            const childActive = isActive(child.href);
                                            return (
                                                <li key={child.href} role="none" className={index === 1 ? "mt-1 border-t border-line pt-1" : ""}>
                                                    <Link
                                                        href={child.href}
                                                        target={child.external ? "_blank" : undefined}
                                                        rel={child.external ? "noopener noreferrer" : undefined}
                                                        role="menuitem"
                                                        onClick={() => setOpenMenu(null)}
                                                        className={`flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors ${
                                                            childActive ? "bg-sand text-copper-dark" : "text-ink hover:bg-sand hover:text-copper-dark"
                                                        }`}
                                                    >
                                                        <span>{child.name}</span>
                                                        {index === 0 && <span className="text-[10px] uppercase tracking-label text-stone">Todos</span>}
                                                        {child.external && <span aria-label="Abre em nova aba">↗</span>}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export const NavToggle = ({ isOpen, onToggle, isTransparent = false }) => (
    <button
        type="button"
        onClick={onToggle}
        aria-controls="mobile-nav"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar menu principal" : "Abrir menu principal"}
        className={`lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-copper ${
            isTransparent ? "text-paper" : "text-ink hover:text-copper-dark"
        }`}
    >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square">
            {isOpen ? <><path d="M5 5 19 19" /><path d="M19 5 5 19" /></> : <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></>}
        </svg>
    </button>
);

/** Painel mobile: só existe quando aberto e ocupa o viewport abaixo do header. */
export const MobileNav = ({ isOpen, onNavigate }) => {
    const isActive = useIsActive();

    if (!isOpen) return null;

    return (
        <div
            id="mobile-nav"
            className="lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] min-h-0 bg-paper border-t border-line flex flex-col overflow-hidden"
        >
            <nav aria-label="Navegação principal" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <ul className="list-none m-0 p-0">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.href);

                        if (!item.children) {
                            return (
                                <li key={item.name} className="border-b border-line">
                                    <Link
                                        href={item.href}
                                        onClick={onNavigate}
                                        aria-current={active ? "page" : undefined}
                                        className={`flex min-h-[3.75rem] items-center px-5 sm:px-7 text-[17px] transition-colors ${
                                            active ? "text-copper-dark" : "text-ink hover:text-copper-dark"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        }

                        return (
                            <li key={item.name} className="border-b border-line">
                                <details defaultOpen={active} className="group">
                                    <summary className={`flex min-h-[3.75rem] cursor-pointer list-none items-center justify-between px-5 sm:px-7 text-[17px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-copper [&::-webkit-details-marker]:hidden ${
                                        active ? "text-copper-dark" : "text-ink"
                                    }`}>
                                        <span>{item.name}</span>
                                        <ChevronDown className="group-open:rotate-180" />
                                    </summary>
                                    <ul className="border-t border-line bg-sand/55 py-2">
                                        {item.children.map((child) => {
                                            const childActive = isActive(child.href);
                                            return (
                                                <li key={child.href} className="border-b border-line last:border-b-0">
                                                    <Link
                                                        href={child.href}
                                                        target={child.external ? "_blank" : undefined}
                                                        rel={child.external ? "noopener noreferrer" : undefined}
                                                        onClick={onNavigate}
                                                        aria-current={childActive ? "page" : undefined}
                                                        className={`flex min-h-[3.25rem] items-center px-8 py-3 sm:px-10 text-[15px] leading-6 transition-colors ${
                                                            childActive ? "font-medium text-copper-dark" : "text-stone hover:text-copper-dark"
                                                        }`}
                                                    >
                                                        {child.name}
                                                        {child.external && <span className="ml-2" aria-label="Abre em nova aba">↗</span>}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </details>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="shrink-0 border-t border-line bg-paper px-5 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-7">
                <Link
                    href="/consulta/agendar"
                    role="button"
                    onClick={onNavigate}
                    className="flex min-h-[3.5rem] w-full items-center justify-center bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:bg-copper-dark"
                >
                    Agendar consulta
                </Link>
            </div>
        </div>
    );
};
