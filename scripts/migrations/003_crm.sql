-- Run after 001 and 002. No patient data is copied or inferred by this migration.
BEGIN;
CREATE TABLE IF NOT EXISTS crm_patients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 200),
    phone TEXT, email TEXT, instagram TEXT, dob DATE,
    source TEXT NOT NULL DEFAULT 'Não informado' CHECK (source IN ('Indicação','Instagram','Google','Convênio','Outro','Não informado')),
    referred_by TEXT REFERENCES crm_patients(id) ON DELETE RESTRICT,
    contact_consent BOOLEAN NOT NULL DEFAULT false,
    consent_updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    revision INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (referred_by IS DISTINCT FROM id)
);
CREATE TABLE IF NOT EXISTS crm_appointments (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL REFERENCES crm_patients(id) ON DELETE RESTRICT,
    date DATE,
    procedure TEXT NOT NULL CHECK (procedure IN ('Consulta','Toxina','Preenchimento','Bioestimulador','Laser','Peeling','Cirurgia','Retorno')),
    modality TEXT NOT NULL CHECK (modality IN ('Presencial','Online')),
    amount_cents INTEGER CHECK (amount_cents BETWEEN 0 AND 100000000),
    payment_method TEXT NOT NULL DEFAULT 'Não informado' CHECK (payment_method IN ('Pix','Crédito','Débito','Dinheiro','Convênio','Não informado')),
    status TEXT NOT NULL CHECK (status IN ('Agendado','Realizado','Faltou','Cancelado')),
    next_return DATE,
    source_consultation_id INTEGER UNIQUE REFERENCES consultations(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    revision INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (status <> 'Agendado' OR date IS NOT NULL),
    CHECK (next_return IS NULL OR date IS NULL OR next_return >= date)
);
CREATE TABLE IF NOT EXISTS crm_intake_links (
    consultation_id INTEGER PRIMARY KEY REFERENCES consultations(id) ON DELETE RESTRICT,
    patient_id TEXT NOT NULL REFERENCES crm_patients(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS crm_audit (
    id BIGSERIAL PRIMARY KEY,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS crm_appointments_patient ON crm_appointments(patient_id);
CREATE INDEX IF NOT EXISTS crm_appointments_date ON crm_appointments(date);
CREATE INDEX IF NOT EXISTS crm_audit_date ON crm_audit(created_at DESC);
-- Server-only access: these tables are not intended for a browser Data API.
ALTER TABLE crm_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_intake_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON crm_patients, crm_appointments, crm_intake_links, crm_audit FROM PUBLIC;
COMMIT;
