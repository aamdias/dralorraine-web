import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { HomeBanner } from "@components/Banner";
import { Columns } from "@components/Columns";
import { ContentImage } from "@components/ContentImage";
import { Content } from "@components/Content";
import { Accordion } from "@components/Accordion";
import { MotionBTTContainer } from "@components/Motion";
import { Button } from "@components/Button";
import SEO from "@components/SEO/SEO";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import {
    CardBody,
    CardGroup,
    CardHeader,
    CardImage,
    Card
} from "@components/Card";
import { Results } from "@components/Results";

export default function MentorshipPage() {
    return (
        <Layout className="">
            <SEO
                title="Mentoria para Residência Médica | Dra Lô R1 Dermato UNICAMP"
                description="Se prepare para residência médica através de uma mentoria personalizada"
            />
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-32 ">
                <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs">
                            <BadgeGroup alignment="center" className="mb-6">
                                <BadgeMessage>Mentoria Individual</BadgeMessage>
                                {/* <BadgeIcon icon="twemoji:waving-hand" /> */}
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto px-4 mb-4 text-5xl"
                                type="default"
                            >
                                Mentoria para a <span className="underline decoration-[#9FD8CB]">Residência Médica</span> com a Lô
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p className="mb-4 mx-4">
                                    Aumente suas chances de aprovação nas provas de residência mais concorridas do país se 
                                    preparando com quem entende de verdade o que é necessário {" "}
                                </p>
                                <Button 
                                className="mt-8" 
                                variant="secondary" 
                                href="#pre-solutions"
                                >Quero saber mais</Button>
                            </Content>
                            <PageTitle
                                className="text-center mx-auto my-16"
                                type="default"
                            >
                                Já passou por esses problemas?
                            </PageTitle>
                            <CardGroup className="grid gap-2 grid-cols-1 max-w-4xl mx-auto mt-16 md:grid-cols-3">
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
                                    <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardImage src="/study-illustration.png" alt="Study Plan" className="h-48 sm:aspect-square md:aspect-auto"/>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                        Planejamento de estudos
                                        </CardHeader>
                                        <p className="text-gray-600 text-base">
                                        Como escolher o que estudar e quando? E como manter constância?
                                        </p>
                                    </div>
                                </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
                                    <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardImage src="/routine-illustration.png" alt="Study Plan" className="h-48 sm:aspect-square md:aspect-auto"/>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                        Organização da rotina
                                        </CardHeader>
                                        <p className="text-gray-600 text-base">
                                        Como conciliar estudos para residência com trabalho?
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
                                    <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardImage src="/mental-health-illustration.png" alt="Study Plan" className="h-48 sm:aspect-square md:aspect-auto"/>
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
                                <div className="text-2xl text-zinc-600" id="pre-solutions">
                                    Vivi na prática esse problemas e agora quero retrubir! <br/> <span className="font-bold">Deixa eu me apresentar.</span> {" "}
                                </div>
                            </Content>
                        </SectionContainer>
                    </MotionBTTContainer>
                    <HomeBanner />
                {/* Components Container */}
                <Results /> 
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
                                    Encurte seu caminho para a aprovação através de uma mentoria guiada comigo {" "}
                                </p>
                            </Content>
                            <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-12 md:grid-cols-2">
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
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
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
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
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
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
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
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
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer
                            id="testimonials"
                            className="benefits max-w-4xl items-center justify-center mx-auto mt-24 px-8"
                        >
                            <BadgeGroup alignment="left mx-12">
                                <BadgeMessage>Testemunhos</BadgeMessage>
                                <BadgeIcon icon="twemoji:waving-hand" />
                            </BadgeGroup>
                            <PageTitle className="" type="default">
                                Confira o que as pessoas que já fizeram a mentoria para residênciacom a Lô falaram!
                            </PageTitle>
                            <Columns />
                        </SectionContainer>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    >
                    <SectionContainer className="feature-tabs py-12 px-4 mt-12" id="cta-mentoria">
                        <div className="text-center mx-auto my-8 max-w-xl">
                        <div
                            className="underline underline-offset-2 decoration-[#9FD8CB] text-4xl font-bold text-zinc-800 pb-4 "
                        >
                            Partiu residência?
                        </div>
                        <p className="mt-4 text-lg text-zinc-700">
                            Aproveite a condição especial de lançamento e os assentos limitados
                        </p>
                        </div>

                        <Content className="text-center mt-10" alignment="center">
                            <Card className="mx-auto max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
                                <CardBody className="space-y-6 p-8">
                                    <div>
                                        <p className="text-lg font-bold line-through text-gray-400">De R$299</p>
                                        <div className="text-4xl font-bold text-zinc-800">
                                            R$ 249,90
                                        </div>
                                        <div className="inline-block bg-gray-800 text-white text-sm font-semibold px-3 py-1 my-2 rounded-full border border-gray-900">Mentoria online</div>
                                        
                                    </div>
                                <ul className="list-disc list-inside text-gray-600 text-base space-y-2 text-start list-none">
                                <p className="text-lg font-bold text-gray-600 my-2">Ganhe acesso exclusivo a</p>
                                <li className="flex items-center gap-2">
                                    <span className="flex-shrink-0"><FaCheck /></span>
                                    Encontro de até 1h30 via Google Meet
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="flex-shrink-0"><FaCheck /></span>
                                    Avaliação personalizada do seu momento
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="flex-shrink-0"><FaCheck /></span>
                                    Direcionamento personalizado para estudos
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="flex-shrink-0"><FaCheck /></span>
                                    Faça uma melhor decisão de o que e como estudar
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="flex-shrink-0"><FaCheck /></span>
                                    Faça uma melhor decisão de para que estudar
                                </li>
                                </ul>
                                    <Button 
                                    className="mt-12 bg-black text-white" 
                                    variant="secondary"
                                    href="https://tally.so/r/mZaprA"
                                    >
                                    Quero minha mentoria
                                    </Button>
                                </CardBody>
                            </Card>
                        </Content>
                    </SectionContainer>
                    </MotionBTTContainer>
            </div>
        </Layout>
    );
}
