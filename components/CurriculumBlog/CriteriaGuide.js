import { useRef, useState } from "react";
import { unicampCriteria } from "@data/unicampCriteria";
import { unicampArticle } from "@data/curriculum";
import styles from "./Article.module.scss";

export default function CriteriaGuide() {
    const root = useRef(null);
    const [allOpen, setAllOpen] = useState(false);
    const toggleAll = () => {
        const next = !allOpen;
        root.current?.querySelectorAll("details").forEach((detail) => {
            detail.open = next;
        });
        setAllOpen(next);
    };
    return (
        <div ref={root}>
            <ol
                className={styles.criteriaIndex}
                aria-label="Os dez grupos de pontuação"
            >
                {unicampCriteria.map((item, index) => (
                    <li key={item.id}>
                        <a href={`#${item.id}`}>
                            <span
                                className={styles.indexNumber}
                                aria-hidden="true"
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{item.short}</span>
                            <span className={styles.indexPoints}>
                                {item.points}
                                <span className="sr-only">
                                    {" "}
                                    pontos no máximo
                                </span>
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
            <div className={styles.criteriaLegend}>
                <span>100 pontos possíveis · valores máximos por grupo</span>
                <a
                    href={`${unicampArticle.edital}#page=6`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver tabela oficial
                </a>
            </div>
            <div className={styles.guideHeading}>
                <p className={styles.eyebrow}>Entenda cada grupo</p>
                <button
                    type="button"
                    onClick={toggleAll}
                    aria-expanded={allOpen}
                >
                    {allOpen ? "Recolher detalhes" : "Abrir todos os detalhes"}
                    <span aria-hidden="true">{allOpen ? "−" : "+"}</span>
                </button>
            </div>
            {unicampCriteria.map((item, index) => (
                <section
                    key={item.id}
                    id={item.id}
                    className={styles.criterion}
                    aria-labelledby={`${item.id}-title`}
                >
                    <div className={styles.criterionHeading}>
                        <span
                            className={styles.criterionNumber}
                            aria-hidden="true"
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 id={`${item.id}-title`}>{item.title}</h3>
                        <span className={styles.points}>
                            Até <strong>{item.points}</strong> pontos
                        </span>
                    </div>
                    <p>{item.meaning}</p>
                    <details
                        className={styles.criterionDetails}
                        onToggle={() => {
                            const details =
                                root.current?.querySelectorAll("details");
                            setAllOpen(
                                Boolean(details?.length) &&
                                    [...details].every((detail) => detail.open)
                            );
                        }}
                    >
                        <summary>
                            <span>
                                Como pontua e o que reunir
                                <span className="sr-only">: {item.title}</span>
                            </span>
                            <span aria-hidden="true">+</span>
                        </summary>
                        <div className={styles.criterionBody}>
                            <p className={styles.detailLabel}>Na prática</p>
                            <p>{item.example}</p>
                            <p className={styles.detailLabel}>
                                Como o edital pontua
                            </p>
                            <dl className={styles.scoreRows}>
                                {item.scores.map(([label, points]) => (
                                    <div key={label}>
                                        <dt>{label}</dt>
                                        <dd>
                                            {points} <span>pontos</span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <p className={styles.detailLabel}>O que reunir</p>
                            <p>{item.documents}</p>
                            <div className={styles.commonQuestion}>
                                <h4>{item.question}</h4>
                                <p>{item.answer}</p>
                            </div>
                            <div className={styles.criterionSources}>
                                <a
                                    href={`${unicampArticle.edital}#page=${item.page}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Edital · grupo {index + 1}{" "}
                                    <span aria-hidden="true">↗</span>
                                </a>
                                {item.source && (
                                    <a
                                        href={item.source[1]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.source[0]}{" "}
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </details>
                </section>
            ))}
        </div>
    );
}
