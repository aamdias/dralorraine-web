import { useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { WhatsAppIcon, WHATSAPP_HREF } from "./SiteActions";
import styles from "./Site.module.scss";

export function Layout({
    children,
    className = "",
    home = false,
    careerPage = false,
    showWhatsApp = !careerPage,
    introState = "ready",
    mainRef
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <div className={styles.site}>
            <Header
                home={home}
                careerPage={careerPage}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                contentRef={contentRef}
                introState={introState}
            />
            <div ref={contentRef}>
                <main className={`main relative ${className}`} ref={mainRef}>
                    {children}
                </main>
                <Footer careerPage={careerPage} showWhatsApp={showWhatsApp} />
                {showWhatsApp && (
                    <a
                        className={styles.floatingWhatsApp}
                        data-intro={introState}
                        data-menu={menuOpen}
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Falar com a Dra. Lorraine no WhatsApp"
                    >
                        <WhatsAppIcon /> WhatsApp
                    </a>
                )}
            </div>
            <Analytics />
        </div>
    );
}
