# Lorraine CRM

## Local preview

```sh
npm ci
npm run crm:seed
npm run dev:crm
```

Open http://127.0.0.1:3000/admin. Sign in as `alan@example.test` or `lorraine@example.test`. The local demo mailbox displays the randomly generated six-digit code on the login screen. Codes expire in five minutes, allow five attempts, and can be used once. Resending has a one-minute cooldown. This transport never sends email or connects to Postgres. The dev server binds to loopback; the request host must be localhost or 127.0.0.1. It is deliberately unavailable in production, even if CRM_DEMO is accidentally set.

The seed contains 18 fictional patients, 50 appointments and three online intake examples. Contact actions are simulated to avoid accidentally contacting anyone. Edits persist in the git-ignored `.crm-demo/state.json`. Never enter real patient data into the demo. `npm run crm:seed -- --reset` restores the fictional data. Sessions are ephemeral and disappear when the dev server restarts.

## Production configuration still required

The code is prepared for a clean admin subdomain; this session does **not** activate DNS, Neon Auth, SMTP or the production schema. No production patient records have been copied, migrated or seeded.

1. Address the existing production dependency advisories, particularly the outdated Next.js version, and revalidate the public booking/payment flow before launching with real patient data. The new CRM does not rely solely on middleware for authorization: every server-rendered workspace request, data API and photo request independently checks identity, email verification, session age and the two-email allowlist.
2. In the Neon Console, choose the existing project and the **same branch/database used by production `POSTGRES_URL`**. Open **Auth / Better Auth**, click **Enable Auth**, then copy the complete **Auth URL** from **Configuration / Project Info** (also described as **Settings → Better Auth → Project Info**). This must be the managed Better Auth implementation, not the legacy Stack Auth integration. Add `https://admin.dralorraine.com` to trusted domains, set the application name to `Lorraine CRM`, and disable **Allow Localhost** on the production branch. Under email authentication, enable **Sign-up and Sign-in with Email**: this is a Neon prerequisite for OTP, even though the CRM itself exposes no password or signup endpoint. The Email OTP plugin is managed by Neon and needs no separate Better Auth installation. If enabling **Verify at Sign-up**, select **Verification code** as the verification method. Verify both owners can receive and complete the sign-in code flow; the server accepts only verified identities on the two-email allowlist. An upstream Neon account outside that list never gains CRM access.
3. In **Settings → Better Auth**, select **Custom SMTP provider** and enter the provider's host, port, username, password, sender email and sender name. Save and test delivery to both owner mailboxes. Neon's shared sender can deliver verification codes during testing, but its [production checklist](https://neon.com/docs/auth/production-checklist#email-provider) calls for a dedicated provider for reliable production delivery and higher limits. This may use an existing supported SMTP service; Resend is not a dependency of this CRM. Check sender/domain authentication, code expiry, bad-code throttling, logout and revocation. Email OTP alone is one-factor passwordless authentication; secure the owner mailboxes separately.
4. Set these server-only environment variables in the Vercel project, with CRM_DEMO **unset**:

```dotenv
ADMIN_SITE_URL=https://admin.dralorraine.com
CRM_ALLOWED_EMAILS=<Alan's actual email>,<Lorraine's actual email>
NEON_AUTH_BASE_URL=<full Neon Auth endpoint>
NEON_AUTH_COOKIE_SECRET=<random secret, at least 32 characters>
POSTGRES_URL=<existing server database connection>
BLOB_READ_WRITE_TOKEN=<existing private Blob token>
```

Use the two owner addresses agreed in the setup conversation; keep them in server environment variables, not this public repository. Generate `NEON_AUTH_COOKIE_SECRET` locally with `openssl rand -base64 32` and paste it directly into Vercel's server environment settings. Keep database and Auth endpoint variables on the same branch. After saving variables, redeploy; existing deployments do not pick up environment edits automatically.

5. Apply `scripts/migrations/003_crm.sql` after the two existing consultations migrations. It is additive and transaction-wrapped; it creates empty CRM tables without changing existing consultations. Validate against a database branch first and keep the normal production backup available. The server database role must be the table owner or a separately provisioned role with appropriate server-only access. RLS is enabled without browser-facing policies, and PUBLIC privileges are revoked. Do not expose these tables through the Neon Data API.
6. Add `admin.dralorraine.com` to this app's Vercel project and use the DNS record Vercel specifies. Confirm HTTPS is valid. The subdomain rewrites `/`, `/pacientes`, `/atendimentos`, `/retornos`, `/reativacao`, `/aniversarios`, `/ranking`, `/online` and `/login` to the private workspace. Public-domain `/admin/*` links redirect to the configured admin origin. The old consultas route and notification deep links lead to `/online?consulta=<id>`.
7. Verify the production host, email-code login, API denial for outsiders and expired sessions, authenticated private photos, no marketing trackers, no cached patient responses, and logout. Check the public booking flow still runs on dralorraine.com.

Neon's SDK is pinned at `0.6.0-beta`. This Next.js 14 Pages Router app uses the official framework-neutral `@neondatabase/auth/server` entry point, with a request-bound cookie adapter. It does not use the optional Next 16/App Router adapter. `.npmrc` enables legacy peer resolution for that optional adapter's version constraint. Authorization always requests an upstream session with `disableCookieCache=true`, then verifies the allowlist and eight-hour maximum session age. Cookies are host-only, HttpOnly, Secure and SameSite=Strict in production. Shared-password `admin_auth` cookies are ignored. Removing an email from the allowlist denies its existing sessions on the next request.

The Neon setup above is based on the official [enable Auth guide](https://neon.com/docs/auth/quick-start/nextjs-api-only#enable-auth-in-your-neon-project), [Email OTP guide](https://neon.com/docs/auth/guides/plugins/email-otp) and [production checklist](https://neon.com/docs/auth/production-checklist). Lorraine signs into the CRM using her mailbox; she does not need a Neon Console or Vercel team account.

## Demo isolation in production

The demo banner, fictional records, simulated contact actions, prefilled demo email and on-screen demo code are gated by local demo mode. Production snapshots always return `demo: false` and read Postgres; they never fall back to seeded records. The seeding command only writes the git-ignored local `.crm-demo/state.json` and is not part of install, build or deploy scripts. `CRM_DEMO=true` outside development is rejected, so accidental configuration cannot activate a demo in production. Missing production configuration keeps access closed. Ordinary field hints, such as the phone format and six-digit code placeholder, remain useful UI instructions; they are not stored records.

## Patient and appointment workflow

Create patients manually, including existing clients. Add historical appointments with status Realizado and their actual date/value when known. Unknown values remain unknown; the LTV display is flagged as partial. Editing a record checks its revision so Lorraine and Alan cannot silently overwrite each other's changes.

Online consultations remain intact in the inbox. Open a submission and explicitly select an existing patient, or create a patient and then select it. Link the submission once. Register its appointment separately after checking its date, status and price; the unique source consultation ID prevents duplicate imports. Website scheduling and payment state remain visible from the original intake and independent of the CRM appointment. **Changes to the website schedule do not automatically reschedule a manually registered CRM appointment**; review the intake's current agenda when reconciling it. Payment does not mark a visit Realizado. Form LGPD/telemedicine consent never grants marketing contact consent.

Patient metrics count completed encounters only. Last visit uses known completed dates. Suggested returns are shown through the end of the current Monday–Sunday week, including overdue suggestions; newer completed visits supersede older suggestions and a future booking on/before a suggestion resolves it. Reactivation requires a known last completed date at least six calendar months ago and no upcoming booked appointment. Birthdays use the São Paulo calendar month. Rankings count known completed values and direct referrals. Referrals cannot be self-referential or cyclic.

The CRM has no marketing analytics, public sitemap entries, automatic outreach or mass export. Private photos are fetched through the authenticated API by stored Blob pathname; the Next image cache is bypassed. Audit records track actor, action, entity and time for production reads, writes, linking, login and logout; they omit clinical payloads. The audit is an application log, not a tamper-proof compliance archive. Administrative relationship management is implemented; this is not a complete electronic medical record or a declaration of regulatory compliance.

## Verification

```sh
npm run test:crm
NEXT_DIST_DIR=.next-crm-build npm run build
```

Domain and security tests include unknown historical values, invalid dates, consent requirements, return/reactivation calculations, code expiry/reuse/attempt limits, origin checks, removal from allowlist, unverified mailboxes, revoked sessions, cookie sanitization and eight-hour session age. Database integration tests execute the existing migrations and the CRM migration twice in a local PGlite Postgres engine, then exercise patient and appointment CRUD, optimistic revisions, referral cycles, unique intake linking and audit/RLS behavior. The Neon adapter test uses a mocked upstream, so it does not replace the real production SMTP/session smoke test.
