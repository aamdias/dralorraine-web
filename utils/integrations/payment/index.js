import { hotmartPaymentProvider } from "./providers/hotmart";
import { stripePaymentProvider } from "./providers/stripe";

const providers = {
    hotmart: hotmartPaymentProvider,
    stripe: stripePaymentProvider
};

export function getPaymentProvider(name = process.env.PAYMENT_PROVIDER) {
    const providerName = (name || "stripe").toLowerCase();
    const provider = providers[providerName];

    if (!provider) {
        throw new Error(`Unsupported payment provider: ${providerName}`);
    }

    return provider;
}

export function getPublicBaseUrl(req) {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }

    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host;

    return `${protocol}://${host}`;
}
