import SEO from "@components/SEO/SEO";

export default function InteresseCurriculo({ formUrl }) {
    return (
        <>
            <SEO
                title="Interesse em currículo para residência | Dra. Lorraine"
                description="Fale com a equipe sobre seu currículo para residência médica e a mentoria com a Dra. Lorraine."
                url="/curriculo/interesse"
                noindex
            />
            <main className="fixed inset-0 bg-paper">
                <iframe
                    data-curriculum-form="EkjBgl"
                    src={formUrl}
                    title="Interesse em currículo para residência médica"
                    className="block h-full w-full border-0"
                    width="100%"
                    height="100%"
                />
            </main>
        </>
    );
}

export function getServerSideProps({ query }) {
    const formUrl = new URL("https://tally.so/embed/EkjBgl");
    formUrl.searchParams.set("transparentBackground", "1");
    formUrl.searchParams.set("originPage", "/curriculo/interesse");
    ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach(
        (key) => {
            if (typeof query[key] === "string") {
                formUrl.searchParams.set(key, query[key]);
            }
        }
    );

    return { props: { formUrl: formUrl.toString() } };
}
