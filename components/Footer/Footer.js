import Link from "next/link";
import { Logo } from "@components/Logo";
import { NAV_ITEMS } from "@components/Nav";
import styles from "@components/Layout/Site.module.scss";

const treatments = NAV_ITEMS.find(
    ({ href }) => href === "/tratamentos"
).children;
const footerGroups = [
    {
        label: "Pacientes",
        links: [
            ["Consulta", "/consulta"],
            ["Tratamentos", "/tratamentos"],
            ["Blog", "/blog"]
        ]
    },
    {
        label: "Tratamentos",
        links: treatments.slice(1).map(({ name, href }) => [
            {
                "/tratamentos/toxina-botulinica": "Toxina botulínica",
                "/tratamentos/preenchimento-com-acido-hialuronico":
                    "Preenchimento facial"
            }[href] ?? name,
            href
        ])
    },
    {
        label: "Para médicos",
        links: [
            ["Mentoria", "/mentoria"],
            ["Anotações", "/anotacoes"],
            ["Currículo", "/curriculo"],
            ["Guias de currículo", "/curriculo/blog"]
        ]
    },
    {
        label: "Legal",
        links: [
            ["Política de Privacidade", "/politica-de-privacidade"],
            ["Termos de Uso", "/termos-de-uso"],
            ["Consentimento · Telemedicina", "/consentimento-telemedicina"]
        ]
    }
];

const creditHref = `https://wa.me/5585994319716?text=${encodeURIComponent(
    "Olá, vi o site da Dra. Lorraine e quero um site assim."
)}`;

const careerGroup = {
    label: "Currículo para residência",
    links: [
        ["Resultados", "/curriculo#resultados"],
        ["Conheça o serviço", "/curriculo#servico"],
        ["Guias de currículo", "/curriculo/blog"]
    ]
};

export function Footer({ careerPage, showWhatsApp }) {
    const groups = careerPage ? [careerGroup, footerGroups[3]] : footerGroups;
    return (
        <footer id="footer" className={styles.footer}>
            <div className={`${styles.container} ${styles.footerColumns}`}>
                <div>
                    <Link href="/">
                        <Logo markClassName="h-[52px] w-auto" />
                    </Link>
                    <p className={styles.footerNotice}>
                        Conteúdo educativo e atendimento clínico. Este site não
                        substitui avaliação médica presencial quando indicada.
                    </p>
                    <p className={styles.registration}>CRM-SP 218676</p>
                </div>
                <nav
                    className={styles.footerLinks}
                    aria-label="Links do rodapé"
                >
                    {groups.map(({ label, links }) => (
                        <div key={label}>
                            <h2>{label}</h2>
                            <ul>
                                {links.map(([name, href]) => (
                                    <li key={href}>
                                        <Link href={href}>{name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
            <div aria-hidden="true" className={styles.footerWordmark}>
                Lorraine <em>Souza</em>
            </div>
            <div className={styles.footerBar} data-whatsapp={showWhatsApp}>
                <div className={styles.container}>
                    <span>
                        © {new Date().getFullYear()} Dra. Lorraine Souza. Todos
                        os direitos reservados.
                    </span>
                    <a
                        href={creditHref}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Quero um site assim
                    </a>
                </div>
            </div>
        </footer>
    );
}
