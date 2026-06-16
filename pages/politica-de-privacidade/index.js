import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <Layout>
            <SEO
                title="Política de Privacidade | Dra. Lorraine"
                description="Como tratamos seus dados pessoais, incluindo dados sensíveis de saúde, em conformidade com a LGPD."
            />
            <div className="main-wrapper bg-[#FBF7F2] pt-28 pb-20 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 sm:p-12">
                        <div className="text-xs font-semibold text-[#0f766e] uppercase tracking-wider mb-3">
                            Versão 1.0 · RASCUNHO (aguardando revisão jurídica)
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">
                            Política de Privacidade
                        </h1>

                        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-700 leading-relaxed">
                            <p className="text-sm text-zinc-500">
                                Última atualização: [data a definir]
                            </p>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    1. Quem somos
                                </h2>
                                <p>
                                    Esta Política descreve como a Dra. Lorraine
                                    Souza, médica inscrita no CRM-SP sob o nº [a
                                    definir] e R3 em Dermatologia na UNICAMP,
                                    trata os dados pessoais dos
                                    pacientes atendidos através deste site em
                                    conformidade com a Lei Geral de Proteção de
                                    Dados (Lei nº 13.709/2018 — LGPD) e a
                                    Resolução CFM nº 2.314/2022.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    2. Quais dados coletamos
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        <strong>Dados de identificação:</strong>{" "}
                                        nome, e-mail, telefone, data de
                                        nascimento, cidade.
                                    </li>
                                    <li>
                                        <strong>
                                            Dados sensíveis de saúde:
                                        </strong>{" "}
                                        queixa principal, histórico clínico,
                                        alergias, medicamentos, condições
                                        preexistentes, tipo de pele.
                                    </li>
                                    <li>
                                        <strong>Imagens:</strong> fotografias da
                                        pele enviadas por você para fins de
                                        avaliação clínica.
                                    </li>
                                    <li>
                                        <strong>Dados de pagamento:</strong>{" "}
                                        processados diretamente pelo provedor de
                                        pagamento, sem que armazenemos dados de
                                        cartão.
                                    </li>
                                    <li>
                                        <strong>Dados de navegação:</strong>{" "}
                                        cookies, endereço IP, páginas visitadas,
                                        para fins de análise e melhoria do
                                        serviço.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    3. Para que usamos seus dados
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Prestar o atendimento em dermatologia
                                        solicitado.
                                    </li>
                                    <li>
                                        Emitir prontuário, receitas e recibos.
                                    </li>
                                    <li>
                                        Enviar lembretes, confirmações e
                                        informações relacionadas à sua consulta.
                                    </li>
                                    <li>
                                        Cumprir obrigações legais e regulatórias.
                                    </li>
                                </ul>
                                <p>
                                    <strong>
                                        Não utilizamos seus dados para finalidades
                                        comerciais não relacionadas ao atendimento
                                        sem o seu consentimento específico.
                                    </strong>
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    4. Base legal
                                </h2>
                                <p>
                                    O tratamento de dados sensíveis de saúde se
                                    baseia no{" "}
                                    <strong>
                                        consentimento específico e destacado
                                    </strong>{" "}
                                    (art. 11, I da LGPD) e na{" "}
                                    <strong>
                                        tutela da saúde em procedimento
                                        realizado por profissional da área
                                    </strong>{" "}
                                    (art. 11, II, &ldquo;f&rdquo; da LGPD).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    5. Como seus dados são protegidos
                                </h2>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Armazenamento em servidores com
                                        criptografia em trânsito e em repouso.
                                    </li>
                                    <li>
                                        Acesso restrito à equipe clínica
                                        autorizada.
                                    </li>
                                    <li>
                                        Fotografias armazenadas em ambiente
                                        privado com acesso por URL assinada e
                                        expiração.
                                    </li>
                                    <li>
                                        Registros de acesso e auditoria.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    6. Retenção
                                </h2>
                                <p>
                                    O prontuário médico é retido pelo prazo mínimo
                                    de 20 anos, conforme a Resolução CFM nº
                                    1.821/2007. Demais dados são retidos pelo
                                    tempo necessário para cumprir as finalidades
                                    descritas ou obrigações legais.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    7. Seus direitos (LGPD)
                                </h2>
                                <p>Você pode a qualquer momento solicitar:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Confirmação da existência de tratamento.</li>
                                    <li>Acesso aos seus dados.</li>
                                    <li>Correção de dados incompletos ou inexatos.</li>
                                    <li>
                                        Anonimização, bloqueio ou eliminação de
                                        dados desnecessários (exceto quando há
                                        obrigação legal de guarda).
                                    </li>
                                    <li>Portabilidade.</li>
                                    <li>
                                        Revogação do consentimento a qualquer
                                        tempo.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                                    8. Contato
                                </h2>
                                <p>
                                    Para exercer seus direitos ou tirar dúvidas,
                                    entre em contato com o encarregado pelo
                                    tratamento de dados:{" "}
                                    <strong>[e-mail de contato a definir]</strong>
                                    .
                                </p>
                            </section>

                            <section className="pt-6 border-t border-zinc-100">
                                <Link
                                    href="/consulta"
                                    className="text-[#0f766e] font-medium hover:underline"
                                >
                                    ← Voltar para a consulta
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
