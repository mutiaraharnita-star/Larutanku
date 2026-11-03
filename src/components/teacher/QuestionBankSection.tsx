import React, { useState } from 'react';
import {
  FileQuestion,
  Plus,
  RotateCcw,
  Search,
  CheckCircle2,
  Trash2,
  Edit3,
  BookOpen,
  Sparkles,
  Info,
  X,
  AlertTriangle,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import type { QuizQuestion } from '../../types/chemistry';

export const QuestionBankSection: React.FC = () => {
  const {
    quizQuestions,
    addQuizQuestion,
    updateQuizQuestion,
    deleteQuizQuestion,
    resetQuizQuestionsToDefault,
  } = useProgress();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<{
    question: string;
    topic: string;
    difficulty: 'Dasar' | 'Menengah' | 'HOTS';
    options: [string, string, string, string, string];
    correctIndex: number;
    explanation: string;
  }>({
    question: '',
    topic: '',
    difficulty: 'Menengah',
    options: ['', '', '', '', ''],
    correctIndex: 0,
    explanation: '',
  });

  const [formError, setFormError] = useState<string>('');

  // Delete confirmation modal state
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Filtered Questions
  const filteredQuestions = quizQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDiff =
      selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesDiff;
  });

  // Difficulty counts
  const dasarCount = quizQuestions.filter((q) => q.difficulty === 'Dasar').length;
  const menengahCount = quizQuestions.filter((q) => q.difficulty === 'Menengah').length;
  const hotsCount = quizQuestions.filter((q) => q.difficulty === 'HOTS').length;

  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormData({
      question: '',
      topic: 'Larutan Elektrolit & Nonelektrolit',
      difficulty: 'Menengah',
      options: ['', '', '', '', ''],
      correctIndex: 0,
      explanation: '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q: QuizQuestion) => {
    setEditingQuestion(q);
    setFormData({
      question: q.question,
      topic: q.topic,
      difficulty: q.difficulty,
      options: [
        q.options[0] || '',
        q.options[1] || '',
        q.options[2] || '',
        q.options[3] || '',
        q.options[4] || '',
      ],
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.question.trim()) {
      setFormError('Pertanyaan kuis tidak boleh kosong.');
      return;
    }
    if (!formData.topic.trim()) {
      setFormError('Topik materi kuis harus diisi.');
      return;
    }
    if (formData.options.some((opt) => !opt.trim())) {
      setFormError('Semua 5 pilihan jawaban (A, B, C, D, E) wajib diisi.');
      return;
    }
    if (!formData.explanation.trim()) {
      setFormError('Pembahasan ilmiah wajib diisi agar siswa dapat belajar dari jawaban.');
      return;
    }

    if (editingQuestion) {
      updateQuizQuestion({
        ...editingQuestion,
        question: formData.question.trim(),
        topic: formData.topic.trim(),
        difficulty: formData.difficulty,
        options: formData.options.map((o) => o.trim()),
        correctIndex: formData.correctIndex,
        explanation: formData.explanation.trim(),
      });
    } else {
      addQuizQuestion({
        question: formData.question.trim(),
        topic: formData.topic.trim(),
        difficulty: formData.difficulty,
        options: formData.options.map((o) => o.trim()),
        correctIndex: formData.correctIndex,
        explanation: formData.explanation.trim(),
      });
    }

    setIsModalOpen(false);
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...formData.options] as [string, string, string, string, string];
    updated[index] = val;
    setFormData({ ...formData, options: updated });
  };

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="teacher-section-container" id="bank-soal-section">
      {/* Header */}
      <div className="section-header-compact">
        <div className="section-pill teacher-pill">
          <FileQuestion size={14} />
          <span>Panel Kelola Pendidik</span>
        </div>
        <h1 className="page-main-title">Bank Soal Kuis Kimia XII</h1>
        <p className="page-main-desc">
          Kelola soal evaluasi daya hantar listrik larutan elektrolit dan nonelektrolit. Soal yang
          ditambah atau disunting di panel ini langsung tersinkronisasi ke Kuis Siswa.
        </p>

        {/* Quick Stats Badges */}
        <div className="bank-soal-stats">
          <div className="bs-stat-pill bs-total">
            <span className="bs-stat-val">{quizQuestions.length}</span>
            <span className="bs-stat-lbl">Total Soal</span>
          </div>
          <div className="bs-stat-pill bs-dasar">
            <span className="bs-stat-val">{dasarCount}</span>
            <span className="bs-stat-lbl">Dasar</span>
          </div>
          <div className="bs-stat-pill bs-menengah">
            <span className="bs-stat-val">{menengahCount}</span>
            <span className="bs-stat-lbl">Menengah</span>
          </div>
          <div className="bs-stat-pill bs-hots">
            <span className="bs-stat-val">{hotsCount}</span>
            <span className="bs-stat-lbl">HOTS</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, and Add Button */}
      <div className="bank-soal-controls-bar">
        <div className="bs-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari berdasarkan kata kunci soal, topik, atau pembahasan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="bs-filter-actions">
          <div className="difficulty-tabs">
            <button
              type="button"
              className={`diff-tab-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('all')}
            >
              Semua ({quizQuestions.length})
            </button>
            <button
              type="button"
              className={`diff-tab-btn ${selectedDifficulty === 'Dasar' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('Dasar')}
            >
              Dasar ({dasarCount})
            </button>
            <button
              type="button"
              className={`diff-tab-btn ${selectedDifficulty === 'Menengah' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('Menengah')}
            >
              Menengah ({menengahCount})
            </button>
            <button
              type="button"
              className={`diff-tab-btn ${selectedDifficulty === 'HOTS' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('HOTS')}
            >
              HOTS ({hotsCount})
            </button>
          </div>

          <div className="bs-action-buttons">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={resetQuizQuestionsToDefault}
              title="Kembalikan ke 10 soal kurikulum standar"
            >
              <RotateCcw size={15} />
              <span>Reset Standar</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm btn-glow"
              onClick={handleOpenAddModal}
            >
              <Plus size={16} />
              <span>Tambah Soal Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="questions-list-wrapper">
        {filteredQuestions.length === 0 ? (
          <div className="empty-state-card">
            <FileQuestion size={48} className="empty-icon" />
            <h3 className="empty-title">Tidak ada soal yang cocok</h3>
            <p className="empty-desc">
              Pencarian dengan kata kunci &quot;{searchTerm}&quot; atau filter &quot;{selectedDifficulty}&quot; tidak
              menemukan soal.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('all');
              }}
            >
              Hapus Filter
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            return (
              <div key={q.id} className="bs-question-card" id={`bank-soal-item-${q.id}`}>
                <div className="bs-card-top">
                  <div className="bs-card-meta">
                    <span className="bs-num-badge">Soal #{index + 1}</span>
                    <span className="bs-topic-tag">{q.topic}</span>
                    <span className={`q-difficulty-badge ${q.difficulty.toLowerCase()}`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="bs-card-actions">
                    <button
                      type="button"
                      className="btn-icon-action btn-edit"
                      onClick={() => handleOpenEditModal(q)}
                      title="Edit soal ini"
                      aria-label="Edit soal"
                    >
                      <Edit3 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="btn-icon-action btn-delete"
                      onClick={() => setDeletingId(q.id)}
                      title="Hapus soal ini"
                      aria-label="Hapus soal"
                    >
                      <Trash2 size={16} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <p className="bs-question-text">{q.question}</p>

                {/* Options Grid */}
                <div className="bs-options-preview">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`bs-option-row ${isCorrect ? 'is-correct' : ''}`}
                      >
                        <span className="bs-opt-letter">{optionLetters[optIdx]}</span>
                        <span className="bs-opt-text">{opt}</span>
                        {isCorrect && (
                          <span className="bs-correct-tag">
                            <CheckCircle2 size={14} /> Kunci Jawaban
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Scientific Explanation Callout */}
                <div className="bs-explanation-box">
                  <div className="bs-exp-header">
                    <Info size={15} />
                    <span>Pembahasan Ilmiah (Penjelasan Konsep):</span>
                  </div>
                  <p className="bs-exp-text">{q.explanation}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId !== null && (
        <div className="modal-backdrop" onClick={() => setDeletingId(null)}>
          <div
            className="confirm-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
          >
            <div className="confirm-icon-wrapper danger-tone">
              <AlertTriangle size={32} />
            </div>
            <h3 className="confirm-title">Hapus Soal Ini?</h3>
            <p className="confirm-desc">
              Soal akan dihapus permanen dari Bank Soal dan tidak akan muncul lagi di kuis siswa.
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeletingId(null)}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteQuizQuestion(deletingId);
                  setDeletingId(null);
                }}
              >
                Ya, Hapus Soal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="bs-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="bs-modal-header">
              <div className="bs-m-header-left">
                <FileQuestion size={24} className="bs-m-icon" />
                <div>
                  <h2 className="bs-modal-title">
                    {editingQuestion ? 'Edit Soal Kuis' : 'Tambah Soal Baru'}
                  </h2>
                  <p className="bs-modal-sub">
                    {editingQuestion
                      ? 'Perbarui rincian pertanyaan, pilihan jawaban, kunci, atau pembahasan.'
                      : 'Buat pertanyaan baru untuk memperkaya bank evaluasi kimia XII.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="auth-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="bs-modal-form">
              {formError && (
                <div className="auth-alert alert-error">
                  <AlertTriangle size={18} />
                  <span>{formError}</span>
                </div>
              )}

              {/* Row 1: Topic & Difficulty */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    <BookOpen size={14} />
                    <span>Topik / Materi Pokok</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: Derajat Ionisasi (α), Teori Arrhenius..."
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Sparkles size={14} />
                    <span>Tingkat Kesulitan</span>
                  </label>
                  <select
                    className="form-control"
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as 'Dasar' | 'Menengah' | 'HOTS',
                      })
                    }
                  >
                    <option value="Dasar">Dasar (Pemahaman Konsep)</option>
                    <option value="Menengah">Menengah (Aplikasi & Perhitungan)</option>
                    <option value="HOTS">HOTS (Analisis Sintesis & Penalaran)</option>
                  </select>
                </div>
              </div>

              {/* Question Statement */}
              <div className="form-group">
                <label className="form-label">
                  <span>Teks Pertanyaan / Soal</span>
                </label>
                <textarea
                  className="form-control form-textarea"
                  rows={4}
                  placeholder="Tuliskan butir soal secara jelas dan ilmiah..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                />
              </div>

              {/* 5 Options with Correct Answer Selection */}
              <div className="form-group">
                <label className="form-label">
                  <span>Pilihan Jawaban & Tentukan Kunci Jawaban Benar</span>
                </label>
                <div className="options-edit-container">
                  {formData.options.map((opt, optIdx) => {
                    const isSelectedAsCorrect = formData.correctIndex === optIdx;
                    return (
                      <div
                        key={optIdx}
                        className={`option-edit-row ${isSelectedAsCorrect ? 'is-checked-correct' : ''}`}
                      >
                        <label className="radio-label" title="Pilih sebagai kunci jawaban yang benar">
                          <input
                            type="radio"
                            name="correct_index_radio"
                            checked={isSelectedAsCorrect}
                            onChange={() => setFormData({ ...formData, correctIndex: optIdx })}
                          />
                          <span className="opt-label-badge">{optionLetters[optIdx]}</span>
                        </label>
                        <input
                          type="text"
                          className="form-control opt-input"
                          placeholder={`Pilihan ${optionLetters[optIdx]}...`}
                          value={opt}
                          onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                          required
                        />
                        {isSelectedAsCorrect && (
                          <span className="selected-correct-tag">Kunci Jawaban</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <small className="form-hint">
                  * Klik lingkaran huruf di sebelah kiri untuk menandai pilihan tersebut sebagai kunci jawaban yang benar.
                </small>
              </div>

              {/* Explanation */}
              <div className="form-group">
                <label className="form-label">
                  <Info size={14} />
                  <span>Pembahasan Ilmiah & Konsep Jawaban</span>
                </label>
                <textarea
                  className="form-control form-textarea"
                  rows={3}
                  placeholder="Jelaskan dasar teori mengapa jawaban tersebut benar sehingga siswa dapat merefleksikan hasil kuis..."
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  required
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="bs-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-glow">
                  {editingQuestion ? 'Simpan Perubahan Soal' : 'Tambahkan ke Bank Soal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

