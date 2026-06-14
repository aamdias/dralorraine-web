import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";

const STORAGE_KEY = "consulta_agendamento_v1";

const steps = [
    { id: 1, label: "Você" },
    { id: 2, label: "Queixa" },
    { id: 3, label: "Saúde" },
    { id: 4, label: "Fotos" },
    { id: 5, label: "Termos" },
    { id: 6, label: "Pagamento" },
    { id: 7, label: "Agenda" }
];

const CONSULTATION_PRICE_LABEL = "R$ 350";

const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    mainConcern: "",
    concernDuration: "",
    priorTreatments: "",
    allergies: "",
    medications: "",
    conditions: "",
    photos: [], // [{ url, pathname, name, size, previewUrl }]
    consentTelemedicine: false,
    consentLgpd: false,
    consentTerms: false,
    consultaId: null // set after /api/consulta insert at Step 5 → 6
};

export default function AgendarPage() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState(initialData);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setData({ ...initialData, ...parsed.data });
                if (parsed.step && parsed.step < 6) setStep(parsed.step);
            }
        } catch (e) {
            // ignore
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ step, data: getSerializableData(data) })
            );
        } catch (e) {
            // ignore
        }
    }, [step, data, hydrated]);

    const update = (patch) => setData((d) => ({ ...d, ...patch }));
    const next = () => setStep((s) => Math.min(steps.length, s + 1));
    const back = () => setStep((s) => Math.max(1, s - 1));

    return (
        <Layout>
            <SEO
                title="Agendar Consulta | Dra. Lorraine Souza"
                description="Agende sua videoconsulta dermatológica em poucos passos. Suas respostas ficam salvas — você pode voltar depois para continuar."
                image="/lolo-portrait-consulta.jpg"
                url="/consulta/agendar"
            />

            <div className="bg-[#FAF6F0] text-[#1C1917] min-h-screen pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 lg:mb-16">
                        <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-6">
                            Agendamento · Videoconsulta
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-4 text-balance">
                            Vamos agendar sua{" "}
                            <span className="italic text-[#9A4639]">
                                consulta
                            </span>
                            .
                        </h1>
                        <p className="text-[#57534E] leading-relaxed max-w-xl">
                            Suas respostas ficam salvas a cada passo — você
                            pode voltar depois para continuar de onde parou.
                        </p>
                    </div>

                    {/* Progress */}
                    <StepProgress currentStep={step} />

                    {/* Card */}
                    <div className="bg-[#FBF8F2] border border-[#E7E2D9] mt-10 p-6 sm:p-10 lg:p-12">
                        {step === 1 && (
                            <StepAboutYou
                                data={data}
                                update={update}
                                onNext={next}
                            />
                        )}
                        {step === 2 && (
                            <StepConcern
                                data={data}
                                update={update}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 3 && (
                            <StepHealth
                                data={data}
                                update={update}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 4 && (
                            <StepPhotos
                                data={data}
                                update={update}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 5 && (
                            <StepConsent
                                data={data}
                                update={update}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 6 && (
                            <StepPayment
                                data={data}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 7 && (
                            <StepSchedule data={data} onBack={back} />
                        )}
                    </div>

                    <div className="mt-24 lg:mt-32 pt-10 border-t border-[#E7E2D9]">
                        <p className="text-center text-xs uppercase tracking-[0.24em] text-[#57534E]/70 font-medium flex items-center justify-center gap-2">
                            <LockGlyph />
                            Informações criptografadas · LGPD
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

/* ─── Progress ───────────────────────────────────────────────────────── */

function StepProgress({ currentStep }) {
    return (
        <div>
            {/* Desktop: thin dots + labels */}
            <div className="hidden sm:block">
                <div className="flex items-center justify-between">
                    {steps.map((s, i) => {
                        const isDone = s.id < currentStep;
                        const isActive = s.id === currentStep;
                        return (
                            <div
                                key={s.id}
                                className="flex-1 relative flex flex-col items-center"
                            >
                                {i > 0 && (
                                    <div
                                        className={`absolute right-1/2 top-[7px] h-px w-full ${
                                            isDone || isActive
                                                ? "bg-[#9A4639]"
                                                : "bg-[#E7E2D9]"
                                        }`}
                                    />
                                )}
                                <div
                                    className={`relative z-10 w-4 h-4 flex items-center justify-center transition-colors ${
                                        isDone
                                            ? "bg-[#9A4639]"
                                            : isActive
                                            ? "bg-[#FAF6F0] border-[2px] border-[#9A4639]"
                                            : "bg-[#FAF6F0] border border-[#E7E2D9]"
                                    }`}
                                />
                                <div
                                    className={`mt-3 text-[11px] uppercase tracking-[0.18em] font-medium text-center transition-colors ${
                                        isActive
                                            ? "text-[#9A4639]"
                                            : isDone
                                            ? "text-[#1C1917]"
                                            : "text-[#A8A29E]"
                                    }`}
                                >
                                    {s.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile: compact current/total + bar */}
            <div className="sm:hidden">
                <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs uppercase tracking-[0.22em] text-[#9A4639] font-medium">
                        {steps[currentStep - 1].label}
                    </span>
                    <span className="text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium">
                        Passo {currentStep} de {steps.length}
                    </span>
                </div>
                <div className="relative h-px bg-[#E7E2D9]">
                    <div
                        className="absolute left-0 top-0 h-px bg-[#9A4639] transition-all duration-500"
                        style={{
                            width: `${
                                ((currentStep - 1) / (steps.length - 1)) * 100
                            }%`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

/* ─── Primitives ─────────────────────────────────────────────────────── */

function Field({ label, required, hint, children }) {
    return (
        <div className="block">
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium">
                    {label}
                    {required && (
                        <span className="text-[#9A4639] ml-1.5">*</span>
                    )}
                </span>
                {hint && (
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#A8A29E] font-medium">
                        {hint}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

const inputClass =
    "w-full px-0 py-3 bg-transparent border-0 border-b border-[#E7E2D9] rounded-none text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#9A4639] transition-colors";

const textareaClass =
    "w-full px-4 py-3 bg-[#FAF6F0] border border-[#E7E2D9] rounded-none text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#9A4639] transition-colors resize-none";

function getSerializableData(data) {
    const { skinType, ...serializableData } = data;

    return {
        ...serializableData,
        photos: (serializableData.photos || []).map(
            ({ previewUrl, ...photo }) => photo
        )
    };
}

function FormSelect({
    value,
    onChange,
    options,
    placeholder = "Selecione"
}) {
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);
    const selected = options.find((option) => option.value === value);

    useEffect(() => {
        if (!open) return;

        const closeOnOutsideClick = (event) => {
            if (!selectRef.current?.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        return () =>
            document.removeEventListener("mousedown", closeOnOutsideClick);
    }, [open]);

    const choose = (nextValue) => {
        onChange(nextValue);
        setOpen(false);
    };

    return (
        <div ref={selectRef} className="relative">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                onKeyDown={(event) => {
                    if (event.key === "Escape") setOpen(false);
                }}
                className="group flex w-full items-center justify-between gap-4 border-0 border-b border-[#E7E2D9] bg-transparent px-0 py-3 text-left text-[#1C1917] transition-colors hover:border-[#CBB9AE] focus:outline-none focus:border-[#9A4639]"
            >
                <span className={selected ? "" : "text-[#A8A29E]"}>
                    {selected?.label || placeholder}
                </span>
                <span
                    aria-hidden
                    className={`h-2 w-2 shrink-0 border-b border-r border-[#9A4639] transition-transform ${
                        open
                            ? "rotate-[225deg] translate-y-1"
                            : "rotate-45 -translate-y-0.5"
                    }`}
                />
            </button>

            {open && (
                <div
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-30 mt-2 border border-[#E7E2D9] bg-[#FAF6F0] shadow-[0_18px_40px_rgba(28,25,23,0.08)]"
                >
                    <button
                        type="button"
                        role="option"
                        aria-selected={!value}
                        onClick={() => choose("")}
                        className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                            value === ""
                                ? "bg-[#F3EADB] text-[#9A4639]"
                                : "text-[#A8A29E] hover:bg-[#F3EADB]/70 hover:text-[#1C1917]"
                        }`}
                    >
                        {placeholder}
                    </button>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            role="option"
                            aria-selected={value === option.value}
                            onClick={() => choose(option.value)}
                            className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                                value === option.value
                                    ? "bg-[#F3EADB] text-[#9A4639]"
                                    : "text-[#1C1917] hover:bg-[#F3EADB]/70 hover:text-[#9A4639]"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
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
        <div className="flex items-center justify-between pt-8 mt-10 border-t border-[#E7E2D9]">
            {onBack ? (
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-[#57534E] hover:text-[#9A4639] transition-colors py-3"
                >
                    ← Voltar
                </button>
            ) : (
                <div />
            )}
            <button
                type={nextType}
                onClick={nextType === "button" ? onNext : undefined}
                disabled={nextDisabled}
                className="bg-[#1C1917] hover:bg-[#9A4639] disabled:bg-[#E7E2D9] disabled:text-[#A8A29E] disabled:cursor-not-allowed text-[#FAF6F0] font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
            >
                {nextLabel}
            </button>
        </div>
    );
}

function StepHeader({ eyebrow, title, description }) {
    return (
        <div className="mb-10">
            {eyebrow && (
                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-4">
                    {eyebrow}
                </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-light tracking-[-0.015em] text-[#1C1917] mb-3 text-balance">
                {title}
            </h2>
            {description && (
                <p className="text-[#57534E] leading-relaxed max-w-xl">
                    {description}
                </p>
            )}
        </div>
    );
}

function LockGlyph() {
    return (
        <svg
            aria-hidden
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
        >
            <path
                d="M3 6V4a3 3 0 016 0v2m-7 0h8v7H2V6z"
                stroke="#9A4639"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* ─── Step 1 · About ─────────────────────────────────────────────────── */

function StepAboutYou({ data, update, onNext }) {
    const valid =
        data.name && data.email && data.phone && data.dob && data.city;
    const submit = (e) => {
        e.preventDefault();
        if (valid) onNext();
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                eyebrow="Passo 01 · Sobre você"
                title="Seus dados básicos."
                description="Começamos com as informações essenciais para identificar o atendimento."
            />
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                <div className="sm:col-span-2">
                    <Field label="Nome completo" required>
                        <input
                            type="text"
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
                        className={inputClass}
                        value={data.email}
                        onChange={(e) => update({ email: e.target.value })}
                        required
                    />
                </Field>
                <Field label="Telefone / WhatsApp" required>
                    <input
                        type="tel"
                        className={inputClass}
                        placeholder="(11) 99999-9999"
                        value={data.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        required
                    />
                </Field>
                <Field label="Data de nascimento" required>
                    <input
                        type="date"
                        className={inputClass}
                        value={data.dob}
                        onChange={(e) => update({ dob: e.target.value })}
                        required
                    />
                </Field>
                <Field label="Cidade / UF" required>
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="São Paulo / SP"
                        value={data.city}
                        onChange={(e) => update({ city: e.target.value })}
                        required
                    />
                </Field>
            </div>
            <StepActions nextDisabled={!valid} />
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
                eyebrow="Passo 02 · Queixa"
                title="O que te trouxe até aqui?"
                description="Conte com suas palavras se quiser. Quanto mais contexto, melhor conseguimos te ajudar, mas você também pode pular esta etapa."
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
                        onChange={(value) =>
                            update({ concernDuration: value })
                        }
                        options={concernDurationOptions}
                    />
                </Field>
                <Field
                    label="Já fez algum tratamento para isso?"
                    hint="Opcional"
                >
                    <textarea
                        className={textareaClass}
                        rows="3"
                        placeholder="Medicamentos, cremes, procedimentos, outras consultas..."
                        value={data.priorTreatments}
                        onChange={(e) =>
                            update({ priorTreatments: e.target.value })
                        }
                    />
                </Field>
            </div>
            <StepActions onBack={onBack} />
        </form>
    );
}

/* ─── Step 3 · Health ────────────────────────────────────────────────── */

function StepHealth({ data, update, onNext, onBack }) {
    const submit = (e) => {
        e.preventDefault();
        onNext();
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                eyebrow="Passo 03 · Saúde"
                title="Sua saúde em geral."
                description="Essas informações ajudam a Dra. Lorraine a escolher o tratamento mais seguro para você."
            />
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                <div className="sm:col-span-2">
                    <Field
                        label="Alergias conhecidas"
                        hint="Medicamentos, cosméticos, alimentos"
                    >
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="Nenhuma / Ex: dipirona, níquel..."
                            value={data.allergies}
                            onChange={(e) =>
                                update({ allergies: e.target.value })
                            }
                        />
                    </Field>
                </div>
                <div className="sm:col-span-2">
                    <Field label="Medicamentos de uso contínuo">
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="Nenhum / Liste nome e dose..."
                            value={data.medications}
                            onChange={(e) =>
                                update({ medications: e.target.value })
                            }
                        />
                    </Field>
                </div>
                <div className="sm:col-span-2">
                    <Field label="Condições de saúde relevantes">
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="Ex: diabetes, hipotireoidismo, gestação..."
                            value={data.conditions}
                            onChange={(e) =>
                                update({ conditions: e.target.value })
                            }
                        />
                    </Field>
                </div>
            </div>
            <StepActions onBack={onBack} />
        </form>
    );
}

/* ─── Step 4 · Photos (Vercel Blob upload) ───────────────────────────── */

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
        file.type || PHOTO_CONTENT_TYPES_BY_EXTENSION[getFileExtension(file.name)]
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
                    const blob = await upload(getSafePhotoPath(file, index), file, {
                        access: "private",
                        contentType: getPhotoContentType(file),
                        handleUploadUrl: "/api/photos/upload",
                        abortSignal: controller.signal,
                        onUploadProgress: ({ percentage }) => {
                            setUploadStatus(
                                `Enviando ${index + 1} de ${picked.length}: ${
                                    file.name
                                } · ${Math.min(Math.round(percentage), 100)}%`
                            );
                        }
                    });
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
                eyebrow="Passo 04 · Fotos"
                title="Fotos da área de interesse."
                description="Fotos claras fazem muita diferença na consulta. Você pode enviar até 6 imagens — ou pular este passo se preferir."
            />

            {/* Dropzone / picker */}
            <div
                className={`border border-dashed bg-[#FAF6F0] p-10 text-center transition-colors ${
                    uploading
                        ? "opacity-60"
                        : dragActive
                        ? "border-[#9A4639] bg-[#F3EADB]"
                        : slotsLeft > 0
                        ? "border-[#9A4639]/40 hover:bg-[#F3EADB]/60 cursor-pointer"
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
                <div className="mt-4 text-sm font-medium text-[#1C1917]">
                    {uploading
                        ? "Enviando..."
                        : slotsLeft === 0
                        ? "Limite de 6 fotos atingido"
                        : "Clique para selecionar ou arraste suas fotos"}
                </div>
                <div className="mt-1 text-xs text-[#57534E]">
                    JPG · PNG · HEIC · até 10 MB por imagem
                </div>
            </div>

            {uploadStatus && (
                <div className="mt-4 border-l-2 border-[#9A4639] pl-4 py-3 text-sm text-[#57534E]">
                    {uploadStatus}
                </div>
            )}

            {error && (
                <div className="mt-4 border-l-2 border-[#9A4639] pl-4 py-3 text-sm text-[#9A4639]">
                    {error}
                </div>
            )}

            {/* Uploaded previews */}
            {data.photos.length > 0 && (
                <div className="mt-8">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium mb-4">
                        {data.photos.length} de {MAX_PHOTOS} fotos enviadas
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {data.photos.map((p) => (
                            <div
                                key={p.pathname}
                                className="relative group aspect-square bg-[#E7E2D9] overflow-hidden border border-[#E7E2D9]"
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
                                    className="absolute top-2 right-2 bg-[#1C1917]/80 hover:bg-[#9A4639] text-[#FAF6F0] w-7 h-7 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tips */}
            <div className="mt-10 border-t border-[#E7E2D9] pt-8">
                <div className="text-xs uppercase tracking-[0.22em] text-[#9A4639] font-medium mb-4">
                    Dicas para boas fotos
                </div>
                <ul className="space-y-2 text-[#3C3833] text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                        <span className="text-[#9A4639] mt-[2px]">—</span>
                        <span>Luz natural, sem flash direto na pele</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#9A4639] mt-[2px]">—</span>
                        <span>Uma foto de perto e outra mais afastada</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#9A4639] mt-[2px]">—</span>
                        <span>Pele limpa, sem maquiagem ou filtros</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#9A4639] mt-[2px]">—</span>
                        <span>Fundo neutro e foco nítido</span>
                    </li>
                </ul>
            </div>

            <div className="flex items-center justify-between pt-8 mt-10 border-t border-[#E7E2D9]">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-[#57534E] hover:text-[#9A4639] transition-colors py-3"
                >
                    ← Voltar
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={uploading}
                    className="bg-[#1C1917] hover:bg-[#9A4639] disabled:bg-[#E7E2D9] disabled:text-[#A8A29E] text-[#FAF6F0] font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
                >
                    {data.photos.length > 0 ? "Continuar" : "Pular por agora"}
                </button>
            </div>
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
                stroke="#9A4639"
                strokeWidth="1.2"
            />
            <circle
                cx="20"
                cy="21"
                r="6"
                stroke="#9A4639"
                strokeWidth="1.2"
            />
            <path
                d="M14 10l2-3h8l2 3"
                stroke="#9A4639"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <circle cx="30" cy="15" r="1" fill="#9A4639" />
        </svg>
    );
}

/* ─── Step 5 · Consent ───────────────────────────────────────────────── */

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
            update({ consultaId: id });
            onNext();
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
                eyebrow="Passo 05 · Consentimento"
                title="Antes de seguir."
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
                        className="text-[#9A4639] underline underline-offset-4 decoration-1 font-medium"
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
                        className="text-[#9A4639] underline underline-offset-4 decoration-1 font-medium"
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
                        className="text-[#9A4639] underline underline-offset-4 decoration-1 font-medium"
                    >
                        Termos de Uso
                    </Link>{" "}
                    do serviço.
                </ConsentCheckbox>
            </div>

            {error && (
                <div className="mt-6 p-4 border border-[#E7D5D0] bg-[#FBEDEA] text-sm text-[#7A2E26] leading-relaxed">
                    — {error}
                </div>
            )}

            <StepActions
                onBack={onBack}
                nextDisabled={!valid || submitting}
                nextLabel={submitting ? "Enviando…" : undefined}
            />
        </form>
    );
}

function ConsentCheckbox({ checked, onChange, children }) {
    return (
        <label
            className={`flex items-start gap-4 p-5 border cursor-pointer transition-colors ${
                checked
                    ? "border-[#9A4639] bg-[#F3EADB]/60"
                    : "border-[#E7E2D9] bg-[#FAF6F0] hover:border-[#9A4639]/50"
            }`}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-1 w-5 h-5 accent-[#9A4639] flex-shrink-0 cursor-pointer"
            />
            <span className="text-sm text-[#3C3833] leading-relaxed">
                {children}
            </span>
        </label>
    );
}

/* ─── Step 6 · Payment ───────────────────────────────────────────────── */

function StepPayment({ data, onNext, onBack }) {
    const [checkout, setCheckout] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    useEffect(() => {
        if (!data.consultaId) {
            setError("Salve o formulário antes de iniciar o pagamento.");
            return;
        }

        const loadCheckout = async () => {
            setLoading(true);
            setError("");
            setNotice("");

            try {
                const response = await fetch("/api/payments/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ consultationId: data.consultaId })
                });
                const body = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(
                        body.missing?.length
                            ? `Configure: ${body.missing.join(", ")}`
                            : body.error || "Não foi possível preparar o checkout."
                    );
                }

                setCheckout(body);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCheckout();
    }, [data.consultaId]);

    const checkPayment = async () => {
        setChecking(true);
        setError("");
        setNotice("");

        try {
            const response = await fetch(`/api/consultations/${data.consultaId}`);
            const body = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(body.error || "Não foi possível verificar o pagamento.");
            }

            if (body.payment_status === "paid" || body.status === "paid" || body.status === "scheduled") {
                onNext();
                return;
            }

            setNotice(
                "Ainda não recebemos a confirmação do pagamento. Assim que o webhook confirmar, você poderá avançar para a agenda."
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setChecking(false);
        }
    };

    return (
        <div>
            <StepHeader
                eyebrow="Passo 06 · Pagamento"
                title="Quase lá."
                description="Concluído o pagamento, você terá acesso à agenda da Dra. Lorraine para escolher seu horário."
            />

            <div className="bg-[#1C1917] text-[#FAF6F0] p-8 lg:p-10">
                <div className="text-xs uppercase tracking-[0.28em] text-[#E4B5AC] font-medium mb-6">
                    Videoconsulta · Dermatologia
                </div>

                <div className="border-t border-[#FAF6F0]/15 pt-6 mb-6">
                    <div className="flex items-baseline gap-3">
                        <span className="text-5xl lg:text-6xl font-light text-[#FAF6F0] tracking-tight">
                            {CONSULTATION_PRICE_LABEL}
                        </span>
                        <span className="text-sm text-[#FAF6F0]/60 uppercase tracking-[0.22em]">
                            Pagamento único
                        </span>
                    </div>
                </div>

                <div className="text-sm text-[#FAF6F0]/80">
                    Olá,{" "}
                    <span className="text-[#FAF6F0]">
                        {data.name?.split(" ")[0] || "paciente"}
                    </span>
                    . Seus dados estão salvos e prontos para a consulta.
                </div>
            </div>

            <div className="mt-6 border-l-2 border-[#9A4639] pl-5 py-2 text-sm text-[#57534E] leading-relaxed">
                {loading
                    ? "Preparando checkout seguro..."
                    : "O pagamento é confirmado por webhook. Depois de concluir o checkout, volte aqui para verificar a confirmação e liberar a agenda."}
            </div>

            {error && (
                <div className="mt-6 p-4 border border-[#E7D5D0] bg-[#FBEDEA] text-sm text-[#7A2E26] leading-relaxed">
                    — {error}
                </div>
            )}

            {notice && (
                <div className="mt-6 p-4 border border-[#E7E2D9] bg-[#FAF6F0] text-sm text-[#57534E] leading-relaxed">
                    {notice}
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 mt-10 border-t border-[#E7E2D9]">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-[#57534E] hover:text-[#9A4639] transition-colors py-3"
                >
                    ← Voltar
                </button>

                <div className="flex flex-col sm:flex-row gap-3">
                    {checkout?.checkoutUrl && (
                        <a
                            href={checkout.checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-8 py-3.5 rounded-none transition-colors duration-300 text-center"
                        >
                            Abrir checkout
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={checkPayment}
                        disabled={!data.consultaId || checking}
                        className="border border-[#1C1917] hover:border-[#9A4639] disabled:border-[#E7E2D9] disabled:text-[#A8A29E] text-[#1C1917] hover:text-[#9A4639] font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
                    >
                        {checking ? "Verificando..." : "Verificar pagamento →"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Step 7 · Schedule ──────────────────────────────────────────────── */

function StepSchedule({ data, onBack }) {
    const [option, setOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!data.consultaId) {
            setError("Salve o formulário antes de escolher um horário.");
            return;
        }

        const loadScheduling = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("/api/scheduling/options", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ consultationId: data.consultaId })
                });
                const body = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(
                        body.missing?.length
                            ? `Configure: ${body.missing.join(", ")}`
                            : body.error || "Não foi possível preparar a agenda."
                    );
                }

                setOption(body);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadScheduling();
    }, [data.consultaId]);

    return (
        <div>
            <div className="mb-10">
                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-4">
                    Passo 07 · Agenda
                </div>
                <h2 className="text-2xl sm:text-3xl font-light tracking-[-0.015em] text-[#1C1917] mb-3 text-balance">
                    Tudo certo,{" "}
                    <span className="italic text-[#9A4639]">
                        {data.name?.split(" ")[0] || "paciente"}
                    </span>
                    .
                </h2>
                <p className="text-[#57534E] leading-relaxed max-w-xl">
                    Agora é só escolher o melhor horário na agenda da Dra.
                    Lorraine. A disponibilidade é controlada no provedor de
                    agenda conectado.
                </p>
            </div>

            <div className="border border-[#E7E2D9] bg-[#FAF6F0] p-12 text-center">
                <CalendarGlyph />
                <div className="mt-4 text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium">
                    {loading ? "Carregando agenda..." : "Agendamento · Cal.com"}
                </div>
                {option?.bookingUrl && (
                    <a
                        href={option.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
                    >
                        Escolher horário
                    </a>
                )}
            </div>

            {error && (
                <div className="mt-6 p-4 border border-[#E7D5D0] bg-[#FBEDEA] text-sm text-[#7A2E26] leading-relaxed">
                    — {error}
                </div>
            )}

            <div className="flex justify-start pt-8 mt-10 border-t border-[#E7E2D9]">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-[#57534E] hover:text-[#9A4639] transition-colors py-3"
                >
                    ← Voltar
                </button>
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
                stroke="#9A4639"
                strokeWidth="1.2"
            />
            <path
                d="M6 16h28"
                stroke="#9A4639"
                strokeWidth="1.2"
            />
            <path
                d="M14 6v6M26 6v6"
                stroke="#9A4639"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
            <circle cx="14" cy="23" r="1.5" fill="#9A4639" />
            <circle cx="20" cy="23" r="1.5" fill="#9A4639" />
            <circle cx="26" cy="23" r="1.5" fill="#9A4639" />
        </svg>
    );
}
