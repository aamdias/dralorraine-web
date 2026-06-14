function appendParam(url, key, value) {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
}

function getBookingUrl(consultation) {
    if (!process.env.CAL_USERNAME || !process.env.CAL_EVENT_TYPE_SLUG) {
        return null;
    }

    const url = new URL(
        `https://cal.com/${process.env.CAL_USERNAME}/${process.env.CAL_EVENT_TYPE_SLUG}`
    );

    appendParam(url, "name", consultation.name);
    appendParam(url, "email", consultation.email);
    appendParam(url, "metadata[consultationId]", consultation.id);

    return url.toString();
}

function findConsultationId(payload) {
    function visit(value) {
        if (!value) return null;

        if (typeof value === "string" || typeof value === "number") {
            const text = String(value);
            const match = text.match(/consulta[-_](\d+)/i) || text.match(/^(\d+)$/);
            return match ? Number(match[1]) : null;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                const found = visit(item);
                if (found) return found;
            }
        }

        if (typeof value === "object") {
            for (const key of ["consultationId", "consultaId", "consultation_id", "consulta_id"]) {
                if (value[key]) {
                    const found = visit(value[key]);
                    if (found) return found;
                }
            }

            for (const item of Object.values(value)) {
                const found = visit(item);
                if (found) return found;
            }
        }

        return null;
    }

    return visit(payload);
}

function verifyWebhook(req) {
    const expected = process.env.CAL_WEBHOOK_SECRET;
    if (!expected) return;

    const received =
        req.query?.token ||
        req.headers["x-cal-signature-256"] ||
        req.headers["x-cal-signature"] ||
        req.headers["x-webhook-token"];

    if (received !== expected) {
        throw new Error("Invalid Cal.com webhook token");
    }
}

export const calSchedulingProvider = {
    name: "cal",

    isConfigured() {
        return Boolean(
            process.env.CAL_API_KEY ||
                (process.env.CAL_USERNAME && process.env.CAL_EVENT_TYPE_SLUG)
        );
    },

    getMissingConfig() {
        const hasPublicLink = process.env.CAL_USERNAME && process.env.CAL_EVENT_TYPE_SLUG;
        const hasApiBooking =
            process.env.CAL_API_KEY &&
            (process.env.CAL_EVENT_TYPE_ID ||
                (process.env.CAL_USERNAME && process.env.CAL_EVENT_TYPE_SLUG));

        if (hasPublicLink || hasApiBooking) return [];

        return ["CAL_USERNAME", "CAL_EVENT_TYPE_SLUG"];
    },

    getSchedulingOption({ consultation }) {
        if (!this.isConfigured()) {
            throw new Error("Cal.com scheduling is not configured");
        }

        return {
            provider: this.name,
            bookingUrl: getBookingUrl(consultation),
            mode: process.env.CAL_API_KEY ? "api_or_link" : "link",
            metadata: {
                username: process.env.CAL_USERNAME || null,
                eventTypeSlug: process.env.CAL_EVENT_TYPE_SLUG || null,
                eventTypeId: process.env.CAL_EVENT_TYPE_ID || null
            }
        };
    },

    async createBooking({ consultation, start, timeZone }) {
        if (!process.env.CAL_API_KEY) {
            throw new Error("CAL_API_KEY is not configured");
        }

        const body = {
            start,
            attendee: {
                name: consultation.name,
                email: consultation.email,
                timeZone: timeZone || process.env.CAL_TIMEZONE || "America/Sao_Paulo",
                phoneNumber: consultation.phone || undefined,
                language: "pt-BR"
            },
            metadata: {
                consultationId: String(consultation.id)
            }
        };

        if (process.env.CAL_EVENT_TYPE_ID) {
            body.eventTypeId = Number(process.env.CAL_EVENT_TYPE_ID);
        } else {
            body.username = process.env.CAL_USERNAME;
            body.eventTypeSlug = process.env.CAL_EVENT_TYPE_SLUG;
        }

        const response = await fetch("https://api.cal.com/v2/bookings", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CAL_API_KEY}`,
                "Content-Type": "application/json",
                "cal-api-version": process.env.CAL_API_VERSION || "2024-08-13"
            },
            body: JSON.stringify(body)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result?.message || "Cal.com booking failed");
        }

        const booking = result.data || result;

        return {
            provider: this.name,
            providerRef: booking.uid || booking.id || null,
            scheduledAt: booking.start || start,
            scheduledTimezone: timeZone || process.env.CAL_TIMEZONE || "America/Sao_Paulo",
            metadata: booking
        };
    },

    parseWebhook({ req }) {
        verifyWebhook(req);

        const payload = req.body || {};
        const consultationId = findConsultationId(payload);

        if (!consultationId) {
            throw new Error("Could not associate Cal.com webhook with a consultation");
        }

        const booking = payload.payload || payload.data || payload;
        const trigger = String(payload.triggerEvent || payload.event || "").toUpperCase();
        const canceled = trigger.includes("CANCEL");

        return {
            consultationId,
            provider: this.name,
            providerRef: booking.uid || booking.id || null,
            schedulingStatus: canceled ? "canceled" : "scheduled",
            consultationStatus: canceled ? "paid" : "scheduled",
            scheduledAt: booking.startTime || booking.start || null,
            scheduledTimezone: booking.timeZone || booking.timezone || null,
            metadata: payload
        };
    }
};
