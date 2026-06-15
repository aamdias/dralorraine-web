import { calSchedulingProvider } from "./providers/cal";
import { googleSchedulingProvider } from "./providers/google";

const providers = {
    cal: calSchedulingProvider,
    google: googleSchedulingProvider
};

export function getSchedulingProvider(name = process.env.SCHEDULING_PROVIDER) {
    const providerName = (name || "google").toLowerCase();
    const provider = providers[providerName];

    if (!provider) {
        throw new Error(`Unsupported scheduling provider: ${providerName}`);
    }

    return provider;
}
