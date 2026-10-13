# CRM implementation plan

1. Separate patient identity from appointment history; add Postgres tables, validated writes and an audit trail. Completed appointments alone contribute to visit count and LTV. Dates and amounts can be unknown for historical records.
2. Create a branded Portuguese workspace with overview, patients, appointments, follow-ups, reactivation, birthdays, rankings and online intakes. Support manual historical entry and explicit linking of online intakes to avoid merging different people with a shared email.
3. Replace the shared password with Neon Auth email OTP and a server-side allowlist checked on every request. Use the official framework-neutral SDK adapter for this Next.js Pages Router app. Keep all marketing analytics outside the workspace.
4. Route admin.dralorraine.com to the existing app's private workspace with clean paths; preserve public booking and redirect the legacy admin path in production. Domain/DNS and Neon Auth configuration remain deployment steps.
5. Seed fictional records into a local-only file store, run a loopback development server, verify CRUD, reporting, remote-intake linking and access controls, then refine the preview.

## Initial decisions

-   No patient data is seeded into the configured production database. The demo is enabled only by an explicit local development environment flag and refuses production use.
-   Email codes alone are passwordless, single-factor authentication. Production needs protected owner mailboxes, an enabled Neon Auth endpoint, approved emails and a configured email delivery provider.
-   Follow-up reminders are manually entered suggestions. They are not automated clinical recommendations. Birthday and reactivation views do not automatically send messages; contact consent is shown and enforced for promotional contact links.
-   Unknown historical prices are displayed as unknown, not zero. LTV is the sum of known completed appointment values, and the UI flags incomplete values.
-   Online intake payment/scheduling state remains separate from clinical appointment status. Payment or scheduling does not imply attendance. Explicit patient linking preserves the original intake and does not infer contact consent from telemedicine/LGPD consent.

See docs/crm-operations.md for local preview, migration and production setup after implementation.
