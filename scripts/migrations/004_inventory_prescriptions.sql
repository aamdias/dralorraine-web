-- Apply after 003_crm.sql. Additive; existing appointments keep their history.
BEGIN;
CREATE TABLE IF NOT EXISTS crm_products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL, brand TEXT,
    unit TEXT NOT NULL CHECK (unit IN ('ml','g','unidade','dose')),
    image TEXT, image_source TEXT,
    revision INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS crm_purchases (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES crm_products(id) ON DELETE RESTRICT,
    quantity NUMERIC(12,3) NOT NULL CHECK (quantity > 0),
    cost_cents INTEGER NOT NULL CHECK (cost_cents BETWEEN 0 AND 100000000),
    purchased_on DATE NOT NULL, expires_on DATE, lot TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (expires_on IS NULL OR expires_on >= purchased_on)
);
CREATE TABLE IF NOT EXISTS crm_product_usages (
    id TEXT PRIMARY KEY,
    appointment_id TEXT NOT NULL REFERENCES crm_appointments(id) ON DELETE RESTRICT,
    purchase_id TEXT NOT NULL REFERENCES crm_purchases(id) ON DELETE RESTRICT,
    quantity NUMERIC(12,3) NOT NULL CHECK (quantity > 0),
    cost_cents INTEGER NOT NULL CHECK (cost_cents >= 0),
    UNIQUE(appointment_id,purchase_id)
);
CREATE TABLE IF NOT EXISTS crm_prescriptions (
    id TEXT PRIMARY KEY,
    appointment_id TEXT NOT NULL REFERENCES crm_appointments(id) ON DELETE RESTRICT,
    patient_id TEXT NOT NULL REFERENCES crm_patients(id) ON DELETE RESTRICT,
    patient_name TEXT NOT NULL,
    date DATE NOT NULL, title TEXT NOT NULL, conduct TEXT NOT NULL,
    doctor TEXT NOT NULL, registration TEXT NOT NULL, qualification TEXT,
    items JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS crm_purchases_product ON crm_purchases(product_id);
CREATE INDEX IF NOT EXISTS crm_usages_purchase ON crm_product_usages(purchase_id);
CREATE INDEX IF NOT EXISTS crm_prescriptions_patient ON crm_prescriptions(patient_id);
ALTER TABLE crm_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_product_usages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_prescriptions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON crm_products,crm_purchases,crm_product_usages,crm_prescriptions FROM PUBLIC;
COMMIT;
