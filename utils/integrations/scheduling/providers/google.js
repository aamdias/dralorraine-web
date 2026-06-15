const DEFAULT_GOOGLE_SCHEDULING_URL =
    "https://calendar.app.google/S1kgVZudBHqmyQD89";

export const googleSchedulingProvider = {
    name: "google",

    isConfigured() {
        return Boolean(
            process.env.GOOGLE_SCHEDULING_URL || DEFAULT_GOOGLE_SCHEDULING_URL
        );
    },

    getMissingConfig() {
        return [];
    },

    getSchedulingOption({ consultation }) {
        return {
            provider: this.name,
            providerLabel: "Google Calendar",
            bookingUrl:
                process.env.GOOGLE_SCHEDULING_URL ||
                DEFAULT_GOOGLE_SCHEDULING_URL,
            mode: "link",
            metadata: {
                consultationId: String(consultation.id),
                schedulingUrl:
                    process.env.GOOGLE_SCHEDULING_URL ||
                    DEFAULT_GOOGLE_SCHEDULING_URL
            }
        };
    }
};
