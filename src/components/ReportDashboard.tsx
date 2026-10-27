import React, { useState } from 'react';
import { AssessmentReport, SeverityLevel } from '../types/ysq';
import { RadarChart } from './RadarChart';
import { DomainCard } from './DomainCard';
import { SchemaCard } from './SchemaCard';
import {
  Printer,
  Download,
  Copy,
  Check,
  RefreshCw,
  FileText,
  AlertTriangle,
  Brain,
  ShieldCheck,
  Award,
  Sparkles,
  Search,
  Filter,
  Activity,
  Layers,
  HeartHandshake,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ReportDashboardProps {
  report: AssessmentReport;
  onNewTest: () => void;
  onSaveToHistory: () => void;
  isSavedInHistory: boolean;
  isAllExpanded?: boolean;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({
  report,
  onNewTest,
  onSaveToHistory,
  isSavedInHistory,
  isAllExpanded,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'active' | 'moderate' | 'silent'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showLaymanGuide, setShowLaymanGuide] = useState(true);

  const {
    participant,
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
  } = report;

  // Filtered schemas list for the detailed view
  const filteredSchemas = schemaResults.filter((s) => {
    // Severity filter
    if (filterSeverity === 'active' && s.severity !== 'high' && s.severity !== 'very_high') return false;
    if (filterSeverity === 'moderate' && s.severity !== 'moderate') return false;
    if (filterSeverity === 'silent' && s.severity !== 'low') return false;

    // Search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = s.schema.name.toLowerCase().includes(term);
      const matchCode = s.schema.code.toLowerCase().includes(term);
      const matchDesc = s.schema.shortDescription.toLowerCase().includes(term);
      return matchName || matchCode || matchDesc;
    }
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `laudo-ysq-s3-${participant.name.replace(/\s+/g, '-').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopySummary = () => {
    const textToCopy = `LAUDO DE AVALIAÇÃO PSICOMÉTRICA - QUESTIONÁRIO DE ESQUEMAS DE YOUNG (YSQ-S3)\n` +
      `Avaliado: ${participant.name}\n` +
      `Data: ${participant.completedAt}\n` +
      `Finalidade: ${participant.purpose}\n` +
      `Perfil: ${profileTitle}\n` +
      `Índice de Carga Esquematológica: ${overallBurdenIndex}%\n\n` +
      `SÍNTESE EXECUTIVA:\n${executiveSummary}\n\n` +
      `ESTILO DE ENFRENTAMENTO:\n${copingTendencySummary}\n\n` +
      `IMPACTO RELACIONAL E PROFISSIONAL:\n${relationalAndWorkImpact}\n\n` +
      `ESQUEMAS NUCLEARES ATIVOS:\n` +
      activeSchemas.map((s) => `• [${s.schema.code}] ${s.schema.name} (Média: ${s.averageScore.toFixed(1)}/6.0)`).join('\n') +
      `\n\nMETAS DO ADULTO SAUDÁVEL:\n` +
      therapeuticPriorities.map((p) => `• ${p}`).join('\n');

    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 print:py-0 print:px-0">
      {/* Action / Toolbar (Hidden in Print) */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Laudo Psicométrico Concluído
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onSaveToHistory}
            disabled={isSavedInHistory}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isSavedInHistory
                ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-default'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            {isSavedInHistory ? 'Salvo no Histórico' : 'Salvar no Histórico'}
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            {copiedSummary ? 'Laudo Copiado!' : 'Copiar Texto do Laudo'}
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Exportar JSON
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir / Salvar PDF
          </button>

          <button
            type="button"
            onClick={onNewTest}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors ml-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Novo Teste
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 print:shadow-none print:border-none print:p-0 space-y-8">
        
        {/* Document Header & Patient Dossier */}
        <div className="border-b border-slate-200 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 mb-1">
                <Brain className="w-4 h-4" /> Relatório Psicométrico Individual
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Avaliação de Esquemas Iniciais Desadaptativos (YSQ-S3)
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fundamentado no Modelo da Terapia Focada em Esquemas (Jeffrey Young, Ph.D.)
              </p>
            </div>

            {/* Overall Burden Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center shrink-0 min-w-[170px]">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Carga Esquematológica
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-0.5">
                <span className={`text-3xl font-black ${
                  overallBurdenIndex >= 50
                    ? 'text-rose-600'
                    : overallBurdenIndex >= 25
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}>
                  {overallBurdenIndex}%
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                {activeSchemas.length} de 18 esquemas ativados
              </span>
            </div>
          </div>

          {/* Dossier Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">Avaliado(a)</span>
              <span className="font-bold text-slate-800 text-sm block mt-0.5">{participant.name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">Idade / Gênero</span>
              <span className="font-medium text-slate-700 block mt-0.5">
                {participant.age ? `${participant.age} anos` : 'Não informado'} &bull; {participant.gender || 'Não informado'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">Ocupação / Cargo</span>
              <span className="font-medium text-slate-700 block mt-0.5">{participant.profession || 'Não informado'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">Data da Aplicação</span>
              <span className="font-medium text-slate-700 block mt-0.5">{participant.completedAt}</span>
            </div>
          </div>

          {participant.assessorName && (
            <div className="mt-3 pt-2 text-xs text-slate-500 border-t border-slate-100 flex items-center justify-between">
              <span><strong>Avaliador / Terapeuta:</strong> {participant.assessorName}</span>
              <span><strong>Contexto:</strong> {participant.purpose}</span>
            </div>
          )}
        </div>

        {/* Profile Title Banner */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-rose-50 rounded-2xl p-5 border border-indigo-100/80 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
              Padrão Diagnóstico Identificado
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {profileTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {activeSchemas.length > 0
              ? `Esquemas de maior relevância clínica: ${activeSchemas.map((s) => `${s.schema.name} (${s.averageScore.toFixed(1)})`).join(', ')}.`
              : 'Todos os 18 esquemas encontram-se em faixa adaptativa saudável.'}
          </p>
        </div>

        {/* Guia Rápido de Autoconhecimento (Para Leigos) */}
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 text-slate-800 shadow-2xs no-print">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setShowLaymanGuide(!showLaymanGuide)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Guia Rápido: Como entender o seu laudo sozinho (Sem jargões complicados)
                </h3>
                <p className="text-xs text-slate-600">
                  {showLaymanGuide
                    ? 'Clique para recolher este resumo explicativo.'
                    : 'Está fazendo o teste para autoconhecimento? Clique aqui para entender como interpretar tudo facilmente.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="text-amber-800 p-1.5 hover:bg-amber-100/80 rounded-xl transition-colors"
              aria-label={showLaymanGuide ? 'Recolher guia' : 'Expandir guia'}
            >
              {showLaymanGuide ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {showLaymanGuide && (
            <div className="mt-4 pt-4 border-t border-amber-200/60 grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs leading-relaxed animate-fadeIn">
              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/50 space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <Brain className="w-3.5 h-3.5 text-amber-600" /> 1. O que é um Esquema?
                </span>
                <p className="text-slate-600">
                  Pense em um esquema como uma <strong>"lente ou hábito emocional"</strong> que você criou na infância para se proteger. Hoje, em momentos de estresse, seu cérebro aciona essa lente no piloto automático como se a dor antiga estivesse se repetindo.
                </p>
              </div>

              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/50 space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> 2. O que significam as cores?
                </span>
                <p className="text-slate-600">
                  <strong className="text-rose-700">🔴 Ativado:</strong> Padrão forte no seu dia a dia; gera cansaço ou ansiedade.<br />
                  <strong className="text-amber-700">🟡 Latente:</strong> Costuma acordar em dias de briga ou crise.<br />
                  <strong className="text-emerald-700">🟢 Silencioso:</strong> Área bem resolvida e equilibrada em você.
                </p>
              </div>

              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/50 space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> 3. O que fazer a partir de agora?
                </span>
                <p className="text-slate-600">
                  O objetivo <strong>não é se culpar</strong>, mas ganhar consciência. Ao perceber a lente disparando, você consegue dar um passo atrás e agir com calma através do seu <strong>Adulto Saudável</strong>, colocando limites e cuidando de si.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Executive Summary & Clinical Narrative */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-lg">Síntese do Perfil & Interpretação Clara</h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 hidden sm:inline-block">
              Linguagem Acessível e Profissional
            </span>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-3">
            <p className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
              {executiveSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  Padrão de Enfrentamento Observado
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {copingTendencySummary}
                </p>
              </div>

              <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
                  Impacto Relacional e Profissional
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {relationalAndWorkImpact}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Psychometrics: Radar Chart + 5 Domains */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Brain className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-lg">
              Mapeamento Psicométrico: Gráfico Radial (18 Esquemas)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Radar Chart */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-200/80 p-4">
              <RadarChart schemas={schemaResults} size={500} />
            </div>

            {/* Quick stats on sides */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900 text-xs uppercase tracking-wider">
                    Esquemas Ativados (&ge; 3.6 / Críticos)
                  </span>
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                    {activeSchemas.length}
                  </span>
                </div>
                {activeSchemas.length > 0 ? (
                  <div className="mt-2 space-y-1">
                    {activeSchemas.map((s) => (
                      <div key={s.schema.id} className="text-xs text-rose-800 flex justify-between font-medium">
                        <span>[{s.schema.code}] {s.schema.name}</span>
                        <span className="font-bold">{s.averageScore.toFixed(1)}/6.0</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-rose-700 mt-1">Nenhum esquema em nível de ativação clínica.</p>
                )}
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 text-xs uppercase tracking-wider">
                    Esquemas Latentes (2.3 a 3.5)
                  </span>
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                    {moderateSchemas.length}
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  Esquemas que podem se ativar temporariamente em situações de maior estresse ou vulnerabilidade.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 text-xs uppercase tracking-wider">
                    Esquemas Silenciosos (&lt; 2.3)
                  </span>
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    {silentSchemas.length}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-1">
                  Áreas saudáveis e integradas com boa adaptabilidade comportamental.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Domains Grid */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-lg">
                Avaliação por Domínios de Esquemas (5 Dimensões)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Necessidades Emocionais Primárias
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domainResults.map((domainRes) => (
              <DomainCard key={domainRes.domain.id} domainResult={domainRes} />
            ))}
          </div>
        </div>

        {/* Deep Dive: Activated & Detailed Schemas */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-lg">
                Detalhamento dos Esquemas: Crenças, Gatilhos e Modos de Enfrentamento
              </h3>
            </div>

            {/* Filter buttons (Hidden in Print) */}
            <div className="no-print flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setFilterSeverity('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterSeverity === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({schemaResults.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterSeverity('active')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterSeverity === 'active'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Ativados ({activeSchemas.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterSeverity('moderate')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterSeverity === 'moderate'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                Latentes ({moderateSchemas.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterSeverity('silent')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterSeverity === 'silent'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Silenciosos ({silentSchemas.length})
              </button>
            </div>
          </div>

          {/* Search bar inside schema list (Hidden in Print) */}
          <div className="no-print relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar esquema por nome, sigla ou crença central..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 bg-slate-50/50"
            />
          </div>

          {/* Schemas List */}
          <div className="space-y-3">
            {filteredSchemas.map((schemaRes, index) => (
              <SchemaCard
                key={schemaRes.schema.id}
                result={schemaRes}
                defaultExpanded={index === 0 && (schemaRes.severity === 'high' || schemaRes.severity === 'very_high')}
                isExpanded={isAllExpanded}
              />
            ))}

            {filteredSchemas.length === 0 && (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                Nenhum esquema encontrado com os filtros selecionados.
              </div>
            )}
          </div>
        </div>

        {/* Full Comparative Psychometric Table */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-lg">
                Tabela Consolidada de Resultados Psicométricos
              </h3>
            </div>
            <span className="text-xs text-slate-400">18 Esquemas &bull; Escala 1.0 a 6.0</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Esquema Inicial Desadaptativo</th>
                  <th className="p-3">Domínio</th>
                  <th className="p-3 text-center">Pontuação Bruta (5-30)</th>
                  <th className="p-3 text-center">Média (1-6)</th>
                  <th className="p-3 text-center">Itens &ge; 5</th>
                  <th className="p-3 text-right">Classificação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {schemaResults.map((s) => {
                  const isActive = s.severity === 'high' || s.severity === 'very_high';
                  return (
                    <tr
                      key={s.schema.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isActive ? 'bg-rose-50/30' : ''
                      }`}
                    >
                      <td className="p-3 font-mono font-bold text-slate-800">
                        {s.schema.code}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {s.schema.name}
                      </td>
                      <td className="p-3 text-slate-500">
                        Domínio {s.schema.domainId}
                      </td>
                      <td className="p-3 text-center font-mono text-slate-700">
                        {s.rawScore} / 30
                      </td>
                      <td className="p-3 text-center font-bold text-slate-900">
                        {s.averageScore.toFixed(1)}
                      </td>
                      <td className="p-3 text-center">
                        {s.highItemsCount > 0 ? (
                          <span className="inline-block px-2 py-0.5 rounded font-bold text-[11px] bg-rose-100 text-rose-700">
                            {s.highItemsCount} / 5
                          </span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isActive
                              ? 'bg-rose-100 text-rose-700'
                              : s.severity === 'moderate'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {s.severityLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic Plan for the Healthy Adult */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">
              Diretrizes de Desenvolvimento & Fortalecimento do Adulto Saudável
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-indigo-200">
            Recomendações estratégicas para intervenções em psicoterapia, coaching ou autogestão emocional:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
            {therapeuticPriorities.map((prio, idx) => (
              <div key={idx} className="bg-white/10 p-3.5 rounded-xl border border-white/10 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-500/40 text-indigo-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-200 leading-relaxed">{prio}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formal Dossier Footer & Disclaimer for Formal Assessment Systems */}
        <div className="pt-8 border-t border-slate-200 space-y-6 text-xs text-slate-500">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed text-[11px] text-slate-500">
            <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Nota Técnica e Parâmetros de Uso Profissional:
            </p>
            O Questionário de Esquemas de Young (YSQ-S3) é um instrumento psicométrico de autorrelato voltado ao mapeamento
            cognitivo de padrões emocionais e comportamentais desadaptativos. Os resultados descritos neste laudo refletem
            as percepções e respostas fornecidas pelo próprio participante e constituem uma ferramenta de triagem e hipótese
            clínica para apoiar processos terapêuticos e de autoconhecimento. Este documento não substitui uma avaliação
            psiquiátrica ou exame neuropsicológico formal.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <div className="text-center sm:text-left">
              <p className="font-mono text-[10px] text-slate-400">ID da Avaliação: {report.id}</p>
              <p className="text-[10px] text-slate-400">Emissão: {participant.completedAt} &bull; YSQ-S3 Assessment Engine v3.0</p>
            </div>

            <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-8 min-w-[240px]">
              <div className="h-10 border-b border-slate-400/80 mb-2 w-48 mx-auto sm:ml-auto"></div>
              <p className="font-bold text-slate-800 text-xs">
                {participant.assessorName || 'Profissional / Avaliador Responsável'}
              </p>
              <p className="text-[10px] text-slate-400">Assinatura / Registro Profissional</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
