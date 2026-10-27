import React from 'react';
import { SCALE_OPTIONS } from '../data/ysqData';
import { YsqQuestion } from '../types/ysq';
import { Check } from 'lucide-react';

interface QuestionCardProps {
  question: YsqQuestion;
  selectedScore: number | undefined;
  onSelectScore: (score: number) => void;
  isActiveQuestion?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedScore,
  onSelectScore,
  isActiveQuestion = false,
}) => {
  return (
    <div
      id={`question-${question.id}`}
      className={`rounded-2xl border transition-all duration-200 p-5 sm:p-6 bg-white shadow-xs ${
        isActiveQuestion
          ? 'border-indigo-400 ring-2 ring-indigo-100 shadow-md'
          : selectedScore !== undefined
          ? 'border-slate-200 bg-white'
          : 'border-slate-200/90'
      }`}
    >
      {/* Question Header & Prompt */}
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold text-xs shrink-0 transition-colors ${
            selectedScore !== undefined
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {selectedScore !== undefined ? <Check className="w-4 h-4" /> : question.id}
        </span>
        <div className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Item {question.id} de 90
          </span>
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            {question.text}
          </p>
        </div>
      </div>

      {/* 6-Point Likert Scale Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {SCALE_OPTIONS.map((opt) => {
            const isSelected = selectedScore === opt.value;

            // Rating styles
            const getButtonTheme = () => {
              if (!isSelected) {
                return 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-700 bg-slate-50/50';
              }
              switch (opt.value) {
                case 1:
                  return 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200';
                case 2:
                  return 'border-teal-500 bg-teal-50 text-teal-800 ring-2 ring-teal-200';
                case 3:
                  return 'border-amber-500 bg-amber-50 text-amber-800 ring-2 ring-amber-200';
                case 4:
                  return 'border-orange-500 bg-orange-50 text-orange-800 ring-2 ring-orange-200';
                case 5:
                  return 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-200';
                case 6:
                  return 'border-red-600 bg-red-50 text-red-900 ring-2 ring-red-200';
                default:
                  return 'border-indigo-500 bg-indigo-50 text-indigo-800';
              }
            };

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSelectScore(opt.value)}
                className={`flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer relative group ${getButtonTheme()}`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isSelected
                        ? 'bg-current text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-600 group-hover:border-indigo-400'
                    }`}
                  >
                    <span className={isSelected ? 'text-white' : ''}>{opt.value}</span>
                  </span>
                  <kbd className="hidden sm:inline-block text-[10px] text-slate-400 bg-white/80 px-1 rounded border border-slate-200">
                    {opt.value}
                  </kbd>
                </div>

                <div className="w-full text-center">
                  <span className="text-xs font-semibold block leading-tight">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5 leading-tight">
                    {opt.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
