-- ────────────────────────────────────────────────────────────────────────────
-- Consultations intake table
--
-- Persists the 7-step form from /consulta/agendar. One row per patient intake.
-- Insert happens after Step 5 (consent) — we never store data that wasn't
-- explicitly consented to.
--
-- Photos are stored as JSONB (array of {url, pathname, name, size}). The
-- actual image bytes live in Vercel Blob — this table only holds the URLs.
--
-- Run this once against your Neon database:
--   1. Open Neon dashboard → SQL Editor
--   2. Paste this file
--   3. Run
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS consultations (
    id              SERIAL PRIMARY KEY,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status          TEXT NOT NULL DEFAULT 'pending_payment',

    -- Step 1 · About you
    name            TEXT NOT NULL,
    email           TEXT NOT NULL,
    phone           TEXT,
    dob             DATE,
    city            TEXT,

    -- Step 2 · Main concern
    main_concern        TEXT,
    concern_duration    TEXT,
    prior_treatments    TEXT,

    -- Step 3 · Health
    allergies       TEXT,
    medications     TEXT,
    conditions      TEXT,
    skin_type       TEXT,

    -- Step 4 · Photos  [{ url, pathname, name, size }]
    photos          JSONB NOT NULL DEFAULT '[]'::jsonb,

    -- Step 5 · Consent (all three required to submit)
    consent_telemedicine    BOOLEAN NOT NULL,
    consent_lgpd            BOOLEAN NOT NULL,
    consent_terms           BOOLEAN NOT NULL,

    -- Step 6 · Payment
    payment_status         TEXT NOT NULL DEFAULT 'pending',
    payment_provider       TEXT,
    payment_provider_ref   TEXT,
    payment_paid_at        TIMESTAMPTZ,
    payment_metadata       JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Legacy provider-specific fields retained for backwards compatibility.
    hotmart_transaction_id  TEXT,
    paid_at                 TIMESTAMPTZ,

    -- Step 7 · Schedule
    scheduling_status       TEXT NOT NULL DEFAULT 'pending',
    scheduling_provider     TEXT,
    scheduling_provider_ref TEXT,
    scheduled_at            TIMESTAMPTZ,
    scheduled_timezone      TEXT,
    scheduling_metadata     JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Internal notes Dra. Lorraine can add from /admin/consultas
    admin_notes     TEXT
);

CREATE INDEX IF NOT EXISTS idx_consultations_created_at  ON consultations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_email       ON consultations (email);
CREATE INDEX IF NOT EXISTS idx_consultations_status      ON consultations (status);
CREATE INDEX IF NOT EXISTS idx_consultations_payment_status ON consultations (payment_status);
CREATE INDEX IF NOT EXISTS idx_consultations_payment_provider_ref ON consultations (payment_provider, payment_provider_ref);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduling_status ON consultations (scheduling_status);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduling_provider_ref ON consultations (scheduling_provider, scheduling_provider_ref);
