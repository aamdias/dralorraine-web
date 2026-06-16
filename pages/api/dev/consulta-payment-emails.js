import {
    getConsultaPaymentTemplateVariables,
    safeNotifyConsultaPaymentConfirmed
} from "@utils/consultaNotifications";

function hasValue(value) {
    return Boolean(String(value || "").trim());
}

function buildMockConsultation(body = {}) {
    const now = Date.now();

    return {
        id: body.id || `test-${now}`,
        name: body.name || "Marina Teste da Silva",
        email: body.email || "paciente.teste@example.com",
        phone: body.phone || "(11) 99999-0000",
        city: body.city || "Sao Paulo",
        mainConcern:
            body.mainConcern ||
            "Manchas no rosto e rotina de cuidados para pele sensivel",
        paymentProvider: body.paymentProvider || "stripe",
        paymentProviderRef: body.paymentProviderRef || `test-payment-${now}`
    };
}

function getEnvStatus() {
    return {
        hasResendApiKey: hasValue(process.env.RESEND_API_KEY),
        resendFrom:
            process.env.RESEND_FROM ||
            "Dra. Lorraine <notificacoes@dralorraine.com>",
        hasAdminTemplate: hasValue(
            process.env.RESEND_ADMIN_APPOINTMENT_PURCHASED_TEMPLATE_ID
        ),
        hasPatientTemplate: hasValue(
            process.env.RESEND_PATIENT_PAYMENT_CONFIRMED_TEMPLATE_ID
        ),
        adminRecipients:
            process.env.CONSULTA_ADMIN_EMAIL_TO ||
            "adias7882@gmail.com,lorraine.tfc@gmail.com",
        siteUrl:
            process.env.NEXT_PUBLIC_SITE_URL ||
            process.env.SITE_URL ||
            process.env.siteUrl ||
            "https://dralorraine.com.br"
    };
}

export default async function handler(req, res) {
    if (process.env.NODE_ENV === "production") {
        res.status(404).json({ error: "Not found" });
        return;
    }

    if (!["GET", "POST"].includes(req.method)) {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const body = req.method === "POST" ? req.body || {} : {};
    const consultation = buildMockConsultation(body);
    const variables = getConsultaPaymentTemplateVariables(consultation);
    const env = getEnvStatus();

    if (req.method === "GET" || body.dryRun) {
        res.status(200).json({
            dryRun: true,
            message:
                "These are the exact variables that would be sent to the Resend templates.",
            env,
            consultation,
            variables
        });
        return;
    }

    const result = await safeNotifyConsultaPaymentConfirmed(consultation, {
        adminRecipients: body.adminTo,
        patientRecipient: body.patientTo || body.email
    });

    res.status(result?.error ? 500 : 200).json({
        dryRun: false,
        env,
        consultation,
        variables,
        result
    });
}
