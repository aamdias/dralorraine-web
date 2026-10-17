// Verified against the 2027 direct-entry edital and primary sources on 17 October 2026.
export const unicampCriteria = [
    {
        id: "faculdade-capes",
        title: "Pós-graduação da faculdade de origem",
        short: "Pós-graduação da faculdade",
        points: 15,
        page: 6,
        meaning:
            "Aqui, a banca olha para a faculdade em que você cursou Medicina. O item considera seus programas de mestrado e doutorado em Medicina aceitos pela CAPES, a instituição que avalia a pós-graduação no Brasil.",
        example:
            "Sua faculdade tem um programa de doutorado em Medicina reconhecido pela CAPES. É essa estrutura da instituição que precisa ser comprovada, mesmo que você nunca tenha cursado uma pós-graduação.",
        scores: [
            ["Faculdade com doutorado stricto sensu", 15],
            ["Faculdade com mestrado stricto sensu", 10]
        ],
        documents:
            "Peça uma declaração à faculdade, identificando os programas e os locais, com nome, endereço e telefone. O edital prevê assinatura do diretor, da comissão de ensino de graduação ou da comissão de pós-graduação.",
        question: "Preciso ter mestrado ou doutorado?",
        answer: "Não. O critério é sobre a sua faculdade de graduação. Uma especialização pessoal ou um MBA não substitui a declaração institucional. Mestrado e doutorado são alternativas dentro do teto, não pontos que se somam.",
        source: [
            "CAPES: como funciona a avaliação",
            "https://www.gov.br/capes/pt-br/acesso-a-informacao/perguntas-frequentes/avaliacao-da-pos-graduacao"
        ]
    },
    {
        id: "hospital-ensino",
        title: "Hospital de ensino",
        short: "Hospital de ensino",
        points: 10,
        page: 7,
        meaning:
            "É o hospital que integra a formação dos estudantes à assistência em saúde. Para este item, importa se a sua faculdade possui hospital próprio ou mantém um convênio formal com um hospital de ensino.",
        example:
            "O internato acontece no hospital universitário da faculdade ou em um hospital parceiro por convênio. Um estágio que você fez por conta própria não comprova esse vínculo institucional.",
        scores: [
            ["Hospital de ensino próprio", 10],
            ["Hospital formalmente conveniado", 5]
        ],
        documents:
            "Solicite à comissão de ensino de graduação o comprovante assinado que descreva o vínculo da faculdade com o hospital. Não deduza que ele é próprio apenas pelo nome ou pela proximidade com o campus.",
        question: "Posso somar hospital próprio e conveniado?",
        answer: "O teto do grupo é de 10 pontos. As duas situações não devem ser somadas para chegar a 15. Este item descreve a estrutura da sua faculdade, não um certificado pessoal de estágio."
    },
    {
        id: "iniciacao-cientifica",
        title: "Iniciação científica",
        short: "Iniciação científica",
        points: 20,
        page: 7,
        meaning:
            "É a participação do graduando em um projeto de pesquisa, com orientação e aprendizado de métodos de investigação. Pode ter bolsa, como no PIBIC, ou ser voluntária: a ausência de pagamento não faz a pesquisa deixar de ser uma IC.",
        example:
            "Você desenvolveu um projeto sob orientação de um professor, com início, fim e participação formalmente registrados. A pesquisa pode ser clínica, de laboratório ou de outra natureza; precisa ser demonstrável.",
        scores: [
            ["Com bolsa · mais de 2 semestres letivos", 20],
            ["Com bolsa · até 2 semestres letivos", 15],
            ["Sem bolsa · mais de 2 semestres letivos", 10],
            ["Sem bolsa · até 2 semestres letivos", 5]
        ],
        documents:
            "Com bolsa, reúna o comprovante institucional e o da agência ou instituição que a concedeu, com período, projeto e orientador. Sem bolsa, o certificado institucional precisa registrar também a carga horária e a assinatura do orientador.",
        question: "Meu TCC conta como iniciação científica?",
        answer: "Não automaticamente. O TCC, sozinho, não comprova o vínculo formal de IC. Também não presuma a soma de projetos ou de períodos sobrepostos: essa combinação não está esclarecida no edital. Exatamente dois semestres entra na faixa “até 2”.",
        source: [
            "CNPq: entenda o PIBIC",
            "https://www.gov.br/cnpq/pt-br/acesso-a-informacao/acoes-e-programas/programas/programas-ict/pibic"
        ]
    },
    {
        id: "artigos",
        title: "Artigo científico completo",
        short: "Artigos científicos",
        points: 15,
        page: 7,
        meaning:
            "É um trabalho completo publicado ou formalmente aceito por um periódico científico, com seu nome entre os autores. Ele é diferente de um resumo em anais de congresso. O edital também considera em qual base o periódico é indexado.",
        example:
            "Seu artigo foi aceito pela revista e você tem o aceite, a identificação dos autores, o DOI e a informação de indexação. Um manuscrito que ainda está em avaliação não é um artigo aceito.",
        scores: [
            ["Artigo completo publicado ou aceito · PubMed", 10],
            ["Artigo completo publicado ou aceito · SciELO", 5]
        ],
        documents:
            "Separe o registro de aceite ou publicação, os dados que identificam você entre os autores, o DOI e a comprovação de indexação do periódico. Publicações distintas são consideradas até o teto do grupo.",
        question: "Ter DOI ou aparecer um resumo no PubMed basta?",
        answer: "DOI é um identificador, não uma prova de indexação. O PubMed costuma exibir o resumo de um artigo completo; isso não o transforma em resumo de congresso. Também não conte o mesmo artigo duas vezes por estar em duas bases.",
        source: [
            "NLM: o que é o PubMed",
            "https://pubmed.ncbi.nlm.nih.gov/about/"
        ]
    },
    {
        id: "congressos",
        title: "Trabalho apresentado em congresso",
        short: "Trabalhos em congressos",
        points: 10,
        page: 7,
        meaning:
            "O item avalia um trabalho comunicado em apresentação oral ou pôster, com autoria ou coautoria identificada. Comparecer ao evento como ouvinte é uma experiência diferente de ter um trabalho apresentado.",
        example:
            "Seu nome aparece entre os coautores de um pôster apresentado no congresso. A redação contempla coautoria; não exige que todos os coautores tenham sido pessoalmente os apresentadores.",
        scores: [
            ["Congresso de sociedade médica nacional/internacional · oral", 10],
            [
                "Congresso de sociedade médica nacional/internacional · pôster",
                6
            ],
            ["Congresso médico acadêmico local/regional · oral ou pôster", 2]
        ],
        documents:
            "O certificado deve permitir conferir o evento, o trabalho, seu nome como autor ou coautor e a modalidade. Verifique quem organiza o congresso; o nome em inglês ou o local de realização não determina sozinho o enquadramento.",
        question: "O certificado de presença no congresso serve?",
        answer: "Um certificado genérico de participação não demonstra que houve trabalho apresentado nem sua autoria. Procure o documento específico da apresentação. Trabalhos distintos são considerados até atingir o teto de 10 pontos."
    },
    {
        id: "liga",
        title: "Liga acadêmica",
        short: "Liga acadêmica",
        points: 5,
        page: 8,
        meaning:
            "É uma organização acadêmica de estudantes com orientação docente e atividades de ensino, pesquisa ou extensão em uma área. O vínculo continuado com a liga é diferente de assistir a um evento promovido por ela.",
        example:
            "Você foi ligante na mesma liga durante dois semestres e consegue demonstrar as atividades desse período. Uma palestra isolada não comprova essa participação continuada.",
        scores: [["Pelo menos 2 semestres na mesma liga", 5]],
        documents:
            "Reúna o certificado com o período de participação em semestres e o relatório das atividades desenvolvidas, emitido pelo coordenador médico da liga.",
        question: "Um semestre em cada liga completa o mínimo?",
        answer: "O edital pede pelo menos dois semestres na mesma liga. Também não presuma que uma atividade da liga possa receber pontos novamente em extensão: a dupla contagem do mesmo trabalho não está autorizada de forma expressa.",
        source: [
            "FCM: um exemplo de liga acadêmica",
            "https://fcm.unicamp.br/fcm/liga-do-trauma/apresentacao-0"
        ]
    },
    {
        id: "monitoria",
        title: "Monitoria e Centro de Controle de Intoxicações",
        short: "Monitoria / CCI",
        points: 5,
        page: 8,
        meaning:
            "Na monitoria, o estudante apoia atividades de ensino sob supervisão de um professor, como práticas e atendimento de dúvidas de uma disciplina. Na Unicamp, o PAD é o Programa de Apoio Didático.",
        example:
            "Uma monitoria formal de Anatomia, com período, horas e supervisão registrados. A ajuda informal a colegas não demonstra, por si só, monitoria institucional.",
        scores: [
            ["Monitoria ou PAD · mais de 2 semestres letivos", 5],
            ["Monitoria ou PAD · até 2 semestres letivos", 2]
        ],
        documents:
            "Peça certificado ou declaração institucional assinada, com duração, carga horária e tipo de atividade exercida.",
        question: "Como entra uma atividade no CCI?",
        answer: "O título do grupo inclui o Centro de Controle de Intoxicações, mas as faixas descrevem monitoria/PAD. Não há faixa independente clara para CCI. Se esse for seu caso, peça esclarecimento à COREME antes de estimar a nota. O edital chama o PAD de “aperfeiçoamento didático”, embora o programa da Unicamp se chame Apoio Didático.",
        source: [
            "Unicamp: conheça o PAD",
            "https://www.prg.unicamp.br/programas/pad/sobre/"
        ]
    },
    {
        id: "extensao",
        title: "Programa ou projeto de extensão",
        short: "Projetos de extensão",
        points: 10,
        page: 8,
        meaning:
            "A extensão aproxima o conhecimento da universidade de outros setores da sociedade, com troca de saberes. Um projeto de educação em saúde construído com uma comunidade é um exemplo dessa relação.",
        example:
            "Você participou de um projeto institucional de educação em saúde, com função, duração e horas documentadas. Ser voluntário não identifica automaticamente uma atividade como projeto de extensão.",
        scores: [
            ["Mais de 96 horas de atividades", 10],
            ["Mais de 48 e menos de 96 horas", 5]
        ],
        documents:
            "Separe o certificado institucional do programa ou projeto, com duração e tipo de atividade, e a informação da carga horária total. O edital exclui atividades diretamente relacionadas às atividades regulares da graduação.",
        question: "E extensão obrigatória, ou exatamente 48 ou 96 horas?",
        answer: "A existência de extensão curricularizada não garante enquadramento neste item. Além disso, a redação das faixas não define expressamente exatamente 48 ou 96 horas. Não arredonde os números nem invente um limite inclusivo; consulte os esclarecimentos da edição.",
        source: [
            "Unicamp: extensão e diálogo com a sociedade",
            "https://www.proec.unicamp.br/o-lugar-da-extensao-na-universidade-esteve-em-debate-na-ii-mostra-de-extensao-da-faculdade-de-ciencias-medicas/"
        ]
    },
    {
        id: "colegiados",
        title: "Representação em colegiados institucionais",
        short: "Colegiados institucionais",
        points: 5,
        page: 8,
        meaning:
            "Colegiados são órgãos coletivos que participam de decisões e do acompanhamento da instituição. Conselho de departamento, Congregação e comissão de graduação são exemplos. Aqui, importa sua atuação formal como representante discente.",
        example:
            "Você teve mandato como representante dos estudantes na comissão de graduação. Representar a turma informalmente ou assistir como convidado a uma reunião não demonstra automaticamente essa função.",
        scores: [["Representação discente · pelo menos 2 semestres", 5]],
        documents:
            "Solicite certificado institucional com período, função e assinatura da coordenação de ensino de graduação ou do órgão vinculado. Atas e nomeação podem ajudar a pedir essa certificação, sem necessariamente substituí-la.",
        question: "Diretoria do centro acadêmico entra aqui?",
        answer: "Não neste grupo. O edital exclui liga, centro ou diretório acadêmico, atlética e equipe esportiva deste item. A participação estudantil do grupo seguinte tem outro enquadramento.",
        source: [
            "Unicamp: entenda seus colegiados",
            "https://www.sg.unicamp.br/eleicoes/graduacao/2026/o-que-e-o-consu-a-ccg-e-a-cce"
        ]
    },
    {
        id: "vida-estudantil",
        title: "Centro acadêmico, atlética, equipe esportiva e bateria",
        short: "Vida e organização estudantil",
        points: 5,
        page: 9,
        meaning:
            "Este grupo trata da organização e da vida estudantil: representação pelo centro acadêmico, gestão da atlética e participação em equipe esportiva universitária ou bateria. Para centro acadêmico e atlética, o edital especifica diretoria.",
        example:
            "Você ocupou um cargo na diretoria do centro acadêmico ou integrou uma equipe universitária por pelo menos dois semestres. Ir a jogos, festas ou ensaios isolados não demonstra esse cargo ou vínculo.",
        scores: [
            [
                "Diretoria de centro ou diretório acadêmico · 2 semestres ou mais",
                2
            ],
            ["Diretoria de atlética · 2 semestres ou mais", 2],
            [
                "Equipe esportiva universitária ou bateria · 2 semestres ou mais",
                1
            ]
        ],
        documents:
            "Reúna a certificação emitida pela instituição com período e cargo. Confira se o texto demonstra a função efetivamente exercida, e não apenas a condição de associado.",
        question: "Participação e diretoria são a mesma coisa?",
        answer: "Não. Nos dois primeiros casos, o documento precisa demonstrar o cargo na diretoria. O teto do grupo é 5 pontos; atividades distintas e adequadamente comprovadas são consideradas dentro desse limite."
    }
];
