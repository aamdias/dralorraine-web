import { currentUser } from "@utils/crm/auth.mjs";
import { assertSameOrigin, privateHeaders } from "@utils/crm/runtime.mjs";
import {
    snapshot,
    savePatient,
    saveAppointment,
    intakeDetails,
    linkIntake
} from "@utils/crm/store.mjs";
export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };
export default async function handler(req, res) {
    privateHeaders(res);
    if (!["GET", "POST", "PATCH"].includes(req.method))
        return res.status(405).json({ error: "Método não permitido." });
    try {
        if (req.method !== "GET") assertSameOrigin(req);
        const user = await currentUser(req, res);
        if (!user)
            return res
                .status(401)
                .json({ error: "Sua sessão expirou. Entre novamente." });
        if (req.method === "GET") {
            if (req.query.intake) {
                const id = Number(req.query.intake);
                if (!Number.isSafeInteger(id) || id < 1)
                    return res
                        .status(400)
                        .json({ error: "Consulta inválida." });
                return res.json(await intakeDetails(id, user.email));
            }
            return res.json(await snapshot(user.email));
        }
        const { entity, record, id, expected_revision } = req.body || {};
        if (
            req.method === "PATCH" &&
            (typeof id !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(id))
        )
            return res.status(400).json({ error: "Registro inválido." });
        if (!record || typeof record !== "object" || Array.isArray(record))
            return res.status(400).json({ error: "Dados inválidos." });
        if (entity === "patient")
            return res.json(
                await savePatient(
                    record,
                    user.email,
                    req.method === "PATCH" ? id : null,
                    expected_revision
                )
            );
        if (entity === "appointment")
            return res.json(
                await saveAppointment(
                    record,
                    user.email,
                    req.method === "PATCH" ? id : null,
                    expected_revision
                )
            );
        if (entity === "intake-link" && req.method === "POST") {
            const number = Number(record.consultation_id);
            if (
                !Number.isSafeInteger(number) ||
                number < 1 ||
                typeof record.patient_id !== "string"
            )
                return res.status(400).json({ error: "Vínculo inválido." });
            return res.json(
                await linkIntake(number, record.patient_id, user.email)
            );
        }
        return res.status(400).json({ error: "Ação inválida." });
    } catch (error) {
        if (error.code === "23505")
            return res.status(409).json({
                error: "Esta consulta online já está registrada ou vinculada."
            });
        if (error.code === "23503")
            return res
                .status(400)
                .json({ error: "Paciente ou consulta não encontrado." });
        return res.status(error.status || 503).json({
            error: error.status
                ? error.message
                : "Não foi possível acessar os dados. Verifique a conexão e a migração do CRM."
        });
    }
}
