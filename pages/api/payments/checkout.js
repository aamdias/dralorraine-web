import { sql } from "@vercel/postgres";
import { getPaymentProvider, getPublicBaseUrl } from "@utils/integrations/payment";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const consultationId = Number(req.body?.consultationId);

    if (!consultationId) {
        res.status(400).json({ error: "Invalid consultation id" });
        return;
    }

    try {
        const provider = getPaymentProvider();

        if (!provider.isConfigured()) {
            res.status(503).json({
                error: "Payment provider is not configured",
                missing: provider.getMissingConfig()
            });
            return;
        }

        const { rows } = await sql`
            SELECT id, name, email, phone, status, payment_status
            FROM consultations
            WHERE id = ${consultationId}
            LIMIT 1;
        `;
        const consultation = rows[0];

        if (!consultation) {
            res.status(404).json({ error: "Consultation not found" });
            return;
        }

        if (
            consultation.payment_status === "paid" ||
            consultation.status === "paid" ||
            consultation.status === "scheduled"
        ) {
            res.status(200).json({
                provider: provider.name,
                alreadyPaid: true
            });
            return;
        }

        const checkout = await provider.createCheckout({
            consultation,
            baseUrl: getPublicBaseUrl(req)
        });

        await sql`
            UPDATE consultations
            SET
                status = 'pending_payment',
                payment_status = 'awaiting_confirmation',
                payment_provider = ${checkout.provider},
                payment_metadata = ${JSON.stringify(checkout.metadata || {})}::jsonb
            WHERE id = ${consultationId};
        `;

        res.status(200).json({
            provider: checkout.provider,
            checkoutUrl: checkout.checkoutUrl
        });
    } catch (err) {
        console.error("[payment checkout error]", err);
        res.status(500).json({
            error:
                "Não foi possível preparar o checkout. Verifique a configuração do provedor e se a migration 002 foi executada."
        });
    }
}
