function formatDateTime(value, timeZone) {
    if (!value) return "horario nao informado";

    try {
        return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: timeZone || "America/Sao_Paulo"
        }).format(new Date(value));
    } catch (err) {
        return String(value);
    }
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseRecipients(value) {
    return String(value || "")
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean);
}

function formatConsultationPrice() {
    const amountInCents = Number(process.env.STRIPE_CONSULTATION_PRICE_CENTS);

    if (amountInCents > 0) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(amountInCents / 100);
    }

    return process.env.CONSULTATION_PRICE_LABEL || "R$ 350";
}

function firstName(name) {
    return String(name || "paciente").trim().split(/\s+/)[0] || "paciente";
}

function siteUrl() {
    return (
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        process.env.siteUrl ||
        "https://dralorraine.com.br"
    ).replace(/\/$/, "");
}

function buildCompletedMessage(consultation) {
    const scheduledAt = formatDateTime(
        consultation.scheduledAt,
        consultation.scheduledTimezone
    );

    return [
        "Nova consulta agendada pelo site",
        `Paciente: ${consultation.name || "Nao informado"}`,
        `Email: ${consultation.email || "Nao informado"}`,
        `Telefone: ${consultation.phone || "Nao informado"}`,
        `Horario: ${scheduledAt}`,
        `Consulta ID: ${consultation.id}`
    ].join("\n");
}

function getAdminUrl(consultationId) {
    return `${siteUrl()}/admin/consultas?consulta=${consultationId}`;
}

function getSchedulingUrl(consultationId) {
    return `${siteUrl()}/consulta/agendar?consulta=${consultationId}`;
}

function buildTemplateVariables(consultation) {
    const scheduledAt = formatDateTime(
        consultation.scheduledAt,
        consultation.scheduledTimezone
    );

    return {
        CONSULTATION_ID: String(consultation.id || ""),
        PATIENT_NAME: consultation.name || "Nao informado",
        PATIENT_MAIL: consultation.email || "Nao informado",
        PATIENT_PHONE: consultation.phone || "Nao informado",
        SCHEDULED_AT: scheduledAt,
        SCHEDULED_TIMEZONE:
            consultation.scheduledTimezone || "America/Sao_Paulo",
        SCHEDULING_PROVIDER: consultation.schedulingProvider || "",
        SCHEDULING_PROVIDER_REF: consultation.schedulingProviderRef || "",
        ADMIN_URL: getAdminUrl(consultation.id)
    };
}

export function getConsultaPaymentTemplateVariables(consultation) {
    return {
        CONSULTATION_ID: String(consultation.id || ""),
        CONSULTATION_PRICE: formatConsultationPrice(),
        PATIENT_FIRST_NAME: firstName(consultation.name),
        PATIENT_NAME: consultation.name || "Nao informado",
        PATIENT_MAIL: consultation.email || "Nao informado",
        PATIENT_PHONE: consultation.phone || "Nao informado",
        PATIENT_CITY: consultation.city || "Nao informado",
        MAIN_CONCERN: consultation.mainConcern || "Nao informado",
        PAYMENT_PROVIDER: consultation.paymentProvider || "",
        PAYMENT_PROVIDER_REF: consultation.paymentProviderRef || "",
        ADMIN_URL: getAdminUrl(consultation.id),
        SCHEDULING_URL: getSchedulingUrl(consultation.id)
    };
}

function buildFallbackHtml(variables) {
    const rows = [
        ["Paciente", variables.PATIENT_NAME],
        ["Email", variables.PATIENT_MAIL],
        ["Telefone", variables.PATIENT_PHONE],
        ["Horario", variables.SCHEDULED_AT],
        ["Consulta ID", variables.CONSULTATION_ID],
        ["Provedor", variables.SCHEDULING_PROVIDER]
    ];

    return `
        <div style="font-family: Arial, sans-serif; color: #1c1917; line-height: 1.5;">
            <h1 style="font-size: 20px;">Nova consulta agendada pelo site</h1>
            <table style="border-collapse: collapse;">
                <tbody>
                    ${rows
                        .map(
                            ([label, value]) => `
                                <tr>
                                    <td style="padding: 6px 16px 6px 0; color: #57534e;">${escapeHtml(label)}</td>
                                    <td style="padding: 6px 0; font-weight: 600;">${escapeHtml(value)}</td>
                                </tr>
                            `
                        )
                        .join("")}
                </tbody>
            </table>
            ${
                variables.ADMIN_URL
                    ? `<p><a href="${escapeHtml(variables.ADMIN_URL)}">Abrir no admin</a></p>`
                    : ""
            }
        </div>
    `;
}

export async function notifyConsultaCompleted(consultation) {
    const apiKey = process.env.RESEND_API_KEY;
    const from =
        process.env.RESEND_FROM ||
        "Dra. Lorraine <notificacoes@dralorraine.com>";
    const to = parseRecipients(process.env.CONSULTA_COMPLETED_EMAIL_TO);
    const templateId = process.env.RESEND_CONSULTA_COMPLETED_TEMPLATE_ID;

    if (!apiKey || !to.length) {
        return {
            skipped: true,
            missing: [
                !apiKey ? "RESEND_API_KEY" : null,
                !to.length ? "CONSULTA_COMPLETED_EMAIL_TO" : null
            ].filter(Boolean)
        };
    }

    const variables = buildTemplateVariables(consultation);
    const subject = `Nova consulta agendada: ${variables.PATIENT_NAME}`;
    const message = buildCompletedMessage(consultation);
    const payload = {
        from,
        to,
        subject,
        tags: [
            { name: "event", value: "consulta_completed" },
            { name: "consultation_id", value: variables.CONSULTATION_ID }
        ]
    };

    if (templateId) {
        payload.template = {
            id: templateId,
            variables
        };
    } else {
        payload.text = message;
        payload.html = buildFallbackHtml(variables);
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Idempotency-Key": `consulta-completed-${variables.CONSULTATION_ID}-${String(
                consultation.scheduledAt || ""
            )}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
            body?.message || `Resend notification failed with ${response.status}`
        );
    }

    const body = await response.json().catch(() => ({}));
    return { ok: true, id: body.id };
}

async function sendResendTemplateEmail({
    templateId,
    to,
    subject,
    variables,
    eventName,
    idempotencyKey
}) {
    const apiKey = process.env.RESEND_API_KEY;
    const from =
        process.env.RESEND_FROM ||
        "Dra. Lorraine <notificacoes@dralorraine.com>";
    const recipients = Array.isArray(to) ? to : parseRecipients(to);

    if (!apiKey || !templateId || !recipients.length) {
        return {
            skipped: true,
            missing: [
                !apiKey ? "RESEND_API_KEY" : null,
                !templateId ? "templateId" : null,
                !recipients.length ? "to" : null
            ].filter(Boolean)
        };
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey
        },
        body: JSON.stringify({
            from,
            to: recipients,
            subject,
            template: {
                id: templateId,
                variables
            },
            tags: [
                { name: "event", value: eventName },
                { name: "consultation_id", value: variables.CONSULTATION_ID }
            ]
        })
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
            body?.message || `Resend notification failed with ${response.status}`
        );
    }

    const body = await response.json().catch(() => ({}));
    return { ok: true, id: body.id };
}

export async function notifyConsultaPaymentConfirmed(consultation, options = {}) {
    const variables = getConsultaPaymentTemplateVariables(consultation);
    const adminRecipients =
        options.adminRecipients ||
        process.env.CONSULTA_ADMIN_EMAIL_TO ||
        "adias7882@gmail.com,lorraine.tfc@gmail.com";
    const patientRecipient = options.patientRecipient || variables.PATIENT_MAIL;
    const paymentRef =
        variables.PAYMENT_PROVIDER_REF || variables.CONSULTATION_ID;

    const [admin, patient] = await Promise.all([
        sendResendTemplateEmail({
            templateId: process.env.RESEND_ADMIN_APPOINTMENT_PURCHASED_TEMPLATE_ID,
            to: adminRecipients,
            subject: `Nova consulta comprada: ${variables.PATIENT_NAME}`,
            variables,
            eventName: "consulta_payment_admin",
            idempotencyKey: `consulta-payment-admin-${variables.CONSULTATION_ID}-${paymentRef}`
        }),
        sendResendTemplateEmail({
            templateId: process.env.RESEND_PATIENT_PAYMENT_CONFIRMED_TEMPLATE_ID,
            to: patientRecipient,
            subject: "Pagamento confirmado - agende sua consulta",
            variables,
            eventName: "consulta_payment_patient",
            idempotencyKey: `consulta-payment-patient-${variables.CONSULTATION_ID}-${paymentRef}`
        })
    ]);

    return { admin, patient };
}

export async function safeNotifyConsultaPaymentConfirmed(consultation, options = {}) {
    try {
        return await notifyConsultaPaymentConfirmed(consultation, options);
    } catch (err) {
        console.error("[consulta payment notification error]", err);
        return { error: err?.message || "Payment notification failed" };
    }
}

export async function safeNotifyConsultaCompleted(consultation) {
    try {
        return await notifyConsultaCompleted(consultation);
    } catch (err) {
        console.error("[consulta notification error]", err);
        return { error: err?.message || "Notification failed" };
    }
}
