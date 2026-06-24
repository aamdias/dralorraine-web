import Link from "next/link";
import { SectionContainer } from "@components/Section";
import { Nav } from "@components/Nav";
import { Logo } from "@components/Logo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const Header = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);

    // Pages with intentionally dark/alt hero backgrounds
    const darkHeroPages = [];
    const hasDarkHero = darkHeroPages.includes(router.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isTransparent = hasDarkHero && !isScrolled;

    return (
        <header
            id="header"
            className={`header fixed py-3 left-0 w-full z-30 top-0 transition-all duration-300 ${
                isTransparent
                    ? "bg-transparent header--transparent"
                    : isScrolled
                    ? "bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E7E2D9]"
                    : "bg-[#FAF6F0] border-b border-transparent"
            }`}
        >
            <SectionContainer className="header--container max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="header-logo--container">
                    <h1 className="logo mb-0">
                        <Link
                            href="/"
                            aria-label="Ir para a página inicial"
                            className="inline-flex items-center"
                        >
                            <Logo
                                variant={isTransparent ? "light" : "dark"}
                                className="h-6 w-auto"
                            />
                        </Link>
                    </h1>
                </div>
                <SectionContainer className="flex items-center ml-auto">
                    <Nav isTransparent={isTransparent} />
                </SectionContainer>
            </SectionContainer>
        </header>
    );
};
