import Image from "next/image";
import Link from "next/link";
import siteStyles from "./Site.module.scss";
import styles from "./PageIntro.module.scss";

export function PageIntro({
    eyebrow,
    title,
    lead,
    backLink,
    meta,
    media,
    compact = false,
    children
}) {
    return (
        <header className={styles.intro} data-compact={compact}>
            <div className={siteStyles.container}>
                {backLink && (
                    <Link href={backLink.href} className={styles.backLink}>
                        {backLink.label}
                    </Link>
                )}
                <div className={media ? styles.split : undefined}>
                    <div className={styles.copy}>
                        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                        <h1>{title}</h1>
                        {lead && <p className={styles.lead}>{lead}</p>}
                        {children && (
                            <div className={styles.extras}>{children}</div>
                        )}
                        {meta && <div className={styles.meta}>{meta}</div>}
                    </div>
                    {media && <div className={styles.media}>{media}</div>}
                </div>
            </div>
        </header>
    );
}

export function PageIntroImage({
    src,
    alt,
    className = "",
    position,
    quality
}) {
    return (
        <div className={`${styles.image} ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                priority
                quality={quality}
                sizes="(min-width: 1280px) 510px, (min-width: 960px) 42vw, (min-width: 720px) 560px, 95vw"
                style={{ objectPosition: position }}
            />
        </div>
    );
}
