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
            <SectionContainer className="page-banner--container flex items-center justify-center bg-gradient-to-b from-[#F3F5F8] to-white mt-6 pt-24">
                <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                    <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                        <BadgeGroup alignment="center">
                            <BadgeMessage>Notion</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>
                    {/* Appear Second */}
                    <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row items-center justify-between px-2 pt-2 ">
                        <div className="flex flex-col space-y-6 md:w-1/2 mb-14">
                            <h1 className="text-4xl md:text-5xl  font-bold text-slate-800 mb-2">
                                <RiNotionFill className="mb-4"/>
                                Meu companheiro de estudos que me levou a aprovação na residência
                            </h1>
                            <p className="text-lg md:max-w-[264px] lg:max-w-[440px] font-sans text-slate-600">
                                A mesma ferramenta que usei diariamente para conquistar todas as minhas aprovações e meus resumos originais podem ser seus também.
                            </p>
                        <Button href="#notion-cta" className="w-44" variant="secondary">Quero agora</Button>
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
                <SectionContainer className="feature-tabs bg-[#F3F5F8]" id="solutions">
                    <PageTitle
                        className="text-center mx-auto pt-8"
                        type="default"
                    >
                        Meu caderno digital
                    </PageTitle>
                        <Content className="text-center px-4" alignment="center">
                            <div className="text-xl text-slate-700">
                                Tudo pronto para você usar também! Dá uma olhada no que você irá encontrar nele.
                            </div>
                        </Content>
                    <CardGroup className="grid gap-2 grid-cols-1 max-w-4xl mx-auto mt-16 md:grid-cols-3">
                        <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
                            <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8 justify-items-start">
                            <div>
                                <div className="flex flex-row w-full justify-center">
                                    <CardImage src="/notion-image-1.png" alt="Study Plan" className="h-48 sm:aspect-square md:aspect-auto"/>
                                </div>
                                <CardHeader className="text-lg font-bold text-zinc-800">
                                Anotações organizadas por grande área
                                </CardHeader>
                                <p className="text-gray-600 text-base">
                                Em vez de comprar um caderno físico (ou várias rs) para cada grande área, no Notion TODAS as matérias de cada grande área ficaram bem organizadas e acessíveis.
                                </p>
                            </div>
                        </CardBody>
                        </Card>
                        <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
                            <CardBody className="flex flex-col md:flex-row items-center pt-4 pb-8 px-8 justify-items-start">
                            <div>
                                <div className="flex flex-row w-full justify-center">
                                    <CardImage src="/notion-image-2.png" alt="Study Plan" className="h-48 sm:aspect-square md:aspect-auto"/>      
                                </div>
                                <CardHeader className="text-lg font-bold text-zinc-800">
                                Acompanhamento e planejamento de estudos
                                </CardHeader>
                                <p className="text-gray-600 text-base">
                                Através dessa ferramenta, pude acompanhar a quantidade de acertos em cada tema e em cada  tem e em cada prova/simulado que fazia. Ficava mais fácil entender o que priorizar.
                                </p>
                            </div>
                            </CardBody>
                        </Card>
                        <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4">
                            <CardBody className="flex flex-col md:flex-row items-center pb-8 px-8 justify-items-start">
                            <div>
                                <div className="flex flex-row w-full justify-center">
                                    <CardImage src="/notion-image-3.png" alt="Study Plan" className="h-48 sm:aspect-square md:aspect-auto"/>
                                </div>
                                <CardHeader className="text-lg font-bold text-zinc-800">
                                Maior facilidade para revisão e dicas para questões
                                </CardHeader>
                                <p className="text-gray-600 text-base">
                                Com tudo organizado, vem a melhor parte. Para tirar a dúvida de uma questão, resgatar uma anotação era uma tarefa de segundos
                                </p>
                            </div>
                            </CardBody>
                        </Card>
                    </CardGroup>
                    <Content className="text-center mt-12 px-16 pb-12" alignment="center">
                        <div className="text-base text-slate-700">
                            Acessível via Notion, uma ferramenta de produtividade usada por milhões de pessoas e acessível no celular, tablet e computador. {" "}
                        </div>
                    </Content>
                </SectionContainer>
            </MotionBTTContainer>
            <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs bg-zinc-900 py-16" id="notion-features">
                            <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-12">
                                <Card className="col-span-1 bg-transparent mx-4">
                                    <CardBody className="flex flex-col items-center pt-4 pb-8 px-8">
                                        <div className="grid grid-rows-3 grid-cols-1 gap-8 items-start md:grid-cols-3 min-[360px]:grid-rows-1">
                                            <CardImage src="/notion-feature-image-1.png" alt="Study Plan" className="row-span-1 min-[360px]:col-span-2 aspect-video drop-shadow-[0_4px_6px_rgba(214,229,227,0.5)]"/>
                                            <div className="flex flex-col row-span-2 md:col-span-1">
                                                <CardHeader className="text-lg font-bold text-slate-100">
                                                Melhor que cadernos físicos
                                                </CardHeader>
                                                <p className="text-slate-200 text-base">
                                                Com o Notion, você organiza todas as anotações nas grandes áreas da medicina e acompanha de forma simples o nível de confiança e o porcentual de acertos, facilitando a identificação de onde focar seus estudos
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-transparent mx-4">
                                    <CardBody className="flex flex-col items-center pt-4 pb-8 px-8">
                                        <div className="grid grid-rows-3 grid-cols-1 gap-8 items-start md:grid-cols-3 min-[360px]:grid-rows-1">
                                            <div className="flex flex-col row-span-2 order-2 md:order-1 md:col-span-1">
                                                <CardHeader className="text-lg font-bold text-slate-100">
                                                Acesso rápido ao que importa
                                                </CardHeader>
                                                <p className="text-slate-200 text-base">
                                                No Notion você poderá acessar rapidamente os últimos temas estudados e poderá definir temas para focar ao longo de sua preparação, te ajudando a gastar seu tempo no que é mais relevante para a sua preparação
                                                </p>
                                            </div>
                                            <CardImage src="/notion-feature-image-2.png" alt="Study Plan" className="row-span-1 order-1 md:order-2 min-[360px]:col-span-2 aspect-video drop-shadow-[0_4px_6px_rgba(214,229,227,0.5)]"/>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-transparent mx-4">
                                    <CardBody className="flex flex-col items-center pt-4 pb-8 px-8">
                                        <div className="grid grid-rows-3 grid-cols-1 gap-8 items-start md:grid-cols-3 min-[360px]:grid-rows-1">
                                            <CardImage src="/notion-feature-image-3.png" alt="Study Plan" className="row-span-1 min-[360px]:col-span-2 aspect-video drop-shadow-[0_4px_6px_rgba(214,229,227,0.5)]"/>
                                            <div className="flex flex-col row-span-2 md:col-span-1">
                                                <CardHeader className="text-lg font-bold text-slate-100">
                                                Revisões programadas e planejamento semanal
                                                </CardHeader>
                                                <p className="text-slate-200 text-base">
                                                Organize quando estudar o quê. Planeje seus estudos e programe revisões de matérias com maior dificuldade de forma automática
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 bg-transparent mx-4">
                                    <CardBody className="flex flex-col items-center pt-4 pb-8 px-8">
                                        <div className="grid grid-rows-3 grid-cols-1 gap-8 items-start md:grid-cols-3 min-[360px]:grid-rows-1">
                                            <div className="flex flex-col order-2 md:order-1 row-span-2 md:col-span-1">
                                                <CardHeader className="text-lg font-bold text-slate-100">
                                                Editor completo para suas anotações
                                                </CardHeader>
                                                <p className="text-slate-200 text-base">
                                                No Notion, cada anotação fica em uma página própria que tem acesso a inúmeros recursos de formatação como diferentes tamanhos de texto, imagens, vídeos, tabelas... Assim as anotações ficam bem ricas e visuais!
                                                </p>
                                            </div>
                                            <CardImage src="/notion-feature-image-4.png" alt="Study Plan" className="row-span-1 order-1 md:order-2 min-[360px]:col-span-2 min-h-80 drop-shadow-[0_4px_6px_rgba(214,229,227,0.5)]"/>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    >
                    <SectionContainer className="feature-tabs bg-gradient-to-b from-[#f3f5f8] to-white py-12 px-4 " id="cta-notion">
                        <div className="text-center mx-auto my-8 max-w-xl">
                        <PageTitle
                            className="text-4xl font-bold text-zinc-900"
                            type="default"
                        >
                            Garanta já o seu!
                        </PageTitle>
                        <p className="mt-4 text-lg text-zinc-700">
                            Aproveite as condições especiais de lançamento e organize de uma os seus estudos para residência médica com o Notion da Lô
                        </p>
                        </div>

                        <Content className="text-center mt-10" alignment="center">
                        <Card className="mx-auto max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
                            <CardBody className="space-y-4 p-8">
                            <div className="text-4xl font-bold text-zinc-800">
                                R$ 149,90 
                            </div>
                            <div>
                                Acesso vitalício a:
                            </div>
                            <ul className="list-disc list-inside text-gray-600 text-base space-y-2 text-start">
                                <li> Notion da Lô, template de estudos para residência médica para preencher com suas anotações</li>
                                <li> Todas as +140 anotações originais da Lô usadas na sua preparação para as provas de residência</li>
                            </ul>
                            </CardBody>
                        </Card>
                        <Button className="mt-8" variant="secondary" >
                            Quero meu Notion
                        </Button>
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
