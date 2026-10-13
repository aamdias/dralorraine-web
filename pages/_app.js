import "@styles/globals.scss";
import Head from "next/head";
import { inter, cormorantGaramond } from "@utils/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import {
    initializeOpenAIPixel,
    trackConsultationBookingClick
} from "@utils/openaiPixel";

function Marketing({ children }) {
    const router = useRouter();
    useEffect(() => {
        initializeOpenAIPixel();
        document.addEventListener("click", trackConsultationBookingClick, true);
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY)
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: "/ingest",
                ui_host: "https://us.posthog.com",
                defaults: "2025-05-24",
                capture_exceptions: true,
                debug: process.env.NODE_ENV === "development"
            });
        let disposed = false,
            pixel;
        const pageView = (url) => {
            if (!disposed && !url.startsWith("/admin")) pixel?.pageView();
        };
        import("react-facebook-pixel").then((module) => {
            if (disposed) return;
            pixel = module.default;
            pixel.init("429829449584135", null, {
                autoConfig: true,
                debug: false
            });
            pixel.pageView();
            router.events.on("routeChangeComplete", pageView);
        });
        return () => {
            disposed = true;
            document.removeEventListener(
                "click",
                trackConsultationBookingClick,
                true
            );
            router.events.off("routeChangeComplete", pageView);
            if (process.env.NEXT_PUBLIC_POSTHOG_KEY)
                posthog.opt_out_capturing();
        };
    }, [router.events]);
    return (
        <PostHogProvider client={posthog}>
            <Head>
                <script async src="https://tally.so/widgets/embed.js" />
            </Head>
            {children}
            <GoogleAnalytics gaId="G-7E46RP1M4D" />
        </PostHogProvider>
    );
}
export default function App({ Component, pageProps }) {
    const router = useRouter();
    const privatePage =
        Component.isCRM ||
        router.pathname.startsWith("/admin") ||
        pageProps.adminHost;
    const content = <Component {...pageProps} />;
    return (
        <>
            <style jsx global>{`
                :root {
                    --font-body: ${inter.style.fontFamily};
                    --font-display: ${cormorantGaramond.style.fontFamily};
                }
            `}</style>
            {privatePage ? content : <Marketing>{content}</Marketing>}
        </>
    );
}
