import React from 'react';
import {
  Brain,
  History,
  PlusCircle,
  ChevronsUpDown,
  ChevronsDownUp,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface HeaderProps {
  currentStep: 'welcome' | 'test' | 'report';
  savedCount: number;
  onOpenHistory: () => void;
  onNewTest: () => void;
  isAllExpanded?: boolean;
  onToggleExpandAll?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  savedCount,
  onOpenHistory,
  onNewTest,
  isAllExpanded = false,
  onToggleExpandAll,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  return (
    <header className="no-print bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={onNewTest}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-indigo-200/50 group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                YSQ-S3 <span className="text-indigo-600 font-semibold text-xs sm:text-sm">Assessment</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 hidden sm:inline-block">
                Terapia do Esquema
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Questionário de Esquemas de Jeffrey Young (90 Itens)
            </p>
          </div>
        </div>

        {/* Action buttons in top menu */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Expandir / Recolher Conteúdo (só o ícone) */}
          {onToggleExpandAll && (
            <button
              type="button"
              onClick={onToggleExpandAll}
              title={isAllExpanded ? 'Recolher todos os detalhes' : 'Expandir todos os detalhes'}
              aria-label={isAllExpanded ? 'Recolher todos os detalhes' : 'Expandir todos os detalhes'}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                isAllExpanded
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-600 border-slate-200'
              }`}
            >
              {isAllExpanded ? (
                <ChevronsDownUp className="w-4 h-4 text-indigo-600" />
              ) : (
                <ChevronsUpDown className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Expandir / Recolher Tela Cheia (só o ícone) */}
          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              title={isFullscreen ? 'Recolher tela cheia' : 'Expandir para tela cheia'}
              aria-label={isFullscreen ? 'Recolher tela cheia' : 'Expandir para tela cheia'}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                isFullscreen
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-600 border-slate-200'
              }`}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-indigo-600" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Histórico */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 border border-slate-200 transition-colors"
          >
            <History className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Histórico</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white font-bold text-[10px]">
                {savedCount}
              </span>
            )}
          </button>

          {/* Novo Teste */}
          {currentStep !== 'welcome' && (
            <button
              type="button"
              onClick={onNewTest}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Novo Teste</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
