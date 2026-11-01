import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { createStore } from "../../utils/crm/store.mjs";
import {
    inventoryMetrics,
    validatePrescription,
    validatePurchase,
    validateUsage,
    imageField
} from "../../utils/crm/care.mjs";
import {
    publicImageUrl,
    isPublicImageAddress
} from "../../utils/crm/product-image.mjs";
import { prescriptionPdf } from "../../utils/crm/prescription-pdf.mjs";
import { PDFDocument } from "pdf-lib";

test("fractional lots, rollback, cost attribution and immutable patient prescriptions", async () => {
    const db = new PGlite();
    try {
        for (const file of [
            "001_consultations.sql",
            "002_provider_neutral_payment_scheduling.sql",
            "003_crm.sql",
            "004_inventory_prescriptions.sql"
        ])
            await db.exec(
                await readFile(
                    new URL(
                        `../../scripts/migrations/${file}`,
                        import.meta.url
                    ),
                    "utf8"
                )
            );
        const store = createStore({
            demo: () => false,
            connect: async () => ({
                query: async (text, values) => {
                    const r = await db.query(text, values);
                    return {
                        rows: r.rows,
                        rowCount: Math.max(r.rows.length, r.affectedRows || 0)
                    };
                },
                release: () => {}
            })
        });
        const actor = "owner@example.test";
        const patient = await store.savePatient(
            { name: "Paciente Exemplo", contact_consent: false },
            actor
        );
        const image =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=";
        const product = await store.saveProduct(
            { name: "Produto A", unit: "ml", image },
            actor
        );
        const second = await store.saveProduct(
            { name: "Produto B", unit: "dose" },
            actor
        );
        const purchase = await store.savePurchase(
            {
                product_id: product.id,
                quantity: 30,
                cost_cents: 9000,
                purchased_on: "2026-01-01",
                expires_on: "2026-12-31",
                lot: "A1"
            },
            actor
        );
        const lotB = await store.savePurchase(
            {
                product_id: second.id,
                quantity: 10,
                cost_cents: 10000,
                purchased_on: "2026-01-01"
            },
            actor
        );
        const appointment = {
            patient_id: patient.id,
            date: "2026-01-02",
            procedure: "Consulta",
            modality: "Online",
            amount_cents: 30000,
            status: "Realizado",
            usages: [
                { purchase_id: purchase.id, quantity: 2.5 },
                { purchase_id: lotB.id, quantity: 1 }
            ]
        };
        const encounter = await store.saveAppointment(appointment, actor);
        let state = await store.snapshot(actor);
        assert.equal(
            state.products.find((p) => p.id === product.id).image,
            undefined
        );
        assert.equal(
            state.products.find((p) => p.id === product.id).has_image,
            true
        );
        assert.equal(
            (await store.productDetails(product.id, actor)).image,
            image
        );
        let metrics = inventoryMetrics(
            state.products,
            state.purchases,
            state.usages,
            state.appointments
        );
        assert.equal(metrics.find((p) => p.id === product.id).stock, 27.5);
        assert.equal(
            metrics.reduce((n, p) => n + p.revenue, 0),
            30000
        );
        assert.equal(
            metrics.reduce((n, p) => n + p.consumed_cost, 0),
            1750
        );
        assert.equal(
            metrics.reduce((n, p) => n + p.contribution, 0),
            28250
        );
        await assert.rejects(
            () =>
                store.saveAppointment(
                    {
                        ...appointment,
                        usages: [{ purchase_id: purchase.id, quantity: 29 }]
                    },
                    actor
                ),
            /insuficiente/
        );
        await assert.rejects(
            () =>
                store.saveAppointment(
                    { ...appointment, status: "Agendado" },
                    actor
                ),
            /Realizado/
        );
        await assert.rejects(
            () =>
                store.saveAppointment(
                    { ...appointment, date: "2025-12-01" },
                    actor
                ),
            /comprado/
        );
        await assert.rejects(
            () =>
                store.saveAppointment(
                    {
                        ...appointment,
                        date: "2026-02-01",
                        usages: [
                            { purchase_id: purchase.id, quantity: 2.5 },
                            { purchase_id: purchase.id, quantity: 1 }
                        ]
                    },
                    actor
                ),
            /lotes/
        );
        state = await store.snapshot(actor);
        assert.equal(
            state.appointments.length,
            1,
            "failed consumption must roll back the encounter"
        );
        await assert.rejects(
            () =>
                store.saveProduct(
                    { name: "Produto A", unit: "g" },
                    actor,
                    product.id,
                    1
                ),
            /unidade/
        );
        const old = state.appointments[0];
        await store.saveAppointment(
            {
                ...appointment,
                usages: [{ purchase_id: purchase.id, quantity: 3 }]
            },
            actor,
            encounter.id,
            old.revision
        );
        await assert.rejects(
            () =>
                store.saveAppointment(
                    appointment,
                    actor,
                    encounter.id,
                    old.revision
                ),
            /mudou/
        );
        state = await store.snapshot(actor);
        assert.equal(state.usages.length, 1);
        assert.equal(state.usages[0].cost_cents, 900);
        assert.equal(
            inventoryMetrics(
                state.products,
                state.purchases,
                state.usages,
                state.appointments
            ).find((p) => p.id === product.id).stock,
            27
        );
        const rx = {
            appointment_id: encounter.id,
            date: "2026-01-02",
            title: "Plano de cuidado",
            conduct: "Orientação escrita pela médica.",
            doctor: "Médica Exemplo",
            registration: "CRM-SP 123",
            items: [
                {
                    product_id: product.id,
                    name: "Produto A",
                    instructions: "Modo de uso definido pela médica.",
                    image
                }
            ]
        };
        const savedRx = await store.savePrescription(rx, actor);
        await store.saveProduct(
            { name: "Nome atualizado", unit: "ml" },
            actor,
            product.id,
            1
        );
        const detail = await store.prescriptionDetails(savedRx.id, actor);
        assert.equal(detail.items[0].name, "Produto A");
        assert.equal(detail.items[0].image, image);
        assert.equal(detail.patient_name, "Paciente Exemplo");
        assert.equal(
            (await store.snapshot(actor)).prescriptions[0].items,
            undefined,
            "lists omit clinical payloads"
        );
        await assert.rejects(
            () =>
                store.saveAppointment(
                    { ...appointment, status: "Cancelado", usages: [] },
                    actor,
                    encounter.id,
                    2
                ),
            /receita emitida/
        );
        const disposable = await store.saveAppointment(
            {
                ...appointment,
                usages: [{ purchase_id: purchase.id, quantity: 1 }],
                amount_cents: null
            },
            actor
        );
        state = await store.snapshot(actor);
        metrics = inventoryMetrics(
            state.products,
            state.purchases,
            state.usages,
            state.appointments
        );
        assert.equal(
            metrics.find((p) => p.id === product.id).unknown_revenue,
            1
        );
        assert.equal(
            metrics.find((p) => p.id === product.id).contribution,
            29100,
            "unknown revenues do not turn into zero-revenue losses"
        );
        await store.saveAppointment(
            { ...appointment, status: "Cancelado", usages: [] },
            actor,
            disposable.id,
            1
        );
        state = await store.snapshot(actor);
        assert.equal(
            state.usages.length,
            1,
            "explicit removal restores the stock"
        );
        const pennyLot = await store.savePurchase(
            {
                product_id: product.id,
                quantity: 3,
                cost_cents: 1,
                purchased_on: "2026-01-01"
            },
            actor
        );
        for (let index = 0; index < 3; index++)
            await store.saveAppointment(
                {
                    ...appointment,
                    usages: [{ purchase_id: pennyLot.id, quantity: 1 }]
                },
                actor
            );
        const pennyState = await store.snapshot(actor);
        assert.equal(
            pennyState.usages
                .filter((u) => u.purchase_id === pennyLot.id)
                .reduce((n, u) => n + u.cost_cents, 0),
            1,
            "fully consumed fractional lots allocate exactly their purchase cost"
        );
        for (const table of [
            "crm_products",
            "crm_purchases",
            "crm_product_usages",
            "crm_prescriptions"
        ])
            assert.equal(
                (
                    await db.query(
                        "SELECT relrowsecurity FROM pg_class WHERE relname=$1",
                        [table]
                    )
                ).rows[0].relrowsecurity,
                true
            );
    } finally {
        await db.close();
    }
});

test("inputs reject invalid stock, image payloads and private image sources", () => {
    for (const ip of [
        "127.0.0.1",
        "10.0.0.2",
        "169.254.169.254",
        "192.168.0.1",
        "100.100.100.200",
        "198.18.0.1",
        "::1",
        "::ffff:127.0.0.1",
        "224.1.2.3"
    ])
        assert.equal(isPublicImageAddress(ip), false, ip);
    assert.equal(isPublicImageAddress("8.8.8.8"), true);
    for (const url of [
        "http://example.com/a.png",
        "https://127.0.0.1/a.png",
        "https://user:pass@example.com/a.png",
        "https://example.com:8080/a.png",
        "file:///etc/passwd"
    ])
        assert.throws(() => publicImageUrl(url));
    assert.throws(() => imageField("data:image/png;base64,SGVsbG8="));
    assert.throws(() =>
        validateUsage([{ purchase_id: "lot", quantity: 0.0001 }])
    );
    assert.throws(() =>
        validatePurchase({
            product_id: "product",
            quantity: 1,
            cost_cents: -1,
            purchased_on: "2026-01-01"
        })
    );
    assert.throws(() =>
        validatePrescription({
            appointment_id: "a",
            date: "2026-01-01",
            title: "Title",
            doctor: "Doctor",
            registration: "CRM 1",
            conduct: ""
        })
    );
});

test("PDF paginates long clinical directions and embeds product photographs", async () => {
    const image =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=";
    const record = {
        patient_name: "Paciente de demonstração",
        date: "2026-01-01",
        title: "Receita e plano de cuidado",
        doctor: "Dra. Exemplo",
        registration: "CRM-SP 123",
        qualification: "",
        conduct: "Orientação individualizada.\n".repeat(120),
        items: [
            {
                name: "Produto de teste",
                instructions: "Texto extenso ".repeat(140),
                image
            }
        ]
    };
    const bytes = await prescriptionPdf(record),
        pdf = await PDFDocument.load(bytes);
    assert.ok(pdf.getPageCount() >= 4);
    assert.equal(pdf.getAuthor(), "Dra. Exemplo");
    assert.ok(bytes.subarray(0, 5).equals(Buffer.from("%PDF-")));
});
