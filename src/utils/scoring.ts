import { DOMAINS, SCHEMAS, QUESTIONS } from '../data/ysqData';
import {
  AssessmentReport,
  DomainScoreResult,
  ParticipantProfile,
  SchemaScoreResult,
  SeverityLevel,
} from '../types/ysq';

export function getSeverityLevel(averageScore: number, highItemsCount: number): SeverityLevel {
  if (averageScore >= 4.8 || (averageScore >= 4.2 && highItemsCount >= 3)) {
    return 'very_high';
  }
  if (averageScore >= 3.6 || highItemsCount >= 2) {
    return 'high';
  }
  if (averageScore >= 2.3) {
    return 'moderate';
  }
  return 'low';
}

export function getSeverityLabel(severity: SeverityLevel): string {
  switch (severity) {
    case 'very_high':
      return 'Hiperativado (Muito Forte no Cotidiano)';
    case 'high':
      return 'Ativado (Forte Influência)';
    case 'moderate':
      return 'Latente (Ativa sob Estresse)';
    case 'low':
      return 'Silencioso (Equilibrado e Saudável)';
  }
}

export function getSeverityColor(severity: SeverityLevel): string {
  switch (severity) {
    case 'very_high':
      return 'text-rose-600 bg-rose-50 border-rose-200';
    case 'high':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'moderate':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'low':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  }
}

export function calculateAssessmentReport(
  participant: ParticipantProfile,
  answers: Record<number, number>
): AssessmentReport {
  // 1. Calculate each schema score
  const schemaResults: SchemaScoreResult[] = SCHEMAS.map((schema) => {
    const itemScores = schema.questionIndices.map((qId) => {
      const q = QUESTIONS.find((item) => item.id === qId);
      const score = answers[qId] || 1;
      return {
        questionId: qId,
        questionText: q?.text || '',
        score,
      };
    });

    const rawScore = itemScores.reduce((acc, curr) => acc + curr.score, 0);
    const averageScore = Number((rawScore / itemScores.length).toFixed(2));
    const highItemsCount = itemScores.filter((item) => item.score >= 5).length;
    const severity = getSeverityLevel(averageScore, highItemsCount);
    const severityLabel = getSeverityLabel(severity);

    return {
      schema,
      rawScore,
      averageScore,
      severity,
      severityLabel,
      highItemsCount,
      itemScores,
    };
  });

  // Sort schemaResults: highest average score first
  const sortedSchemas = [...schemaResults].sort((a, b) => b.averageScore - a.averageScore);

  const activeSchemas = sortedSchemas.filter(
    (s) => s.severity === 'very_high' || s.severity === 'high'
  );
  const moderateSchemas = sortedSchemas.filter((s) => s.severity === 'moderate');
  const silentSchemas = sortedSchemas.filter((s) => s.severity === 'low');

  // 2. Calculate Domain Scores
  const domainResults: DomainScoreResult[] = DOMAINS.map((domain) => {
    const domainSchemas = schemaResults.filter((s) => s.schema.domainId === domain.id);
    const totalAvg = domainSchemas.reduce((acc, curr) => acc + curr.averageScore, 0);
    const averageScore = Number((totalAvg / domainSchemas.length).toFixed(2));
    const activeSchemasCount = domainSchemas.filter(
      (s) => s.severity === 'very_high' || s.severity === 'high'
    ).length;
    const moderateSchemasCount = domainSchemas.filter((s) => s.severity === 'moderate').length;

    let severity: SeverityLevel = 'low';
    if (averageScore >= 4.0 || activeSchemasCount >= 2) severity = 'high';
    else if (averageScore >= 4.8) severity = 'very_high';
    else if (averageScore >= 2.4 || activeSchemasCount >= 1) severity = 'moderate';

    return {
      domain,
      averageScore,
      activeSchemasCount,
      moderateSchemasCount,
      schemas: domainSchemas,
      severity,
    };
  });

  // 3. Overall Burden Index (% based on max possible score across all schemas)
  // Max possible total is 90 * 6 = 540, Min is 90 * 1 = 90
  const totalAnswersScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
  const overallBurdenIndex = Math.min(
    100,
    Math.round(((totalAnswersScore - 90) / (540 - 90)) * 100)
  );

  // 4. Generate dynamic psychological narrative
  const topSchemaIds = activeSchemas.slice(0, 3).map((s) => s.schema.id);
  const primarySchema = activeSchemas[0]?.schema;
  const secondarySchema = activeSchemas[1]?.schema;
  const tertiarySchema = activeSchemas[2]?.schema;

  // Dynamic Profile Title
  let profileTitle = 'Perfil Adaptativo e Equilibrado';
  if (topSchemaIds.includes('pi') && topSchemaIds.includes('as')) {
    profileTitle = 'Padrão de Autocobrança Altruísta (Foco no Outro e Risco de Esgotamento)';
  } else if (topSchemaIds.includes('ab') && topSchemaIds.includes('pe')) {
    profileTitle = 'Padrão de Apego Ansioso (Medo de Rejeição, Vazio e Necessidade de Segurança)';
  } else if (topSchemaIds.includes('pi') && topSchemaIds.includes('pp')) {
    profileTitle = 'Padrão Perfeccionista Severo (Autocrítica Rígida e Dificuldade em Aceitar Erros)';
  } else if (topSchemaIds.includes('sb') && topSchemaIds.includes('as')) {
    profileTitle = 'Padrão de Anulação Pessoal (Dificuldade em Dizer Não e Cuidar de Si)';
  } else if (topSchemaIds.includes('da') && topSchemaIds.includes('is')) {
    profileTitle = 'Padrão Defensivo e Retraído (Medo de ser Machucado e Sensação de Não Pertencer)';
  } else if (topSchemaIds.includes('fr') || topSchemaIds.includes('di')) {
    profileTitle = 'Padrão de Insegurança e Dúvida da Própria Capacidade';
  } else if (topSchemaIds.includes('vd') || topSchemaIds.includes('np')) {
    profileTitle = 'Padrão de Apreensão e Alerta Constante (Esperando que Algo dê Errado)';
  } else if (topSchemaIds.includes('gr') || topSchemaIds.includes('ai')) {
    profileTitle = 'Padrão de Impaciência com Limites e Dificuldade de Autodisciplina';
  } else if (activeSchemas.length > 0) {
    profileTitle = `Padrão com Destaque em ${primarySchema?.name || 'Reatividade Emocional'}`;
  }

  // Dominant Themes
  const dominantThemes: string[] = [];
  if (activeSchemas.length === 0) {
    dominantThemes.push('Boa capacidade de lidar com estresses diários sem perder o equilíbrio');
    dominantThemes.push('Facilidade para estabelecer limites saudáveis sem culpa');
    dominantThemes.push('Relacionamentos afetivos com boa segurança e independência madura');
  } else {
    activeSchemas.slice(0, 4).forEach((s) => {
      dominantThemes.push(`${s.schema.name}: ${s.schema.plainExplanation || s.schema.shortDescription}`);
    });
  }

  // Executive Summary Narrative
  let executiveSummary = '';
  if (activeSchemas.length === 0) {
    executiveSummary = `Olá, ${participant.name}! O seu resultado no teste YSQ-S3 mostra um perfil emocional muito equilibrado e saudável (com uma carga esquematológica baixa, de apenas ${overallBurdenIndex}%). Isso significa que você consegue lidar com os desafios, frustrações e imprevistos normais da vida sem acionar reações automáticas exageradas ou autocríticas destrutivas. Suas necessidades básicas de afeto, autonomia e respeito foram bem desenvolvidas, permitindo que você mantenha uma boa autoconfiança e relações interpessoais saudáveis.`;
  } else {
    const activeCountText =
      activeSchemas.length === 1
        ? '1 esquema desadaptativo principal em nível ativo'
        : `${activeSchemas.length} esquemas com nível de ativação forte`;

    const domainImpactText = domainResults
      .filter((d) => d.severity === 'high' || d.severity === 'very_high')
      .map((d) => `"${d.domain.name} (${d.domain.plainName || ''})"`)
      .join(', ');

    executiveSummary = `Olá, ${participant.name}! Ao analisar suas respostas, identificamos ${activeCountText}, resultando em uma Carga Esquematológica Geral de ${overallBurdenIndex}%. Em palavras simples: todos nós temos "lentes emocionais" automáticas que se formaram na infância para nos proteger. No seu caso, o padrão mais forte que tende a se manifestar no dia a dia é o de "${primarySchema?.name}"${
      secondarySchema ? `, seguido por "${secondarySchema.name}"` : ''
    }${tertiarySchema ? ` e "${tertiarySchema.name}"` : ''}. ${
      domainImpactText
        ? `A área que mais pede o seu carinho e atenção é a de ${domainImpactText}.`
        : ''
    } Isso significa que, em dias de estresse, cansaço ou conflito, sua mente tende a disparar pensamentos automáticos como: "${primarySchema?.coreBelief || ''}". A boa notícia é que, ao reconhecer esses padrões, você ganha o poder de escolher agir de forma diferente e mais leve.`;
  }

  // Coping Tendency Summary
  let copingTendencySummary = '';
  if (activeSchemas.length === 0) {
    copingTendencySummary =
      'Como você costuma agir sob pressão: Predomínio do Modo Adulto Saudável. Você tende a conversar abertamente sobre o que sente, negocia prazos com calma e equilibra suas responsabilidades com pausas de descanso de forma natural.';
  } else if (topSchemaIds.includes('pi') || topSchemaIds.includes('pp') || topSchemaIds.includes('gr')) {
    copingTendencySummary =
      'Como você costuma agir sob pressão: Tendência à LUTA (Hipercompensação). Quando algo te causa medo, insegurança ou desconforto, sua reação automática é tentar controlar tudo e todos, exigir perfeição de si mesmo e acelerar o ritmo de trabalho para nunca parecer vulnerável ou incapaz.';
  } else if (topSchemaIds.includes('ie') || topSchemaIds.includes('is') || topSchemaIds.includes('da')) {
    copingTendencySummary =
      'Como você costuma agir sob pressão: Tendência à FUGA (Evitação). Diante de conflitos, cobranças ou intimidade profunda, você tende a se fechar em uma concha, evitar conversas difíceis ou se refugiar em tarefas solitárias para não se expor ou não se machucar.';
  } else if (topSchemaIds.includes('sb') || topSchemaIds.includes('as') || topSchemaIds.includes('ab')) {
    copingTendencySummary =
      'Como você costuma agir sob pressão: Tendência a CEDER (Rendição / Capitulação). Você tende a engolir o que quer e sente, dizendo "sim" para todo mundo mesmo quando está cansado, com medo de desagradar, gerar brigas ou ser abandonado.';
  } else {
    copingTendencySummary =
      'Como você costuma agir sob pressão: Estilo Misto. Você alterna momentos em que engole o desconforto e se cala com momentos em que tenta assumir o controle absoluto da situação para não se sentir ameaçado.';
  }

  // Relational and Work Impact
  let relationalAndWorkImpact = '';
  if (activeSchemas.length === 0) {
    relationalAndWorkImpact =
      'Nos relacionamentos e no trabalho: Você costuma se comunicar com clareza, coopera bem com colegas, sabe dizer "não" com gentileza e não leva pequenos atritos do dia a dia para o lado pessoal.';
  } else {
    relationalAndWorkImpact = `Nos relacionamentos e no trabalho: O seu padrão aponta que você pode estar sofrendo com ${
      topSchemaIds.includes('pi') || topSchemaIds.includes('as')
        ? 'sobrecarga crônica, cansaço mental e muita dificuldade para delegar tarefas ou descansar no fim de semana sem sentir um peso na consciência'
        : topSchemaIds.includes('ab') || topSchemaIds.includes('pe')
        ? 'insegurança quando as pessoas parecem distantes, necessidade constante de saber se está tudo bem na relação e medo de ficar sozinho'
        : topSchemaIds.includes('sb') || topSchemaIds.includes('ba')
        ? 'dificuldade em colocar limites firmes e dizer "não", acabando por fazer favores contra a própria vontade para manter a paz com os outros'
        : 'tensão ao receber feedbacks ou cobranças, medo de errar na frente dos colegas e uma autocrítica rigorosa que não te deixa comemorar vitórias'
    }.`;
  }

  // Therapeutic & Development Priorities
  const therapeuticPriorities: string[] = [];
  if (activeSchemas.length === 0) {
    therapeuticPriorities.push('Continue mantendo suas rotinas de descanso, sono de qualidade e tempo com pessoas queridas.');
    therapeuticPriorities.push('Aproveite sua estabilidade emocional para encarar novos projetos com leveza e curiosidade.');
    therapeuticPriorities.push('Sirva como um porto seguro e exemplo de equilíbrio para quem convive com você.');
  } else {
    activeSchemas.slice(0, 3).forEach((s) => {
      s.schema.clinicalRecommendations.slice(0, 2).forEach((rec) => {
        therapeuticPriorities.push(rec);
      });
    });
    // Add healthy adult perspective in plain language
    therapeuticPriorities.push(
      `Frase de Apoio para a sua mente: "${primarySchema?.healthyAdultPerspective || 'Minhas necessidades têm valor e eu mereço cuidar de mim com gentileza.'}"`
    );
  }

  return {
    id: `ysq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    participant,
    answers,
    schemaResults,
    domainResults,
    activeSchemas,
    moderateSchemas,
    silentSchemas,
    overallBurdenIndex,
    profileTitle,
    executiveSummary,
    dominantThemes,
    copingTendencySummary,
    relationalAndWorkImpact,
    therapeuticPriorities,
  };
}
