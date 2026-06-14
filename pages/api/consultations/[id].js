import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const id = Number(req.query.id);

    if (!id) {
        res.status(400).json({ error: "Invalid consultation id" });
        return;
    }

    try {
        const { rows } = await sql`
            SELECT
                id,
                status,
                payment_status,
                payment_provider,
                payment_provider_ref,
                payment_paid_at,
                scheduling_status,
                scheduling_provider,
                scheduling_provider_ref,
                scheduled_at,
                scheduled_timezone
            FROM consultations
            WHERE id = ${id}
            LIMIT 1;
        `;

        if (!rows[0]) {
            res.status(404).json({ error: "Consultation not found" });
            return;
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error("[consultation status error]", err);
        res.status(500).json({
            error:
                "Não foi possível carregar o status da consulta. Verifique se a migration 002 foi executada."
        });
    }
}
