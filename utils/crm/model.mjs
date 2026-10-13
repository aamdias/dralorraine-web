export const PROCEDURES = [
    "Consulta",
    "Toxina",
    "Preenchimento",
    "Bioestimulador",
    "Laser",
    "Peeling",
    "Cirurgia",
    "Retorno"
];
export const STATUSES = ["Agendado", "Realizado", "Faltou", "Cancelado"];
export const SOURCES = [
    "Indicação",
    "Instagram",
    "Google",
    "Convênio",
    "Outro",
    "Não informado"
];
export const PAYMENTS = [
    "Pix",
    "Crédito",
    "Débito",
    "Dinheiro",
    "Convênio",
    "Não informado"
];
export const MODALITIES = ["Presencial", "Online"];
export const TIMEZONE = "America/Sao_Paulo";
export function today(reference = new Date()) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(reference);
}
export function addDays(day, days) {
    const date = new Date(`${day}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
}
export function monthsBefore(day, count) {
    const d = new Date(`${day}T12:00:00Z`);
    const original = d.getUTCDate();
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() - count);
    const last = new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)
    ).getUTCDate();
    d.setUTCDate(Math.min(original, last));
    return d.toISOString().slice(0, 10);
}
export function weekBounds(day) {
    const dow = new Date(`${day}T12:00:00Z`).getUTCDay();
    const start = addDays(day, -(dow === 0 ? 6 : dow - 1));
    return [start, addDays(start, 6)];
}
export function dateLabel(value, options) {
    if (!value) return "Não informado";
    return new Intl.DateTimeFormat("pt-BR", {
        timeZone: TIMEZONE,
        day: "2-digit",
        month: "short",
        year: "numeric",
        ...options
    }).format(new Date(value.length === 10 ? `${value}T12:00:00Z` : value));
}
export function money(cents) {
    return cents == null
        ? "Não informado"
        : new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: Number(cents) % 100 === 0 ? 0 : 2,
              maximumFractionDigits: 2
          }).format(cents / 100);
}
export function patientMetrics(patients, appointments, day = today()) {
    return patients.map((patient) => {
        const history = appointments.filter((a) => a.patient_id === patient.id);
        const completed = history.filter((a) => a.status === "Realizado");
        const dates = completed
            .map((a) => a.date)
            .filter(Boolean)
            .sort();
        const lastVisit = dates.at(-1) || null;
        // A newer completed visit supersedes old reminders; reminders on the same day remain visible.
        const suggested = completed
            .filter(
                (a) =>
                    a.next_return && (!lastVisit || a.next_return >= lastVisit)
            )
            .map((a) => a.next_return)
            .sort();
        const upcoming = history
            .filter((a) => a.status === "Agendado" && a.date >= day)
            .map((a) => a.date)
            .sort();
        const nextReturn =
            suggested.find(
                (value) => !upcoming.some((booked) => booked <= value)
            ) || null;
        return {
            ...patient,
            visits: completed.length,
            last_visit: lastVisit,
            ltv: completed.reduce(
                (total, a) => total + (a.amount_cents ?? 0),
                0
            ),
            unknown_values: completed.filter((a) => a.amount_cents == null)
                .length,
            next_return: nextReturn,
            next_appointment: upcoming[0] || null,
            referrals: patients.filter((p) => p.referred_by === patient.id)
                .length,
            inactive: Boolean(
                lastVisit &&
                    lastVisit <= monthsBefore(day, 6) &&
                    !upcoming.length
            ),
            birthday_month: patient.dob?.slice(5, 7) === day.slice(5, 7)
        };
    });
}
export function normalizeSearch(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}
export function matchesSearch(patient, query) {
    return normalizeSearch(
        [patient.name, patient.email, patient.phone, patient.instagram].join(
            " "
        )
    ).includes(normalizeSearch(query).trim());
}
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
function textField(value, max = 200) {
    if (value == null || value === "") return null;
    if (typeof value !== "string" || value.length > max)
        throw new ValidationError("Texto inválido ou muito longo.");
    return value.trim() || null;
}
function dateField(value) {
    if (!value) return null;
    if (
        typeof value !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        !Number.isFinite(Date.parse(`${value}T12:00:00Z`)) ||
        new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) !== value
    )
        throw new ValidationError("Data inválida.");
    return value;
}
function choice(value, choices) {
    if (!choices.includes(value)) throw new ValidationError("Opção inválida.");
    return value;
}
function idField(value) {
    if (!value) return null;
    if (typeof value !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(value))
        throw new ValidationError("Identificador inválido.");
    return value;
}
export function validatePatient(input, day = today()) {
    const name = textField(input.name);
    if (!name) throw new ValidationError("Informe o nome do paciente.");
    const email = textField(input.email);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        throw new ValidationError("E-mail inválido.");
    const dob = dateField(input.dob);
    if (dob && dob > day)
        throw new ValidationError("Nascimento não pode estar no futuro.");
    if (typeof input.contact_consent !== "boolean")
        throw new ValidationError("Informe o consentimento para contato.");
    return {
        name,
        email: email?.toLowerCase() || null,
        phone: textField(input.phone, 30),
        instagram: textField(input.instagram, 80),
        dob,
        source: choice(input.source || "Não informado", SOURCES),
        referred_by: idField(input.referred_by),
        contact_consent: input.contact_consent
    };
}
export function validateAppointment(input, day = today()) {
    const patient_id = idField(input.patient_id);
    if (!patient_id) throw new ValidationError("Selecione o paciente.");
    const date = dateField(input.date);
    const status = choice(input.status, STATUSES);
    if (status === "Agendado" && !date)
        throw new ValidationError("Informe a data do agendamento.");
    if (status === "Realizado" && date > day)
        throw new ValidationError(
            "Um atendimento realizado não pode estar no futuro."
        );
    const amount = input.amount_cents;
    if (
        amount !== null &&
        (!Number.isSafeInteger(amount) || amount < 0 || amount > 100000000)
    )
        throw new ValidationError("Valor inválido.");
    const next_return = dateField(input.next_return);
    if (next_return && date && next_return < date)
        throw new ValidationError(
            "O retorno não pode ser anterior ao atendimento."
        );
    return {
        patient_id,
        date,
        procedure: choice(input.procedure, PROCEDURES),
        modality: choice(input.modality, MODALITIES),
        amount_cents: amount,
        payment_method: choice(
            input.payment_method || "Não informado",
            PAYMENTS
        ),
        status,
        next_return
    };
}
