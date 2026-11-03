import React, { useState } from 'react';
import { QuizReview } from './QuizReview';
import { useProgress } from '../../context/ProgressContext';
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle,
  FileQuestion,
  User,
} from 'lucide-react';

export const QuizSection: React.FC = () => {
  const {
    saveQuizResult,
    quizQuestions,
    addQuizSubmission,
    session,
    setActiveTab,
  } = useProgress();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const totalQuestions = quizQuestions.length;

  // Handle empty question bank
  if (totalQuestions === 0) {
    return (
      <div className="quiz-container" id="quiz-section">
        <div className="section-header-compact">
          <div className="section-pill">
            <HelpCircle size={14} />
            <span>Kuis & Evaluasi Kimia XII</span>
          </div>
          <h1 className="page-main-title">Uji Pemahaman Larutan Elektrolit</h1>
        </div>
        <div className="empty-state-card">
          <FileQuestion size={48} className="empty-icon" />
          <h3 className="empty-title">Bank Soal Masih Kosong</h3>
          <p className="empty-desc">
            Saat ini belum ada butir soal di Bank Soal. Guru dapat menambahkan soal baru melalui
            panel Bank Soal.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('beranda')}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Ensure currentIndex is in range
  const safeIndex = Math.min(currentIndex, totalQuestions - 1);
  const currentQ = quizQuestions[safeIndex] || quizQuestions[0];
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleSelectOption = (optIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    // Calculate final score
    let score = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);

    // Save student local progress
    saveQuizResult(score, totalQuestions);

    // Save into Teacher's centralized Rekap Nilai
    const studentName = session.isLoggedIn && session.name ? session.name : 'Siswa Kimia XII';
    const studentClass = session.studentClass || 'XII MIPA 1';

    addQuizSubmission({
      studentName,
      studentClass,
      score,
      totalQuestions,
      percentage,
      status: percentage >= 75 ? 'Lulus' : 'Remedial',
    });

    setIsSubmitted(true);
    setShowConfirmModal(false);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <QuizReview
        questions={quizQuestions}
        userAnswers={userAnswers}
        onRetake={handleRetake}
      />
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="quiz-container" id="quiz-section">
      {/* Quiz Header */}
      <div className="section-header-compact">
        <div className="section-pill">
          <HelpCircle size={14} />
          <span>Kuis & Evaluasi Kimia XII</span>
        </div>
        <h1 className="page-main-title">Uji Pemahaman Larutan Elektrolit</h1>
        <p className="page-main-desc">
          Kerjakan {totalQuestions} butir soal pilihan ganda berikut untuk menguji pemahaman konsep
          teori Arrhenius, derajat ionisasi, dan analisis hasil pengamatan laboratorium.
        </p>

        {/* Student Session Banner */}
        <div className="quiz-student-banner">
          <User size={15} />
          <span>
            Mengerjakan sebagai: <strong>{session.name}</strong> ({session.studentClass || 'XII MIPA 1'})
          </span>
          <span className="quiz-sync-hint">• Hasil kuis akan otomatis tercatat ke Rekap Nilai Guru</span>
        </div>

        {/* Progress Tracker */}
        <div className="quiz-progress-bar-wrap">
          <div className="quiz-prog-info">
            <span>
              Terjawab: <strong>{answeredCount}</strong> dari {totalQuestions} Soal
            </span>
            <span>
              Soal {safeIndex + 1} dari {totalQuestions}
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Stepper Buttons */}
      <div className="quiz-stepper-bar">
        <div className="stepper-grid">
          {quizQuestions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === safeIndex;

            return (
              <button
                key={q.id}
                id={`quiz-jump-btn-${idx + 1}`}
                type="button"
                className={`step-btn ${isCurrent ? 'active' : ''} ${
                  isAnswered ? 'answered' : ''
                }`}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="quiz-card" id="quiz-question-card">
        {/* Card Header Meta */}
        <div className="q-card-header">
          <div className="q-header-left">
            <span className="q-number-pill">Soal {safeIndex + 1}</span>
            <span className="q-topic-tag">{currentQ.topic}</span>
          </div>
          <span className={`q-difficulty-badge ${currentQ.difficulty.toLowerCase()}`}>
            Tingkat: {currentQ.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <div className="q-card-body">
          <p className="q-statement">{currentQ.question}</p>

          {/* Options */}
          <div className="q-options-container">
            {currentQ.options.map((opt, optIndex) => {
              const isSelected = userAnswers[currentQ.id] === optIndex;
              return (
                <button
                  key={optIndex}
                  id={`q-${currentQ.id}-opt-${optIndex}`}
                  type="button"
                  className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(optIndex)}
                >
                  <div className="opt-letter-circle">{optionLetters[optIndex]}</div>
                  <span className="opt-text-content">{opt}</span>
                  {isSelected && <CheckCircle2 size={18} className="opt-check-icon" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Navigation Footer */}
        <div className="q-card-footer">
          <button
            type="button"
            id="quiz-btn-prev"
            className="btn btn-outline"
            disabled={safeIndex === 0}
            onClick={() => setCurrentIndex(safeIndex - 1)}
          >
            <ChevronLeft size={18} />
            <span>Sebelumnya</span>
          </button>

          <div className="q-footer-middle">
            {unansweredCount > 0 ? (
              <span className="text-muted-sm">{unansweredCount} soal belum terjawab</span>
            ) : (
              <span className="text-success-sm">Semua soal sudah terjawab!</span>
            )}
          </div>

          <div className="q-footer-right">
            {safeIndex < totalQuestions - 1 ? (
              <button
                type="button"
                id="quiz-btn-next"
                className="btn btn-primary"
                onClick={() => setCurrentIndex(safeIndex + 1)}
              >
                <span>Selanjutnya</span>
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                id="quiz-btn-submit"
                className="btn btn-primary btn-glow"
                onClick={() => {
                  if (unansweredCount > 0) {
                    setShowConfirmModal(true);
                  } else {
                    handleSubmitQuiz();
                  }
                }}
              >
                <Send size={18} />
                <span>Kumpulkan Kuis</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Direct Submit Button if anywhere in quiz */}
      {answeredCount > 0 && safeIndex !== totalQuestions - 1 && (
        <div className="quiz-early-submit-bar">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (unansweredCount > 0) {
                setShowConfirmModal(true);
              } else {
                handleSubmitQuiz();
              }
            }}
          >
            <Send size={15} />
            <span>
              Selesaikan & Kumpulkan Kuis ({answeredCount}/{totalQuestions} Soal Terjawab)
            </span>
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal-content-box">
            <div className="modal-icon-wrap warning">
              <AlertCircle size={28} />
            </div>
            <h3 className="modal-title">Masih Ada Soal yang Belum Terjawab</h3>
            <p className="modal-desc">
              Kamu baru menjawab <strong>{answeredCount}</strong> dari {totalQuestions} soal.
              Terdapat <strong>{unansweredCount}</strong> soal yang masih kosong. Apakah kamu yakin
              ingin mengumpulkan kuis sekarang?
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowConfirmModal(false)}
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                type="button"
                id="btn-confirm-submit"
                className="btn btn-primary"
                onClick={handleSubmitQuiz}
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
