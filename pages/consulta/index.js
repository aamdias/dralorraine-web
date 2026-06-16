import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import SEO from "@components/SEO/SEO";
import Image from "next/image";

const stats = [
    { figure: "UNICAMP", label: "Formação em Medicina" },
    { figure: "1º lugar", label: "em Dermatologia" },
    { figure: "1 hora", label: "de videoconsulta" },
    { figure: "14 dias", label: "de suporte pós-consulta" },
];

const steps = [
    {
        n: "01",
        title: "Conte sua história",
        description:
            "Preencha um formulário clínico guiado com suas queixas, histórico e rotina de cuidados.",
    },
    {
        n: "02",
        title: "Envie fotos da sua pele",
        description:
            "Fotos nítidas em boa iluminação ajudam a Dra. Lorraine a entender seu caso antes do encontro.",
    },
    {
        n: "03",
        title: "Efetue o pagamento",
        description:
            "Pagamento seguro via PIX, cartão ou boleto. Confirmação em tempo real.",
    },
    {
        n: "04",
        title: "Agende sua videoconsulta",
        description:
            "Escolha o horário ideal. Você recebe lembretes e o link do Google Meet por e-mail.",
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

const nonIndications = [
    "Lesões suspeitas que exijam biópsia presencial",
    "Procedimentos estéticos (botox, preenchimento, lasers)",
    "Cirurgias dermatológicas",
    "Urgências ou emergências médicas",
];

const included = [
    "Videoconsulta de 1 hora",
    "Análise prévia do seu caso e das fotos",
    "Plano de tratamento personalizado",
    "Prescrição digital quando indicada",
    "14 dias de suporte por mensagem",
    "Recibo para reembolso de convênio",
];

const faqs = [
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
                description="Agende uma videoconsulta de dermatologia com a Dra. Lorraine, médica pela UNICAMP e R3 em Dermatologia na UNICAMP."
            />
            <div className="main-wrapper relative z-10 bg-[#FAF6F0] text-[#1C1917]">
                {/* ============ HERO ============ */}
                <section className="pt-28 lg:pt-32 pb-16 lg:pb-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">
                            <div className="order-1">
                                <MotionBTTContainer transition={{ delay: 0.1, duration: 0.6 }}>
                                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-8">
                                        Dermatologia · Teleconsulta
                                    </div>
                                </MotionBTTContainer>
                                <MotionBTTContainer transition={{ delay: 0.2, duration: 0.6 }}>
                                    <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
                                        Cuide da sua pele com atenção e{" "}
                                        <span className="italic font-normal text-[#9A4639]">
                                            ciência
                                        </span>
                                        .
                                    </h1>
                                </MotionBTTContainer>
                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-14 lg:mb-20"
                                >
                                    <p className="text-lg text-[#57534E] leading-relaxed max-w-lg">
                                        Videoconsulta com a Dra. Lorraine Souza,
                                        médica formada na UNICAMP e R3 em
                                        Dermatologia na UNICAMP. Atendimento
                                        humanizado, sem filas, do conforto da sua
                                        casa.
                                    </p>
                                </MotionBTTContainer>
                                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.6 }}>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-2">
                                        <Button
                                            href="/consulta/agendar"
                                            className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Agendar consulta
                                        </Button>
                                        <a
                                            href="#como-funciona"
                                            className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors py-2"
                                        >
                                            Saiba como funciona
                                        </a>
                                    </div>
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.7 }}
                                className="order-2"
                            >
                                <div className="relative max-w-[440px] mx-auto lg:max-w-none">
                                    <div
                                        aria-hidden
                                        className="absolute -inset-6 lg:-inset-10 bg-[#9A4639]/[0.06] rounded-[4px]"
                                    />
                                    <div className="relative aspect-[3/4] bg-[#E7E2D9] overflow-hidden rounded-[3px] shadow-[0_40px_80px_-30px_rgba(139,58,47,0.35)]">
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
                <section className="border-y border-[#E7E2D9]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
                            {stats.map((s, i) => (
                                <div
                                    key={i}
                                    className={
                                        i > 0
                                            ? "md:pl-8 md:border-l md:border-[#E7E2D9]"
                                            : ""
                                    }
                                >
                                    <div className="text-2xl lg:text-3xl font-light tracking-tight text-[#1C1917] mb-1">
                                        {s.figure}
                                    </div>
                                    <div className="text-sm text-[#57534E]">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ HOW IT WORKS ============ */}
                <section id="como-funciona" className="py-20 lg:py-24 scroll-mt-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="max-w-2xl mb-14 lg:mb-16">
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-6">
                                    Como funciona
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                    Um caminho simples,
                                    <br className="hidden sm:block" />
                                    em <span className="italic">quatro passos</span>.
                                </h2>
                            </div>
                        </MotionBTTContainer>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                            {steps.map((step, i) => (
                                <MotionBTTContainer
                                    key={i}
                                    transition={{
                                        delay: 0.2 + i * 0.1,
                                        duration: 0.5,
                                    }}
                                >
                                    <div className="border-t border-[#1C1917] pt-6">
                                        <div className="text-sm font-medium text-[#9A4639] tracking-wider mb-8">
                                            {step.n}
                                        </div>
                                        <h3 className="text-xl font-medium text-[#1C1917] mb-4 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#57534E] leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ FOR WHOM ============ */}
                <section className="py-20 lg:py-24 border-t border-[#E7E2D9] bg-[#F3EADB]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="max-w-2xl mb-14 lg:mb-16">
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-6">
                                    Para quem é
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    A teleconsulta é{" "}
                                    <span className="italic">para você</span>?
                                </h2>
                                <p className="text-lg text-[#57534E] leading-relaxed max-w-xl">
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
                                    <div className="text-xs uppercase tracking-[0.22em] text-[#9A4639] font-medium mb-5 pb-5 border-b border-[#E7E2D9]">
                                        Indicado para
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[#1C1917]">
                                        {indications.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-baseline gap-3"
                                            >
                                                <span className="text-[#9A4639]">
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
                                    <div className="text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium mb-5 pb-5 border-b border-[#E7E2D9]">
                                        Requer avaliação presencial
                                    </div>
                                    <ul className="space-y-3 text-[#1C1917] mb-8">
                                        {nonIndications.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-baseline gap-3"
                                            >
                                                <span className="text-[#57534E]">
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-sm text-[#57534E] leading-relaxed border-t border-[#E7E2D9] pt-6">
                                        Se identificarmos a necessidade de uma avaliação
                                        presencial, você é orientado sobre os próximos
                                        passos — sem custo adicional.
                                    </p>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ ABOUT ============ */}
                <section className="py-20 lg:py-24 border-t border-[#E7E2D9]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-6">
                                        Sobre a Dra. Lorraine
                                    </div>
                                    <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-8">
                                        Quem vai <span className="italic">cuidar de você</span>.
                                    </h2>
                                    <div className="space-y-6 text-[#1C1917] leading-relaxed text-lg mb-10">
                                        <p>
                                            Formada em Medicina pela{" "}
                                            <strong className="font-medium">UNICAMP</strong>,
                                            a Dra. Lorraine é residente de Dermatologia na
                                            UNICAMP — uma das instituições mais concorridas
                                            do Brasil — onde conquistou o{" "}
                                            <strong className="font-medium">1º lugar</strong>{" "}
                                            em aprovação.
                                        </p>
                                        <p className="italic text-[#57534E] border-l border-[#9A4639] pl-5 py-1">
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
                                    <dl className="grid grid-cols-3 gap-6 border-t border-[#E7E2D9] pt-6">
                                        <div>
                                            <dt className="text-xs uppercase tracking-[0.15em] text-[#57534E] mb-1.5">
                                                Formação
                                            </dt>
                                            <dd className="font-medium">UNICAMP</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-[0.15em] text-[#57534E] mb-1.5">
                                                CRM
                                            </dt>
                                            <dd className="font-medium">218676 CRM-SP</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-[0.15em] text-[#57534E] mb-1.5">
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

                {/* ============ PRICING ============ */}
                <section className="py-20 lg:py-24 border-t border-[#E7E2D9] bg-[#F3EADB]">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <MotionBTTContainer
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mb-14"
                        >
                            <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-6">
                                Valor da consulta
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-8">
                                Um investimento na{" "}
                                <span className="italic text-[#9A4639]">sua saúde</span>
                                .
                            </h2>
                            <p className="text-lg text-[#57534E] leading-relaxed max-w-xl mx-auto">
                                Um único valor, sem mensalidades, sem surpresas.
                            </p>
                        </MotionBTTContainer>
                        <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                            <div className="border-t border-[#1C1917] pt-10 max-w-xl mx-auto">
                                <div className="flex items-baseline justify-center gap-2 mb-3">
                                    <span className="text-xl text-[#57534E]">R$</span>
                                    <span className="text-7xl lg:text-8xl font-light tracking-tight">
                                        350
                                    </span>
                                </div>
                                <div className="text-sm text-[#57534E] mb-12">
                                    Pagamento único · PIX, cartão ou boleto
                                </div>
                                <div className="text-left border-t border-[#E7E2D9] pt-8 mb-10">
                                    <div className="text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium mb-5">
                                        Incluso na consulta
                                    </div>
                                    <ul className="space-y-3 text-[#1C1917]">
                                        {included.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-baseline gap-3"
                                            >
                                                <span className="text-[#9A4639]">—</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button
                                    href="/consulta/agendar"
                                    className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-8 py-4 rounded-none transition-colors duration-300 w-full justify-center"
                                >
                                    Agendar consulta
                                </Button>
                                <p className="text-xs text-[#57534E] mt-6">
                                    Cancelamento gratuito até 24h antes · Reembolso
                                    integral
                                </p>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ FAQ ============ */}
                <section className="py-20 lg:py-24 border-t border-[#E7E2D9]">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="mb-14">
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-6">
                                    Dúvidas frequentes
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em]">
                                    Perguntas que podem estar{" "}
                                    <span className="italic">na sua cabeça</span>.
                                </h2>
                            </div>
                        </MotionBTTContainer>
                        <div className="border-t border-[#1C1917]">
                            {faqs.map((faq, i) => (
                                <MotionBTTContainer
                                    key={i}
                                    transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                                >
                                    <details className="group border-b border-[#E7E2D9]">
                                        <summary className="cursor-pointer py-6 flex items-baseline justify-between gap-6 list-none">
                                            <span className="font-medium text-lg text-[#1C1917]">
                                                {faq.q}
                                            </span>
                                            <span className="text-[#9A4639] text-2xl font-light transition-transform group-open:rotate-45 flex-shrink-0 leading-none">
                                                +
                                            </span>
                                        </summary>
                                        <div className="pb-6 pr-10 text-[#57534E] leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </details>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ FINAL CTA ============ */}
                <section className="py-20 lg:py-24 border-t border-[#E7E2D9]">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <h2 className="text-4xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em] mb-8">
                                Pronto para cuidar da
                                <br />
                                <span className="italic text-[#9A4639]">sua pele</span>{" "}
                                com atenção?
                            </h2>
                            <p className="text-lg text-[#57534E] leading-relaxed mb-10 max-w-xl mx-auto">
                                Leva menos de cinco minutos para iniciar seu
                                agendamento. Você pode salvar o progresso e continuar
                                depois.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Button
                                    href="/consulta/agendar"
                                    className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-8 py-4 rounded-none transition-colors duration-300"
                                >
                                    Agendar minha consulta
                                </Button>
                                <a
                                    href="#como-funciona"
                                    className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-4 decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors"
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
