import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS } from '../data/ysqData';
import { ParticipantProfile } from '../types/ysq';
import { QuestionCard } from './QuestionCard';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  CheckCircle,
  AlertCircle,
  Save,
  ArrowRight,
  X,
} from 'lucide-react';

interface TestRunnerProps {
  participant: ParticipantProfile;
  answers: Record<number, number>;
  onAnswerChange: (questionId: number, score: number) => void;
  onFinishTest: () => void;
  onCancelTest: () => void;
}

const ITEMS_PER_PAGE = 10;

export const TestRunner: React.FC<TestRunnerProps> = ({
  participant,
  answers,
  onAnswerChange,
  onFinishTest,
  onCancelTest,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showGridModal, setShowGridModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const totalPages = Math.ceil(totalQuestions / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalQuestions);
  const currentQuestions = QUESTIONS.slice(startIndex, endIndex);

  // Scroll to top of list on page change
  useEffect(() => {
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }, [currentPage]);

  // Handle score selection
  const handleScoreSelect = (questionId: number, score: number) => {
    onAnswerChange(questionId, score);

    // Optional: auto-focus next unanswered question on this page
    const nextQuestionId = questionId + 1;
    if (nextQuestionId <= endIndex && !answers[nextQuestionId]) {
      const nextEl = document.getElementById(`question-${nextQuestionId}`);
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Check which questions are unanswered
  const unansweredIds: number[] = [];
  for (let i = 1; i <= totalQuestions; i++) {
    if (!answers[i]) {
      unansweredIds.push(i);
    }
  }

  const isAllAnswered = answeredCount === totalQuestions;

  const jumpToQuestion = (qId: number) => {
    const targetPage = Math.floor((qId - 1) / ITEMS_PER_PAGE);
    setCurrentPage(targetPage);
    setShowGridModal(false);
    setTimeout(() => {
      const el = document.getElementById(`question-${qId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto pb-16 px-4" ref={containerRef}>
      {/* Sticky Top Status Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 mb-6 mt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancelTest}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
            >
              &larr; Voltar
            </button>
            <div className="border-l border-slate-700 pl-3">
              <span className="font-bold text-sm block truncate max-w-[200px] sm:max-w-xs">
                {participant.name}
              </span>
              <span className="text-[11px] text-slate-400 block">
                Página {currentPage + 1} de {totalPages} ({startIndex + 1}–{endIndex})
              </span>
            </div>
          </div>

          {/* Progress bar and counter */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <div className="w-28 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-indigo-300 whitespace-nowrap">
                {answeredCount}/{totalQuestions} ({progressPercent}%)
              </span>
            </div>

            {/* Question Grid Modal Trigger */}
            <button
              type="button"
              onClick={() => setShowGridModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              title="Ver mapa com todas as 90 questões"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mapa (90)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Instructions Reminder */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 mb-6 text-xs text-indigo-900 flex items-center justify-between">
        <p>
          <strong className="font-semibold">Instrução:</strong> Avalie cada afirmação considerando
          como você se sente na maioria das vezes em sua vida adulta. Responda com sinceridade.
        </p>
        <span className="hidden md:inline-block text-[11px] font-mono text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200">
          Escala de 1 a 6
        </span>
      </div>

      {/* Current Page Questions */}
      <div className="space-y-4">
        {currentQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selectedScore={answers[q.id]}
            onSelectScore={(score) => handleScoreSelect(q.id, score)}
          />
        ))}
      </div>

      {/* Pagination & Completion Bar */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>
          <button
            type="button"
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Próxima <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Completion button */}
        <div className="w-full sm:w-auto flex items-center justify-end">
          {isAllAnswered ? (
            <button
              type="button"
              onClick={onFinishTest}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-700 hover:to-rose-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all animate-pulse"
            >
              <CheckCircle className="w-4 h-4" />
              Finalizar e Gerar Relatório Dinâmico
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (unansweredIds.length > 0) {
                  jumpToQuestion(unansweredIds[0]);
                }
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
            >
              <AlertCircle className="w-4 h-4 text-amber-500" />
              {unansweredIds.length} pendentes &bull; Ir para primeira pendente
            </button>
          )}
        </div>
      </div>

      {/* Question Map Modal (90 Grid) */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Mapa Geral de Questões (90)</h3>
                <p className="text-xs text-slate-500">
                  Clique em qualquer número para pular diretamente até ele.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGridModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-10 gap-2 mb-6">
              {QUESTIONS.map((q) => {
                const isAnswered = answers[q.id] !== undefined;
                const score = answers[q.id];
                const isCurrentPage =
                  q.id >= startIndex + 1 && q.id <= endIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => jumpToQuestion(q.id)}
                    title={`Questão ${q.id}: ${isAnswered ? `Nota ${score}` : 'Não respondida'}`}
                    className={`h-9 rounded-lg font-bold text-xs flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isAnswered
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    } ${isCurrentPage ? 'ring-2 ring-rose-400' : ''}`}
                  >
                    <span>{q.id}</span>
                    {isAnswered && (
                      <span className="text-[9px] opacity-80 leading-none">n{score}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded bg-indigo-600"></span> Respondida
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded bg-slate-200"></span> Pendente
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded ring-2 ring-rose-400"></span> Página atual
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowGridModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
