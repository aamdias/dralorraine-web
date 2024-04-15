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
import { RiNotionFill } from "react-icons/ri";

export default function NotionPage() {
    return (
        <Layout>
            <SEO
                title="Notion para Residência Médica | Dra Lô R1 Dermato UNICAMP"
                description="Se prepare para residência médica através dos cadernos digitais da Dra Lô"
            />      
            <SectionContainer className="page-banner--container flex items-center justify-center bg-[#517664] mt-6 pt-24">
                <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                    <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                        <BadgeGroup alignment="center" className="bg-[#2D3319] text-slate-100">
                            <BadgeMessage>Notion</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>
                    {/* Appear Second */}
                    <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row items-center justify-between px-2 pt-2 ">
                        <div className="flex flex-col space-y-6 md:w-1/2 mb-14">
                            <h1 className="text-4xl md:text-5xl  font-bold text-slate-300 mb-2">
                                <RiNotionFill className="mb-4"/>
                                Meu companheiro de estudos que me levou a aprovação na residência
                            </h1>
                            <p className="text-lg md:max-w-[264px] lg:max-w-[440px] font-sans text-slate-400">
                                A mesma ferramenta que usei diariamente para conquistar todas as minhas aprovações e meus resumos originais podem ser seus também.
                            </p>
                        <Button href="#notion-cta" className="w-44">Quero agora</Button>
                        </div>
                        <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
                        <Image
                            src="/nova-thumb-notion.png"
                            width={680}
                            height={1024}
                            alt="Dra. Lorraine"
                            className="max-w-xs md:max-w-md rounded-lg"
                        />
                        </div>
                    </div>
                    </MotionBTTContainer>
                    </SectionContainer>
            </SectionContainer>

            <MotionBTTContainer
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <SectionContainer className="feature-tabs" id="solutions">
                    <PageTitle
                        className="text-center mx-auto mt-16"
                        type="default"
                    >
                        Meu caderno digital
                    </PageTitle>
                        <Content className="text-center px-4" alignment="center">
                            <div className="text-xl text-slate-700">
                                Tudo pronto para você usar também! Dá uma olhada no que você irá encontrar nele.
                            </div>
                        </Content>
                    <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-24 md:grid-cols-3">
                        <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white">
                            <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                            <div>
                                <CardImage src="/notion-image-1.png" alt="Study Plan" className="w-full h-48"/>
                                <CardHeader className="text-lg font-bold text-zinc-800">
                                Anotações organizadas por grande área
                                </CardHeader>
                                <p className="text-gray-600 text-base md:text-lg">
                                Em vez de comprar um caderno físico (ou várias rs) para cada grande área, no Notion TODAS as matérias de cada grande área ficaram bem organizadas e acessíveis.
                                </p>
                            </div>
                        </CardBody>
                        </Card>
                        <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white">
                            <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                            <div>
                                <CardImage src="/notion-image-2.png" alt="Study Plan" className="w-full h-48"/>
                                <CardHeader className="text-lg font-bold text-zinc-800">
                                Acompanhamento e planejamento de estudos
                                </CardHeader>
                                <p className="text-gray-600 text-base md:text-lg">
                                Através dessa ferramenta, pude acompanhar a quantidade de acertos em cada tema e em cada  tem e em cada prova/simulado que fazia. Ficava mais fácil entender o que priorizar.
                                </p>
                            </div>
                            </CardBody>
                        </Card>
                        <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white">
                            <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8">
                            <div>
                                <CardImage src="/notion-image-3.png" alt="Study Plan" className="w-full h-48"/>
                                <CardHeader className="text-lg font-bold text-zinc-800">
                                Maior facilidade para revisão e dicas para questões
                                </CardHeader>
                                <p className="text-gray-600 text-base md:text-lg">
                                Com tudo organizado, vem a melhor parte. Para tirar a dúvida de uma questão, resgatar uma anotação era uma tarefa de segundos
                                </p>
                            </div>
                            </CardBody>
                        </Card>
                    </CardGroup>
                    <Content className="text-center mt-12 px-16" alignment="center">
                        <div className="text-base text-slate-700">
                            Acessível via Notion, uma ferramenta de produtividade usada por milhões de pessoas e acessível no celular, tablet e computador. {" "}
                        </div>
                    </Content>
                </SectionContainer>
            </MotionBTTContainer>

                    
                    {/* Appear Third */}
                    {/* <MotionBTTContainer transition={{ delay: 0.6, duration: 0.5 }}>

                    </MotionBTTContainer> */}
                        {/* <div className="mt-6 mb-16 text-center">
                            <ButtonGroup alignment="center">
                                <Button href="#features">Features</Button>
                                <a
                                    role="button"
                                    href="https://github.com/christian-luntok/nutritrack"
                                    className="btn btn--secondary"
                                >
                                    Get Template
                                    <Icon icon="material-symbols:arrow-forward-rounded" />
                                </a>
                            </ButtonGroup>
                        </div> */}
                    {/* Appear Fourth */}
                    {/* <MotionBTTContainer transition={{ delay: 0.8, duration: 0.5 }}>
                        <div className="page-banner--image">
                            <Image
                                src="/lolo-portrait-home-page.png"
                                width={340}
                                height={512}
                                alt="Page Banner"
                                objectFit="cover"
                                className="mx-auto"
                            />
                        </div>
                    </MotionBTTContainer> */}
                
        </Layout>
    );
}
