import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "@components/Layout";
import { Button } from "@components/Button";
import SEO from "@components/SEO/SEO";
import { Icon } from "@iconify/react";
import { FaCheck, FaLock } from "react-icons/fa";

const STORAGE_KEY = "consulta_agendamento_v1";

const steps = [
    { id: 1, label: "Você" },
    { id: 2, label: "Queixa" },
    { id: 3, label: "Saúde" },
    { id: 4, label: "Fotos" },
    { id: 5, label: "Consentimento" },
    { id: 6, label: "Pagamento" },
    { id: 7, label: "Agenda" },
];

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
    skinType: "",
    photos: [],
    consentTelemedicine: false,
    consentLgpd: false,
    consentTerms: false,
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
                JSON.stringify({ step, data: { ...data, photos: [] } })
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
                title="Agendar Consulta | Dra. Lorraine"
                description="Agende sua videoconsulta dermatológica em poucos passos."
            />
            <div className="main-wrapper bg-[#FBF7F2] relative z-10 pt-28 pb-20 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">
                            Vamos agendar sua consulta
                        </h1>
                        <p className="text-zinc-600 text-sm sm:text-base">
                            Suas respostas ficam salvas — você pode voltar depois
                            para continuar.
                        </p>
                    </div>

                    {/* Progress */}
                    <StepProgress currentStep={step} />

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 sm:p-10 mt-8">
                        {step === 1 && (
                            <StepAboutYou data={data} update={update} onNext={next} />
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
                            <StepPayment data={data} onNext={next} onBack={back} />
                        )}
                        {step === 7 && <StepSchedule data={data} onBack={back} />}
                    </div>

                    <p className="text-center text-xs text-zinc-500 mt-6 flex items-center justify-center gap-2">
                        <FaLock className="text-zinc-400" />
                        Suas informações são criptografadas e tratadas conforme a LGPD.
                    </p>
                </div>
            </div>
        </Layout>
    );
}

function StepProgress({ currentStep }) {
    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                {steps.map((s, i) => {
                    const isDone = s.id < currentStep;
                    const isActive = s.id === currentStep;
                    return (
                        <div
                            key={s.id}
                            className="flex flex-col items-center flex-1 relative"
                        >
                            {i > 0 && (
                                <div
                                    className={`absolute right-1/2 top-4 h-[2px] w-full ${
                                        isDone || isActive
                                            ? "bg-[#0f766e]"
                                            : "bg-zinc-200"
                                    }`}
                                />
                            )}
                            <div
                                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                    isDone
                                        ? "bg-[#0f766e] text-white"
                                        : isActive
                                        ? "bg-[#0f766e] text-white ring-4 ring-[#9FD8CB]/40"
                                        : "bg-white text-zinc-400 border-2 border-zinc-200"
                                }`}
                            >
                                {isDone ? <FaCheck className="text-xs" /> : s.id}
                            </div>
                            <div
                                className={`text-[11px] mt-2 font-medium text-center hidden sm:block ${
                                    isActive
                                        ? "text-zinc-800"
                                        : isDone
                                        ? "text-[#0f766e]"
                                        : "text-zinc-400"
                                }`}
                            >
                                {s.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Field({ label, required, hint, children }) {
    return (
        <label className="block">
            <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-semibold text-zinc-800">
                    {label}
                    {required && <span className="text-[#0f766e] ml-1">*</span>}
                </span>
                {hint && <span className="text-xs text-zinc-500">{hint}</span>}
            </div>
            {children}
        </label>
    );
}

const inputClass =
    "w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#9FD8CB]/30 transition-colors text-zinc-800";

function StepActions({ onBack, onNext, nextLabel = "Continuar", nextDisabled }) {
    return (
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100">
            {onBack ? (
                <button
                    type="button"
                    onClick={onBack}
                    className="text-zinc-600 hover:text-zinc-900 font-medium py-2 transition-colors"
                >
                    ← Voltar
                </button>
            ) : (
                <div />
            )}
            <button
                type="submit"
                onClick={onNext}
                disabled={nextDisabled}
                className="bg-[#0f766e] hover:bg-[#115e59] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
                {nextLabel}
            </button>
        </div>
    );
}

function StepHeader({ title, description }) {
    return (
        <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-2">
                {title}
            </h2>
            {description && (
                <p className="text-sm text-zinc-600">{description}</p>
            )}
        </div>
    );
}

function StepAboutYou({ data, update, onNext }) {
    const valid = data.name && data.email && data.phone && data.dob && data.city;
    const submit = (e) => {
        e.preventDefault();
        if (valid) onNext();
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                title="Sobre você"
                description="Começamos com seus dados básicos para identificar o atendimento."
            />
            <div className="grid sm:grid-cols-2 gap-4">
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
            <StepActions onNext={submit} nextDisabled={!valid} />
        </form>
    );
}

function StepConcern({ data, update, onNext, onBack }) {
    const valid = data.mainConcern && data.concernDuration;
    const submit = (e) => {
        e.preventDefault();
        if (valid) onNext();
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                title="O que te trouxe até aqui?"
                description="Conte com suas palavras. Quanto mais contexto, melhor conseguimos te ajudar."
            />
            <div className="space-y-4">
                <Field label="Principal queixa ou motivo da consulta" required>
                    <textarea
                        className={inputClass}
                        rows="4"
                        placeholder="Ex: Tenho rosácea e piorei nos últimos meses..."
                        value={data.mainConcern}
                        onChange={(e) => update({ mainConcern: e.target.value })}
                        required
                    />
                </Field>
                <Field label="Há quanto tempo você percebe isso?" required>
                    <select
                        className={inputClass}
                        value={data.concernDuration}
                        onChange={(e) =>
                            update({ concernDuration: e.target.value })
                        }
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Menos de 1 mês">Menos de 1 mês</option>
                        <option value="1 a 6 meses">1 a 6 meses</option>
                        <option value="6 meses a 1 ano">6 meses a 1 ano</option>
                        <option value="1 a 5 anos">1 a 5 anos</option>
                        <option value="Mais de 5 anos">Mais de 5 anos</option>
                    </select>
                </Field>
                <Field
                    label="Já fez algum tratamento para isso?"
                    hint="Opcional"
                >
                    <textarea
                        className={inputClass}
                        rows="3"
                        placeholder="Medicamentos, cremes, procedimentos, outras consultas..."
                        value={data.priorTreatments}
                        onChange={(e) =>
                            update({ priorTreatments: e.target.value })
                        }
                    />
                </Field>
            </div>
            <StepActions onBack={onBack} onNext={submit} nextDisabled={!valid} />
        </form>
    );
}

function StepHealth({ data, update, onNext, onBack }) {
    const submit = (e) => {
        e.preventDefault();
        onNext();
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                title="Sua saúde em geral"
                description="Essas informações ajudam a Dra. a escolher o tratamento mais seguro para você."
            />
            <div className="space-y-4">
                <Field label="Alergias conhecidas" hint="Medicamentos, cosméticos, alimentos">
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="Nenhuma / Ex: dipirona, níquel..."
                        value={data.allergies}
                        onChange={(e) => update({ allergies: e.target.value })}
                    />
                </Field>
                <Field label="Medicamentos de uso contínuo">
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="Nenhum / Liste nome e dose..."
                        value={data.medications}
                        onChange={(e) => update({ medications: e.target.value })}
                    />
                </Field>
                <Field label="Condições de saúde relevantes">
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="Ex: diabetes, hipotireoidismo, gestação..."
                        value={data.conditions}
                        onChange={(e) => update({ conditions: e.target.value })}
                    />
                </Field>
                <Field label="Como você descreveria sua pele?">
                    <select
                        className={inputClass}
                        value={data.skinType}
                        onChange={(e) => update({ skinType: e.target.value })}
                    >
                        <option value="">Selecione</option>
                        <option value="Seca">Seca</option>
                        <option value="Mista">Mista</option>
                        <option value="Oleosa">Oleosa</option>
                        <option value="Sensível">Sensível</option>
                        <option value="Não sei">Não sei</option>
                    </select>
                </Field>
            </div>
            <StepActions onBack={onBack} onNext={submit} />
        </form>
    );
}

function StepPhotos({ data, update, onNext, onBack }) {
    return (
        <div>
            <StepHeader
                title="Fotos da área de interesse"
                description="Fotos claras fazem muita diferença. Você pode enviar até 6 imagens."
            />
            <div className="bg-[#FBF7F2] rounded-xl p-6 border-2 border-dashed border-[#9FD8CB]/50 text-center">
                <Icon
                    icon="ph:camera-plus-bold"
                    className="w-12 h-12 text-[#0f766e]/50 mx-auto mb-3"
                />
                <div className="text-sm font-semibold text-zinc-700 mb-1">
                    Upload de fotos
                </div>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                    Upload será ativado na próxima etapa da implementação. Por
                    enquanto, você pode pular este passo.
                </p>
            </div>

            <div className="mt-6 bg-[#9FD8CB]/10 rounded-xl p-5 border border-[#9FD8CB]/30">
                <div className="flex items-start gap-3">
                    <Icon
                        icon="ph:lightbulb-fill"
                        className="w-5 h-5 text-[#0f766e] flex-shrink-0 mt-0.5"
                    />
                    <div>
                        <div className="text-sm font-semibold text-zinc-800 mb-1">
                            Dicas para boas fotos
                        </div>
                        <ul className="text-sm text-zinc-600 space-y-1">
                            <li>• Luz natural, sem flash direto na pele</li>
                            <li>• Uma foto de perto e outra mais afastada</li>
                            <li>• Pele limpa, sem maquiagem ou filtros</li>
                            <li>• Fundo neutro e foco nítido</li>
                        </ul>
                    </div>
                </div>
            </div>

            <StepActions onBack={onBack} onNext={onNext} nextLabel="Pular por agora" />
        </div>
    );
}

function StepConsent({ data, update, onNext, onBack }) {
    const valid =
        data.consentTelemedicine && data.consentLgpd && data.consentTerms;
    const submit = (e) => {
        e.preventDefault();
        if (valid) onNext();
    };
    return (
        <form onSubmit={submit}>
            <StepHeader
                title="Consentimento"
                description="Antes de seguir, precisamos do seu consentimento para o atendimento e tratamento dos seus dados."
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
                        className="text-[#0f766e] underline font-medium"
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
                        className="text-[#0f766e] underline font-medium"
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
                        className="text-[#0f766e] underline font-medium"
                    >
                        Termos de Uso
                    </Link>{" "}
                    do serviço.
                </ConsentCheckbox>
            </div>

            <StepActions onBack={onBack} onNext={submit} nextDisabled={!valid} />
        </form>
    );
}

function ConsentCheckbox({ checked, onChange, children }) {
    return (
        <label className="flex items-start gap-3 p-4 bg-[#FBF7F2] rounded-xl cursor-pointer hover:bg-[#F5F0E8] transition-colors">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-1 w-5 h-5 accent-[#0f766e] flex-shrink-0"
            />
            <span className="text-sm text-zinc-700 leading-relaxed">
                {children}
            </span>
        </label>
    );
}

function StepPayment({ data, onNext, onBack }) {
    return (
        <div>
            <StepHeader
                title="Pagamento"
                description="Concluído o pagamento, você terá acesso à agenda da Dra. Lorraine para marcar seu horário."
            />

            <div className="bg-gradient-to-br from-[#0f766e] to-[#115e59] rounded-2xl p-6 text-white mb-6">
                <div className="text-xs uppercase tracking-wider opacity-80 mb-1">
                    Consulta Dermatológica Online
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-xl font-medium">R$</span>
                    <span className="text-4xl font-bold">300</span>
                    <span className="text-sm opacity-80 ml-2">pagamento único</span>
                </div>
                <div className="text-sm opacity-90">
                    Olá, {data.name?.split(" ")[0] || "paciente"}! Você está
                    quase lá.
                </div>
            </div>

            <div className="bg-[#FBF7F2] rounded-xl p-5 border border-zinc-100 text-sm text-zinc-600">
                <div className="flex items-start gap-3">
                    <Icon
                        icon="ph:info-fill"
                        className="w-5 h-5 text-[#0f766e] flex-shrink-0 mt-0.5"
                    />
                    <div>
                        A integração com o checkout será ativada na próxima
                        etapa da implementação. Por enquanto, clique em
                        &ldquo;Simular pagamento&rdquo; para conhecer o
                        próximo passo.
                    </div>
                </div>
            </div>

            <StepActions
                onBack={onBack}
                onNext={onNext}
                nextLabel="Simular pagamento →"
            />
        </div>
    );
}

function StepSchedule({ data, onBack }) {
    return (
        <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#9FD8CB]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaCheck className="text-[#0f766e] text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">
                Tudo certo, {data.name?.split(" ")[0] || "paciente"}!
            </h2>
            <p className="text-zinc-600 max-w-md mx-auto mb-6">
                Agora é só escolher o melhor horário na agenda da Dra.
                Lorraine. O link do Calendly será ativado aqui.
            </p>
            <div className="bg-[#FBF7F2] rounded-xl p-8 border border-zinc-100 mb-6">
                <Icon
                    icon="ph:calendar-dots-fill"
                    className="w-12 h-12 text-[#0f766e]/40 mx-auto mb-3"
                />
                <div className="text-sm text-zinc-500">
                    Widget de agendamento (Calendly) aparecerá aqui
                </div>
            </div>
            <div className="flex justify-start">
                <button
                    onClick={onBack}
                    className="text-zinc-600 hover:text-zinc-900 font-medium py-2 transition-colors"
                >
                    ← Voltar
                </button>
            </div>
        </div>
    );
}
