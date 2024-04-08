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
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-20 ">
                {/* { Page Banner } */}
                <HomeBanner />
                {/* Components Container */}
                <SectionContainer className="components--container wrap wrap-px grid gap-8 sm:gap-24">
                    {/* Features */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="features" className="features">
                            {/* <BadgeGroup alignment="center">
                                <BadgeMessage>Features</BadgeMessage>
                            </BadgeGroup> */}
                            <PageTitle
                                className="text-center mx-auto underline"
                                type="default"
                            >
                                De onde eu venho?
                            </PageTitle>
                            <div className="container mx-auto my-5">
                                <div className="flex flex-col items-center justify-center gap-8">
                                    <div class="max-w-4xl bg-white overflow-hidden rounded shadow-lg">
                                        <div class="px-6 py-4">
                                            <div className="w-full mb-6 mt-2">
                                                <img src="/history-map-lolo.png" alt="Page Banner" className="w-full h-full object-cover shadow-sm"/>
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
                                                No primeiro ano de provas, após muitos "nãos", conquistei uma aprovação em dermatologia pelo SUS-SP, porém resolvi persistir no meu sonho e prestar mais um ano de provas. Não foi uma decisão fácil, mas hoje vejo que tudo tem um propósito
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
                        <SectionContainer className="feature-tabs">
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
                            <CardGroup className="grid scroll-m-24 gap-6 grid-cols-1 max-w-4xl mx-auto mt-24 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="col-span-2 text-primary-900 shadow-lg rounded-lg">
                                    <CardBody className="w-full bg-white rounded-lg shadow-md p-8">
                                        <CardImage src="/unicamp.png" alt="UNICAMP" />
                                        <CardHeader className="!text-black !text-xl !font-bold mt-4 mb-2">
                                            1º lugar em Dermato na <span className="text-[#D0B49F]">UNICAMP</span>
                                        </CardHeader>
                                        <p className="text-md">
                                            Aprovada em primeira chamada na prova de Dermatologia para UNICAMP
                                        </p>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 text-primary-900 shadow-lg rounded-lg">
                                    <CardBody className="w-full bg-white rounded-lg shadow-md p-8">
                                        <CardImage src="/usp-rp.png" alt="USP-RP" />
                                        <CardHeader className="!text-black !text-xl !font-bold mt-4 mb-2">
                                            2º lugar em Dermato na <span className="text-[#D0B49F]">USP Ribeirão Preto</span>
                                        </CardHeader>
                                        <p className="text-md">
                                            Aprovada em primeira chamada na prova de Dermatologia para USP Ribeirão Preto
                                        </p>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 text-primary-900 shadow-lg rounded-lg">
                                    <CardBody className="w-full bg-white rounded-lg shadow-md p-8">
                                        <CardImage src="/puc.png" alt="PUC" />
                                        <CardHeader className="!text-black !text-xl !font-bold mt-4 mb-2">
                                            1º lugar em Dermato na <span className="text-[#D0B49F]">PUC Campinas</span>
                                        </CardHeader>
                                        <p className="text-md">
                                            Aprovada em primeira chamada na prova de Dermatologia para PUC de Campinas
                                        </p>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-2 text-primary-900 shadow-lg rounded-lg">
                                    <CardBody className="w-full bg-white rounded-lg shadow-md p-8">
                                        <CardImage src="/usp-sp.png" alt="USP São Paulo" />
                                        <CardHeader className="!text-black !text-xl !font-bold mt-4 mb-2">
                                            3º lugar em Dermato na <span className="text-[#D0B49F]">USP São Paulo</span>
                                        </CardHeader>
                                        <p className="text-md">
                                            Aprovada em primeira chamada na prova de Dermatologia para USP São Paulo
                                        </p>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>
                    {/* Testimonials */}
                    {/* <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer
                            id="testimonials"
                            className="benefits"
                        >
                            <BadgeGroup alignment="left">
                                <BadgeMessage>Testimonials</BadgeMessage>
                                <BadgeIcon icon="twemoji:waving-hand" />
                            </BadgeGroup>
                            <PageTitle className="" type="default">
                                This is what our customers have to say about
                                this template
                            </PageTitle>
                            <Columns />
                        </SectionContainer>
                    </MotionBTTContainer> */}
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
