import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { LEARNING_MODULES } from '../../data/materials';
import { SOLUTIONS_DATA } from '../../data/solutions';
import {
  BarChart3,
  Award,
  CheckCircle2,
  BookOpen,
  FlaskConical,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ClipboardList,
  AlertTriangle,
} from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const {
    progress,
    resetAllProgress,
    overallPercentage,
    setActiveTab,
  } = useProgress();

  const [showResetModal, setShowResetModal] = useState(false);

  // Define Achievements / Badges
  const badges = [
    {
      id: 'badge-reader',
      title: 'Pembaca Tekun',
      desc: 'Menyelesaikan minimal 3 bab materi teori',
      icon: <BookOpen size={24} />,
      isUnlocked: progress.completedModules.length >= 3,
    },
    {
      id: 'badge-scholar',
      title: 'Master Konsep Kimia',
      desc: 'Menyelesaikan seluruh 5 bab modul materi',
      icon: <Sparkles size={24} />,
      isUnlocked: progress.completedModules.length === LEARNING_MODULES.length,
    },
    {
      id: 'badge-lab-starter',
      title: 'Peneliti Laboratorium',
      desc: 'Menguji minimal 4 larutan berbeda di lab virtual',
      icon: <FlaskConical size={24} />,
      isUnlocked: progress.testedSolutions.length >= 4,
    },
    {
      id: 'badge-lab-master',
      title: 'Ahli Eksperimen Elektrolit',
      desc: 'Mencatat minimal 3 pengamatan ke jurnal praktikum',
      icon: <ClipboardList size={24} />,
      isUnlocked: progress.observations.length >= 3,
    },
    {
      id: 'badge-quiz-pass',
      title: 'Lulus Uji Evaluasi',
      desc: 'Mencapai skor kuis minimal 70%',
      icon: <CheckCircle2 size={24} />,
      isUnlocked: progress.highestQuizScore >= 70,
    },
    {
      id: 'badge-quiz-perfect',
      title: 'Kimiawan Teladan (Juara Kuis)',
      desc: 'Mencapai skor kuis sempurna 90-100%',
      icon: <Award size={24} />,
      isUnlocked: progress.highestQuizScore >= 90,
    },
  ];

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="progress-dashboard-container" id="progress-dashboard">
      {/* Header */}
      <div className="section-header-compact">
        <div className="section-pill">
          <BarChart3 size={14} />
          <span>Laporan Pembelajaran Mandiri</span>
        </div>
        <h1 className="page-main-title">Progres & Pencapaian Belajar</h1>
        <p className="page-main-desc">
          Pantau sejauh mana kamu telah mengeksplorasi modul materi, mencoba simulasi praktikum
          laboratorium virtual, dan hasil evaluasi kuis.
        </p>
      </div>

      {/* Main Overall Progress Banner */}
      <div className="overall-progress-card">
        <div className="op-left">
          <div className="op-ring-wrapper">
            <svg className="progress-ring-svg" viewBox="0 0 120 120">
              <circle
                className="ring-circle-bg"
                strokeWidth="10"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
              />
              <circle
                className="ring-circle-fill"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallPercentage / 100)}`}
                strokeLinecap="round"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
              />
            </svg>
            <div className="op-ring-center">
              <span className="op-ring-pct">{overallPercentage}%</span>
              <span className="op-ring-lbl">Selesai</span>
            </div>
          </div>

          <div className="op-text-block">
            <h2 className="op-title">Penguasaan Materi Elektrolit XII</h2>
            <p className="op-desc">
              Perhitungan progres menggabungkan penyelesaian modul membaca teori (40%), keaktifan uji
              simulasi laboratorium (30%), dan skor tertinggi kuis evaluasi (30%).
            </p>
            <div className="op-tags">
              <span className="op-tag">
                <CheckCircle2 size={14} /> {progress.completedModules.length} dari 5 Bab Dibaca
              </span>
              <span className="op-tag">
                <FlaskConical size={14} /> {progress.testedSolutions.length} dari 11 Larutan Diuji
              </span>
              <span className="op-tag">
                <Award size={14} /> Skor Kuis Tertinggi: {progress.highestQuizScore}%
              </span>
            </div>
          </div>
        </div>

        <div className="op-right-action">
          <button
            type="button"
            id="btn-trigger-reset-progress"
            className="btn btn-outline btn-sm btn-danger-tone"
            onClick={() => setShowResetModal(true)}
          >
            <RotateCcw size={15} />
            <span>Reset Progres</span>
          </button>
        </div>
      </div>

      {/* 3 Detailed Progress Breakdown Cards */}
      <div className="progress-breakdown-grid">
        {/* Card 1: Modul Materi */}
        <div className="breakdown-card">
          <div className="bd-header">
            <div className="bd-icon bg-indigo">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="bd-title">Modul Teori</h3>
              <span className="bd-meta">
                {progress.completedModules.length} dari {LEARNING_MODULES.length} Bab Selesai
              </span>
            </div>
          </div>

          <div className="bd-module-checklist">
            {LEARNING_MODULES.map((m) => {
              const isDone = progress.completedModules.includes(m.id);
              return (
                <div key={m.id} className={`bd-check-row ${isDone ? 'done' : ''}`}>
                  <span className="bd-row-bullet">
                    {isDone ? <CheckCircle2 size={16} className="text-teal" /> : '○'}
                  </span>
                  <span className="bd-row-text">Bab {m.number}: {m.title}</span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline full-width"
            onClick={() => setActiveTab('materi')}
          >
            Buka Materi Pelajaran
          </button>
        </div>

        {/* Card 2: Lab Virtual */}
        <div className="breakdown-card">
          <div className="bd-header">
            <div className="bd-icon bg-cyan">
              <FlaskConical size={20} />
            </div>
            <div>
              <h3 className="bd-title">Laboratorium Virtual</h3>
              <span className="bd-meta">
                {progress.testedSolutions.length} dari {SOLUTIONS_DATA.length} Larutan Diuji
              </span>
            </div>
          </div>

          <p className="bd-subtext">
            Kamu telah menguji <strong>{progress.testedSolutions.length}</strong> jenis larutan dan
            menyimpan <strong>{progress.observations.length}</strong> catatan pengamatan di lembar kerja jurnal.
          </p>

          <div className="bd-progress-bar-wrap">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${Math.min(100, (progress.testedSolutions.length / SOLUTIONS_DATA.length) * 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-primary full-width"
            onClick={() => setActiveTab('lab')}
          >
            Lanjut Eksperimen di Lab
          </button>
        </div>

        {/* Card 3: Kuis & Evaluasi */}
        <div className="breakdown-card">
          <div className="bd-header">
            <div className="bd-icon bg-amber">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="bd-title">Evaluasi Kuis</h3>
              <span className="bd-meta">{progress.totalQuizAttempts} Kali Pengerjaan</span>
            </div>
          </div>

          {progress.lastQuizResult ? (
            <div className="bd-quiz-info">
              <div className="bd-quiz-score-badge">
                <span className="big-score">{progress.highestQuizScore}</span>
                <span className="denom">/ 100</span>
              </div>
              <p className="bd-subtext">
                Pengerjaan terakhir: {progress.lastQuizResult.score} dari {progress.lastQuizResult.total} benar ({progress.lastQuizResult.percentage}%) pada {progress.lastQuizResult.date}.
              </p>
            </div>
          ) : (
            <div className="bd-quiz-empty">
              <p className="bd-subtext">
                Kamu belum pernah mengerjakan kuis evaluasi. Mulai sekarang untuk menguji pemahamanmu!
              </p>
            </div>
          )}

          <button
            type="button"
            className="btn btn-sm btn-outline full-width"
            onClick={() => setActiveTab('kuis')}
          >
            {progress.totalQuizAttempts > 0 ? 'Coba Kuis Lagi' : 'Mulai Kuis Pertama'}
          </button>
        </div>
      </div>

      {/* Lencana Pencapaian (Badges) */}
      <div className="badges-section">
        <div className="badges-header">
          <div className="b-title-group">
            <Award size={22} className="text-amber" />
            <h3 className="badges-main-title">Lencana Pencapaian Belajar</h3>
          </div>
          <span className="badges-count-pill">
            {unlockedCount} dari {badges.length} Terbuka
          </span>
        </div>

        <div className="badges-grid">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`badge-card ${b.isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="badge-icon-box">{b.icon}</div>
              <div className="badge-text-box">
                <h4 className="badge-name">{b.title}</h4>
                <p className="badge-requirement">{b.desc}</p>
                <span className={`badge-status-tag ${b.isUnlocked ? 'unlocked' : 'locked'}`}>
                  {b.isUnlocked ? '✓ Terbuka' : '🔒 Belum Terbuka'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Lab Journal Records (Table preview) */}
      {progress.observations.length > 0 && (
        <div className="dashboard-journal-preview">
          <div className="d-journal-header">
            <h3 className="d-journal-title">
              <ClipboardList size={18} /> Jurnal Praktikum Tersimpan ({progress.observations.length})
            </h3>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => setActiveTab('lab')}
            >
              Kelola di Lab &rarr;
            </button>
          </div>
          <div className="table-responsive">
            <table className="lab-journal-table">
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Larutan</th>
                  <th>Rumus</th>
                  <th>Molaritas</th>
                  <th>Lampu</th>
                  <th>Gelembung</th>
                  <th>Kesimpulan</th>
                </tr>
              </thead>
              <tbody>
                {progress.observations.slice(0, 5).map((obs) => (
                  <tr key={obs.id}>
                    <td>{obs.timestamp}</td>
                    <td><strong>{obs.solutionName}</strong></td>
                    <td><code className="chem-code">{obs.chemicalFormula}</code></td>
                    <td>{obs.concentration}</td>
                    <td>{obs.bulbObservation}</td>
                    <td>{obs.bubbleObservation}</td>
                    <td>
                      <span className="badge-tag">{obs.conclusion}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="modal-backdrop">
          <div className="modal-content-box">
            <div className="modal-icon-wrap danger">
              <AlertTriangle size={28} />
            </div>
            <h3 className="modal-title">Reset Seluruh Progres Belajar?</h3>
            <p className="modal-desc">
              Tindakan ini akan mengosongkan status bab materi yang telah dipelajari, riwayat skor
              kuis, dan seluruh catatan pengamatan di jurnal praktikum. Data yang telah dihapus tidak
              dapat dikembalikan.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowResetModal(false)}
              >
                Batal
              </button>
              <button
                type="button"
                id="btn-confirm-reset"
                className="btn btn-danger"
                onClick={() => {
                  resetAllProgress();
                  setShowResetModal(false);
                }}
              >
                Ya, Reset Progres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
