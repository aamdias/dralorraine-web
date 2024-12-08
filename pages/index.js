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
import { Icon } from "@iconify/react";
import {
    CardBody,
    CardGroup,
    CardHeader,
    CardImage,
    Card
} from "@components/Card";
import { Results }  from "@components/Results";

export default function Home() {
    return (
        <Layout className="">
            <SEO
                title="Dra Lorraine | R1 em Dermato"
                description="Se prepare para residência médica com quem teve resultado nas provas mais concorridas do país"
            />
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-32 ">
                {/* { Page Banner } */}
                <HomeBanner />
                {/* Components Container */}
                <SectionContainer className="components--container wrap wrap-px grid gap-8 sm:gap-24">
                    {/* Features */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="personal-history" className="features scroll-mt-32">
                            <PageTitle
                                className="text-center mx-auto my-12"
                                type="default"
                            >
                                De onde eu venho?
                            </PageTitle>
                            <div className="container mx-auto my-5">
                                <div className="flex flex-col items-center justify-center gap-8">
                                    <div className="max-w-4xl bg-white overflow-hidden rounded shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="w-full mb-6 mt-2">
                                                <Image 
                                                src="/history-map-lolo.png" 
                                                alt="Page Banner" 
                                                width={680}
                                                height={1024}
                                                className="w-full h-full object-cover shadow-sm"/>
                                            </div>
                                            <h2 className="font-bold text-xl my-4 text-center text-zinc-900">Da ZL para 1º lugar em Dermato na UNICAMP ♥️</h2>
                                            <p className="text-gray-700 text-lg leading-8 font-thin">
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
                </SectionContainer>
                <Results />
                <SectionContainer className="pt-16 px-6">
                    {/* Features */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs scroll-mt-32" id="solutions">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Soluções</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto max-w-3xl mb-8"
                                type="default"
                            >
                                Como posso te ajudar a chegar lá também?
                            </PageTitle>
                            <Content className="text-center max-w-2xl mx-auto" alignment="center">
                                <p className="text-lg text-gray-600">
                                    Encurte seu caminho para a aprovação através de uma mentoria 
                                    guiada comigo ou através da ferramenta que eu usei para organizar
                                    todos os meus estudos ao longo dos últimos anos.{" "}
                                </p>
                            </Content>
                            <CardGroup className="grid gap-8 grid-cols-1 max-w-5xl mx-auto mt-16 md:grid-cols-2">
                                <Card className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardBody className="flex flex-col items-start p-8">
                                        <div className="w-14 h-14 rounded-2xl bg-[#9FD8CB]/10 flex items-center justify-center mb-6">
                                            <Icon 
                                                icon="ph:chats-circle-fill" 
                                                className="w-7 h-7 text-[#9FD8CB]"
                                            />
                                        </div>
                                        <div className="text-2xl font-bold text-zinc-800 mb-4">
                                            Mentoria individual comigo
                                        </div>
                                        <p className="text-gray-600 text-lg mb-8">
                                            Entendo o seu contexto de vida, histórico, preferências e objetivos e te ajudo a traçar uma melhor estratégia de estudos e a tomar melhores decisões na sua preparação. Encurte seu caminho para aprovação de forma personalizada.
                                        </p>
                                        <Button
                                            href="/mentoria"
                                            variant="secondary"
                                            className="mt-auto w-full justify-center bg-[#9FD8CB] hover:bg-[#8EC8BB] text-white font-medium py-3"
                                        >Quero saber mais</Button>
                                    </CardBody>
                                </Card>
                                
                                <Card className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardBody className="flex flex-col items-start p-8">
                                        <div className="w-14 h-14 rounded-2xl bg-[#9FD8CB]/10 flex items-center justify-center mb-6">
                                            <Icon 
                                                icon="ph:books-fill" 
                                                className="w-7 h-7 text-[#9FD8CB]"
                                            />
                                        </div>
                                        <div className="text-2xl font-bold text-zinc-800 mb-4">
                                            Minhas Anotações Originais
                                        </div>
                                        <p className="text-gray-600 text-lg mb-8">
                                            Acesse minhas anotações originais que me ajudaram a conquistar a aprovação. Material organizado, objetivo e focado nos pontos mais relevantes para as provas de residência médica.
                                        </p>
                                        <Button 
                                            href="/anotacoes"
                                            variant="secondary"
                                            className="mt-auto w-full justify-center bg-[#9FD8CB] hover:bg-[#8EC8BB] text-white font-medium py-3"
                                        >Quero saber mais</Button>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardBody className="flex flex-col items-start p-8">
                                        <div className="w-14 h-14 rounded-2xl bg-[#9FD8CB]/10 flex items-center justify-center mb-6">
                                            <Icon 
                                                icon="ph:notebook-fill" 
                                                className="w-7 h-7 text-[#9FD8CB]"
                                            />
                                        </div>
                                        <div className="text-2xl font-bold text-zinc-800 mb-4">
                                            Template de estudos no Notion
                                        </div>
                                        <p className="text-gray-600 text-lg mb-8">
                                            Em 2023 dispensei todos os meus cadernos físicos por um caderno digital no Notion. Todas as minhas anotações das grandes áreas ficaram bem mais organizadas e toda vez que eu errava uma questão em prova, era muito mais fácil de revisar.
                                        </p>
                                        <Button 
                                            href="/notion"
                                            variant="secondary"
                                            className="mt-auto w-full justify-center bg-[#9FD8CB] hover:bg-[#8EC8BB] text-white font-medium py-3"
                                        >Quero saber mais</Button>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardBody className="flex flex-col items-start p-8">
                                        <div className="w-14 h-14 rounded-2xl bg-[#9FD8CB]/10 flex items-center justify-center mb-6">
                                            <Icon 
                                                icon="ph:file-text-fill" 
                                                className="w-7 h-7 text-[#9FD8CB]"
                                            />
                                        </div>
                                        <div className="text-2xl font-bold text-zinc-800 mb-4">
                                            Currículo Profissional
                                        </div>
                                        <p className="text-gray-600 text-lg mb-8">
                                            Destaque sua trajetória com um currículo estrategicamente elaborado para residência médica. Design moderno e profissional que valoriza suas conquistas e experiências.
                                        </p>
                                        <Button 
                                            href="/curriculo"
                                            variant="secondary"
                                            className="mt-auto w-full justify-center bg-[#9FD8CB] hover:bg-[#8EC8BB] text-white font-medium py-3"
                                        >Quero saber mais</Button>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>
                    
                </SectionContainer>
            </div>
        </Layout>
    );
}
