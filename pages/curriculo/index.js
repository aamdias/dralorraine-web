import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Content } from "@components/Content";
import { Button } from "@components/Button";
import { GlareCard } from "@components/GlareCard";
import { BadgeMessage, BadgeGroup } from "@components/Badge";
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

  return (
    <Layout>
      <SEO
        title="Currículo para Residência Médica | Dra. Lorraine"
        description="Tenha um currículo com alto padrão de qualidade, similar ao curriculo que usei para conquistar as melhores notas nas bancas da UNICAMP, USP e UNIFESP"
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

        <SectionContainer className="bg-gradient-to-b from-white to-[#EEF2FF]">
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
              
              <div className="max-w-lg mx-auto">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-8 md:p-12">
                    <div className="text-center">
                      <div className="inline-block bg-secondary-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
                        Currículo Premium
                      </div>
                      <div className="text-5xl font-bold text-secondary-500 mb-2">R$ 1.500</div>
                      <div className="text-gray-500 mb-8">Pagamento único</div>
                      <ul className="space-y-4 mb-10 text-left">
                        {[
                          "Serviço especializado e prestado pela mesma pessoa que fez o currículo da Lô",
                          "Encontros via Google Meet para entender seu contexto e te envolver no processo de construção",
                          "Design exclusivo feito por quem tem experiência nas melhores empresas de tecnologia do Brasil",
                          "Feito de forma 100% personalizada para você e para a instituição onde você está aplicando",
                          "Até 3 currículos para 3 instituições diferentes",
                          "Entrega em até 1 semana após o primeiro call",
                          "30 dias de suporte pós-entrega"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start text-gray-600">
                            <span className="text-secondary-500 mr-3 mt-1">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button
                        href="https://wa.me//5585994319716?text=Oi%20Alan!%20Vim%20pelo%20site%20da%20L%C3%B4%20e%20tenho%20interesse%20em%20fazer%20um%20curr%C3%ADculo%20profissional%20para%20a%20Resid%C3%AAncia%20M%C3%A9dica"
                        variant="secondary"
                        className="w-full bg-secondary-500 hover:bg-[#2D3319] hover:text-white text-white transition-all duration-200"
                      >
                        Entrar em contato
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="text-center mt-8">
                <p className="text-sm text-gray-500">Pagamento 100% seguro</p>
              </div> */}
            </div>
          </div>
        </SectionContainer>
      </div>
    </Layout>
  );
}

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