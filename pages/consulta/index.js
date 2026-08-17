import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Chevron } from "@components/Chevron";
import { Disclosure, DisclosureList } from "@components/Disclosure";
import SEO from "@components/SEO/SEO";
import Image from "next/image";

const stats = [
    { figure: "UNICAMP", label: "Formação em Medicina" },
    { figure: "1º lugar", label: "em Dermatologia" },
    { figure: "1 hora", label: "de consulta" },
    { figure: "14 dias", label: "de suporte pós-consulta" },
];

const modalities = [
    {
        eyebrow: "Campinas · São Paulo",
        title: "Consulta presencial",
        description:
            "No consultório, com exame de pele presencial e a possibilidade de realizar o procedimento na mesma visita.",
        items: [
            "Exame presencial de pele, cabelos e unhas.",
            "Procedimentos de cosmiatria feitos na própria consulta.",
            "Agenda combinada direto comigo, pelo WhatsApp.",
        ],
        note: "Valor conforme o caso · combinamos antes",
        cta: "Tenho interesse",
        primary: true,
    },
    {
        eyebrow: "Onde você estiver",
        title: "Videoconsulta",
        description:
            "Uma hora por vídeo, com análise prévia das suas fotos e conduta por escrito. Agendamento e pagamento pelo site.",
        items: [
            "Formulário curto e envio de fotos antes do encontro.",
            "Prescrição digital com assinatura válida, quando indicada.",
            "14 dias de suporte por mensagem para ajustar o tratamento.",
        ],
        note: "R$ 350 · pagamento único",
        cta: "Agendar videoconsulta",
        primary: false,
    },
];

const indications = [
    "Acne e cicatrizes",
    "Rosácea e vermelhidão",
    "Melasma e manchas",
    "Queda e afinamento capilar",
    "Dermatites e alergias leves",
    "Rotina de skincare",
    "Antienvelhecimento",
    "Revisão de tratamentos",
];

// Dois focos, não três: cosmiatria e dermatologia clínica. A cirúrgica saiu
// do destaque porque não é o que atendo — casos assim recebem orientação e
// encaminhamento, e isso já está dito na seção "Para quem é".
const focusAreas = [
    {
        title: "Cosmiatria",
        description:
            "Planejamento de cuidados e procedimentos estéticos: qualidade da pele, textura, manchas e sinais de envelhecimento. Na consulta a gente decide o que faz sentido para a sua pele, em que ordem e com qual expectativa. Sem pacote pronto.",
        procedures: [
            "Toxina botulínica (Botox)",
            "Bioestimulador de colágeno",
            "Preenchimento com ácido hialurônico",
            "Peelings",
            "Microagulhamento",
        ],
        procedureNote:
            "Realizo esses procedimentos presencialmente, no consultório em Campinas, São Paulo.",
    },
    {
        title: "Dermatologia clínica",
        description:
            "Avaliação e tratamento de acne, rosácea, melasma, dermatites, queda de cabelo, alergias, manchas, pintas e outras queixas de pele, cabelos e unhas. Conduta baseada em evidência, explicada passo a passo.",
    },
];

// Estes itens não são "não atendemos": são o que pede consulta presencial
// (Campinas). Emergência é a única exceção real.
const nonIndications = [
    "Biópsias e retirada de lesões",
    "Toxina botulínica, preenchimentos, peelings e microagulhamento",
    "Bioestimuladores de colágeno",
    "Cirurgias dermatológicas",
];

const included = [
    "Uma hora de consulta",
    "Análise prévia do seu caso e das fotos",
    "Plano de tratamento personalizado",
    "Prescrição digital quando indicada",
    "14 dias de suporte por mensagem",
    "Recibo para reembolso de convênio",
];

const faqs = [
    {
        q: "A consulta pode ser presencial?",
        a: "Sim. Atendo presencialmente em Campinas, São Paulo, com exame de pele e procedimentos como toxina botulínica, bioestimulador de colágeno, preenchimento com ácido hialurônico, peelings e microagulhamento. Escolha o formato no primeiro passo do agendamento: a videoconsulta é fechada por aqui, e a agenda presencial combinamos pelo WhatsApp.",
    },
    {
        q: "A Dra. Lorraine pode emitir receita?",
        a: "Sim. Quando indicado, a receita é enviada com assinatura digital válida, conforme a regulamentação do CFM.",
    },
    {
        q: "E se eu precisar de um retorno?",
        a: "Toda consulta inclui até 14 dias de suporte por mensagem para ajustes de conduta e dúvidas pontuais sobre o tratamento combinado.",
    },
    {
        q: "Como meus dados e fotos são tratados?",
        a: "Seguimos a LGPD. Suas informações clínicas e fotos são armazenadas de forma criptografada, em acesso restrito, e só são utilizadas para o atendimento. Você pode solicitar exclusão a qualquer momento.",
    },
    {
        q: "Vocês atendem convênio?",
        a: "No momento atendemos apenas de forma particular. Emitimos recibo para reembolso junto ao seu convênio ou declaração para Imposto de Renda.",
    },
    {
        q: "E se eu precisar cancelar?",
        a: "Cancelamentos com mais de 24h de antecedência têm reembolso integral. Reagendamentos podem ser feitos a qualquer momento.",
    },
    {
        q: "Telemedicina é segura?",
        a: "A teledermatologia é reconhecida e regulamentada pelo CFM (Resolução 2.314/2022). Muitos quadros dermatológicos podem ser avaliados com excelência por vídeo, especialmente quando combinados com fotos de qualidade.",
    },
];

const PORTRAIT_SRC = "/lolo-portrait-consulta.jpg";

export default function ConsultaPage() {
    return (
        <Layout>
            <SEO
                title="Consulta Online de Dermatologia | Dra. Lorraine"
                description="Consulta de dermatologia com a Dra. Lorraine, médica pela UNICAMP e R3 em Dermatologia na UNICAMP. Por videoconsulta ou presencialmente em Campinas, São Paulo."
            />
            <div className="main-wrapper relative z-10 bg-paper text-ink">
                {/* ============ HERO ============ */}
                {/* Mesmo campo de fundo da home: gradiente quente, grão de
                    papel e fio de cobre fechando a dobra. O respiro superior
                    é maior porque o header é fixo — o retrato estava colado
                    nele. Ver docs/brandbook.md §04. */}
                <section className="relative isolate overflow-hidden pt-36 pb-20 md:pb-24 lg:pt-48 lg:pb-28">
                    <div
                        aria-hidden
                        className="absolute inset-0 -z-20 bg-[linear-gradient(172deg,#E9E1D4_0%,#F0EAE0_30%,#F7F2EA_62%,#FAF6F0_88%,#FAF6F0_100%)]"
                    />
                    <div
                        aria-hidden
                        className="absolute -z-20 -top-[28%] right-[-45%] w-[150%] sm:right-[-10%] sm:w-[68%] h-[145%] rounded-full bg-[radial-gradient(closest-side,rgba(180,137,103,0.30),rgba(180,137,103,0.09)_55%,transparent_100%)]"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10 opacity-[0.35] mix-blend-multiply bg-[url('/noise.webp')] bg-repeat bg-[length:220px_220px]"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(180,137,103,0.45)_28%,rgba(180,137,103,0.45)_72%,transparent)]"
                    />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-[minmax(0,1.02fr)_minmax(260px,0.72fr)] min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.78fr)] lg:grid-cols-[1.05fr_0.9fr] gap-12 md:gap-7 min-[900px]:gap-8 lg:gap-16 items-center">
                            <div className="order-1 md:max-w-[560px] min-[900px]:max-w-[620px]">
                                <MotionBTTContainer transition={{ delay: 0.1, duration: 0.6 }}>
                                    <div className="text-xs uppercase tracking-[0.24em] sm:tracking-[0.28em] text-copper-dark font-medium mb-6 md:mb-7 lg:mb-8">
                                        Dermatologia · Consulta
                                    </div>
                                </MotionBTTContainer>
                                <MotionBTTContainer transition={{ delay: 0.2, duration: 0.6 }}>
                                    <h1 className="max-w-[11.5em] text-[2.6rem] sm:text-5xl md:text-[3rem] min-[900px]:text-[3.35rem] lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] mb-7 lg:mb-8 text-balance">
                                        Cuide da sua pele com atenção e{" "}
                                        <span className="italic font-normal text-copper-dark">
                                            ciência
                                        </span>
                                        .
                                    </h1>
                                </MotionBTTContainer>
                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-10 md:mb-12 lg:mb-16"
                                >
                                    <p className="text-lg md:text-base min-[900px]:text-[1.05rem] lg:text-lg text-stone leading-relaxed max-w-lg min-[900px]:max-w-[34rem]">
                                        Consulta com a Dra. Lorraine Souza,
                                        médica formada na UNICAMP e R3 em
                                        Dermatologia na UNICAMP. Atendimento
                                        humanizado, sem filas, com tempo para
                                        escutar o seu caso.
                                    </p>
                                </MotionBTTContainer>
                                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.6 }}>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 md:gap-5 min-[900px]:gap-6 py-2">
                                        <Button
                                            href="/consulta/agendar"
                                            className="bg-ink hover:bg-copper-dark text-paper font-medium px-8 sm:px-9 md:px-6 min-[900px]:px-7 lg:px-9 py-[17px] sm:py-[18px] md:py-4 lg:py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Agendar consulta
                                        </Button>
                                        <a
                                            href="#modalidades"
                                            className="text-ink hover:text-copper-dark font-medium underline underline-offset-[6px] decoration-1 decoration-copper/40 hover:decoration-copper transition-colors py-2"
                                        >
                                            Ver as duas opções
                                        </a>
                                    </div>
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.7 }}
                                className="order-2"
                            >
                                <div className="relative max-w-[420px] mx-auto md:max-w-[300px] md:mr-0 min-[900px]:max-w-[340px] lg:max-w-[440px]">
                                    <div
                                        aria-hidden
                                        className="absolute -inset-4 lg:-inset-7 bg-copper/[0.08]"
                                    />
                                    <div
                                        aria-hidden
                                        className="absolute -top-4 -left-4 lg:-top-7 lg:-left-7 w-16 lg:w-[88px] h-px bg-copper"
                                    />
                                    <div
                                        aria-hidden
                                        className="absolute -top-4 -left-4 lg:-top-7 lg:-left-7 w-px h-16 lg:h-[88px] bg-copper"
                                    />
                                    <div className="relative aspect-[3/4] bg-line overflow-hidden">
                                        <Image
                                            src={PORTRAIT_SRC}
                                            alt="Dra. Lorraine Souza"
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 1024px) 90vw, 40vw"
                                        />
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ STATS ============ */}
                <section className="border-y border-line">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                            {stats.map((s, i) => (
                                <div
                                    key={i}
                                    className={
                                        i > 0
                                            ? "md:pl-8 md:border-l md:border-line"
                                            : ""
                                    }
                                >
                                    <div className="text-2xl lg:text-3xl font-light tracking-tight text-ink mb-1">
                                        {s.figure}
                                    </div>
                                    <div className="text-sm text-stone">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ AS DUAS MODALIDADES ============ */}
                {/* Substitui o antigo "Como funciona", que descrevia só o
                    fluxo da videoconsulta. Aqui as duas formas de atendimento
                    aparecem lado a lado, e a escolha acontece no agendamento. */}
                <section id="modalidades" className="py-20 lg:py-24 scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="max-w-2xl mb-14 lg:mb-16">
                                <div className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">
                                    Duas formas de atendimento
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Por vídeo ou{" "}
                                    <span className="italic">no consultório</span>.
                                </h2>
                                <p className="text-lg text-stone leading-relaxed">
                                    Você escolhe o formato no primeiro passo do
                                    agendamento.
                                </p>
                            </div>
                        </MotionBTTContainer>

                        <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
                            {modalities.map((modality, i) => (
                                <MotionBTTContainer
                                    key={modality.title}
                                    transition={{
                                        delay: 0.2 + i * 0.1,
                                        duration: 0.5,
                                    }}
                                >
                                    <div className="bg-paper h-full p-8 lg:p-10 flex flex-col">
                                        <div className="text-[11px] uppercase tracking-label text-copper-dark font-medium">
                                            {modality.eyebrow}
                                        </div>
                                        <h3 className="text-2xl lg:text-[1.75rem] font-normal leading-[1.2] text-ink mt-4 mb-0">
                                            {modality.title}
                                        </h3>
                                        <p className="mt-3 text-stone leading-relaxed">
                                            {modality.description}
                                        </p>
                                        <ul className="mt-7 space-y-3 text-[15px] text-slate leading-relaxed">
                                            {modality.items.map((item) => (
                                                <li key={item} className="flex gap-3.5">
                                                    <span
                                                        aria-hidden
                                                        className="w-3.5 h-px bg-copper mt-[11px] flex-none"
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-auto pt-10">
                                            <div className="text-sm text-stone mb-5">
                                                {modality.note}
                                            </div>
                                            <Button
                                                href="/consulta/agendar"
                                                className={
                                                    modality.primary
                                                        ? "bg-ink hover:bg-copper-dark text-paper font-medium w-full justify-center py-4 rounded-none transition-colors duration-300"
                                                        : "border border-ink text-ink hover:bg-ink hover:text-paper font-medium w-full justify-center py-4 rounded-none transition-colors duration-300"
                                                }
                                            >
                                                {modality.cta}
                                                <span className="ml-2 inline-block align-middle">
                                                    <Chevron />
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ FOCUS AREAS ============ */}
                <section className="py-20 lg:py-24 border-t border-line">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
                                <div>
                                    <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium mb-6">
                                        Foco do atendimento
                                    </div>
                                    <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                        Dermatologia para tratar, prevenir e{" "}
                                        <span className="italic text-copper-dark">
                                            planejar
                                        </span>
                                        .
                                    </h2>
                                    <p className="text-lg text-stone leading-relaxed">
                                        Dois focos de atendimento: cuidar da
                                        saúde da pele e planejar o que melhora
                                        a sua qualidade. Os procedimentos de
                                        cosmiatria são realizados
                                        presencialmente, em Campinas, São
                                        Paulo.
                                    </p>
                                </div>

                                {/* Revelação progressiva: os títulos dão o
                                    mapa; o detalhe abre sob demanda. */}
                                <DisclosureList>
                                    {focusAreas.map((area, i) => (
                                        <MotionBTTContainer
                                            key={area.title}
                                            transition={{
                                                delay: 0.2 + i * 0.08,
                                                duration: 0.5,
                                            }}
                                        >
                                            <Disclosure title={area.title}>
                                                <p>{area.description}</p>
                                                {area.procedures && (
                                                    <div className="mt-7 border-t border-line pt-6">
                                                        <div className="text-xs uppercase tracking-label text-stone font-medium mb-4">
                                                            Procedimentos que realizo
                                                        </div>
                                                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-ink">
                                                            {area.procedures.map((item) => (
                                                                <li
                                                                    key={item}
                                                                    className="flex items-baseline gap-3"
                                                                >
                                                                    <span
                                                                        aria-hidden
                                                                        className="text-copper-dark"
                                                                    >
                                                                        —
                                                                    </span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <p className="mt-7 pt-6 border-t border-line text-sm text-stone leading-relaxed">
                                                            {area.procedureNote}
                                                        </p>
                                                    </div>
                                                )}
                                            </Disclosure>
                                        </MotionBTTContainer>
                                    ))}
                                </DisclosureList>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ FOR WHOM ============ */}
                <section className="py-20 lg:py-24 border-t border-line bg-sand">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="max-w-2xl mb-14 lg:mb-16">
                                <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium mb-6">
                                    Para quem é
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    A teleconsulta é{" "}
                                    <span className="italic">para você</span>?
                                </h2>
                                <p className="text-lg text-stone leading-relaxed max-w-xl">
                                    A maioria das queixas dermatológicas pode ser
                                    avaliada com excelência por vídeo. Alguns casos,
                                    porém, pedem avaliação presencial.
                                </p>
                            </div>
                        </MotionBTTContainer>
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div>
                                    <div className="text-xs uppercase tracking-[0.22em] text-copper-dark font-medium mb-5 pb-5 border-b border-line">
                                        Indicado para
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-ink">
                                        {indications.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-baseline gap-3"
                                            >
                                                <span className="text-copper-dark">
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </MotionBTTContainer>
                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div>
                                    <div className="text-xs uppercase tracking-[0.22em] text-stone font-medium mb-5 pb-5 border-b border-line">
                                        Atendo presencialmente, em Campinas
                                    </div>
                                    <ul className="space-y-3 text-ink mb-8">
                                        {nonIndications.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-baseline gap-3"
                                            >
                                                <span className="text-stone">
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-sm text-stone leading-relaxed border-t border-line pt-6">
                                        Estes pedem consulta presencial, no
                                        consultório em Campinas, São Paulo. Você
                                        escolhe a modalidade no primeiro passo do
                                        agendamento. Urgências e emergências
                                        precisam de pronto-atendimento.
                                    </p>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ ABOUT ============ */}
                <section className="py-20 lg:py-24 border-t border-line">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-20 items-center">
                            <MotionBTTContainer transition={{ delay: 0.1, duration: 0.6 }}>
                                <div className="relative aspect-[3/4] max-w-[440px] mx-auto lg:max-w-none">
                                    <Image
                                        src={PORTRAIT_SRC}
                                        alt="Dra. Lorraine Souza"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 90vw, 40vw"
                                    />
                                </div>
                            </MotionBTTContainer>
                            <MotionBTTContainer transition={{ delay: 0.2, duration: 0.6 }}>
                                <div>
                                    <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium mb-6">
                                        Sobre a Dra. Lorraine
                                    </div>
                                    <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-8">
                                        Quem vai <span className="italic">cuidar de você</span>.
                                    </h2>
                                    <div className="space-y-6 text-ink leading-relaxed text-lg mb-10">
                                        <p>
                                            Formada em Medicina pela{" "}
                                            <strong className="font-medium">UNICAMP</strong>,
                                            a Dra. Lorraine é residente de Dermatologia na
                                            UNICAMP — uma das instituições mais concorridas
                                            do Brasil — onde conquistou o{" "}
                                            <strong className="font-medium">1º lugar</strong>{" "}
                                            em aprovação.
                                        </p>
                                        <p className="italic text-stone border-l border-copper pl-5 py-1">
                                            &ldquo;Cada pele conta uma história. Meu trabalho
                                            é te ajudar a cuidar bem da sua.&rdquo;
                                        </p>
                                        <p>
                                            Sua abordagem combina rigor clínico e escuta
                                            atenta. O tratamento é construído junto com
                                            você, respeitando sua rotina, orçamento e
                                            objetivos.
                                        </p>
                                    </div>
                                    <dl className="grid grid-cols-3 gap-6 border-t border-line pt-6">
                                        <div>
                                            <dt className="text-xs uppercase tracking-[0.15em] text-stone mb-1.5">
                                                Formação
                                            </dt>
                                            <dd className="font-medium">UNICAMP</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-[0.15em] text-stone mb-1.5">
                                                CRM
                                            </dt>
                                            <dd className="font-medium">218676 CRM-SP</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-[0.15em] text-stone mb-1.5">
                                                Foco
                                            </dt>
                                            <dd className="font-medium">Dermatologia</dd>
                                        </div>
                                    </dl>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ WHAT'S INCLUDED ============ */}
                {/* O valor saiu daqui de propósito: R$ 350 é o preço da
                    videoconsulta, e esta página cobre as duas modalidades.
                    O preço aparece na escolha de modalidade, em /consulta/agendar. */}
                <section className="py-20 lg:py-24 border-t border-line bg-sand">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mb-14"
                        >
                            <div className="text-xs uppercase tracking-label text-copper-dark font-medium mb-6">
                                O que está incluso
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-8">
                                Uma consulta que{" "}
                                <span className="italic text-copper-dark">
                                    não termina
                                </span>{" "}
                                quando a chamada acaba.
                            </h2>
                        </MotionBTTContainer>
                        <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                            <div className="border-t border-ink pt-8">
                                <ul className="space-y-3 text-ink mb-10">
                                    {included.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-baseline gap-3"
                                        >
                                            <span aria-hidden className="text-copper-dark">
                                                —
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-line pt-8">
                                    <Button
                                        href="/consulta/agendar"
                                        className="bg-ink hover:bg-copper-dark text-paper font-medium px-8 py-4 rounded-none transition-colors duration-300"
                                    >
                                        Agendar consulta
                                    </Button>
                                    <p className="text-xs text-stone mt-10 leading-relaxed max-w-sm">
                                        Você escolhe entre videoconsulta e
                                        atendimento presencial em Campinas no
                                        primeiro passo do agendamento.
                                    </p>
                                </div>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ FAQ ============ */}
                <section className="py-20 lg:py-24 border-t border-line">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="mb-14">
                                <div className="text-xs uppercase tracking-[0.28em] text-copper-dark font-medium mb-6">
                                    Dúvidas frequentes
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                    Perguntas que podem estar{" "}
                                    <span className="italic">na sua cabeça</span>.
                                </h2>
                            </div>
                        </MotionBTTContainer>
                        <DisclosureList>
                            {faqs.map((faq, i) => (
                                <MotionBTTContainer
                                    key={i}
                                    transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                                >
                                    <Disclosure title={faq.q}>{faq.a}</Disclosure>
                                </MotionBTTContainer>
                            ))}
                        </DisclosureList>
                    </div>
                </section>

                {/* ============ FINAL CTA ============ */}
                <section className="py-20 lg:py-24 border-t border-line">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <h2 className="text-4xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em] mb-8">
                                Pronto para cuidar da
                                <br />
                                <span className="italic text-copper-dark">sua pele</span>{" "}
                                com atenção?
                            </h2>
                            <p className="text-lg text-stone leading-relaxed mb-10 max-w-xl mx-auto">
                                Leva menos de cinco minutos para iniciar seu
                                agendamento. Você pode salvar o progresso e continuar
                                depois.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Button
                                    href="/consulta/agendar"
                                    className="bg-ink hover:bg-copper-dark text-paper font-medium px-8 py-4 rounded-none transition-colors duration-300"
                                >
                                    Agendar minha consulta
                                </Button>
                                <a
                                    href="#modalidades"
                                    className="text-ink hover:text-copper-dark font-medium underline underline-offset-4 decoration-1 decoration-copper/40 hover:decoration-copper transition-colors"
                                >
                                    Rever como funciona
                                </a>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
