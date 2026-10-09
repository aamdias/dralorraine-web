import Link from "next/link";
import { SectionContainer } from "@components/Section";
import { Nav, NavToggle, MobileNav } from "@components/Nav";
import { Logo } from "@components/Logo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const CAREER_NAV_ITEMS = [
    { name: "Currículo", href: "/curriculo" },
    { name: "Resultados", href: "/curriculo#resultados" },
    { name: "O serviço", href: "/curriculo#servico" }
];

/**
 * Header — brandbook §04.
 * Lockup horizontal + fio divisor + navegação + CTA.
 * O CTA "Agendar" mora no header: é a ação primária da marca. Abaixo de lg
 * ele desce para dentro do painel mobile, nunca some.
 */
export const Header = ({ careerPage = false }) => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const ctaHref = careerPage ? "/curriculo#servico" : "/consulta/agendar";
    const ctaLabel = careerPage ? "Conhecer o serviço" : "Agendar";

    // Pages with intentionally dark/alt hero backgrounds
    const darkHeroPages = [];
    const hasDarkHero = darkHeroPages.includes(router.pathname);

    // Páginas cuja primeira dobra já traz o campo de fundo da marca: no topo
    // o header não pinta fundo nenhum e a dobra sobe atrás dele. A marca
    // continua em cobre porque o campo é claro.
    const softHeroPages = ["/"];
    const hasSoftHero = softHeroPages.includes(router.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fecha o painel ao navegar (inclui âncoras na mesma página).
    useEffect(() => {
        const close = () => setIsNavOpen(false);
        router.events.on("routeChangeComplete", close);
        router.events.on("hashChangeComplete", close);
        return () => {
            router.events.off("routeChangeComplete", close);
            router.events.off("hashChangeComplete", close);
        };
    }, [router.events]);

    // Esc fecha o painel.
    useEffect(() => {
        if (!isNavOpen) return undefined;
        const onKeyDown = (event) => {
            if (event.key === "Escape") setIsNavOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isNavOpen]);

    // Enquanto o menu mobile ocupa o viewport, só a lista interna deve rolar.
    useEffect(() => {
        if (!isNavOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isNavOpen]);

    // O painel aberto sempre usa o fundo sólido, mesmo em hero escuro.
    const isTransparent = hasDarkHero && !isScrolled && !isNavOpen;
    const isFloating = hasSoftHero && !isScrolled && !isNavOpen;

    return (
        <header
            id="header"
            className={`header fixed py-3 left-0 w-full z-30 top-0 transition-all duration-300 ${
                isTransparent
                    ? "bg-transparent header--transparent"
                    : isFloating
                    ? "bg-transparent header--floating"
                    : isScrolled || isNavOpen
                    ? "bg-paper/95 backdrop-blur-md border-b border-line"
                    : "bg-paper border-b border-transparent"
            }`}
        >
            <SectionContainer className="header--container max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="header-logo--container">
                    <Link
                        href={careerPage ? "/curriculo" : "/"}
                        aria-label={careerPage ? "Ir para o início da página de currículo" : "Ir para a página inicial"}
                        className="inline-flex items-center"
                    >
                        {/* Lockup completo a partir de sm; abaixo disso o
                            monograma isolado, que é legível a 24px. */}
                        <span className="hidden sm:block">
                            <Logo
                                lockup="horizontal"
                                tone={isTransparent ? "rose" : "copper"}
                                markClassName="h-[38px] w-auto"
                            />
                        </span>
                        <span className="block sm:hidden">
                            <Logo
                                lockup="monogram"
                                tone={isTransparent ? "rose" : "copper"}
                                markClassName="h-8 w-auto"
                            />
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-3 lg:gap-6 ml-auto">
                    <Nav isTransparent={isTransparent} items={careerPage ? CAREER_NAV_ITEMS : undefined} />
                    <Link
                        href={ctaHref}
                        role="button"
                        className={`hidden lg:inline-flex items-center px-6 py-3 text-sm font-medium rounded-none transition-colors duration-300 ${
                            isTransparent
                                ? "bg-paper text-ink hover:bg-rose"
                                : "bg-ink text-paper hover:bg-copper-dark"
                        }`}
                    >
                        {ctaLabel}
                    </Link>
                    <NavToggle
                        isOpen={isNavOpen}
                        isTransparent={isTransparent}
                        onToggle={() => setIsNavOpen((open) => !open)}
                    />
                </div>
            </SectionContainer>

            <MobileNav
                isOpen={isNavOpen}
                onNavigate={() => setIsNavOpen(false)}
                items={careerPage ? CAREER_NAV_ITEMS : undefined}
                ctaHref={ctaHref}
                ctaLabel={careerPage ? ctaLabel : "Agendar consulta"}
            />
        </header>
    );
};
