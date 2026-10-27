import React, { useState } from 'react';
import { SchemaScoreResult } from '../types/ysq';
import { DOMAINS } from '../data/ysqData';
import {
  ChevronDown,
  ChevronUp,
  Flame,
  Shield,
  Compass,
  Sparkles,
  Layers,
  HelpCircle,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';

interface SchemaCardProps {
  result: SchemaScoreResult;
  defaultExpanded?: boolean;
  isExpanded?: boolean;
}

export const SchemaCard: React.FC<SchemaCardProps> = ({
  result,
  defaultExpanded = false,
  isExpanded,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  React.useEffect(() => {
    if (typeof isExpanded === 'boolean') {
      setExpanded(isExpanded);
    }
  }, [isExpanded]);

  const { schema, averageScore, rawScore, highItemsCount, severity, severityLabel, itemScores } = result;

  const domain = DOMAINS.find((d) => d.id === schema.domainId);
  const isActive = severity === 'high' || severity === 'very_high';

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden shadow-xs ${
        isActive
          ? 'border-rose-300 ring-2 ring-rose-100 shadow-sm'
          : severity === 'moderate'
          ? 'border-amber-200 hover:border-amber-300'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/70 transition-colors"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-xs shrink-0"
            style={{ backgroundColor: domain?.color || '#64748b' }}
          >
            {schema.code}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">
                {schema.name}
              </h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 hidden sm:inline-block">
                {domain?.plainName || domain?.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 mt-0.5">
              {schema.shortDescription}
            </p>
          </div>
        </div>

        {/* Score & Severity Indicator */}
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-800">
                {averageScore.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ 6.0</span>
            </div>
            <span
              className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                isActive
                  ? 'bg-rose-100 text-rose-700 font-bold'
                  : severity === 'moderate'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {severityLabel}
            </span>
          </div>

          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label={expanded ? 'Recolher detalhes' : 'Expandir detalhes'}
          >
            {expanded ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Clinical Content */}
      {expanded && (
        <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 space-y-4 text-sm animate-fadeIn">
          
          {/* Plain Language Everyday Explanation (Highlight for Self-Knowledge) */}
          <div className="bg-indigo-50/70 rounded-2xl p-4 sm:p-5 border border-indigo-100 space-y-3 mt-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                Como entender este padrão na prática (Em palavras simples):
              </span>
              <p className="text-slate-800 text-sm mt-1 leading-relaxed">
                {schema.plainExplanation || schema.shortDescription}
              </p>
            </div>

            {schema.realLifeExample && (
              <div className="pt-2.5 border-t border-indigo-200/50 flex items-start gap-2 text-xs sm:text-sm">
                <span className="font-bold text-indigo-900 shrink-0">Cena comum do dia a dia:</span>
                <span className="text-slate-700 italic leading-relaxed">
                  &ldquo;{schema.realLifeExample}&rdquo;
                </span>
              </div>
            )}
          </div>

          {/* Core Belief & Mind's Voice */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                A frase automática que sua mente costuma lhe dizer:
              </span>
              <p className="text-slate-900 font-semibold text-sm sm:text-base italic mt-1 text-indigo-950">
                &ldquo;{schema.coreBelief}&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/50 text-xs text-slate-600">
              <strong className="text-slate-700">Como você se sente por dentro:</strong>{' '}
              {schema.emotionalImpact}
            </div>
          </div>

          {/* User's Answers on the 5 Items */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              Suas respostas nas 5 afirmações deste esquema (Notas de 1 a 6):
            </h4>
            <div className="space-y-1.5 bg-slate-50/60 rounded-xl p-3 border border-slate-200/60">
              {itemScores.map((item) => (
                <div
                  key={item.questionId}
                  className="flex items-start justify-between gap-3 text-xs py-1.5 px-2 rounded-lg hover:bg-white transition-colors"
                >
                  <span className="text-slate-700 leading-relaxed">
                    <strong className="text-slate-500 font-mono">Item {item.questionId}:</strong>{' '}
                    {item.questionText}
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-md text-xs shrink-0 ${
                      item.score >= 5
                        ? 'bg-rose-100 text-rose-700 ring-1 ring-rose-200'
                        : item.score >= 4
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    Nota {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Childhood Origin & Triggers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-100">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                De onde isso vem (Origem na Infância ou Juventude)
              </span>
              <p className="text-xs text-amber-900 mt-1.5 leading-relaxed">
                {schema.childhoodOrigin}
              </p>
            </div>

            <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-100">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-700" />
                Situações que costumam disparar esse padrão hoje
              </span>
              <ul className="text-xs text-rose-950 mt-1.5 space-y-1 list-disc list-inside">
                {schema.triggers.map((trig, idx) => (
                  <li key={idx} className="leading-snug">{trig}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* The 3 Coping Styles Made Extremely Clear */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-indigo-600" />
                Os 3 Modos de Reação Automática (Como as pessoas reagem a essa dor):
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Veja com qual dessas reações você mais se identifica quando a ansiedade ou o medo surgem:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <p className="font-bold text-indigo-900 mb-1">
                  1. Rendição <span className="font-normal text-slate-500 block text-[11px]">(Concordar e Sofrer)</span>
                </p>
                <p className="text-slate-600 leading-relaxed">{schema.copingStyles.surrender}</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <p className="font-bold text-indigo-900 mb-1">
                  2. Evitação <span className="font-normal text-slate-500 block text-[11px]">(Fugir para não Sentir)</span>
                </p>
                <p className="text-slate-600 leading-relaxed">{schema.copingStyles.avoidance}</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <p className="font-bold text-indigo-900 mb-1">
                  3. Hipercompensação <span className="font-normal text-slate-500 block text-[11px]">(Ir para o Extremo Oposto)</span>
                </p>
                <p className="text-slate-600 leading-relaxed">{schema.copingStyles.overcompensation}</p>
              </div>
            </div>
          </div>

          {/* Practical steps to develop the Healthy Adult */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 sm:p-5 border border-emerald-200/70 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              O que você pode começar a praticar a partir de agora (Modo Adulto Saudável):
            </h4>
            <ul className="text-xs sm:text-sm text-emerald-950 space-y-1.5 list-disc list-inside">
              {schema.clinicalRecommendations.map((rec, idx) => (
                <li key={idx} className="leading-relaxed">{rec}</li>
              ))}
            </ul>
            <div className="pt-2.5 border-t border-emerald-200/60">
              <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                <strong>Frase para repetir a si mesmo quando o gatilho disparar:</strong>{' '}
                <span className="italic">&ldquo;{schema.healthyAdultPerspective}&rdquo;</span>
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
