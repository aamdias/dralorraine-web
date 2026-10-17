import Link from "next/link";
import { Chevron } from "@components/Chevron";
import { unicampArticle } from "@data/curriculum";

export default function ArticleCard() {
    return (
        <Link
            href={unicampArticle.href}
            className="group grid border-y border-line transition-colors hover:bg-sand/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-copper-dark md:grid-cols-[0.8fr_1.2fr]"
        >
            <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden bg-sand p-8 sm:p-10">
                <span className="text-xs font-medium uppercase tracking-label text-copper-dark">
                    Guia do edital · Acesso direto
                </span>
                <div className="my-8">
                    <span className="block font-display text-4xl leading-none text-ink sm:text-6xl md:text-4xl lg:text-5xl xl:text-7xl">
                        UNICAMP
                    </span>
                    <span className="mt-3 block text-sm tracking-index text-stone">
                        RESIDÊNCIA MÉDICA / 2027
                    </span>
                </div>
                <div className="flex gap-8 border-t border-copper/40 pt-5 text-sm text-stone">
                    <span>90% prova</span>
                    <span>10% currículo</span>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-14">
                <span className="text-xs uppercase tracking-label text-copper-dark">
                    {unicampArticle.category}
                </span>
                <h3 className="mb-0 mt-5 font-display text-4xl font-light leading-[1.1] transition-colors group-hover:text-copper-dark sm:text-5xl">
                    {unicampArticle.title}
                </h3>
                <p className="my-6 leading-7 text-stone">
                    {unicampArticle.description}
                </p>
                <span className="text-sm text-stone">
                    {unicampArticle.displayDate} · {unicampArticle.readTime}
                </span>
                <span className="mt-8 inline-flex items-center gap-4 text-sm font-medium underline decoration-copper underline-offset-8">
                    Ler o guia <Chevron className="h-4 w-4 text-copper-dark" />
                </span>
            </div>
        </Link>
    );
}
