import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { createStore } from "../../utils/crm/store.mjs";
test("Postgres migration and CRM writes preserve history, consent, audit records and explicit online links", async () => {
    const db = new PGlite();
    const root = new URL("../../scripts/migrations/", import.meta.url);
    try {
        for (const file of [
            "001_consultations.sql",
            "002_provider_neutral_payment_scheduling.sql",
            "003_crm.sql"
        ])
            await db.exec(await readFile(new URL(file, root), "utf8"));
        await db.exec(await readFile(new URL("003_crm.sql", root), "utf8"));
        const store = createStore({
            demo: () => false,
            connect: async () => ({
                query: async (text, values) => {
                    const result = await db.query(text, values);
                    return {
                        rows: result.rows,
                        rowCount: Math.max(
                            result.affectedRows || 0,
                            result.rows.length
                        )
                    };
                },
                release: () => {}
            })
        });
        const actor = "owner@example.test";
        const base = {
            name: "Example Person",
            phone: null,
            email: "example@example.test",
            instagram: null,
            dob: null,
            source: "Indicação",
            referred_by: null,
            contact_consent: false
        };
        const one = await store.savePatient(base, actor),
            two = await store.savePatient(
                { ...base, name: "Second Example", referred_by: one.id },
                actor
            );
        let state = await store.snapshot(actor);
        assert.equal(state.patients.length, 2);
        const original = state.patients.find((p) => p.id === one.id);
        await assert.rejects(
            () =>
                store.savePatient(
                    { ...base, referred_by: two.id },
                    actor,
                    one.id,
                    original.revision
                ),
            /ciclo/
        );
        await store.savePatient(
            { ...base, contact_consent: true },
            actor,
            one.id,
            original.revision
        );
        await assert.rejects(
            () => store.savePatient(base, actor, one.id, original.revision),
            (e) => e.status === 409
        );
        const a = await store.saveAppointment(
            {
                patient_id: one.id,
                date: "2026-01-02",
                procedure: "Toxina",
                modality: "Presencial",
                amount_cents: 120050,
                payment_method: "Pix",
                status: "Realizado",
                next_return: "2026-10-14"
            },
            actor
        );
        await store.saveAppointment(
            {
                patient_id: one.id,
                date: null,
                procedure: "Consulta",
                modality: "Presencial",
                amount_cents: null,
                payment_method: "Não informado",
                status: "Realizado",
                next_return: null
            },
            actor
        );
        await db.query(
            "INSERT INTO consultations(name,email,consent_telemedicine,consent_lgpd,consent_terms) VALUES($1,$2,true,true,true)",
            [base.name, base.email]
        );
        await store.linkIntake(1, one.id, actor);
        await assert.rejects(() => store.linkIntake(1, two.id, actor));
        const online = {
            patient_id: one.id,
            date: "2026-01-03",
            procedure: "Consulta",
            modality: "Online",
            amount_cents: null,
            payment_method: "Não informado",
            status: "Realizado",
            next_return: null,
            source_consultation_id: 1
        };
        const registered = await store.saveAppointment(online, actor);
        await assert.rejects(() => store.saveAppointment(online, actor));
        state = await store.snapshot(actor);
        const saved = state.appointments.find((row) => row.id === a.id);
        assert.equal(saved.amount_cents, 120050);
        assert.equal(saved.date, "2026-01-02");
        assert.equal(state.intakes[0].patient_id, one.id);
        assert.equal(state.intakes[0].appointment_id, registered.id);
        assert.equal(state.intakes[0].payment_status, "pending");
        assert.equal(state.intakes[0].main_concern, undefined);
        const detail = await store.intakeDetails(1, actor);
        assert.equal(detail.consent_lgpd, true);
        assert.equal(detail.payment_metadata, undefined);
        const linkedAppointment = state.appointments.find(
            (row) => row.id === registered.id
        );
        await assert.rejects(
            () =>
                store.saveAppointment(
                    { ...online, patient_id: two.id },
                    actor,
                    registered.id,
                    linkedAppointment.revision
                ),
            /vínculo/
        );
        assert.ok(
            (await db.query("SELECT action FROM crm_audit WHERE action='link'"))
                .rows.length === 1
        );
        assert.ok(
            (await db.query("SELECT * FROM crm_audit WHERE action='update'"))
                .rows.length === 1
        );
        const rls = await db.query(
            "SELECT relrowsecurity FROM pg_class WHERE relname='crm_patients'"
        );
        assert.equal(rls.rows[0].relrowsecurity, true);
    } finally {
        await db.close();
    }
});
