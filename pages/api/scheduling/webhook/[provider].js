import { sql } from "@vercel/postgres";
import { getSchedulingProvider } from "@utils/integrations/scheduling";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const provider = getSchedulingProvider(req.query.provider);
        const event = provider.parseWebhook({ req });

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

        res.status(200).json({ ok: true });
    } catch (err) {
        console.error("[scheduling webhook error]", err);
        res.status(400).json({ error: err?.message || "Webhook failed" });
    }
}
