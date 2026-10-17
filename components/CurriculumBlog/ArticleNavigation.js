import { useEffect, useRef, useState } from "react";
import styles from "./Article.module.scss";

export default function ArticleNavigation({ sections, officialPage }) {
    const [active, setActive] = useState(sections[0][0]);
    const mobileIndex = useRef(null);
    useEffect(() => {
        let frame;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                let current = sections[0][0];
                for (const [id] of sections) {
                    const section = document.getElementById(id);
                    if (section && section.getBoundingClientRect().top <= 180)
                        current = id;
                }
                setActive(current);
            });
        };
        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => {
            window.removeEventListener("scroll", update);
            cancelAnimationFrame(frame);
        };
    }, [sections]);
    const links = (
        <ol>
            {sections.map(([id, label], index) => (
                <li key={id}>
                    <a
                        href={`#${id}`}
                        aria-current={active === id ? "location" : undefined}
                        onClick={() => {
                            setActive(id);
                            if (mobileIndex.current)
                                mobileIndex.current.open = false;
                        }}
                    >
                        <span aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        {label}
                    </a>
                </li>
            ))}
        </ol>
    );
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.desktopIndex} aria-label="Índice do artigo">
                <p className={styles.eyebrow}>Neste guia</p>
                {links}
                <a
                    className={styles.officialLink}
                    href={officialPage}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Processo seletivo oficial <span aria-hidden="true">↗</span>
                </a>
                <span className={styles.sidebarNote}>
                    Acesso direto
                    <br />
                    Ingresso em 2027
                </span>
            </nav>
            <details ref={mobileIndex} className={styles.mobileIndex}>
                <summary>
                    Neste guia<span aria-hidden="true">+</span>
                </summary>
                <nav aria-label="Índice do artigo no celular">{links}</nav>
            </details>
        </aside>
    );
}
