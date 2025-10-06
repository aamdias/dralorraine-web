import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Content } from "@components/Content";
import { Button } from "@components/Button";
import { GlareCard } from "@components/GlareCard";
import { BadgeMessage, BadgeGroup } from "@components/Badge";
import { FAQ } from "@components/FAQ";
import SEO from "@components/SEO/SEO";

export default function Curriculo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const containerRef = useRef(null);
  
  const images = [
    '/resume-example-1.png',
    '/resume-example-2.png',
    '/resume-example-3.png'
  ];

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (startX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
    setStartX(null);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  // JSON-LD Structured Data for AEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": typeof item.answer === 'string' ? item.answer : item.answer.props.children.join(' ')
          }
        }))
      },
      {
        "@type": "Person",
        "name": "Dra. Lorraine Almeida",
        "jobTitle": "Médica Dermatologista e Mentora para Residência Médica",
        "description": "Médica aprovada em 1º lugar em Dermatologia na UNICAMP, com aprovações em USP-SP, USP-RP e UNIFESP. Especializada em mentoria e preparação de currículos para residência médica em São Paulo.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "São Paulo",
          "addressRegion": "SP",
          "addressCountry": "BR"
        },
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "UNICAMP - Universidade Estadual de Campinas"
          }
        ],
        "knowsAbout": ["Residência Médica", "Dermatologia", "Preparação para Provas", "Currículo Médico", "UNICAMP", "USP", "UNIFESP"],
        "sameAs": [
          "https://www.instagram.com/dralaorraine"
        ]
      },
      {
        "@type": "Organization",
        "name": "Dra. Lorraine - Serviços para Residência Médica",
        "description": "Serviços especializados para aprovação em residência médica: elaboração de currículo profissional, mentoria individual e material de estudo para instituições de São Paulo.",
        "url": "https://dralaorraine.com.br",
        "logo": "https://dralaorraine.com.br/newlogo-dralorraine-web.svg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "São Paulo",
          "addressRegion": "SP",
          "addressCountry": "BR"
        },
        "founder": {
          "@type": "Person",
          "name": "Dra. Lorraine Almeida"
        },
        "areaServed": {
          "@type": "State",
          "name": "São Paulo"
        },
        "serviceType": ["Elaboração de Currículo para Residência Médica", "Mentoria Individual", "Material de Estudo"],
        "knowsAbout": ["UNICAMP", "USP", "UNIFESP", "PUC Campinas", "Residência Médica"]
      },
      {
        "@type": "Service",
        "serviceType": "Elaboração de Currículo para Residência Médica",
        "provider": {
          "@type": "Organization",
          "name": "Dra. Lorraine - Serviços para Residência Médica"
        },
        "areaServed": {
          "@type": "State",
          "name": "São Paulo"
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Médicos candidatos a residência médica"
        },
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock",
          "description": "Currículo profissional personalizado para residência médica em instituições de São Paulo (UNICAMP, USP, UNIFESP, PUC)"
        }
      }
    ]
  };

  return (
    <Layout>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <SEO
        title="Como Montar Currículo para Residência Médica em São Paulo | Currículo Premium Dra. Lorraine"
        description="Saiba como elaborar um currículo vencedor para UNICAMP, USP, UNIFESP e PUC. Serviço especializado que conquistou as melhores notas nas bancas de São Paulo. Entenda os requisitos, pontuação e documentos necessários para cada instituição."
        keywords="currículo residência médica, como fazer currículo para residência, UNICAMP residência, USP residência, UNIFESP residência, PUC residência, pontuação currículo residência, documentos residência médica, currículo lattes residência"
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
                  <BadgeMessage>Serviço Especializado</BadgeMessage>
                </BadgeGroup>
                <PageTitle tag="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 mt-2 text-center mx-auto">
                  Currículo profissional para
                  <span className="text-secondary-500 block mt-2">Residência Médica</span>
                </PageTitle>
                <Content className="text-base font-light md:text-lg text-gray-600 mb-10">
                  Tenha um currículo para residência que se destaca, similar ao curriculo que usei para conquistar as melhores notas na UNICAMP, USP e UNIFESP.
                </Content>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href="#servico"
                    variant="primary"
                    className="text-lg px-4 py-2 w-80 bg-secondary-500 hover:bg-[#2D3319] hover:text-white text-white transition-all duration-200 mx-auto"
                  >
                    Quero um currículo profissional
                  </Button>
                </div>
              </div>
              <div className="flex-1 max-w-xl">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full"
                >
                  <div 
                    ref={containerRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="w-full rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl cursor-grab active:cursor-grabbing"
                  >
                    <div className="w-full" style={{ aspectRatio: '21/29.7' }}>
                      <img
                        src={images[currentIndex]}
                        alt={`Exemplo de Currículo ${currentIndex + 1}`}
                        className="w-full h-full object-contain bg-gray-50"
                        draggable="false"
                      />
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex ? 'bg-secondary-500 w-6' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </SectionContainer>

        <SectionContainer className="bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <BadgeGroup alignment="center">
                <BadgeMessage>Benefícios</BadgeMessage>
              </BadgeGroup>
              <PageTitle tag="h2" className="text-3xl md:text-4xl font-bold mt-6 mb-8">
                Por que investir em um currículo profissional?
              </PageTitle>
              <Content className="text-gray-600 text-lg">
                Destaque-se com um currículo que te valoriza e facilita a avaliação
              </Content>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-secondary-500/10 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-secondary-500 text-2xl">{benefit.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Results Section */}
        <SectionContainer className="bg-gradient-to-b from-white to-[#F3F5F8]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <BadgeGroup alignment="center">
                <BadgeMessage>Resultados Alcançados</BadgeMessage>
              </BadgeGroup>
              <PageTitle tag="h2" className="text-3xl md:text-4xl font-bold mt-6 mb-4">
                Notas de currículos que elaboramos
              </PageTitle>
              <Content className="text-gray-600 text-base md:text-lg">
                Exemplos de avaliações recebidas em instituições de São Paulo
              </Content>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {/* UNICAMP */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-3">
                    <img src="/unicamp.png" alt="UNICAMP" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">UNICAMP</h3>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">10</div>
                  <p className="text-gray-500 text-xs md:text-sm">Nota em Currículo</p>
                </div>
              </motion.div>

              {/* USP-SP */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-3">
                    <img src="/usp-sp.png" alt="USP-SP" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">USP-SP</h3>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">10</div>
                  <p className="text-gray-500 text-xs md:text-sm">Nota em Currículo</p>
                </div>
              </motion.div>

              {/* UNIFESP */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-3">
                    <img src="/unifesp-sp.png" alt="UNIFESP" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">UNIFESP</h3>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">9.5</div>
                  <p className="text-gray-500 text-xs md:text-sm">Nota em Currículo</p>
                </div>
              </motion.div>
            </div>
            
            <div className="text-center mt-8 md:mt-10 max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                <p className="text-gray-600 text-md leading-relaxed">
                  <strong className="text-gray-900">Importante:</strong> Garantimos que seu currículo será profissionalmente elaborado e estará em total conformidade com os requisitos de cada instituição. As notas finais dependem do histórico acadêmico e profissional de cada candidato. Os resultados acima são exemplos reais de currículos que elaboramos.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="bg-gradient-to-b from-[#F3F5F8] to-[#EEF2FF]">
          <div className="container mx-auto px-4 py-20" id="servico">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <BadgeGroup alignment="center">
                  <BadgeMessage>Invista no seu Futuro</BadgeMessage>
                </BadgeGroup>
                <PageTitle tag="h2" className="text-3xl md:text-4xl font-bold mt-6 mb-8">
                  Destaque-se com um Currículo Profissional
                </PageTitle>
                <Content className="text-gray-600 text-lg">
                  Currículo estrategicamente elaborado para maximizar suas chances de aprovação
                </Content>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  {/* Header with visual representation */}
                  <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-8 md:p-10">
                    <div className="text-center mb-6">
                      <div className="inline-block bg-secondary-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                        Currículo Premium
                      </div>
                      <div className="text-5xl md:text-6xl font-bold mb-2 text-white">R$ 1.500</div>
                      <div className="text-gray-200 text-lg">Investimento único para sua aprovação</div>
                    </div>
                    
                    {/* Visual representation of what you get */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10">
                      {/* 3 CVs visualization */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-base md:text-lg text-white">Até 3 Currículos</div>
                            <div className="text-gray-300 text-xs md:text-sm">Instituições à sua escolha</div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 flex-1 text-center border border-white/20">
                            <div className="text-xs md:text-sm font-semibold text-white">Currículo 1</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 flex-1 text-center border border-white/20">
                            <div className="text-xs md:text-sm font-semibold text-white">Currículo 2</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 flex-1 text-center border border-white/20">
                            <div className="text-xs md:text-sm font-semibold text-white">Currículo 3</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Individual mentorship visualization */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-base md:text-lg text-white">Mentoria Individual</div>
                            <div className="text-gray-300 text-xs md:text-sm">Encontros via Google Meet</div>
                          </div>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-xs md:text-sm flex items-center gap-2 border border-white/10">
                            <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-200">Análise do seu contexto</span>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-xs md:text-sm flex items-center gap-2 border border-white/10">
                            <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-200">Processo colaborativo</span>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-xs md:text-sm flex items-center gap-2 border border-white/10">
                            <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-200">Orientação personalizada</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details section */}
                  <div className="p-8 md:p-10">
                    <div className="mb-8">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 text-center">O que está incluso:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {[
                          { text: "Serviço prestado pela mesma pessoa que fez o currículo da Lô" },
                          { text: "Design exclusivo de quem tem experiência nas melhores empresas do Brasil" },
                          { text: "100% personalizado para você e suas instituições" },
                          { text: "Até 3 currículos para 3 instituições diferentes" },
                          { text: "Entrega em até 30 dias após coleta dos certificados" },
                          { text: "30 dias de suporte pós-entrega para ajustes" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 md:p-4">
                            <svg className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 text-sm md:text-base leading-relaxed">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-secondary-500/5 to-secondary-500/10 rounded-2xl p-4 md:p-6 mb-8 border border-secondary-500/20">
                      <div className="flex items-start gap-3 md:gap-4">
                        
                        <div>
                          <div className="font-bold text-gray-900 mb-2 text-sm md:text-base">Por que investir?</div>
                          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            Cada ponto do currículo pode ser decisivo para sua aprovação nas instituições mais concorridas. 
                            Este é um investimento único que pode definir sua carreira médica, feito por quem conquistou as melhores notas nas bancas de SP.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      href="https://aamdias.notion.site/28499f313a2a80ee9f21d7cdd02a0212?pvs=105"
                      variant="secondary"
                      className="w-full bg-secondary-500 hover:bg-[#2D3319] text-white text-lg py-4 transition-all duration-200 shadow-lg hover:shadow-xl mb-6"
                    >
                      Quero meu Currículo
                    </Button>
                    
                    <p className="text-center text-sm text-gray-500 mt-6">
                      🔒 Processo 100% online e seguro • Pagamento facilitado
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="text-center mt-8">
                <p className="text-sm text-gray-500">Pagamento 100% seguro</p>
              </div> */}
            </div>
          </div>
        </SectionContainer>

        {/* Internal Links Section */}
        <SectionContainer className="bg-gradient-to-b from-[#EEF2FF] to-[#F3F5F8]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 max-w-3xl mx-auto">
                <BadgeGroup alignment="center">
                  <BadgeMessage>Outros Serviços</BadgeMessage>
                </BadgeGroup>
                <PageTitle tag="h2" className="text-3xl md:text-4xl font-bold mt-6 mb-6">
                  Prepare-se completamente para a residência
                </PageTitle>
                <Content className="text-gray-600 text-base md:text-lg">
                  Além do currículo profissional, oferecemos outros serviços para sua aprovação
                </Content>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                <Link href="/mentoria" className="group">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary-500 h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-secondary-500 transition-colors">
                      Mentoria Individual
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                      Precisa de orientação completa para sua preparação? Conheça nossa mentoria personalizada para residência médica. Aprenda estratégias de estudo, organização de rotina e preparação específica para as instituições de São Paulo.
                    </p>
                    <div className="flex items-center text-secondary-500 font-semibold group-hover:gap-3 gap-2 transition-all text-sm md:text-base">
                      Saiba mais sobre a mentoria
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>

                <Link href="/anotacoes" className="group">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary-500 h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-secondary-500 transition-colors">
                      Anotações de Estudo
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                      Acesse as mais de 140 anotações originais que me levaram ao 1º lugar em Dermatologia na UNICAMP. Material completo e organizado por especialidade, cobrindo Clínica Médica, Cirurgia, GO, Pediatria e Medicina Preventiva.
                    </p>
                    <div className="flex items-center text-secondary-500 font-semibold group-hover:gap-3 gap-2 transition-all text-sm md:text-base">
                      Conheça as anotações
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* FAQ Section */}
        <SectionContainer className="bg-[#F3F5F8]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <BadgeGroup alignment="center">
                <BadgeMessage>Perguntas Frequentes</BadgeMessage>
              </BadgeGroup>
              <PageTitle tag="h2" className="text-3xl md:text-4xl font-bold mt-6 mb-4 md:mb-8">
                Dúvidas sobre currículo para residência médica
              </PageTitle>
              <Content className="text-gray-600 text-base md:text-lg">
                Respondemos as principais questões sobre elaboração de currículo para residência
              </Content>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <FAQ items={faqItems} />
            </div>
          </div>
        </SectionContainer>
      </div>
    </Layout>
  );
}

const faqItems = [
  {
    question: "Quais documentos preciso anexar ao meu currículo para residência médica?",
    answer: (
      <div className="space-y-3">
        <p>Os documentos necessários variam por instituição, mas geralmente incluem:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Comprovantes de atividades acadêmicas:</strong> certificados de monitoria, iniciação científica, ligas acadêmicas</li>
          <li><strong>Publicações científicas:</strong> artigos publicados, resumos em anais de congressos</li>
          <li><strong>Certificados de cursos:</strong> extensão universitária, especializações, workshops</li>
          <li><strong>Comprovantes de participação em eventos:</strong> congressos, simpósios, jornadas científicas</li>
          <li><strong>Histórico escolar:</strong> algumas instituições exigem</li>
          <li><strong>Diploma de graduação:</strong> cópia autenticada</li>
        </ul>
        <p className="mt-3"><strong>Dica importante:</strong> Mantenha todos os documentos digitalizados em alta resolução e organizados por categoria. Nosso serviço de currículo assume que o a pessoa interessada tem os documentos e que os documentos são legítimos.</p>
      </div>
    )
  },
  {
    question: "Quem será responsável por elaborar meu currículo?",
    answer: (
      <div className="space-y-3">
        <p>Seu currículo será elaborado por <strong>Alan Dias</strong>, que traz uma experiência única para esse serviço:</p>
        <p>Alan é Gerente de Produto no Jusbrasil e possui formação em Engenharia Mecânica pelo Instituto Tecnológico de Aeronáutica (ITA). Ao longo dos últimos 7 anos, construiu sua carreira em startups de tecnologia de destaque, com passagens por Trybe e Quero Educação.</p>
        <p>Desde 2024, atua no Jusbrasil desenvolvendo soluções de IA para apoiar advogados na pesquisa jurídica. Atualmente, é gerente de produto do Jus IA, assistente jurídico baseado em inteligência artificial generativa que transforma a forma como profissionais do Direito acessam e utilizam informação jurídica.</p>
        <p className="mt-3"><strong>Por que isso importa?</strong> Alan combina experiência em design de produto nas melhores empresas de tecnologia do Brasil com profundo entendimento de como estruturar informações complexas de forma clara e impactante. Essa expertise é aplicada diretamente na elaboração de currículos que realmente se destacam nas bancas de residência.</p>
      </div>
    )
  },
  {
    question: "Vocês já tiveram resultados comprovados em instituições de São Paulo?",
    answer: (
      <div className="space-y-3">
        <p>Sim! Nosso serviço já conquistou excelentes resultados nas principais instituições de São Paulo:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>UNICAMP:</strong> Nota 10 em currículo</li>
          <li><strong>USP-SP:</strong> Nota 10 em currículo</li>
          <li><strong>UNIFESP:</strong> Nota 9.5 em currículo</li>
        </ul>
        <p className="mt-3">É importante destacar que cada instituição tem seus próprios requisitos e formatos específicos. Nosso serviço garante que seu currículo estará profissionalmente elaborado e em total conformidade com as exigências de cada banca. Oferecemos até 3 currículos personalizados para diferentes instituições, respeitando as particularidades de cada uma.</p>
        <p className="mt-2"><strong>Atenção:</strong> As notas finais dependem do histórico acadêmico e profissional individual de cada candidato. Garantimos a qualidade profissional do documento e a conformidade com os requisitos institucionais.</p>
      </div>
    )
  },
  {
    question: "Quanto tempo leva para fazer um currículo profissional para residência?",
    answer: "O processo de elaboração de um currículo profissional leva em média 20 a 30 dias após a coleta completa de todos os certificados e documentos. Este prazo inclui: (1) Encontro inicial para entendimento do seu contexto acadêmico, (2) Análise e organização de toda documentação, (3) Elaboração do design e estruturação do conteúdo, (4) Revisões e ajustes necessários, (5) Entrega final com suporte de 30 dias. O prazo pode variar dependendo da quantidade de atividades e instituições (oferecemos até 3 currículos para instituições diferentes). É importante iniciar o processo com antecedência em relação aos prazos de inscrição."
  },
  {
    question: "Vale a pena investir em um currículo profissional para residência?",
    answer: (
      <div className="space-y-3">
        <p>Sim, e os dados comprovam isso. Veja por quê:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Diferencial competitivo:</strong> Em instituições concorridas como UNICAMP, USP e UNIFESP, cada ponto do currículo pode ser decisivo para aprovação</li>
          <li><strong>Valorização adequada:</strong> Um currículo bem estruturado garante que nenhuma atividade relevante seja subestimada ou esquecida</li>
          <li><strong>Economia de tempo:</strong> Evita retrabalho e garante que o documento esteja correto desde a primeira entrega</li>
          <li><strong>Experiência comprovada:</strong> Nosso serviço é prestado pela mesma pessoa que elaborou o currículo que me levou às melhores notas nas bancas</li>
          <li><strong>Investimento único:</strong> R$ 1.500 por um serviço que pode definir sua carreira médica</li>
        </ul>
        <p className="mt-3">Além disso, você recebe até 3 currículos personalizados para diferentes instituições e 30 dias de suporte pós-entrega para ajustes necessários.</p>
      </div>
    )
  },
  {
    question: "Como funciona o processo de elaboração do currículo?",
    answer: (
      <div className="space-y-3">
        <p>O processo é colaborativo e dividido em etapas claras:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li><strong>Preenchimento de formulário:</strong> Você preenche o formulário de interesse com suas informações básicas</li>
          <li><strong>Contato individual:</strong> Entramos em contato via WhatsApp para tirar dúvidas e escolher o método de pagamento</li>
          <li><strong>Contratação:</strong> Assinatura do contrato e realização do pagamento</li>
          <li><strong>Mentoria com Dra. Lô:</strong> Agendamento de mentoria para te ajudar a se planejar para a residência, especialmente em temas que podem ajudar no seu currículo e no que as bancas mais avaliam</li>
          <li><strong>Coleta de informações:</strong> Início da coleta de informações e preparação dos currículos</li>
          <li><strong>Revisões colaborativas:</strong> Reuniões e checkpoints para revisar os currículos em andamento diretamente com Alan, que lidera a confecção dos currículos</li>
          <li><strong>Entrega final:</strong> Entrega de cada currículo em PDF em até 30 dias após o envio dos dados necessários para cada currículo</li>
        </ol>
        <p className="mt-3">Todo o processo é 100% online e você participa ativamente das decisões.</p>
      </div>
    )
  }
];

const benefits = [
  {
    icon: "🎯",
    title: "Diferenciação",
    description: "Destaque-se entre os candidatos com um currículo profissional e estrategicamente estruturado."
  },
  {
    icon: "⭐",
    title: "Valorização",
    description: "Apresente suas conquistas e experiências de forma impactante e relevante para a banca."
  },
  {
    icon: "📊",
    title: "Organização",
    description: "Informações apresentadas de forma clara, objetiva e visualmente atraente."
  },
  {
    icon: "🎯",
    title: "Otimização",
    description: "Foco nos elementos mais valorizados pelas bancas de residência médica."
  },
  {
    icon: "🎨",
    title: "Profissionalismo",
    description: "Design moderno e layout adequado aos padrões profissionais da área médica."
  },
  {
    icon: "✨",
    title: "Confiança",
    description: "Apresente-se com segurança, sabendo que seu currículo está impecável."
  }
]; 