import { sql } from "@vercel/postgres";
import { getPaymentProvider } from "@utils/integrations/payment";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const provider = getPaymentProvider(req.query.provider);
        const event = provider.parseWebhook({ req });

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
