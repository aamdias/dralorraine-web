import "@styles/globals.scss";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: "/ingest",
            ui_host: "https://us.posthog.com",
            defaults: "2025-05-24",
            capture_exceptions: true,
            debug: process.env.NODE_ENV === "development"
        });
    }, []);

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
