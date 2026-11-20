import Link from "next/link";
import { Logo } from "@components/Logo";
import { SITE } from "@utils/site";
import siteStyles from "@components/Layout/Site.module.scss";
import styles from "./Booking.module.scss";

export function BookingLayout({ children }) {
    return (
        <div className={`${siteStyles.site} ${styles.shell}`}>
            <header className={styles.masthead}>
                <div className={`${styles.container} ${styles.mastheadInner}`}>
                    <Link
                        href="/"
                        aria-label="Página inicial da Dra. Lorraine Souza"
                    >
                        <span className={styles.fullLogo}>
                            <Logo markClassName="h-8 w-auto" />
                        </span>
                        <span className={styles.smallLogo}>
                            <Logo lockup="monogram" />
                        </span>
                    </Link>
                    <Link href="/consulta" className={styles.mastheadLink}>
                        Sobre a consulta
                    </Link>
                </div>
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
                <div className={`${styles.container} ${styles.footerInner}`}>
                    <p>
                        Dra. Lorraine Souza <span aria-hidden>·</span> CRM-SP
                        218676
                    </p>
                    <nav aria-label="Links do agendamento">
                        <Link href="/politica-de-privacidade">Privacidade</Link>
                        <Link href="/termos-de-uso">Termos de uso</Link>
                        <a href={`mailto:${SITE.email}`}>Contato</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
