// These are funnel interactions, not submitted leads or purchases.
const GOOGLE_ADS_ID = "AW-10859573862";

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
