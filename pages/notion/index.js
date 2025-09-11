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
import { WobbleCard } from "@components/WobbleCard";
import { useState, useEffect } from 'react';
import { GlareCard } from "@components/GlareCard";
import { VideoModal } from "@components/VideoModal";
import {
    trackFacebookInitiateCheckoutCombo
} from "@utils/facebookPixel";

export default function NotionPage() {

const [dimensionsFeatureReviews, setDimensionsFeatureReviews] = useState({ width: 500, height: 500 });
const [dimensionsFeatureEditor, setDimensionsFeatureEditor] = useState({ width: 420, height: 420 });
const [dimensionsFeatureAnnotations, setDimensionsFeatureAnnotations] = useState({ width: 600, height: 600 });
const [dimensionsFeatureFocus, setDimensionsFeatureFocus] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        setDimensionsFeatureReviews({ width: 500, height: 500 }); 
        setDimensionsFeatureEditor({ width: 420, height: 420 }); 
        setDimensionsFeatureAnnotations({ width: 600, height: 600 });
        setDimensionsFeatureFocus({ width: 600, height: 600 });
      } else if (screenWidth < 1350) {
        setDimensionsFeatureReviews({ width: 700, height: 700 }); 
        setDimensionsFeatureEditor({ width: 580, height: 580 }); 
        setDimensionsFeatureAnnotations({ width: 800, height: 800 });
        setDimensionsFeatureFocus({ width: 680, height: 680 });
      } else {
        setDimensionsFeatureEditor({ width: 400, height: 420 });
        setDimensionsFeatureReviews({ width: 500, height: 500 });
        setDimensionsFeatureAnnotations({ width: 600, height: 600 });
        setDimensionsFeatureFocus({ width: 600, height: 600 });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial dimensions

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                        <BadgeGroup alignment="center" className="mb-6">
                            <BadgeMessage>Notion</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>

                    {/* Appear Second */}
                    <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row items-center justify-between px-2 ">
                        <div className="flex flex-col space-y-6 text-center w-full md:w-1/2">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 mt-6 text-center mx-auto text-slate-800">
                                Meu <span className="underline decoration-[#9FD8CB]">caderno digital</span> que me levou a aprovação na residência
                            </h1>
                            <p className="text-xl mx-auto max-w-[440px] font-sans text-slate-600">
                                A mesma ferramenta que usei diariamente para conquistar todas as minhas aprovações e meus resumos originais podem ser seus também.
                            </p>
                            <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 pb-10">
                                <Button href="#notion-cta" variant="secondary">Quero agora</Button>
                                <VideoModal />
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
                        className="text-center w-screen pt-8"
                        type="default"
                    >
                        Notion da Lô
                    </PageTitle>
                    
                    <div className="text-center" alignment="center">
                        <div className="text-xl text-slate-700 mx-4">
                            Dá uma olhada no que você irá encontrar nele.
                        </div>
                        <CardGroup className="grid gap-4 grid-cols-1 min-[1350px]:grid-cols-3 md:w-3/5 lg:w-full lg:px-16 xl:w-[1236px] px-4 mx-auto mt-12 ">
                            

                            <WobbleCard
                                containerClassName="col-span-1 min-[1350px]:col-span-2 h-content bg-teal-800 min-h-[500px] md:min-h-[620px] lg:min-h-[620px]"
                                className=""
                            >
                                <div className="max-w-md lg:max-w-xs">
                                <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Melhor que cadernos físicos
                                </h2>
                                <p className="mt-2 text-left  text-base/6 text-neutral-200 md:pr-16 min-[1350px]:pr-2">
                                    Com o Notion, você organiza todas as anotações nas grandes áreas da medicina e acompanha de forma simples o nível de confiança e o porcentual de acertos, facilitando a identificação de onde focar seus estudos
                                </p>
                                </div>
                                <Image
                                src="/notion-feature-image-1.png"
                                width={dimensionsFeatureAnnotations.width}
                                height={dimensionsFeatureAnnotations.height}
                                alt="Notion feature 1"
                                className="absolute -right-4 lg:-right-[20%]  filter -bottom-3 object-contain rounded-xl"
                                />
                            </WobbleCard>

                            <WobbleCard
                                containerClassName="col-span-1 h-content bg-teal-950 min-h-[540px] sm:min-h-[620px] md:min-h-[600px] lg:min-h-[620px]"
                                className=""
                            >
                                <div className="max-w-md sm:max-w-xs">
                                <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Acesso rápido ao que importa
                                </h2>
                                <p className="mt-2 text-left  text-base/6 text-neutral-200">
                                    No Notion você poderá acessar rapidamente os últimos temas estudados e poderá definir temas para focar ao longo de sua preparação
                                </p>
                                </div>
                                <Image
                                src="/notion-feature-image-2.png"
                                width={dimensionsFeatureFocus.width}
                                height={dimensionsFeatureFocus.height}
                                alt="Notion feature 1"
                                className="absolute -right-4 lg:-right-[20%] filter -bottom-2 object-contain rounded-xl"
                                />
                            </WobbleCard>

                            <WobbleCard
                                containerClassName="col-span-1 h-content bg-orange-800 min-h-[500px] sm:min-h-[540px] lg:min-h-[600px] "
                                className=""
                            >
                                <div className="max-w-md sm:max-w-xs">
                                <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Revisões programadas e planejamento semanal
                                </h2>
                                <p className="mt-2 text-left  text-base/6 text-neutral-200">
                                    Organize quando estudar o quê. Planeje seus estudos e programe revisões de matérias com maior dificuldade
                                </p>
                                </div>
                                <Image
                                src="/notion-feature-image-3.png"
                                width={dimensionsFeatureReviews.width}
                                height={dimensionsFeatureReviews.height}
                                alt="Notion feature 1"
                                className="absolute -right-4 lg:-right-[20%] filter -bottom-3 object-contain rounded-xl"
                                />
                            </WobbleCard>

                            <WobbleCard
                                containerClassName="col-span-1 min-[1350px]:col-span-2 h-content bg-zinc-900 min-h-[800px] sm:min-h-[840px] 2xl:min-h-[640px] "
                                className=""
                            >
                                <div className="max-w-md sm:max-w-xs">
                                <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Editor completo para suas anotações
                                </h2>
                                <p className="mt-2 text-left  text-base/6 text-neutral-200">
                                    No Notion, cada anotação fica em uma página própria que tem acesso a inúmeros recursos de formatação como diferentes tamanhos de texto, imagens, vídeos, tabelas... Assim as anotações ficam bem ricas e visuais!
                                </p>
                                </div>
                                <Image
                                src="/notion-feature-image-4.png"
                                width={dimensionsFeatureEditor.width}
                                height={dimensionsFeatureEditor.height}
                                alt="Notion feature 1"
                                className="absolute -right-4 lg:-right-[5%] 2xl:-right-[10%] filter -bottom-3 object-contain rounded-xl"
                                />
                            </WobbleCard>
                        
                        </CardGroup>
                        <div className="text-center mt-12 px-16 pb-12" alignment="center">
                            <div className="text-base text-slate-700">
                                Acessível via <a href="https://notion.so" className="underline">Notion</a>, uma ferramenta de produtividade usada por milhões de pessoas e acessível no celular, tablet e computador. {" "}
                            </div>
                        </div>
                    </div>
                </MotionBTTContainer>
            </SectionContainer>
                    <SectionContainer className="w-full z-10 pt-16 pb-8 bg-white px-4 sm:px-6 lg:px-8">
                        <div className="max-w-[1200px] mx-auto">

                    <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                        <BadgeGroup alignment="center">
                            <BadgeMessage>Exclusivo</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>
                    {/* Appear Second */}
                    <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row items-center justify-between px-2 pt-2 pb-16">
                        <div className="flex flex-col space-y-6 text-center w-full md:w-1/2 mb-14">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
                                Acesso as <span className="underline decoration-[#9FD8CB]">anotações originais</span> que me levaram a aprovação!
                            </h1>
                            <p className="text-lg mx-auto max-w-[440px] font-sans text-slate-600">
                                Na versão mais completa, ganhe acesso também a todas as +140 anotações originais que me levaram as aprovações no UNICAMP, USP-SP, USP-RP e PUC Campinas
                            </p>
                            <div className="border p-4 rounded-lg flex flex-col items-center scroll-mt-32" id="anotacoes-gratuitas">
                                <h2 className="text-lg font-bold text-center max-w-[440px] font-sans text-slate-800 leading-4 mb-2">
                                Anotações gratuitas
                                </h2>
                                <p className="text-base text-center max-w-[440px] font-sans text-slate-600 my-4">
                                Conheça uma amostra dos resumos que eu fiz! Dos 140, escolhi 15 resumos entre Clínica Médica, Cirurgia, Pediatria, GO e Preventiva para compartilhar de forma gratuita!
                                </p>
                                <Button
                                    type="link"
                                    variant="outline"
                                    href="#anotacoes-gratuitas"
                                >
                                    Ver anotações gratuitas
                                </Button>      
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
                            <GlareCard>
                                <Image
                                    src="/anotacoes-originais-notion-lo.png"
                                    width={680}
                                    height={1024}
                                    alt="Dra. Lorraine"
                                    className="max-w-xs md:max-w-md rounded-lg"
                                />
                            </GlareCard>
                        
                        </div>
                    </div>
                    </MotionBTTContainer>

                        </div>

                    </SectionContainer>
                    <MotionBTTContainer
                    transition={{ delay: 0.2, duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    >
                    <SectionContainer id="notion-cta" className="feature-tabs bg-slate-900 py-20 px-4">
                        <div className="text-center mx-auto mb-12 max-w-xl scroll-mt-32" id="comprar">
                        <PageTitle
                            className="text-4xl font-bold text-slate-100"
                            type="default"
                        >
                            Garanta já o seu!
                        </PageTitle>
                        <p className="mt-6 text-lg text-slate-300">
                            Aproveite as condições especiais de lançamento e organize de uma vez os seus estudos para residência médica com o Notion da Lô
                        </p>
                        </div>

                        <Content className="text-center" alignment="center">
                            <CardGroup className="grid gap-8 grid-cols-1 max-w-4xl mx-auto mt-8 md:grid-cols-2">
                                <Card className="mx-auto w-full bg-white rounded-2xl overflow-hidden shadow-xl">
                                    <CardBody className="space-y-6 p-10">
                                        <div>
                                            <p className="text-lg font-bold line-through text-gray-400">De R$99</p>
                                            <div className="text-4xl font-bold text-gray-900">
                                                R$ 49,90
                                            </div>
                                            <div className="inline-block bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-1.5 my-3 rounded-full">Somente Template</div>
                                        </div>
                                        <ul className="list-disc list-inside text-gray-600 text-base space-y-3 text-start list-none mt-8">
                                            <p className="text-lg font-bold text-gray-900 mb-4">Ganhe acesso vitalício a</p>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">✓</span>
                                                Template do Notion da Lô para seus estudos
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">✓</span>
                                                Sistema completo de organização de estudos
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">✓</span>
                                                Acesso imediato ao template
                                            </li>
                                        </ul>
                                        <Button 
                                            className="mt-12 bg-gray-900 hover:bg-black text-white w-full transition-all duration-200" 
                                            variant="secondary"
                                            href="https://pay.hotmart.com/C90888187B"
                                        >
                                            Quero o Template
                                        </Button>
                                    </CardBody>
                                </Card>

                                <Card className="mx-auto w-full bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
                                    <CardBody className="space-y-6 p-10">
                                        <div>
                                            <p className="text-lg font-bold line-through text-slate-400">De R$299</p>
                                            <div className="text-4xl font-bold text-slate-100">
                                                R$ 199,90
                                            </div>
                                            <div className="inline-block bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-1.5 my-3 rounded-full">Combo Completo</div>
                                        </div>
                                        <ul className="list-disc list-inside text-slate-300 text-base space-y-3 text-start list-none mt-8">
                                            <p className="text-lg font-bold text-slate-200 mb-4">Ganhe acesso vitalício a</p>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">✓</span>
                                                Template do Notion da Lô para seus estudos
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">✓</span>
                                                Todas as +140 anotações originais da Lô
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">✓</span>
                                                Sistema completo de organização de estudos
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">✓</span>
                                                Acesso imediato a todo conteúdo
                                            </li>
                                        </ul>
                                        <Button 
                                            className="mt-12 bg-secondary-500 hover:bg-gray-900 text-white w-full transition-all duration-200" 
                                            variant="secondary"
                                            href="https://pay.hotmart.com/X90902784L"
                                            onClick={trackFacebookInitiateCheckoutCombo}
                                        >
                                            Quero o Combo
                                        </Button>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                            <div className="text-center mt-8">
                                <p className="text-sm text-slate-400">Pagamento 100% seguro via Hotmart</p>
                            </div>
                        </Content>
                    </SectionContainer>
                    </MotionBTTContainer>
                 </div>
        </Layout>
</>
    );
}
