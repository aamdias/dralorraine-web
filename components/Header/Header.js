import Link from "next/link";
import Image from "next/image";
import { SectionContainer } from "@components/Section";
import { Nav } from "@components/Nav";
import { ButtonGroup, Button } from "@components/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const Header = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Pages with dark hero backgrounds
    const darkHeroPages = ['/mentoria'];
    const hasDarkHero = darkHeroPages.includes(router.pathname);

    useEffect(() => {
        const handleScroll = () => {
            // Consider scrolled after 100px
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine header style based on page and scroll position
    const isTransparent = hasDarkHero && !isScrolled;

    return (
        <header
            id="header"
            className={`header fixed py-2 left-0 w-full z-30 top-0 transition-all duration-300 ${
                isTransparent 
                    ? 'bg-transparent header--transparent' 
                    : 'bg-white backdrop-filter backdrop-blur-md bg-opacity-50'
            }`}
        >
            <SectionContainer className="header--container wrap wrap-px">
                <div className="header-logo--container">
                    <h1 className="logo mb-0">
                        <Link href="/">
                            <Image
                                src="/newlogo-dralorraine-web.svg"
                                alt="logo"
                                className="h-6 w-auto"
                                height="48"
                                width="100"
                                priority
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
