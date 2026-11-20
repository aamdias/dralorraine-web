import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { BookingLayout } from "@components/Booking/BookingLayout";
import styles from "@components/Booking/Booking.module.scss";
import { WhatsAppIcon } from "@components/Layout/SiteActions";
import { Chevron } from "@components/Chevron";
import SEO from "@components/SEO/SEO";
import { consultationWhatsAppUrl } from "@utils/consultationContact";
import { SITE } from "@utils/site";
import { treatments } from "@data/treatments";

const STORAGE_KEY = "consulta_agendamento_v1";
const FLOW_VERSION = 2;

const steps = [
    { id: 1, label: "Seus dados" },
    { id: 2, label: "Motivo da consulta" },
    { id: 3, label: "Fotos" },
    { id: 4, label: "Consentimento" },
    { id: 5, label: "Pagamento" },
    { id: 6, label: "Escolha do horário" }
];

const CONSULTATION_PRICE_LABEL = "R$ 350";

function isPaid(consultation) {
    return (
        consultation.payment_status === "paid" ||
        consultation.status === "paid" ||
        consultation.status === "scheduled"
    );
}

function isScheduled(consultation) {
    return (
        consultation?.scheduling_status === "scheduled" ||
        consultation?.status === "scheduled"
    );
}

const PRESENCIAL_CITIES = ["Campinas", "São Paulo"];

const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    mainConcern: "",
    concernDuration: "",
    allergies: "",
    medications: "",
    conditions: "",
    photos: [], // [{ url, pathname, name, size, previewUrl }]
    consentTelemedicine: false,
    consentLgpd: false,
    consentTerms: false,
    consultaId: null, // set after /api/consulta insert at Terms → Payment
    initiationNotifiedAt: ""
};

function normalizeRestoredStep(step, savedFlowVersion) {
    const parsedStep = Number(step) || 1;

    if (savedFlowVersion !== FLOW_VERSION && parsedStep > 2) {
        return parsedStep - 1;
    }

    return parsedStep;
}

export default function AgendarPage() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState(initialData);
    const [paymentReturn, setPaymentReturn] = useState("");
    const [paymentSessionId, setPaymentSessionId] = useState("");
    const [hydrated, setHydrated] = useState(false);
    // "" → escolha de modalidade; "video" → fluxo de 6 passos;
    // "presencial" → painel com WhatsApp (não há agendamento online).
    const [modality, setModality] = useState("");
    const workspace = useRef(null);
    const focusNext = useRef(false);

    useEffect(() => {
        let restoredData = initialData;
        let restoredStep = 1;
        let restoredModality = "";

        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                restoredData = { ...initialData, ...parsed.data };
                if (parsed.step) {
                    restoredStep = normalizeRestoredStep(
                        parsed.step,
                        parsed.flowVersion
                    );
                }
                restoredModality = parsed.modality || "";
                // Agendamentos salvos antes da escolha de modalidade existir
                // só podiam ser videoconsulta — não devolve essa pessoa
                // para a tela de escolha.
                if (!restoredModality && restoredStep > 1) {
                    restoredModality = "video";
                }
            }
        } catch (e) {
            // ignore
        }

        const params = new URLSearchParams(window.location.search);
        const consultaId = Number(params.get("consulta"));
        const payment = params.get("payment") || "";
        const sessionId = params.get("session_id") || "";

        if (consultaId) {
            restoredData = { ...restoredData, consultaId };
            restoredStep = 5;
            restoredModality = "video";
        }

        if (payment === "stripe_cancel") {
            restoredStep = 5;
            restoredModality = "video";
        }

        setData(restoredData);
        setModality(restoredModality);
        setStep(Math.min(steps.length, Math.max(1, restoredStep)));
        setPaymentReturn(payment);
        setPaymentSessionId(sessionId);
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (
            !hydrated ||
            paymentReturn !== "stripe_success" ||
            !data.consultaId
        ) {
            return;
        }

        let active = true;

        const verifyReturnedPayment = async () => {
            try {
                if (paymentSessionId) {
                    const confirmationResponse = await fetch(
                        "/api/payments/confirm",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                consultationId: data.consultaId,
                                sessionId: paymentSessionId
                            })
                        }
                    );
                    const confirmationBody = await confirmationResponse
                        .json()
                        .catch(() => ({}));

                    if (!active) return;

                    if (confirmationBody.paid) {
                        setStep(6);
                        return;
                    }
                }

                const response = await fetch(
                    `/api/consultations/${data.consultaId}`
                );
                const body = await response.json().catch(() => ({}));

                if (!active || !response.ok) return;

                if (isPaid(body)) {
                    setStep(6);
                } else {
                    setStep(5);
                }
            } catch (e) {
                if (active) setStep(5);
            }
        };

        verifyReturnedPayment();

        return () => {
            active = false;
        };
    }, [data.consultaId, hydrated, paymentReturn, paymentSessionId]);

    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    flowVersion: FLOW_VERSION,
                    step,
                    modality,
                    data: getSerializableData(data)
                })
            );
        } catch (e) {
            // ignore
        }
    }, [step, data, modality, hydrated]);

    useEffect(() => {
        if (!focusNext.current) return;
        focusNext.current = false;
        workspace.current?.querySelector("h1")?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [modality, step]);

    const update = (patch) => setData((current) => ({ ...current, ...patch }));
    const next = useCallback((patch) => {
        focusNext.current = true;
        if (patch) setData((current) => ({ ...current, ...patch }));
        setStep((current) => Math.min(steps.length, current + 1));
    }, []);
    const back = () => {
        focusNext.current = true;
        setStep((current) => Math.max(1, current - 1));
    };
    const choose = (value) => {
        focusNext.current = true;
        setModality(value);
    };

    let activeStep;
    if (modality === "video") {
        switch (step) {
            case 1:
                activeStep = (
                    <StepAboutYou data={data} update={update} onNext={next} />
                );
                break;
            case 2:
                activeStep = (
                    <StepConcern
                        data={data}
                        update={update}
                        onNext={next}
                        onBack={back}
                    />
                );
                break;
            case 3:
                activeStep = (
                    <StepPhotos
                        data={data}
                        update={update}
                        onNext={next}
                        onBack={back}
                    />
                );
                break;
            case 4:
                activeStep = (
                    <StepConsent
                        data={data}
                        update={update}
                        onNext={next}
                        onBack={back}
                    />
                );
                break;
            case 5:
                activeStep = (
                    <StepPayment
                        data={data}
                        paymentReturn={paymentReturn}
                        paymentSessionId={paymentSessionId}
                        onNext={next}
                    />
                );
                break;
            case 6:
                activeStep = <StepSchedule data={data} />;
                break;
        }
    }

    return (
        <BookingLayout>
            <SEO
                title="Agendar Consulta | Dra. Lorraine Souza"
                description="Agende consulta presencial em Campinas ou São Paulo, ou escolha a videoconsulta com a Dra. Lorraine Souza."
                image="/images/home/lo-8137-hd.jpg"
                url="/consulta/agendar"
                noindex
            />
            <div
                ref={workspace}
                className={`${styles.container} ${styles.workspace}`}
                data-choice={!modality}
            >
                {!modality ? (
                    <>
                        <div className={styles.introduction}>
                            <p className={styles.eyebrow}>
                                Dermatologia · Agendamento
                            </p>
                            <h1 className={styles.heading} tabIndex={-1}>
                                Agende sua <em>consulta</em>.
                            </h1>
                            <p className={styles.lead}>
                                Escolha o formato que faz sentido para você.
                            </p>
                        </div>
                        <div className={styles.portrait}>
                            <Image
                                src="/images/home/lo-8137-hd.jpg"
                                alt="Dra. Lorraine Souza no consultório"
                                quality={88}
                                fill
                                sizes="(min-width: 1176px) 435px, (min-width: 1024px) 38vw, 150px"
                            />
                        </div>
                        <ModalityChoice
                            onChoose={choose}
                            resumeStep={step > 1}
                        />
                    </>
                ) : (
                    <>
                        <aside
                            className={styles.rail}
                            aria-label="Etapas do agendamento"
                        >
                            <div className={styles.railNav}>
                                <p className={styles.eyebrow}>
                                    {modality === "video"
                                        ? "Videoconsulta"
                                        : "Presencial"}
                                </p>
                                <button
                                    type="button"
                                    className={styles.textButton}
                                    onClick={() => choose("")}
                                >
                                    Trocar modalidade
                                </button>
                            </div>
                            {modality === "video" && (
                                <StepProgress currentStep={step} />
                            )}
                        </aside>
                        <section
                            className={styles.panel}
                            aria-labelledby="booking-step-title"
                        >
                            {modality === "presencial" ? (
                                <StepPresencial />
                            ) : (
                                activeStep
                            )}
                        </section>
                    </>
                )}
            </div>
        </BookingLayout>
    );
}

function ModalityChoice({ onChoose, resumeStep }) {
    return (
        <div className={styles.choices}>
            <article className={styles.choice}>
                <h2 className={styles.choiceTitle}>Consulta presencial</h2>
                <p>
                    Exame de pele no consultório e procedimentos quando
                    indicados.
                </p>
                <div className={styles.choiceBar}>
                    <div className={styles.choiceMeta}>
                        <strong>Campinas e São Paulo</strong>
                        Data e valor combinados por WhatsApp
                    </div>
                    <button
                        type="button"
                        className={styles.secondary}
                        onClick={() => onChoose("presencial")}
                    >
                        Ver como agendar <Chevron />
                    </button>
                </div>
            </article>
            <article className={styles.choice} data-featured="true">
                <h2 className={styles.choiceTitle}>Videoconsulta</h2>
                <p>
                    Atendimento por vídeo de qualquer lugar do Brasil, com
                    conduta por escrito e 14 dias de suporte.
                </p>
                <div className={`${styles.choiceBar} ${styles.videoBar}`}>
                    <dl className={styles.videoDetails}>
                        <div>
                            <dt>Pagamento único</dt>
                            <dd>{CONSULTATION_PRICE_LABEL}</dd>
                        </div>
                        <div>
                            <dt>Agendamento</dt>
                            <dd>Escolha o horário após pagar</dd>
                        </div>
                    </dl>
                    <button
                        type="button"
                        className={styles.primary}
                        onClick={() => onChoose("video")}
                    >
                        {resumeStep
                            ? "Retomar videoconsulta"
                            : "Agendar videoconsulta"}{" "}
                        <Chevron />
                    </button>
                </div>
            </article>
        </div>
    );
}

function StepPresencial() {
    return (
        <>
            <StepHeader
                title={
                    <>
                        Agende direto pelo <em>WhatsApp</em>.
                    </>
                }
                description="Escolha Campinas ou São Paulo para combinar data, endereço do consultório e valor com a Dra. Lorraine."
            />
            <ul
                className={styles.cityLinks}
                aria-label="Escolha a cidade da consulta presencial"
            >
                {PRESENCIAL_CITIES.map((city) => (
                    <li key={city}>
                        <a
                            href={consultationWhatsAppUrl(
                                `Olá, Dra. Lorraine! Gostaria de agendar uma consulta presencial em ${city}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.primary}
                            aria-label={`Agendar em ${city} pelo WhatsApp`}
                        >
                            <WhatsAppIcon /> {city}
                        </a>
                    </li>
                ))}
            </ul>
            <section
                className={styles.inPersonTreatments}
                aria-labelledby="in-person-treatments"
            >
                <h2 id="in-person-treatments">Procedimentos no consultório</h2>
                <p>A indicação de cada procedimento é definida na consulta.</p>
                <ul>
                    {treatments.map(({ slug, name }) => (
                        <li key={slug}>{name}</li>
                    ))}
                </ul>
                <Link href="/tratamentos" className={styles.textButton}>
                    Conhecer os tratamentos
                </Link>
            </section>
        </>
    );
}

function StepProgress({ currentStep }) {
    return (
        <>
            <div className={styles.shortProgress}>
                <div>
                    <span>{steps[currentStep - 1].label}</span>
                    <span>
                        Etapa {currentStep} de {steps.length}
                    </span>
                </div>
                <progress
                    value={currentStep}
                    max={steps.length}
                    aria-label="Progresso da videoconsulta"
                />
            </div>
            <p className={styles.railHeading}>Seu agendamento</p>
            <ol className={styles.desktopProgress}>
                {steps.map(({ id, label }) => (
                    <li
                        key={id}
                        aria-current={id === currentStep ? "step" : undefined}
                        data-completed={id < currentStep}
                    >
                        <span className={styles.stepNumber} aria-hidden>
                            {String(id).padStart(2, "0")}
                        </span>
                        {label}
                    </li>
                ))}
            </ol>
            <p className={styles.railNote}>
                <LockGlyph /> O progresso fica salvo neste aparelho para você
                retomar depois.
            </p>
        </>
    );
}

function Field({ label, labelId, required, hint, children }) {
    return (
        <label className={styles.field}>
            <span className={styles.fieldLabel}>
                <span id={labelId}>
                    {label}
                    {required && (
                        <span aria-hidden className="ml-1 text-copper-dark">
                            *
                        </span>
                    )}
                </span>
                {hint && <span className={styles.fieldHint}>{hint}</span>}
            </span>
            {children}
        </label>
    );
}

const inputClass = styles.input;
const textareaClass = styles.textarea;

function getSerializableData(data) {
    const { skinType, ...serializableData } = data;

    return {
        ...serializableData,
        photos: (serializableData.photos || []).map(
            ({ previewUrl, ...photo }) => photo
        )
    };
}

function FormSelect({ value, onChange, options }) {
    return (
        <select
            className={`${inputClass} ${styles.select}`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            <option value="">Selecione</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

const concernDurationOptions = [
    { value: "Menos de 1 mês", label: "Menos de 1 mês" },
    { value: "1 a 6 meses", label: "1 a 6 meses" },
    { value: "6 meses a 1 ano", label: "6 meses a 1 ano" },
    { value: "1 a 5 anos", label: "1 a 5 anos" },
    { value: "Mais de 5 anos", label: "Mais de 5 anos" }
];

function StepActions({
    onBack,
    onNext,
    nextLabel = "Continuar",
    nextDisabled,
    nextType = "submit"
}) {
    return (
        <div className={styles.actions}>
            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className={styles.textButton}
                >
                    Voltar
                </button>
            )}
            <button
                type={nextType}
                onClick={nextType === "button" ? () => onNext() : undefined}
                disabled={nextDisabled}
                className={styles.primary}
            >
                {nextLabel}
            </button>
        </div>
    );
}

function StepHeader({ title, description }) {
    return (
        <div className={styles.panelHeading}>
            <h1
                id="booking-step-title"
                className={styles.stepTitle}
                tabIndex={-1}
            >
                {title}
            </h1>
            {description && <p>{description}</p>}
        </div>
    );
}

function LockGlyph() {
    return (
        <svg aria-hidden width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path
                d="M3 6V4a3 3 0 016 0v2m-7 0h8v7H2V6z"
                stroke="#B48967"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function BirthDateInput({ value, labelId, onChange }) {
    const [entry, setEntry] = useState(() =>
        value ? value.split("-").reverse().join("/") : ""
    );
    const [invalid, setInvalid] = useState(false);

    function updateDate(event) {
        const input = event.target.value;
        const digits = (
            /^\d{4}-\d{2}-\d{2}$/.test(input)
                ? input.split("-").reverse().join("")
                : input.replace(/\D/g, "")
        ).slice(0, 8);
        const day = digits.slice(0, 2);
        const month = digits.slice(2, 4);
        const year = digits.slice(4);
        setEntry([day, month, year].filter(Boolean).join("/"));

        const iso = `${year}-${month}-${day}`;
        const date = new Date(iso + "T00:00:00");
        const valid =
            digits.length === 8 &&
            year !== "0000" &&
            !Number.isNaN(date.getTime()) &&
            date.getFullYear() === Number(year) &&
            date.getMonth() + 1 === Number(month) &&
            date.getDate() === Number(day) &&
            date <= new Date();

        setInvalid(digits.length === 8 && !valid);
        onChange(valid ? iso : "");
    }

    return (
        <>
            <input
                type="text"
                inputMode="numeric"
                autoComplete="bday"
                placeholder="DD/MM/AAAA"
                className={inputClass}
                value={entry}
                onChange={updateDate}
                aria-labelledby={labelId}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? "birth-date-error" : undefined}
                required
            />
            {invalid && (
                <span id="birth-date-error" className="text-xs text-[#7A2E26]">
                    Informe uma data válida.
                </span>
            )}
        </>
    );
}

/* ─── Step 1 · About ─────────────────────────────────────────────────── */

function StepAboutYou({ data, update, onNext }) {
    const valid =
        data.name && data.email && data.phone && data.dob && data.city;
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!valid || submitting) return;

        if (data.initiationNotifiedAt) {
            onNext();
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch("/api/consulta/started", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        city: data.city
                    }
                })
            });
            const body = await response.json().catch(() => ({}));

            if (!response.ok) {
                console.warn("[consulta started notification failed]", body);
            }

            if (response.ok)
                update({ initiationNotifiedAt: new Date().toISOString() });
        } catch (err) {
            console.warn("[consulta started notification failed]", err);
        } finally {
            setSubmitting(false);
            onNext();
        }
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                title={
                    <>
                        Sobre <em>você</em>.
                    </>
                }
                description="Preencha os campos abaixo para identificar seu atendimento."
            />
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <Field label="Nome completo" required>
                        <input
                            type="text"
                            autoComplete="name"
                            className={inputClass}
                            value={data.name}
                            onChange={(e) => update({ name: e.target.value })}
                            required
                        />
                    </Field>
                </div>
                <Field label="E-mail" required>
                    <input
                        type="email"
                        autoComplete="email"
                        className={inputClass}
                        value={data.email}
                        onChange={(e) => update({ email: e.target.value })}
                        required
                    />
                </Field>
                <Field label="Telefone / WhatsApp" required>
                    <input
                        type="tel"
                        autoComplete="tel"
                        className={inputClass}
                        placeholder="(11) 99999-9999"
                        value={data.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        required
                    />
                </Field>
                <Field
                    label="Data de nascimento"
                    labelId="birth-date-label"
                    required
                >
                    <BirthDateInput
                        value={data.dob}
                        labelId="birth-date-label"
                        onChange={(dob) => update({ dob })}
                    />
                </Field>
                <Field label="Cidade / UF" required>
                    <input
                        type="text"
                        autoComplete="address-level2"
                        className={inputClass}
                        placeholder="São Paulo / SP"
                        value={data.city}
                        onChange={(e) => update({ city: e.target.value })}
                        required
                    />
                </Field>
            </div>
            <StepActions
                nextDisabled={!valid || submitting}
                nextLabel={submitting ? "Continuando..." : undefined}
            />
        </form>
    );
}

/* ─── Step 2 · Concern ───────────────────────────────────────────────── */

function StepConcern({ data, update, onNext, onBack }) {
    const submit = (e) => {
        e.preventDefault();
        onNext();
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                title={
                    <>
                        O que trouxe você <em>até aqui</em>?
                    </>
                }
                description="Conte com suas palavras o que gostaria de conversar na consulta. Você também pode seguir sem preencher."
            />
            <div className="space-y-8">
                <Field
                    label="Principal queixa ou motivo da consulta"
                    hint="Opcional"
                >
                    <textarea
                        className={textareaClass}
                        rows="4"
                        placeholder="Ex: Tenho rosácea e piorei nos últimos meses..."
                        value={data.mainConcern}
                        onChange={(e) =>
                            update({ mainConcern: e.target.value })
                        }
                    />
                </Field>
                <Field
                    label="Há quanto tempo você percebe isso?"
                    hint="Opcional"
                >
                    <FormSelect
                        value={data.concernDuration}
                        onChange={(value) => update({ concernDuration: value })}
                        options={concernDurationOptions}
                    />
                </Field>
            </div>
            <StepActions onBack={onBack} />
        </form>
    );
}

/* ─── Step 3 · Photos (Vercel Blob upload) ───────────────────────────── */

const MAX_PHOTOS = 6;
const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
const ACCEPTED_PHOTO_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif"
];
const ACCEPTED_PHOTO_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".heic",
    ".heif"
];
const PHOTO_CONTENT_TYPES_BY_EXTENSION = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".heic": "image/heic",
    ".heif": "image/heif"
};

function formatFileSize(bytes) {
    if (!bytes) return "0 MB";
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAcceptedPhoto(file) {
    const extension = getFileExtension(file.name);

    return (
        ACCEPTED_PHOTO_TYPES.includes(file.type) ||
        ACCEPTED_PHOTO_EXTENSIONS.includes(extension)
    );
}

function getFileExtension(fileName) {
    return fileName.includes(".")
        ? fileName.slice(fileName.lastIndexOf(".")).toLowerCase()
        : "";
}

function getPhotoContentType(file) {
    return (
        file.type ||
        PHOTO_CONTENT_TYPES_BY_EXTENSION[getFileExtension(file.name)]
    );
}

function getSafePhotoPath(file, index) {
    const extension = getFileExtension(file.name);
    const baseName = file.name
        .replace(/\.[^/.]+$/, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase()
        .slice(0, 48);

    return `consulta-photos/${Date.now()}-${index}-${
        baseName || "foto"
    }${extension}`;
}

function StepPhotos({ data, update, onNext, onBack }) {
    const inputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFiles = async (files) => {
        setError("");
        setUploadStatus("");
        const remaining = MAX_PHOTOS - data.photos.length;
        const allFiles = Array.from(files);
        const picked = allFiles.slice(0, remaining);
        if (picked.length === 0) return;

        if (allFiles.length > remaining) {
            setError(
                `Você pode enviar mais ${remaining} ${
                    remaining === 1 ? "foto" : "fotos"
                }. As imagens extras não foram adicionadas.`
            );
        }

        const invalidFile = picked.find((file) => !isAcceptedPhoto(file));
        if (invalidFile) {
            setError(
                `${invalidFile.name} não está em um formato compatível. Envie JPG, PNG, WEBP, HEIC ou HEIF.`
            );
            return;
        }

        const oversizedFile = picked.find((file) => file.size > MAX_PHOTO_SIZE);
        if (oversizedFile) {
            setError(
                `${oversizedFile.name} tem ${formatFileSize(
                    oversizedFile.size
                )}. O limite é 10 MB por imagem.`
            );
            return;
        }

        setUploading(true);
        try {
            const uploaded = [];
            for (const [index, file] of picked.entries()) {
                setUploadStatus(
                    `Enviando ${index + 1} de ${picked.length}: ${file.name}`
                );
                const controller = new AbortController();
                const timeout = window.setTimeout(
                    () => controller.abort(),
                    45000
                );

                // Client uploads direct to Blob; our API just signs a token.
                try {
                    const blob = await upload(
                        getSafePhotoPath(file, index),
                        file,
                        {
                            access: "private",
                            contentType: getPhotoContentType(file),
                            handleUploadUrl: "/api/photos/upload",
                            multipart: file.size > 4 * 1024 * 1024,
                            abortSignal: controller.signal,
                            onUploadProgress: ({ percentage }) => {
                                setUploadStatus(
                                    `Enviando ${index + 1} de ${
                                        picked.length
                                    }: ${file.name} · ${Math.min(
                                        Math.round(percentage),
                                        100
                                    )}%`
                                );
                            }
                        }
                    );
                    uploaded.push({
                        url: blob.url,
                        pathname: blob.pathname,
                        name: file.name,
                        size: file.size,
                        previewUrl: URL.createObjectURL(file)
                    });
                } finally {
                    window.clearTimeout(timeout);
                }
            }
            update({ photos: [...data.photos, ...uploaded] });
            setUploadStatus(
                `${uploaded.length} ${
                    uploaded.length === 1 ? "foto enviada" : "fotos enviadas"
                } com sucesso.`
            );
        } catch (err) {
            console.error(err);
            setError(
                err?.name === "AbortError"
                    ? "O envio demorou demais e foi interrompido. Tente novamente com uma conexão estável ou uma imagem menor."
                    : err?.message ||
                          "Não conseguimos enviar suas fotos. Tente novamente."
            );
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);

        if (uploading || slotsLeft === 0) return;

        const files = event.dataTransfer?.files;
        if (files?.length) {
            handleFiles(files);
        }
    };

    const removePhoto = (pathname) => {
        const photo = data.photos.find((p) => p.pathname === pathname);
        if (photo?.previewUrl) {
            URL.revokeObjectURL(photo.previewUrl);
        }

        update({
            photos: data.photos.filter((p) => p.pathname !== pathname)
        });
    };

    const slotsLeft = MAX_PHOTOS - data.photos.length;

    return (
        <div>
            <StepHeader
                title={
                    <>
                        Fotos para a <em>consulta</em>.
                    </>
                }
                description="Fotos claras fazem muita diferença na consulta. Você pode enviar até 6 imagens, ou pular este passo se preferir."
            />

            {/* Dropzone / picker */}
            <div
                className={`border border-dashed bg-sand/50 px-4 py-7 text-center sm:p-9 transition-colors ${
                    uploading
                        ? "opacity-60"
                        : dragActive
                        ? "border-copper bg-sand"
                        : slotsLeft > 0
                        ? "border-copper/40 hover:bg-sand/60 cursor-pointer"
                        : "opacity-60 cursor-not-allowed"
                }`}
                role="button"
                tabIndex={slotsLeft > 0 && !uploading ? 0 : -1}
                onClick={() => {
                    if (!uploading && slotsLeft > 0) inputRef.current?.click();
                }}
                onKeyDown={(e) => {
                    if (
                        (e.key === "Enter" || e.key === " ") &&
                        !uploading &&
                        slotsLeft > 0
                    ) {
                        e.preventDefault();
                        inputRef.current?.click();
                    }
                }}
                onDragEnter={(e) => {
                    e.preventDefault();
                    if (!uploading && slotsLeft > 0) setDragActive(true);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (!uploading && slotsLeft > 0) setDragActive(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    if (e.currentTarget.contains(e.relatedTarget)) return;
                    setDragActive(false);
                }}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif"
                    multiple
                    className="hidden"
                    disabled={uploading || slotsLeft === 0}
                    onChange={(e) => {
                        if (e.target.files) handleFiles(e.target.files);
                    }}
                />
                <CameraGlyph />
                <div className="mt-4 text-sm font-medium text-ink">
                    {uploading
                        ? "Enviando..."
                        : slotsLeft === 0
                        ? "Limite de 6 fotos atingido"
                        : "Clique para selecionar ou arraste suas fotos"}
                </div>
                <div className="mt-1 text-xs text-stone">
                    JPG · PNG · HEIC · até 10 MB por imagem
                </div>
            </div>

            {uploadStatus && (
                <div className="mt-4 border-l-2 border-copper pl-4 py-3 text-sm text-stone">
                    {uploadStatus}
                </div>
            )}

            {error && (
                <div className="mt-4 border-l-2 border-copper pl-4 py-3 text-sm text-copper-dark">
                    {error}
                </div>
            )}

            {/* Uploaded previews */}
            {data.photos.length > 0 && (
                <div className="mt-8">
                    <div className="text-xs uppercase tracking-[0.22em] text-stone font-medium mb-4">
                        {data.photos.length} de {MAX_PHOTOS} fotos enviadas
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {data.photos.map((p) => (
                            <div
                                key={p.pathname}
                                className="relative group aspect-square bg-line overflow-hidden border border-line"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={p.previewUrl || p.url}
                                    alt={p.name}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(p.pathname)}
                                    aria-label={`Remover ${p.name}`}
                                    className="absolute top-2 right-2 bg-ink/80 hover:bg-copper-dark text-paper w-7 h-7 flex items-center justify-center text-xs opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tips */}
            <div className="mt-10 border-t border-line pt-8">
                <div className="text-xs uppercase tracking-[0.22em] text-copper-dark font-medium mb-4">
                    Dicas para boas fotos
                </div>
                <ul className="space-y-2 text-slate text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                        <span
                            aria-hidden
                            className="w-3.5 h-px bg-copper mt-[11px] flex-none"
                        />
                        <span>Luz natural, sem flash direto na pele</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span
                            aria-hidden
                            className="w-3.5 h-px bg-copper mt-[11px] flex-none"
                        />
                        <span>Uma foto de perto e outra mais afastada</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span
                            aria-hidden
                            className="w-3.5 h-px bg-copper mt-[11px] flex-none"
                        />
                        <span>Pele limpa, sem maquiagem ou filtros</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span
                            aria-hidden
                            className="w-3.5 h-px bg-copper mt-[11px] flex-none"
                        />
                        <span>Fundo neutro e foco nítido</span>
                    </li>
                </ul>
            </div>

            <StepActions
                onBack={onBack}
                onNext={onNext}
                nextType="button"
                nextDisabled={uploading}
                nextLabel={data.photos.length ? "Continuar" : "Pular por agora"}
            />
        </div>
    );
}

function CameraGlyph() {
    return (
        <svg
            aria-hidden
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="mx-auto"
        >
            <rect
                x="4"
                y="10"
                width="32"
                height="22"
                stroke="#B48967"
                strokeWidth="1.2"
            />
            <circle cx="20" cy="21" r="6" stroke="#B48967" strokeWidth="1.2" />
            <path
                d="M14 10l2-3h8l2 3"
                stroke="#B48967"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <circle cx="30" cy="15" r="1" fill="#B48967" />
        </svg>
    );
}

/* ─── Step 4 · Consent ───────────────────────────────────────────────── */

function StepConsent({ data, update, onNext, onBack }) {
    const valid =
        data.consentTelemedicine && data.consentLgpd && data.consentTerms;
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if (!valid || submitting) return;

        // Already persisted earlier (user navigated back and re-submitted).
        // Don't create a duplicate row — just advance.
        if (data.consultaId) {
            onNext();
            return;
        }

        setError("");
        setSubmitting(true);
        try {
            const r = await fetch("/api/consulta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: getSerializableData(data) })
            });
            if (!r.ok) {
                const body = await r.json().catch(() => ({}));
                throw new Error(body.error || "Falha ao enviar");
            }
            const { id } = await r.json();
            onNext({ consultaId: id });
        } catch (err) {
            setError(
                err.message ||
                    "Não foi possível enviar agora. Tente novamente em instantes."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={submit}>
            <StepHeader
                title={
                    <>
                        Revise os <em>termos</em>.
                    </>
                }
                description="Precisamos do seu consentimento para o atendimento e o tratamento dos seus dados."
            />

            <div className="space-y-3">
                <ConsentCheckbox
                    checked={data.consentTelemedicine}
                    onChange={(v) => update({ consentTelemedicine: v })}
                >
                    Declaro que li e concordo com o{" "}
                    <Link
                        href="/consentimento-telemedicina"
                        target="_blank"
                        className="text-copper-dark underline underline-offset-4 decoration-1 font-medium"
                    >
                        Termo de Consentimento para Telemedicina
                    </Link>{" "}
                    e compreendo as limitações do atendimento remoto, conforme a
                    Resolução CFM 2.314/2022.
                </ConsentCheckbox>

                <ConsentCheckbox
                    checked={data.consentLgpd}
                    onChange={(v) => update({ consentLgpd: v })}
                >
                    Autorizo o tratamento dos meus dados pessoais sensíveis
                    (dados de saúde e fotografias) para fins de atendimento
                    médico, conforme a{" "}
                    <Link
                        href="/politica-de-privacidade"
                        target="_blank"
                        className="text-copper-dark underline underline-offset-4 decoration-1 font-medium"
                    >
                        Política de Privacidade (LGPD)
                    </Link>
                    .
                </ConsentCheckbox>

                <ConsentCheckbox
                    checked={data.consentTerms}
                    onChange={(v) => update({ consentTerms: v })}
                >
                    Li e aceito os{" "}
                    <Link
                        href="/termos-de-uso"
                        target="_blank"
                        className="text-copper-dark underline underline-offset-4 decoration-1 font-medium"
                    >
                        Termos de Uso
                    </Link>{" "}
                    do serviço.
                </ConsentCheckbox>
            </div>

            {error && (
                <div role="alert" className={styles.status}>
                    {error}
                </div>
            )}

            <StepActions
                onBack={onBack}
                nextDisabled={!valid || submitting}
                nextLabel={submitting ? "Salvando…" : "Ir para pagamento"}
            />
        </form>
    );
}

function ConsentCheckbox({ checked, onChange, children }) {
    return (
        <label
            className={`flex items-start gap-4 p-5 border cursor-pointer transition-colors ${
                checked
                    ? "border-copper bg-sand/60"
                    : "border-line bg-paper hover:border-copper/50"
            }`}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-1 w-5 h-5 accent-copper flex-shrink-0 cursor-pointer"
            />
            <span className="text-sm text-slate leading-relaxed">
                {children}
            </span>
        </label>
    );
}

/* ─── Step 5 · Payment ───────────────────────────────────────────────── */

function StepPayment({ data, paymentReturn, paymentSessionId, onNext }) {
    const [action, setAction] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const returningFromCheckout = paymentReturn === "stripe_success";
    const initialNotice = returningFromCheckout
        ? "Estamos conferindo a confirmação do pagamento. Se você já pagou e a agenda ainda não abriu, verifique o status aqui."
        : paymentReturn === "stripe_cancel"
        ? "Você voltou do checkout. Seus dados estão salvos e você pode retomar o pagamento."
        : "";

    async function openCheckout() {
        if (action || !data.consultaId) return;
        setAction("opening");
        setError("");
        setNotice("");
        try {
            const response = await fetch("/api/payments/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ consultationId: data.consultaId })
            });
            const body = await response.json();
            if (!response.ok) throw new Error("Checkout indisponível");
            if (body.alreadyPaid) {
                onNext();
                return;
            }
            if (!body.checkoutUrl) throw new Error("Checkout indisponível");
            window.location.assign(body.checkoutUrl);
        } catch {
            setError(
                "Não foi possível abrir o pagamento. Seus dados estão salvos. Tente novamente."
            );
            setAction("");
        }
    }

    async function checkPayment() {
        if (action || !data.consultaId) return;
        setAction("checking");
        setError("");
        setNotice("");
        try {
            if (paymentSessionId) {
                const confirmation = await fetch("/api/payments/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        consultationId: data.consultaId,
                        sessionId: paymentSessionId
                    })
                });
                const status = await confirmation.json().catch(() => ({}));
                if (confirmation.ok && status.paid) {
                    onNext();
                    return;
                }
            }

            const response = await fetch(
                `/api/consultations/${data.consultaId}`
            );
            const status = await response.json();
            if (!response.ok) throw new Error("Status indisponível");
            if (isPaid(status)) {
                onNext();
                return;
            }
            setNotice(
                "O pagamento ainda está aguardando confirmação. Verifique novamente em alguns instantes."
            );
        } catch {
            setError(
                "Não foi possível verificar o pagamento agora. Tente novamente em instantes."
            );
        } finally {
            setAction("");
        }
    }

    return (
        <div>
            <StepHeader
                title={
                    <>
                        Pagamento da <em>videoconsulta</em>.
                    </>
                }
                description="Após a confirmação do pagamento, você poderá escolher um horário na agenda da Dra. Lorraine."
            />

            <div className={styles.paymentSummary}>
                <div>
                    <p className={styles.eyebrow}>
                        Videoconsulta · Dermatologia
                    </p>
                    <p className={styles.price}>{CONSULTATION_PRICE_LABEL}</p>
                </div>
                <p>Pagamento único</p>
            </div>
            {!data.consultaId && (
                <div role="alert" className={styles.status}>
                    Volte às modalidades para retomar o agendamento.
                </div>
            )}
            {error ? (
                <div role="alert" className={styles.status}>
                    {error}
                </div>
            ) : (
                (notice || initialNotice) && (
                    <div role="status" className={styles.status}>
                        {notice || initialNotice}
                    </div>
                )
            )}

            <div className={styles.actions}>
                {!returningFromCheckout && (
                    <button
                        type="button"
                        className={styles.textButton}
                        onClick={checkPayment}
                        disabled={!!action || !data.consultaId}
                    >
                        {action === "checking"
                            ? "Verificando…"
                            : "Já paguei. Verificar"}
                    </button>
                )}
                {returningFromCheckout ? (
                    <button
                        type="button"
                        className={styles.primary}
                        onClick={checkPayment}
                        disabled={!!action || !data.consultaId}
                    >
                        {action === "checking"
                            ? "Verificando…"
                            : "Verificar pagamento"}
                    </button>
                ) : (
                    <button
                        type="button"
                        className={styles.primary}
                        onClick={openCheckout}
                        disabled={!!action || !data.consultaId}
                    >
                        {action === "opening"
                            ? "Abrindo pagamento…"
                            : "Ir para o pagamento seguro"}
                    </button>
                )}
            </div>
        </div>
    );
}

async function readConsultation(id, signal) {
    const response = await fetch(`/api/consultations/${id}`, { signal });
    return response.ok ? response.json() : null;
}

function displayAppointment(consultation) {
    if (!consultation?.scheduled_at) return "";
    const date = new Date(consultation.scheduled_at);
    if (Number.isNaN(date.getTime())) return "";
    const options = { dateStyle: "long", timeStyle: "short" };

    try {
        return new Intl.DateTimeFormat("pt-BR", {
            ...options,
            timeZone: consultation.scheduled_timezone || "America/Sao_Paulo"
        }).format(date);
    } catch {
        return new Intl.DateTimeFormat("pt-BR", options).format(date);
    }
}

function StepSchedule({ data }) {
    const [option, setOption] = useState(null);
    const [consultation, setConsultation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);
    const [opened, setOpened] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const id = data.consultaId;

    const loadScheduling = useCallback(
        async (signal) => {
            setLoading(true);
            setError("");
            setNotice("");

            try {
                const status = await readConsultation(id, signal).catch(
                    () => null
                );
                if (signal?.aborted) return;
                if (isScheduled(status)) {
                    setConsultation(status);
                    return;
                }

                const response = await fetch("/api/scheduling/options", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ consultationId: id }),
                    signal
                });
                const body = await response.json();
                if (!response.ok || !body.bookingUrl)
                    throw new Error("Agenda indisponível");
                setOption(body);
            } catch {
                if (!signal?.aborted)
                    setError(
                        "Não foi possível abrir a agenda. Seu pagamento continua registrado. Tente novamente."
                    );
            } finally {
                if (!signal?.aborted) setLoading(false);
            }
        },
        [id]
    );

    useEffect(() => {
        if (!id) {
            setError(
                "Não encontramos a sua consulta. Entre em contato para receber ajuda."
            );
            setLoading(false);
            return;
        }
        const controller = new AbortController();
        loadScheduling(controller.signal);
        return () => controller.abort();
    }, [id, loadScheduling]);

    async function verifyBooking() {
        setChecking(true);
        setError("");
        setNotice("");
        try {
            const status = await readConsultation(id);
            if (!status) throw new Error("Status indisponível");
            if (isScheduled(status)) setConsultation(status);
            else
                setNotice(
                    "O horário ainda não aparece neste site. Se você já fez a reserva, confira o e-mail de confirmação da agenda."
                );
        } catch {
            setError(
                "Não foi possível verificar o horário agora. Confira a confirmação no seu e-mail ou tente novamente."
            );
        } finally {
            setChecking(false);
        }
    }

    const scheduled = isScheduled(consultation);
    const appointment = displayAppointment(consultation);

    return (
        <div>
            <StepHeader
                title={
                    scheduled ? (
                        <>
                            Horário <em>confirmado</em>.
                        </>
                    ) : (
                        <>
                            Escolha seu <em>horário</em>.
                        </>
                    )
                }
                description={
                    scheduled
                        ? appointment || "Sua videoconsulta foi agendada."
                        : "Seu pagamento foi confirmado. A agenda abre em uma nova aba para você concluir a reserva."
                }
            />
            {!scheduled && (
                <div className={styles.scheduleCard}>
                    <CalendarGlyph />
                    <div>
                        <h2>Agenda da Dra. Lorraine</h2>
                        <p>
                            Ao reservar, confira as instruções enviadas ao seu
                            e-mail.
                        </p>
                    </div>
                    {option?.bookingUrl ? (
                        <a
                            href={option.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.primary}
                            onClick={() => setOpened(true)}
                        >
                            Abrir agenda <Chevron />
                        </a>
                    ) : loading ? (
                        <span role="status" className="text-sm text-stone">
                            Carregando agenda…
                        </span>
                    ) : (
                        id && (
                            <button
                                type="button"
                                className={styles.primary}
                                onClick={() => loadScheduling()}
                            >
                                Tentar novamente
                            </button>
                        )
                    )}
                </div>
            )}
            {error && (
                <div role="alert" className={styles.status}>
                    {error}
                </div>
            )}
            {notice && (
                <div role="status" className={styles.status}>
                    {notice}
                </div>
            )}
            {!scheduled && opened && (
                <button
                    type="button"
                    className={`${styles.textButton} mt-4`}
                    onClick={verifyBooking}
                    disabled={checking}
                >
                    {checking
                        ? "Verificando…"
                        : "Já escolhi um horário. Verificar"}
                </button>
            )}
            <div className="mt-7 border-t border-line pt-4">
                <a href={`mailto:${SITE.email}`} className={styles.textButton}>
                    Preciso de ajuda com o horário
                </a>
            </div>
        </div>
    );
}

function CalendarGlyph() {
    return (
        <svg
            aria-hidden
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="mx-auto"
        >
            <rect
                x="6"
                y="9"
                width="28"
                height="25"
                stroke="#B48967"
                strokeWidth="1.2"
            />
            <path d="M6 16h28" stroke="#B48967" strokeWidth="1.2" />
            <path
                d="M14 6v6M26 6v6"
                stroke="#B48967"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
            <circle cx="14" cy="23" r="1.5" fill="#B48967" />
            <circle cx="20" cy="23" r="1.5" fill="#B48967" />
            <circle cx="26" cy="23" r="1.5" fill="#B48967" />
        </svg>
    );
}
