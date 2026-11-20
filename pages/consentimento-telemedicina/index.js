import { Layout } from "@components/Layout";
import { PageIntro } from "@components/Layout/PageIntro";
import SEO from "@components/SEO/SEO";
import Link from "next/link";

export default function TelemedicineConsent() {
    return (
        <Layout>
            <SEO
                title="Consentimento para Telemedicina | Dra. Lorraine"
                description="Termo de consentimento informado para atendimento em dermatologia por telemedicina, conforme a Resolução CFM 2.314/2022."
                url="/consentimento-telemedicina"
            />
            <PageIntro
                compact
                eyebrow="Versão 1.0 · RASCUNHO (aguardando revisão jurídica)"
                title="Termo de Consentimento para Telemedicina"
            />
            <article className="mx-auto max-w-3xl space-y-6 px-5 py-12 leading-relaxed text-slate sm:px-8 sm:py-16">
                <p className="text-sm text-stone">
                    Última atualização: [data a definir]
                </p>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        1. O que é a telemedicina
                    </h2>
                    <p>
                        Telemedicina é o exercício da Medicina
                        mediado por Tecnologias Digitais, de
                        Informação e de Comunicação (TDICs), para
                        fins de assistência, educação, pesquisa,
                        prevenção de doenças e lesões, gestão e
                        promoção da saúde, conforme a{" "}
                        <strong>
                            Resolução CFM nº 2.314/2022
                        </strong>
                        .
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        2. Como será o atendimento
                    </h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            A consulta será realizada por
                            videochamada, em plataforma segura.
                        </li>
                        <li>
                            A médica utilizará as informações
                            fornecidas no formulário, as fotografias
                            enviadas e a videoconsulta para formular
                            seu diagnóstico e plano de tratamento.
                        </li>
                        <li>
                            Quando necessário, poderá ser emitida
                            receita eletrônica com assinatura
                            digital válida.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        3. Limitações da teleconsulta
                    </h2>
                    <p>Reconheço e compreendo que:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            A teleconsulta pode ter limitações em
                            comparação com a consulta presencial,
                            especialmente na ausência de exame
                            físico direto.
                        </li>
                        <li>
                            Algumas condições podem exigir
                            avaliação presencial, exames
                            complementares ou procedimentos que não
                            podem ser realizados remotamente.
                        </li>
                        <li>
                            Caso a médica identifique tal
                            necessidade, serei orientado(a) a
                            procurar avaliação presencial.
                        </li>
                        <li>
                            Problemas técnicos (conexão, áudio,
                            vídeo) podem interferir no atendimento
                            e exigir reagendamento.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        4. Urgências e emergências
                    </h2>
                    <p>
                        <strong>
                            A teleconsulta NÃO é adequada para
                            situações de urgência ou emergência.
                        </strong>{" "}
                        Em caso de urgência médica, devo procurar
                        imediatamente um pronto-socorro ou acionar
                        o SAMU (192).
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        5. Privacidade e sigilo
                    </h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            O sigilo médico é preservado conforme o
                            Código de Ética Médica.
                        </li>
                        <li>
                            Meus dados clínicos e fotografias são
                            armazenados de forma criptografada e
                            com acesso restrito, conforme a{" "}
                            <Link
                                href="/politica-de-privacidade"
                                className="text-[#0f766e] underline"
                            >
                                Política de Privacidade
                            </Link>
                            .
                        </li>
                        <li>
                            A consulta não será gravada, salvo com
                            meu consentimento expresso e adicional.
                        </li>
                        <li>
                            Comprometo-me a estar em ambiente
                            privado durante a consulta.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        6. Prontuário
                    </h2>
                    <p>
                        Será mantido prontuário médico eletrônico
                        com os registros da consulta, conforme a
                        Resolução CFM nº 1.821/2007, com retenção
                        mínima de 20 anos.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        7. Direito de escolha
                    </h2>
                    <p>
                        Posso, a qualquer momento, optar pelo
                        atendimento presencial e interromper a
                        teleconsulta se assim desejar. Posso
                        também revogar este consentimento, sem
                        prejuízo do atendimento já realizado.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-3xl font-light leading-tight text-ink">
                        8. Declaração
                    </h2>
                    <p>
                        Declaro que li e compreendi as informações
                        acima, tive oportunidade de esclarecer
                        dúvidas, e consinto livremente em realizar
                        o atendimento por telemedicina com a Dra.
                        Lorraine Souza (CRM-SP [a definir]).
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
