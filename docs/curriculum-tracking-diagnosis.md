# Diagnóstico do tracking de currículo — 21/10/2026

## Evidências na conta e no site

- Pixel publicado e selecionado na conta: `942080827985314` (`fb-pixel-mentoria-qsd`). Não era um ID divergente no deploy atual.
- O Meta mostrava 129 PageViews, 11 `CurriculumInterest` e 9 `CurriculumCTAClick` no período selecionado de 23/09 a 20/10.
- A conversão `1168597245699794` ("Currículo | Visita ao formulário de interesse") estava ativa, com 9 ocorrências. Sua regra é URL contendo `www.dralorraine.com/curriculo/interesse`; isso mede visita, não formulário enviado nem venda. Não é possível atribuir essas 9 visitas à campanha apenas por essa tela.
- O print da campanha mostrava 3.782 impressões, alcance de 3.677 e gasto de R$33,39. Impressões não são visitas à landing page.
- O relatório terminava em 20/10. Mesmo após incluir 21/10, os dois conjuntos 7b/7c permaneceram sem resultados atribuídos.
- Em Diagnóstico, o Meta lista `www.dralorraine.com` em "Sites bloqueados", com aviso de impacto na otimização. Em categorias, `dralorraine.com` consta como "Prestador de serviços de saúde e bem-estar", em configuração básica e com alguns eventos padrão bloqueados. A tela não especificou quais eventos padrão estão bloqueados.
- Também há um aviso de confirmação de domínios para `dralorraine.com` e `queroserdermato.com.br`. Esse aviso não comprova, sozinho, a causa do zero atribuído.
- O JavaScript publicado não tratava `Tally.FormSubmitted`. A integração oficial do Tally emite essa mensagem ao concluir o formulário: https://developers.tally.so/widgets/events.

## Correção no site

O formulário confirmado passa a emitir `generate_lead` no Google Analytics e `curriculum_lead_submitted` no PostHog (quando configurado). A mensagem precisa vir de `https://tally.so`, do iframe identificado e do formulário `EkjBgl`. Cada envio é contado uma vez por sessão. Respostas, contato e identificador da submissão não são enviados aos analytics.

Visita ao formulário continua separada de lead. Não se emite Purchase para conversa no WhatsApp nem para proposta em negociação. A correção não reconstrói eventos passados, confirma pagamento nem prova que uma conversa foi atribuída pelo Meta.

Não foi acrescentado um Lead disfarçado de evento personalizado nem uma URL de agradecimento para contornar o bloqueio do Meta. O domínio continua onde o usuário escolheu mantê-lo.

## Validação

`node --test tests/tracking/curriculum.test.mjs` reproduz a falha na versão anterior e passa com a correção. Cobre registro/limpeza do listener real de Marketing, envio confirmado, ausência de duplicação, rejeição de mensagens inválidas, ausência de dados pessoais e funcionamento antes de carregar o pixel.

Lint dos arquivos alterados e build de produção passaram. Nenhum formulário real foi enviado: isso criaria um contato fictício e poderia disparar notificações. É necessário confirmar a recepção do próximo envio legítimo no Analytics/PostHog e, separadamente, validar eventos e atribuição no Meta após a análise do bloqueio.

## Texto para revisão junto ao suporte da Meta

> Nosso domínio dralorraine.com reúne serviços médicos e serviços educacionais para médicos. Não solicitamos a retirada das proteções aplicáveis às consultas, aos pacientes ou a dados de saúde. O anúncio em questão promove especificamente https://www.dralorraine.com/curriculo, serviço de elaboração e organização de currículo para processos seletivos de residência. O Diagnóstico do conjunto 942080827985314 lista www.dralorraine.com entre os sites bloqueados. Poderiam revisar o tratamento dessa área educacional e informar quais eventos de mensuração e otimização são permitidos nesse domínio misto? Precisamos medir interesse e formulário concluído sem compartilhar respostas, informações clínicas ou dados sensíveis. A conversão atual 1168597245699794 mede somente visita ao formulário e não deve ser interpretada como venda.

A categoria global de prestador de saúde não deve ser negada: ela descreve parte real do site. Se o Meta mantiver a restrição para todo o domínio, permanecer nele mantém essa limitação. Não há alteração de JavaScript que garanta a remoção de um bloqueio aplicado pelo Meta.
