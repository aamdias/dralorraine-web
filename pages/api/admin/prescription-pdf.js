import { currentUser } from "@utils/crm/auth.mjs";
import { privateHeaders } from "@utils/crm/runtime.mjs";
import { prescriptionDetails } from "@utils/crm/store.mjs";
import { prescriptionPdf } from "@utils/crm/prescription-pdf.mjs";
export default async function handler(req, res) {
    privateHeaders(res);
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (req.method !== "GET") return res.status(405).end();
    try {
        const user = await currentUser(req, res);
        if (!user)
            return res
                .status(401)
                .json({ error: "Sua sessão expirou. Entre novamente." });
        if (
            typeof req.query.id !== "string" ||
            !/^[a-zA-Z0-9_-]{1,80}$/.test(req.query.id)
        )
            return res.status(400).json({ error: "Receita inválida." });
        const record = await prescriptionDetails(req.query.id, user.email);
        const pdf = await prescriptionPdf(record);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="receita-${record.id}.pdf"`
        );
        return res.send(pdf);
    } catch (error) {
        return res
            .status(error.status || 503)
            .json({
                error: error.status
                    ? error.message
                    : "Não foi possível gerar o PDF. Tente novamente."
            });
    }
}
