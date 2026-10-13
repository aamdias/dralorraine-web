import {
    useEffect,
    useMemo,
    useState,
    useId,
    Children,
    isValidElement,
    cloneElement
} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dialog, RadioGroup } from "@headlessui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    FiGrid,
    FiUsers,
    FiCalendar,
    FiRefreshCw,
    FiClock,
    FiGift,
    FiTrendingUp,
    FiMonitor,
    FiPlus,
    FiSearch,
    FiArrowUpRight,
    FiArrowLeft,
    FiX,
    FiLogOut,
    FiShield,
    FiCheck,
    FiChevronRight
} from "react-icons/fi";
import { Logo } from "@components/Logo";
import {
    patientMetrics,
    appointmentDraft,
    today,
    weekBounds,
    dateLabel,
    money,
    matchesSearch,
    PROCEDURES,
    STATUSES,
    SOURCES,
    PAYMENTS,
    MODALITIES
} from "@utils/crm/model.mjs";
import styles from "./CRM.module.scss";

const NAV = [
    ["overview", "Visão geral", FiGrid, ""],
    ["pacientes", "Pacientes", FiUsers, "pacientes"],
    ["atendimentos", "Atendimentos", FiCalendar, "atendimentos"],
    ["retornos", "Retornos", FiRefreshCw, "retornos"],
    ["reativacao", "Reativação", FiClock, "reativacao"],
    ["aniversarios", "Aniversários", FiGift, "aniversarios"],
    ["ranking", "Relacionamentos", FiTrendingUp, "ranking"],
    ["online", "Consultas online", FiMonitor, "online"]
];
const TITLES = {
    pacientes: [
        "Sua base de",
        "pacientes.",
        "Pessoas, relações e um histórico que cresce com você."
    ],
    atendimentos: [
        "Cada encontro",
        "registrado.",
        "Consultas e procedimentos, presenciais ou online."
    ],
    retornos: [
        "O próximo passo",
        "do cuidado.",
        "Retornos sugeridos para acompanhar com atenção."
    ],
    reativacao: [
        "Hora de",
        "reencontrar.",
        "Pacientes sem atendimento há seis meses ou mais, sem novo agendamento."
    ],
    aniversarios: [
        "Pequenos gestos,",
        "grandes relações.",
        "Os aniversariantes deste mês, sempre respeitando o consentimento."
    ],
    ranking: [
        "Relações que",
        "crescem.",
        "Conheça os vínculos construídos ao longo do tempo."
    ],
    online: [
        "Consultas",
        "online.",
        "Solicitações recebidas pelo site, agora dentro do seu CRM."
    ]
};
const initialPatient = {
    name: "",
    phone: "",
    email: "",
    instagram: "",
    dob: "",
    source: "Não informado",
    referred_by: "",
    contact_consent: false
};
const initials = (name) =>
    name
        .split(/\s+/)
        .slice(0, 2)
        .map((v) => v[0])
        .join("");

async function request(url, options) {
    const res = await fetch(url, {
        ...options,
        headers: { "Content-Type": "application/json", ...options?.headers }
    });
    const data = await res.json();
    if (!res.ok) {
        const error = new Error(
            data.error || "Não foi possível concluir a ação."
        );
        error.status = res.status;
        throw error;
    }
    return data;
}
export default function CRM({
    initialData,
    user,
    adminHost,
    section,
    patientId,
    error: serverError
}) {
    const router = useRouter();
    const [data, setData] = useState(initialData),
        [query, setQuery] = useState(""),
        [filter, setFilter] = useState("Todos"),
        [modal, setModal] = useState(null),
        [busy, setBusy] = useState(false),
        [error, setError] = useState(serverError || ""),
        [toast, setToast] = useState(""),
        [intake, setIntake] = useState(null),
        [intakeBusy, setIntakeBusy] = useState(false);
    const day = today(),
        [weekStart, weekEnd] = weekBounds(day);
    const patients = useMemo(
        () => patientMetrics(data.patients, data.appointments, day),
        [data, day]
    );
    const patient = patients.find((p) => p.id === patientId);
    const href = (path) =>
        adminHost ? path.replace(/^\/admin/, "") || "/" : path;
    const pathFor = (id) => `/admin/pacientes/${id}`;
    const linkTo = (path) => ({ href: path, as: href(path) });
    const returns = patients
        .filter((p) => p.next_return && p.next_return <= weekEnd)
        .sort((a, b) => a.next_return.localeCompare(b.next_return));
    const weekReturns = returns.filter((p) => p.next_return >= weekStart);
    const inactive = patients.filter((p) => p.inactive),
        birthdays = patients
            .filter((p) => p.birthday_month)
            .sort((a, b) => a.dob.slice(8).localeCompare(b.dob.slice(8)));
    const visiblePatients = (
        section === "retornos"
            ? returns
            : section === "reativacao"
            ? inactive
            : section === "aniversarios"
            ? birthdays
            : patients
    )
        .filter((p) => matchesSearch(p, query))
        .filter(
            (p) =>
                filter === "Todos" ||
                (section === "retornos"
                    ? filter === "Em atraso"
                        ? p.next_return < day
                        : p.next_return >= weekStart && p.next_return <= weekEnd
                    : filter === "Com consentimento"
                    ? p.contact_consent
                    : !p.contact_consent)
        );
    const upcoming = data.appointments
        .filter((a) => a.status === "Agendado" && a.date >= day)
        .sort((a, b) => a.date.localeCompare(b.date));
    const appointments = data.appointments
        .filter((a) => {
            const p = patients.find((p) => p.id === a.patient_id);
            return (
                p &&
                (matchesSearch(p, query) ||
                    a.procedure.toLowerCase().includes(query.toLowerCase())) &&
                (filter === "Todos" || a.status === filter)
            );
        })
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    useEffect(() => {
        setData(initialData);
        setQuery("");
        setFilter("Todos");
        setModal(null);
        setIntake(null);
        setError(serverError || "");
    }, [initialData, section, patientId, serverError]);
    useEffect(() => {
        if (!toast) return;
        const timeout = setTimeout(() => setToast(""), 4500);
        return () => clearTimeout(timeout);
    }, [toast]);
    useEffect(() => {
        if (section === "online" && router.query.consulta) {
            openIntake(Number(router.query.consulta));
        }
    }, [section, router.query.consulta]); // eslint-disable-line react-hooks/exhaustive-deps
    async function refresh() {
        const fresh = await request("/api/admin/crm");
        setData(fresh);
        return fresh;
    }
    async function save(entity, record, id, expected) {
        setBusy(true);
        setError("");
        try {
            const result = await request("/api/admin/crm", {
                method: id ? "PATCH" : "POST",
                body: JSON.stringify({
                    entity,
                    record,
                    id,
                    expected_revision: expected
                })
            });
            await refresh();
            setModal(null);
            setToast(
                id
                    ? "Alterações salvas."
                    : entity === "patient"
                    ? "Paciente cadastrado."
                    : entity === "intake-link"
                    ? "Consulta vinculada ao paciente."
                    : "Atendimento registrado."
            );
            return result;
        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            setBusy(false);
        }
    }
    async function logout() {
        setBusy(true);
        try {
            await request("/api/admin/logout", { method: "POST", body: "{}" });
            window.location.assign(href("/admin/login"));
        } catch (e) {
            setError(e.message);
            setBusy(false);
        }
    }
    async function openIntake(id) {
        if (!Number.isSafeInteger(id) || id < 1) return;
        setIntakeBusy(true);
        setError("");
        try {
            setIntake(await request(`/api/admin/crm?intake=${id}`));
        } catch (e) {
            setError(e.message);
        } finally {
            setIntakeBusy(false);
        }
    }
    async function linkIntake(id, pid) {
        const result = await save("intake-link", {
            consultation_id: id,
            patient_id: pid
        });
        if (result) await openIntake(id);
    }
    const createPatient = (record = {}) => {
        setError("");
        setModal({ kind: "patient", record: { ...initialPatient, ...record } });
    };
    const createAppointment = (pid = "", record = {}) => {
        setError("");
        setModal({
            kind: "appointment",
            record: appointmentDraft(pid, record, day)
        });
    };
    const patientLink = (p) => (
        <Link {...linkTo(pathFor(p.id))} className={styles.patientLink}>
            <span className={styles.avatar}>{initials(p.name)}</span>
            <span>
                <strong>{p.name}</strong>
                <small>{p.phone || p.email || "Sem contato informado"}</small>
            </span>
        </Link>
    );
    const contacts = (p) => <Contact patient={p} demo={data.demo} />;
    const renderPatientTable = (rows) => (
        <div className={styles.tableWrap}>
            <table className={`${styles.table} ${styles.patientTable}`}>
                <thead>
                    <tr>
                        <th>Paciente</th>
                        {section === "aniversarios" ? (
                            <th>Aniversário</th>
                        ) : (
                            <th>Último atendimento</th>
                        )}
                        <th>
                            {section === "retornos"
                                ? "Retorno sugerido"
                                : "Atendimentos"}
                        </th>
                        <th>
                            {section === "reativacao" ||
                            section === "aniversarios"
                                ? "Contato"
                                : "Total recebido"}
                        </th>
                        <th>
                            {section === "pacientes"
                                ? "Origem"
                                : "Consentimento"}
                        </th>
                        <th>
                            <span className="sr-only">Abrir paciente</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((p) => (
                        <tr key={p.id}>
                            <td data-label="Paciente">{patientLink(p)}</td>
                            <td
                                data-label={
                                    section === "aniversarios"
                                        ? "Aniversário"
                                        : "Último atendimento"
                                }
                            >
                                {section === "aniversarios"
                                    ? dateLabel(p.dob, { year: undefined })
                                    : p.last_visit
                                    ? dateLabel(p.last_visit)
                                    : "Sem visita registrada"}
                            </td>
                            <td
                                data-label={
                                    section === "retornos"
                                        ? "Retorno sugerido"
                                        : "Atendimentos"
                                }
                            >
                                {section === "retornos" ? (
                                    <span
                                        className={
                                            p.next_return < day
                                                ? styles.overdue
                                                : undefined
                                        }
                                    >
                                        {dateLabel(p.next_return)}
                                        {p.next_return < day && (
                                            <small className={styles.block}>
                                                Em atraso
                                            </small>
                                        )}
                                    </span>
                                ) : (
                                    <span>
                                        {p.visits} <small>realizados</small>
                                    </span>
                                )}
                            </td>
                            <td
                                data-label={
                                    section === "reativacao" ||
                                    section === "aniversarios"
                                        ? "Contato"
                                        : "Total recebido"
                                }
                            >
                                {section === "reativacao" ||
                                section === "aniversarios" ? (
                                    contacts(p)
                                ) : (
                                    <span className={styles.amount}>
                                        {money(p.ltv)}
                                        {p.unknown_values > 0 && (
                                            <small className={styles.block}>
                                                + {p.unknown_values} sem valor
                                            </small>
                                        )}
                                    </span>
                                )}
                            </td>
                            <td
                                data-label={
                                    section === "pacientes"
                                        ? "Origem"
                                        : "Consentimento"
                                }
                            >
                                {section === "pacientes" ? (
                                    <span className={styles.badge}>
                                        {p.source}
                                    </span>
                                ) : (
                                    <Consent value={p.contact_consent} />
                                )}
                            </td>
                            <td data-action="true">
                                <Link
                                    {...linkTo(pathFor(p.id))}
                                    aria-label={`Abrir ${p.name}`}
                                    className={styles.iconButton}
                                >
                                    <FiArrowUpRight />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {rows.length === 0 && (
                <Empty
                    title="Nenhum paciente nesta visão."
                    description="Os pacientes aparecem aqui conforme os cadastros e o histórico de atendimentos."
                />
            )}
        </div>
    );
    const renderAppointmentTable = (rows) => (
        <div className={styles.tableWrap}>
            <table className={`${styles.table} ${styles.appointmentTable}`}>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Paciente</th>
                        <th>Procedimento</th>
                        <th>Valor / pagamento</th>
                        <th>Status</th>
                        <th>Retorno</th>
                        <th>
                            <span className="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((a) => {
                        const p = patients.find((p) => p.id === a.patient_id);
                        return (
                            <tr key={a.id}>
                                <td data-label="Data">
                                    <RecordDate value={a.date} />
                                </td>
                                <td data-label="Paciente">
                                    {p
                                        ? patientLink(p)
                                        : "Paciente não encontrado"}
                                </td>
                                <td data-label="Procedimento">
                                    <strong>{a.procedure}</strong>
                                    <small className={styles.block}>
                                        {a.modality}
                                    </small>
                                </td>
                                <td data-label="Valor / pagamento">
                                    {money(a.amount_cents)}
                                    <small className={styles.block}>
                                        {a.payment_method}
                                    </small>
                                </td>
                                <td data-label="Status">
                                    <Status value={a.status} />
                                </td>
                                <td data-label="Retorno">
                                    {a.next_return ? (
                                        <RecordDate value={a.next_return} />
                                    ) : (
                                        "—"
                                    )}
                                </td>
                                <td data-action="true">
                                    <button
                                        className={styles.textButton}
                                        onClick={() => {
                                            setError("");
                                            setModal({
                                                kind: "appointment",
                                                record: a
                                            });
                                        }}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {!rows.length && (
                <Empty
                    title="Um histórico começa com o primeiro registro."
                    description="Adicione um atendimento antigo ou um novo agendamento."
                    action={() => createAppointment(patient?.id)}
                    label="Registrar atendimento"
                />
            )}
        </div>
    );
    return (
        <div className={styles.root}>
            <Head>
                <title>
                    {patient
                        ? patient.name
                        : NAV.find((n) => n[0] === section)?.[1] ||
                          "Visão geral"}{" "}
                    · Lorraine CRM
                </title>
                <meta name="robots" content="noindex, nofollow, noarchive" />
            </Head>
            <aside className={styles.sidebar}>
                <Link {...linkTo("/admin")} className={styles.logo}>
                    <Logo
                        lockup="vertical"
                        className={styles.sidebarBrand}
                        markClassName={styles.sidebarMark}
                    />
                </Link>
                <div className={styles.workspaceLabel}>ESPAÇO DE CUIDADO</div>
                <nav aria-label="CRM">
                    {NAV.map(([id, label, Icon, path]) => (
                        <Link
                            {...linkTo(`/admin${path ? `/${path}` : ""}`)}
                            key={id}
                            className={`${styles.navLink} ${
                                section === id ? styles.active : ""
                            }`}
                            aria-current={section === id ? "page" : undefined}
                        >
                            <Icon key="icon" />
                            <span key="label">{label}</span>
                            {id === "retornos" && returns.length > 0 && (
                                <small key="returns">{returns.length}</small>
                            )}
                            {id === "online" &&
                                data.intakes.filter((i) => !i.patient_id)
                                    .length > 0 && (
                                    <small key="intakes">
                                        {
                                            data.intakes.filter(
                                                (i) => !i.patient_id
                                            ).length
                                        }
                                    </small>
                                )}
                        </Link>
                    ))}
                </nav>
                <div className={styles.sidebarBottom}>
                    <div className={styles.privateLabel}>
                        <FiShield /> Ambiente privado
                    </div>
                    <div className={styles.account}>
                        <span className={styles.avatar}>
                            {initials(user.name)}
                        </span>
                        <div>
                            <strong>{user.name}</strong>
                            <small>{user.email}</small>
                        </div>
                        <button
                            title="Sair"
                            aria-label="Sair do CRM"
                            onClick={logout}
                            disabled={busy}
                        >
                            <FiLogOut />
                        </button>
                    </div>
                </div>
            </aside>
            <div className={styles.main}>
                <header className={styles.topbar}>
                    <span>
                        CRM <FiChevronRight />{" "}
                        {NAV.find((n) => n[0] === section)?.[1] ||
                            "Visão geral"}
                    </span>
                    <span className={styles.topDate}>
                        {dateLabel(day, { weekday: "long" })}
                    </span>
                    <button
                        className={styles.mobileLogout}
                        aria-label="Sair do CRM"
                        onClick={logout}
                        disabled={busy}
                    >
                        <FiLogOut />
                    </button>
                </header>
                {data.demo && (
                    <div className={styles.demoBar}>
                        <span className={styles.demoDot} />
                        <strong>Demonstração local</strong>
                        <span>
                            Pacientes fictícios · alterações salvas neste
                            computador
                        </span>
                    </div>
                )}
                <main className={styles.content}>
                    {error && (
                        <div role="alert" className={styles.error}>
                            {error}{" "}
                            <button
                                className={styles.textButton}
                                onClick={() => setError("")}
                            >
                                Fechar
                            </button>
                        </div>
                    )}
                    {patientId && !patient ? (
                        <Empty
                            title="Paciente não encontrado."
                            description="Volte para a base de pacientes para continuar."
                        />
                    ) : patient ? (
                        <>
                            <Link
                                {...linkTo("/admin/pacientes")}
                                className={styles.back}
                            >
                                <FiArrowLeft /> Todos os pacientes
                            </Link>
                            <div className={styles.pageHeading}>
                                <div>
                                    <span className={styles.eyebrow}>
                                        HISTÓRICO DO PACIENTE
                                    </span>
                                    <h1>{patient.name}</h1>
                                    <p>
                                        Uma relação acompanhada ao longo do
                                        tempo.
                                    </p>
                                </div>
                                <div className={styles.headingActions}>
                                    <button
                                        className={styles.secondary}
                                        onClick={() => {
                                            setError("");
                                            setModal({
                                                kind: "patient",
                                                record: patient
                                            });
                                        }}
                                    >
                                        Editar paciente
                                    </button>
                                    <button
                                        className={styles.primary}
                                        onClick={() =>
                                            createAppointment(patient.id)
                                        }
                                    >
                                        <FiPlus /> Atendimento
                                    </button>
                                </div>
                            </div>
                            <div className={styles.stats}>
                                <Stat
                                    label="ATENDIMENTOS REALIZADOS"
                                    value={patient.visits}
                                    note="Presenciais e online"
                                />
                                <Stat
                                    label="TOTAL RECEBIDO"
                                    value={money(patient.ltv)}
                                    note={
                                        patient.unknown_values
                                            ? `${patient.unknown_values} atendimento(s) sem valor informado`
                                            : "Valores de atendimentos realizados"
                                    }
                                />
                                <Stat
                                    label="ÚLTIMO ATENDIMENTO"
                                    value={
                                        patient.last_visit
                                            ? dateLabel(patient.last_visit, {
                                                  year: undefined
                                              })
                                            : "—"
                                    }
                                    note={
                                        patient.last_visit
                                            ? dateLabel(patient.last_visit)
                                            : "Nenhuma visita com data conhecida"
                                    }
                                />
                                <Stat
                                    label="PRÓXIMO RETORNO"
                                    value={
                                        patient.next_appointment
                                            ? dateLabel(
                                                  patient.next_appointment,
                                                  { year: undefined }
                                              )
                                            : patient.next_return
                                            ? dateLabel(patient.next_return, {
                                                  year: undefined
                                              })
                                            : "—"
                                    }
                                    note={
                                        patient.next_appointment
                                            ? "Já agendado"
                                            : patient.next_return
                                            ? "Sugerido, ainda não agendado"
                                            : "Sem retorno sugerido"
                                    }
                                />
                            </div>
                            <div className={styles.profile}>
                                <div>
                                    <span className={styles.eyebrow}>
                                        DADOS E RELACIONAMENTO
                                    </span>
                                    <dl className={styles.details}>
                                        <Detail
                                            label="WhatsApp"
                                            value={patient.phone}
                                        />
                                        <Detail
                                            label="E-mail"
                                            value={patient.email}
                                        />
                                        <Detail
                                            label="Instagram"
                                            value={patient.instagram}
                                        />
                                        <Detail
                                            label="Nascimento"
                                            value={
                                                patient.dob &&
                                                dateLabel(patient.dob)
                                            }
                                        />
                                        <Detail
                                            label="Como conheceu"
                                            value={patient.source}
                                        />
                                        <Detail
                                            label="Indicado por"
                                            value={
                                                patient.referred_by
                                                    ? patientLink(
                                                          patients.find(
                                                              (p) =>
                                                                  p.id ===
                                                                  patient.referred_by
                                                          )
                                                      )
                                                    : null
                                            }
                                        />
                                    </dl>
                                </div>
                                <div className={styles.profileContact}>
                                    <h3>Contato com cuidado.</h3>
                                    <Consent value={patient.contact_consent} />
                                    <p>
                                        {patient.contact_consent
                                            ? "Contato autorizado para relacionamento. A autorização pode ser atualizada no cadastro."
                                            : "Sem autorização para contato de relacionamento. Confirme o consentimento antes de uma abordagem."}
                                    </p>
                                    {contacts(patient)}
                                    <small>
                                        {patient.referrals} paciente(s)
                                        indicado(s)
                                    </small>
                                </div>
                            </div>
                            <SectionHeading
                                title="Histórico de atendimentos"
                                aside={`${
                                    data.appointments.filter(
                                        (a) => a.patient_id === patient.id
                                    ).length
                                } registros`}
                            />
                            {renderAppointmentTable(
                                data.appointments
                                    .filter((a) => a.patient_id === patient.id)
                                    .sort((a, b) =>
                                        (b.date || "").localeCompare(
                                            a.date || ""
                                        )
                                    )
                            )}
                        </>
                    ) : section === "overview" ? (
                        <>
                            <div className={styles.pageHeading}>
                                <div>
                                    <span className={styles.eyebrow}>
                                        SEU CONSULTÓRIO, POR INTEIRO
                                    </span>
                                    <h1>
                                        Cada paciente, uma <em>história.</em>
                                    </h1>
                                    <p>O que merece sua atenção hoje.</p>
                                </div>
                                <button
                                    className={styles.primary}
                                    onClick={() => createPatient()}
                                >
                                    <FiPlus /> Novo paciente
                                </button>
                            </div>
                            <div className={styles.stats}>
                                <Stat
                                    label="PACIENTES NA BASE"
                                    value={patients.length
                                        .toString()
                                        .padStart(2, "0")}
                                    note="Relações que você acompanha"
                                />
                                <Stat
                                    label="RETORNOS DA SEMANA"
                                    value={weekReturns.length
                                        .toString()
                                        .padStart(2, "0")}
                                    note={`${
                                        returns.filter(
                                            (p) => p.next_return < weekStart
                                        ).length
                                    } de semanas anteriores`}
                                />
                                <Stat
                                    label="ATENDIMENTOS NO MÊS"
                                    value={data.appointments
                                        .filter(
                                            (a) =>
                                                a.status === "Realizado" &&
                                                a.date?.slice(0, 7) ===
                                                    day.slice(0, 7)
                                        )
                                        .length.toString()
                                        .padStart(2, "0")}
                                    note="Realizados, presenciais e online"
                                />
                                <Stat
                                    label="RECEBIDO NO MÊS"
                                    value={money(
                                        data.appointments
                                            .filter(
                                                (a) =>
                                                    a.status === "Realizado" &&
                                                    a.date?.slice(0, 7) ===
                                                        day.slice(0, 7)
                                            )
                                            .reduce(
                                                (sum, a) =>
                                                    sum + (a.amount_cents || 0),
                                                0
                                            )
                                    )}
                                    note="Soma dos valores conhecidos"
                                />
                            </div>
                            <div className={styles.dashboardGrid}>
                                <section className={styles.panel}>
                                    <SectionHeading
                                        title="Um convite para voltar"
                                        aside={
                                            <Link
                                                {...linkTo("/admin/retornos")}
                                            >
                                                Ver retornos <FiArrowUpRight />
                                            </Link>
                                        }
                                    />
                                    <p className={styles.panelCaption}>
                                        Retornos da semana e pendências
                                        anteriores.
                                    </p>
                                    <div>
                                        {returns.slice(0, 5).map((p) => (
                                            <div
                                                key={p.id}
                                                className={styles.listRow}
                                            >
                                                {patientLink(p)}
                                                <div className={styles.rowEnd}>
                                                    <strong
                                                        className={
                                                            p.next_return < day
                                                                ? styles.overdue
                                                                : undefined
                                                        }
                                                    >
                                                        {dateLabel(
                                                            p.next_return,
                                                            { year: undefined }
                                                        )}
                                                    </strong>
                                                    <small>
                                                        {p.next_return < day
                                                            ? "Em atraso"
                                                            : "Retorno sugerido"}
                                                    </small>
                                                </div>
                                            </div>
                                        ))}
                                        {!returns.length && (
                                            <Empty
                                                title="Todos os retornos em dia."
                                                description="Novas sugestões aparecem aqui após o registro do atendimento."
                                            />
                                        )}
                                    </div>
                                </section>
                                <section className={styles.panel}>
                                    <SectionHeading
                                        title="Próximos encontros"
                                        aside={
                                            <button
                                                className={styles.textButton}
                                                onClick={() =>
                                                    createAppointment("", {
                                                        status: "Agendado"
                                                    })
                                                }
                                            >
                                                <FiPlus /> Agendar
                                            </button>
                                        }
                                    />
                                    <p className={styles.panelCaption}>
                                        Agendamentos a partir de hoje.
                                    </p>
                                    {upcoming.slice(0, 5).map((a) => {
                                        const p = patients.find(
                                            (p) => p.id === a.patient_id
                                        );
                                        return (
                                            <div
                                                key={a.id}
                                                className={styles.listRow}
                                            >
                                                <div
                                                    className={styles.dateTile}
                                                >
                                                    <strong>
                                                        {a.date.slice(8)}
                                                    </strong>
                                                    <small>
                                                        {dateLabel(a.date, {
                                                            day: undefined,
                                                            year: undefined
                                                        })}
                                                    </small>
                                                </div>
                                                <div
                                                    className={styles.encounter}
                                                >
                                                    <Link
                                                        {...linkTo(
                                                            pathFor(p.id)
                                                        )}
                                                    >
                                                        {p.name}
                                                    </Link>
                                                    <small>
                                                        {a.procedure} ·{" "}
                                                        {a.modality}
                                                    </small>
                                                </div>
                                                <FiChevronRight />
                                            </div>
                                        );
                                    })}
                                    {!upcoming.length && (
                                        <Empty
                                            title="Sua agenda está aberta."
                                            description="Registre um novo agendamento para começar."
                                        />
                                    )}
                                </section>
                            </div>
                            <div className={styles.opportunities}>
                                <Link {...linkTo("/admin/reativacao")}>
                                    <FiClock />
                                    <div>
                                        <span className={styles.eyebrow}>
                                            REATIVAÇÃO
                                        </span>
                                        <h3>
                                            {inactive.length} relações para
                                            retomar
                                        </h3>
                                        <p>
                                            Sem atendimento há pelo menos seis
                                            meses.
                                        </p>
                                    </div>
                                    <FiArrowUpRight />
                                </Link>
                                <Link {...linkTo("/admin/aniversarios")}>
                                    <FiGift />
                                    <div>
                                        <span className={styles.eyebrow}>
                                            ANIVERSÁRIOS DO MÊS
                                        </span>
                                        <h3>
                                            {birthdays.length} motivos para um
                                            gesto
                                        </h3>
                                        <p>
                                            Uma oportunidade para estar
                                            presente.
                                        </p>
                                    </div>
                                    <FiArrowUpRight />
                                </Link>
                            </div>
                            <div className={styles.overviewFoot}>
                                <span>
                                    <FiShield /> Área restrita de Lorraine e
                                    Alan
                                </span>
                                <span>
                                    Presencial e online, no mesmo lugar.
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.pageHeading}>
                                <div>
                                    <span className={styles.eyebrow}>
                                        {NAV.find((n) => n[0] === section)?.[1]}
                                    </span>
                                    <h1>
                                        {TITLES[section]?.[0]}{" "}
                                        <em>{TITLES[section]?.[1]}</em>
                                    </h1>
                                    <p>{TITLES[section]?.[2]}</p>
                                </div>
                                {section === "pacientes" ? (
                                    <button
                                        className={styles.primary}
                                        onClick={() => createPatient()}
                                    >
                                        <FiPlus /> Novo paciente
                                    </button>
                                ) : section === "atendimentos" ? (
                                    <button
                                        className={styles.primary}
                                        onClick={() => createAppointment()}
                                    >
                                        <FiPlus /> Novo atendimento
                                    </button>
                                ) : null}
                            </div>
                            {section === "ranking" ? (
                                <Rankings
                                    patients={patients}
                                    patientLink={patientLink}
                                />
                            ) : (
                                <>
                                    <div className={styles.toolbar}>
                                        <label className={styles.search}>
                                            <FiSearch />
                                            <input
                                                aria-label="Buscar pacientes"
                                                placeholder={
                                                    section === "atendimentos"
                                                        ? "Buscar paciente ou procedimento…"
                                                        : "Buscar nome, e-mail ou WhatsApp…"
                                                }
                                                value={query}
                                                onChange={(e) =>
                                                    setQuery(e.target.value)
                                                }
                                            />
                                        </label>
                                        {section !== "online" && (
                                            <div
                                                className={styles.filters}
                                                role="group"
                                                aria-label="Filtrar registros"
                                            >
                                                {(section === "atendimentos"
                                                    ? ["Todos", ...STATUSES]
                                                    : section === "retornos"
                                                    ? [
                                                          "Todos",
                                                          "Nesta semana",
                                                          "Em atraso"
                                                      ]
                                                    : [
                                                          "Todos",
                                                          "Com consentimento",
                                                          "Sem consentimento"
                                                      ]
                                                ).map((v) => (
                                                    <button
                                                        key={v}
                                                        type="button"
                                                        aria-pressed={
                                                            filter === v
                                                        }
                                                        onClick={() =>
                                                            setFilter(v)
                                                        }
                                                    >
                                                        {v}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <span className={styles.resultCount}>
                                            {section === "atendimentos"
                                                ? appointments.length
                                                : section === "online"
                                                ? data.intakes.filter((i) =>
                                                      matchesSearch(i, query)
                                                  ).length
                                                : visiblePatients.length}{" "}
                                            registros
                                        </span>
                                    </div>
                                    {section === "atendimentos" ? (
                                        renderAppointmentTable(appointments)
                                    ) : section === "online" ? (
                                        <div className={styles.tableWrap}>
                                            <table
                                                className={`${styles.table} ${styles.intakeTable}`}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Solicitação</th>
                                                        <th>Paciente</th>
                                                        <th>Pagamento</th>
                                                        <th>Agendamento</th>
                                                        <th>CRM</th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.intakes
                                                        .filter((i) =>
                                                            matchesSearch(
                                                                i,
                                                                query
                                                            )
                                                        )
                                                        .map((i) => (
                                                            <tr key={i.id}>
                                                                <td data-label="Solicitação">
                                                                    #{i.id}
                                                                    <small
                                                                        className={
                                                                            styles.block
                                                                        }
                                                                    >
                                                                        {dateLabel(
                                                                            i.created_at
                                                                        )}
                                                                    </small>
                                                                </td>
                                                                <td data-label="Paciente">
                                                                    <strong>
                                                                        {i.name}
                                                                    </strong>
                                                                    <small
                                                                        className={
                                                                            styles.block
                                                                        }
                                                                    >
                                                                        {
                                                                            i.email
                                                                        }
                                                                    </small>
                                                                </td>
                                                                <td data-label="Pagamento">
                                                                    <span
                                                                        className={
                                                                            styles.badge
                                                                        }
                                                                    >
                                                                        {i.payment_status ===
                                                                        "paid"
                                                                            ? "Pago"
                                                                            : i.payment_status ===
                                                                              "refunded"
                                                                            ? "Estornado"
                                                                            : "Pendente"}
                                                                    </span>
                                                                </td>
                                                                <td data-label="Agendamento">
                                                                    {i.scheduled_at
                                                                        ? dateLabel(
                                                                              i.scheduled_at,
                                                                              {
                                                                                  hour: "2-digit",
                                                                                  minute: "2-digit"
                                                                              }
                                                                          )
                                                                        : "A definir"}
                                                                </td>
                                                                <td data-label="CRM">
                                                                    {i.patient_id ? (
                                                                        <span
                                                                            className={
                                                                                styles.badge
                                                                            }
                                                                        >
                                                                            <FiCheck />{" "}
                                                                            Vinculada
                                                                        </span>
                                                                    ) : (
                                                                        <span
                                                                            className={
                                                                                styles.muted
                                                                            }
                                                                        >
                                                                            A
                                                                            vincular
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td data-action="true">
                                                                    <button
                                                                        className={
                                                                            styles.textButton
                                                                        }
                                                                        onClick={() =>
                                                                            openIntake(
                                                                                i.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Abrir{" "}
                                                                        <FiArrowUpRight />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                            {!data.intakes.length && (
                                                <Empty
                                                    title="Nenhuma consulta online recebida."
                                                    description="As solicitações do formulário público aparecerão aqui."
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        renderPatientTable(visiblePatients)
                                    )}
                                    {section === "retornos" && (
                                        <p className={styles.footnote}>
                                            Datas sugeridas, sem agendamento
                                            automático. Um atendimento mais
                                            recente substitui sugestões antigas;
                                            um próximo atendimento agendado pode
                                            resolver o retorno.
                                        </p>
                                    )}
                                    {section === "reativacao" && (
                                        <p className={styles.footnote}>
                                            A lista considera a última visita
                                            com data conhecida e exclui
                                            pacientes com novo atendimento
                                            agendado. Registros históricos
                                            incompletos devem ser revisados.
                                        </p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </main>
            </div>
            {toast && (
                <div role="status" className={styles.toast}>
                    <FiCheck />
                    {toast}
                </div>
            )}
            {intakeBusy && (
                <div role="status" className={styles.toast}>
                    Carregando consulta…
                </div>
            )}
            <AnimatePresence>
                {modal && (
                    <Editor
                        key="editor"
                        modal={modal}
                        patients={patients}
                        busy={busy}
                        error={error}
                        onClose={() => {
                            if (!busy) {
                                setModal(null);
                                setError("");
                            }
                        }}
                        onSave={save}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {intake && !modal && (
                    <IntakeDrawer
                        key="intake"
                        intake={intake}
                        patients={patients}
                        appointments={data.appointments}
                        busy={busy}
                        error={error}
                        onClose={() => {
                            setIntake(null);
                            setError("");
                        }}
                        onLink={linkIntake}
                        onCreatePatient={() =>
                            createPatient({
                                name: intake.name,
                                email: intake.email,
                                phone: intake.phone || "",
                                dob: intake.dob || "",
                                source: "Não informado"
                            })
                        }
                        onAppointment={() => {
                            const existing = data.appointments.find(
                                (a) => a.source_consultation_id === intake.id
                            );
                            if (existing)
                                setModal({
                                    kind: "appointment",
                                    record: existing
                                });
                            else
                                createAppointment(intake.patient_id, {
                                    modality: "Online",
                                    date: intake.scheduled_at
                                        ? today(new Date(intake.scheduled_at))
                                        : day,
                                    source_consultation_id: intake.id
                                });
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
function Stat({ label, value, note }) {
    return (
        <div className={styles.stat}>
            <span className={styles.eyebrow}>{label}</span>
            <strong>
                {typeof value === "string"
                    ? value.replace(/\u00a0/g, " ")
                    : value}
            </strong>
            <small>{note}</small>
        </div>
    );
}
function SectionHeading({ title, aside }) {
    return (
        <div className={styles.sectionHeading}>
            <h2>{title}</h2>
            {aside && <span>{aside}</span>}
        </div>
    );
}
function Detail({ label, value }) {
    return (
        <div>
            <dt>{label}</dt>
            <dd>{value || "Não informado"}</dd>
        </div>
    );
}
function Consent({ value }) {
    return (
        <span
            className={`${styles.badge} ${
                value ? styles.consented : styles.unconsented
            }`}
        >
            {value ? <FiCheck /> : <FiShield />}
            {value ? "Contato autorizado" : "Sem consentimento"}
        </span>
    );
}
function Status({ value }) {
    return (
        <span
            className={`${styles.badge} ${
                value === "Realizado"
                    ? styles.completed
                    : value === "Agendado"
                    ? styles.scheduled
                    : styles.unconsented
            }`}
        >
            {value === "Realizado" && <FiCheck />}
            {value}
        </span>
    );
}
function Empty({ title, description, action, label }) {
    return (
        <div className={styles.empty}>
            <FiUsers />
            <h3>{title}</h3>
            <p>{description}</p>
            {action && (
                <button className={styles.secondary} onClick={action}>
                    {label}
                </button>
            )}
        </div>
    );
}
function Contact({ patient, demo }) {
    if (!patient.contact_consent)
        return <span className={styles.muted}>Contato não autorizado</span>;
    if (demo) return <span className={styles.muted}>Contato simulado</span>;
    const phone = patient.phone?.replace(/\D/g, "");
    if (phone && phone.length >= 10 && phone.length <= 13)
        return (
            <a
                className={styles.textButton}
                href={`https://wa.me/${
                    phone.length <= 11 ? `55${phone}` : phone
                }`}
                target="_blank"
                rel="noopener noreferrer"
            >
                WhatsApp <FiArrowUpRight />
            </a>
        );
    if (patient.email)
        return (
            <a className={styles.textButton} href={`mailto:${patient.email}`}>
                E-mail <FiArrowUpRight />
            </a>
        );
    return <span className={styles.muted}>Sem contato informado</span>;
}
function Rankings({ patients, patientLink }) {
    const ltv = [...patients].sort((a, b) => b.ltv - a.ltv).slice(0, 10),
        referrals = [...patients]
            .filter((p) => p.referrals)
            .sort((a, b) => b.referrals - a.referrals)
            .slice(0, 10);
    return (
        <div className={styles.rankingGrid}>
            {[
                ["Total recebido", ltv, "ltv"],
                ["Pacientes que indicam", referrals, "referrals"]
            ].map(([title, rows, key]) => (
                <section className={styles.panel} key={key}>
                    <SectionHeading title={title} />
                    <p className={styles.panelCaption}>
                        {key === "ltv"
                            ? "Apenas valores conhecidos de atendimentos realizados."
                            : "Quantidade de pacientes diretamente indicados."}
                    </p>
                    {rows.map((p, i) => (
                        <div key={p.id} className={styles.rankRow}>
                            <span className={styles.rankNumber}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                                {patientLink(p)}
                                <div className={styles.rankTrack}>
                                    <span
                                        style={{
                                            width: `${
                                                rows[0][key]
                                                    ? Math.round(
                                                          (p[key] /
                                                              rows[0][key]) *
                                                              100
                                                      )
                                                    : 0
                                            }%`
                                        }}
                                    />
                                </div>
                            </div>
                            <strong>
                                {key === "ltv"
                                    ? money(p.ltv)
                                    : `${p.referrals} indicações`}
                                {key === "ltv" && p.unknown_values > 0 && (
                                    <small className={styles.block}>
                                        Valor parcial
                                    </small>
                                )}
                            </strong>
                        </div>
                    ))}
                    {!rows.length && (
                        <Empty
                            title="As relações se constroem com o tempo."
                            description="Registre quem indicou o paciente para acompanhar as indicações."
                        />
                    )}
                </section>
            ))}
        </div>
    );
}
function RecordDate({ value }) {
    if (!value) return "Não informado";
    return (
        <time dateTime={value} className={styles.recordDate}>
            {dateLabel(value, { year: undefined })}
            <small className={styles.block}>{value.slice(0, 4)}</small>
        </time>
    );
}
function Field({ label, children, wide = false }) {
    const id = useId();
    const hasChoices = Children.toArray(children).some(
        (child) => isValidElement(child) && child.type === Choice
    );
    return (
        <div className={`${styles.field} ${wide ? styles.wide : ""}`}>
            {hasChoices ? (
                <span>{label}</span>
            ) : (
                <label htmlFor={id}>{label}</label>
            )}
            {Children.map(children, (child) =>
                isValidElement(child) && ["input", Choice].includes(child.type)
                    ? cloneElement(child, {
                          id,
                          ...(child.type === Choice ? { label } : {})
                      })
                    : child
            )}
        </div>
    );
}
function Choice({
    value,
    onChange,
    options,
    name,
    id,
    label,
    disabled = false,
    required = false
}) {
    const [query, setQuery] = useState("");
    const searchable = options.some((option) => typeof option !== "string");
    const choices = options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option
    );
    const selected = choices.find((option) => option.value === (value || ""));
    const visible = choices.filter(
        (option) =>
            (!required || option.value !== "") &&
            (!query || matchesSearch({ name: option.label }, query))
    );
    return (
        <div className={searchable ? styles.patientPicker : undefined}>
            {searchable &&
                (disabled ? (
                    <div className={styles.lockedChoice}>
                        {selected?.label || "Paciente vinculado"}
                        <FiShield aria-hidden="true" />
                    </div>
                ) : (
                    <>
                        <label className={styles.pickerSearch}>
                            <FiSearch aria-hidden="true" />
                            <input
                                type="search"
                                aria-label={`Buscar em ${label || "pacientes"}`}
                                placeholder="Buscar paciente pelo nome…"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                        </label>
                        {value && (
                            <p className={styles.pickerSelected}>
                                <FiCheck aria-hidden="true" /> {selected?.label}
                            </p>
                        )}
                    </>
                ))}
            <RadioGroup
                id={id}
                aria-label={label}
                aria-required={required || undefined}
                name={name}
                value={value || ""}
                disabled={disabled}
                onChange={(next) => onChange({ target: { value: next } })}
                className={searchable ? styles.patientChoices : styles.choices}
            >
                {(!disabled || !searchable) &&
                    visible.map((option) => (
                        <RadioGroup.Option
                            as="button"
                            type="button"
                            key={option.value}
                            value={option.value}
                            className={styles.choice}
                        >
                            {({ checked }) => (
                                <>
                                    <span>{option.label}</span>
                                    <span
                                        className={styles.choiceMark}
                                        aria-hidden="true"
                                    >
                                        {checked && <FiCheck />}
                                    </span>
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
            </RadioGroup>
            {searchable && !disabled && !visible.length && (
                <p className={styles.pickerEmpty}>
                    Nenhum paciente encontrado.
                </p>
            )}
        </div>
    );
}
function Editor({ modal, patients, busy, error, onClose, onSave }) {
    const [validationError, setValidationError] = useState("");
    const [record, setRecord] = useState(modal.record),
        [amount, setAmount] = useState(
            modal.record.amount_cents == null
                ? ""
                : (modal.record.amount_cents / 100).toFixed(2)
        );
    const patientForm = modal.kind === "patient",
        editing = Boolean(record.id);
    const change = (key) => (e) => {
        setValidationError("");
        setRecord((s) => ({
            ...s,
            [key]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        }));
    };
    const submit = (e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.currentTarget));
        const saved = { ...record, ...values };
        if (!patientForm && !saved.patient_id) {
            setValidationError(
                "Escolha um paciente para registrar o atendimento."
            );
            e.currentTarget.querySelector('input[type="search"]')?.focus();
            return;
        }
        if (patientForm)
            saved.contact_consent = values.contact_consent === "on";
        else
            saved.amount_cents =
                values.amount === ""
                    ? null
                    : Math.round(Number(values.amount.replace(",", ".")) * 100);
        onSave(modal.kind, saved, editing ? record.id : null, record.revision);
    };
    return (
        <Drawer
            onClose={onClose}
            title={`${
                editing ? "Editar" : patientForm ? "Novo" : "Registrar"
            } ${patientForm ? "paciente" : "atendimento"}`}
            subtitle={
                patientForm
                    ? "Um cadastro, todo o histórico."
                    : "Registre um atendimento realizado ou um próximo agendamento."
            }
        >
            <form onSubmit={submit} className={styles.editorForm}>
                <div className={styles.formScroll}>
                    <div className={styles.formGrid}>
                        {patientForm ? (
                            <>
                                <FormSection
                                    title="Identidade e contato"
                                    description="Os dados essenciais para acompanhar o paciente."
                                >
                                    <Field label="Nome completo *" wide>
                                        <input
                                            value={record.name}
                                            name="name"
                                            onChange={change("name")}
                                            required
                                            maxLength={200}
                                            autoFocus
                                        />
                                    </Field>
                                    <Field label="WhatsApp">
                                        <input
                                            type="tel"
                                            value={record.phone || ""}
                                            name="phone"
                                            onChange={change("phone")}
                                            maxLength={30}
                                            placeholder="(11) 99999-9999"
                                        />
                                    </Field>
                                    <Field label="E-mail">
                                        <input
                                            type="email"
                                            value={record.email || ""}
                                            name="email"
                                            onChange={change("email")}
                                            maxLength={200}
                                        />
                                    </Field>
                                    <Field label="Instagram">
                                        <input
                                            value={record.instagram || ""}
                                            name="instagram"
                                            onChange={change("instagram")}
                                            maxLength={80}
                                            placeholder="@nome"
                                        />
                                    </Field>
                                    <Field label="Data de nascimento">
                                        <input
                                            type="date"
                                            max={today()}
                                            value={record.dob || ""}
                                            name="dob"
                                            onChange={change("dob")}
                                            onInput={change("dob")}
                                        />
                                    </Field>
                                </FormSection>
                                <FormSection
                                    title="Relacionamento"
                                    description="Como esse vínculo começou."
                                >
                                    <Field label="Como conheceu" wide>
                                        <Choice
                                            value={record.source}
                                            name="source"
                                            onChange={change("source")}
                                            options={SOURCES}
                                        />
                                    </Field>
                                    <Field label="Indicado por" wide>
                                        <Choice
                                            value={record.referred_by}
                                            name="referred_by"
                                            onChange={change("referred_by")}
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Não informado"
                                                },
                                                ...patients
                                                    .filter(
                                                        (p) =>
                                                            p.id !== record.id
                                                    )
                                                    .map((p) => ({
                                                        value: p.id,
                                                        label: p.name
                                                    }))
                                            ]}
                                        />
                                    </Field>
                                </FormSection>
                                <label
                                    className={`${styles.checkbox} ${styles.wide}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={record.contact_consent}
                                        name="contact_consent"
                                        onChange={change("contact_consent")}
                                    />
                                    <span>
                                        <strong>
                                            Consentimento para contato
                                        </strong>
                                        <small>
                                            Marque apenas se o paciente
                                            autorizou contatos de
                                            relacionamento. Consentimento para
                                            atendimento é separado.
                                        </small>
                                    </span>
                                </label>
                            </>
                        ) : (
                            <>
                                <FormSection
                                    title="Paciente e atendimento"
                                    description="Confira o status antes de salvar o registro."
                                >
                                    <Field label="Paciente *" wide>
                                        <Choice
                                            value={record.patient_id}
                                            name="patient_id"
                                            onChange={change("patient_id")}
                                            required
                                            disabled={Boolean(
                                                record.source_consultation_id
                                            )}
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Selecione o paciente"
                                                },
                                                ...patients.map((p) => ({
                                                    value: p.id,
                                                    label: p.name
                                                }))
                                            ]}
                                        />
                                    </Field>
                                    <Field label="Status" wide>
                                        <Choice
                                            value={record.status}
                                            name="status"
                                            onChange={change("status")}
                                            options={STATUSES}
                                        />
                                        <small>
                                            {record.status === "Realizado"
                                                ? "Este atendimento entra no histórico e seu valor compõe o total recebido."
                                                : record.status === "Agendado"
                                                ? "Agendamentos não entram no total recebido. Se o atendimento já aconteceu, selecione Realizado."
                                                : "Atendimentos cancelados ou com falta não entram no total recebido."}
                                        </small>
                                    </Field>
                                    <Field
                                        label={`Data ${
                                            record.status === "Agendado"
                                                ? "*"
                                                : "(opcional para histórico)"
                                        }`}
                                    >
                                        <input
                                            type="date"
                                            value={record.date || ""}
                                            name="date"
                                            onChange={change("date")}
                                            onInput={change("date")}
                                            required={
                                                record.status === "Agendado"
                                            }
                                            max={
                                                record.status === "Realizado"
                                                    ? today()
                                                    : undefined
                                            }
                                        />
                                    </Field>
                                    <Field label="Procedimento *" wide>
                                        <Choice
                                            value={record.procedure}
                                            name="procedure"
                                            onChange={change("procedure")}
                                            options={PROCEDURES}
                                        />
                                    </Field>
                                    <Field label="Modalidade" wide>
                                        <Choice
                                            value={record.modality}
                                            name="modality"
                                            onChange={change("modality")}
                                            options={MODALITIES}
                                        />
                                    </Field>
                                </FormSection>
                                <FormSection
                                    title="Valor e pagamento"
                                    description="Informe o valor do atendimento, quando conhecido."
                                >
                                    <Field label="Valor (R$)">
                                        <input
                                            inputMode="decimal"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="1000000"
                                            name="amount"
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            placeholder="Deixe vazio se desconhecido"
                                        />
                                    </Field>
                                    <Field label="Forma de pagamento" wide>
                                        <Choice
                                            value={record.payment_method}
                                            name="payment_method"
                                            onChange={change("payment_method")}
                                            options={PAYMENTS}
                                        />
                                    </Field>
                                </FormSection>
                                <FormSection title="Continuidade do cuidado">
                                    <Field
                                        label="Próximo retorno sugerido"
                                        wide
                                    >
                                        <input
                                            type="date"
                                            min={record.date || undefined}
                                            value={record.next_return || ""}
                                            name="next_return"
                                            onChange={change("next_return")}
                                            onInput={change("next_return")}
                                        />
                                        <small>
                                            Esta data é uma sugestão. Ela não
                                            cria um agendamento.
                                        </small>
                                    </Field>
                                </FormSection>
                                {record.source_consultation_id && (
                                    <div
                                        className={`${styles.notice} ${styles.wide}`}
                                    >
                                        Vinculado à consulta online #
                                        {record.source_consultation_id}. Data e
                                        valor precisam ser conferidos; o
                                        pagamento do site não confirma presença.
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <footer className={styles.editorFooter}>
                    {(error || validationError) && (
                        <p role="alert" className={styles.error}>
                            {error || validationError}
                        </p>
                    )}
                    <div className={styles.formFooter}>
                        <button
                            type="button"
                            className={styles.secondary}
                            disabled={busy}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button className={styles.primary} disabled={busy}>
                            {busy
                                ? "Salvando…"
                                : editing
                                ? "Salvar alterações"
                                : patientForm
                                ? "Cadastrar paciente"
                                : "Registrar atendimento"}
                        </button>
                    </div>
                </footer>
            </form>
        </Drawer>
    );
}
function FormSection({ title, description, children }) {
    return (
        <fieldset className={styles.formSection}>
            <legend>{title}</legend>
            {description && <p>{description}</p>}
            <div className={styles.formGrid}>{children}</div>
        </fieldset>
    );
}
function Drawer({ title, subtitle, onClose, children, scrollable = false }) {
    const reducedMotion = useReducedMotion();
    const transition = {
        duration: reducedMotion ? 0 : 0.22,
        ease: [0.22, 1, 0.36, 1]
    };
    return (
        <Dialog
            open
            onClose={onClose}
            className={`${styles.root} ${styles.dialog}`}
        >
            <motion.div
                className={styles.backdrop}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
            />
            <Dialog.Panel
                as={motion.div}
                className={styles.drawer}
                initial={{
                    x: reducedMotion ? 0 : "100%",
                    opacity: reducedMotion ? 1 : 0
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: reducedMotion ? 0 : "100%", opacity: 0 }}
                transition={transition}
            >
                <header>
                    <div>
                        <span className={styles.eyebrow}>LORRAINE CRM</span>
                        <Dialog.Title as="h2">{title}</Dialog.Title>
                        <Dialog.Description as="p">
                            {subtitle}
                        </Dialog.Description>
                    </div>
                    <button
                        aria-label="Fechar painel"
                        className={styles.iconButton}
                        onClick={onClose}
                    >
                        <FiX />
                    </button>
                </header>
                <div
                    className={`${styles.drawerBody} ${
                        scrollable ? styles.intakeBody : ""
                    }`}
                >
                    {children}
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
function IntakeDrawer({
    intake,
    patients,
    appointments,
    busy,
    error,
    onClose,
    onLink,
    onCreatePatient,
    onAppointment
}) {
    const [pid, setPid] = useState("");
    const linked = patients.find((p) => p.id === intake.patient_id);
    const recorded = appointments.some(
        (a) => a.source_consultation_id === intake.id
    );
    return (
        <Drawer
            title={`Consulta online #${intake.id}`}
            subtitle="Formulário original recebido pelo site."
            onClose={onClose}
            scrollable
        >
            <h3 className={styles.intakeName}>{intake.name}</h3>
            <dl className={styles.details}>
                <Detail label="E-mail" value={intake.email} />
                <Detail label="WhatsApp" value={intake.phone} />
                <Detail
                    label="Nascimento"
                    value={intake.dob && dateLabel(intake.dob)}
                />
                <Detail label="Cidade" value={intake.city} />
                <Detail
                    label="Pagamento"
                    value={
                        intake.payment_status === "paid"
                            ? "Confirmado"
                            : "Pendente"
                    }
                />
                <Detail
                    label="Agenda do site"
                    value={
                        intake.scheduled_at &&
                        dateLabel(intake.scheduled_at, {
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                />
            </dl>
            <div className={styles.intakeSection}>
                <h3>Queixa e histórico informado</h3>
                <dl className={styles.details}>
                    <Detail
                        label="Queixa principal"
                        value={intake.main_concern}
                    />
                    <Detail label="Duração" value={intake.concern_duration} />
                    <Detail
                        label="Tratamentos anteriores"
                        value={intake.prior_treatments}
                    />
                    <Detail label="Alergias" value={intake.allergies} />
                    <Detail label="Medicações" value={intake.medications} />
                    <Detail label="Condições" value={intake.conditions} />
                    <Detail label="Tipo de pele" value={intake.skin_type} />
                    <Detail
                        label="Notas administrativas"
                        value={intake.admin_notes}
                    />
                </dl>
            </div>
            <div className={styles.intakeSection}>
                <h3>Fotos enviadas</h3>
                {intake.photos?.length ? (
                    <div className={styles.photos}>
                        {intake.photos.map((photo, i) => (
                            <a
                                key={i}
                                href={`/api/admin/photo?intake=${intake.id}&index=${i}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    unoptimized
                                    width={160}
                                    height={160}
                                    src={`/api/admin/photo?intake=${intake.id}&index=${i}`}
                                    alt={`Foto enviada pelo paciente ${i + 1}`}
                                />
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className={styles.muted}>Nenhuma foto enviada.</p>
                )}
            </div>
            <div className={styles.intakeSection}>
                <h3>Consentimentos do formulário</h3>
                <p className={styles.muted}>
                    Telemedicina: {intake.consent_telemedicine ? "Sim" : "Não"}{" "}
                    · LGPD: {intake.consent_lgpd ? "Sim" : "Não"} · Termos:{" "}
                    {intake.consent_terms ? "Sim" : "Não"}
                </p>
            </div>
            <div className={styles.intakeSection}>
                <h3>
                    {linked
                        ? "Paciente vinculado"
                        : "Conectar ao histórico do paciente"}
                </h3>
                {linked ? (
                    <>
                        <p>{linked.name}</p>
                        <button
                            className={styles.primary}
                            onClick={onAppointment}
                        >
                            {recorded
                                ? "Ver atendimento registrado"
                                : "Registrar atendimento online"}
                        </button>
                    </>
                ) : (
                    <>
                        <Field label="Escolher paciente existente">
                            <Choice
                                value={pid}
                                onChange={(e) => setPid(e.target.value)}
                                options={[
                                    {
                                        value: "",
                                        label: "Selecione um paciente"
                                    },
                                    ...patients.map((p) => ({
                                        value: p.id,
                                        label: p.name
                                    }))
                                ]}
                            />
                        </Field>
                        <div className={styles.inlineActions}>
                            <button
                                className={styles.primary}
                                disabled={!pid || busy}
                                onClick={() => onLink(intake.id, pid)}
                            >
                                {busy ? "Vinculando…" : "Vincular paciente"}
                            </button>
                            <button
                                className={styles.secondary}
                                onClick={onCreatePatient}
                            >
                                Cadastrar novo paciente
                            </button>
                        </div>
                        <p className={styles.footnote}>
                            Após cadastrar, selecione o novo paciente aqui para
                            confirmar o vínculo. O CRM não mescla cadastros
                            automaticamente.
                        </p>
                    </>
                )}
                {error && (
                    <p role="alert" className={styles.error}>
                        {error}
                    </p>
                )}
            </div>
        </Drawer>
    );
}
