import { calSchedulingProvider } from "./providers/cal";

const providers = {
    cal: calSchedulingProvider
};

export function getSchedulingProvider(name = process.env.SCHEDULING_PROVIDER) {
    const providerName = (name || "cal").toLowerCase();
    const provider = providers[providerName];

    if (!provider) {
        throw new Error(`Unsupported scheduling provider: ${providerName}`);
    }

    return provider;
}
