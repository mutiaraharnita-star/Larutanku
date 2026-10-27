import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizQuestions';
import { QuizReview } from './QuizReview';
import { useProgress } from '../../context/ProgressContext';
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const QuizSection: React.FC = () => {
  const { saveQuizResult } = useProgress();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
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
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    saveQuizResult(score, totalQuestions);
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
        questions={QUIZ_QUESTIONS}
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
          Kerjakan 10 soal pilihan ganda berikut untuk menguji pemahaman konsep teori Arrhenius,
          derajat ionisasi, dan analisis hasil pengamatan laboratorium.
        </p>

        {/* Progress Tracker */}
        <div className="quiz-progress-bar-wrap">
          <div className="quiz-prog-info">
            <span>
              Terjawab: <strong>{answeredCount}</strong> dari {totalQuestions} Soal
            </span>
            <span>Soal {currentIndex + 1} dari {totalQuestions}</span>
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
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;

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
            <span className="q-number-pill">Soal {currentIndex + 1}</span>
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
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
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
            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                id="quiz-btn-next"
                className="btn btn-primary"
                onClick={() => setCurrentIndex(currentIndex + 1)}
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
      {answeredCount > 0 && currentIndex !== totalQuestions - 1 && (
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
            <span>Selesaikan & Kumpulkan Kuis ({answeredCount}/{totalQuestions} Soal Terjawab)</span>
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
              Terdapat <strong>{unansweredCount}</strong> soal yang masih kosong.
              Apakah kamu yakin ingin mengumpulkan kuis sekarang?
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
