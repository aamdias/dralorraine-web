import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import Image from "next/image";

export const HomeBanner = () => {
    return (
        <SectionContainer className="page-banner--container py-16">
            <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                {/* Appear First */}
                <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                    <BadgeGroup alignment="center">
                        <BadgeMessage>Sobre mim</BadgeMessage>
                    </BadgeGroup>
                </MotionBTTContainer>
                {/* Appear Second */}
                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <PageTitle className="text-center mx-auto" type="heavy">
                        Oi! Sou a <span className="text-[#D0B49B]">Lorraine</span>.
                    </PageTitle>
                </MotionBTTContainer>
                {/* Appear Third */}
                <MotionBTTContainer transition={{ delay: 0.6, duration: 0.5 }}>
                    <Content className="text-center" alignment="center">
                        <p>
                            <span className="font-bold">Sou médica pela UNICAMP</span> e depois de muito esforço, consegui acumular
                            um dos melhores resultados de aprovação para residência médica em
                            Dermatologia em 2023 nas instituições mais concorridas do Brasil.{" "}
                        </p>
                    </Content>
                    <div className="page-banner--image">
                        <Image
                            src="/lolo-portrait-home-page.png"
                            width={340}
                            height={512}
                            alt="Page Banner"
                            objectFit="cover"
                            className="mx-auto mt-4"
                        />
                    </div>
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
                </MotionBTTContainer>
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
