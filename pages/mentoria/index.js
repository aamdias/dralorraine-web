import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { HomeBanner } from "@components/Banner";
import { Content } from "@components/Content";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Card, CardBody, CardGroup, CardHeader, CardImage } from "@components/Card";
import { FaCheck, FaQuoteLeft, FaGraduationCap, FaCalendarAlt, FaUsers, FaBookOpen, FaClock, FaBrain, FaArrowRight } from "react-icons/fa";
import { Results } from "@components/Results";
import SEO from "@components/SEO/SEO";

export default function MentorshipPage() {
    return (
        <Layout className="">
            <SEO
                title="Mentoria para Residência Médica | Dra Lô R1 Dermato UNICAMP"
                description="Se prepare para residência médica através de uma mentoria personalizada"
            />
            <div className="main-wrapper relative z-10 pb-20">
                {/* Hero Section - First Fold */}
                <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-20">
                    {/* Background with gradient and pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]" />
                    <div 
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                    {/* Accent glow */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9FD8CB] rounded-full blur-[150px] opacity-20" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#7dd3c0] rounded-full blur-[120px] opacity-15" />
                    
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.6 }}>
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                                    <span className="w-2 h-2 bg-[#9FD8CB] rounded-full animate-pulse" />
                                    <span className="text-white/90 text-sm font-medium tracking-wide">Turma 2026 • Inscrições Abertas</span>
                                </div>
                            </div>
                        </MotionBTTContainer>
                        
                        <MotionBTTContainer transition={{ delay: 0.2, duration: 0.6 }}>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center leading-tight mb-6">
                                Sua aprovação na
                                <span className="block mt-2">
                                    <span className="relative">
                                        <span className="relative z-10 text-[#9FD8CB]">residência médica</span>
                                        <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#9FD8CB]/30 -skew-x-3" />
                                    </span>
                                </span>
                                <span className="block mt-2">começa aqui</span>
                            </h1>
                        </MotionBTTContainer>
                        
                        <MotionBTTContainer transition={{ delay: 0.35, duration: 0.6 }}>
                            <p className="text-lg sm:text-xl text-white/70 text-center max-w-2xl mx-auto mb-12 leading-relaxed mb-2">
                                Mentoria personalizada com quem conquistou o <strong className="text-white">1º lugar em Dermatologia na UNICAMP</strong>. 
                                Vou te guiar do planejamento à aprovação.
                            </p>
                        </MotionBTTContainer>
                        
                        {/* Stats */}
                        <MotionBTTContainer transition={{ delay: 0.5, duration: 0.6 }}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto mb-12 mt-2">
                                {[
                                    { number: "1º", label: "lugar UNICAMP" },
                                    { number: "2º", label: "lugar USP-RP" },
                                    { number: "1º", label: "lugar PUC" },
                                    { number: "3º", label: "lugar USP-SP" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-3xl sm:text-4xl font-bold text-[#9FD8CB] mb-1">{stat.number}</div>
                                        <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </MotionBTTContainer>

                        <MotionBTTContainer transition={{ delay: 0.65, duration: 0.6 }}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    className="bg-[#9FD8CB] hover:bg-[#7dd3c0] text-[#0f172a] font-semibold px-8 py-4 text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#9FD8CB]/25 rounded-lg"
                                    variant="primary"
                                    href="https://queroserdermato.com.br"
                                    target="_blank"
                                >
                                    Conhecer Mentoria QSD 2026
                                </Button>
                                <a
                                    href="#cta-mentoria"
                                    className="text-white/70 hover:text-white font-medium py-3 px-4 transition-colors duration-300 text-base sm:text-lg"
                                >
                                    Ver todas as opções →
                                </a>
                            </div>
                        </MotionBTTContainer>
                    </div>
                </section>

                {/* Problems Section - Second Fold */}
                <section className="bg-white py-16 md:py-20">
                    <SectionContainer className="max-w-5xl mx-auto px-4 sm:px-6">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
                                    Já passou por esses problemas?
                                </h2>
                                <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
                                    Esses desafios são mais comuns do que você imagina — e eu sei exatamente como superá-los.
                                </p>
                            </div>
                        </MotionBTTContainer>

                        <div className="grid md:grid-cols-3 gap-5">
                            {/* Problem Card 1 */}
                            <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                                <div className="group bg-[#F3F5F8] rounded-xl p-6 hover:bg-[#e8ecf1] transition-colors duration-300 h-full">
                                    <div className="w-12 h-12 bg-[#9FD8CB]/20 rounded-lg flex items-center justify-center mb-4">
                                        <FaBookOpen className="text-xl text-[#9FD8CB]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-800 mb-2">
                                        Planejamento de estudos
                                    </h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Como escolher o que estudar e quando? E como manter constância ao longo dos meses?
                                    </p>
                                </div>
                            </MotionBTTContainer>

                            {/* Problem Card 2 */}
                            <MotionBTTContainer transition={{ delay: 0.3, duration: 0.5 }}>
                                <div className="group bg-[#F3F5F8] rounded-xl p-6 hover:bg-[#e8ecf1] transition-colors duration-300 h-full">
                                    <div className="w-12 h-12 bg-[#9FD8CB]/20 rounded-lg flex items-center justify-center mb-4">
                                        <FaClock className="text-xl text-[#9FD8CB]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-800 mb-2">
                                        Organização da rotina
                                    </h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Como conciliar estudos para residência com plantões e vida pessoal?
                                    </p>
                                </div>
                            </MotionBTTContainer>

                            {/* Problem Card 3 */}
                            <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                                <div className="group bg-[#F3F5F8] rounded-xl p-6 hover:bg-[#e8ecf1] transition-colors duration-300 h-full">
                                    <div className="w-12 h-12 bg-[#9FD8CB]/20 rounded-lg flex items-center justify-center mb-4">
                                        <FaBrain className="text-xl text-[#9FD8CB]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-800 mb-2">
                                        Mentalidade e saúde
                                    </h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Como manter a mente sã em um ambiente tão competitivo e exigente?
                                    </p>
                                </div>
                            </MotionBTTContainer>
                        </div>

                        {/* Transition text */}
                        <MotionBTTContainer transition={{ delay: 0.5, duration: 0.5 }}>
                            <div className="mt-12 text-center">
                                <p className="text-lg sm:text-xl text-zinc-600">
                                    Vivi na prática esses problemas e agora quero retribuir!
                                </p>
                                <p className="text-lg sm:text-xl font-semibold text-zinc-800 mt-1">
                                    Deixa eu me apresentar.
                                </p>
                            </div>
                        </MotionBTTContainer>
                    </SectionContainer>
                </section>

                <div className="scroll-mt-24 bg-gradient-to-b from-white to-[#F3F5F8]" id="pre-solutions">
                    <HomeBanner />
                </div>

                <div className="bg-[#F3F5F8] pb-16 md:pb-20">
                    <Results />
                </div>

                {/* Testimonials Section */}
                <section className="bg-white py-16 md:py-20">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
                                    Histórias de Sucesso
                                </h2>
                            </div>
                        </MotionBTTContainer>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Flavia's Testimonial */}
                            <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                                <div className="bg-[#F3F5F8] rounded-xl p-6 sm:p-8 h-full relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-[#9FD8CB] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            FF
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-zinc-800 mb-0">Flávia Freitas</h3>
                                            <div className="flex flex-wrap gap-2 -mt-0.5">
                                                <span className="inline-flex items-center gap-1 text-xs text-[#9FD8CB] font-medium">
                                                    <FaCheck className="text-[10px]" /> USP-RP
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs text-[#9FD8CB] font-medium">
                                                    <FaCheck className="text-[10px]" /> UNICAMP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 text-zinc-600 text-sm sm:text-base leading-relaxed">
                                        <p>
                                            &ldquo;Vc foi o melhor &lsquo;investimento&rsquo; com certeza. Me ajudou demais!!&rdquo;
                                        </p>
                                        <p className="font-medium text-zinc-800">
                                            &ldquo;Você foi exatamente aquilo que eu pedi e precisei. Um guia pra calcular a rota, pra me acelerar quando eu tava parando, pra me frear quando eu tava rápido.&rdquo;
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-zinc-200">
                                        <p className="text-xs text-zinc-500 font-medium">
                                            Aprovada em Clínica Médica na UNICAMP e USP-RP
                                        </p>
                                    </div>
                                </div>
                            </MotionBTTContainer>

                            {/* Success Highlights */}
                            <MotionBTTContainer transition={{ delay: 0.3, duration: 0.5 }}>
                                <div className="bg-zinc-900 rounded-xl p-6 sm:p-8 h-full text-white">
                                    <div className="mb-6">
                                        <h3 className="text-lg sm:text-xl font-bold">
                                            Aprovações em Instituições de Excelência
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        {[
                                            "UNICAMP",
                                            "USP Ribeirão Preto",
                                            "Instituto Azulay"
                                        ].map((institution, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                <FaGraduationCap className="text-lg text-[#9FD8CB]" />
                                                <span className="font-medium">{institution}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <p className="text-white/60 text-sm">
                                        Mentorados aprovados em Dermatologia e Clínica Médica nas melhores residências do país
                                    </p>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-zinc-900 py-16 md:py-20" id="solutions">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                                    O que posso esperar da mentoria?
                                </h2>
                                <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto">
                                    Encurte seu caminho para a aprovação através de uma mentoria guiada comigo
                                </p>
                            </div>
                        </MotionBTTContainer>

                        <div className="grid md:grid-cols-2 gap-5">
                            {[
                                {
                                    icon: "/beneficios-mentoria-1.png",
                                    title: "Torne seu tempo de estudos mais eficiente",
                                    description: "Te ajudo a tomar melhores decisões sobre como resolver questões, a parte mais importante para aprovação"
                                },
                                {
                                    icon: "/beneficios-mentoria-2.png",
                                    title: "Conheça o que é relevante em cada instituição",
                                    description: "Te ajudo a conhecer mais sobre UNICAMP, USP, UNIFESP e PUCC — cada uma tem suas particularidades"
                                },
                                {
                                    icon: "/beneficios-mentoria-3.png",
                                    title: "Organize sua rotina para manter constância",
                                    description: "Te ajudo a avaliar como você usa seu tempo. Compartilho o que funcionou nos últimos anos"
                                },
                                {
                                    icon: "/beneficios-mentoria-4.png",
                                    title: "Prepare-se para prova prática e currículo",
                                    description: "Dependendo da instituição, a prova prática e currículo fazem muita diferença na lista final"
                                }
                            ].map((benefit, i) => (
                                <MotionBTTContainer key={i} transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}>
                                    <div className="bg-white/5 rounded-xl p-5 sm:p-6 h-full">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-[#9FD8CB] rounded-lg flex items-center justify-center">
                                                    <img src={benefit.icon} alt="" className="w-6 h-6 object-contain invert" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-white/50 text-sm leading-relaxed">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </MotionBTTContainer>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section - Two Options */}
                <SectionContainer className="bg-[#F3F5F8] py-16 md:py-20 scroll-mt-14" id="cta-mentoria">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <MotionBTTContainer transition={{ delay: 0.1, duration: 0.5 }}>
                            <div className="text-center mb-10">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
                                    Escolha a melhor opção para você
                                </h2>
                                <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
                                    Seja através do programa completo ou de sessões individuais, estou aqui para te ajudar
                                </p>
                            </div>
                        </MotionBTTContainer>

                        <div className="grid lg:grid-cols-2 gap-5 items-stretch max-w-3xl mx-auto">
                            {/* Primary Option - 2026 Program */}
                            <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                                <div className="bg-white rounded-xl shadow-sm border border-[#9FD8CB] h-full flex flex-col">
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg sm:text-xl font-bold text-zinc-800 -mb-4">Mentoria QSD 2026</h3>
                                        <p className="text-zinc-500 text-sm mb-4">
                                            Acompanhamento contínuo durante toda sua preparação
                                        </p>
                                        
                                        <ul className="space-y-2.5 text-zinc-600 text-sm flex-grow mb-5">
                                            {[
                                                "Encontros mensais individuais",
                                                "Grupo de estudos exclusivo",
                                                "Plano de estudos personalizado",
                                                "Suporte via WhatsApp",
                                                "Material exclusivo e simulados",
                                                "Preparação para prova prática"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2.5">
                                                    <FaCheck className="text-[#9FD8CB] text-xs flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <Button
                                            className="bg-[#9FD8CB] hover:bg-[#7dd3c0] text-[#0f172a] font-semibold w-full py-2.5 text-sm transition-all duration-300 rounded-lg"
                                            variant="primary"
                                            href="https://queroserdermato.com.br"
                                            target="_blank"
                                        >
                                            Conhecer o Programa
                                        </Button>
                                    </div>
                                </div>
                            </MotionBTTContainer>

                            {/* Secondary Option - One-off Mentorship */}
                            <MotionBTTContainer transition={{ delay: 0.3, duration: 0.5 }}>
                                <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg sm:text-xl font-bold text-zinc-800 -mb-4">Mentoria Avulsa</h3>
                                        <p className="text-zinc-500 text-sm mb-3">
                                            Sessão individual para tirar dúvidas específicas
                                        </p>
                                        <div className="mb-4">
                                            <span className="text-xs text-zinc-400 line-through mr-2">R$499</span>
                                            <span className="text-2xl sm:text-3xl font-bold text-zinc-800">R$ 399,90</span>
                                        </div>
                                        
                                        <ul className="space-y-2.5 text-zinc-600 text-sm flex-grow mb-5">
                                            {[
                                                "Encontro de até 1h30 via Google Meet",
                                                "Avaliação personalizada do seu momento",
                                                "Direcionamento para estudos",
                                                "Orientação sobre o que e como estudar",
                                                "Definição de metas e próximos passos"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2.5">
                                                    <FaCheck className="text-zinc-400 text-xs flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <Button
                                            className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold w-full py-2.5 text-sm transition-all duration-300 rounded-lg"
                                            variant="primary"
                                            href="https://pay.hotmart.com/V91028431Y?checkoutMode=10&bid=1756811102458"
                                            target="_blank"
                                        >
                                            Agendar Sessão
                                        </Button>
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </div>
                    </div>
                </SectionContainer>
            </div>
        </Layout>
    );
}
