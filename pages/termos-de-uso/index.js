import { Layout } from "@components/Layout";
import { PageIntro } from "@components/Layout/PageIntro";
import SEO from "@components/SEO/SEO";
import Link from "next/link";

export default function TermsOfUse() {
    return (
        <Layout>
            <SEO
                title="Termos de Uso | Dra. Lorraine"
                description="Termos e condições do serviço de consulta online de dermatologia."
                url="/termos-de-uso"
            />
            <PageIntro
                compact
                eyebrow="Versão 1.0 · RASCUNHO (aguardando revisão jurídica)"
                title="Termos de Uso"
            />
            <article className="mx-auto max-w-3xl space-y-6 px-5 py-12 leading-relaxed text-slate sm:px-8 sm:py-16">
                <p className="text-sm text-stone">
                    Última atualização: [data a definir]
                </p>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        1. Aceitação dos termos
                    </h2>
                    <p>
                        Ao utilizar este site e contratar uma consulta
                        online, você declara ter lido, compreendido e
                        aceito estes Termos de Uso, a Política de
                        Privacidade e o Termo de Consentimento para
                        Telemedicina.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        2. Serviço oferecido
                    </h2>
                    <p>
                        O serviço consiste em uma videoconsulta
                        de dermatologia de até 40 minutos, realizada via
                        videoconferência por profissional regularmente
                        inscrito no Conselho Regional de Medicina.
                    </p>
                    <p>
                        A consulta não substitui atendimento
                        presencial quando este for clinicamente
                        indicado, e não se destina a emergências
                        médicas.{" "}
                        <strong>
                            Em situações de urgência, procure um
                            pronto-socorro ou ligue para o SAMU (192).
                        </strong>
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        3. Agendamento e pagamento
                    </h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            O agendamento depende da confirmação do
                            pagamento.
                        </li>
                        <li>
                            O valor da consulta é de R$ 350,00
                            (trezentos e cinquenta reais).
                        </li>
                        <li>
                            O pagamento é processado por provedor
                            terceirizado, com confirmação em tempo
                            real.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        4. Cancelamento e reembolso
                    </h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            Cancelamentos com antecedência superior a
                            24h: reembolso integral.
                        </li>
                        <li>
                            Cancelamentos com antecedência inferior a
                            24h: sem reembolso, mas é possível
                            reagendar uma única vez sem custo.
                        </li>
                        <li>
                            Ausência no horário marcado (&ldquo;no
                            show&rdquo;): sem reembolso.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        5. Responsabilidades do paciente
                    </h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            Fornecer informações verdadeiras e
                            completas sobre sua saúde.
                        </li>
                        <li>
                            Enviar fotografias que permitam a
                            avaliação clínica.
                        </li>
                        <li>
                            Estar em local adequado (iluminação,
                            conexão estável, privacidade) no horário
                            da consulta.
                        </li>
                        <li>
                            Seguir as orientações médicas prescritas.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        6. Suporte pós-consulta
                    </h2>
                    <p>
                        Cada consulta inclui até 14 dias de suporte
                        por mensagem para dúvidas pontuais relativas
                        à conduta prescrita. Este canal não se destina
                        a novas queixas ou urgências.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        7. Propriedade intelectual
                    </h2>
                    <p>
                        Todo conteúdo publicado neste site é de
                        titularidade da Dra. Lorraine e não pode ser
                        reproduzido sem autorização.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        8. Foro
                    </h2>
                    <p>
                        Fica eleito o foro da comarca de [cidade a
                        definir] / SP para dirimir quaisquer
                        controvérsias decorrentes destes Termos.
                    </p>
                </section>

                <section className="pt-6 border-t border-zinc-100">
                    <Link
                        href="/consulta"
                        className="font-medium text-copper-dark underline decoration-copper/60 underline-offset-4 hover:text-ink"
                    >
                        ← Voltar para a consulta
                    </Link>
                </section>
            </article>
        </Layout>
    );
}
