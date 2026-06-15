-- ────────────────────────────────────────────────────────────────────────────
-- Provider-neutral payment and scheduling state
--
-- Keeps consultations independent from any one checkout or calendar vendor.
-- Hotmart, Stripe, Mercado Pago, Cal.com, Calendly, etc. can all map into
-- these stable fields while provider-specific payloads live in JSONB metadata.
-- ────────────────────────────────────────────────────────────────────────────

ALTER TABLE consultations
    ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS payment_provider TEXT,
    ADD COLUMN IF NOT EXISTS payment_provider_ref TEXT,
    ADD COLUMN IF NOT EXISTS payment_paid_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS payment_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS scheduling_status TEXT NOT NULL DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS scheduling_provider TEXT,
    ADD COLUMN IF NOT EXISTS scheduling_provider_ref TEXT,
    ADD COLUMN IF NOT EXISTS scheduled_timezone TEXT,
    ADD COLUMN IF NOT EXISTS scheduling_metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

UPDATE consultations
SET
    payment_status = CASE
        WHEN paid_at IS NOT NULL THEN 'paid'
        WHEN status IN ('paid', 'scheduled', 'completed') THEN 'paid'
        ELSE payment_status
    END,
    payment_provider = COALESCE(payment_provider, CASE WHEN hotmart_transaction_id IS NOT NULL THEN 'hotmart' END),
    payment_provider_ref = COALESCE(payment_provider_ref, hotmart_transaction_id),
    payment_paid_at = COALESCE(payment_paid_at, paid_at),
    scheduling_status = CASE
        WHEN scheduled_at IS NOT NULL THEN 'scheduled'
        ELSE scheduling_status
    END
WHERE
    paid_at IS NOT NULL
    OR hotmart_transaction_id IS NOT NULL
    OR scheduled_at IS NOT NULL
    OR status IN ('paid', 'scheduled', 'completed');

CREATE INDEX IF NOT EXISTS idx_consultations_payment_status ON consultations (payment_status);
CREATE INDEX IF NOT EXISTS idx_consultations_payment_provider_ref ON consultations (payment_provider, payment_provider_ref);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduling_status ON consultations (scheduling_status);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduling_provider_ref ON consultations (scheduling_provider, scheduling_provider_ref);
