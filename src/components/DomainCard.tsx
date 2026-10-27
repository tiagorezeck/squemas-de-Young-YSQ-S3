import React from 'react';
import { DomainScoreResult } from '../types/ysq';
import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DomainCardProps {
  domainResult: DomainScoreResult;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domainResult }) => {
  const { domain, averageScore, activeSchemasCount, schemas, severity } = domainResult;

  const percentage = Math.min(100, Math.round(((averageScore - 1) / 5) * 100));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
            style={{ backgroundColor: domain.color }}
          >
            {domain.code}
          </span>
          <div>
            <h4 className="font-bold text-slate-800 text-base leading-snug">{domain.name}</h4>
            {domain.plainName && (
              <p className="text-xs font-semibold text-indigo-700 mt-0.5">{domain.plainName}</p>
            )}
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{domain.description}</p>
          </div>
        </div>

        {/* Severity Badge */}
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 ${
            severity === 'high' || severity === 'very_high'
              ? 'bg-rose-100 text-rose-700 border border-rose-200'
              : severity === 'moderate'
              ? 'bg-amber-100 text-amber-700 border border-amber-200'
              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
          }`}
        >
          {severity === 'high' || severity === 'very_high' ? (
            <ShieldAlert className="w-3.5 h-3.5" />
          ) : severity === 'moderate' ? (
            <AlertTriangle className="w-3.5 h-3.5" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5" />
          )}
          {severity === 'high' || severity === 'very_high'
            ? 'Ativação Forte'
            : severity === 'moderate'
            ? 'Ativação Moderada'
            : 'Equilibrado'} ({averageScore.toFixed(1)})
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Nível de Ativação no Domínio</span>
          <span className="font-semibold text-slate-700">{percentage}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: domain.color,
            }}
          />
        </div>
      </div>

      {/* Core Unmet Need & Healthy Goal */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
        <p className="text-slate-600">
          <strong className="text-slate-800 font-semibold">O que faltou ou foi ferido:</strong>{' '}
          {domain.coreUnmetNeed}
        </p>
        <p className="text-indigo-700">
          <strong className="text-indigo-900 font-semibold">Caminho para o equilíbrio:</strong>{' '}
          {domain.healthyGoal}
        </p>
      </div>

      {/* Schemas Pills in Domain */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {schemas.map((s) => (
          <span
            key={s.schema.id}
            title={`${s.schema.name} (Média ${s.averageScore})`}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              s.severity === 'high' || s.severity === 'very_high'
                ? 'bg-rose-50 text-rose-700 border border-rose-200 font-semibold'
                : s.severity === 'moderate'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            {s.schema.code}: {s.averageScore.toFixed(1)}
            {s.highItemsCount > 0 && ` (${s.highItemsCount}★)`}
          </span>
        ))}
      </div>
    </div>
  );
};
