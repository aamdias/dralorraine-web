// Facebook Pixel tracking utilities

export const trackFacebookEvent = async (eventName, options = {}) => {
    if (typeof window !== "undefined") {
        try {
            const FacebookPixel = (await import("react-facebook-pixel")).default;
            
            // Add test event code for local testing (only in development)
            const trackingOptions = {
                ...options,
                ...(process.env.NODE_ENV === "development" && {
                    test_event_code: "TEST74422"
                })
            };
            
            FacebookPixel.track(eventName, trackingOptions);
            
            // Log for debugging in development
            if (process.env.NODE_ENV === "development") {
                console.log("Facebook Pixel Event:", eventName, trackingOptions);
            }
        } catch (error) {
            console.warn("Facebook Pixel tracking failed:", error);
        }
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
