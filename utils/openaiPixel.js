const PIXEL_ID = "7rgSVwttfDtEd4B3fZv1SA";
const SDK_URL = "https://bzrcdn.openai.com/sdk/oaiq.min.js";

export function initializeOpenAIPixel() {
    if (typeof window === "undefined" || window.oaiq) return;

    // Queue initialization and early clicks while the asynchronous SDK loads.
    const queue = function () {
        queue.q.push(arguments);
    };
    queue.q = [];
    window.oaiq = queue;
    window.oaiq("init", { pixelId: PIXEL_ID, debug: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = SDK_URL;
    document.head.appendChild(script);
}

export function trackConsultationBookingClick(event) {
    const link = event.target?.closest?.("a[href]");
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    if (
        url.origin !== window.location.origin ||
        url.pathname.replace(/\/$/, "") !== "/consulta/agendar"
    ) return;

    // Analytics must never prevent the visitor from opening the booking flow.
    try {
        window.oaiq?.("measure", "checkout_started", { type: "contents" });
    } catch (error) {
        console.warn("OpenAI Pixel tracking failed:", error);
    }
}
