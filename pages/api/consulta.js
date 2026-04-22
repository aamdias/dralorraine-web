import { sql } from "@vercel/postgres";

// ────────────────────────────────────────────────────────────────────────────
// Persist a completed intake from /consulta/agendar.
//
// Called from Step 5 (Consent) → Step 6 (Payment) transition. We only store
// data that the patient has explicitly consented to via all three checkboxes.
//
// Returns { id } on success so the client can reference this intake later
// (e.g. in the payment / scheduling step metadata).
//
// Env vars required (auto-injected by Vercel when Neon is provisioned):
//   POSTGRES_URL, POSTGRES_PRISMA_URL, POSTGRES_URL_NON_POOLING, etc.
// ────────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const { data } = req.body || {};

    // Minimum validation — the UI enforces the rest.
    if (!data || !data.name || !data.email) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    if (
        !data.consentTelemedicine ||
        !data.consentLgpd ||
        !data.consentTerms
    ) {
        res.status(400).json({ error: "Consent required" });
        return;
    }

    try {
        const photosJson = JSON.stringify(data.photos || []);
        // Normalize empty date strings to null so Postgres doesn't choke.
        const dob = data.dob && data.dob.length > 0 ? data.dob : null;

        const result = await sql`
            INSERT INTO consultations (
                name, email, phone, dob, city,
                main_concern, concern_duration, prior_treatments,
                allergies, medications, conditions, skin_type,
                photos,
                consent_telemedicine, consent_lgpd, consent_terms
            ) VALUES (
                ${data.name},
                ${data.email},
                ${data.phone || null},
                ${dob},
                ${data.city || null},
                ${data.mainConcern || null},
                ${data.concernDuration || null},
                ${data.priorTreatments || null},
                ${data.allergies || null},
                ${data.medications || null},
                ${data.conditions || null},
                ${data.skinType || null},
                ${photosJson}::jsonb,
                ${!!data.consentTelemedicine},
                ${!!data.consentLgpd},
                ${!!data.consentTerms}
            )
            RETURNING id;
        `;

        res.status(200).json({ id: result.rows[0].id });
    } catch (err) {
        console.error("[consulta insert error]", err);
        res.status(500).json({ error: "Failed to save intake" });
    }
}
