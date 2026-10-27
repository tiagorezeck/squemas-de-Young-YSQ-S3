import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TestRunner } from './components/TestRunner';
import { ReportDashboard } from './components/ReportDashboard';
import { HistoryModal } from './components/HistoryModal';
import { AssessmentReport, ParticipantProfile } from './types/ysq';
import { calculateAssessmentReport } from './utils/scoring';
import { DEMO_PRESETS } from './data/ysqData';

const STORAGE_SAVED_REPORTS = 'ysq_saved_reports_v1';
const STORAGE_DRAFT_ANSWERS = 'ysq_draft_answers_v1';
const STORAGE_DRAFT_PROFILE = 'ysq_draft_profile_v1';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'test' | 'report'>('welcome');
  const [participant, setParticipant] = useState<ParticipantProfile | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [report, setReport] = useState<AssessmentReport | null>(null);

  // History & Storage
  const [savedReports, setSavedReports] = useState<AssessmentReport[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SAVED_REPORTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [hasDraft, setHasDraft] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_DRAFT_ANSWERS);
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const handleToggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {
          setIsFullscreen((prev) => !prev);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {
            setIsFullscreen(false);
          });
        }
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };

  const handleToggleExpandAll = () => {
    setIsAllExpanded((prev) => !prev);
  };

  // Auto-save draft when answering in 'test' mode
  useEffect(() => {
    if (step === 'test' && participant && Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_DRAFT_ANSWERS, JSON.stringify(answers));
      localStorage.setItem(STORAGE_DRAFT_PROFILE, JSON.stringify(participant));
      setHasDraft(true);
    }
  }, [answers, participant, step]);

  // Save report to history
  const handleSaveToHistory = () => {
    if (!report) return;
    const exists = savedReports.some((r) => r.id === report.id);
    if (!exists) {
      const updated = [report, ...savedReports];
      setSavedReports(updated);
      localStorage.setItem(STORAGE_SAVED_REPORTS, JSON.stringify(updated));
    }
  };

  const isSavedInHistory = report ? savedReports.some((r) => r.id === report.id) : false;

  // Delete from history
  const handleDeleteReport = (reportId: string) => {
    const updated = savedReports.filter((r) => r.id !== reportId);
    setSavedReports(updated);
    localStorage.setItem(STORAGE_SAVED_REPORTS, JSON.stringify(updated));
  };

  // Import external report
  const handleImportReport = (importedReport: AssessmentReport) => {
    const updated = [importedReport, ...savedReports.filter((r) => r.id !== importedReport.id)];
    setSavedReports(updated);
    localStorage.setItem(STORAGE_SAVED_REPORTS, JSON.stringify(updated));
    setReport(importedReport);
    setStep('report');
  };

  // Start new test
  const handleStartTest = (profile: ParticipantProfile) => {
    setParticipant(profile);
    setAnswers({});
    setReport(null);
    setStep('test');
  };

  // Resume draft
  const handleResumeDraft = () => {
    try {
      const storedAns = localStorage.getItem(STORAGE_DRAFT_ANSWERS);
      const storedProf = localStorage.getItem(STORAGE_DRAFT_PROFILE);
      if (storedAns && storedProf) {
        setAnswers(JSON.parse(storedAns));
        setParticipant(JSON.parse(storedProf));
        setStep('test');
      }
    } catch (e) {
      console.error('Error resuming draft', e);
    }
  };

  // Load a demo preset
  const handleLoadPreset = (presetKey: string) => {
    const preset = DEMO_PRESETS[presetKey];
    if (!preset) return;

    const fullProfile: ParticipantProfile = {
      name: preset.participant.name || 'Avaliado Teste',
      age: preset.participant.age || '35',
      gender: preset.participant.gender || 'Feminino',
      profession: preset.participant.profession || 'Profissional',
      purpose: preset.participant.purpose || 'Demonstração do Sistema',
      assessorName: preset.participant.assessorName || 'Clínica de Psicologia',
      notes: preset.participant.notes,
      completedAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };

    const generatedReport = calculateAssessmentReport(fullProfile, preset.answers);
    setParticipant(fullProfile);
    setAnswers(preset.answers);
    setReport(generatedReport);
    setStep('report');
  };

  // Answer change handler
  const handleAnswerChange = (questionId: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  // Finish test
  const handleFinishTest = () => {
    if (!participant) return;
    const generatedReport = calculateAssessmentReport(participant, answers);
    setReport(generatedReport);
    setStep('report');

    // Clean draft
    localStorage.removeItem(STORAGE_DRAFT_ANSWERS);
    localStorage.removeItem(STORAGE_DRAFT_PROFILE);
    setHasDraft(false);

    // Auto save to history
    const updated = [generatedReport, ...savedReports];
    setSavedReports(updated);
    localStorage.setItem(STORAGE_SAVED_REPORTS, JSON.stringify(updated));
  };

  // Cancel test / Reset
  const handleResetToWelcome = () => {
    setStep('welcome');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header
        currentStep={step}
        savedCount={savedReports.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewTest={handleResetToWelcome}
        isAllExpanded={isAllExpanded}
        onToggleExpandAll={handleToggleExpandAll}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      <main className="py-6">
        {step === 'welcome' && (
          <WelcomeScreen
            onStartTest={handleStartTest}
            onLoadPreset={handleLoadPreset}
            hasSavedDraft={hasDraft}
            onResumeDraft={handleResumeDraft}
          />
        )}

        {step === 'test' && participant && (
          <TestRunner
            participant={participant}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onFinishTest={handleFinishTest}
            onCancelTest={handleResetToWelcome}
          />
        )}

        {step === 'report' && report && (
          <ReportDashboard
            report={report}
            onNewTest={handleResetToWelcome}
            onSaveToHistory={handleSaveToHistory}
            isSavedInHistory={isSavedInHistory}
            isAllExpanded={isAllExpanded}
          />
        )}
      </main>

      {/* History modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedReports={savedReports}
        onSelectReport={(selectedReport) => {
          setReport(selectedReport);
          setParticipant(selectedReport.participant);
          setAnswers(selectedReport.answers);
          setStep('report');
        }}
        onDeleteReport={handleDeleteReport}
        onImportReport={handleImportReport}
      />
    </div>
  );
}
