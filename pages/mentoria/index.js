import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { HomeBanner } from "@components/Banner";
import { Content } from "@components/Content";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import { Card, CardBody, CardGroup, CardHeader, CardImage } from "@components/Card";
import { FaCheck, FaQuoteLeft, FaGraduationCap, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Results } from "@components/Results";
import SEO from "@components/SEO/SEO";

export default function MentorshipPage() {
    return (
        <Layout className="">
            <SEO
                title="Mentoria para Residência Médica | Dra Lô R1 Dermato UNICAMP"
                description="Se prepare para residência médica através de uma mentoria personalizada"
            />
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-36">
                {/* Hero Section - 2026 Mentorship Program CTA */}
                <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <SectionContainer className="max-w-6xl mx-auto px-4 mb-20">
                        <div className="bg-gradient-to-br from-[#9FD8CB] to-[#7BC5B5] rounded-2xl shadow-2xl overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="p-8 md:p-12 text-white">
                                    <BadgeGroup alignment="left" className="mb-6">
                                        <BadgeMessage className="bg-white text-[#2D3319] font-semibold">
                                            🎓 Turma 2026
                                        </BadgeMessage>
                                    </BadgeGroup>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                        Programa de Mentoria para Residência Médica
                                    </h1>
                                    <p className="text-lg md:text-xl mb-8 text-white/90">
                                        Prepare-se para as provas mais concorridas do país com um programa completo de mentoria. Inscrições abertas para 2026!
                                    </p>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3">
                                            <FaGraduationCap className="text-2xl" />
                                            <span className="text-lg">Acompanhamento contínuo e personalizado</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-2xl" />
                                            <span className="text-lg">Plano de estudos estratégico</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaUsers className="text-2xl" />
                                            <span className="text-lg">Grupo de estudos exclusivo</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="bg-secondary-500 hover:bg-[#2D3319] text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        variant="primary"
                                        href="https://queroserdermato.com.br"
                                        target="_blank"
                                    >
                                        Conhecer o Programa 2026
                                    </Button>
                                </div>
                                <div className="hidden md:block p-8">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                                        <div className="text-white space-y-4">
                                            <div className="text-6xl font-bold">2026</div>
                                            <div className="text-2xl font-semibold">Vagas Limitadas</div>
                                            <div className="text-lg opacity-90">
                                                Garanta sua vaga no programa de mentoria mais completo para residência médica
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionContainer>
                </MotionBTTContainer>

                {/* Traditional Header for Context */}
                <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <SectionContainer className="feature-tabs max-w-4xl mx-auto px-4">
                        <BadgeGroup alignment="center" className="mb-6">
                            <BadgeMessage>Mentoria para Residência</BadgeMessage>
                        </BadgeGroup>
                        <PageTitle
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center max-w-4xl mx-auto"
                            type="default"
                        >
                            <div className="mx-auto text-center">
                                Sua aprovação na <span className="underline decoration-[#9FD8CB]">Residência Médica</span>
                            </div>
                        </PageTitle>
                        
                        

                        <PageTitle
                            className="text-center mx-auto my-16"
                            type="default"
                        >
                            Já passou por esses problemas?
                        </PageTitle>
                        <CardGroup className="grid gap-2 grid-cols-1 max-w-4xl mx-auto mt-16 md:grid-cols-3">
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md mx-4">
                                <div className="w-full h-56">
                                    <CardImage src="/new-study-planning.png" alt="Study Plan" className="w-full h-full object-cover"/>
                                </div>
                                <CardBody className="flex flex-col items-center pb-8 px-8">
                                    <div className="w-full">
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                            Planejamento de estudos
                                        </CardHeader>
                                        <p className="text-gray-600 text-base">
                                            Como escolher o que estudar e quando? E como manter constância?
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md mx-4">
                                <div className="w-full h-56">
                                    <CardImage src="/new-routine-planning.png" alt="Study Plan" className="w-full h-full object-cover"/>
                                </div>
                                <CardBody className="flex flex-col items-center pb-8 px-8">
                                    <div className="w-full">
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                            Organização da rotina
                                        </CardHeader>
                                        <p className="text-gray-600 text-base">
                                            Como conciliar estudos para residência com trabalho?
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md mx-4">
                                <div className="w-full h-56">
                                    <CardImage src="/new-mental-health.png" alt="Study Plan" className="w-full h-full object-cover"/>
                                </div>
                                <CardBody className="flex flex-col items-center pb-8 px-8">
                                    <div className="w-full">
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                            Mentalidade e saúde
                                        </CardHeader>
                                        <p className="text-gray-600 text-base">
                                            Como manter a mente sã em um ambiente competitivo?
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>

                        <Content className="text-center my-16 px-16" alignment="center">
                            <div className="text-2xl text-zinc-600">
                                Vivi na prática esses problemas e agora quero retribuir! <br/> <span className="font-bold">Deixa eu me apresentar.</span>
                            </div>
                        </Content>
                    </SectionContainer>
                </MotionBTTContainer>

                <div className="scroll-mt-24" id="pre-solutions">
                    <HomeBanner />
                </div>

                <Results />

                {/* Testimonials Section */}
                <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <SectionContainer className="max-w-6xl mx-auto px-4 my-20">
                        <BadgeGroup alignment="center" className="mb-6">
                            <BadgeMessage>Depoimentos</BadgeMessage>
                        </BadgeGroup>
                        <PageTitle
                            className="text-center mx-auto mb-12"
                            type="default"
                        >
                            Histórias de <span className="underline decoration-[#9FD8CB]">Sucesso</span>
                        </PageTitle>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Flavia's Testimonial */}
                            <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                <CardBody className="p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <FaQuoteLeft className="text-3xl text-[#9FD8CB] flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-xl text-zinc-800 mb-2">Flávia Freitas</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-block bg-[#9FD8CB] text-white text-sm font-semibold px-3 py-1 rounded-full">
                                                    ✓ USP-RP
                                                </span>
                                                <span className="inline-block bg-[#9FD8CB] text-white text-sm font-semibold px-3 py-1 rounded-full">
                                                    ✓ UNICAMP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-gray-700 leading-relaxed">
                                        <p>
                                            &ldquo;Owww obrigadaaa!!! Por tudo mesmo. Vc foi o melhor &lsquo;investimento&rsquo; com certeza. Me ajudou demais!! ❤️&rdquo;
                                        </p>
                                        <p className="font-semibold text-zinc-800">
                                            &ldquo;Você foi exatamente aquilo que eu pedi e precisei que você fosse. Um guia pra calcular a rota, pra me acelerar quando eu tava parando, pra me frear quando eu tava rápido e perdendo o controle.&rdquo;
                                        </p>
                                        <p>
                                            &ldquo;Eu chegava um caos antes das reuniões e sempre saia com tudo mais claro, pq vc passou toda a confiança que eu precisava.&rdquo;
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-sm text-gray-600 font-semibold">
                                            Aprovada em Clínica Médica na UNICAMP e USP-RP
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Additional Testimonial Placeholder */}
                            <Card className="bg-gradient-to-br from-[#9FD8CB] to-[#7BC5B5] rounded-xl shadow-lg overflow-hidden">
                                <CardBody className="p-8 text-white h-full flex flex-col justify-center">
                                    <div className="text-center space-y-6">
                                        <div className="text-5xl font-bold">100+</div>
                                        <div className="text-2xl font-semibold">Mentorados aprovados</div>
                                        <p className="text-lg opacity-90">
                                            Em instituições como UNICAMP, USP, UNIFESP, PUC-Campinas e outras residências concorridas
                                        </p>
                                        <div className="pt-4">
                                            <div className="flex justify-center gap-2 flex-wrap">
                                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                                                    Dermatologia
                                                </span>
                                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                                                    Clínica Médica
                                                </span>
                                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                                                    Outras especialidades
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </SectionContainer>
                </MotionBTTContainer>

                <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <SectionContainer className="feature-tabs bg-zinc-900 my-16 py-16" id="solutions">
                        <PageTitle
                            className="text-center mx-auto text-white"
                            type="default"
                        >
                            O que posso esperar da mentoria com a Lô?
                        </PageTitle>
                        <Content className="text-center text-slate-200" alignment="center">
                            <p className="mb-4 mx-2">
                                Encurte seu caminho para a aprovação através de uma mentoria guiada comigo
                            </p>
                        </Content>
                        <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-12 md:grid-cols-2">
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md mx-4">
                                <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardImage src="/beneficios-mentoria-1.png" alt="Study Plan" className="w-16 h-16"/>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                            Torne seu tempo de estudos mais eficiente e focado no que importa
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                            Te ajudo a tomar melhores decisões sobre como resolver questões, que é a parte mais importante para aprovação na prova de residência
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md mx-4">
                                <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardImage src="/beneficios-mentoria-2.png" alt="Study Plan" className="w-16 h-16"/>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                            Conheça o que é mais relevante nas instituições mais concorridas
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                            Te ajudo a conhecer mais sobre UNICAMP, USP, UNIFESP e PUCC.. cada uma tem suas particularidades que mudam o preparo
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md mx-4">
                                <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardImage src="/beneficios-mentoria-3.png" alt="Study Plan" className="w-16 h-16"/>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                            Organize sua rotina para manter constância nos estudos
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                            Te ajudo a avaliar como você usa seu tempo fora os estudos. Não tem receita milagrosa, mas compartilho o que funcionou nos últimos anos, de forma realista
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md mx-4">
                                <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardImage src="/beneficios-mentoria-4.png" alt="Study Plan" className="w-16 h-16"/>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                            Entenda como se preparar para prova prática e currículo
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                            Para chegar na lista final dos aprovados, dependendo da instituição, a prova prática e currículo faz muita diferença. Preparação aqui é um diferencial.
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </SectionContainer>
                </MotionBTTContainer>

                {/* CTA Section - Two Options */}
                <SectionContainer className="feature-tabs py-12 px-4 mt-12 scroll-mt-14" id="cta-mentoria">
                    <div className="text-center mx-auto my-8 max-w-4xl">
                        <PageTitle
                            className="text-center mx-auto mb-4"
                            type="default"
                        >
                            Escolha a melhor opção para você
                        </PageTitle>
                        <p className="text-gray-600 text-lg mb-12">
                            Seja através do programa completo ou de sessões individuais, estou aqui para te ajudar
                        </p>
                    </div>

                    <Content className="text-center mt-10" alignment="center">
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Primary Option - 2026 Program */}
                            <Card className="bg-gradient-to-br from-[#9FD8CB] to-[#7BC5B5] rounded-xl shadow-2xl overflow-hidden relative">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        RECOMENDADO
                                    </span>
                                </div>
                                <CardBody className="space-y-6 p-8 text-white">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">Programa Completo 2026</h3>
                                        <p className="text-white/90 mb-6">
                                            Acompanhamento contínuo durante toda sua preparação
                                        </p>
                                    </div>
                                    <ul className="space-y-3 text-left">
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-xl flex-shrink-0 mt-1" />
                                            <span>Encontros mensais individuais</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-xl flex-shrink-0 mt-1" />
                                            <span>Grupo de estudos exclusivo</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-xl flex-shrink-0 mt-1" />
                                            <span>Plano de estudos personalizado</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-xl flex-shrink-0 mt-1" />
                                            <span>Suporte via WhatsApp</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-xl flex-shrink-0 mt-1" />
                                            <span>Material exclusivo e simulados</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-xl flex-shrink-0 mt-1" />
                                            <span>Preparação para prova prática</span>
                                        </li>
                                    </ul>
                                    <Button
                                        className="mt-8 bg-secondary-500 hover:bg-[#2D3319] text-white w-full text-lg py-4 shadow-lg"
                                        variant="primary"
                                        href="https://queroserdermato.com.br"
                                        target="_blank"
                                    >
                                        Conhecer o Programa
                                    </Button>
                                </CardBody>
                            </Card>

                            {/* Secondary Option - One-off Mentorship */}
                            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
                                <CardBody className="space-y-6 p-8">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-zinc-800 mb-2">Mentoria Avulsa</h3>
                                        <p className="text-gray-600 mb-4">
                                            Sessão individual para tirar dúvidas específicas
                                        </p>
                                        <div className="mb-4">
                                            <p className="text-lg font-bold line-through text-gray-400">De R$499</p>
                                            <div className="text-4xl font-bold text-zinc-800">
                                                R$ 399,90
                                            </div>
                                            <div className="inline-block bg-gray-800 text-white text-sm font-semibold px-3 py-1 my-2 rounded-full">
                                                Sessão online
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 text-gray-700 text-left">
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-[#9FD8CB] text-xl flex-shrink-0 mt-1" />
                                            <span>Encontro de até 1h30 via Google Meet</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-[#9FD8CB] text-xl flex-shrink-0 mt-1" />
                                            <span>Avaliação personalizada do seu momento</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-[#9FD8CB] text-xl flex-shrink-0 mt-1" />
                                            <span>Direcionamento para estudos</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-[#9FD8CB] text-xl flex-shrink-0 mt-1" />
                                            <span>Orientação sobre o que e como estudar</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaCheck className="text-[#9FD8CB] text-xl flex-shrink-0 mt-1" />
                                            <span>Definição de metas e próximos passos</span>
                                        </li>
                                    </ul>
                                    <Button
                                        className="mt-8 bg-zinc-800 hover:bg-zinc-700 text-white w-full text-lg py-4"
                                        variant="primary"
                                        href="https://pay.hotmart.com/V91028431Y?checkoutMode=10&bid=1756811102458"
                                        target="_blank"
                                    >
                                        Agendar Sessão
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Content>
                </SectionContainer>
            </div>
        </Layout>
    );
}
