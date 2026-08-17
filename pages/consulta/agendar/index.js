import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { Layout } from "@components/Layout";
import { Chevron } from "@components/Chevron";
import SEO from "@components/SEO/SEO";

const STORAGE_KEY = "consulta_agendamento_v1";
const FLOW_VERSION = 2;

const steps = [
    { id: 1, label: "Você" },
    { id: 2, label: "Queixa" },
    { id: 3, label: "Fotos" },
    { id: 4, label: "Termos" },
    { id: 5, label: "Pagamento" },
    { id: 6, label: "Agenda" }
];

const CONSULTATION_PRICE_LABEL = "R$ 350";

/**
 * Atendimento presencial (Campinas, SP) não passa pelo fluxo online: a agenda
 * do consultório é combinada direto com a Dra. Lorraine pelo WhatsApp.
 */
export const WHATSAPP_NUMBER = "5512992057736";
export const WHATSAPP_PRESENCIAL_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá, Dra. Lorraine! Gostaria de agendar uma consulta presencial em Campinas."
)}`;

const PRESENCIAL_PROCEDURES = [
    "Toxina botulínica (Botox)",
    "Bioestimulador de colágeno",
    "Preenchimento com ácido hialurônico",
    "Peelings",
    "Microagulhamento"
];

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
        if (!hydrated || paymentReturn !== "stripe_success" || !data.consultaId) {
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

                const response = await fetch(`/api/consultations/${data.consultaId}`);
                const body = await response.json().catch(() => ({}));

                if (!active || !response.ok) return;

                if (
                    body.payment_status === "paid" ||
                    body.status === "paid" ||
                    body.status === "scheduled"
                ) {
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

    const update = (patch) => setData((d) => ({ ...d, ...patch }));
    const next = (patch) => {
        if (patch) {
            setData((d) => ({ ...d, ...patch }));
        }
        setStep((s) => Math.min(steps.length, s + 1));
    };
    const back = () => setStep((s) => Math.max(1, s - 1));

    return (
        <Layout>
            <SEO
                title="Agendar Consulta | Dra. Lorraine Souza"
                description="Agende sua videoconsulta de dermatologia em poucos passos. Suas respostas ficam salvas — você pode voltar depois para continuar."
                image="/lolo-portrait-consulta.jpg"
                url="/consulta/agendar"
            />

            {/* Alinhado ao mesmo container do header (max-w-7xl). No desktop
                o fluxo vira duas colunas: contexto e passos à esquerda,
                formulário à direita — a coluna única de 3xl deixava metade
                da tela vazia. */}
            <div className="bg-paper text-ink min-h-screen pt-36 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 lg:mb-16 max-w-3xl">
                        <div className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">
                            {modality === "presencial"
                                ? "Agendamento · Presencial"
                                : modality === "video"
                                ? "Agendamento · Videoconsulta"
                                : "Agendamento"}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-4 text-balance">
                            {modality ? (
                                <>
                                    Vamos agendar sua{" "}
                                    <span className="italic text-copper-dark">
                                        consulta
                                    </span>
                                    .
                                </>
                            ) : (
                                <>
                                    Como você prefere a sua{" "}
                                    <span className="italic text-copper-dark">
                                        consulta
                                    </span>
                                    ?
                                </>
                            )}
                        </h1>
                        <p className="text-stone leading-relaxed max-w-xl">
                            {modality === "video"
                                ? "Suas respostas ficam salvas a cada passo — você pode voltar depois para continuar de onde parou."
                                : modality === "presencial"
                                ? "O consultório fica em Campinas, São Paulo. A agenda presencial é combinada direto comigo."
                                : "Escolha o formato que funciona melhor para você. Dá para trocar depois."}
                        </p>
                    </div>

                    {!modality && (
                        <ModalityChoice onChoose={(value) => setModality(value)} />
                    )}

                    {modality && (
                        <ModalityBar
                            modality={modality}
                            onReset={() => setModality("")}
                        />
                    )}

                    {modality === "presencial" && (
                        <StepPresencial
                            onChooseVideo={() => setModality("video")}
                        />
                    )}

                    {modality === "video" && (
                        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 xl:gap-20 items-start">
                            {/* Coluna de contexto — acompanha a rolagem no desktop */}
                            <aside className="lg:sticky lg:top-28">
                                <StepProgress currentStep={step} />
                                <p className="hidden lg:flex items-center gap-2 mt-10 pt-8 border-t border-line text-xs uppercase tracking-label text-stone/70 font-medium">
                                    <LockGlyph />
                                    Criptografado · LGPD
                                </p>
                            </aside>

                            <div className="min-w-0">
                    {/* Card */}
                    <div className="bg-[#FBF8F2] border border-line mt-10 lg:mt-0 p-6 sm:p-10 lg:p-12">
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
                            <StepPhotos
                                data={data}
                                update={update}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 4 && (
                            <StepConsent
                                data={data}
                                update={update}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 5 && (
                            <StepPayment
                                data={data}
                                paymentReturn={paymentReturn}
                                paymentSessionId={paymentSessionId}
                                onNext={next}
                                onBack={back}
                            />
                        )}
                        {step === 6 && (
                            <StepSchedule data={data} onBack={back} />
                        )}
                    </div>

                    <div className="mt-16 pt-10 border-t border-line lg:hidden">
                        <p className="text-center text-xs uppercase tracking-label text-stone/70 font-medium flex items-center justify-center gap-2">
                            <LockGlyph />
                            Informações criptografadas · LGPD
                        </p>
                    </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

/* ─── Modality choice ────────────────────────────────────────────────── */

/**
 * Barra de contexto: mostra a modalidade escolhida e devolve para a escolha.
 * Fica no topo, sempre visível — voltar para a tela de escolha não pode
 * depender de achar um link no fim da página.
 */
function ModalityBar({ modality, onReset }) {
    return (
        <div className="max-w-3xl lg:max-w-none flex flex-wrap items-center gap-x-4 gap-y-2 justify-between border-t border-b border-line py-4 mb-10">
            <span className="text-xs uppercase tracking-label text-stone font-medium">
                {modality === "presencial"
                    ? "Consulta presencial · Campinas, SP"
                    : "Videoconsulta"}
            </span>
            <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-copper-dark transition-colors"
            >
                <span aria-hidden className="text-copper">
                    ←
                </span>
                Trocar tipo de consulta
            </button>
        </div>
    );
}

const Rule = () => (
    <span aria-hidden className="w-3.5 h-px bg-copper mt-[11px] flex-none" />
);

/**
 * Primeira decisão do agendamento. Só a videoconsulta é agendável online;
 * o presencial é combinado por WhatsApp. Um primário e um secundário —
 * nunca dois botões primários lado a lado (brandbook §04).
 */
function ModalityChoice({ onChoose }) {
    return (
        <div className="max-w-4xl grid md:grid-cols-2 gap-px bg-line border border-line">
            {/* Presencial primeiro e com o botão primário: é o atendimento
                completo, onde o exame de pele e os procedimentos acontecem. */}
            <div className="bg-[#FBF8F2] p-8 lg:p-10 flex flex-col">
                <div className="text-[11px] uppercase tracking-label text-copper-dark font-medium">
                    Campinas · São Paulo
                </div>
                <h2 className="text-2xl lg:text-[1.75rem] font-normal leading-[1.2] text-ink mt-4 mb-0">
                    Consulta presencial
                </h2>
                <p className="mt-3 text-stone leading-relaxed">
                    No consultório, com exame de pele presencial e a
                    possibilidade de procedimentos na própria consulta.
                </p>
                <ul className="mt-6 space-y-3 text-[15px] text-slate leading-relaxed">
                    <li className="flex gap-3.5">
                        <Rule />
                        <span>
                            Avaliação clínica completa, com exame presencial.
                        </span>
                    </li>
                    <li className="flex gap-3.5">
                        <Rule />
                        <span>
                            Procedimentos como toxina botulínica, preenchimento
                            e peelings.
                        </span>
                    </li>
                    <li className="flex gap-3.5">
                        <Rule />
                        <span>Agenda combinada direto comigo.</span>
                    </li>
                </ul>
                <div className="mt-auto pt-8">
                    <div className="text-sm text-stone mb-5">
                        Valor conforme o caso · combinamos antes
                    </div>
                    <button
                        type="button"
                        onClick={() => onChoose("presencial")}
                        className="inline-flex items-center justify-center w-full px-8 py-4 bg-ink text-paper text-[15px] font-medium rounded-none transition-colors duration-300 hover:bg-copper-dark"
                    >
                        Consulta presencial
                        <span className="ml-2 inline-block align-middle">
                            <Chevron />
                        </span>
                    </button>
                </div>
            </div>

            <div className="bg-[#FBF8F2] p-8 lg:p-10 flex flex-col">
                <div className="text-[11px] uppercase tracking-label text-copper-dark font-medium">
                    Onde você estiver
                </div>
                <h2 className="text-2xl lg:text-[1.75rem] font-normal leading-[1.2] text-ink mt-4 mb-0">
                    Videoconsulta
                </h2>
                <p className="mt-3 text-stone leading-relaxed">
                    Uma hora por vídeo, com avaliação completa e conduta por
                    escrito. Agendamento e pagamento por aqui.
                </p>
                <ul className="mt-6 space-y-3 text-[15px] text-slate leading-relaxed">
                    <li className="flex gap-3.5">
                        <Rule />
                        <span>Análise prévia do seu caso e das suas fotos.</span>
                    </li>
                    <li className="flex gap-3.5">
                        <Rule />
                        <span>Prescrição digital quando indicada.</span>
                    </li>
                    <li className="flex gap-3.5">
                        <Rule />
                        <span>14 dias de suporte por mensagem.</span>
                    </li>
                </ul>
                <div className="mt-auto pt-8">
                    <div className="text-sm text-stone mb-5">
                        {CONSULTATION_PRICE_LABEL} · pagamento único
                    </div>
                    <button
                        type="button"
                        onClick={() => onChoose("video")}
                        className="inline-flex items-center justify-center w-full px-8 py-4 border border-ink text-ink text-[15px] font-medium rounded-none transition-colors duration-300 hover:bg-ink hover:text-paper"
                    >
                        Agendar videoconsulta
                        <span className="ml-2 inline-block align-middle">
                            <Chevron />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Presencial ─────────────────────────────────────────────────────── */

function StepPresencial({ onChooseVideo }) {
    return (
        <div className="max-w-3xl bg-[#FBF8F2] border border-line p-6 sm:p-10 lg:p-12">
            <StepHeader
                eyebrow="Presencial · Campinas, SP"
                title="Atendo presencialmente em Campinas."
                description="A consulta presencial permite examinar a pele de perto e, quando fizer sentido, já realizar o procedimento na mesma visita."
            />

            <div className="border-t border-line pt-8">
                <div className="text-xs uppercase tracking-label text-stone font-medium mb-5">
                    Procedimentos realizados
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-ink">
                    {PRESENCIAL_PROCEDURES.map((item) => (
                        <li key={item} className="flex items-baseline gap-3">
                            <span aria-hidden className="text-copper-dark">
                                —
                            </span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="mt-8 text-sm text-stone leading-relaxed border-t border-line pt-6">
                A agenda do consultório não é fechada por aqui. Me chame no
                WhatsApp e combinamos data, endereço e valor conforme o que você
                precisa.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <a
                    href={WHATSAPP_PRESENCIAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-ink text-paper text-[15px] font-medium rounded-none transition-colors duration-300 hover:bg-copper-dark"
                >
                    Agendar pelo WhatsApp
                </a>
                <button
                    type="button"
                    onClick={onChooseVideo}
                    className="text-sm text-stone hover:text-copper-dark underline underline-offset-4 decoration-1 decoration-copper/40 hover:decoration-copper transition-colors text-center sm:text-left"
                >
                    Prefiro a videoconsulta
                </button>
            </div>
        </div>
    );
}

/* ─── Progress ───────────────────────────────────────────────────────── */

/**
 * Progresso do agendamento.
 *  - mobile: barra compacta com "passo N de M"
 *  - sm–lg: trilha horizontal
 *  - lg+: trilha vertical na coluna lateral, onde há espaço para respirar
 */
function StepProgress({ currentStep }) {
    return (
        <div>
            {/* lg+: trilha vertical */}
            <ol className="hidden lg:block list-none m-0 p-0">
                {steps.map((s, i) => {
                    const isDone = s.id < currentStep;
                    const isActive = s.id === currentStep;
                    return (
                        <li key={s.id} className="relative flex gap-4 pb-7 last:pb-0">
                            {i < steps.length - 1 && (
                                <span
                                    aria-hidden
                                    className={`absolute left-[7px] top-4 bottom-0 w-px ${
                                        isDone ? "bg-copper" : "bg-line"
                                    }`}
                                />
                            )}
                            <span
                                aria-hidden
                                className={`relative z-10 mt-[3px] w-4 h-4 flex-none transition-colors ${
                                    isDone
                                        ? "bg-copper"
                                        : isActive
                                        ? "bg-paper border-[2px] border-copper"
                                        : "bg-paper border border-line"
                                }`}
                            />
                            <span
                                aria-current={isActive ? "step" : undefined}
                                className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${
                                    isActive
                                        ? "text-copper-dark"
                                        : isDone
                                        ? "text-ink"
                                        : "text-[#A8A29E]"
                                }`}
                            >
                                {s.label}
                            </span>
                        </li>
                    );
                })}
            </ol>

            {/* sm–lg: trilha horizontal */}
            <div className="hidden sm:block lg:hidden">
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
                                                ? "bg-copper"
                                                : "bg-line"
                                        }`}
                                    />
                                )}
                                <div
                                    className={`relative z-10 w-4 h-4 flex items-center justify-center transition-colors ${
                                        isDone
                                            ? "bg-copper"
                                            : isActive
                                            ? "bg-paper border-[2px] border-copper"
                                            : "bg-paper border border-line"
                                    }`}
                                />
                                <div
                                    className={`mt-3 text-[11px] uppercase tracking-[0.18em] font-medium text-center transition-colors ${
                                        isActive
                                            ? "text-copper-dark"
                                            : isDone
                                            ? "text-ink"
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
                    <span className="text-xs uppercase tracking-[0.22em] text-copper-dark font-medium">
                        {steps[currentStep - 1].label}
                    </span>
                    <span className="text-xs uppercase tracking-[0.22em] text-stone font-medium">
                        Passo {currentStep} de {steps.length}
                    </span>
                </div>
                <div className="relative h-px bg-line">
                    <div
                        className="absolute left-0 top-0 h-px bg-copper transition-all duration-500"
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
                <span className="text-xs uppercase tracking-[0.2em] text-ink font-medium">
                    {label}
                    {required && (
                        <span className="text-copper-dark ml-1.5">*</span>
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
    "w-full px-0 py-3 bg-transparent border-0 border-b border-line rounded-none text-ink placeholder:text-[#A8A29E] focus:outline-none focus:border-copper transition-colors";

const textareaClass =
    "w-full px-4 py-3 bg-paper border border-line rounded-none text-ink placeholder:text-[#A8A29E] focus:outline-none focus:border-copper transition-colors resize-none";

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
                className="group flex w-full items-center justify-between gap-4 border-0 border-b border-line bg-transparent px-0 py-3 text-left text-ink transition-colors hover:border-[#CBB9AE] focus:outline-none focus:border-copper"
            >
                <span className={selected ? "" : "text-[#A8A29E]"}>
                    {selected?.label || placeholder}
                </span>
                <span
                    aria-hidden
                    className={`h-2 w-2 shrink-0 border-b border-r border-copper transition-transform ${
                        open
                            ? "rotate-[225deg] translate-y-1"
                            : "rotate-45 -translate-y-0.5"
                    }`}
                />
            </button>

            {open && (
                <div
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-30 mt-2 border border-line bg-paper shadow-[0_18px_40px_rgba(28,25,23,0.08)]"
                >
                    <button
                        type="button"
                        role="option"
                        aria-selected={!value}
                        onClick={() => choose("")}
                        className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                            value === ""
                                ? "bg-sand text-copper-dark"
                                : "text-[#A8A29E] hover:bg-sand/70 hover:text-ink"
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
                                    ? "bg-sand text-copper-dark"
                                    : "text-ink hover:bg-sand/70 hover:text-copper-dark"
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
        <div className="flex items-center justify-between pt-8 mt-10 border-t border-line">
            {onBack ? (
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-stone hover:text-copper-dark transition-colors py-3"
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
                className="bg-ink hover:bg-copper-dark disabled:bg-line disabled:text-[#A8A29E] disabled:cursor-not-allowed text-paper font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
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
                <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium mb-4">
                    {eyebrow}
                </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-light tracking-[-0.015em] text-ink mb-3 text-balance">
                {title}
            </h2>
            {description && (
                <p className="text-stone leading-relaxed max-w-xl">
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
                stroke="#B48967"
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
                        multipart: file.size > 4 * 1024 * 1024,
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
                eyebrow="Passo 03 · Fotos"
                title="Fotos da área de interesse."
                description="Fotos claras fazem muita diferença na consulta. Você pode enviar até 6 imagens — ou pular este passo se preferir."
            />

            {/* Dropzone / picker */}
            <div
                className={`border border-dashed bg-paper p-10 text-center transition-colors ${
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
                                    className="absolute top-2 right-2 bg-ink/80 hover:bg-copper-dark text-paper w-7 h-7 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
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
                        <span className="text-copper-dark mt-[2px]">—</span>
                        <span>Luz natural, sem flash direto na pele</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-copper-dark mt-[2px]">—</span>
                        <span>Uma foto de perto e outra mais afastada</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-copper-dark mt-[2px]">—</span>
                        <span>Pele limpa, sem maquiagem ou filtros</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-copper-dark mt-[2px]">—</span>
                        <span>Fundo neutro e foco nítido</span>
                    </li>
                </ul>
            </div>

            <div className="flex items-center justify-between pt-8 mt-10 border-t border-line">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-stone hover:text-copper-dark transition-colors py-3"
                >
                    ← Voltar
                </button>
                <button
                    type="button"
                    onClick={() => onNext()}
                    disabled={uploading}
                    className="bg-ink hover:bg-copper-dark disabled:bg-line disabled:text-[#A8A29E] text-paper font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
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
                stroke="#B48967"
                strokeWidth="1.2"
            />
            <circle
                cx="20"
                cy="21"
                r="6"
                stroke="#B48967"
                strokeWidth="1.2"
            />
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
                eyebrow="Passo 04 · Consentimento"
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

function StepPayment({
    data,
    paymentReturn,
    paymentSessionId,
    onNext,
    onBack
}) {
    const [checkout, setCheckout] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [openingCheckout, setOpeningCheckout] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const loadCheckout = useCallback(async () => {
        if (!data.consultaId) {
            setError("Salve o formulário antes de iniciar o pagamento.");
            return null;
        }

        if (paymentReturn === "stripe_success") {
            setCheckout(null);
            setLoading(false);
            return null;
        }

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

            if (body.alreadyPaid) {
                onNext();
                return null;
            }

            setCheckout(body);
            return body;
        } catch (err) {
            setCheckout(null);
            setError(
                err.message ||
                    "Não foi possível preparar o checkout. Tente novamente."
            );
            return null;
        } finally {
            setLoading(false);
        }
    }, [data.consultaId, onNext, paymentReturn]);

    useEffect(() => {
        loadCheckout();
    }, [loadCheckout]);

    useEffect(() => {
        if (paymentReturn === "stripe_success") {
            setNotice(
                paymentSessionId
                    ? "Pagamento concluído no Stripe. Estamos conferindo a confirmação para liberar a agenda."
                    : "Pagamento concluído no Stripe. Clique em verificar pagamento para conferir a confirmação e liberar a agenda."
            );
        }

        if (paymentReturn === "stripe_cancel") {
            setNotice(
                "Checkout cancelado. Você pode abrir o pagamento novamente quando quiser continuar."
            );
        }
    }, [paymentReturn, paymentSessionId]);

    const checkPayment = async () => {
        setChecking(true);
        setError("");
        setNotice("");

        try {
            if (paymentSessionId) {
                const confirmationResponse = await fetch("/api/payments/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        consultationId: data.consultaId,
                        sessionId: paymentSessionId
                    })
                });
                const confirmationBody = await confirmationResponse
                    .json()
                    .catch(() => ({}));

                if (!confirmationResponse.ok) {
                    throw new Error(
                        confirmationBody.error ||
                            "Não foi possível confirmar o pagamento."
                    );
                }

                if (confirmationBody.paid) {
                    onNext();
                    return;
                }
            }

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

    const openCheckout = async () => {
        if (openingCheckout) return;

        setOpeningCheckout(true);
        setError("");

        try {
            const preparedCheckout = checkout?.checkoutUrl
                ? checkout
                : await loadCheckout();

            if (!preparedCheckout?.checkoutUrl) {
                setError(
                    "Não conseguimos abrir o checkout agora. Tente novamente em instantes."
                );
                return;
            }

            window.location.assign(preparedCheckout.checkoutUrl);
        } finally {
            setOpeningCheckout(false);
        }
    };

    return (
        <div>
            <StepHeader
                eyebrow="Passo 05 · Pagamento"
                title="Quase lá."
                description="Concluído o pagamento, você terá acesso à agenda da Dra. Lorraine para escolher seu horário."
            />

            <div className="bg-ink text-paper p-8 lg:p-10">
                <div className="text-xs uppercase tracking-[0.28em] text-rose font-medium mb-6">
                    Videoconsulta · Dermatologia
                </div>

                <div className="border-t border-paper/15 pt-6 mb-6">
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline">
                        <span className="text-5xl lg:text-6xl font-light text-paper tracking-tight">
                            {CONSULTATION_PRICE_LABEL}
                        </span>
                        <span className="text-sm text-paper/60 uppercase tracking-[0.22em]">
                            Pagamento único
                        </span>
                    </div>
                </div>

                <div className="text-sm text-paper/80">
                    Olá,{" "}
                    <span className="text-paper">
                        {data.name?.split(" ")[0] || "paciente"}
                    </span>
                    . Seus dados estão salvos e prontos para a consulta.
                </div>
            </div>

            <div className="mt-6 border-l-2 border-copper pl-5 py-2 text-sm text-stone leading-relaxed">
                {loading
                    ? "Preparando checkout seguro..."
                    : "Você será direcionada para um checkout seguro. Ao finalizar, a agenda será liberada automaticamente."}
            </div>

            {error && (
                <div className="mt-6 p-4 border border-[#E7D5D0] bg-[#FBEDEA] text-sm text-[#7A2E26] leading-relaxed">
                    — {error}
                </div>
            )}

            {notice && (
                <div className="mt-6 p-4 border border-line bg-paper text-sm text-stone leading-relaxed">
                    {notice}
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 mt-10 border-t border-line">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-stone hover:text-copper-dark transition-colors py-3"
                >
                    ← Voltar
                </button>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={openCheckout}
                        disabled={
                            !data.consultaId || loading || openingCheckout
                        }
                        className="bg-ink hover:bg-copper-dark disabled:bg-line disabled:text-[#A8A29E] disabled:cursor-not-allowed text-paper font-medium px-8 py-3.5 rounded-none transition-colors duration-300 text-center"
                    >
                        {openingCheckout
                            ? "Abrindo checkout..."
                            : loading
                            ? "Preparando..."
                            : "Pagar consulta"}
                    </button>
                    <button
                        type="button"
                        onClick={checkPayment}
                        disabled={!data.consultaId || checking}
                        className="border border-ink hover:border-copper disabled:border-line disabled:text-[#A8A29E] text-ink hover:text-copper-dark font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
                    >
                        {checking ? (
                        "Verificando..."
                    ) : (
                        <>
                            Verificar pagamento
                            <span className="ml-2 inline-block align-middle">
                                <Chevron />
                            </span>
                        </>
                    )}
                    </button>
                    {error && (
                        <button
                            type="button"
                            onClick={loadCheckout}
                            disabled={!data.consultaId || loading}
                            className="text-sm font-medium text-stone hover:text-copper-dark transition-colors py-3"
                        >
                            Tentar novamente
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Step 6 · Schedule ──────────────────────────────────────────────── */

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
                <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium mb-4">
                    Passo 06 · Agenda
                </div>
                <h2 className="text-2xl sm:text-3xl font-light tracking-[-0.015em] text-ink mb-3 text-balance">
                    Tudo certo,{" "}
                    <span className="italic text-copper-dark">
                        {data.name?.split(" ")[0] || "paciente"}
                    </span>
                    .
                </h2>
                <p className="text-stone leading-relaxed max-w-xl">
                    Agora é só escolher o melhor horário na agenda da Dra.
                    Lorraine. A disponibilidade é controlada no provedor de
                    agenda conectado.
                </p>
            </div>

            <div className="border border-line bg-paper p-12 text-center">
                <CalendarGlyph />
                <div className="mt-4 text-xs uppercase tracking-[0.22em] text-stone font-medium">
                    {loading
                        ? "Carregando agenda..."
                        : `Agendamento · ${
                              option?.providerLabel || "Google Calendar"
                          }`}
                </div>
                {option?.bookingUrl && (
                    <a
                        href={option.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex bg-ink hover:bg-copper-dark text-paper font-medium px-8 py-3.5 rounded-none transition-colors duration-300"
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

            <div className="flex justify-start pt-8 mt-10 border-t border-line">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-stone hover:text-copper-dark transition-colors py-3"
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
                stroke="#B48967"
                strokeWidth="1.2"
            />
            <path
                d="M6 16h28"
                stroke="#B48967"
                strokeWidth="1.2"
            />
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
