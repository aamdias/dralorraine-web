import { motion } from "framer-motion";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Content } from "@components/Content";
import { Button } from "@components/Button";
import { GlareCard } from "@components/GlareCard";
import { BadgeMessage, BadgeGroup } from "@components/Badge";
import { Results } from "@components/Results";
import SEO from "@components/SEO/SEO";
import Image from "next/image";
import Link from "next/link";
import {
    CardBody,
    CardGroup,
    CardHeader,
    CardImage,
    Card
} from "@components/Card";
import {
    trackFacebookInitiateCheckoutAnotacoes,
    trackFacebookInitiateCheckoutCombo
} from "@utils/facebookPixel";

export default function Anotacoes() {
    return (
        <Layout>
            <SEO
                title="Anotações da Dra. Lorraine | Material Exclusivo para Residência"
                description="Acesse as anotações originais da Dra. Lorraine, material exclusivo que a ajudou a conquistar sua aprovação na residência médica."
            />

            <div className="main-wrapper relative z-10">
                <SectionContainer className="bg-gradient-to-b from-[#E5FFF9] via-white to-white pt-24">
                    <div className="container mx-auto px-4 py-12 md:py-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
                        >
                            <div className="flex-1 text-center mx-auto max-w-2xl">
                                <BadgeGroup alignment="center" className="mb-6">
                                    <BadgeMessage>
                                        Material Exclusivo
                                    </BadgeMessage>
                                </BadgeGroup>
                                <PageTitle
                                    tag="h1"
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 mt-2 text-center mx-auto px-1"
                                >
                                    <span className="underline decoration-[#9FD8CB]">
                                        Anotações originais
                                    </span>{" "}
                                    que me levaram ao
                                    <span className="text-secondary-500 block mt-2">
                                        1º lugar em Dermato na UNICAMP
                                    </span>
                                </PageTitle>
                                <Content className="text-base md:text-lg text-gray-600 mb-10 font-light">
                                    Tenha acesso a todas as +140 anotações
                                    originais que levaram a{" "}
                                    <Link
                                        href="/"
                                        className="underline decoration-secondary-500"
                                    >
                                        Dra Lô
                                    </Link>{" "}
                                    as aprovações no UNICAMP, USP-SP, USP-RP e
                                    PUC Campinas. Material completo e organizado
                                    para maximizar seu aprendizado.
                                </Content>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        href="#cta-anotacoes"
                                        variant="primary"
                                        className="text-lg px-4 py-2 w-80 bg-secondary-500 hover:bg-[#2D3319] hover:text-white transition-all duration-200 mx-auto"
                                    >
                                        Quero Garantir Meu Acesso
                                    </Button>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
                                <GlareCard>
                                    <Image
                                        src="/anotacoes-originais-notion-lo.png"
                                        width={680}
                                        height={1024}
                                        alt="Anotações da Dra. Lorraine"
                                        className="max-w-xs md:max-w-md rounded-lg"
                                    />
                                </GlareCard>
                            </div>
                        </motion.div>
                    </div>
                </SectionContainer>

                <SectionContainer className="bg-white">
                    <div className="container mx-auto px-4 py-20">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Conteúdo</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                tag="h2"
                                className="text-3xl md:text-4xl font-bold mt-6 mb-8"
                            >
                                O que você vai encontrar nas anotações
                            </PageTitle>
                            <Content className="text-gray-600 text-lg">
                                Material completo e organizado para maximizar
                                seu aprendizado
                            </Content>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1
                                    }}
                                    className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <div className="w-12 h-12 bg-secondary-500/10 rounded-xl flex items-center justify-center mb-6">
                                        <span className="text-secondary-500 text-2xl">
                                            {feature.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </SectionContainer>

                {/* Who am I section */}
                <SectionContainer className="bg-gradient-to-b from-white to-[#F3F5F8] pt-20 pb-0">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Sobre mim</BadgeMessage>
                            </BadgeGroup>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto"
                        >
                            <div className="flex flex-col space-y-6 md:w-1/2 text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                                    Oi! Sou a{" "}
                                    <span className="text-secondary-500">
                                        Lorraine
                                    </span>
                                    .
                                </h2>
                                <p className="text-lg md:max-w-[264px] lg:max-w-[440px] font-sans text-gray-700">
                                    <span className="font-bold">
                                        Sou médica pela UNICAMP
                                    </span>{" "}
                                    e, após muito esforço, alcancei um dos
                                    melhores resultados de aprovação para a
                                    residência médica em Dermatologia em 2023,
                                    nas instituições mais renomadas do Brasil.
                                </p>
                            </div>
                            <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
                                <Image
                                    src="/lolo-portrait-home-page.png"
                                    width={680}
                                    height={1024}
                                    alt="Dra. Lorraine"
                                    className="max-w-xs md:max-w-md rounded-lg"
                                />
                            </div>
                        </motion.div>
                    </div>
                </SectionContainer>

                {/* Aprovações section */}
                <Results />

                <SectionContainer className="bg-[#F3F5F8] mt-20">
                    <div className="container mx-auto px-4 pt-20">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Exemplo de Anotação</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                tag="h2"
                                className="text-3xl md:text-4xl font-bold mt-4 mb-8"
                            >
                                Veja como são as anotações
                            </PageTitle>
                            <Content className="text-gray-600 text-lg">
                                Conteúdo objetivo e organizado para facilitar
                                seu aprendizado
                            </Content>
                        </div>

                        <div className="max-w-5xl mx-auto px-4 md:px-0">
                            {/* PC Mockup */}
                            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] md:border-[16px] rounded-t-xl h-[592px] max-w-[512px] md:h-[672px] md:max-w-[912px]">
                                <div className="rounded-lg overflow-hidden h-[560px] md:h-[640px] bg-white">
                                    {/* Notion-like Interface */}
                                    <div
                                        className="h-full overflow-y-auto notion-content bg-white"
                                        style={{
                                            fontFamily:
                                                'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'
                                        }}
                                    >
                                        {/* Notion Top Bar */}
                                        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
                                            <div className="flex items-center px-4 md:px-8 h-12">
                                                <div className="flex items-center space-x-4 text-gray-500">
                                                    <button className="hover:bg-gray-100 p-1 rounded">
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 6h16M4 12h16M4 18h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <div className="flex items-center space-x-1 text-sm">
                                                        <span>Pediatria</span>
                                                        <span>/</span>
                                                        <span>
                                                            Arritmia, Síncope e
                                                            PCR
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Page Cover */}
                                        <div className="w-full h-[200px] relative">
                                            <div className="absolute inset-0">
                                                <img
                                                    src="/notion-page-cover.jpeg"
                                                    alt="Page cover"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* Icon Container - positioned to overflow the cover */}
                                            <div className="absolute -bottom-12 left-4 md:left-[calc(max(96px,calc(96px+env(safe-area-inset-left))))]">
                                                <div className="w-[78px] h-[78px] rounded-full bg-white shadow-sm flex items-center justify-center text-4xl">
                                                    💔
                                                </div>
                                            </div>
                                        </div>

                                        {/* Page Content */}
                                        <div className="px-4 md:px-[calc(max(96px,calc(96px+env(safe-area-inset-left))))] pt-16 pb-10">
                                            {/* Page Title */}
                                            <h1 className="text-4xl font-bold mb-10">
                                                Arritmia, Síncope e PCR
                                            </h1>

                                            {/* Page Properties */}
                                            <div className="mb-12">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {/* Grande área Property */}
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-gray-500">
                                                            Grande área
                                                        </div>
                                                        <div className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600">
                                                            Pediatria
                                                        </div>
                                                    </div>
                                                    {/* Status Property */}
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-gray-500">
                                                            Status
                                                        </div>
                                                        <div className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-700">
                                                            Revisado
                                                        </div>
                                                    </div>
                                                    {/* Created Property */}
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-gray-500">
                                                            Criado em
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            15 de julho de 2023
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Add to Page Button */}
                                            <div className="mb-8 flex items-center">
                                                <button className="text-gray-500 hover:bg-gray-100 rounded-md px-2 py-1 text-sm flex items-center gap-1">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 4v16m8-8H4"
                                                        />
                                                    </svg>
                                                    Adicionar conteúdo
                                                </button>
                                            </div>

                                            {/* Table of Contents */}
                                            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                        />
                                                    </svg>
                                                    CONTEÚDO
                                                </div>
                                                <div className="space-y-1">
                                                    <a
                                                        href="#morte-subita"
                                                        className="block text-gray-600 hover:bg-gray-100 rounded px-2 py-1 text-sm"
                                                    >
                                                        1. Morte súbita em
                                                        lactente
                                                    </a>
                                                    <a
                                                        href="#brue"
                                                        className="block text-gray-600 hover:bg-gray-100 rounded px-2 py-1 text-sm"
                                                    >
                                                        2. BRUE
                                                    </a>
                                                    <a
                                                        href=""
                                                        className="block text-gray-600 hover:bg-gray-100 rounded px-2 py-1 text-sm"
                                                    >
                                                        3. ...
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Content Sections */}
                                            <div
                                                id="morte-subita"
                                                className="space-y-6"
                                            >
                                                <div className="group">
                                                    <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                                                            <button className="hover:bg-gray-100 p-1 rounded">
                                                                ⚓
                                                            </button>
                                                        </div>
                                                        <span className="text-gray-400 mr-2">
                                                            1.
                                                        </span>
                                                        Morte súbita em lactente
                                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-gray-400 hover:bg-gray-100 p-1 rounded">
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div className="pl-4 border-l-4 border-gray-200 space-y-4">
                                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                                        Definição
                                                    </h3>
                                                    <ul className="list-disc pl-6 space-y-1 mb-6 text-gray-600">
                                                        <li>
                                                            Morte súbita e
                                                            inesperada em
                                                            menores de 1 ano de
                                                            idade
                                                        </li>
                                                        <li>Durante o sono</li>
                                                        <li>
                                                            Não pode ser
                                                            explicada após a
                                                            avaliação pós-morte
                                                        </li>
                                                    </ul>

                                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                                        Incidência
                                                    </h3>
                                                    <ul className="list-disc pl-6 space-y-1 mb-6 text-gray-600">
                                                        <li>
                                                            Pico entre 2 e 4
                                                            meses
                                                        </li>
                                                        <li>
                                                            Menos comum depois
                                                            dos 8 meses
                                                        </li>
                                                    </ul>

                                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                                        Fisiopatologia
                                                    </h3>
                                                    <ul className="list-disc pl-6 space-y-1 mb-6 text-gray-600">
                                                        <li>
                                                            Ainda desconhecida
                                                        </li>
                                                        <li>
                                                            Criança vulnerável
                                                        </li>
                                                        <li>Período crítico</li>
                                                        <li>
                                                            Fatores
                                                            desencadeantes
                                                        </li>
                                                    </ul>

                                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                                        Fatores de Risco
                                                    </h3>
                                                    <div className="pl-6 space-y-4 mb-6">
                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <div className="font-medium text-gray-800 mb-2">
                                                                Epidemiológicos
                                                            </div>
                                                            <ul className="list-disc pl-6 space-y-1 text-gray-600">
                                                                <li>
                                                                    Baixo nível
                                                                    socioeconômico
                                                                </li>
                                                                <li>
                                                                    Posição
                                                                    prona/
                                                                    lateral
                                                                </li>
                                                                <li>
                                                                    Cama
                                                                    compartilhada
                                                                </li>
                                                                <li>
                                                                    Cama fofa e
                                                                    macia
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <div className="font-medium text-gray-800 mb-2">
                                                                Maternos e
                                                                pré-natal
                                                            </div>
                                                            <ul className="list-disc pl-6 space-y-1 text-gray-600">
                                                                <li>
                                                                    Tabagismo
                                                                </li>
                                                                <li>
                                                                    Doenças
                                                                    mentais
                                                                </li>
                                                                <li>
                                                                    Abuso de
                                                                    substâncias
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <div className="font-medium text-gray-800 mb-2">
                                                                Lactente
                                                            </div>
                                                            <ul className="list-disc pl-6 space-y-1 text-gray-600">
                                                                <li>
                                                                    Prematuridade
                                                                </li>
                                                                <li>
                                                                    Sexo
                                                                    masculino
                                                                </li>
                                                                <li>
                                                                    Baixo peso
                                                                    ao nascer
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* BRUE Section */}
                                            <div
                                                id="brue"
                                                className="space-y-6 mt-12"
                                            >
                                                <div className="group">
                                                    <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                                                            <button className="hover:bg-gray-100 p-1 rounded">
                                                                ⚓
                                                            </button>
                                                        </div>
                                                        <span className="text-gray-400 mr-2">
                                                            2.
                                                        </span>
                                                        BRUE
                                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-gray-400 hover:bg-gray-100 p-1 rounded">
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div className="pl-4 border-l-4 border-gray-200 space-y-4">
                                                    <div className="space-y-3 text-gray-600">
                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <p className="mb-3">
                                                                Evento súbito,
                                                                breve e já
                                                                resolvido (ao
                                                                chegar no
                                                                hospital) em
                                                                criança de até 1
                                                                ano com pelo
                                                                menos uma
                                                                característica:
                                                            </p>
                                                            <ul className="list-disc pl-6 space-y-1">
                                                                <li>
                                                                    Cianose ou
                                                                    palidez
                                                                </li>
                                                                <li>
                                                                    Esforço
                                                                    respiratório,
                                                                    ausente,
                                                                    diminuído ou
                                                                    irregular
                                                                </li>
                                                                <li>
                                                                    Alteração do
                                                                    tônus
                                                                    muscular
                                                                    (hiper ou
                                                                    hipotonia)
                                                                </li>
                                                                <li>
                                                                    Alteração da
                                                                    responsividade
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="py-2 text-gray-600">
                                                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                                            <p>
                                                                O termo só deve
                                                                ser usado para
                                                                crianças
                                                                assintomáticas
                                                                no momento da
                                                                avaliação e
                                                                quando não há
                                                                nenhuma
                                                                explicação para
                                                                o episódio
                                                                encontrado no
                                                                exame físico ou
                                                                na história
                                                                clínica
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                            <span>
                                                                Fatores de risco
                                                            </span>
                                                            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:bg-gray-100 p-1 rounded text-sm">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </h3>
                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <ul className="list-disc pl-6 space-y-1 text-gray-600">
                                                                <li>
                                                                    Dificuldades
                                                                    na
                                                                    alimentação
                                                                </li>
                                                                <li>
                                                                    Sintomas
                                                                    respiratórios
                                                                    recentes
                                                                </li>
                                                                <li>
                                                                    Idade &lt; 2
                                                                    meses
                                                                </li>
                                                                <li>
                                                                    História
                                                                    prévia de
                                                                    BRUE
                                                                </li>
                                                                <li>
                                                                    Prematuridade
                                                                </li>
                                                                <li>
                                                                    Baixo peso
                                                                    ao nascer
                                                                </li>
                                                                <li>
                                                                    Tabagismo
                                                                    materno
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ellipsis indicator */}
                                            <div className="mt-16 border-t border-gray-200 pt-8 text-center">
                                                <div className="inline-flex items-center space-x-2 text-gray-500">
                                                    <span className="text-2xl leading-[1]">
                                                        ....
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative -mt-px mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                                    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionContainer>

                <SectionContainer
                    className="bg-slate-900 py-20 px-4 scroll-mt-10"
                    id="cta-anotacoes"
                >
                    <div className="text-center mx-auto mb-12 max-w-xl">
                        <PageTitle
                            className="text-4xl font-bold text-slate-100"
                            type="default"
                        >
                            Garanta já o seu!
                        </PageTitle>
                        <p className="mt-6 text-lg text-slate-300">
                            Aproveite as condições especiais de lançamento e
                            tenha acesso ao material que me ajudou a conquistar
                            a aprovação na residência médica
                        </p>
                    </div>

                    <Content className="text-center" alignment="center">
                        <CardGroup className="grid gap-8 grid-cols-1 max-w-4xl mx-auto mt-8 md:grid-cols-2">
                            <Card className="mx-auto w-full bg-white rounded-2xl overflow-hidden shadow-xl">
                                <CardBody className="flex flex-col h-full p-10">
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-lg font-bold line-through text-gray-400">
                                                De R$199
                                            </p>
                                            <div className="text-4xl font-bold text-gray-900">
                                                R$ 149,90
                                            </div>
                                            <div className="inline-block bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-1.5 my-3 rounded-full">
                                                Somente Anotações
                                            </div>
                                        </div>
                                        <ul className="list-disc list-inside text-gray-600 text-base space-y-3 text-start list-none mt-8">
                                            <p className="text-lg font-bold text-gray-900 mb-4">
                                                Ganhe acesso vitalício a
                                            </p>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">
                                                    ✓
                                                </span>
                                                Todas as +140 anotações
                                                originais da Lô
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">
                                                    ✓
                                                </span>
                                                Material completo e organizado
                                                por especialidade
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="flex-shrink-0 text-secondary-500">
                                                    ✓
                                                </span>
                                                Acesso imediato ao conteúdo
                                            </li>
                                        </ul>
                                    </div>
                                    <Button
                                        className="mt-auto bg-gray-900 hover:bg-black text-white w-full transition-all duration-200"
                                        variant="secondary"
                                        href="https://pay.hotmart.com/G96980103S"
                                        onClick={
                                            trackFacebookInitiateCheckoutAnotacoes
                                        }
                                    >
                                        Quero as Anotações
                                    </Button>
                                </CardBody>
                            </Card>

                            <Card className="mx-auto w-full bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
                                <CardBody className="space-y-6 p-10">
                                    <div>
                                        <p className="text-lg font-bold line-through text-slate-400">
                                            De R$299
                                        </p>
                                        <div className="text-4xl font-bold text-slate-100">
                                            R$ 199,90
                                        </div>
                                        <div className="inline-block bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-1.5 my-3 rounded-full">
                                            Combo Completo
                                        </div>
                                    </div>
                                    <ul className="list-disc list-inside text-slate-300 text-base space-y-3 text-start list-none mt-8">
                                        <p className="text-lg font-bold text-slate-200 mb-4">
                                            Ganhe acesso vitalício a
                                        </p>
                                        <li className="flex items-center gap-3">
                                            <span className="flex-shrink-0 text-secondary-500">
                                                ✓
                                            </span>
                                            Todas as +140 anotações originais da
                                            Lô
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="flex-shrink-0 text-secondary-500">
                                                ✓
                                            </span>
                                            Template do Notion da Lô para seus
                                            estudos
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="flex-shrink-0 text-secondary-500">
                                                ✓
                                            </span>
                                            Sistema completo de organização de
                                            estudos
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="flex-shrink-0 text-secondary-500">
                                                ✓
                                            </span>
                                            Acesso imediato a todo conteúdo
                                        </li>
                                    </ul>
                                    <Button
                                        className="mt-12 bg-secondary-500 hover:bg-gray-900 text-white w-full transition-all duration-200"
                                        variant="secondary"
                                        href="https://pay.hotmart.com/X90902784L?off=p7aai34k"
                                        onClick={
                                            trackFacebookInitiateCheckoutCombo
                                        }
                                    >
                                        Quero o Combo
                                    </Button>
                                </CardBody>
                            </Card>
                        </CardGroup>
                        <div className="text-center mt-8">
                            <p className="text-sm text-slate-400">
                                Pagamento 100% seguro via Hotmart
                            </p>
                        </div>
                    </Content>
                </SectionContainer>
            </div>
        </Layout>
    );
}

const features = [
    {
        icon: "🔬",
        title: "Clínica Médica ",
        description:
            "40 temas essenciais incluindo insuficiência cardíaca, arritmias, síncope, PCR, síndromes coronarianas e diagnósticos diferenciais."
    },
    {
        icon: "⚕",
        title: "Cirurgia Médica ",
        description:
            "30 temas fundamentais como trauma de face e pescoço, queimaduras, trauma abdominal, hérnias e muito mais."
    },
    {
        icon: "🤰",
        title: "GO ",
        description:
            "31 temas incluindo ciclo menstrual, pré-natal, dor pélvica crônica, assistência ao parto e doenças benignas da mama."
    },
    {
        icon: "👶",
        title: "Pediatria ",
        description:
            "26 temas cruciais cobrindo desde distúrbios obstrutivos até crescimento e desenvolvimento, tuberculose e síndromes febris."
    },
    {
        icon: "🏥",
        title: "Medicina Preventiva",
        description:
            "14 temas, como SUS, estatística dos testes diagnósticos, níveis de prevenção e documentação médica."
    },
    {
        icon: "📚",
        title: "Tudo em um só lugar",
        description:
            "Mais de 2 mil horas de estudo condensados em +140 anotações com conteúdo objetivo e focado no que importa para aprovação."
    }
];
