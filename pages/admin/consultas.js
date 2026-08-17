import { useState, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { sql } from "@vercel/postgres";
import { requireAdmin } from "@utils/adminAuth";

// ────────────────────────────────────────────────────────────────────────────
// /admin/consultas — list of all patient intakes.
//
// Auth: gated by requireAdmin() in getServerSideProps. Unauthenticated users
// are redirected to /admin/login.
//
// Data: fetched server-side on every request (no caching). Keeps PHI off the
// CDN and out of the client bundle until the session cookie is verified.
// ────────────────────────────────────────────────────────────────────────────

export async function getServerSideProps(ctx) {
    const gate = requireAdmin(ctx);
    if (gate) return gate;

    try {
        const { rows } = await sql`
            SELECT
                id,
                created_at,
                status,
                name, email, phone, dob, city,
                main_concern, concern_duration, prior_treatments,
                allergies, medications, conditions, skin_type,
                photos,
                paid_at, scheduled_at,
                admin_notes
            FROM consultations
            ORDER BY created_at DESC
            LIMIT 500;
        `;

        // Serialize dates for Next.js JSON transport.
        const serialized = rows.map((r) => ({
            ...r,
            created_at: r.created_at?.toISOString?.() ?? r.created_at,
            dob: r.dob ? new Date(r.dob).toISOString().slice(0, 10) : null,
            paid_at: r.paid_at?.toISOString?.() ?? r.paid_at ?? null,
            scheduled_at:
                r.scheduled_at?.toISOString?.() ?? r.scheduled_at ?? null
        }));

        return { props: { rows: serialized, error: null } };
    } catch (err) {
        console.error("[/admin/consultas getServerSideProps]", err);
        return {
            props: {
                rows: [],
                error:
                    "Não foi possível carregar os dados. Verifique se o banco Neon está provisionado e o schema foi executado."
            }
        };
    }
}

export default function AdminConsultas({ rows, error }) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [expandedId, setExpandedId] = useState(null);

    const filtered = useMemo(() => {
        if (!query.trim()) return rows;
        const q = query.trim().toLowerCase();
        return rows.filter(
            (r) =>
                r.name?.toLowerCase().includes(q) ||
                r.email?.toLowerCase().includes(q) ||
                r.phone?.toLowerCase().includes(q) ||
                r.main_concern?.toLowerCase().includes(q)
        );
    }, [rows, query]);

    const logout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    return (
        <>
            <Head>
                <title>Consultas · Admin</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <main className="min-h-screen bg-paper text-ink">
                {/* Top bar */}
                <header className="border-b border-line bg-[#FBF8F2]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.28em] text-copper-dark font-medium">
                                Painel · Dra. Lorraine
                            </div>
                            <div className="text-lg font-light tracking-[-0.01em]">
                                Consultas recebidas
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="text-xs uppercase tracking-[0.24em] text-stone hover:text-copper-dark transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Filters */}
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium mb-2">
                                {filtered.length}{" "}
                                {filtered.length === 1
                                    ? "agendamento"
                                    : "agendamentos"}
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-light leading-[1.1] tracking-[-0.02em]">
                                Intake de{" "}
                                <span className="italic text-copper-dark">
                                    pacientes
                                </span>
                                .
                            </h1>
                        </div>
                        <div className="w-full sm:w-80">
                            <label className="block text-xs uppercase tracking-[0.24em] text-stone font-medium mb-3">
                                Buscar
                            </label>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="nome, email, telefone, queixa…"
                                className="w-full bg-transparent border-b border-line focus:border-copper outline-none py-2 text-sm placeholder:text-[#B8AFA3] transition-colors"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-10 p-5 border border-[#E7D5D0] bg-[#FBEDEA] text-sm text-[#7A2E26] leading-relaxed">
                            {error}
                        </div>
                    )}

                    {!error && filtered.length === 0 && (
                        <div className="py-20 text-center text-stone">
                            <div className="text-xs uppercase tracking-[0.28em] mb-3">
                                Nenhum registro
                            </div>
                            <p className="text-sm">
                                {query
                                    ? "Nenhum resultado para essa busca."
                                    : "Os intakes aparecerão aqui conforme os pacientes completarem o formulário."}
                            </p>
                        </div>
                    )}

                    {/* Table */}
                    {filtered.length > 0 && (
                        <div className="bg-[#FBF8F2] border border-line">
                            {/* Desktop header */}
                            <div className="hidden lg:grid grid-cols-[160px_1.3fr_1.5fr_120px_1.4fr_90px] gap-6 px-6 py-4 border-b border-line text-[10px] uppercase tracking-[0.24em] text-stone font-medium">
                                <div>Data</div>
                                <div>Paciente</div>
                                <div>Contato</div>
                                <div>Fotos</div>
                                <div>Queixa principal</div>
                                <div className="text-right">Status</div>
                            </div>

                            <ul>
                                {filtered.map((r) => (
                                    <Row
                                        key={r.id}
                                        r={r}
                                        expanded={expandedId === r.id}
                                        onToggle={() =>
                                            setExpandedId((cur) =>
                                                cur === r.id ? null : r.id
                                            )
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    )}

                    <p className="mt-16 text-center text-xs uppercase tracking-[0.24em] text-stone/70 font-medium">
                        Dados sensíveis · Acesso auditado · LGPD
                    </p>
                </div>
            </main>
        </>
    );
}

/* ─── Row ────────────────────────────────────────────────────────────── */

function Row({ r, expanded, onToggle }) {
    const date = new Date(r.created_at);
    const dateStr = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    });
    const timeStr = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
    const photos = Array.isArray(r.photos) ? r.photos : [];

    return (
        <li className="border-b border-line last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full text-left px-6 py-5 hover:bg-sand/40 transition-colors"
            >
                {/* Desktop row */}
                <div className="hidden lg:grid grid-cols-[160px_1.3fr_1.5fr_120px_1.4fr_90px] gap-6 items-center">
                    <div className="text-sm">
                        <div className="text-ink">{dateStr}</div>
                        <div className="text-xs text-stone">
                            {timeStr}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-ink font-medium">
                            {r.name}
                        </div>
                        {r.city && (
                            <div className="text-xs text-stone">
                                {r.city}
                            </div>
                        )}
                    </div>
                    <div className="text-sm text-slate">
                        <div className="truncate">{r.email}</div>
                        {r.phone && (
                            <div className="text-xs text-stone">
                                {r.phone}
                            </div>
                        )}
                    </div>
                    <div>
                        <PhotoBadge count={photos.length} />
                    </div>
                    <div className="text-sm text-slate line-clamp-2">
                        {r.main_concern || (
                            <span className="text-[#A8A096] italic">
                                não informado
                            </span>
                        )}
                    </div>
                    <div className="text-right">
                        <StatusPill status={r.status} />
                    </div>
                </div>

                {/* Mobile row */}
                <div className="lg:hidden">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="text-sm font-medium text-ink truncate">
                                {r.name}
                            </div>
                            <div className="text-xs text-stone truncate">
                                {r.email}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="text-xs text-stone">
                                {dateStr}
                            </div>
                            <StatusPill status={r.status} />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-stone">
                        <PhotoBadge count={photos.length} />
                        {r.phone && <span>·</span>}
                        {r.phone && <span>{r.phone}</span>}
                    </div>
                </div>
            </button>

            {expanded && <Detail r={r} />}
        </li>
    );
}

function PhotoBadge({ count }) {
    if (!count) {
        return (
            <span className="text-xs text-[#A8A096] uppercase tracking-[0.2em]">
                —
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 text-xs text-stone">
            <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
            >
                <path
                    d="M4 6h2l1-1.5h6L14 6h2a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm6 8a3 3 0 100-6 3 3 0 000 6z"
                    stroke="#B48967"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                />
            </svg>
            {count}
        </span>
    );
}

function StatusPill({ status }) {
    const map = {
        pending_payment: { label: "Aguardando", tone: "amber" },
        paid: { label: "Pago", tone: "green" },
        scheduled: { label: "Agendada", tone: "ink" },
        completed: { label: "Concluída", tone: "muted" }
    };
    const { label, tone } = map[status] || {
        label: status || "—",
        tone: "muted"
    };
    const tones = {
        amber: "text-copper-dark border-copper/40",
        green: "text-[#3F6A3C] border-[#3F6A3C]/40",
        ink: "text-ink border-ink/40",
        muted: "text-stone border-stone/30"
    };
    return (
        <span
            className={`inline-block text-[10px] uppercase tracking-[0.24em] font-medium px-2 py-1 border ${tones[tone]}`}
        >
            {label}
        </span>
    );
}

/* ─── Expanded detail ────────────────────────────────────────────────── */

function Detail({ r }) {
    const photos = Array.isArray(r.photos) ? r.photos : [];
    return (
        <div className="border-t border-line bg-paper px-6 py-8 lg:px-10 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    <SectionTitle>Paciente</SectionTitle>
                    <Field label="Nome" value={r.name} />
                    <Field label="Email" value={r.email} />
                    <Field label="Telefone" value={r.phone} />
                    <Field label="Nascimento" value={r.dob} />
                    <Field label="Cidade" value={r.city} />
                </div>

                <div>
                    <SectionTitle>Queixa principal</SectionTitle>
                    <Field label="Descrição" value={r.main_concern} multiline />
                    <Field label="Duração" value={r.concern_duration} />
                    <Field
                        label="Tratamentos anteriores"
                        value={r.prior_treatments}
                        multiline
                    />
                </div>

                <div>
                    <SectionTitle>Histórico de saúde</SectionTitle>
                    <Field label="Tipo de pele" value={r.skin_type} />
                    <Field label="Alergias" value={r.allergies} multiline />
                    <Field label="Medicações" value={r.medications} multiline />
                    <Field label="Condições" value={r.conditions} multiline />
                </div>

                <div>
                    <SectionTitle>Status</SectionTitle>
                    <Field
                        label="Pagamento"
                        value={r.paid_at ? new Date(r.paid_at).toLocaleString("pt-BR") : null}
                    />
                    <Field
                        label="Agendamento"
                        value={r.scheduled_at ? new Date(r.scheduled_at).toLocaleString("pt-BR") : null}
                    />
                    <Field label="Notas internas" value={r.admin_notes} multiline />
                </div>
            </div>

            {photos.length > 0 && (
                <div className="mt-12">
                    <SectionTitle>Fotos ({photos.length})</SectionTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                        {photos.map((p, i) => (
                            <a
                                key={p.url || i}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block aspect-square bg-[#FBF8F2] border border-line hover:border-copper transition-colors overflow-hidden"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={p.url}
                                    alt={p.name || `Foto ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        ))}
                    </div>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-stone/70">
                        Clique para abrir em tamanho real
                    </p>
                </div>
            )}
        </div>
    );
}

function SectionTitle({ children }) {
    return (
        <div className="text-[10px] uppercase tracking-[0.28em] text-copper-dark font-medium mb-4 pb-3 border-b border-line">
            {children}
        </div>
    );
}

function Field({ label, value, multiline }) {
    return (
        <div className="mb-4 last:mb-0">
            <div className="text-[10px] uppercase tracking-[0.24em] text-stone/70 font-medium mb-1">
                {label}
            </div>
            <div
                className={`text-sm text-ink ${
                    multiline ? "whitespace-pre-wrap leading-relaxed" : ""
                }`}
            >
                {value || (
                    <span className="text-[#A8A096] italic">não informado</span>
                )}
            </div>
        </div>
    );
}
