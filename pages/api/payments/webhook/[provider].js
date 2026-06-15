import { sql } from "@vercel/postgres";
import { getPaymentProvider } from "@utils/integrations/payment";

export const config = {
    api: {
        bodyParser: false
    }
};

async function readRawBody(req) {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    return Buffer.concat(chunks).toString("utf8");
}

function parseJsonBody(rawBody) {
    if (!rawBody) return {};

    try {
        return JSON.parse(rawBody);
    } catch (err) {
        throw new Error("Invalid webhook JSON payload");
    }
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const rawBody = await readRawBody(req);
        const provider = getPaymentProvider(req.query.provider);
        const body =
            provider.name === "stripe" ? undefined : parseJsonBody(rawBody);
        const event = provider.parseWebhook({
            req,
            rawBody,
            body
        });

        await sql`
            UPDATE consultations
            SET
                status = ${event.consultationStatus},
                payment_status = ${event.paymentStatus},
                payment_provider = ${event.provider},
                payment_provider_ref = ${event.providerRef},
                payment_paid_at = COALESCE(payment_paid_at, ${event.paidAt}),
                payment_metadata = ${JSON.stringify(event.metadata || {})}::jsonb,
                paid_at = COALESCE(paid_at, ${event.paidAt}),
                hotmart_transaction_id = COALESCE(hotmart_transaction_id, ${event.providerRef})
            WHERE id = ${event.consultationId};
        `;

        res.status(200).json({ ok: true });
    } catch (err) {
        console.error("[payment webhook error]", err);
        res.status(400).json({ error: err?.message || "Webhook failed" });
    }
}
