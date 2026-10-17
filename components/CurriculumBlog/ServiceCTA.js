import Link from "next/link";
import { CURRICULUM_OFFER } from "@data/curriculum";
import { Chevron } from "@components/Chevron";

export default function ServiceCTA() {
    return (
        <section className="bg-ink py-16 text-paper sm:py-24">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-24 lg:px-8">
                <div>
                    <p className="mb-5 text-base uppercase tracking-label text-rose">
                        Da leitura à organização
                    </p>
                    <h2 className="mb-6 font-display text-4xl font-light leading-[1.05] sm:text-5xl">
                        Sua trajetória merece uma apresentação{" "}
                        <span className="italic text-rose">cuidadosa</span>.
                    </h2>
                    <p className="mb-0 max-w-xl text-lg leading-8 text-paper/80">
                        Organizamos suas experiências e comprovantes em um
                        currículo personalizado para a instituição escolhida,
                        com revisão e suporte para ajustes.
                    </p>
                </div>
                <div className="border-t border-paper/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                    <p className="mb-2 text-3xl text-paper">
                        {CURRICULUM_OFFER.label}{" "}
                        <span className="text-base text-paper/75">
                            {CURRICULUM_OFFER.unit}
                        </span>
                    </p>
                    <p className="mb-7 mt-0 text-base leading-6 text-paper/75">
                        {CURRICULUM_OFFER.scope}. A nota depende da trajetória e
                        dos critérios da banca.
                    </p>
                    <Link
                        href="/curriculo#servico"
                        className="inline-flex items-center gap-6 bg-paper px-7 py-[18px] text-base font-medium text-ink transition-colors hover:bg-rose"
                    >
                        Conhecer o serviço <Chevron />
                    </Link>
                </div>
            </div>
        </section>
    );
}
