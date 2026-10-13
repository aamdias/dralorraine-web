import test from "node:test";
import assert from "node:assert/strict";
import {
    patientMetrics,
    validatePatient,
    validateAppointment,
    monthsBefore,
    weekBounds,
    matchesSearch,
    money
} from "../../utils/crm/model.mjs";
const day = "2026-10-12";
const p = {
    id: "p1",
    name: "João Example",
    contact_consent: false,
    dob: "1990-10-20"
};
const appointment = {
    patient_id: "p1",
    date: "2026-02-01",
    procedure: "Consulta",
    modality: "Presencial",
    amount_cents: 35000,
    payment_method: "Pix",
    status: "Realizado",
    next_return: "2026-10-14"
};
test("LTV and visits count completed encounters only and flag unknown historical values", () => {
    const [metrics] = patientMetrics(
        [p],
        [
            appointment,
            { ...appointment, date: null, amount_cents: null },
            { ...appointment, status: "Cancelado", amount_cents: 999999 },
            { ...appointment, status: "Faltou" },
            { ...appointment, status: "Agendado", date: "2026-10-18" }
        ],
        day
    );
    assert.equal(metrics.visits, 2);
    assert.equal(metrics.ltv, 35000);
    assert.equal(metrics.unknown_values, 1);
    assert.equal(metrics.last_visit, "2026-02-01");
    assert.equal(metrics.next_return, "2026-10-14");
    assert.equal(metrics.inactive, false);
    assert.equal(metrics.birthday_month, true);
});
test("new completed visits supersede earlier return suggestions and earlier bookings resolve reminders", () => {
    const [first] = patientMetrics(
        [p],
        [
            appointment,
            { ...appointment, date: "2026-10-15", next_return: null }
        ],
        day
    );
    assert.equal(first.next_return, null);
    const [second] = patientMetrics(
        [p],
        [
            appointment,
            {
                ...appointment,
                status: "Agendado",
                date: "2026-10-13",
                next_return: null
            }
        ],
        day
    );
    assert.equal(second.next_return, null);
});
test("six-month threshold is inclusive, uses calendar months, and unknown last visits are excluded", () => {
    const [metrics] = patientMetrics(
        [p],
        [{ ...appointment, date: "2026-04-12" }],
        day
    );
    assert.equal(metrics.inactive, true);
    assert.equal(
        patientMetrics([p], [{ ...appointment, date: null }], day)[0].inactive,
        false
    );
    assert.equal(monthsBefore("2026-08-31", 6), "2026-02-28");
    assert.deepEqual(weekBounds("2026-10-18"), ["2026-10-12", "2026-10-18"]);
});
test("referrals, accented search and centavos are preserved", () => {
    const rows = patientMetrics([p, { id: "p2", referred_by: "p1" }], [], day);
    assert.equal(rows[0].referrals, 1);
    assert.equal(matchesSearch(p, "joao"), true);
    assert.match(money(35050), /350,50/);
});
test("patient validation requires explicit consent and rejects invalid or future birthdays", () => {
    assert.throws(() => validatePatient({ name: "Example" }, day));
    assert.throws(() => validatePatient({ ...p, dob: "2026-02-30" }, day));
    assert.throws(() => validatePatient({ ...p, dob: "2027-01-01" }, day));
    assert.equal(
        validatePatient({ ...p, email: " TEST@EXAMPLE.TEST " }, day).email,
        "test@example.test"
    );
});
test("historical dates and amounts may be unknown; scheduled dates and sane values are required", () => {
    assert.equal(
        validateAppointment(
            { ...appointment, date: null, amount_cents: null },
            day
        ).date,
        null
    );
    assert.throws(() =>
        validateAppointment(
            { ...appointment, date: null, status: "Agendado" },
            day
        )
    );
    for (const value of [-1, 1.1, Infinity, "35000"])
        assert.throws(() =>
            validateAppointment({ ...appointment, amount_cents: value }, day)
        );
    assert.throws(() =>
        validateAppointment({ ...appointment, date: "2026-10-13" }, day)
    );
    assert.throws(() =>
        validateAppointment({ ...appointment, next_return: "2026-01-01" }, day)
    );
});
