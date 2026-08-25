import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const visuals = {
    "toxina-botulinica": {
        title: "Como a toxina age entre o nervo e o músculo",
        intro: "Para um músculo se contrair, o nervo libera acetilcolina na junção neuromuscular. A toxina reduz temporariamente a liberação dessa mensagem nos pontos tratados.",
        caption: "Esquema educativo e simplificado. Os músculos tratados, os pontos e as doses dependem da avaliação individual.",
        mediaLabel: "Sequência em quatro quadros mostrando aplicação em músculo selecionado, redução da liberação de acetilcolina, menor contração muscular e suavização de uma linha dinâmica",
        image: "/blog-botox-como-age.png",
        imageWidth: 1792,
        imageHeight: 896,
        steps: [
            { title: "Aplicação direcionada", text: "Depois de observar anatomia e movimento, a médica aplica pequenas quantidades nos músculos selecionados." },
            { title: "Menos sinal nervoso", text: "No terminal do nervo, a toxina reduz a liberação de acetilcolina. Ela não preenche a pele nem bloqueia os receptores do músculo." },
            { title: "Menor contração", text: "Com menos mensagem chegando à fibra muscular, o músculo tratado contrai com menos força por um período." },
            { title: "Linha dinâmica mais suave", text: "Com menos dobra repetida sobre a pele, a linha que aparece com a expressão pode suavizar de forma gradual e temporária." }
        ]
    },
    "bioestimulador-de-colageno": {
        title: "Por que o resultado é gradual",
        caption: "A animação simplifica as camadas da pele. Produto, região e cronograma variam conforme a indicação.",
        mediaLabel: "Animação mostrando a aplicação do bioestimulador e a formação gradual de fibras de colágeno",
        steps: [
            { title: "Aplicação planejada", text: "O produto e os pontos são definidos depois da avaliação da pele e da anatomia." },
            { title: "Resposta ao longo do tempo", text: "O objetivo é estimular um processo gradual, não criar uma mudança imediata." },
            { title: "Evolução acompanhada", text: "Qualidade e firmeza são reavaliadas ao longo do plano indicado para cada pessoa." }
        ]
    },
    "preenchimento-com-acido-hialuronico": {
        title: "Preencher não significa aumentar tudo",
        caption: "Os pontos no rosto são apenas ilustrativos. A indicação muda conforme proporção, anatomia e objetivo.",
        mediaLabel: "Animação mostrando a avaliação de pontos específicos de suporte em um perfil facial",
        steps: [
            { title: "Leitura do rosto inteiro", text: "A avaliação considera proporções, contornos e o que você deseja preservar." },
            { title: "Pontos específicos", text: "O ácido hialurônico pode oferecer suporte ou volume onde existe indicação." },
            { title: "Integração aos seus traços", text: "O planejamento busca coerência com sua fisionomia, sem perseguir um rosto padrão." }
        ]
    },
    peelings: {
        title: "O que significa renovação controlada",
        caption: "A profundidade do peeling e a resposta da pele variam. Descamação visível não é a única medida de resultado.",
        mediaLabel: "Animação mostrando a renovação controlada da camada superficial da pele",
        steps: [
            { title: "Escolha do agente", text: "Tipo de pele, diagnóstico e rotina orientam qual peeling pode fazer sentido." },
            { title: "Ação na superfície", text: "O procedimento promove uma renovação controlada, com intensidade individualizada." },
            { title: "Recuperação e cuidado", text: "Fotoproteção e cuidados posteriores fazem parte do processo e do resultado." }
        ]
    },
    microagulhamento: {
        title: "Como funcionam as microperfurações controladas",
        caption: "A animação não representa profundidade real. O dispositivo, a técnica e o número de sessões dependem da avaliação.",
        mediaLabel: "Animação mostrando microperfurações controladas e o processo de reparo da pele",
        steps: [
            { title: "Perfurações pequenas", text: "O dispositivo cria microperfurações repetidas e controladas na pele." },
            { title: "Processo de reparo", text: "A pele inicia uma resposta de recuperação depois do procedimento." },
            { title: "Mudança progressiva", text: "Textura e cicatrizes são acompanhadas ao longo do plano, que pode exigir mais de uma sessão." }
        ]
    }
};

const TreatmentAnimation = ({ slug, visual }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const mediaBase = `/treatment-visuals/${slug}`;
    const isStaticImage = Boolean(visual.image);

    useEffect(() => {
        const video = videoRef.current;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!video) return undefined;

        const applyMotionPreference = () => {
            if (reducedMotion.matches) {
                video.pause();
                setIsPlaying(false);
                return;
            }

            video.play().catch(() => setIsPlaying(false));
        };

        applyMotionPreference();
        reducedMotion.addEventListener?.("change", applyMotionPreference);

        return () => reducedMotion.removeEventListener?.("change", applyMotionPreference);
    }, []);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play().catch(() => setIsPlaying(false));
        } else {
            video.pause();
        }
    };

    return (
        <figure className="-mx-4 border border-line bg-[#F7F1E8] sm:mx-0">
            <div className={isStaticImage ? "overflow-hidden bg-[#F7F1E8]" : "relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F1E8] sm:aspect-[16/10] lg:aspect-video"}>
                {isStaticImage ? (
                    <Image
                        src={visual.image}
                        alt={visual.mediaLabel}
                        width={visual.imageWidth}
                        height={visual.imageHeight}
                        className="h-auto w-full"
                    />
                ) : hasError ? (
                    <Image
                        src={`${mediaBase}.png`}
                        alt={visual.mediaLabel}
                        width={640}
                        height={480}
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={`${mediaBase}.png`}
                            aria-label={visual.mediaLabel}
                            className="h-full w-full object-contain motion-reduce:hidden"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onError={() => setHasError(true)}
                        >
                            <source src={`${mediaBase}.mp4`} type="video/mp4" />
                        </video>
                        <Image
                            src={`${mediaBase}.png`}
                            alt={visual.mediaLabel}
                            width={640}
                            height={480}
                            className="hidden h-full w-full object-contain motion-reduce:block"
                        />
                    </>
                )}
            </div>

            <figcaption className="flex flex-col gap-5 border-t border-line bg-sand px-5 py-5 text-xs leading-5 text-stone sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <span className="max-w-2xl">{visual.caption}</span>
                {isStaticImage ? (
                    <a href={visual.image} target="_blank" rel="noreferrer" className="w-fit shrink-0 border-b border-copper-dark text-copper-dark hover:text-ink">Ampliar imagem</a>
                ) : !hasError && (
                    <button
                        type="button"
                        onClick={togglePlayback}
                        className="inline-flex min-h-11 w-fit shrink-0 items-center border border-copper-dark px-4 font-medium text-copper-dark transition-colors hover:bg-copper-dark hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-dark focus-visible:ring-offset-4 motion-reduce:hidden"
                        aria-label={isPlaying ? "Pausar animação" : "Reproduzir animação"}
                    >
                        {isPlaying ? "Pausar" : "Reproduzir"}
                    </button>
                )}
            </figcaption>
        </figure>
    );
};

export const TreatmentVisual = ({ slug }) => {
    const visual = visuals[slug];
    if (!visual) return null;

    return (
        <section className="mt-20 border-t border-line pt-16 sm:mt-24 sm:pt-20" aria-labelledby={`visual-${slug}`}>
            <p className="mb-5 text-xs font-medium uppercase tracking-label text-copper-dark">Entenda visualmente</p>
            <h2 id={`visual-${slug}`} className="max-w-5xl font-display text-[2.65rem] font-light leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.5rem]">{visual.title}</h2>
            {visual.intro && <p className="mt-7 max-w-3xl text-lg leading-8 text-stone">{visual.intro}</p>}

            <div className="mt-10 sm:mt-14">
                <TreatmentAnimation slug={slug} visual={visual} />

                <ol className={`-mx-4 m-0 grid list-none gap-px border-x border-b border-line bg-line p-0 sm:mx-0 ${visual.steps.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
                    {visual.steps.map((step, index) => (
                        <li key={step.title} className="bg-sand px-5 py-8 sm:px-8 md:min-h-[17rem] lg:px-10 lg:py-10">
                            <span aria-hidden className="font-display text-2xl leading-none text-copper-dark">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-6 font-display text-[2rem] font-light leading-[1.05] text-ink lg:text-4xl">{step.title}</h3>
                            <p className="mt-5 text-sm leading-7 text-stone sm:text-base">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};
