import { addDays, today, monthsBefore } from "./model.mjs";
export function createSeed(day = today()) {
    const names = [
        "Marina Oliveira",
        "Beatriz Costa",
        "Camila Ferreira",
        "Helena Martins",
        "Isabela Santos",
        "Juliana Ribeiro",
        "Larissa Almeida",
        "Luiza Carvalho",
        "Manuela Rodrigues",
        "Natália Pereira",
        "Paula Mendes",
        "Renata Lima",
        "Sofia Barbosa",
        "Valentina Rocha",
        "Vitória Azevedo",
        "Ana Clara Freitas",
        "Clara Monteiro",
        "Gabriela Dias"
    ];
    const patients = names.map((name, i) => ({
        id: `demo-p-${i + 1}`,
        name,
        phone: null,
        email: `paciente${i + 1}@example.test`,
        instagram: `@paciente_demo_${i + 1}`,
        dob: `${1983 + (i % 17)}-${
            i % 3 === 0
                ? day.slice(5, 7)
                : String((i % 12) + 1).padStart(2, "0")
        }-${String(3 + i).padStart(2, "0")}`,
        source: ["Indicação", "Instagram", "Google", "Convênio"][i % 4],
        referred_by:
            i % 4 === 0 && i > 0 ? "demo-p-1" : i % 5 === 0 ? "demo-p-3" : null,
        contact_consent: i % 5 !== 1,
        created_at: `${monthsBefore(day, 14)}T12:00:00Z`,
        updated_at: `${day}T12:00:00Z`
    }));
    const appointments = [];
    patients.forEach((p, i) => {
        const count = 1 + (i % 4);
        for (let j = 0; j < count; j++) {
            const date =
                i % 5 === 0
                    ? monthsBefore(day, 8 + j * 4)
                    : addDays(day, -(2 + (i % 9) + j * 85));
            appointments.push({
                id: `demo-a-${i}-${j}`,
                patient_id: p.id,
                date,
                procedure: [
                    "Consulta",
                    "Toxina",
                    "Preenchimento",
                    "Bioestimulador",
                    "Laser",
                    "Peeling"
                ][(i + j) % 6],
                modality: i % 6 === 0 ? "Online" : "Presencial",
                amount_cents:
                    j === 0 && i === 7
                        ? null
                        : [35000, 120000, 180000, 240000, 75000, 45000][
                              (i + j) % 6
                          ],
                payment_method: ["Pix", "Crédito", "Débito"][i % 3],
                status: "Realizado",
                next_return:
                    j === 0 && i % 5 !== 0
                        ? addDays(day, [-5, 0, 1, 2, 3, 5, 12, 25][i % 8])
                        : null
            });
        }
    });
    [1, 3, 7, 9, 11].forEach((i, k) =>
        appointments.push({
            id: `demo-future-${i}`,
            patient_id: patients[i].id,
            date: addDays(day, k < 3 ? 0 : k),
            procedure: [
                "Toxina",
                "Consulta",
                "Retorno",
                "Laser",
                "Bioestimulador"
            ][k],
            modality: k === 1 ? "Online" : "Presencial",
            amount_cents: k === 2 ? 0 : [120000, 35000, 0, 75000, 240000][k],
            payment_method: "Não informado",
            status: "Agendado",
            next_return: null
        })
    );
    appointments.push({
        id: "demo-missed",
        patient_id: patients[4].id,
        date: addDays(day, -12),
        procedure: "Consulta",
        modality: "Presencial",
        amount_cents: 35000,
        payment_method: "Não informado",
        status: "Faltou",
        next_return: null
    });
    appointments.push({
        id: "demo-canceled",
        patient_id: patients[2].id,
        date: addDays(day, -15),
        procedure: "Laser",
        modality: "Presencial",
        amount_cents: 75000,
        payment_method: "Não informado",
        status: "Cancelado",
        next_return: null
    });
    const intakes = [0, 4, 10].map((i, k) => ({
        id: 9001 + k,
        name: patients[i].name,
        email: patients[i].email,
        phone: null,
        dob: patients[i].dob,
        city: "São Paulo",
        created_at: `${addDays(day, -k - 1)}T15:00:00Z`,
        status: k === 0 ? "scheduled" : k === 1 ? "paid" : "pending_payment",
        payment_status: k < 2 ? "paid" : "pending",
        payment_paid_at: k < 2 ? `${addDays(day, -k - 1)}T15:00:00Z` : null,
        scheduling_status: k === 0 ? "scheduled" : "pending",
        scheduled_at: k === 0 ? `${addDays(day, 2)}T17:00:00Z` : null,
        main_concern:
            "Exemplo fictício de solicitação de avaliação dermatológica.",
        concern_duration: "Há alguns meses",
        prior_treatments: null,
        allergies: null,
        medications: null,
        conditions: null,
        skin_type: null,
        photos: [],
        admin_notes: null,
        consent_telemedicine: true,
        consent_lgpd: true,
        consent_terms: true,
        patient_id: null
    }));
    appointments.forEach((a) => {
        a.revision = 1;
        a.created_at = `${day}T12:00:00Z`;
        a.updated_at = `${day}T12:00:00Z`;
    });
    patients.forEach((p, i) => {
        p.revision = 1;
        p.consent_updated_at = p.created_at;
        p.phone = `(11) 00000-${String(1000 + i).padStart(4, "0")}`;
    });
    return {
        version: 1,
        demo: true,
        seeded_on: day,
        patients,
        appointments,
        intakes,
        audit: []
    };
}
