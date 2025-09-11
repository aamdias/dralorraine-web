import "@styles/globals.scss";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const pixelOptions = {
    autoConfig: true, // set to false if you want to disable automatic config
    debug: false, // set to true if you want to debug
};

export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        // Initialize PostHog
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: "/ingest",
            ui_host: "https://us.posthog.com",
            defaults: "2025-05-24",
            capture_exceptions: true,
            debug: process.env.NODE_ENV === "development"
        });

        // Initialize Facebook Pixel (client-side only)
        const initializeFacebookPixel = async () => {
            if (typeof window !== "undefined") {
                const FacebookPixel = (await import("react-facebook-pixel")).default;
                FacebookPixel.init('429829449584135', null, pixelOptions);
                FacebookPixel.pageView();

                const handleRouteChange = () => {
                    FacebookPixel.pageView();
                };

                router.events.on('routeChangeComplete', handleRouteChange);

                return () => {
                    router.events.off('routeChangeComplete', handleRouteChange);
                };
            }
        };

        initializeFacebookPixel();
    }, [router.events]);

    return (
        <PostHogProvider client={posthog}>
            <Head>
                <script async src="https://tally.so/widgets/embed.js"></script>
            </Head>
            <Component {...pageProps} />
            <GoogleAnalytics gaId="G-7E46RP1M4D" />
        </PostHogProvider>
    );
}
