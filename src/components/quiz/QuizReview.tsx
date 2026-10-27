import React from 'react';
import type { QuizQuestion } from '../../types/chemistry';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Sparkles,
  HelpCircle,
  FlaskConical,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface QuizReviewProps {
  questions: QuizQuestion[];
  userAnswers: Record<number, number>;
  onRetake: () => void;
}

export const QuizReview: React.FC<QuizReviewProps> = ({
  questions,
  userAnswers,
  onRetake,
}) => {
  const { setActiveTab } = useProgress();

  // Compute scores
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (ans === undefined) {
      skippedCount++;
    } else if (ans === q.correctIndex) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const total = questions.length;
  const scorePercentage = Math.round((correctCount / total) * 100);

  let feedbackBadge = {
    title: 'Perlu Penguatan Konsep',
    desc: 'Kamu masih perlu mempelajari ulang beberapa modul dan mencoba eksperimen di lab virtual untuk memahami konsep lebih baik.',
    colorClass: 'warning',
  };

  if (scorePercentage >= 85) {
    feedbackBadge = {
      title: 'Sempurna & Luar Biasa!',
      desc: 'Pemahamanmu tentang larutan elektrolit, ionisasi Arrhenius, dan derajat ionisasi sangat mendalam dan matang.',
      colorClass: 'excellent',
    };
  } else if (scorePercentage >= 70) {
    feedbackBadge = {
      title: 'Bagus! Kompetensi Tercapai',
      desc: 'Kamu telah memahami prinsip dasar daya hantar listrik dan klasifikasi larutan dengan baik.',
      colorClass: 'good',
    };
  }

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="quiz-review-container" id="quiz-review-panel">
      {/* Score Summary Banner */}
      <div className={`scorecard-banner ${feedbackBadge.colorClass}`}>
        <div className="scorecard-left">
          <div className="score-circle">
            <span className="score-num">{scorePercentage}</span>
            <span className="score-denom">/ 100</span>
          </div>
          <div className="score-summary-text">
            <div className="score-badge-pill">
              <Award size={16} />
              <span>{feedbackBadge.title}</span>
            </div>
            <h2 className="scorecard-title">Hasil Evaluasi Belajar Kimia</h2>
            <p className="scorecard-desc">{feedbackBadge.desc}</p>
          </div>
        </div>

        <div className="scorecard-stats-grid">
          <div className="sc-stat correct">
            <CheckCircle2 size={20} />
            <div className="sc-stat-info">
              <span className="sc-val">{correctCount}</span>
              <span className="sc-lbl">Benar</span>
            </div>
          </div>
          <div className="sc-stat wrong">
            <XCircle size={20} />
            <div className="sc-stat-info">
              <span className="sc-val">{wrongCount}</span>
              <span className="sc-lbl">Salah</span>
            </div>
          </div>
          <div className="sc-stat skipped">
            <HelpCircle size={20} />
            <div className="sc-stat-info">
              <span className="sc-val">{skippedCount}</span>
              <span className="sc-lbl">Dilewati</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="review-actions-bar">
        <button
          type="button"
          id="btn-retake-quiz"
          className="btn btn-primary"
          onClick={onRetake}
        >
          <RotateCcw size={18} />
          <span>Ulangi Kuis (Coba Lagi)</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setActiveTab('materi')}
        >
          <BookOpen size={18} />
          <span>Pelajari Ulang Materi</span>
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => setActiveTab('lab')}
        >
          <FlaskConical size={18} />
          <span>Buka Lab Virtual</span>
        </button>
      </div>

      {/* Detailed Question Review List */}
      <div className="review-questions-list">
        <h3 className="review-list-title">Kunci Jawaban & Pembahasan Ilmiah Soal</h3>
        <p className="review-list-desc">
          Tinjau setiap butir pertanyaan untuk memahami konsep ilmiah di balik jawaban yang benar.
        </p>

        {questions.map((q, idx) => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns === q.correctIndex;
          const isAnswered = userAns !== undefined;

          return (
            <div
              key={q.id}
              className={`review-question-card ${
                !isAnswered ? 'skipped' : isCorrect ? 'correct' : 'wrong'
              }`}
            >
              <div className="review-q-header">
                <div className="review-q-num">
                  <span className="q-index">Soal {idx + 1}</span>
                  <span className="q-topic">{q.topic}</span>
                  <span className={`q-difficulty ${q.difficulty.toLowerCase()}`}>
                    {q.difficulty}
                  </span>
                </div>

                <div className="review-status-indicator">
                  {isAnswered ? (
                    isCorrect ? (
                      <span className="status-tag correct">
                        <CheckCircle2 size={16} /> Benar (+10 poin)
                      </span>
                    ) : (
                      <span className="status-tag wrong">
                        <XCircle size={16} /> Jawaban Salah
                      </span>
                    )
                  ) : (
                    <span className="status-tag skipped">
                      <HelpCircle size={16} /> Tidak Dijawab
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="review-q-body">
                <p className="q-text">{q.question}</p>

                {/* Option list */}
                <div className="review-options-grid">
                  {q.options.map((opt, optIdx) => {
                    const isKeyAnswer = optIdx === q.correctIndex;
                    const isUserChoice = optIdx === userAns;

                    let optClass = 'review-option';
                    if (isKeyAnswer) optClass += ' is-key';
                    if (isUserChoice && !isKeyAnswer) optClass += ' is-user-wrong';

                    return (
                      <div key={optIdx} className={optClass}>
                        <span className="opt-letter">{optionLetters[optIdx]}</span>
                        <span className="opt-text">{opt}</span>
                        {isKeyAnswer && (
                          <span className="opt-badge key">Kunci Jawaban</span>
                        )}
                        {isUserChoice && !isKeyAnswer && (
                          <span className="opt-badge wrong">Pilihan Kamu</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Scientific Explanation Box */}
                <div className="explanation-callout">
                  <div className="explanation-header">
                    <Sparkles size={16} className="text-amber" />
                    <strong>Pembahasan Ilmiah:</strong>
                  </div>
                  <p className="explanation-text">{q.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
