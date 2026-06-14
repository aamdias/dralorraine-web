import { sql } from "@vercel/postgres";
import { getSchedulingProvider } from "@utils/integrations/scheduling";

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
        const provider = getSchedulingProvider();

        if (!provider.isConfigured()) {
            res.status(503).json({
                error: "Scheduling provider is not configured",
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

        if (!["paid", "scheduled"].includes(consultation.payment_status)) {
            res.status(409).json({
                error: "Payment must be confirmed before scheduling"
            });
            return;
        }

        const option = provider.getSchedulingOption({ consultation });

        await sql`
            UPDATE consultations
            SET
                scheduling_status = 'ready_to_schedule',
                scheduling_provider = ${option.provider},
                scheduling_metadata = ${JSON.stringify(option.metadata || {})}::jsonb
            WHERE id = ${consultationId}
              AND scheduling_status = 'pending';
        `;

        res.status(200).json(option);
    } catch (err) {
        console.error("[scheduling options error]", err);
        res.status(500).json({
            error:
                "Não foi possível preparar o agendamento. Verifique a configuração do provedor e se a migration 002 foi executada."
        });
    }
}
