// Facebook Pixel tracking utilities

export const trackFacebookEvent = (eventName, options = {}) => {
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", eventName, options);
    }
};

export const trackFacebookInitiateCheckoutAnotacoes = () => {
    trackFacebookEvent("InitiateCheckout", {
        content_name: "Anotações Originais",
        content_category: "Educational Material",
        value: 149.9,
        currency: "BRL"
    });
};

export const trackFacebookInitiateCheckoutCombo = () => {
    trackFacebookEvent("InitiateCheckout", {
        content_name: "Combo Completo - Anotações + Template Notion",
        content_category: "Educational Bundle",
        value: 199.9,
        currency: "BRL"
    });
};
