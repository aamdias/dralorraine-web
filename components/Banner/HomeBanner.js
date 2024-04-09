import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import Image from "next/image";
import { useRouter } from "next/router";

export const HomeBanner = () => {

    const router = useRouter();

    return (
        <SectionContainer className="page-banner--container flex items-center justify-center bg-gradient-to-b from-[#F3F5F8] to-white">
            <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                {router.pathname === "/" && (
                    <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                        <BadgeGroup alignment="center">
                            <BadgeMessage>Sobre mim</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>
                )}
                {/* Appear Second */}
                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                <div className="flex flex-col md:flex-row items-center justify-between px-6 pt-12 ">
                    <div className="flex flex-col space-y-6 md:w-1/2">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Oi! Sou a <span className="text-[#D0B49B]">Lô</span>.
                    </h1>
                    <p className="text-lg md:max-w-[264px] lg:max-w-[440px] font-sans text-gray-700">
                        <span className="font-bold">Sou médica pela UNICAMP</span> e, após muito esforço, alcancei um dos melhores resultados de aprovação para a residência médica em Dermatologia em 2023, nas instituições mais renomadas do Brasil.
                    </p>
                    {router.pathname === "/" && (
                    <ButtonGroup alignment="start">
                        <a
                            role="button"
                            href="#solutions"
                            className="btn btn--secondary"
                        >
                            Como posso te ajudar
                        </a>
                        <Button href="#personal-history">Conheça minha história</Button>
                    </ButtonGroup>
                    )}
                    </div>
                    <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
                    <Image
                        src="/lolo-portrait-home-page.png"
                        alt="Dra. Lorraine"
                        className="max-w-xs md:max-w-md rounded-lg"
                    />
                    </div>
                </div>
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
            </SectionContainer>
        </SectionContainer>
    );
};
