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
import {
    CardBody,
    CardGroup,
    CardHeader,
    CardImage,
    Card
} from "@components/Card";

export default function Home() {
    return (
        <Layout className="">
            <SEO
                title="Dra Lorraine | R1 em Dermato"
                description="Se prepare para residência médica com quem teve resultado nas provas mais concorridas do país"
            />
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-24 ">
                {/* { Page Banner } */}
                <HomeBanner />
                {/* Components Container */}
                <SectionContainer className="components--container wrap wrap-px grid gap-8 sm:gap-24">
                    {/* Features */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="personal-history" className="features">
                            <PageTitle
                                className="text-center mx-auto my-12"
                                type="default"
                            >
                                De onde eu venho?
                            </PageTitle>
                            <div className="container mx-auto my-5">
                                <div className="flex flex-col items-center justify-center gap-8">
                                    <div class="max-w-4xl bg-white overflow-hidden rounded shadow-lg">
                                        <div class="px-6 py-4">
                                            <div className="w-full mb-6 mt-2">
                                                <Image src="/history-map-lolo.png" alt="Page Banner" className="w-full h-full object-cover shadow-sm"/>
                                            </div>
                                            <h2 class="font-bold text-xl my-4 text-center text-zinc-900">Da ZL para 1º lugar em Dermato na UNICAMP ♥️</h2>
                                            <p class="text-gray-700 text-lg leading-8 font-thin">
                                                Sou paulistana diretamente da Zona Leste, porém foi em São José dos Campos onde iniciei minha jornada rumo à medicina. Lá fiz ensino técnico em Análises Clínicas e iniciei um cursinho pré-vestibular no CASD Vestibulares, um cursinho popular.
                                                <br/><br/>
                                                Após 3 anos de preparação, fui aprovada na UNICAMP, lugar que foi uma verdadeira casa para mim e onde vivi momentos inesquecíveis!
                                                Durante a graduação me apaixonei pela área de dermatologia e desde então sonho com uma vaga em uma instituição de excelência nessa especialidade...
                                                <br/><br/>
                                                Após colar grau em janeiro de 2021, separei esse ano para trabalhar e nos anos de 2022-2023 me dediquei principalmente à preparação para as provas de residência médica, tendo que conciliar com todas as outras atividades (trabalho, atividade física, saúde mental)
                                                <br/><br/>
                                                No primeiro ano de provas, após muitos &quot;nãos&quot;, conquistei uma aprovação em dermatologia pelo SUS-SP, porém resolvi persistir no meu sonho e prestar mais um ano de provas. Não foi uma decisão fácil, mas hoje vejo que tudo tem um propósito
                                                <br/><br/>
                                                Graças a muita dedicação e apoio da família e amigos, cheguei a lugares que jamais imaginei e sou muito grata a todos momentos dessa trajetória cheia de altos e baixos ❣️
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionContainer>
                    </MotionBTTContainer>
                    {/* Card Container Tabs */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs" id="results">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Aprovações</BadgeMessage>
                                {/* <BadgeIcon icon="twemoji:waving-hand" /> */}
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Meus resultados em <span className="underline">2023</span>
                            </PageTitle>
                            <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-24 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <Image src="/unicamp.png" alt="UNICAMP" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div>
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        1º lugar em Dermato na <span className="text-[#D0B49B]">UNICAMP</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para UNICAMP
                                        </p>
                                    </div>
                                </CardBody>
                                </Card>
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <Image src="/usp-rp.png" alt="USP-RP" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div>
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        2º lugar em Dermato na <span className="text-[#D0B49B]">USP Ribeirão Preto</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para USP Ribeirão Preto
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <Image src="/puc.png" alt="PUC" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div>
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        1º lugar em Dermato na <span className="text-[#D0B49B]">PUC Campinas</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para PUC de Campinas
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <Image src="/puc.png" alt="PUC" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div className="flex flex-col justify-start items-start">
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        3º lugar em Dermato na <span className="text-[#D0B49B]">USP São Paulo</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para USP São Paulo
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
                        <SectionContainer className="feature-tabs" id="solutions">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Soluções</BadgeMessage>
                                {/* <BadgeIcon icon="twemoji:waving-hand" /> */}
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Como posso te ajudar a chegar lá também?
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>
                                    Encurte seu caminho para a aprovação através de uma mentoria 
                                    guiada comigo ou através da ferramenta que eu usei para organizar
                                    todos os meus estudos ao longo dos últimos anos.{" "}
                                </p>
                            </Content>
                            <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-24 md:grid-cols-2">
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                        Mentoria individual comigo
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Entendo o seu contexto de vida, histórico, preferências e objetivos e te ajudo a traçar uma melhor estratégia de estudos e a tomar melhores decisões na sua preparação. Encurte seu caminho para aprovação de forma personalizada
                                        </p>
                                        <Button
                                            href="/mentoria"
                                        >Quero saber mais</Button>
                                    </div>
                                </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                                    <div>
                                        <CardHeader className="text-lg font-bold text-zinc-800">
                                        Template de estudos no Notion
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Em 2023 dispensei todos os meus cadernos físicos por um caderno digital no Notion. Todas as minhas anotações das grandes áreas ficaram bem mais organizadas e toda vez que eu errava uma questão em prova, era muito mais fácil de revisar. 
                                        </p>
                                        <Button>Quero saber mais</Button>
                                    </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>
                    {/* Accordions */}
                    {/* <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="faq" className="faq">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>FAQ</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Got some burning questions about NutriTrack?{" "}
                                <br></br>
                                <br></br>No worries! We&apos;ve got the answers
                                you need:
                            </PageTitle>
                            <Accordion />
                        </SectionContainer>
                    </MotionBTTContainer> */}
                </SectionContainer>
            </div>
        </Layout>
    );
}
