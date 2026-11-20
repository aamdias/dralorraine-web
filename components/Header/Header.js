import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@components/Logo";
import { Nav, NAV_ITEMS } from "@components/Nav";
import { BOOKING_HREF } from "@components/Layout/SiteActions";
import styles from "@components/Layout/Site.module.scss";

const wideLayout = "(min-width: 1080px)";
const homeLinks = { "/": "/#sobre", "/consulta": "/#consulta" };
const mainItems = NAV_ITEMS.map((item) =>
    item.href === "/" ? { ...item, href: homeLinks["/"] } : item
);
const homeItems = NAV_ITEMS.map((item) => ({
    ...item,
    href: homeLinks[item.href] ?? item.href
}));
const careerItems = [
    { name: "Currículo", href: "/curriculo", exact: true },
    { name: "Resultados", href: "/curriculo#resultados" },
    { name: "O serviço", href: "/curriculo#servico" },
    { name: "Guias", href: "/curriculo/blog" }
];

export function Header({
    home,
    careerPage,
    menuOpen,
    setMenuOpen,
    contentRef,
    introState
}) {
    const navItems = careerPage ? careerItems : home ? homeItems : mainItems;
    const ctaHref = careerPage ? "/curriculo#servico" : BOOKING_HREF;
    const ctaLabel = careerPage ? "Conhecer o serviço" : "Agendar consulta";
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const toggleRef = useRef(null);
    const menuRef = useRef(null);
    const closingLinkRef = useRef(null);

    useEffect(() => {
        let previousY = Math.max(0, window.scrollY);
        setScrolled(previousY > 40);

        const onScroll = () => {
            const y = Math.max(0, window.scrollY);
            setScrolled(y > 40);
            if (y <= 260 || y < previousY - 2) setHidden(false);
            else if (y > previousY + 2) setHidden(true);
            previousY = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const media = window.matchMedia(wideLayout);
        const onResize = () => {
            if (media.matches) setMenuOpen(false);
        };
        media.addEventListener("change", onResize);
        return () => media.removeEventListener("change", onResize);
    }, [setMenuOpen]);

    useEffect(() => {
        menuRef.current.inert = !menuOpen;
        if (!menuOpen) return;

        const content = contentRef.current;
        const toggle = toggleRef.current;
        const overflow = document.body.style.overflow;
        content.inert = true;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                return;
            }
            if (event.key !== "Tab") return;
            const links = menuRef.current.querySelectorAll("a[href]");
            if (event.shiftKey && document.activeElement === toggle) {
                event.preventDefault();
                links[links.length - 1].focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === links[links.length - 1]
            ) {
                event.preventDefault();
                toggle.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = overflow;
            content.inert = false;

            const link = closingLinkRef.current;
            closingLinkRef.current = null;
            if (link?.hash && link.pathname === window.location.pathname) {
                window.requestAnimationFrame(() => {
                    document
                        .getElementById(link.hash.slice(1))
                        ?.focus({ preventScroll: true });
                });
            } else if (!link && !window.matchMedia(wideLayout).matches) {
                toggle?.focus();
            }
        };
    }, [contentRef, menuOpen, setMenuOpen]);

    const onMenuLink = (event) => {
        closingLinkRef.current = event.currentTarget;
        setMenuOpen(false);
    };

    return (
        <>
            <header
                id="header"
                className={styles.header}
                data-scrolled={scrolled || menuOpen}
                data-hidden={hidden && !menuOpen}
                data-intro={introState}
            >
                <div className={styles.headerInner}>
                    <Link
                        href="/"
                        className={styles.homeLogo}
                        aria-label="Página inicial da Dra. Lorraine Souza"
                        tabIndex={menuOpen ? -1 : undefined}
                        onClick={menuOpen ? onMenuLink : undefined}
                    >
                        <span className={styles.fullLogo}>
                            <Logo markClassName="h-[38px] w-auto min-[1080px]:h-[30px]" />
                        </span>
                        <span className={styles.smallLogo}>
                            <Logo lockup="monogram" />
                        </span>
                    </Link>
                    <Nav items={navItems} className={styles.desktopNav} />
                    <Link
                        href={ctaHref}
                        className={`${styles.button} ${styles.headerBooking}`}
                    >
                        {ctaLabel}
                    </Link>
                    <button
                        ref={toggleRef}
                        type="button"
                        className={styles.menuToggle}
                        aria-controls="site-menu"
                        aria-expanded={menuOpen}
                        aria-label={
                            menuOpen
                                ? "Fechar menu principal"
                                : "Abrir menu principal"
                        }
                        onClick={() => {
                            setHidden(false);
                            setMenuOpen(!menuOpen);
                        }}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            <nav
                ref={menuRef}
                id="site-menu"
                aria-label="Navegação principal"
                aria-hidden={!menuOpen}
                className={styles.mobileMenu}
                data-open={menuOpen}
            >
                <ul>
                    {navItems.map(({ name, href }, index) => (
                        <li
                            key={name}
                            style={{ "--menu-delay": `${180 + index * 60}ms` }}
                        >
                            <Link href={href} onClick={onMenuLink}>
                                {name}
                                <span aria-hidden className={styles.index}>
                                    0{index + 1}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    href={ctaHref}
                    onClick={onMenuLink}
                    className={`${styles.button} ${styles.menuBooking}`}
                >
                    {ctaLabel}
                </Link>
            </nav>
        </>
    );
}
