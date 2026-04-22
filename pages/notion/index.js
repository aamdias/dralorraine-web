import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Results } from "@components/Results";
import SEO from "@components/SEO/SEO";
import Image from "next/image";
import { trackFacebookInitiateCheckoutCombo } from "@utils/facebookPixel";

const PREVIEW_SRC = "/nova-thumb-notion.png";

const capabilities = [
    {
        n: "01",
        title: "Melhor que caderno físico",
        description:
            "Suas anotações organizadas por grande área, com indicadores de confiança e porcentual de acertos — assim fica simples ver onde focar.",
        image: "/notion-feature-image-1.png"
    },
    {
        n: "02",
        title: "Acesso rápido ao que importa",
        description:
            "Últimos temas estudados sempre à mão. Defina prioridades, marque pendências e retome de onde parou em segundos.",
        image: "/notion-feature-image-2.png"
    },
    {
        n: "03",
        title: "Revisões programadas",
        description:
            "Planejamento semanal e ciclos de revisão embutidos. Matérias com maior dificuldade voltam sozinhas, no tempo certo.",
        image: "/notion-feature-image-3.png"
    },
    {
        n: "04",
        title: "Editor completo",
        description:
            "Cada anotação em uma página própria com recursos de formatação — tamanhos, imagens, vídeos, tabelas. Anotações ricas, visuais e pesquisáveis.",
        image: "/notion-feature-image-4.png"
    }
];

const templateInclusions = [
    "Template completo do Notion da Lô",
    "Sistema de organização de estudos",
    "Indicadores de confiança e revisão",
    "Acesso vitalício ao template"
];

const comboInclusions = [
    "Template completo do Notion",
    "Todas as +140 anotações originais",
    "Sistema de organização de estudos",
    "Acesso vitalício aos dois produtos"
];

export default function NotionPage() {
    return (
        <Layout>
            <SEO
                title="Template Notion para Residência | Dra. Lorraine Souza"
                description="O caderno digital que me levou à aprovação na residência médica. Template completo em Notion para organizar estudos, revisões e anotações."
            />

            <div className="bg-[#FAF6F0] text-[#1C1917]">
                {/* ============ HERO ============ */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-8"
                                >
                                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                        Notion · Método de estudo
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
                                        O caderno digital que me levou à{" "}
                                        <span className="italic text-[#9A4639]">
                                            aprovação
                                        </span>
                                        .
                                    </h1>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-14 lg:mb-16"
                                >
                                    <p className="text-lg text-[#57534E] leading-relaxed max-w-lg">
                                        A mesma ferramenta que usei todos os
                                        dias durante a preparação — agora
                                        transformada num template para você
                                        organizar estudos, revisões e
                                        anotações de residência.
                                    </p>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-2">
                                        <Button
                                            href="#cta-notion"
                                            className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Quero o template
                                        </Button>
                                        <a
                                            href="#capacidades"
                                            className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors py-2"
                                        >
                                            Ver como funciona
                                        </a>
                                    </div>
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.7 }}
                            >
                                <div className="relative max-w-[440px] mx-auto lg:max-w-none">
                                    <div
                                        aria-hidden
                                        className="absolute -inset-6 lg:-inset-10 bg-[#9A4639]/[0.06] rounded-[4px]"
                                    />
                                    <div className="relative aspect-[3/4] bg-[#E7E2D9] overflow-hidden rounded-[3px] shadow-[0_40px_80px_-30px_rgba(139,58,47,0.28)]">
                                        <Image
                                            src={PREVIEW_SRC}
                                            alt="Template do Notion da Dra. Lorraine"
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

                {/* ============ CAPABILITIES ============ */}
                <section
                    id="capacidades"
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    O que tem dentro
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Um sistema pensado para{" "}
                                    <span className="italic">residência</span>.
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#3C3833] leading-relaxed">
                                    Estudar bem é mais do que acumular páginas.
                                    É revisar no tempo certo, medir confiança e
                                    manter o foco no que ainda não domina.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="space-y-16 lg:space-y-24">
                            {capabilities.map((c, i) => (
                                <MotionBTTContainer
                                    key={c.n}
                                    transition={{
                                        delay: 0.15 + i * 0.06,
                                        duration: 0.5
                                    }}
                                >
                                    <div
                                        className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                                            i % 2 === 1
                                                ? "lg:[&>*:first-child]:order-2"
                                                : ""
                                        }`}
                                    >
                                        <div className="max-w-xl">
                                            <div className="flex items-baseline gap-4 mb-5">
                                                <div className="text-sm font-mono text-[#9A4639] tracking-[0.15em]">
                                                    {c.n}
                                                </div>
                                                <div className="flex-1 h-px bg-[#1C1917]/15" />
                                            </div>
                                            <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] mb-4 text-[#1C1917]">
                                                {c.title}
                                            </h3>
                                            <p className="text-[#3C3833] leading-relaxed">
                                                {c.description}
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <div
                                                aria-hidden
                                                className="absolute -inset-4 bg-[#9A4639]/[0.04] rounded-[4px]"
                                            />
                                            <div className="relative bg-[#FAF6F0] overflow-hidden rounded-[3px] shadow-[0_30px_60px_-24px_rgba(139,58,47,0.22)] aspect-[4/3]">
                                                <Image
                                                    src={c.image}
                                                    alt={c.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1024px) 90vw, 50vw"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>

                        <MotionBTTContainer
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className="mt-16 lg:mt-20 border-t border-[#1C1917]/15 pt-8 text-sm text-[#57534E] max-w-3xl">
                                Funciona sobre o{" "}
                                <a
                                    href="https://notion.so"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-4 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors"
                                >
                                    Notion
                                </a>
                                , uma ferramenta de produtividade usada por
                                milhões de pessoas — acessível no computador,
                                tablet e celular.
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* ============ RESULTS ============ */}
                <Results />

                {/* ============ ANOTACOES UPGRADE HINT ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#FAF6F0]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-6"
                                >
                                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                        Combo exclusivo
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-8">
                                        Template + as{" "}
                                        <span className="italic text-[#9A4639]">
                                            anotações originais
                                        </span>{" "}
                                        que me aprovaram.
                                    </h2>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="mb-10"
                                >
                                    <p className="text-lg text-[#57534E] leading-relaxed max-w-lg">
                                        Na versão completa, você leva também as
                                        +140 anotações originais que levaram à
                                        aprovação em UNICAMP, USP-SP, USP-RP e
                                        PUC Campinas.
                                    </p>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <a
                                        href="/anotacoes"
                                        className="inline-flex items-baseline gap-3 text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors"
                                    >
                                        Conhecer as anotações
                                        <span
                                            aria-hidden
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </a>
                                </MotionBTTContainer>
                            </div>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <div className="relative max-w-[360px] mx-auto lg:max-w-none">
                                    <div
                                        aria-hidden
                                        className="absolute -inset-6 bg-[#9A4639]/[0.05] rounded-[4px]"
                                    />
                                    <div className="relative aspect-[3/4] bg-[#E7E2D9] overflow-hidden rounded-[3px] shadow-[0_30px_60px_-24px_rgba(139,58,47,0.25)]">
                                        <Image
                                            src="/anotacoes-originais-notion-lo.png"
                                            alt="Anotações originais da Dra. Lorraine"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 70vw, 30vw"
                                        />
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* ============ PRICING ============ */}
                <section
                    id="cta-notion"
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#1C1917] text-[#FAF6F0] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#E4B5AC] font-medium">
                                    Condições especiais de lançamento
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Garanta já o{" "}
                                    <span className="italic text-[#E4B5AC]">
                                        seu
                                    </span>
                                    .
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#FAF6F0]/70 leading-relaxed">
                                    Organize seus estudos com o mesmo sistema
                                    que usei na preparação — e, se quiser, leve
                                    as anotações junto.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                            {/* Tier 1: Template */}
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="bg-[#FAF6F0] text-[#1C1917] h-full flex flex-col p-8 lg:p-10">
                                    <div className="text-xs uppercase tracking-[0.24em] text-[#9A4639] font-medium mb-6">
                                        Somente template
                                    </div>

                                    <div className="border-t border-[#E7E2D9] pt-6 mb-8">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-sm text-[#57534E] line-through">
                                                R$99
                                            </span>
                                            <span className="text-5xl font-light text-[#1C1917] tracking-tight">
                                                R$ 49
                                            </span>
                                            <span className="text-sm text-[#57534E]">
                                                ,90
                                            </span>
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium mt-3">
                                            Pagamento único · Acesso vitalício
                                        </div>
                                    </div>

                                    <ul className="space-y-3 text-[#3C3833] flex-grow mb-10">
                                        {templateInclusions.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="text-[#9A4639] mt-[2px]"
                                                >
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        href="https://pay.hotmart.com/C90888187B"
                                        className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium w-full justify-center py-[16px] rounded-none transition-colors duration-300"
                                    >
                                        Quero o template
                                    </Button>
                                </div>
                            </MotionBTTContainer>

                            {/* Tier 2: Combo */}
                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div className="bg-[#2A2724] border border-[#FAF6F0]/10 text-[#FAF6F0] h-full flex flex-col p-8 lg:p-10 relative">
                                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#9A4639] text-[#FAF6F0] text-xs uppercase tracking-[0.22em] font-medium px-3 py-1.5">
                                        Mais vendido
                                    </div>
                                    <div className="text-xs uppercase tracking-[0.24em] text-[#E4B5AC] font-medium mb-6">
                                        Combo completo
                                    </div>

                                    <div className="border-t border-[#FAF6F0]/15 pt-6 mb-8">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-sm text-[#FAF6F0]/50 line-through">
                                                R$299
                                            </span>
                                            <span className="text-5xl font-light text-[#FAF6F0] tracking-tight">
                                                R$ 199
                                            </span>
                                            <span className="text-sm text-[#FAF6F0]/60">
                                                ,90
                                            </span>
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.22em] text-[#FAF6F0]/50 font-medium mt-3">
                                            Template + +140 anotações
                                        </div>
                                    </div>

                                    <ul className="space-y-3 text-[#FAF6F0]/85 flex-grow mb-10">
                                        {comboInclusions.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="text-[#E4B5AC] mt-[2px]"
                                                >
                                                    —
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        href="https://pay.hotmart.com/X90902784L"
                                        onClick={
                                            trackFacebookInitiateCheckoutCombo
                                        }
                                        className="bg-[#FAF6F0] hover:bg-[#9A4639] text-[#1C1917] hover:text-[#FAF6F0] font-medium w-full justify-center py-[16px] rounded-none transition-colors duration-300"
                                    >
                                        Quero o combo
                                    </Button>
                                </div>
                            </MotionBTTContainer>
                        </div>

                        <div className="text-center mt-10 text-xs uppercase tracking-[0.22em] text-[#FAF6F0]/40 font-medium">
                            Pagamento 100% seguro · Hotmart
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
