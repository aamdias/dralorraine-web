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
                <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <SectionContainer className="feature-tabs max-w-4xl mx-auto px-4">
                        <BadgeGroup alignment="center" className="mb-6">
                            <BadgeMessage>Mentoria Individual</BadgeMessage>
                        </BadgeGroup>
                        <PageTitle
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center max-w-4xl mx-auto"
                            type="default"
                        >
                            <div className="mx-auto text-center">
                                Mentoria para a <span className="underline decoration-[#9FD8CB]">Residência Médica</span>
                            </div>
                        </PageTitle>

                        {/* 2026 Program Banner */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-16 border-l-4 border-[#9FD8CB]">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                        <BadgeMessage className="bg-secondary-500 text-white font-semibold">
                                            Turma 2026
                                        </BadgeMessage>
                                        <span className="text-sm font-medium text-gray-600">Inscrições Abertas</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-zinc-800 mb-2">
                                        Mentoria Quero Ser Dermato 2026
                                    </h2>
                                    <p className="text-gray-600">
                                        Acompanhamento contínuo durante toda sua preparação para residência
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Button
                                        className="bg-secondary-500 hover:bg-[#2D3319] text-white px-8 py-3"
                                        variant="primary"
                                        href="https://queroserdermato.com.br"
                                        target="_blank"
                                    >
                                        Conhecer
                                    </Button>
                                </div>
                            </div>
                        </div>

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

                            {/* Success Highlights */}
                            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#9FD8CB]">
                                <CardBody className="p-8 h-full flex flex-col justify-center">
                                    <div className="text-center space-y-6">
                                        <div className="mb-4">
                                            <div className="text-[#9FD8CB] text-4xl font-bold mb-2">Aprovações em</div>
                                            <div className="text-2xl font-semibold text-zinc-800">Instituições de Excelência</div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-center gap-3 p-3 bg-[#F3F5F8] rounded-lg">
                                                <FaGraduationCap className="text-2xl text-[#9FD8CB]" />
                                                <span className="font-semibold text-zinc-800">UNICAMP</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-3 p-3 bg-[#F3F5F8] rounded-lg">
                                                <FaGraduationCap className="text-2xl text-[#9FD8CB]" />
                                                <span className="font-semibold text-zinc-800">USP Ribeirão Preto</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-3 p-3 bg-[#F3F5F8] rounded-lg">
                                                <FaGraduationCap className="text-2xl text-[#9FD8CB]" />
                                                <span className="font-semibold text-zinc-800">Instituto Azulay</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-6">
                                            Mentorados aprovados em Dermatologia e Clínica Médica nas melhores residências do país
                                        </p>
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
                    <BadgeGroup alignment="center" className="mb-6">
                        <BadgeMessage>Comece Agora</BadgeMessage>
                    </BadgeGroup>
                    <PageTitle
                        className="text-center mx-auto mb-4"
                        type="default"
                    >
                        Escolha a melhor opção para você
                    </PageTitle>
                    <Content className="text-center max-w-3xl mx-auto mb-12" alignment="center">
                        <p className="text-gray-600 text-lg">
                            Seja através do programa completo ou de sessões individuais, estou aqui para te ajudar
                        </p>
                    </Content>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {/* Primary Option - 2026 Program */}
                        <Card className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#9FD8CB]">
                            <CardBody className="p-6 md:p-8 flex flex-col h-full">
                                <div className="text-center mb-6">
                                    <div className="inline-block bg-[#9FD8CB] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                        RECOMENDADO
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-800 mb-2">Mentoria QSD 2026</h3>
                                    <p className="text-gray-600 mb-4">
                                        Acompanhamento contínuo durante toda sua preparação
                                    </p>
                                </div>
                                <ul className="space-y-3 text-gray-700 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-[#9FD8CB] text-lg flex-shrink-0 mt-1" />
                                        <span>Encontros mensais individuais</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-[#9FD8CB] text-lg flex-shrink-0 mt-1" />
                                        <span>Grupo de estudos exclusivo</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-[#9FD8CB] text-lg flex-shrink-0 mt-1" />
                                        <span>Plano de estudos personalizado</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-[#9FD8CB] text-lg flex-shrink-0 mt-1" />
                                        <span>Suporte via WhatsApp</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-[#9FD8CB] text-lg flex-shrink-0 mt-1" />
                                        <span>Material exclusivo e simulados</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-[#9FD8CB] text-lg flex-shrink-0 mt-1" />
                                        <span>Preparação para prova prática</span>
                                    </li>
                                </ul>
                                <Button
                                    className="bg-secondary-500 hover:bg-[#2D3319] text-white w-full py-3 mt-8"
                                    variant="primary"
                                    href="https://queroserdermato.com.br"
                                    target="_blank"
                                >
                                    Conhecer o Programa
                                </Button>
                            </CardBody>
                        </Card>

                        {/* Secondary Option - One-off Mentorship */}
                        <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <CardBody className="p-6 md:p-8 flex flex-col h-full">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-zinc-800 mb-2">Mentoria Avulsa</h3>
                                    <p className="text-gray-600 mb-4">
                                        Sessão individual para tirar dúvidas específicas
                                    </p>
                                    <p className="text-base line-through text-gray-400">De R$499</p>
                                    <div className="text-4xl font-bold text-zinc-800">
                                        R$ 399,90
                                    </div>
                                    <div className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 my-2 rounded-full border border-gray-300">
                                        Sessão online
                                    </div>
                                </div>
                                <ul className="space-y-3 text-gray-700 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-gray-400 text-lg flex-shrink-0 mt-1" />
                                        <span>Encontro de até 1h30 via Google Meet</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-gray-400 text-lg flex-shrink-0 mt-1" />
                                        <span>Avaliação personalizada do seu momento</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-gray-400 text-lg flex-shrink-0 mt-1" />
                                        <span>Direcionamento para estudos</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-gray-400 text-lg flex-shrink-0 mt-1" />
                                        <span>Orientação sobre o que e como estudar</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheck className="text-gray-400 text-lg flex-shrink-0 mt-1" />
                                        <span>Definição de metas e próximos passos</span>
                                    </li>
                                </ul>
                                <Button
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white w-full py-3 mt-8"
                                    variant="primary"
                                    href="https://pay.hotmart.com/V91028431Y?checkoutMode=10&bid=1756811102458"
                                    target="_blank"
                                >
                                    Agendar Sessão
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </SectionContainer>
            </div>
        </Layout>
    );
}
