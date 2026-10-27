import { DomainDefinition, SchemaDefinition, YsqQuestion } from '../types/ysq';
import extractedItems from '../extracted_items.json';

export const SCALE_OPTIONS = [
  {
    value: 1,
    label: 'Completamente falso',
    sublabel: 'Nada a ver comigo',
    color: 'emerald',
  },
  {
    value: 2,
    label: 'Na maior parte falso',
    sublabel: 'Raramente a ver comigo',
    color: 'teal',
  },
  {
    value: 3,
    label: 'Mais verdadeiro do que falso',
    sublabel: 'Às vezes a ver comigo',
    color: 'amber',
  },
  {
    value: 4,
    label: 'Moderadamente verdadeiro',
    sublabel: 'Frequentemente a ver comigo',
    color: 'orange',
  },
  {
    value: 5,
    label: 'Na maioria das vezes verdadeiro',
    sublabel: 'Quase sempre a ver comigo',
    color: 'rose',
  },
  {
    value: 6,
    label: 'Descreve-me perfeitamente',
    sublabel: 'Sempre a ver comigo',
    color: 'red',
  },
];

export const DOMAINS: DomainDefinition[] = [
  {
    id: 1,
    code: 'DOM1',
    name: 'Desconexão e Rejeição',
    plainName: 'Medo de Abandono, Frieza e Solidão',
    description:
      'Dificuldade em sentir que os relacionamentos são seguros, afetuosos e duradouros. É o medo constante de ser abandonado, rejeitado, enganado ou incompreendido por quem você ama.',
    coreUnmetNeed: 'Sentir-se seguro, acolhido, amado e aceito exatamente como você é.',
    healthyGoal: 'Aprender a confiar com discernimento, expressar o que sente e construir relacionamentos recíprocos e seguros.',
    schemaIds: ['pe', 'ab', 'da', 'is', 'dv'],
    color: '#ef4444', // red-500
    bgLight: 'bg-red-50 text-red-700 border-red-200',
    borderColor: 'border-red-500',
  },
  {
    id: 2,
    code: 'DOM2',
    name: 'Autonomia e Desempenho Prejudicados',
    plainName: 'Insegurança para Decidir e se Virar Sozinho(a)',
    description:
      'Dificuldade em confiar na própria capacidade de tomar decisões, encarar desafios diários ou ter independência prática sem depender da opinião constante dos outros.',
    coreUnmetNeed: 'Autonomia, autoconfiança e incentivo para explorar o mundo com segurança.',
    healthyGoal: 'Fortalecer a autoconfiança, aprender a dar passos próprios e tolerar a incerteza normal da vida.',
    schemaIds: ['di', 'vd', 'em', 'fr'],
    color: '#f97316', // orange-500
    bgLight: 'bg-orange-50 text-orange-700 border-orange-200',
    borderColor: 'border-orange-500',
  },
  {
    id: 3,
    code: 'DOM3',
    name: 'Limites Prejudicados',
    plainName: 'Dificuldade com Limites, Disciplina e Impulsos',
    description:
      'Dificuldade em colocar rédeas nos próprios impulsos, aceitar regras e limites dos outros ou manter a autodisciplina em tarefas rotineiras de longo prazo.',
    coreUnmetNeed: 'Aprender limites realistas, tolerância ao desconforto e respeito mútuo.',
    healthyGoal: 'Desenvolver paciência, cooperação mútua e persistência para colher resultados duradouros no futuro.',
    schemaIds: ['gr', 'ai'],
    color: '#eab308', // yellow-500
    bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-500',
  },
  {
    id: 4,
    code: 'DOM4',
    name: 'Orientação para o Outro',
    plainName: 'Viver em Função dos Outros e se Anular',
    description:
      'Foco excessivo em agradar, cuidar ou obedecer aos desejos dos outros, deixando suas próprias vontades, descanso e necessidades em último plano para evitar brigas ou rejeição.',
    coreUnmetNeed: 'Liberdade para expressar o que você quer e sente, sem medo de ser punido ou abandonado.',
    healthyGoal: 'Aprender a dizer "não" com tranquilidade, colocar limites saudáveis e entender que cuidar de você não é egoísmo.',
    schemaIds: ['sb', 'as', 'ba'],
    color: '#06b6d4', // cyan-500
    bgLight: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    borderColor: 'border-cyan-500',
  },
  {
    id: 5,
    code: 'DOM5',
    name: 'Supervigilância e Inibição',
    plainName: 'Autocobrança Excessiva, Rigidez e Preocupação',
    description:
      'Viver sob constante pressão mental: medo constante de errar, pessimismo ou dificuldade de expressar sentimentos e relaxar sem culpa.',
    coreUnmetNeed: 'Direito ao descanso, prazer, espontaneidade e tolerância com as próprias imperfeições.',
    healthyGoal: 'Cultivar autocompaixão, flexibilidade diante de erros e permissão para desfrutar o presente.',
    schemaIds: ['np', 'ie', 'pi', 'pp'],
    color: '#8b5cf6', // violet-500
    bgLight: 'bg-purple-50 text-purple-800 border-purple-200',
    borderColor: 'border-purple-500',
  },
];

export const SCHEMAS: SchemaDefinition[] = [
  {
    id: 'pe',
    code: 'PE',
    name: 'Privação Emocional',
    domainId: 1,
    questionIndices: [1, 19, 37, 55, 73],
    shortDescription: 'Crença de que ninguém realmente vai te acolher, ouvir de verdade ou te dar carinho sincero.',
    plainExplanation: 'É a sensação interna de que ninguém realmente se importa com o que você sente lá no fundo. Mesmo rodeado de amigos ou família, você pode carregar uma sensação silenciosa de solidão ou vazio no peito, como se faltasse calor humano na sua vida.',
    realLifeExample: 'Você tem um dia difícil ou triste, mas prefere não contar para ninguém pensando: "Não adianta falar, ninguém liga mesmo", ou acaba se aproximando de pessoas frias que não demonstram afeto.',
    coreBelief: 'Ninguém realmente se importa comigo, me acolhe ou entende o que sinto por dentro.',
    emotionalImpact: 'Sensação profunda de vazio interior, solidão crônica, tristeza silenciosa e desconexão interpessoal.',
    childhoodOrigin: 'Crescer com pais ou cuidadores que eram distantes, ocupados demais, frios ou que não demonstravam afeto físico e acolhimento emocional quando você precisava.',
    triggers: [
      'Momentos de cansaço em que você precisava de um abraço ou escuta atenta',
      'Parceiro(a) ou amigos parecendo distraídos ou pouco demonstrativos',
      'Situações em que é necessário pedir ajuda ou expor sua fragilidade',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Se conforma com relacionamentos frios e distantes, achando que esse é o seu destino.',
      avoidance: 'Fugir para não sofrer: Isola-se e evita se apegar a qualquer pessoa para não sentir a dor de não ser correspondido.',
      overcompensation: 'Ir para o extremo oposto: Torna-se excessivamente exigente, cobrando atenção com raiva ou fingindo autossuficiência absoluta ("Não preciso de ninguém").',
    },
    clinicalRecommendations: [
      'Aprenda a reconhecer o que você sente sem sentir vergonha de precisar de carinho.',
      'Comunique seus sentimentos de forma direta aos outros em vez de esperar que adivinhem.',
      'Aproxime-se gradualmente de pessoas acolhedoras que demonstram consideração real por você.',
    ],
    healthyAdultPerspective: 'Minhas necessidades emocionais são legítimas e mereço ser amado, ouvido e acolhido com calor humano.',
  },
  {
    id: 'ab',
    code: 'AB',
    name: 'Abandono / Instabilidade',
    domainId: 1,
    questionIndices: [2, 20, 38, 56, 74],
    shortDescription: 'Medo constante de que as pessoas que você ama vão te deixar, sumir, morrer ou se afastar.',
    plainExplanation: 'É viver com a sensação de pisar em ovos nos relacionamentos, temendo que a pessoa amada vá te trocar, se cansar de você ou sumir a qualquer instante. Qualquer sinal de distanciamento gera ansiedade e pânico de ficar sozinho.',
    realLifeExample: 'Se o parceiro demora mais de 30 minutos para responder uma mensagem ou muda levemente o tom de voz, sua mente já dispara: "Pronto, ele não gosta mais de mim e vai me largar".',
    coreBelief: 'As pessoas que amo vão acabar me deixando sozinho no pior momento.',
    emotionalImpact: 'Ansiedade de apego intensa, hipervigilância a qualquer sinal de distanciamento, pânico da separação.',
    childhoodOrigin: 'Perda precoce de pessoas queridas, separação turbulenta dos pais, ou cuidadores imprevisíveis que uma hora estavam carinhosos e outra hora sumiam ou se distanciavam.',
    triggers: [
      'Atrasos em respostas de mensagens ou chamadas telefônicas',
      'Mudanças de humor ou de expressão facial em pessoas próximas',
      'Planos individuais ou momentos em que o outro precisa de espaço próprio',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Apega-se de forma desesperada, sufocando a outra pessoa ou aceitando desrespeito só para não ficar só.',
      avoidance: 'Fugir para não sofrer: Não se envolve com ninguém para não correr o risco de ser abandonado no futuro.',
      overcompensation: 'Ir para o extremo oposto: Termina o relacionamento primeiro ou afasta as pessoas provocando brigas antes de ser rejeitado.',
    },
    clinicalRecommendations: [
      'Aprenda a diferenciar o espaço normal que as pessoas precisam de um abandono real.',
      'Pratique respirar fundo e acalmar a mente antes de cobrar explicações impulsivas.',
      'Construa uma rede de amizades e interesses próprios para não depender de uma única pessoa para se sentir seguro.',
    ],
    healthyAdultPerspective: 'Mesmo quando as pessoas se distanciam temporariamente, isso não significa que me abandonaram. Eu sou capaz de cuidar de mim.',
  },
  {
    id: 'da',
    code: 'DA',
    name: 'Desconfiança / Abuso',
    domainId: 1,
    questionIndices: [3, 21, 39, 57, 75],
    shortDescription: 'Certeza de que as pessoas vão te passar para trás, te enganar, usar ou machucar.',
    plainExplanation: 'É estar sempre com o escudo levantado, desconfiando de tudo e de todos. Você sente que as pessoas sempre têm segundas intenções ocultas e que, se você relaxar a guarda, será enganado, traído ou explorado.',
    realLifeExample: 'Alguém no trabalho te faz um elogio sincero ou se oferece para te ajudar, e seu primeiro pensamento automático é: "O que essa pessoa quer em troca? O que ela está tramando contra mim?".',
    coreBelief: 'As pessoas têm segundas intenções; se eu baixar a guarda, serei explorado ou traído.',
    emotionalImpact: 'Desconfiança constante, tensão relacional, estado crônico de alerta defensivo e amargura.',
    childhoodOrigin: 'Histórico de traição, mentiras, humilhações ou abusos por pessoas em quem você confiava na infância ou adolescência.',
    triggers: [
      'Elogios repentinos ou favores inesperados de terceiros',
      'Precisar compartilhar intimidades ou dados pessoais',
      'Situações em que depende da palavra ou cooperação de outras pessoas',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Fica em relações onde as pessoas realmente abusam da sua boa vontade, confirmando sua suspeita.',
      avoidance: 'Fugir para não sofrer: Esconde tudo sobre a própria vida, não fala de sentimentos e se isola do convívio.',
      overcompensation: 'Ir para o extremo oposto: Ataca antes de ser atacado, torna-se hostil, intimidador ou tenta controlar todo mundo ao redor.',
    },
    clinicalRecommendations: [
      'Avalie fatos e atitudes reais das pessoas antes de presumir que todos têm más intenções.',
      'Aprenda a colocar limites firmes com tranquilidade, sem precisar partir para o ataque ou a agressão.',
      'Permita-se confiar aos poucos em pessoas que provam com atitudes contínuas serem leais.',
    ],
    healthyAdultPerspective: 'Nem todas as pessoas são perigosas. Existem pessoas confiáveis e eu possuo recursos para me proteger caso alguém aja com má intenção.',
  },
  {
    id: 'is',
    code: 'IS',
    name: 'Isolamento Social / Alienação',
    domainId: 1,
    questionIndices: [4, 22, 40, 58, 76],
    shortDescription: 'Sensação de ser diferente do resto do mundo, um "peixe fora d\'água" que não pertence a lugar nenhum.',
    plainExplanation: 'É a sensação constante de ser um estranho no ninho. Em grupos ou eventos sociais, você se sente um espectador que não tem nada a ver com as pessoas dali, achando que ninguém vai se identificar com o seu jeito de ser.',
    realLifeExample: 'Em uma confraternização ou almoço em equipe, você fica quieto no seu canto achando que se falar alguma coisa vai soar esquisito ou deslocado.',
    coreBelief: 'Eu não me encaixo em lugar nenhum; sou um estranho no ninho.',
    emotionalImpact: 'Solidão social, timidez paralisante, sensação de exclusão e inadequação pública.',
    childhoodOrigin: 'Ter sofrido bullying na escola, ter sido rejeitado por colegas ou crescido em uma família muito diferente da comunidade ao redor.',
    triggers: [
      'Eventos sociais, festas, reuniões corporativas ou almoços em grupo',
      'Conversas casuais onde sente não ter assuntos em comum com a média das pessoas',
      'Ver grupos de amigos muito unidos e se sentir excluído',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Vai aos eventos mas se esconde em um canto, sentindo-se rejeitado por todos.',
      avoidance: 'Fugir para não sofrer: Recusa convites e prefere ficar sempre em casa para não se sentir desconfortável.',
      overcompensation: 'Ir para o extremo oposto: Finge ser uma pessoa que não é só para ser aceito, ou finge superioridade esnobe ("Não me misturo com essas pessoas").',
    },
    clinicalRecommendations: [
      'Busque grupos com interesses e valores reais parecidos com os seus (hobbies, esportes, estudos).',
      'Lembre-se de que a maioria das pessoas está preocupada consigo mesma, e não julgando cada detalhe seu.',
      'Dê pequenos passos de participação social, fazendo perguntas simples e escutando os outros com curiosidade.',
    ],
    healthyAdultPerspective: 'Tenho singularidades, mas compartilho da mesma humanidade dos demais. Posso encontrar meu grupo de pertencimento sendo eu mesmo.',
  },
  {
    id: 'dv',
    code: 'DV',
    name: 'Defeito / Vergonha',
    domainId: 1,
    questionIndices: [5, 23, 41, 59, 77],
    shortDescription: 'Crença dolorosa de que você é internamente falho, errado ou indesejável para os outros.',
    plainExplanation: 'É uma vergonha profunda sobre quem você é. Você sente que tem um "defeito de fábrica" e teme que, se alguém se aproximar de verdade e conhecer seus defeitos, vai se decepcionar, sentir nojo ou te rejeitar.',
    realLifeExample: 'Ao receber um elogio, você pensa: "Eles só estão dizendo isso porque não me conhecem de verdade; se vissem como sou por dentro, não me elogiariam".',
    coreBelief: 'Sou intrinsecamente imperfeito e rejeitável; se souberem quem sou de verdade, me desprezarão.',
    emotionalImpact: 'Vergonha tóxica, medo paralisante da exposição, baixa autoestima e autocrítica destrutiva.',
    childhoodOrigin: 'Crescer ouvindo críticas destrutivas e humilhantes dos pais, comparações com irmãos ou sentimento de que você era uma decepção para a família.',
    triggers: [
      'Cometer qualquer pequeno erro ou deslize na frente dos outros',
      'Receber qualquer crítica ou feedback construtivo',
      'Momentos de intimidade afetiva onde você precisa mostrar suas fragilidades',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Aceita desrespeito e humilhações alheias, achando que realmente não merece ser bem tratado.',
      avoidance: 'Fugir para não sofrer: Esconde sua verdadeira personalidade e nunca se abre intimamente para não ser "desmascarado".',
      overcompensation: 'Ir para o extremo oposto: Aponta defeitos nos outros antes que alguém aponte os seus, mantendo uma postura de perfeição inatingível.',
    },
    clinicalRecommendations: [
      'Entenda que cometer erros não significa que você é uma pessoa com defeito.',
      'Trate a si mesmo com a mesma gentileza e compreensão com que você trataria um amigo querido.',
      'Perceba que todo ser humano tem vulnerabilidades e que a imperfeição faz parte de sermos reais.',
    ],
    healthyAdultPerspective: 'Sou um ser humano completo, digno de respeito e amor com todas as minhas qualidades e imperfeições.',
  },
  {
    id: 'fr',
    code: 'FR',
    name: 'Fracasso',
    domainId: 2,
    questionIndices: [6, 24, 42, 60, 78],
    shortDescription: 'Certeza de que você é menos competente que os outros e que está fadado a não ter sucesso.',
    plainExplanation: 'É a famosa síndrome do impostor levada ao extremo. Você sente que os outros são muito mais inteligentes, capazes e bem-sucedidos do que você, minimizando tudo o que já conquistou e esperando falhar a qualquer momento.',
    realLifeExample: 'Mesmo tendo qualificação para uma vaga ou promoção, você decide não se candidatar porque já tem certeza na sua cabeça de que não vai dar conta ou que vão rir da sua tentativa.',
    coreBelief: 'Estou fadado ao fracasso; os outros são muito mais capazes e inteligentes do que eu.',
    emotionalImpact: 'Sentimento de impostor, frustração, desânimo, ansiedade de avaliação e autodesvalorização.',
    childhoodOrigin: 'Pais muito exigentes que cobravam notas máximas sem nunca elogiar, ou que diziam que você "não levava jeito para nada" quando comparado a outros.',
    triggers: [
      'Início de novos projetos profissionais ou estudos desafiadores',
      'Avaliações formais de desempenho ou provas',
      'Ver notícias de conquistas e sucesso financeiro de conhecidos nas redes',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Faz as tarefas com desânimo e desleixo, confirmando a ideia de que não é bom.',
      avoidance: 'Fugir para não sofrer: Procrastina e desiste antes mesmo de começar para não correr o risco de não conseguir.',
      overcompensation: 'Ir para o extremo oposto: Trabalha sem parar até a exaustão (workaholic) para tentar provar o tempo todo que não é um fracassado.',
    },
    clinicalRecommendations: [
      'Faça uma lista honesta de tudo o que você já conquistou na vida, sem desmerecer seus esforços.',
      'Lembre-se de que aprender algo novo exige errar no começo, e que errar é parte do aprendizado.',
      'Divida grandes objetivos em pequenos passos diários fáceis de cumprir para ganhar confiança.',
    ],
    healthyAdultPerspective: 'Possuo competências reais e capacidade de aprender. Erros são etapas de crescimento, não sentenças sobre a minha inteligência.',
  },
  {
    id: 'di',
    code: 'DI',
    name: 'Dependência / Incompetência',
    domainId: 2,
    questionIndices: [7, 25, 43, 61, 79],
    shortDescription: 'Sensação de não conseguir cuidar da própria vida e tomar decisões sem a ajuda de alguém.',
    plainExplanation: 'É a insegurança constante de que você não é capaz de se virar sozinho no dia a dia. Você sente uma necessidade enorme de que alguém te diga o que fazer, como fazer e confirme suas escolhas para se sentir em paz.',
    realLifeExample: 'Antes de tomar qualquer decisão (como fechar um contrato, fazer uma compra ou mudar de carreira), você precisa ligar para várias pessoas e pedir aprovação, temendo fazer besteira.',
    coreBelief: 'Não consigo me virar sozinho; sou frágil e incapaz de tomar as rédeas da minha vida.',
    emotionalImpact: 'Desamparo aprendido, insegurança contínua, ansiedade diante de escolhas simples e submissão decisória.',
    childhoodOrigin: 'Crescer com pais superprotetores que faziam tudo no seu lugar e nunca te deixaram resolver problemas, ou pais que diziam que você não sabia fazer nada direito.',
    triggers: [
      'Precisar tomar decisões financeiras, de carreira ou de moradia',
      'Ter que resolver problemas burocráticos ou técnicos sozinho',
      'Ficar distante das pessoas em quem você sempre se apoia para decidir',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Transfere todas as suas escolhas e decisões para o parceiro, pais ou amigos.',
      avoidance: 'Fugir para não sofrer: Evita assumir responsabilidades adultas (como morar sozinho ou dirigir).',
      overcompensation: 'Ir para o extremo oposto: Finge que sabe tudo e recusa qualquer conselho legítimo, acabando por se complicar sozinho.',
    },
    clinicalRecommendations: [
      'Comece a tomar pequenas decisões sozinho todos os dias e confie no seu julgamento.',
      'Aprenda aos poucos tarefas práticas do dia a dia (finanças, burocracias) para ganhar independência.',
      'Tolerar a dúvida inicial: errar uma escolha faz parte do crescimento de qualquer adulto maduro.',
    ],
    healthyAdultPerspective: 'Sou um adulto competente e capaz de aprender o que for necessário para conduzir a minha própria vida com segurança.',
  },
  {
    id: 'vd',
    code: 'VD',
    name: 'Vulnerabilidade ao Dano ou Doença',
    domainId: 2,
    questionIndices: [8, 26, 44, 62, 80],
    shortDescription: 'Medo exagerado de que uma desgraça súbita (médica, financeira ou acidente) vai te atingir.',
    plainExplanation: 'É uma ansiedade antecipatória constante, como se uma catástrofe estivesse para acontecer a qualquer momento: um infarto súbito, a perda de todo o dinheiro, um assalto ou um desastre aéreo.',
    realLifeExample: 'Sentir o coração acelerar por causa de um café e já achar que vai ter um ataque cardíaco, ou ter crise de pânico só de pensar em viajar de avião ou passar por lugares novos.',
    coreBelief: 'Uma desgraça terrível está prestes a acontecer e serei completamente destruído.',
    emotionalImpact: 'Ansiedade generalizada, hipocondria, ataques de pânico, apreensão constante e exaustão física.',
    childhoodOrigin: 'Crescer com pais extremamente ansiosos e alarmistas que viam perigo em qualquer lugar, ou ter passado por sustos ou perdas reais sem acolhimento.',
    triggers: [
      'Pequenas sensações físicas normais (tontura leve, dor de cabeça, palpitações)',
      'Assistir notícias sobre crimes, crises financeiras ou acidentes',
      'Estar em locais desconhecidos fora da sua zona de conforto e controle',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Passa horas pesquisando doenças na internet e vive com medo paralisante.',
      avoidance: 'Fugir para não sofrer: Evita sair de casa, viajar, fazer exercícios ou ir a lugares com muita gente.',
      overcompensation: 'Ir para o extremo oposto: Age de forma inconsequente e perigosa para tentar provar para si mesmo que não tem medo de nada.',
    },
    clinicalRecommendations: [
      'Pare de pesquisar sintomas e diagnósticos médicos na internet; consulte um profissional de saúde quando necessário.',
      'Aprenda a reconhecer que ansiedade é apenas um alarme falso do seu corpo, e não um perigo real iminente.',
      'Treine a respiração lenta e mantenha sua rotina normal mesmo sentindo algum desconforto.',
    ],
    healthyAdultPerspective: 'Embora a vida traga imprevistos, perigos reais são raros e eu tenho recursos psicológicos e práticos para lidar com adversidades.',
  },
  {
    id: 'em',
    code: 'EM',
    name: 'Emaranhamento / Self Subdesenvolvido',
    domainId: 2,
    questionIndices: [9, 27, 45, 63, 81],
    shortDescription: 'Vínculo tão grudado com os pais ou parceiro que você perde a própria identidade.',
    plainExplanation: 'É sentir que você e a outra pessoa (muitas vezes a mãe, pai ou cônjuge) são uma só pessoa. Você sente o que eles sentem, adota as opiniões deles e se sente imensamente culpado caso queira fazer escolhas diferentes da família.',
    realLifeExample: 'Sentir uma culpa absurda só de pensar em mudar de cidade ou de carreira porque seus pais desaprovam, sentindo que ser feliz sozinho seria uma traição a eles.',
    coreBelief: 'Eu e meu cuidador/parceiro somos um só; não sei quem eu sou sem essa relação.',
    emotionalImpact: 'Confusão de identidade, sensação de asfixia emocional, culpa profunda ao ter gostos ou opiniões diferentes.',
    childhoodOrigin: 'Pais invasivos que não respeitavam sua privacidade, usavam você como desabafo dos problemas de adulto deles e viam sua independência como desobediência.',
    triggers: [
      'Ter gostos, valores ou planos de vida diferentes dos seus pais ou parceiro',
      'Ter conquistas e momentos felizes longe da pessoa emaranhada',
      'Perguntarem para você: "O que você realmente quer para a sua vida daqui para frente?"',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Abre mão dos próprios sonhos para viver apenas os sonhos da família ou do parceiro.',
      avoidance: 'Fugir para não sofrer: Foge de qualquer namoro ou amizade profunda com medo de perder a liberdade de novo.',
      overcompensation: 'Ir para o extremo oposto: Corta relações de forma agressiva com a família em uma explosão de revolta.',
    },
    clinicalRecommendations: [
      'Descubra seus próprios gostos, hobbies e vontades individuais, sem precisar da opinião alheia.',
      'Coloque limites saudáveis sobre até onde a família pode opinar na sua rotina diária.',
      'Compreenda que amadurecer e ter sua própria vida não é o mesmo que abandonar quem você ama.',
    ],
    healthyAdultPerspective: 'Posso amar as pessoas importantes da minha vida mantendo a minha individualidade, voz e identidade preservadas.',
  },
  {
    id: 'sb',
    code: 'SB',
    name: 'Subjugação',
    domainId: 4,
    questionIndices: [10, 28, 46, 64, 82],
    shortDescription: 'Fazer sempre a vontade dos outros por medo de brigas, broncas ou rejeição.',
    plainExplanation: 'É calar a sua voz e engolir seus sentimentos e desejos só para deixar os outros felizes ou não arrumar confusão. Você sente que a sua opinião não tem valor e que precisa ceder sempre para ser aceito.',
    realLifeExample: 'Seu chefe ou amigo te pede para fazer algo desconfortável ou injusto, você fica com raiva por dentro, mas sorri e diz: "Claro, sem problemas!", guardando um ressentimento imenso.',
    coreBelief: 'Tenho que fazer a vontade dos outros, senão serei castigado, rejeitado ou atacado.',
    emotionalImpact: 'Ressentimento acumulado, raiva reprimida, sensação de ser controlado e sintomas psicossomáticos.',
    childhoodOrigin: 'Crescer em um lar autoritário onde você não tinha o direito de dizer não, e qualquer reclamação era punida com gritos, castigos ou silêncio punitivo.',
    triggers: [
      'Chefes ou pessoas de autoridade fazendo pedidos em tom exigente',
      'Situações de discussão onde você precisa defender seu ponto de vista',
      'Pessoas com cara feia ou irritadas perto de você',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Obedece a tudo que pedem de cabeça baixa, acumulando mágoa e gastrite.',
      avoidance: 'Fugir para não sofrer: Evita pessoas que têm personalidade forte para não se sentir pressionado.',
      overcompensation: 'Ir para o extremo oposto: Torna-se birrento e desobediente por princípio, brigando por qualquer coisa simples.',
    },
    clinicalRecommendations: [
      'Treine dizer pequenos "nãos" com gentileza e firmeza quando algo não for bom para você.',
      'Perceba que a sua raiva é um aviso do seu corpo de que seus direitos estão sendo desrespeitados.',
      'Entenda que as pessoas que realmente gostam de você vão respeitar seus limites.',
    ],
    healthyAdultPerspective: 'Minhas opiniões e escolhas têm valor. Posso negociar e dizer não sem que isso represente o fim do mundo ou punição.',
  },
  {
    id: 'as',
    code: 'AS',
    name: 'Auto-sacrifício',
    domainId: 4,
    questionIndices: [11, 29, 47, 65, 83],
    shortDescription: 'Cuidar tanto dos outros que você se esgota e esquece de cuidar de si mesmo.',
    plainExplanation: 'É ter um coração tão altruísta que você assume os problemas de todo mundo como se fossem seus. Se alguém ao seu lado está sofrendo ou cansado, você larga tudo para salvar a pessoa, sentindo culpa se parar para descansar.',
    realLifeExample: 'Você está no limite do cansaço e dores de cabeça no fim de semana, mas aceita tomar conta de filhos de amigos ou fazer plantão extra porque "se sentiu com pena de negar".',
    coreBelief: 'As necessidades dos outros vêm sempre antes das minhas; se eu não cuidar deles, sou egoísta.',
    emotionalImpact: 'Exaustão crônica (burnout empático), frustração silenciosa por não receber retorno e desconexão das próprias carências.',
    childhoodOrigin: 'Ter precisado cuidar de pais doentes, deprimidos ou com vícios desde muito cedo, assumindo o papel de "adulto da casa" antes da hora.',
    triggers: [
      'Ver qualquer pessoa próxima em apuros, cansada ou reclamando da vida',
      'Tirar um tempo só para deitar e não fazer nada (sensação imediata de culpa)',
      'Receber presentes ou ajuda (sentir um incômodo enorme de "ficar devendo")',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Cuida de todo mundo até ter um esgotamento mental e físico.',
      avoidance: 'Fugir para não sofrer: Afasta-se dos outros para não ser engolido pelos pedidos de socorro.',
      overcompensation: 'Ir para o extremo oposto: Tem crises periódicas de revolta e diz que nunca mais vai ajudar ninguém na vida.',
    },
    clinicalRecommendations: [
      'Coloque o seu descanso e a sua saúde como prioridade número 1: quem não cuida de si não tem como cuidar de ninguém.',
      'Diferencie ajudar alguém de tentar carregar o fardo que pertence à outra pessoa.',
      'Aprenda a receber carinho e suporte dos outros sem pressa de retribuir na mesma hora.',
    ],
    healthyAdultPerspective: 'Cuidar de mim não é egoísmo, é uma condição básica para a saúde. Meu bem-estar importa tanto quanto o de qualquer outra pessoa.',
  },
  {
    id: 'ie',
    code: 'IE',
    name: 'Inibição Emocional',
    domainId: 5,
    questionIndices: [12, 30, 48, 66, 84],
    shortDescription: 'Reprimir suas emoções (afeto, raiva, choro) para parecer sempre frio, lógico e no controle.',
    plainExplanation: 'É trancar suas emoções em um cofre. Você considera feio ou perigoso chorar, demonstrar entusiasmo, rir alto ou se apaixonar intensamente, preferindo agir como uma pessoa puramente racional e séria.',
    realLifeExample: 'Passar por um momento de grande tristeza ou vitória e manter uma expressão neutra, sentindo vergonha de chorar ou comemorar na frente de amigos e familiares.',
    coreBelief: 'Demonstrar emoções é sinal de fraqueza ou perda de postura; devo ser sempre frio, racional e controlado.',
    emotionalImpact: 'Tensão muscular crônica, frieza aparente, dificuldade em relaxar e incapacidade de celebrar momentos felizes.',
    childhoodOrigin: 'Crescer em uma família que censurava o choro dizendo que "homem não chora" ou que "ficar animado demais é bobagem", valorizando apenas a frieza estoica.',
    triggers: [
      'Momentos íntimos com declarações amorosas ou contato emocional profundo',
      'Situações em que as pessoas ao redor estão muito emocionadas ou chorando',
      'Ambientes festivos e descontraídos onde as pessoas estão brincando livremente',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Age feito um robô o tempo todo, mesmo quando está explodindo por dentro.',
      avoidance: 'Fugir para não sofrer: Foge de conversas íntimas e só fala sobre trabalho ou assuntos práticos e neutros.',
      overcompensation: 'Ir para o extremo oposto: Faz piadinhas forçadas e deboches para mascarar o que sente de verdade.',
    },
    clinicalRecommendations: [
      'Permita-se expressar pequenos sentimentos aos poucos com pessoas em quem você confia.',
      'Pratique soltar o corpo e liberar a musculatura tensa através de esportes, dança ou terapia.',
      'Entenda que demonstrar sensibilidade não é fraqueza, é o que torna os relacionamentos humanos vivos e verdadeiros.',
    ],
    healthyAdultPerspective: 'Sentir e expressar emoções faz parte de ser humano. Posso ser autêntico e expressivo mantendo o respeito por mim e pelos outros.',
  },
  {
    id: 'pi',
    code: 'PI',
    name: 'Padrões Inflexíveis / Postura Crítica',
    domainId: 5,
    questionIndices: [13, 31, 49, 67, 85],
    shortDescription: 'Pressão constante por perfeição e cobrança implacável sobre si mesmo e os outros.',
    plainExplanation: 'É ter um "juiz interno" na sua mente que nunca está satisfeito. Não importa o quanto você trabalhe ou o quão bem faça as coisas, você sempre sente que poderia ter feito melhor, cobrando perfeição de si e se irritando com a lentidão dos outros.',
    realLifeExample: 'Tirar nota 9,8 numa prova ou fazer uma entrega elogiada por todos na empresa, mas passar a noite remoendo aquele único 0,2 que você errou, sem conseguir comemorar.',
    coreBelief: 'Nada do que faço é bom o bastante; eu sempre tenho a obrigação de ser impecável.',
    emotionalImpact: 'Pressão constante, irritabilidade, incapacidade de usufruir o presente, ansiedade de desempenho crônica.',
    childhoodOrigin: 'Famílias em que o afeto dependia de você tirar sempre notas 10, ser o primeiro da turma ou manter padrões morais e de organização quase impossíveis.',
    triggers: [
      'Pequenos erros próprios ou imprevistos normais no dia a dia',
      'Momentos de folga ou fim de semana (sensação imediata de que está "perdendo tempo precioso")',
      'Trabalhar com pessoas que têm um ritmo mais calmo ou menos perfeccionista que o seu',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Trabalha até desabar de estafa para manter tudo no nível máximo de perfeição.',
      avoidance: 'Fugir para não sofrer: Adia (procrastina) o início de tarefas por pavor de que o resultado não fique 100% impecável.',
      overcompensation: 'Ir para o extremo oposto: Larga tudo para o alto e se recusa a seguir qualquer regra quando atinge o limite do cansaço.',
    },
    clinicalRecommendations: [
      'Adote a regra de ouro do "suficientemente bom": 90% bem feito é infinitamente melhor do que ter um infarto buscando o 100%.',
      'Separe momentos de lazer na sua agenda sem nenhuma obrigação de produtividade.',
      'Comemore suas vitórias e trate suas falhas como pistas de aprendizado, e não como vergonha.',
    ],
    healthyAdultPerspective: 'Meu valor não depende da perfeição de tudo que produzo. O descanso, a saúde e o afeto são prioridades tão importantes quanto o trabalho.',
  },
  {
    id: 'gr',
    code: 'GR',
    name: 'Merecimento / Grandiosidade',
    domainId: 3,
    questionIndices: [14, 32, 50, 68, 86],
    shortDescription: 'Sentir-se especial e achar que as regras comuns não se aplicam a você.',
    plainExplanation: 'É a dificuldade em aceitar limites normais da vida em sociedade. Você sente que suas vontades e tempo são mais importantes do que os dos outros, ficando furioso ao ouvir um "não" ou ao ter que esperar em filas e regras comuns.',
    realLifeExample: 'Perder a paciência e se irritar com atendentes em filas ou burocracias, achando que eles deveriam abrir uma exceção imediata para resolver o seu caso na hora.',
    coreBelief: 'Sou especial e as regras cotidianas não se aplicam a mim; devo ter o que desejo na hora que quero.',
    emotionalImpact: 'Intolerância à frustração, acessos de raiva diante de limites, vaidade exagerada e dificuldade de empatia.',
    childhoodOrigin: 'Ter sido criado com mimos exagerados sem limites claros, ou usar uma máscara de superioridade para esconder uma sensação oculta de inferioridade.',
    triggers: [
      'Ter que esperar em filas, no trânsito ou em processos burocráticos normais',
      'Receber uma negativa a um pedido ou ter sua vontade contrariada',
      'Ambientes onde você não é o líder ou a pessoa em maior destaque',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Passa por cima da vontade dos outros e exige privilégios onde quer que vá.',
      avoidance: 'Fugir para não sofrer: Não entra em jogos ou disputas onde não tenha certeza de que sairá vencedor.',
      overcompensation: 'Ir para o extremo oposto: Finge uma modéstia exagerada só para forçar as pessoas a elogiarem você.',
    },
    clinicalRecommendations: [
      'Coloque-se com empatia no lugar das outras pessoas e imagine o impacto das suas palavras nelas.',
      'Aprenda a tolerar a frustração de ouvir um "não" sem transformar isso em uma guerra pessoal.',
      'Entenda que o verdadeiro respeito se conquista com consideração mútua, e não por imposição.',
    ],
    healthyAdultPerspective: 'Sou uma pessoa valorosa como todas as outras, mas não superior às regras éticas e humanas fundamentais de respeito e reciprocidade.',
  },
  {
    id: 'ai',
    code: 'AI',
    name: 'Autocontrole / Autodisciplina Insuficientes',
    domainId: 3,
    questionIndices: [15, 33, 51, 69, 87],
    shortDescription: 'Dificuldade para manter a disciplina em tarefas difíceis e controlar a vontade de prazer imediato.',
    plainExplanation: 'É a tentação quase incontrolável de largar tarefas chatas ou difíceis assim que bate o tédio. Você tem dificuldade de se concentrar em metas de longo prazo e cede fácil a distrações (redes sociais, compras, comida ou preguiça).',
    realLifeExample: 'Decidir estudar ou fazer dieta com a maior seriedade, mas na primeira tentação ou tédio de 15 minutos, abandonar tudo e ir rolar o feed do celular.',
    coreBelief: 'Não consigo suportar o tédio ou o desconforto de tarefas difíceis; preciso de gratificação agora.',
    emotionalImpact: 'Culpa pós-impulsividade, sensação de desperdício de potencial, desespero diante de tarefas rotineiras.',
    childhoodOrigin: 'Crescer em uma casa desorganizada onde ninguém cobrava rotina e você era poupado de qualquer esforço ou desconforto.',
    triggers: [
      'Tarefas repetitivas, chatas ou que exigem estudo e concentração prolongada',
      'Dietas, rotinas de exercícios ou economizar dinheiro no banco',
      'Tentações imediatas (doces, notificações no celular, jogos online)',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Abandona tudo na primeira dificuldade e vive no piloto automático dos impulsos.',
      avoidance: 'Fugir para não sofrer: Nem assume compromissos de longo prazo para não ter que se esforçar.',
      overcompensation: 'Ir para o extremo oposto: Tenta impor rotinas militares e desumanas sobre si mesmo, que desmoronam em dois dias.',
    },
    clinicalRecommendations: [
      'Use técnicas de pequenos blocos (estudar ou trabalhar focado por 20 minutos e descansar 5).',
      'Treine tolerar o desconforto inicial: os primeiros 10 minutos de qualquer tarefa são os mais difíceis.',
      'Remova distrações do seu ambiente (deixe o celular longe durante tarefas importantes).',
    ],
    healthyAdultPerspective: 'Consigo tolerar desconfortos temporários para construir conquistas duradouras que realmente importam para o meu futuro.',
  },
  {
    id: 'ba',
    code: 'BA',
    name: 'Busca de Aprovação / Reconhecimento',
    domainId: 4,
    questionIndices: [16, 34, 52, 70, 88],
    shortDescription: 'Dependência de elogios, status e curtidas dos outros para se sentir alguém com valor.',
    plainExplanation: 'É basear a sua autoestima na opinião alheia. Você se preocupa excessivamente com a impressão que causa, moldando suas atitudes, roupas e falas para agradar os outros e se sentindo arrasado se não receber reconhecimento.',
    realLifeExample: 'Ficar olhando o celular repetidamente para ver quantas pessoas curtiram sua foto ou comentário, sentindo-se sem valor se o retorno for baixo.',
    coreBelief: 'Meu valor depende inteiramente de como os outros me avaliam e dos elogios que recebo.',
    emotionalImpact: 'Ansiedade social de imagem, inveja secreta, perda de autenticidade e dependência de curtidas e validação.',
    childhoodOrigin: 'Pais que só demonstravam orgulho se você ganhasse prêmios, estivesse sempre impecável ou se exibisse publicamente para a família.',
    triggers: [
      'Fazer um bom trabalho e ninguém elogiar abertamente na reunião',
      'Situações onde sua aparência ou roupas possam ser avaliadas',
      'Ver conhecidos recebendo muitos elogios e destaque nas redes sociais',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Muda de ideia e de gostos toda hora só para agradar quem está por perto.',
      avoidance: 'Fugir para não sofrer: Não se expõe nem opina em nada com medo de ser julgado negativamente.',
      overcompensation: 'Ir para o extremo oposto: Torna-se exibicionista e provocador para chamar atenção a qualquer custo.',
    },
    clinicalRecommendations: [
      'Conecte-se com o que VOCÊ realmente gosta, independentemente do que está na moda ou dá curtidas.',
      'Diminua o tempo gasto comparando sua vida com as aparências das redes sociais.',
      'Aprenda a reconhecer o seu valor interno sem precisar que alguém te aplauda a cada passo.',
    ],
    healthyAdultPerspective: 'Minha dignidade e valor como pessoa são intrínsecos e independem do aplauso ou concordância dos outros.',
  },
  {
    id: 'np',
    code: 'NP',
    name: 'Negativismo / Pessimismo',
    domainId: 5,
    questionIndices: [17, 35, 53, 71, 89],
    shortDescription: 'Foco constante no que pode dar errado, esperando sempre o pior da vida.',
    plainExplanation: 'É viver esperando a próxima bomba estourar. Mesmo quando tudo na sua vida está calmo e dando certo, você fica tenso pensando: "Isso é bom demais para ser verdade, já já alguma coisa horrível vai estragar tudo".',
    realLifeExample: 'Começar um namoro maravilhoso ou ser promovido na empresa e, em vez de curtir, passar a semana com insônia pensando no dia em que o relacionamento pode acabar.',
    coreBelief: 'Se algo de bom acontecer, é só um prelúdio para uma catástrofe pior logo em seguida.',
    emotionalImpact: 'Apreensão contínua, amargura, tristeza antecipatória e incapacidade de desfrutar de boas notícias.',
    childhoodOrigin: 'Crescer em um lar com clima constante de tensão, falências ou cuidadores que viviam reclamando e prevendo desgraças.',
    triggers: [
      'Momentos de grande sucesso pessoal ou celebração de conquistas',
      'Fazer planos de longo prazo (comprar casa, casar, viajar)',
      'Pequenos imprevistos que acionam uma espiral de pensamentos trágicos',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Foca apenas nos defeitos de qualquer situação e vive reclamando.',
      avoidance: 'Fugir para não sofrer: Não comemora nada para "não quebrar a cara depois".',
      overcompensation: 'Ir para o extremo oposto: Finge um otimismo cego e forçado que desmorona no primeiro problema.',
    },
    clinicalRecommendations: [
      'Escreva em um caderno as coisas boas e concretas que aconteceram no seu dia (treino de gratidão).',
      'Pergunte-se racionalmente: "Qual é a chance real dessa tragédia acontecer agora ou é só minha mente ansiosa falando?"',
      'Permita-se saborear o momento presente quando algo der certo, sem antecipar o amanhã.',
    ],
    healthyAdultPerspective: 'A vida contém incertezas, mas também é repleta de momentos de beleza, sucesso e acolhimento que merecem ser celebrados.',
  },
  {
    id: 'pp',
    code: 'PP',
    name: 'Postura Punitiva / Autopunição',
    domainId: 5,
    questionIndices: [18, 36, 54, 72, 90],
    shortDescription: 'Tolerância zero com erros: você se culpa impiedosamente e acha difícil perdoar falhas.',
    plainExplanation: 'É ser um carrasco implacável de si mesmo. Quando você comete qualquer erro, fica se martirizando por dias, achando que merece sofrer ou ser castigado, e tem muita dificuldade em relevar os deslizes dos outros.',
    realLifeExample: 'Esquecer de pagar uma conta no dia ou errar uma resposta simples numa conversa e passar a noite se xingando de "burro e incompetente" na sua própria mente.',
    coreBelief: 'Quem erra merece castigo severo; não há perdão nem tolerância para falhas.',
    emotionalImpact: 'Rancor, autopunição cruel, raiva vingativa, remorso obsessivo e incapacidade de perdoar.',
    childhoodOrigin: 'Castigos severos na infância por qualquer deslize bobo, humilhações públicas de cuidadores ou ausência de perdão no lar.',
    triggers: [
      'Cometer qualquer equívoco em uma tarefa ou diálogo',
      'Outras pessoas cometendo erros de desatenção perto de você',
      'Situações em que alguém pede desculpas sinceras e espera clemência',
    ],
    copingStyles: {
      surrender: 'Aceitar a dor e se conformar: Castiga a si mesmo com culpa, insônia e pensamentos autodepreciativos impiedosos.',
      avoidance: 'Fugir para não sofrer: Evita qualquer situação nova com medo de errar e sofrer a punição interna.',
      overcompensation: 'Ir para o extremo oposto: Age como um juiz intolerante, atacando e humilhando qualquer um que cometa um deslize.',
    },
    clinicalRecommendations: [
      'Lembre-se: cometer erros é uma característica de qualquer ser humano vivo, e não uma falha moral.',
      'Troque a punição e o chicote mental pelo aprendizado construtivo: "O que posso fazer diferente da próxima vez?".',
      'Pratique perdoar a si mesmo e aos outros, entendendo o contexto de cansaço ou imperfeição de cada situação.',
    ],
    healthyAdultPerspective: 'Errar é humano. O aprendizado e a reparação construtiva são infinitamente mais saudáveis e eficazes do que o castigo e a vingança.',
  },
];

// Map 90 questions
export const QUESTIONS: YsqQuestion[] = extractedItems.map((item: { id: number; text: string }) => {
  const schemaIndex = (item.id - 1) % 18;
  const schema = SCHEMAS[schemaIndex];
  return {
    id: item.id,
    text: item.text,
    schemaId: schema.id,
    domainId: schema.domainId,
  };
});

// Demo Presets for Evaluators & Instant Exploration
export const DEMO_PRESETS: Record<string, { title: string; subtitle: string; description: string; participant: Partial<import('../types/ysq').ParticipantProfile>; answers: Record<number, number> }> = {
  burnout_perfectionism: {
    title: 'Perfil Sobrecarga & Padrões Inflexíveis',
    subtitle: 'Cobrança Implacável, Dificuldade de Descansar e Cuidado Excessivo com os Outros',
    description: 'Muito comum em pessoas responsáveis, dedicadas e trabalhadoras que sofrem com estafa mental, culpa ao descansar e sensação de que precisam carregar o mundo nas costas.',
    participant: {
      name: 'Mariana Duarte Mendes',
      age: '36',
      gender: 'Feminino',
      profession: 'Diretora de Operações',
      purpose: 'Autoconhecimento, Redução de Ansiedade e Prevenção de Esgotamento',
      assessorName: 'Dr. Lucas Silveira (Psicólogo Clínico)',
      notes: 'Sente dificuldade de desligar a mente no final de semana e autocrítica intensa.',
    },
    answers: (() => {
      const ans: Record<number, number> = {};
      for (let i = 1; i <= 90; i++) {
        const schemaIdx = (i - 1) % 18;
        if (schemaIdx === 12) ans[i] = (i % 2 === 0 ? 6 : 5); // PI
        else if (schemaIdx === 10) ans[i] = (i % 2 === 0 ? 5 : 6); // AS
        else if (schemaIdx === 17) ans[i] = (i % 2 === 0 ? 5 : 4); // PP
        else if (schemaIdx === 16) ans[i] = (i % 2 === 0 ? 5 : 4); // NP
        else if (schemaIdx === 15) ans[i] = (i % 2 === 0 ? 4 : 5); // BA
        else if (schemaIdx === 11) ans[i] = (i % 2 === 0 ? 4 : 3); // IE
        else if (schemaIdx === 9) ans[i] = 3;  // SB
        else ans[i] = (i % 3 === 0 ? 2 : 1);
      }
      return ans;
    })(),
  },
  anxious_abandonment: {
    title: 'Perfil Ansioso / Medo de Rejeição e Abandono',
    subtitle: 'Sensação de Vazio, Insegurança nos Vínculos e Medo de Perder Pessoas Queridas',
    description: 'Perfil caracterizado por angústia ao notar distanciamentos nos relacionamentos, necessidade constante de carinho e medo de ser deixado sozinho.',
    participant: {
      name: 'Rodrigo Albuquerque Castro',
      age: '29',
      gender: 'Masculino',
      profession: 'Engenheiro de Software',
      purpose: 'Autoconhecimento e Melhoria dos Relacionamentos Afetivos',
      assessorName: 'Dra. Camila Nogueira (Terapeuta de Esquemas)',
      notes: 'Ansiedade intensa quando o parceiro(a) viaja ou demora para dar retorno.',
    },
    answers: (() => {
      const ans: Record<number, number> = {};
      for (let i = 1; i <= 90; i++) {
        const schemaIdx = (i - 1) % 18;
        if (schemaIdx === 1) ans[i] = (i % 2 === 0 ? 6 : 5); // AB
        else if (schemaIdx === 0) ans[i] = (i % 2 === 0 ? 5 : 6); // PE
        else if (schemaIdx === 2) ans[i] = (i % 2 === 0 ? 4 : 5); // DA
        else if (schemaIdx === 7) ans[i] = (i % 2 === 0 ? 5 : 4); // VD
        else if (schemaIdx === 9) ans[i] = (i % 2 === 0 ? 5 : 4); // SB
        else if (schemaIdx === 4) ans[i] = 4; // DV
        else if (schemaIdx === 6) ans[i] = 3; // DI
        else ans[i] = (i % 2 === 0 ? 2 : 1);
      }
      return ans;
    })(),
  },
  healthy_resilient: {
    title: 'Perfil Resiliente e Equilibrado',
    subtitle: 'Boa Segurança Interna, Limites Flexíveis e Baixa Reatividade a Gatilhos',
    description: 'Perfil com esquemas silenciosos e adaptativos, indicando boa autoestima, tolerância a frustrações e capacidade de lidar com imprevistos com calma.',
    participant: {
      name: 'Sofia Helena Barreto',
      age: '33',
      gender: 'Feminino',
      profession: 'Arquiteta e Urbanista',
      purpose: 'Mapeamento Emocional para Desenvolvimento Pessoal',
      assessorName: 'Núcleo de Avaliação Psicológica',
      notes: 'Busca autoconhecimento preventivo e clareza sobre suas forças.',
    },
    answers: (() => {
      const ans: Record<number, number> = {};
      for (let i = 1; i <= 90; i++) {
        ans[i] = (i % 5 === 0 ? 2 : 1);
      }
      ans[13] = 3;
      ans[31] = 3;
      ans[11] = 2;
      return ans;
    })(),
  },
};
