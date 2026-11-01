import { randomUUID } from "node:crypto";
import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import path from "node:path";
import { sql } from "@vercel/postgres";
import { isDemo } from "./runtime.mjs";
import {
    validateProduct,
    validatePurchase,
    validatePrescription,
    validateUsage,
    quantity
} from "./care.mjs";
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
                products: (s.products || []).map(({ image, ...p }) => ({
                    ...p,
                    has_image: Boolean(image)
                })),
                purchases: s.purchases || [],
                usages: s.usages || [],
                prescriptions: (s.prescriptions || []).map(
                    ({ items, conduct, ...row }) => row
                ),
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
            const products = await client.query(
                "SELECT id,name,brand,unit,image_source,revision,created_at,updated_at,(image IS NOT NULL) AS has_image FROM crm_products ORDER BY name"
            );
            const purchases = await client.query(
                "SELECT *,quantity::float8 AS quantity,purchased_on::text AS purchased_on,expires_on::text AS expires_on FROM crm_purchases ORDER BY crm_purchases.purchased_on,id"
            );
            const usages = await client.query(
                "SELECT *,quantity::float8 AS quantity FROM crm_product_usages ORDER BY id"
            );
            const prescriptions = await client.query(
                "SELECT id,appointment_id,patient_id,patient_name,date::text AS date,title,doctor,registration,qualification,created_at,created_by FROM crm_prescriptions ORDER BY created_at DESC"
            );
            return serialize({
                demo: false,
                patients: patients.rows,
                appointments: appointments.rows,
                products: products.rows,
                purchases: purchases.rows,
                usages: usages.rows,
                prescriptions: prescriptions.rows,
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
        const requestedUsage =
            input.usages === undefined ? null : validateUsage(input.usages);
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
                const issued = (s.prescriptions || []).some(
                    (r) => r.appointment_id === target
                );
                if (
                    issued &&
                    (record.patient_id !== old.patient_id ||
                        record.status !== "Realizado")
                )
                    throw failure(
                        "Atendimento com receita emitida deve manter o paciente e o status Realizado."
                    );
                const usages = buildUsages(
                    requestedUsage ||
                        (s.usages || []).filter(
                            (u) => u.appointment_id === target
                        ),
                    s.purchases || [],
                    s.usages || [],
                    target,
                    record
                );
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
                s.usages = [
                    ...(s.usages || []).filter(
                        (u) => u.appointment_id !== target
                    ),
                    ...usages
                ];
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
            const issued = await client.query(
                "SELECT id FROM crm_prescriptions WHERE appointment_id=$1 LIMIT 1",
                [target]
            );
            if (
                issued.rowCount &&
                (record.patient_id !== old.patient_id ||
                    record.status !== "Realizado")
            )
                throw failure(
                    "Atendimento com receita emitida deve manter o paciente e o status Realizado."
                );
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
            // Serialize consumption against purchases to prevent concurrent stock overdrafts.
            const lots = await client.query(
                "SELECT *,quantity::float8 AS quantity,purchased_on::text AS purchased_on,expires_on::text AS expires_on FROM crm_purchases ORDER BY id FOR UPDATE"
            );
            const previous = await client.query(
                "SELECT *,quantity::float8 AS quantity FROM crm_product_usages"
            );
            const usages = buildUsages(
                requestedUsage ||
                    previous.rows.filter((u) => u.appointment_id === target),
                lots.rows,
                previous.rows,
                target,
                record
            );
            await client.query(
                "DELETE FROM crm_product_usages WHERE appointment_id=$1",
                [target]
            );
            for (const u of usages)
                await client.query(
                    "INSERT INTO crm_product_usages(id,appointment_id,purchase_id,quantity,cost_cents) VALUES($1,$2,$3,$4,$5)",
                    [u.id, target, u.purchase_id, u.quantity, u.cost_cents]
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
    function buildUsages(
        requested,
        purchases,
        previous,
        appointmentId,
        appointment
    ) {
        if (
            requested.length &&
            (appointment.status !== "Realizado" || !appointment.date)
        )
            throw new ValidationError(
                "Consumo exige atendimento Realizado com data. Remova o consumo para alterar o status."
            );
        return requested.map((item) => {
            const lot = purchases.find((l) => l.id === item.purchase_id);
            if (!lot) throw new ValidationError("Lote não encontrado.");
            if (
                lot.purchased_on > appointment.date ||
                (lot.expires_on && lot.expires_on < appointment.date)
            )
                throw new ValidationError(
                    "O lote precisa estar comprado e válido na data do atendimento."
                );
            const used = previous
                .filter(
                    (u) =>
                        u.purchase_id === lot.id &&
                        u.appointment_id !== appointmentId
                )
                .reduce((n, u) => n + Number(u.quantity), 0);
            if (quantity(used + item.quantity) > Number(lot.quantity))
                throw failure(
                    "Estoque insuficiente neste lote. Confira o saldo atualizado."
                );
            const priorCost = previous
                .filter(
                    (u) =>
                        u.purchase_id === lot.id &&
                        u.appointment_id !== appointmentId
                )
                .reduce((n, u) => n + u.cost_cents, 0);
            const cost = Math.min(
                lot.cost_cents - priorCost,
                Math.max(
                    0,
                    Math.round(
                        ((used + item.quantity) * lot.cost_cents) /
                            Number(lot.quantity)
                    ) - priorCost
                )
            );
            return {
                id: randomUUID(),
                appointment_id: appointmentId,
                purchase_id: item.purchase_id,
                quantity: item.quantity,
                cost_cents: cost
            };
        });
    }
    async function saveProduct(input, actor, id = null, expected = null) {
        const record = validateProduct(input),
            target = id || randomUUID();
        if (demo())
            return demoWrite((s) => {
                s.products ||= [];
                const old = s.products.find((p) => p.id === target);
                if (id) assertVersion(old, expected);
                if (
                    old &&
                    old.unit !== record.unit &&
                    (s.purchases || []).some((p) => p.product_id === target)
                )
                    throw failure("A unidade não pode mudar após uma compra.");
                const row = {
                    ...record,
                    id: target,
                    revision: (old?.revision || 0) + 1
                };
                if (old) s.products[s.products.indexOf(old)] = row;
                else s.products.push(row);
                demoAudit(
                    s,
                    actor,
                    id ? "update" : "create",
                    "product",
                    target
                );
                return { id: target };
            });
        return transaction(async (client) => {
            const old = (
                await client.query(
                    "SELECT * FROM crm_products WHERE id=$1 FOR UPDATE",
                    [target]
                )
            ).rows[0];
            if (id) assertVersion(old, expected);
            if (
                old &&
                old.unit !== record.unit &&
                (
                    await client.query(
                        "SELECT id FROM crm_purchases WHERE product_id=$1 LIMIT 1",
                        [target]
                    )
                ).rowCount
            )
                throw failure("A unidade não pode mudar após uma compra.");
            const values = [
                target,
                record.name,
                record.brand,
                record.unit,
                record.image,
                record.image_source
            ];
            await client.query(
                id
                    ? "UPDATE crm_products SET name=$2,brand=$3,unit=$4,image=$5,image_source=$6,revision=revision+1,updated_at=now() WHERE id=$1"
                    : "INSERT INTO crm_products(id,name,brand,unit,image,image_source) VALUES($1,$2,$3,$4,$5,$6)",
                values
            );
            await audit(
                client,
                actor,
                id ? "update" : "create",
                "product",
                target
            );
            return { id: target };
        });
    }
    async function productDetails(id, actor) {
        if (demo())
            return demoWrite((s) => {
                const row = (s.products || []).find((p) => p.id === id);
                if (!row) throw failure("Produto não encontrado.", 404);
                demoAudit(s, actor, "view", "product", id);
                return row;
            });
        return transaction(async (client) => {
            const row = (
                await client.query("SELECT * FROM crm_products WHERE id=$1", [
                    id
                ])
            ).rows[0];
            if (!row) throw failure("Produto não encontrado.", 404);
            await audit(client, actor, "view", "product", id);
            return serialize(row);
        });
    }
    async function savePurchase(input, actor) {
        const record = validatePurchase(input),
            id = randomUUID();
        if (demo())
            return demoWrite((s) => {
                if (!(s.products || []).some((p) => p.id === record.product_id))
                    throw new ValidationError("Produto não encontrado.");
                s.purchases ||= [];
                s.purchases.push({ ...record, id });
                demoAudit(s, actor, "create", "purchase", id);
                return { id };
            });
        return transaction(async (client) => {
            if (
                !(
                    await client.query(
                        "SELECT id FROM crm_products WHERE id=$1 FOR UPDATE",
                        [record.product_id]
                    )
                ).rowCount
            )
                throw new ValidationError("Produto não encontrado.");
            await client.query(
                "INSERT INTO crm_purchases(id,product_id,quantity,cost_cents,purchased_on,expires_on,lot) VALUES($1,$2,$3,$4,$5,$6,$7)",
                [
                    id,
                    record.product_id,
                    record.quantity,
                    record.cost_cents,
                    record.purchased_on,
                    record.expires_on,
                    record.lot
                ]
            );
            await audit(client, actor, "create", "purchase", id);
            return { id };
        });
    }
    function prescriptionRow(record, appointment, patient, actor, id) {
        if (!appointment || appointment.status !== "Realizado")
            throw new ValidationError(
                "A receita exige um atendimento realizado."
            );
        if (appointment.date && record.date < appointment.date)
            throw new ValidationError(
                "A emissão não pode ser anterior ao atendimento."
            );
        return {
            ...record,
            id,
            patient_id: patient.id,
            patient_name: patient.name,
            created_by: actor,
            created_at: new Date().toISOString()
        };
    }
    async function savePrescription(input, actor) {
        const record = validatePrescription(input),
            id = randomUUID();
        if (demo())
            return demoWrite((s) => {
                const appointment = s.appointments.find(
                    (a) => a.id === record.appointment_id
                );
                const patient = s.patients.find(
                    (p) => p.id === appointment?.patient_id
                );
                const row = prescriptionRow(
                    record,
                    appointment,
                    patient,
                    actor,
                    id
                );
                s.prescriptions ||= [];
                s.prescriptions.push(row);
                demoAudit(s, actor, "create", "prescription", id);
                return { id };
            });
        return transaction(async (client) => {
            const a = (
                await client.query(
                    "SELECT *,date::text AS date FROM crm_appointments WHERE id=$1 FOR UPDATE",
                    [record.appointment_id]
                )
            ).rows[0];
            const p =
                a &&
                (
                    await client.query(
                        "SELECT * FROM crm_patients WHERE id=$1",
                        [a.patient_id]
                    )
                ).rows[0];
            const r = prescriptionRow(record, a, p, actor, id);
            await client.query(
                "INSERT INTO crm_prescriptions(id,appointment_id,patient_id,patient_name,date,title,conduct,doctor,registration,qualification,items,created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12)",
                [
                    id,
                    r.appointment_id,
                    r.patient_id,
                    r.patient_name,
                    r.date,
                    r.title,
                    r.conduct,
                    r.doctor,
                    r.registration,
                    r.qualification,
                    JSON.stringify(r.items),
                    actor
                ]
            );
            await audit(client, actor, "create", "prescription", id);
            return { id };
        });
    }
    async function prescriptionDetails(id, actor) {
        if (demo())
            return demoWrite((s) => {
                const row = (s.prescriptions || []).find((r) => r.id === id);
                if (!row) throw failure("Receita não encontrada.", 404);
                demoAudit(s, actor, "view", "prescription", id);
                return row;
            });
        return transaction(async (client) => {
            const r = (
                await client.query(
                    "SELECT *,date::text AS date FROM crm_prescriptions WHERE id=$1",
                    [id]
                )
            ).rows[0];
            if (!r) throw failure("Receita não encontrada.", 404);
            await audit(client, actor, "view", "prescription", id);
            return serialize(r);
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
        saveProduct,
        savePurchase,
        savePrescription,
        prescriptionDetails,
        productDetails,
        intakeDetails,
        linkIntake,
        recordAccess
    };
}
export const {
    snapshot,
    savePatient,
    saveAppointment,
    saveProduct,
    savePurchase,
    savePrescription,
    prescriptionDetails,
    productDetails,
    intakeDetails,
    linkIntake,
    recordAccess
} = createStore();
