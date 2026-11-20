import { useEffect, useLayoutEffect, useState } from "react";
import { Monogram } from "@components/Logo";
import styles from "./Home.module.scss";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const useBrowserLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;
const clamp = (value) => Math.max(0, Math.min(1, value));

// Lives for a single document, so changing routes won't replay the opening,
// and reloading the site starts a fresh opening.
let introPlayed = false;

export function useHomeIntro() {
    const [stage, setStage] = useState("ready");

    useBrowserLayoutEffect(() => {
        const media = window.matchMedia(reducedMotion);
        if (
            introPlayed ||
            media.matches ||
            document.visibilityState === "hidden" ||
            window.location.hash
        )
            return;

        setStage("waiting");

        const start = window.setTimeout(() => {
            introPlayed = true;
            setStage("entering");
        }, 1550);
        const end = window.setTimeout(() => setStage("ready"), 4050);

        const finish = () => {
            introPlayed = true;
            window.clearTimeout(start);
            window.clearTimeout(end);
            setStage("ready");
        };
        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") finish();
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("beforeprint", finish);
        media.addEventListener("change", finish);
        return () => {
            window.clearTimeout(start);
            window.clearTimeout(end);
            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange
            );
            window.removeEventListener("beforeprint", finish);
            media.removeEventListener("change", finish);
        };
    }, []);

    return stage;
}

export function HomeIntro({ stage }) {
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (stage !== "entering") return;
        const timeout = window.setTimeout(() => setDismissed(true), 1250);
        return () => window.clearTimeout(timeout);
    }, [stage]);

    if (stage === "ready" || dismissed) return null;

    return (
        <div aria-hidden="true" className={styles.intro} data-intro={stage}>
            <Monogram decorative className={styles.introMark} />
            <div className={styles.introName}>LORRAINE SOUZA</div>
            <div className={styles.introProgress}>
                <span />
            </div>
        </div>
    );
}

export function useScrollReveals(mainRef, manifestoRef) {
    useEffect(() => {
        const media = window.matchMedia(reducedMotion);
        const manifesto = manifestoRef.current;
        const words = [...manifesto.querySelectorAll("[data-manifesto-word]")];
        const pending = new Set();
        let observer;
        let stopped = false;

        const show = (element) => {
            element.removeAttribute("data-pending");
            pending.delete(element);
            observer?.unobserve(element);
        };

        const update = () => {
            if (stopped) return;
            const vh = window.innerHeight;
            for (const element of pending) {
                if (element.getBoundingClientRect().top < vh * 0.88)
                    show(element);
            }

            const { top, height } = manifesto.getBoundingClientRect();
            if (top > vh || top + height < 0) return;
            const progress = clamp(-top / Math.max(1, height - vh));
            const lit = progress * (words.length + 6) - 3;
            words.forEach((word, index) => {
                word.style.setProperty(
                    "--word-opacity",
                    0.16 + 0.84 * clamp(lit - index)
                );
            });
        };

        const revealAll = () => {
            stopped = true;
            observer?.disconnect();
            for (const element of pending) show(element);
            words.forEach((word) =>
                word.style.removeProperty("--word-opacity")
            );
        };

        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") revealAll();
        };

        if (media.matches || document.visibilityState === "hidden") return;

        if ("IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (entries) =>
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) show(entry.target);
                    }),
                { rootMargin: "0px 0px -12% 0px" }
            );
        }

        for (const element of mainRef.current.querySelectorAll(
            "[data-reveal]"
        )) {
            if (element.getBoundingClientRect().top >= window.innerHeight) {
                element.setAttribute("data-pending", "");
                pending.add(element);
                observer?.observe(element);
            }
        }
        update();

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        window.addEventListener("beforeprint", revealAll);
        document.addEventListener("visibilitychange", onVisibilityChange);
        media.addEventListener("change", revealAll);

        return () => {
            revealAll();
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            window.removeEventListener("beforeprint", revealAll);
            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange
            );
            media.removeEventListener("change", revealAll);
        };
    }, [mainRef, manifestoRef]);
}
