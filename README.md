# Dra Lorraine Web

Esse projeto é um web app de front-end feito para divulgar serviços e produtos atrelados a Dra Lorraine Souza, médica e residente em dermatologia pela UNICAMP.

O projeto está hospedado em produção via [www.dralorraine.com](https://www.dralorraine.com)

## Stack

- Next 
- Javascript
- Tailwind
- Vercel
- FontAwesome

## Consulta notifications

Set these env vars in Vercel to send consultation emails through Resend:

- `RESEND_API_KEY`
- `RESEND_FROM` - optional, defaults to `Dra. Lorraine <notificacoes@dralorraine.com>`
- `NEXT_PUBLIC_SITE_URL` or `SITE_URL` - optional, used for email links
- `CONSULTA_ADMIN_EMAIL_TO` - optional, defaults to `adias7882@gmail.com,lorraine.tfc@gmail.com`
- `RESEND_ADMIN_APPOINTMENT_PURCHASED_TEMPLATE_ID` - published Resend template for the admin payment-confirmed email
- `RESEND_PATIENT_PAYMENT_CONFIRMED_TEMPLATE_ID` - published Resend template for the patient payment-confirmed email
- `CONSULTA_COMPLETED_EMAIL_TO` - optional scheduled-consultation recipients
- `RESEND_CONSULTA_COMPLETED_TEMPLATE_ID` - optional published Resend template id or alias

Payment-confirmed templates use these variables: `CONSULTATION_ID`, `CONSULTATION_PRICE`, `PATIENT_FIRST_NAME`, `PATIENT_NAME`, `PATIENT_MAIL`, `PATIENT_PHONE`, `PATIENT_CITY`, `MAIN_CONCERN`, `PAYMENT_PROVIDER`, `PAYMENT_PROVIDER_REF`, `ADMIN_URL`, `SCHEDULING_URL`.

Scheduled-consultation templates use these variables: `CONSULTATION_ID`, `PATIENT_NAME`, `PATIENT_MAIL`, `PATIENT_PHONE`, `SCHEDULED_AT`, `SCHEDULED_TIMEZONE`, `SCHEDULING_PROVIDER`, `SCHEDULING_PROVIDER_REF`, `ADMIN_URL`.

Local email testing:

- Preview variables without sending: `curl http://localhost:3001/api/dev/consulta-payment-emails`
- Send both payment-confirmed test emails to one inbox:
  `curl -X POST http://localhost:3001/api/dev/consulta-payment-emails -H "Content-Type: application/json" -d '{"adminTo":"you@example.com","patientTo":"you@example.com"}'`

The dev test endpoint returns 404 in production.
