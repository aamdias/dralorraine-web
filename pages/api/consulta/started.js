import { safeNotifyConsultaStarted } from "@utils/consultaNotifications";

function pickLeadData(data = {}) {
    return {
        name: String(data.name || "").trim(),
        email: String(data.email || "").trim(),
        phone: String(data.phone || "").trim(),
        city: String(data.city || "").trim(),
        startedAt: new Date().toISOString()
    };
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const lead = pickLeadData(req.body?.data);

    if (!lead.name || !lead.email || !lead.phone || !lead.city) {
        res.status(400).json({ error: "Missing required lead fields" });
        return;
    }

    const result = await safeNotifyConsultaStarted(lead);

    res.status(200).json({ ok: !result?.error, result });
}
