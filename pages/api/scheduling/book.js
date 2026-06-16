import { sql } from "@vercel/postgres";
import { getSchedulingProvider } from "@utils/integrations/scheduling";
import { safeNotifyConsultaCompleted } from "@utils/consultaNotifications";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const consultationId = Number(req.body?.consultationId);
    const { start, timeZone } = req.body || {};

    if (!consultationId || !start) {
        res.status(400).json({ error: "Missing booking data" });
        return;
    }

    try {
        const provider = getSchedulingProvider();
        const { rows } = await sql`
            SELECT id, name, email, phone, payment_status, status, scheduling_status
            FROM consultations
            WHERE id = ${consultationId}
            LIMIT 1;
        `;
        const consultation = rows[0];

        if (!consultation) {
            res.status(404).json({ error: "Consultation not found" });
            return;
        }

        if (consultation.payment_status !== "paid") {
            res.status(409).json({ error: "Payment must be confirmed before booking" });
            return;
        }

        const booking = await provider.createBooking({
            consultation,
            start,
            timeZone
        });

        await sql`
            UPDATE consultations
            SET
                status = 'scheduled',
                scheduling_status = 'scheduled',
                scheduling_provider = ${booking.provider},
                scheduling_provider_ref = ${booking.providerRef},
                scheduled_at = ${booking.scheduledAt},
                scheduled_timezone = ${booking.scheduledTimezone},
                scheduling_metadata = ${JSON.stringify(booking.metadata || {})}::jsonb
            WHERE id = ${consultationId};
        `;

        if (
            consultation.status !== "scheduled" &&
            consultation.scheduling_status !== "scheduled"
        ) {
            await safeNotifyConsultaCompleted({
                id: consultation.id,
                name: consultation.name,
                email: consultation.email,
                phone: consultation.phone,
                scheduledAt: booking.scheduledAt,
                scheduledTimezone: booking.scheduledTimezone,
                schedulingProvider: booking.provider,
                schedulingProviderRef: booking.providerRef
            });
        }

        res.status(200).json(booking);
    } catch (err) {
        console.error("[scheduling booking error]", err);
        res.status(500).json({ error: err?.message || "Booking failed" });
    }
}
