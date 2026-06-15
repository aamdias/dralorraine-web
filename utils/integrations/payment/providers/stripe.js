import crypto from "crypto";

const STRIPE_API_VERSION = "2025-05-28.basil";
const DEFAULT_PRICE_CENTS = 35000;

function getConfiguredPriceCents() {
    const amount = Number(process.env.STRIPE_CONSULTATION_PRICE_CENTS);
    return Number.isFinite(amount) && amount > 0
        ? Math.round(amount)
        : DEFAULT_PRICE_CENTS;
}

function appendParam(params, key, value) {
    if (value === undefined || value === null || value === "") return;
    params.append(key, String(value));
}

function parseSignatureHeader(header = "") {
    return header.split(",").reduce(
        (acc, part) => {
            const [key, value] = part.split("=");
            if (!key || !value) return acc;
            if (key === "v1") acc.signatures.push(value);
            if (key === "t") acc.timestamp = value;
            return acc;
        },
        { signatures: [], timestamp: null }
    );
}

function timingSafeEqual(a, b) {
    const aBuffer = Buffer.from(a);
    const bBuffer = Buffer.from(b);

    return (
        aBuffer.length === bBuffer.length &&
        crypto.timingSafeEqual(aBuffer, bBuffer)
    );
}

function verifyWebhookSignature({ rawBody, signatureHeader }) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secret) {
        throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    if (!rawBody || !signatureHeader) {
        throw new Error("Missing Stripe webhook signature data");
    }

    const { signatures, timestamp } = parseSignatureHeader(signatureHeader);

    if (!timestamp || signatures.length === 0) {
        throw new Error("Invalid Stripe-Signature header");
    }

    const toleranceSeconds = 300;
    const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));

    if (!Number.isFinite(age) || age > toleranceSeconds) {
        throw new Error("Stripe webhook timestamp outside tolerance");
    }

    const signedPayload = `${timestamp}.${rawBody}`;
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(signedPayload, "utf8")
        .digest("hex");

    if (
        !signatures.some((signature) =>
            timingSafeEqual(signature, expectedSignature)
        )
    ) {
        throw new Error("Invalid Stripe webhook signature");
    }
}

function parseConsultationId(session = {}) {
    const rawValue =
        session.client_reference_id ||
        session.metadata?.consultationId ||
        session.metadata?.consultaId ||
        session.payment_intent?.metadata?.consultationId;

    const id = Number(rawValue);

    if (!id) {
        throw new Error("Could not associate Stripe webhook with a consultation");
    }

    return id;
}

function mapStripeEvent(event) {
    const session = event.data?.object || {};

    if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"
    ) {
        if (session.payment_status === "paid") {
            return {
                paymentStatus: "paid",
                consultationStatus: "paid",
                paidAt: new Date().toISOString()
            };
        }
    }

    if (
        event.type === "checkout.session.expired" ||
        event.type === "checkout.session.async_payment_failed"
    ) {
        return {
            paymentStatus: "failed",
            consultationStatus: "pending_payment",
            paidAt: null
        };
    }

    return {
        paymentStatus: "awaiting_confirmation",
        consultationStatus: "pending_payment",
        paidAt: null
    };
}

function mapCheckoutSession(session = {}) {
    if (session.payment_status === "paid") {
        return {
            paymentStatus: "paid",
            consultationStatus: "paid",
            paidAt: new Date().toISOString()
        };
    }

    if (session.status === "expired") {
        return {
            paymentStatus: "failed",
            consultationStatus: "pending_payment",
            paidAt: null
        };
    }

    return {
        paymentStatus: "awaiting_confirmation",
        consultationStatus: "pending_payment",
        paidAt: null
    };
}

async function retrieveCheckoutSession(sessionId) {
    const response = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(
            sessionId
        )}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
                "Stripe-Version": STRIPE_API_VERSION
            }
        }
    );
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result?.error?.message || "Stripe session lookup failed");
    }

    return result;
}

export const stripePaymentProvider = {
    name: "stripe",

    isConfigured() {
        return Boolean(process.env.STRIPE_SECRET_KEY);
    },

    getMissingConfig() {
        return ["STRIPE_SECRET_KEY"].filter((key) => !process.env[key]);
    },

    async createCheckout({ consultation, baseUrl }) {
        if (!this.isConfigured()) {
            throw new Error("STRIPE_SECRET_KEY is not configured");
        }

        const params = new URLSearchParams();
        const consultationId = String(consultation.id);
        const successUrl = `${baseUrl}/consulta/agendar?consulta=${consultation.id}&payment=stripe_success&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${baseUrl}/consulta/agendar?consulta=${consultation.id}&payment=stripe_cancel`;

        appendParam(params, "mode", "payment");
        appendParam(params, "success_url", successUrl);
        appendParam(params, "cancel_url", cancelUrl);
        appendParam(params, "client_reference_id", consultationId);
        appendParam(params, "customer_email", consultation.email);
        appendParam(params, "payment_intent_data[metadata][consultationId]", consultationId);
        appendParam(params, "metadata[consultationId]", consultationId);
        appendParam(params, "metadata[patientName]", consultation.name);
        appendParam(params, "metadata[patientPhone]", consultation.phone);
        appendParam(params, "line_items[0][quantity]", "1");
        appendParam(params, "line_items[0][price_data][currency]", "brl");
        appendParam(
            params,
            "line_items[0][price_data][unit_amount]",
            getConfiguredPriceCents()
        );
        appendParam(
            params,
            "line_items[0][price_data][product_data][name]",
            "Consulta Online com Dra Lorraine Souza"
        );
        appendParam(
            params,
            "line_items[0][price_data][product_data][description]",
            "Videoconsulta com a Dra. Lorraine Souza"
        );

        const response = await fetch(
            "https://api.stripe.com/v1/checkout/sessions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Stripe-Version": STRIPE_API_VERSION
                },
                body: params.toString()
            }
        );
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result?.error?.message || "Stripe checkout failed");
        }

        return {
            provider: this.name,
            checkoutUrl: result.url,
            metadata: {
                checkoutSessionId: result.id,
                amountTotal: result.amount_total,
                currency: result.currency,
                consultationId
            }
        };
    },

    async confirmCheckout({ consultationId, sessionId }) {
        if (!this.isConfigured()) {
            throw new Error("STRIPE_SECRET_KEY is not configured");
        }

        const session = await retrieveCheckoutSession(sessionId);
        const sessionConsultationId = parseConsultationId(session);

        if (sessionConsultationId !== Number(consultationId)) {
            throw new Error("Stripe session does not match this consultation");
        }

        const status = mapCheckoutSession(session);

        return {
            consultationId: sessionConsultationId,
            provider: this.name,
            providerRef: session.payment_intent || session.id || null,
            paymentStatus: status.paymentStatus,
            consultationStatus: status.consultationStatus,
            paidAt: status.paidAt,
            metadata: {
                checkoutSessionId: session.id,
                paymentStatus: session.payment_status,
                status: session.status,
                amountTotal: session.amount_total,
                currency: session.currency
            }
        };
    },

    parseWebhook({ req, rawBody }) {
        verifyWebhookSignature({
            rawBody,
            signatureHeader: req.headers["stripe-signature"]
        });

        const event = JSON.parse(rawBody);
        const session = event.data?.object || {};
        const status = mapStripeEvent(event);

        return {
            consultationId: parseConsultationId(session),
            provider: this.name,
            providerRef:
                session.payment_intent || session.id || event.id || null,
            paymentStatus: status.paymentStatus,
            consultationStatus: status.consultationStatus,
            paidAt: status.paidAt,
            metadata: event
        };
    }
};
