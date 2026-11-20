import Link from "next/link";
import { Chevron } from "@components/Chevron";
import { consultationWhatsAppUrl } from "@utils/consultationContact";
import styles from "./Home.module.scss";

export const BOOKING_HREF = "/consulta/agendar";
export const WHATSAPP_HREF = consultationWhatsAppUrl(
    "Olá, Dra. Lorraine. Gostaria de agendar uma consulta."
);

export function BookingLink({ className = "", showChevron = true, onClick }) {
    return (
        <Link
            href={BOOKING_HREF}
            className={`${styles.button} ${className}`}
            onClick={onClick}
        >
            Agendar consulta
            {showChevron && <Chevron />}
        </Link>
    );
}

export function WhatsAppIcon() {
    return (
        <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
        >
            <path d="M4 5h16v11H9l-5 4z" />
        </svg>
    );
}
