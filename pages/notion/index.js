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

export default function NotionPage() {
    return (
<>
        <Layout className="">
            <SEO
                title="Notion para Residência Médica | Dra Lô R1 Dermato UNICAMP"
                description="Se prepare para residência médica através dos cadernos digitais da Dra Lô"
            />
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pt-28 ">  
            <SectionContainer className=" flex items-center justify-center bg-gradient-to-b from-[#F3F5F8] to-white mt-6"> 
                <SectionContainer className=" wrap wrap-px z-10">
                    <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                        <BadgeGroup alignment="center" className="mb-2">
                            <BadgeMessage>Notion</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>

                    {/* Appear Second */}
                    <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row items-center justify-between px-2 ">
                        <div className="flex flex-col space-y-6 md:w-1/2">
                            <h1 className="text-4xl md:text-5xl text-center md:text-start font-bold text-slate-800 mb-2 pt-4">
                                Meu <span className="underline decoration-[#9FD8CB]">caderno digital</span> que me levou a aprovação na residência
                            </h1>
                            <p className="text-xl md:max-w-[264px] lg:max-w-[440px] text-center md:text-start font-sans text-slate-600">
                                A mesma ferramenta que usei diariamente para conquistar todas as minhas aprovações e meus resumos originais podem ser seus também.
                            </p>
                            <div className="flex w-full justify-center md:justify-start pb-12">
                                <Button href="#notion-cta" variant="secondary">Quero agora</Button>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
                        <Image
                            src="/nova-thumb-notion.png"
                            width={680}
                            height={1024}
                            alt="Dra. Lorraine"
                            className="max-w-xs md:max-w-md rounded-lg h-full"
                        />
                        </div>
                    </div>
                    </MotionBTTContainer>
                    </SectionContainer>
                    
            </SectionContainer>
            
            <SectionContainer className="bg-[#F3F5F8]" id="solutions">
                
                <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
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
                        <CardGroup className="grid gap-2 grid-cols-1 max-w-4xl mx-auto mt-16 md:grid-cols-3">
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4 md:mx-2">
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
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4 md:mx-2">
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
                            <Card className="col-span-1 bg-white rounded-lg overflow-hidden shadow-md bg-white mx-4 md:mx-2">
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
                        <div className="text-center mt-12 px-16 pb-12" alignment="center">
                            <div className="text-base text-slate-700">
                                Acessível via <a href="https://notion.so" className="underline">Notion</a>, uma ferramenta de produtividade usada por milhões de pessoas e acessível no celular, tablet e computador. {" "}
                            </div>
                        </div>
                    </Content>
                </MotionBTTContainer>
            </SectionContainer>
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
                    <SectionContainer className="wrap wrap-px z-10 pt-16">
                    <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                        <BadgeGroup alignment="center">
                            <BadgeMessage>Exclusivo</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>
                    {/* Appear Second */}
                    <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row items-center justify-between px-2 pt-2 pb-16">
                        <div className="flex flex-col space-y-6 md:w-1/2 mb-14">
                            <h1 className="text-4xl md:text-5xl  font-bold text-slate-800 mb-2">
                                Acesso as anotações originais que me levaram a aprovação!
                            </h1>
                            <p className="text-lg md:max-w-[264px] lg:max-w-[440px] font-sans text-slate-600">
                                Na versão mais completa, ganhe acesso também a todas as +140 anotações originais que me levaram as aprovações no UNICAMP, USP-SP, USP-RP e PUC Campinas
                            </p>
                            <div className="border p-4 rounded-lg">
                                <h2 className="text-lg font-bold md:max-w-[264px] lg:max-w-[440px] font-sans text-slate-800 leading-4 mb-2">
                                Anotações gratuitas
                                </h2>
                                <p className="text-base md:max-w-[264px] lg:max-w-[440px] font-sans text-slate-600 my-4">
                                Conheça uma amostra dos resumos que eu fiz! Dos 140, escolhi 15 resumos entre Clínica Médica, Cirurgia, Pediatria, GO e Preventiva para compartilhar de forma gratuita!
                                </p>
                                <Button
                                    type="link"
                                    variant="outline"
                                    href="#tally-open=m62MOY&tally-emoji-text=👋&tally-emoji-animation=wave"
                                    >
                                    Ver anotações gratuitas
                                </Button>      
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
                        <Image
                            src="/anotacoes-originais-notion-lo.png"
                            width={680}
                            height={1024}
                            alt="Dra. Lorraine"
                            className="max-w-xs md:max-w-md rounded-lg"
                        />
                        </div>
                    </div>
                    </MotionBTTContainer>
                    </SectionContainer>
                    <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    >
                    <SectionContainer id="notion-cta" className="feature-tabs bg-zinc-900 py-12 px-4 ">
                        <div className="text-center mx-auto my-8 max-w-xl">
                        <PageTitle
                            className="text-4xl font-bold text-slate-200"
                            type="default"
                        >
                            Garanta já o seu!
                        </PageTitle>
                        <p className="mt-4 text-lg text-zinc-300">
                            Aproveite as condições especiais de lançamento e organize de uma os seus estudos para residência médica com o Notion da Lô
                        </p>
                        </div>


                        <Content className="text-center mt-10" alignment="center">
                            <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-12 md:grid-cols-2">
                                <Card className="mx-auto max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
                                    <CardBody className="space-y-6 p-8">
                                        <div>
                                            <p className="text-lg font-bold line-through text-gray-400">De R$199</p>
                                            <div className="text-4xl font-bold text-zinc-800">
                                                R$ 149,90
                                            </div>
                                            <div className="inline-block bg-gray-800 text-white text-sm font-semibold px-3 py-1 my-2 rounded-full border border-gray-900">Versão Completa</div>
                                            
                                        </div>
                                    <ul className="list-disc list-inside text-gray-600 text-base space-y-2 text-start list-none">
                                    <p className="text-lg font-bold text-gray-600 my-2">Ganhe acesso vitalício a</p>
                                    <li className="flex items-center gap-2">
                                        <span className="flex-shrink-0"><FaCheck /></span>
                                        Notion da Lô, template de estudos para residência médica para preencher com suas anotações
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="flex-shrink-0"><FaCheck /></span>
                                        Todas as +140 anotações originais da Lô usadas na sua preparação para as provas de residência
                                    </li>
                                    </ul>
                                        <Button 
                                        className="mt-12 bg-black text-white" 
                                        variant="secondary"
                                        href="https://pay.hotmart.com/X90902784L"
                                        >
                                        Quero meu Notion
                                        </Button>
                                    </CardBody>
                                </Card>
                                <Card className="mx-auto max-w-md bg-zinc-800 rounded-lg overflow-hidden shadow-lg">
                                    <CardBody className="space-y-6 p-8">
                                    <div>
                                        <p className="text-lg font-bold line-through text-gray-400">De R$99</p>
                                        <div className="text-4xl font-bold text-zinc-200">
                                            R$ 49,90
                                        </div>
                                        <div className="inline-block bg-gray-400 text-white text-sm font-semibold px-3 py-1 my-2 rounded-full border border-gray-400">Somente o template</div>
                                    </div>
                                    <ul className="list-disc list-inside text-gray-400 text-base space-y-2 text-start list-none">
                                    <p className="text-lg font-bold text-gray-600 my-2">Ganhe acesso vitalício a</p>
                                    <li className="flex items-center gap-2">
                                        <span className="flex-shrink-0"><FaCheck /></span>
                                        Notion da Lô, template de estudos para residência médica para preencher com suas anotações
                                    </li>
                                    <li className="flex items-center gap-2 invisible">
                                        <span className="flex-shrink-0"><FaCheck /></span>
                                        Todas as +140 anotações originais da Lô usadas na sua preparação para as provas de residência
                                    </li>
                                    </ul>
                                        <Button 
                                        className="mt-12" 
                                        variant="primary"
                                        href="https://pay.hotmart.com/C90888187B"
                                        >
                                        Quero meu Notion
                                        </Button>
                                    </CardBody>
                                </Card>    
                            </CardGroup>
                        </Content>
                    </SectionContainer>
                    </MotionBTTContainer>
                 </div>
        </Layout>
</>
    );
}
