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
    return (href, exact = false) =>
        exact || href === "/"
            ? router.pathname === href
            : router.pathname.startsWith(href);
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

const ExternalLinkIndicator = () => (
    <span className="inline-flex shrink-0">
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
        >
            <path d="M10 4H4v16h16v-6" />
            <path d="M14 4h6v6M20 4l-9 9" />
        </svg>
        <span className="sr-only"> (abre em nova aba)</span>
    </span>
);

const navItemClass = (active, isTransparent) => `relative inline-flex h-11 items-center text-[15px] transition-colors duration-200 ${
    isTransparent
        ? active ? "text-paper" : "text-paper/70 hover:text-paper"
        : active ? "text-ink" : "text-stone hover:text-copper-dark"
}`;

/** Navegação desktop com dropdowns controlados e fechamento previsível. */
export const Nav = ({
    isTransparent = false,
    items = NAV_ITEMS,
    className = "hidden lg:block"
}) => {
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
        <nav ref={navRef} className={className} aria-label="Navegação principal">
            <ul className="flex items-center gap-5 list-none m-0 p-0 whitespace-nowrap">
                {items.map((item) => {
                    const active = isActive(item.href, item.exact);

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
                                                        {child.external && <ExternalLinkIndicator />}
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
