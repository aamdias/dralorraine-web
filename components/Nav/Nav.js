import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const navigation = [
    { name: "Sobre mim", href: "/" },
    { name: "Consulta", href: "/consulta" },
    { name: "Mentoria", href: "/mentoria" },
    { name: "Anotações", href: "/anotacoes" },
    { name: "Notion", href: "/notion" },
    { name: "Currículo", href: "/curriculo" }
];

export const Nav = ({ isTransparent = false }) => {
    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeNav = () => setIsNavOpen(false);

    const isActive = (href) => {
        if (href === "/") return router.pathname === "/";
        return router.pathname.startsWith(href);
    };

    return (
        <nav className="header-nav">
            <div className="header-nav--container">
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="mobile-menu"
                    aria-controls="navbar-dropdown"
                    aria-expanded={isNavOpen}
                >
                    <span className="sr-only">Abrir menu principal</span>
                    <Icon
                        icon="material-symbols:menu-rounded"
                        className={`h-6 w-auto transition-colors duration-300 ${
                            isTransparent ? "text-[#FAF6F0]" : "text-[#1C1917]"
                        }`}
                    />
                </button>
                <div
                    className={`header-nav--menu-container z-20 ${
                        isNavOpen ? "show" : "hide"
                    }`}
                    id="navbar-default"
                >
                    <ul
                        className={`header-nav--menu ${
                            isTransparent ? "nav-transparent" : ""
                        }`}
                    >
                        {navigation.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <li
                                    key={item.name}
                                    className="header-nav--menu-item"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={closeNav}
                                        className={`menu-item--link inline-flex items-center text-[15px] font-normal transition-colors duration-300 ${
                                            isTransparent
                                                ? active
                                                    ? "text-[#FAF6F0]"
                                                    : "text-[#FAF6F0]/70 hover:text-[#FAF6F0]"
                                                : active
                                                ? "text-[#1C1917]"
                                                : "text-[#57534E] hover:text-[#1C1917]"
                                        }`}
                                    >
                                        <span className="relative">
                                            {item.name}
                                            {active && (
                                                <span
                                                    aria-hidden
                                                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#9A4639]"
                                                />
                                            )}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
