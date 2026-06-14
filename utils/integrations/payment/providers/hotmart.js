function appendParam(url, key, value) {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
}

function onlyDigits(value = "") {
    return value.replace(/\D/g, "");
}

function splitBrazilPhone(phone = "") {
    const digits = onlyDigits(phone);
    const withoutCountry = digits.startsWith("55") ? digits.slice(2) : digits;

    return {
        areaCode: withoutCountry.slice(0, 2),
        number: withoutCountry.slice(2)
    };
}

function findConsultationId(payload) {
    const directKeys = ["consultationId", "consultaId", "consultation_id", "consulta_id"];

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
            return null;
        }

        if (typeof value === "object") {
            for (const key of directKeys) {
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

function getNested(payload, paths) {
    for (const path of paths) {
        const value = path.split(".").reduce((obj, key) => obj?.[key], payload);
        if (value !== undefined && value !== null && value !== "") return value;
    }

    return null;
}

function mapHotmartStatus(payload) {
    const rawStatus = String(
        getNested(payload, [
            "data.purchase.status",
            "purchase.status",
            "transaction.status",
            "status",
            "event",
            "event_type"
        ]) || ""
    ).toLowerCase();

    if (["approved", "purchase_approved", "completed", "purchase_completed"].includes(rawStatus)) {
        return { paymentStatus: "paid", consultationStatus: "paid", paid: true };
    }

    if (["refunded", "purchase_refunded", "chargeback"].includes(rawStatus)) {
        return {
            paymentStatus: rawStatus.includes("chargeback") ? "chargeback" : "refunded",
            consultationStatus: "canceled",
            paid: false
        };
    }

    if (["canceled", "cancelled", "purchase_canceled", "expired", "purchase_expired"].includes(rawStatus)) {
        return { paymentStatus: "failed", consultationStatus: "canceled", paid: false };
    }

    return { paymentStatus: "awaiting_confirmation", consultationStatus: "pending_payment", paid: false };
}

function verifyWebhook(req) {
    const expected = process.env.HOTMART_WEBHOOK_TOKEN;
    if (!expected) return;

    const received =
        req.query?.token ||
        req.headers["x-hotmart-hottok"] ||
        req.headers["x-hotmart-token"] ||
        req.headers["x-webhook-token"];

    if (received !== expected) {
        throw new Error("Invalid Hotmart webhook token");
    }
}

export const hotmartPaymentProvider = {
    name: "hotmart",

    isConfigured() {
        return Boolean(process.env.HOTMART_CHECKOUT_URL);
    },

    getMissingConfig() {
        return ["HOTMART_CHECKOUT_URL"].filter((key) => !process.env[key]);
    },

    createCheckout({ consultation, baseUrl }) {
        if (!this.isConfigured()) {
            throw new Error("HOTMART_CHECKOUT_URL is not configured");
        }

        const url = new URL(process.env.HOTMART_CHECKOUT_URL);
        const trackingKey = `consulta-${consultation.id}`;
        const { areaCode, number } = splitBrazilPhone(consultation.phone);

        appendParam(url, "name", consultation.name);
        appendParam(url, "email", consultation.email);
        appendParam(url, "phoneac", areaCode);
        appendParam(url, "phonenumber", number);
        appendParam(url, "tel", onlyDigits(consultation.phone));
        appendParam(url, "src", trackingKey);
        appendParam(url, "sck", trackingKey);
        appendParam(url, "checkoutMode", url.searchParams.get("checkoutMode") || "10");
        appendParam(url, "success_url", `${baseUrl}/consulta/agendar?consulta=${consultation.id}`);

        return {
            provider: this.name,
            checkoutUrl: url.toString(),
            metadata: {
                trackingKey
            }
        };
    },

    parseWebhook({ req }) {
        verifyWebhook(req);

        const payload = req.body || {};
        const consultationId = findConsultationId(payload);

        if (!consultationId) {
            throw new Error("Could not associate Hotmart webhook with a consultation");
        }

        const providerRef = getNested(payload, [
            "data.purchase.transaction",
            "purchase.transaction",
            "transaction.id",
            "transaction",
            "data.transaction",
            "id"
        ]);
        const status = mapHotmartStatus(payload);

        return {
            consultationId,
            provider: this.name,
            providerRef: providerRef ? String(providerRef) : null,
            paymentStatus: status.paymentStatus,
            consultationStatus: status.consultationStatus,
            paidAt: status.paid ? new Date().toISOString() : null,
            metadata: payload
        };
    }
};
