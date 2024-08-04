import { useState, useEffect } from 'react';
import { BadgeGroup, BadgeMessage } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { Content } from "@components/Content";
import { Button } from "@components/Button";
import SEO from "@components/SEO/SEO";
import { MotionBTTContainer } from "@components/Motion";
import { CalendlyWidget } from '@components/CalendlyWidget';
import { HotmartWidget } from '@components/HotmartWidget';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          {children}
          <div className="items-center px-4 py-3">
            <Button asButton onClick={onClose}>Fechar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MentorshipCheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    medSchool: '',
    gradStatus: '',
    prioritySpecialty: '',
    studyPlanning: '',
    priorityInstitution: '',
    difficulties: '',
    discoverySource: '',
  });
  const [step, setStep] = useState(1);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      const response = await fetch('/api/notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        setStep(2);
      } else {
        console.error('Server error:', result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDateSelected = () => {
    if (!purchaseCompleted) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (purchaseCompleted) {
      Calendly.initPopupWidget({ url: 'https://calendly.com/lorraine-souza/mentoria-para-residencia-medica?hide_event_type_details=1' });
    }
  }, [purchaseCompleted]);

  const handleClose = () => {
    setShowModal(false);
    console.log('Show modal state', showModal);
  };

  const handleEventScheduled = () => {
    console.log("Event scheduled successfully");
  };

  const getHotmartLink = () => {
    const { name, email, phone } = formData;
    const formattedPhone = phone.replace(/[^\d]/g, '');
    return `https://pay.hotmart.com/V91028431Y?checkoutMode=10&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&tel=${formattedPhone}`;
  };

  return (
    <Layout>
      <SEO
        title="Checkout Mentoria | Dra Lô R1 Dermato UNICAMP"
        description="Finalize sua inscrição para mentoria personalizada de residência médica"
      />
      <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-32">
        <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
          <SectionContainer className="checkout-form">
            <BadgeGroup alignment="center" className="mb-6">
              <BadgeMessage>Compra da Mentoria</BadgeMessage>
            </BadgeGroup>
            <PageTitle className="text-center mx-auto px-4 mb-4" type="default">
              Finalize sua inscrição para a <span className="underline decoration-[#9FD8CB]">Mentoria com a Lô</span>
            </PageTitle>
            <Content className="text-center mb-16" alignment="center">
              <p>Preencha o formulário abaixo</p>
            </Content>

            <div className="flex flex-col lg:flex-row w-full items-center lg:items-start lg:justify-center space-y-8 lg:space-y-0 lg:space-x-8 max-w-6xl mx-auto">
            {step === 1 && (
                <form onSubmit={handleSubmit} className="flex-grow flex-shrink-0 w-full lg:w-1/2 max-w-2xl bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nome</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Número de Telefone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="medSchool" className="block text-gray-700 font-bold mb-2">Onde fez/está fazendo medicina</label>
                    <input type="text" id="medSchool" name="medSchool" value={formData.medSchool} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="gradStatus" className="block text-gray-700 font-bold mb-2">Status da graduação em medicina</label>
                    <select id="gradStatus" name="gradStatus" value={formData.gradStatus} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required>
                    <option value="">Selecione uma opção</option>
                    <option value="Estou nos primeiros 4 anos de graduação">Estou nos primeiros 4 anos de graduação</option>
                    <option value="Estou no penúltimo ano de internato">Estou no penúltimo ano de internato</option>
                    <option value="Estou no último ano de internato">Estou no último ano de internato</option>
                    <option value="Conclui graduação em 2023">Conclui graduação em 2023</option>
                    <option value="Conclui graduação em 2022">Conclui graduação em 2022</option>
                    <option value="Conclui graduação em 2020/21">Conclui graduação em 2020/21</option>
                    <option value="Conclui graduação antes de 2020">Conclui graduação antes de 2020</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="studyPlanning" className="block text-gray-700 font-bold mb-2">Quando você começou a estudar para residência?</label>
                    <select id="studyPlanning" name="studyPlanning" value={formData.studyPlanning} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required>
                    <option value="">Selecione uma opção</option>
                    <option value="Estou nos primeiros 4 anos de graduação">Estou começando a estudar agora em 2024</option>
                    <option value="Estou no penúltimo ano de internato">Comecei a estudar ano passado</option>
                    <option value="Estou no último ano de internato">Comecei a estudar há 2 anos</option>
                    <option value="Conclui graduação em 2023">Comecei a estudar faz mais de 2 anos</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="prioritySpecialty" className="block text-gray-700 font-bold mb-2">Especialidade prioritária</label>
                    <input type="text" id="prioritySpecialty" name="prioritySpecialty" value={formData.prioritySpecialty} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="priorityInstitution" className="block text-gray-700 font-bold mb-2">Instituição prioritária para prova de residência</label>
                    <input type="text" id="priorityInstitution" name="priorityInstitution" value={formData.priorityInstitution} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="difficulties" className="block text-gray-700 font-bold mb-2">Maiores dificuldades na preparação</label>
                    <textarea id="difficulties" name="difficulties" value={formData.difficulties} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="3" required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="discoverySource" className="block text-gray-700 font-bold mb-2">Como descobriu o site dralorraine.com?</label>
                    <input type="text" id="discoverySource" name="discoverySource" value={formData.discoverySource} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="text-center mt-6">
                    <button type="submit" className="bg-black text-white px-4 py-2 rounded-full" variant="secondary">Próximo</button>
                </div>
                </form>
            )}
            {step === 2 && (
                <div className="flex-grow flex-shrink-0 w-full lg:w-1/2 max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Formulário enviado com sucesso!</h2>
                <p className="mb-4">Agora, finalize a compra da mentoria para agendar sua sessão.</p>
                <div className="mt-8">
                    <Button 
                    className="bg-black text-white" 
                    variant="secondary"
                    href={getHotmartLink()}
                    >
                    Finalizar Compra da Mentoria
                    </Button>
                </div>
                </div>
            )}

            <div className="flex-grow flex-shrink-0 w-full lg:w-1/2 max-w-2xl bg-white p-8 rounded-lg shadow-inner h-fit">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Com dúvida sobre a disponibilidade da Lô?
                </h2>
                <p className="text-center mb-6 text-gray-600">
                Verifique a disponibilidade da Lô para sessões de mentoria abaixo:
                </p>
                <div>
                <CalendlyWidget 
                    onDateSelected={handleDateSelected} 
                    onEventScheduled={handleEventScheduled}
                    purchaseCompleted={purchaseCompleted}
                />
                </div>
            </div>
            </div>


          </SectionContainer>
        </MotionBTTContainer>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <h2 className="text-xl font-bold">Compra Necessária</h2>
        <p>Por favor, complete a compra antes de agendar a mentoria.</p>
      </Modal>
    </Layout>
  );
}
