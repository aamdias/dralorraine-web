import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Results } from "@components/Results";
import SEO from "@components/SEO/SEO";
import Image from "next/image";
import {
    trackFacebookInitiateCheckoutAnotacoes,
    trackFacebookInitiateCheckoutCombo
} from "@utils/facebookPixel";

const PREVIEW_SRC = "/anotacoes-originais-notion-lo.png";
const PORTRAIT_SRC = "/lolo-portrait-home-page.png";

const features = [
    {
        n: "01",
        area: "Clínica Médica",
        count: "40 temas",
        description:
            "Insuficiência cardíaca, arritmias, síncope, PCR, síndromes coronarianas e diagnósticos diferenciais essenciais."
    },
    {
        n: "02",
        area: "Cirurgia",
        count: "30 temas",
        description:
            "Trauma de face e pescoço, queimaduras, trauma abdominal, hérnias e conceitos fundamentais para prova."
    },
    {
        n: "03",
        area: "Ginecologia e Obstetrícia",
        count: "31 temas",
        description:
            "Ciclo menstrual, pré-natal, dor pélvica crônica, assistência ao parto e doenças benignas da mama."
    },
    {
        n: "04",
        area: "Pediatria",
        count: "26 temas",
        description:
            "Distúrbios obstrutivos, crescimento e desenvolvimento, tuberculose e síndromes febris."
    },
    {
        n: "05",
        area: "Medicina Preventiva",
        count: "14 temas",
        description:
            "SUS, estatística dos testes diagnósticos, níveis de prevenção e documentação médica."
    },
    {
        n: "06",
        area: "Tudo em um só lugar",
        count: "+140 temas",
        description:
            "Mais de 2 mil horas de estudo condensadas em anotações objetivas e focadas no que importa para aprovação."
    }
];

const anotacoesInclusions = [
    "Todas as +140 anotações originais",
    "Material organizado por grande área",
    "Acesso vitalício e imediato",
    "Atualizações sem custo adicional"
];

const comboInclusions = [
    "Todas as +140 anotações originais",
    "Template completo do Notion",
    "Sistema de organização de estudos",
    "Acesso vitalício aos dois produtos"
];

export default function Anotacoes() {
    return (
        <Layout>
            <SEO
                title="Anotações Originais | Dra. Lorraine Souza"
                description="+140 anotações originais que levaram a Dra. Lorraine ao 1º lugar em Dermato na UNICAMP. Material organizado e focado no essencial."
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
                                        Material exclusivo · +140 temas
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] mb-8 text-balance">
                                        As anotações que me levaram ao{" "}
                                        <span className="italic text-[#9A4639]">
                                            1º lugar
                                        </span>{" "}
                                        em Dermato.
                                    </h1>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-14 lg:mb-16"
                                >
                                    <p className="text-lg text-[#57534E] leading-relaxed max-w-lg">
                                        +140 anotações originais, o mesmo
                                        material que levou à aprovação em
                                        UNICAMP, USP-RP, USP-SP e PUC Campinas.
                                        Organizado por grande área e focado no
                                        que realmente cai.
                                    </p>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-2">
                                        <Button
                                            href="#cta-anotacoes"
                                            className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium px-9 py-[18px] rounded-none transition-colors duration-300"
                                        >
                                            Quero garantir meu acesso
                                        </Button>
                                        <a
                                            href="#conteudo"
                                            className="text-[#1C1917] hover:text-[#9A4639] font-medium underline underline-offset-[6px] decoration-1 decoration-[#9A4639]/40 hover:decoration-[#9A4639] transition-colors py-2"
                                        >
                                            Ver o que está incluído
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
                                            alt="Preview das anotações da Dra. Lorraine"
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

                {/* ============ FEATURES ============ */}
                <section
                    id="conteudo"
                    className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#F3EADB] scroll-mt-24"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-14 lg:mb-20">
                            <MotionBTTContainer
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                    O que está incluído
                                </div>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                                    Todas as grandes áreas em um{" "}
                                    <span className="italic">só lugar</span>.
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#3C3833] leading-relaxed">
                                    Material completo e organizado para
                                    maximizar seu aprendizado.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
                            {features.map((f, i) => (
                                <MotionBTTContainer
                                    key={f.n}
                                    transition={{
                                        delay: 0.15 + i * 0.06,
                                        duration: 0.5
                                    }}
                                >
                                    <div className="border-t border-[#1C1917]/25 pt-6">
                                        <div className="flex items-baseline justify-between mb-3">
                                            <div className="text-sm font-mono text-[#9A4639] tracking-[0.15em]">
                                                {f.n}
                                            </div>
                                            <div className="text-xs uppercase tracking-[0.22em] text-[#57534E] font-medium">
                                                {f.count}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-light tracking-[-0.01em] mb-3 text-[#1C1917]">
                                            {f.area}
                                        </h3>
                                        <p className="text-[#3C3833] leading-relaxed">
                                            {f.description}
                                        </p>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ ABOUT ============ */}
                <section className="py-20 lg:py-28 border-t border-[#E7E2D9] bg-[#FAF6F0]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <div className="relative max-w-[360px] mx-auto lg:max-w-none">
                                    <div
                                        aria-hidden
                                        className="absolute -inset-6 bg-[#9A4639]/[0.05] rounded-[4px]"
                                    />
                                    <div className="relative aspect-[3/4] bg-[#E7E2D9] overflow-hidden rounded-[3px] shadow-[0_30px_60px_-24px_rgba(139,58,47,0.25)]">
                                        <Image
                                            src={PORTRAIT_SRC}
                                            alt="Dra. Lorraine Souza"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 70vw, 30vw"
                                        />
                                    </div>
                                </div>
                            </MotionBTTContainer>

                            <div>
                                <MotionBTTContainer
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mb-6"
                                >
                                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium">
                                        Quem escreveu
                                    </div>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h2 className="text-3xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-8">
                                        Dra. Lorraine Souza.
                                    </h2>
                                </MotionBTTContainer>

                                <MotionBTTContainer
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <p className="text-lg text-[#57534E] leading-relaxed">
                                        Médica formada pela UNICAMP. Após muito
                                        esforço, alcancei um dos melhores
                                        resultados de aprovação para residência
                                        médica em Dermatologia em 2023 nas
                                        instituições mais renomadas do Brasil.
                                    </p>
                                </MotionBTTContainer>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ RESULTS ============ */}
                <Results />

                {/* ============ PRICING ============ */}
                <section
                    id="cta-anotacoes"
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
                                    Garanta o seu{" "}
                                    <span className="italic text-[#E4B5AC]">
                                        acesso
                                    </span>
                                    .
                                </h2>
                            </MotionBTTContainer>

                            <MotionBTTContainer
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-lg text-[#FAF6F0]/70 leading-relaxed">
                                    O mesmo material que me ajudou a conquistar
                                    a aprovação na residência médica.
                                </p>
                            </MotionBTTContainer>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                            {/* Tier 1: Anotações */}
                            <MotionBTTContainer
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="bg-[#FAF6F0] text-[#1C1917] h-full flex flex-col p-8 lg:p-10">
                                    <div className="text-xs uppercase tracking-[0.24em] text-[#9A4639] font-medium mb-6">
                                        Somente anotações
                                    </div>

                                    <div className="border-t border-[#E7E2D9] pt-6 mb-8">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-sm text-[#57534E] line-through">
                                                R$199
                                            </span>
                                            <span className="text-5xl font-light text-[#1C1917] tracking-tight">
                                                R$ 149
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
                                        {anotacoesInclusions.map((item, i) => (
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
                                        href="https://pay.hotmart.com/G96980103S"
                                        onClick={
                                            trackFacebookInitiateCheckoutAnotacoes
                                        }
                                        className="bg-[#1C1917] hover:bg-[#9A4639] text-[#FAF6F0] font-medium w-full justify-center py-[16px] rounded-none transition-colors duration-300"
                                    >
                                        Quero as anotações
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
                                            Anotações + Template Notion
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
                                        href="https://pay.hotmart.com/X90902784L?off=p7aai34k"
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
