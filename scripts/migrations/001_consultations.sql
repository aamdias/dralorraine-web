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

    -- Step 6 · Payment (updated later by Hotmart webhook — future work)
    hotmart_transaction_id  TEXT,
    paid_at                 TIMESTAMPTZ,

    -- Step 7 · Schedule (updated later when Calendly fires — future work)
    scheduled_at            TIMESTAMPTZ,

    -- Internal notes Dra. Lorraine can add from /admin/consultas
    admin_notes     TEXT
);

CREATE INDEX IF NOT EXISTS idx_consultations_created_at  ON consultations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_email       ON consultations (email);
CREATE INDEX IF NOT EXISTS idx_consultations_status      ON consultations (status);
