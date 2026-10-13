import { randomUUID } from "node:crypto";
import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import path from "node:path";
import { sql } from "@vercel/postgres";
import { isDemo } from "./runtime.mjs";
import {
    validatePatient,
    validateAppointment,
    ValidationError
} from "./model.mjs";

const demoPath = () => path.join(process.cwd(), ".crm-demo", "state.json");
const serialize = (value) => JSON.parse(JSON.stringify(value));
function failure(message, status = 409) {
    const error = new Error(message);
    error.status = status;
    return error;
}
async function demoRead() {
    const state = JSON.parse(await readFile(demoPath(), "utf8"));
    if (state.demo !== true) throw new Error("Invalid demo store.");
    return state;
}
async function demoWrite(callback) {
    const prior = globalThis.__crmDemoQueue || Promise.resolve();
    const current = prior
        .catch(() => {})
        .then(async () => {
            const state = await demoRead();
            const result = await callback(state);
            await mkdir(path.dirname(demoPath()), {
                recursive: true,
                mode: 0o700
            });
            const temporary = `${demoPath()}.${randomUUID()}.tmp`;
            await writeFile(temporary, JSON.stringify(state, null, 2), {
                mode: 0o600
            });
            await rename(temporary, demoPath());
            return result;
        });
    globalThis.__crmDemoQueue = current;
    return current;
}
export function createStore({
    connect = () => sql.connect(),
    demo = isDemo
} = {}) {
    async function transaction(callback) {
        const client = await connect();
        try {
            await client.query("BEGIN");
            const result = await callback(client);
            await client.query("COMMIT");
            return result;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
    async function audit(client, actor, action, entity, id) {
        await client.query(
            "INSERT INTO crm_audit(actor,action,entity_type,entity_id) VALUES($1,$2,$3,$4)",
            [actor, action, entity, id || null]
        );
    }
    function demoAudit(state, actor, action, entity, id) {
        state.audit.push({
            id: randomUUID(),
            actor,
            action,
            entity_type: entity,
            entity_id: id || null,
            created_at: new Date().toISOString()
        });
    }
    function summaryIntake(row) {
        const {
            id,
            name,
            email,
            phone,
            created_at,
            status,
            payment_status,
            payment_paid_at,
            paid_at,
            scheduling_status,
            scheduled_at,
            patient_id,
            appointment_id
        } = row;
        return {
            id,
            name,
            email,
            phone,
            created_at,
            status,
            payment_status,
            payment_paid_at: payment_paid_at || paid_at || null,
            scheduling_status,
            scheduled_at: scheduled_at || null,
            patient_id: patient_id || null,
            appointment_id: appointment_id || null
        };
    }
    async function snapshot(actor) {
        if (demo()) {
            const s = await demoRead();
            return {
                demo: true,
                patients: s.patients,
                appointments: s.appointments,
                intakes: s.intakes.map((i) =>
                    summaryIntake({
                        ...i,
                        appointment_id: s.appointments.find(
                            (a) => a.source_consultation_id === i.id
                        )?.id
                    })
                )
            };
        }
        return transaction(async (client) => {
            const patients = await client.query(
                "SELECT *,dob::text AS dob FROM crm_patients ORDER BY name"
            );
            const appointments = await client.query(
                "SELECT *,date::text AS date,next_return::text AS next_return FROM crm_appointments ORDER BY crm_appointments.date DESC NULLS LAST"
            );
            const intakes = await client.query(
                "SELECT c.id,c.name,c.email,c.phone,c.created_at,c.status,c.payment_status,c.payment_paid_at,c.paid_at,c.scheduling_status,c.scheduled_at,l.patient_id,a.id AS appointment_id FROM consultations c LEFT JOIN crm_intake_links l ON l.consultation_id=c.id LEFT JOIN crm_appointments a ON a.source_consultation_id=c.id ORDER BY c.created_at DESC"
            );
            await audit(client, actor, "view", "workspace", null);
            return serialize({
                demo: false,
                patients: patients.rows,
                appointments: appointments.rows,
                intakes: intakes.rows.map(summaryIntake)
            });
        });
    }
    function assertReferral(patients, record, id) {
        let parent = record.referred_by;
        const visited = new Set([id]);
        while (parent) {
            if (visited.has(parent))
                throw new ValidationError(
                    "A indicação não pode formar um ciclo."
                );
            visited.add(parent);
            const patient = patients.find((p) => p.id === parent);
            if (!patient)
                throw new ValidationError("Paciente indicador não encontrado.");
            parent = patient.referred_by;
        }
    }
    function assertVersion(existing, expected) {
        if (!existing) throw failure("Registro não encontrado.", 404);
        if (!expected || existing.revision !== expected)
            throw failure(
                "Este registro mudou. Atualize a página antes de salvar."
            );
    }
    async function savePatient(input, actor, id = null, expected = null) {
        const record = validatePatient(input);
        const target = id || randomUUID();
        if (demo())
            return demoWrite((s) => {
                const old = s.patients.find((p) => p.id === target);
                if (id) assertVersion(old, expected);
                assertReferral(s.patients, record, target);
                const now = new Date().toISOString();
                const row = {
                    ...old,
                    ...record,
                    id: target,
                    created_at: old?.created_at || now,
                    updated_at: now,
                    revision: (old?.revision || 0) + 1,
                    consent_updated_at:
                        old && old.contact_consent === record.contact_consent
                            ? old.consent_updated_at
                            : now
                };
                if (old) s.patients[s.patients.indexOf(old)] = row;
                else s.patients.push(row);
                demoAudit(
                    s,
                    actor,
                    id ? "update" : "create",
                    "patient",
                    target
                );
                return { id: target };
            });
        return transaction(async (client) => {
            // Lock identities in a deterministic order so concurrent referrals cannot create cycles.
            const { rows } = await client.query(
                "SELECT id,referred_by,revision FROM crm_patients ORDER BY id FOR UPDATE"
            );
            if (id)
                assertVersion(
                    rows.find((p) => p.id === id),
                    expected
                );
            assertReferral(rows, record, target);
            const values = [
                target,
                record.name,
                record.phone,
                record.email,
                record.instagram,
                record.dob,
                record.source,
                record.referred_by,
                record.contact_consent
            ];
            if (id)
                await client.query(
                    "UPDATE crm_patients SET name=$2,phone=$3,email=$4,instagram=$5,dob=$6,source=$7,referred_by=$8,consent_updated_at=CASE WHEN contact_consent IS DISTINCT FROM $9 THEN now() ELSE consent_updated_at END,contact_consent=$9,revision=revision+1,updated_at=clock_timestamp() WHERE id=$1",
                    values
                );
            else
                await client.query(
                    "INSERT INTO crm_patients(id,name,phone,email,instagram,dob,source,referred_by,contact_consent) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
                    values
                );
            await audit(
                client,
                actor,
                id ? "update" : "create",
                "patient",
                target
            );
            return { id: target };
        });
    }
    async function saveAppointment(input, actor, id = null, expected = null) {
        const record = validateAppointment(input);
        const target = id || randomUUID();
        const source =
            input.source_consultation_id == null
                ? null
                : Number(input.source_consultation_id);
        if (source && record.modality !== "Online")
            throw new ValidationError(
                "Uma consulta do site deve ser registrada como atendimento online."
            );
        if (source !== null && (!Number.isSafeInteger(source) || source <= 0))
            throw new ValidationError("Consulta online inválida.");
        if (demo())
            return demoWrite((s) => {
                const old = s.appointments.find((a) => a.id === target);
                if (id) assertVersion(old, expected);
                if (!s.patients.some((p) => p.id === record.patient_id))
                    throw new ValidationError("Paciente não encontrado.");
                if (
                    source &&
                    (!s.intakes.some(
                        (i) =>
                            i.id === source &&
                            i.patient_id === record.patient_id
                    ) ||
                        s.appointments.some(
                            (a) =>
                                a.source_consultation_id === source &&
                                a.id !== target
                        ))
                )
                    throw failure(
                        "Consulta online já registrada ou vínculo inválido."
                    );
                if (
                    old?.source_consultation_id &&
                    (old.source_consultation_id !== source ||
                        old.patient_id !== record.patient_id)
                )
                    throw failure(
                        "O vínculo da consulta online não pode ser alterado."
                    );
                const now = new Date().toISOString();
                const row = {
                    ...old,
                    ...record,
                    id: target,
                    source_consultation_id: source,
                    created_at: old?.created_at || now,
                    updated_at: now,
                    revision: (old?.revision || 0) + 1
                };
                if (old) s.appointments[s.appointments.indexOf(old)] = row;
                else s.appointments.push(row);
                demoAudit(
                    s,
                    actor,
                    id ? "update" : "create",
                    "appointment",
                    target
                );
                return { id: target };
            });
        return transaction(async (client) => {
            const old = id
                ? (
                      await client.query(
                          "SELECT * FROM crm_appointments WHERE id=$1 FOR UPDATE",
                          [id]
                      )
                  ).rows[0]
                : null;
            if (id) assertVersion(old, expected);
            if (
                old?.source_consultation_id &&
                (old.source_consultation_id !== source ||
                    old.patient_id !== record.patient_id)
            )
                throw failure(
                    "O vínculo da consulta online não pode ser alterado."
                );
            if (
                !(
                    await client.query(
                        "SELECT id FROM crm_patients WHERE id=$1",
                        [record.patient_id]
                    )
                ).rowCount
            )
                throw new ValidationError("Paciente não encontrado.");
            if (
                source &&
                !(
                    await client.query(
                        "SELECT patient_id FROM crm_intake_links WHERE consultation_id=$1 AND patient_id=$2 FOR UPDATE",
                        [source, record.patient_id]
                    )
                ).rowCount
            )
                throw new ValidationError(
                    "Vincule a consulta online ao paciente primeiro."
                );
            const values = [
                target,
                record.patient_id,
                record.date,
                record.procedure,
                record.modality,
                record.amount_cents,
                record.payment_method,
                record.status,
                record.next_return,
                source
            ];
            if (id)
                await client.query(
                    "UPDATE crm_appointments SET patient_id=$2,date=$3,procedure=$4,modality=$5,amount_cents=$6,payment_method=$7,status=$8,next_return=$9,source_consultation_id=$10,revision=revision+1,updated_at=clock_timestamp() WHERE id=$1",
                    values
                );
            else
                await client.query(
                    "INSERT INTO crm_appointments(id,patient_id,date,procedure,modality,amount_cents,payment_method,status,next_return,source_consultation_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
                    values
                );
            await audit(
                client,
                actor,
                id ? "update" : "create",
                "appointment",
                target
            );
            return { id: target };
        });
    }
    async function intakeDetails(id, actor) {
        if (demo())
            return demoWrite((s) => {
                const row = s.intakes.find((i) => i.id === id);
                if (!row) throw failure("Consulta não encontrada.", 404);
                demoAudit(s, actor, "view", "intake", String(id));
                return row;
            });
        return transaction(async (client) => {
            const { rows } = await client.query(
                "SELECT c.*,c.dob::text AS dob,l.patient_id FROM consultations c LEFT JOIN crm_intake_links l ON l.consultation_id=c.id WHERE c.id=$1",
                [id]
            );
            if (!rows[0]) throw failure("Consulta não encontrada.", 404);
            await audit(client, actor, "view", "intake", String(id));
            const {
                payment_metadata,
                scheduling_metadata,
                hotmart_transaction_id,
                ...record
            } = rows[0];
            return serialize(record);
        });
    }
    async function linkIntake(id, patientId, actor) {
        if (demo())
            return demoWrite((s) => {
                const row = s.intakes.find((i) => i.id === id);
                if (!row) throw failure("Consulta não encontrada.", 404);
                if (row.patient_id)
                    throw failure("Esta consulta já está vinculada.");
                if (!s.patients.some((p) => p.id === patientId))
                    throw new ValidationError("Paciente não encontrado.");
                row.patient_id = patientId;
                demoAudit(s, actor, "link", "intake", String(id));
                return { id };
            });
        return transaction(async (client) => {
            await client.query(
                "INSERT INTO crm_intake_links(consultation_id,patient_id) VALUES($1,$2)",
                [id, patientId]
            );
            await audit(client, actor, "link", "intake", String(id));
            return { id };
        });
    }
    async function recordAccess(actor, action) {
        if (demo())
            return demoWrite((s) =>
                demoAudit(s, actor, action, "session", null)
            );
        return transaction((client) =>
            audit(client, actor, action, "session", null)
        );
    }

    return {
        snapshot,
        savePatient,
        saveAppointment,
        intakeDetails,
        linkIntake,
        recordAccess
    };
}
export const {
    snapshot,
    savePatient,
    saveAppointment,
    intakeDetails,
    linkIntake,
    recordAccess
} = createStore();
