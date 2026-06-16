import { sql } from "@vercel/postgres";
import { getSchedulingProvider } from "@utils/integrations/scheduling";
import { safeNotifyConsultaCompleted } from "@utils/consultaNotifications";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const provider = getSchedulingProvider(req.query.provider);
        const event = provider.parseWebhook({ req });
        const { rows } = await sql`
            SELECT id, name, email, phone, status, scheduling_status
            FROM consultations
            WHERE id = ${event.consultationId}
            LIMIT 1;
        `;
        const consultation = rows[0];

        await sql`
            UPDATE consultations
            SET
                status = ${event.consultationStatus},
                scheduling_status = ${event.schedulingStatus},
                scheduling_provider = ${event.provider},
                scheduling_provider_ref = ${event.providerRef},
                scheduled_at = COALESCE(${event.scheduledAt}, scheduled_at),
                scheduled_timezone = COALESCE(${event.scheduledTimezone}, scheduled_timezone),
                scheduling_metadata = ${JSON.stringify(event.metadata || {})}::jsonb
            WHERE id = ${event.consultationId};
        `;

        if (
            event.consultationStatus === "scheduled" &&
            consultation &&
            consultation.status !== "scheduled" &&
            consultation.scheduling_status !== "scheduled"
        ) {
            await safeNotifyConsultaCompleted({
                id: consultation.id,
                name: consultation.name,
                email: consultation.email,
                phone: consultation.phone,
                scheduledAt: event.scheduledAt,
                scheduledTimezone: event.scheduledTimezone,
                schedulingProvider: event.provider,
                schedulingProviderRef: event.providerRef
            });
        }

        res.status(200).json({ ok: true });
    } catch (err) {
        console.error("[scheduling webhook error]", err);
        res.status(400).json({ error: err?.message || "Webhook failed" });
    }
}
