import {
    CardBody,
    CardGroup,
    CardHeader,
    CardImage,
    Card
} from "@components/Card";
import { MotionBTTContainer } from "@components/Motion";
import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";

export const Results = () => {
    return (
                <SectionContainer className="components--container wrap wrap-px grid gap-8 sm:gap-24">
                    {/* Card Container Tabs */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs mt-12 scroll-mt-32" id="results">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Aprovações</BadgeMessage>
                                {/* <BadgeIcon icon="twemoji:waving-hand" /> */}
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Meus resultados em <span className="underline">2023</span>
                            </PageTitle>
                            <CardGroup className="grid gap-6 grid-cols-1 max-w-4xl mx-auto mt-12 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <img src="/unicamp.png" alt="UNICAMP" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div>
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        1º lugar em Dermato na <span className="text-[#9FD8CB]">UNICAMP</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para UNICAMP
                                        </p>
                                    </div>
                                </CardBody>
                                </Card>
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <img src="/usp-rp.png" alt="USP-RP" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div>
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        2º lugar em Dermato na <span className="text-[#9FD8CB]">USP Ribeirão Preto</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para USP Ribeirão Preto
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <img src="/puc.png" alt="PUC" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div>
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        1º lugar em Dermato na <span className="text-[#9FD8CB]">PUC Campinas</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para PUC de Campinas
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-3 bg-white rounded-lg overflow-hidden shadow-md">
                                    <CardBody className="flex flex-col md:flex-row items-center p-8">
                                    <img src="/puc.png" alt="PUC" className="mb-4 md:mb-0 md:mr-8 w-54 md:w-48 lg:w-56 hover:scale-105 transition-transform duration-300 rounded-lg"/>
                                    <div className="flex flex-col justify-start items-start">
                                        <CardHeader className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                        3º lugar em Dermato na <span className="text-[#9FD8CB]">USP São Paulo</span>
                                        </CardHeader>
                                        <p className="text-gray-600 text-base md:text-lg">
                                        Aprovada em primeira chamada na prova de Dermatologia para USP São Paulo
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>
                </SectionContainer>
    );
}