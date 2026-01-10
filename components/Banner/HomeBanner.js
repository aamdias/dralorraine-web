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
        <SectionContainer className="page-banner--container flex items-center justify-center bg-gradient-to-b from-[#F3F5F8] to-white mt-2">
            <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                {router.pathname === "/" && (
                    <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                        <BadgeGroup alignment="center" className="mb-6">
                            <BadgeMessage>Sobre mim</BadgeMessage>
                        </BadgeGroup>
                    </MotionBTTContainer>
                )}
                {/* Appear Second */}
                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                <div className="flex flex-col md:flex-row items-center justify-between px-2 pt-2 ">
                    <div className="flex flex-col space-y-6 md:w-1/2">
                    <h1 className="text-5xl md:text-5xl text-center md:text-left font-bold text-gray-800 mb-2 pt-12">
                        Oi! Sou a <span className="text-[#9FD8CB]">Lorraine</span>.
                    </h1>
                    <p className="text-lg md:max-w-[264px] lg:max-w-[440px] text-center md:text-left  font-sans text-gray-700">
                        <span className="font-bold">Sou médica pela UNICAMP</span> e, após muito esforço, alcancei um dos melhores resultados de aprovação para a residência médica em Dermatologia em 2023, nas instituições mais renomadas do Brasil.
                    </p>
                    {router.pathname === "/" && (
                    <ButtonGroup className="justify-center md:justify-start">
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
    );
};
