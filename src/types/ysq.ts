export interface YsqQuestion {
  id: number;
  text: string;
  schemaId: string;
  domainId: number;
}

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'very_high';

export interface CopingStyles {
  surrender: string;        // Rendição / Capitulação
  avoidance: string;        // Evitação / Fuga
  overcompensation: string; // Hipercompensação / Luta
}

export interface SchemaDefinition {
  id: string;
  code: string;
  name: string;
  domainId: number;
  questionIndices: number[]; // 5 questions (1-indexed)
  shortDescription: string;
  plainExplanation?: string; // Explicação em palavras simples do dia a dia
  realLifeExample?: string;  // Exemplo prático da vida real
  coreBelief: string;
  emotionalImpact: string;
  childhoodOrigin: string;
  triggers: string[];
  copingStyles: CopingStyles;
  clinicalRecommendations: string[];
  healthyAdultPerspective: string;
}

export interface DomainDefinition {
  id: number;
  code: string;
  name: string;
  plainName?: string;        // Subtítulo em linguagem direta
  description: string;
  coreUnmetNeed: string;
  healthyGoal: string;
  schemaIds: string[];
  color: string;
  bgLight: string;
  borderColor: string;
}

export interface SchemaScoreResult {
  schema: SchemaDefinition;
  rawScore: number;       // 5 to 30
  averageScore: number;   // 1.0 to 6.0
  severity: SeverityLevel;
  severityLabel: string;
  highItemsCount: number; // Items rated 5 or 6
  itemScores: { questionId: number; questionText: string; score: number }[];
}

export interface DomainScoreResult {
  domain: DomainDefinition;
  averageScore: number;
  activeSchemasCount: number;
  moderateSchemasCount: number;
  schemas: SchemaScoreResult[];
  severity: SeverityLevel;
}

export interface ParticipantProfile {
  name: string;
  age?: string;
  gender?: string;
  profession?: string;
  purpose: string;
  assessorName?: string;
  notes?: string;
  completedAt: string;
}

export interface AssessmentReport {
  id: string;
  participant: ParticipantProfile;
  answers: Record<number, number>; // questionId (1-90) -> score (1-6)
  schemaResults: SchemaScoreResult[];
  domainResults: DomainScoreResult[];
  activeSchemas: SchemaScoreResult[];
  moderateSchemas: SchemaScoreResult[];
  silentSchemas: SchemaScoreResult[];
  overallBurdenIndex: number; // percentage of high schema activation
  profileTitle: string;
  executiveSummary: string;
  dominantThemes: string[];
  copingTendencySummary: string;
  relationalAndWorkImpact: string;
  therapeuticPriorities: string[];
}
