// Funnel interactions and confirmed submissions are separate events.
const GOOGLE_ADS_ID = "AW-10859573862";
const CURRICULUM_FORM_ID = "EkjBgl";

export function createCurriculumSubmissionTracker(captureLead) {
    const submitted = new Set();
    return (event) => {
        if (
            window.location.pathname.replace(/\/$/, "") !==
                "/curriculo/interesse" ||
            event.origin !== "https://tally.so"
        )
            return;
        const frame = document.querySelector(
            `iframe[data-curriculum-form="${CURRICULUM_FORM_ID}"]`
        );
        if (!frame || event.source !== frame.contentWindow) return;
        let message = event.data;
        if (typeof message === "string") {
            try {
                message = JSON.parse(message);
            } catch {
                return;
            }
        }
        if (
            message?.event !== "Tally.FormSubmitted" ||
            message.payload?.formId !== CURRICULUM_FORM_ID ||
            typeof message.payload?.id !== "string" ||
            !message.payload.id
        )
            return;
        const key = `curriculum-submission:${message.payload.id}`;
        if (submitted.has(key)) return;
        try {
            if (window.sessionStorage.getItem(key)) return;
        } catch {
            // Tracking still works when storage is unavailable.
        }
        submitted.add(key);
        try {
            window.sessionStorage.setItem(key, "1");
        } catch {}

        // Never forward Tally answers, contact details, or submission identifiers.
        const parameters = { form_id: CURRICULUM_FORM_ID, method: "tally" };
        googleEvent("generate_lead", parameters);
        captureLead?.("curriculum_lead_submitted", parameters);
        // This health-provider domain has Meta event restrictions. Do not
        // disguise a blocked Lead as a custom event or a page visit.
    };
}

export function initializeCurriculumAds() {
    googleCommand("config", GOOGLE_ADS_ID, { send_page_view: false });
}

export function trackCurriculumAdsPage(url) {
    const pathname = url.split(/[?#]/)[0].replace(/\/$/, "");
    if (pathname !== "/curriculo" && pathname !== "/curriculo/interesse")
        return;
    googleEvent("page_view", {
        send_to: GOOGLE_ADS_ID,
        page_path: pathname,
        page_location: window.location.href
    });
}

export function trackCurriculumPage(pixel, url) {
    const pathname = url.split(/[?#]/)[0].replace(/\/$/, "");
    if (pathname !== "/curriculo/interesse") return;
    pixel?.trackCustom("CurriculumInterest", { content_name: "Currículo" });
    googleEvent("curriculum_interest", { page_path: pathname });
}

export function trackCurriculumClick(pixel, event) {
    if (window.location.pathname.replace(/\/$/, "") !== "/curriculo") return;
    const link = event.target.closest?.("a[href]");
    if (link?.textContent.trim() !== "Quero meu currículo") return;
    const destination = new URL(link.href, window.location.origin);
    if (destination.origin !== window.location.origin) return;
    const step =
        destination.pathname === "/curriculo/interesse"
            ? "interest_form"
            : "offer";
    pixel?.trackCustom("CurriculumCTAClick", { step });
    googleEvent("curriculum_cta_click", { step });
}

function googleEvent(name, parameters) {
    googleCommand("event", name, parameters);
}

function googleCommand(...args) {
    window.dataLayer = window.dataLayer || [];
    // Queue until the existing Google tag loads; send only the funnel step.
    function gtag() {
        window.dataLayer.push(arguments);
    }
    gtag(...args);
}
