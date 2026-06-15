import { sql } from "@vercel/postgres";
import { getPaymentProvider } from "@utils/integrations/payment";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const consultationId = Number(req.body?.consultationId);
    const sessionId = String(req.body?.sessionId || "");

    if (!consultationId || !sessionId) {
        res.status(400).json({ error: "Missing consultation or session" });
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

        if (!provider.confirmCheckout) {
            res.status(501).json({
                error: "Payment provider does not support checkout confirmation"
            });
            return;
        }

        const { rows } = await sql`
            SELECT id, status, payment_status
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
                paid: true,
                status: consultation.status,
                paymentStatus: consultation.payment_status
            });
            return;
        }

        const confirmation = await provider.confirmCheckout({
            consultationId,
            sessionId
        });

        await sql`
            UPDATE consultations
            SET
                status = ${confirmation.consultationStatus},
                payment_status = ${confirmation.paymentStatus},
                payment_provider = ${confirmation.provider},
                payment_provider_ref = ${confirmation.providerRef},
                payment_paid_at = COALESCE(payment_paid_at, ${confirmation.paidAt}),
                payment_metadata = ${JSON.stringify(confirmation.metadata || {})}::jsonb,
                paid_at = COALESCE(paid_at, ${confirmation.paidAt})
            WHERE id = ${consultationId};
        `;

        res.status(200).json({
            paid: confirmation.paymentStatus === "paid",
            status: confirmation.consultationStatus,
            paymentStatus: confirmation.paymentStatus
        });
    } catch (err) {
        console.error("[payment confirmation error]", err);
        res.status(400).json({
            error: err?.message || "Payment confirmation failed"
        });
    }
}
