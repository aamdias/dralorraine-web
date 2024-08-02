import { useState } from 'react';
import { BadgeGroup, BadgeMessage } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { Content } from "@components/Content";
import { Button } from "@components/Button";
import SEO from "@components/SEO/SEO";
import { MotionBTTContainer } from "@components/Motion";
import { CalendlyWidget } from '@components/CalendlyWidget';

// Componente para o modal
const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          {children}
          <div className="items-center px-4 py-3">
            <Button onClick={onClose}>Fechar</Button>
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
        studyStartDate: '',
        prioritySpecialty: '',
        priorityInstitution: '',
        difficulties: '',
        discoverySource: '',
    });
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    const handleDateSelected = () => {
        if (!purchaseCompleted) {
            setShowModal(true);
        } else {
            // Trigger Calendly popup
            Calendly.initPopupWidget({ url: 'https://calendly.com/lorraine-souza/mentoria-para-residencia-medica' });
        }
    };

    return (
        <Layout className="">
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
                            <p>Preencha o formulário abaixo para te conhecer um pouco mais</p>
                        </Content>
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
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
                                <label htmlFor="gradStatus" className="block text-gray-700 font-bold mb-2">Status da graduação</label>
                                <select id="gradStatus" name="gradStatus" value={formData.gradStatus} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required>
                                    <option value="">Selecione uma opção</option>
                                    <option value="cursando">Cursando</option>
                                    <option value="formado">Formado</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="studyStartDate" className="block text-gray-700 font-bold mb-2">Quando começou a estudar</label>
                                <input type="date" id="studyStartDate" name="studyStartDate" value={formData.studyStartDate} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
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
                        </form>
                        
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-center mb-8">Verifique a disponibilidade da Lô</h2>
                            <CalendlyWidget onDateSelected={handleDateSelected} />
                        </div>
                        
                        <div className="text-center mt-6">
                            <Button 
                                className="bg-black text-white" 
                                variant="secondary"
                                href="https://pay.hotmart.com/V91028431Y"
                                onClick={() => setPurchaseCompleted(true)}
                            >
                                Finalizar Compra da Mentoria
                            </Button>
                        </div>
                    </SectionContainer>
                </MotionBTTContainer>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold">Compra Necessária</h2>
                <p>Por favor, complete a compra antes de agendar a mentoria.</p>
            </Modal>
        </Layout>
    );
}
