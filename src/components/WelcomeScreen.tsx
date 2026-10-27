import React, { useState } from 'react';
import { DEMO_PRESETS, SCALE_OPTIONS } from '../data/ysqData';
import { ParticipantProfile } from '../types/ysq';
import {
  Brain,
  Sparkles,
  Play,
  FileCheck2,
  Clock,
  Layers,
  HelpCircle,
  Award,
} from 'lucide-react';

interface WelcomeScreenProps {
  onStartTest: (profile: ParticipantProfile) => void;
  onLoadPreset: (presetKey: string) => void;
  hasSavedDraft: boolean;
  onResumeDraft: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartTest,
  onLoadPreset,
  hasSavedDraft,
  onResumeDraft,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Não informado');
  const [profession, setProfession] = useState('');
  const [purpose, setPurpose] = useState('Autoconhecimento e Avaliação Emocional');
  const [assessorName, setAssessorName] = useState('');
  const [notes, setNotes] = useState('');

  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Por favor, informe o nome do avaliado.');
      return;
    }
    setFormError('');

    const profile: ParticipantProfile = {
      name: name.trim(),
      age: age.trim() || undefined,
      gender: gender !== 'Não informado' ? gender : undefined,
      profession: profession.trim() || undefined,
      purpose,
      assessorName: assessorName.trim() || undefined,
      notes: notes.trim() || undefined,
      completedAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };

    onStartTest(profile);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Card */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
          <Brain className="w-4 h-4 text-indigo-600" />
          Terapia Focada em Esquemas &bull; Jeffrey Young
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Questionário de Esquemas de Young <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">YSQ-S3</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Avaliação clínica aprofundada dos 18 Esquemas Iniciais Desadaptativos (EIDs) e dos 5 Domínios
          com geração dinâmica de laudos explicativos, estilos de enfrentamento e plano terapêutico.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-3xl mx-auto text-left">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
              <Layers className="w-3.5 h-3.5 text-indigo-500" /> Dimensão
            </span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">90 Itens Validados</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
              <Brain className="w-3.5 h-3.5 text-rose-500" /> Estrutura
            </span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">18 Esquemas &bull; 5 Domínios</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Duração Média
            </span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">10 a 15 Minutos</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" /> Saída
            </span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">Laudo Dinâmico / PDF</p>
          </div>
        </div>
      </div>

      {/* Resume draft banner if any */}
      {hasSavedDraft && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Existe um teste em andamento salvo</p>
              <p className="text-xs text-slate-600">Deseja retomar de onde você parou?</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onResumeDraft}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-2xs shrink-0"
          >
            Continuar Teste Salvo
          </button>
        </div>
      )}

      {/* Quick Presets for Evaluator Demo */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl mb-10 border border-indigo-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" /> Demonstração Rápida para Avaliadores
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Explorar Perfis Prontos de Avaliação
            </h2>
          </div>
          <span className="text-xs text-indigo-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs self-start sm:self-auto">
            Sem precisar responder 90 perguntas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {Object.entries(DEMO_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              onClick={() => onLoadPreset(key)}
              className="text-left bg-white/10 hover:bg-white/15 p-4 rounded-2xl border border-white/10 hover:border-indigo-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-sm text-indigo-200 group-hover:text-white transition-colors block">
                  {preset.title}
                </span>
                <span className="text-xs text-slate-300 font-medium block mt-0.5">
                  {preset.subtitle}
                </span>
                <p className="text-[11px] text-slate-300/80 mt-2 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300 font-semibold group-hover:text-white">
                <span>Ver Laudo Completo</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Participant Registration & Test Starter */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-indigo-600" />
            Identificação do Avaliado para o Sistema de Assessment
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Esses dados serão inseridos no cabeçalho do laudo psicométrico e no relatório impresso em PDF.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nome Completo do Avaliado *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Dra. Ana Paula Silveira"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Idade
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 34"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Gênero
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 outline-none transition-all bg-white"
                >
                  <option value="Não informado">Prefiro não informar</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Não-binário">Não-binário</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Profissão / Ocupação
              </label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Ex: Gestor de Projetos / Advogado"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Finalidade / Contexto do Assessment
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 outline-none transition-all bg-white"
              >
                <option value="Autoconhecimento e Avaliação Emocional">
                  Autoconhecimento e Avaliação Emocional
                </option>
                <option value="Psicoterapia Focada em Esquemas">
                  Psicoterapia Focada em Esquemas (TFE)
                </option>
                <option value="Desenvolvimento de Liderança e Carreira">
                  Desenvolvimento de Liderança e Carreira
                </option>
                <option value="Avaliação Diagnóstica Psicológica">
                  Avaliação Diagnóstica Psicológica
                </option>
                <option value="Pesquisa Científica / Acadêmica">
                  Pesquisa Científica / Acadêmica
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Avaliador / Psicólogo Responsável (Opcional)
              </label>
              <input
                type="text"
                value={assessorName}
                onChange={(e) => setAssessorName(e.target.value)}
                placeholder="Ex: Dr. Marcelo Ramos (CRP 06/12345)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Notas ou Motivo da Queixa (Opcional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Queixa de ansiedade e autocobrança excessiva"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Scale Legend Preview */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              Escala de Resposta Utilizada no Questionário (1 a 6)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
              {SCALE_OPTIONS.map((opt) => (
                <div key={opt.value} className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="font-extrabold text-indigo-600 block text-sm">
                    {opt.value}
                  </span>
                  <span className="font-semibold text-slate-800 block text-[11px] leading-tight mt-0.5">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {opt.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              Iniciar Questionário YSQ-S3 (90 Itens)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
