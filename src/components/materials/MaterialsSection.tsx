import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronLeft,
  FlaskConical,
  Sparkles,
  Search,
} from 'lucide-react';
import { LEARNING_MODULES } from '../../data/materials';
import { useProgress } from '../../context/ProgressContext';

export const MaterialsSection: React.FC = () => {
  const { progress, toggleModuleCompleted, setActiveTab } = useProgress();
  const [selectedModuleId, setSelectedModuleId] = useState<string>(LEARNING_MODULES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentModuleIndex = LEARNING_MODULES.findIndex((m) => m.id === selectedModuleId);
  const currentModule = LEARNING_MODULES[currentModuleIndex] || LEARNING_MODULES[0];
  const isCurrentCompleted = progress.completedModules.includes(currentModule.id);

  // Filter modules if search query exists
  const filteredModules = LEARNING_MODULES.filter((mod) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = mod.title.toLowerCase().includes(q) || mod.subtitle.toLowerCase().includes(q);
    const contentMatch = mod.sections.some(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.content.some((c) => c.toLowerCase().includes(q))
    );
    return titleMatch || contentMatch;
  });

  const handleNextModule = () => {
    if (currentModuleIndex < LEARNING_MODULES.length - 1) {
      setSelectedModuleId(LEARNING_MODULES[currentModuleIndex + 1].id);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      setSelectedModuleId(LEARNING_MODULES[currentModuleIndex - 1].id);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="materials-container" id="materials-section">
      {/* HEADER SECTION */}
      <div className="section-header-compact">
        <div className="section-pill">
          <BookOpen size={14} />
          <span>Materi Pembelajaran Kimia SMA Kelas XII</span>
        </div>
        <h1 className="page-main-title">Larutan Elektrolit & Nonelektrolit</h1>
        <p className="page-main-desc">
          Pelajari konsep teoritis dari tingkat makroskopis (nyala lampu & gelembung) hingga tingkat
          submikroskopis (pergerakan ion kation-anion dan molekul pelarut).
        </p>

        {/* Progress Tracker Bar */}
        <div className="materials-progress-card">
          <div className="mat-prog-info">
            <span className="mat-prog-text">
              Progres Membaca: <strong>{progress.completedModules.length}</strong> dari{' '}
              <strong>{LEARNING_MODULES.length}</strong> Bab Selesai
            </span>
            <span className="mat-prog-pct">
              {Math.round((progress.completedModules.length / LEARNING_MODULES.length) * 100)}%
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${(progress.completedModules.length / LEARNING_MODULES.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="materials-search-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          id="materials-search-input"
          className="search-input"
          placeholder="Cari konsep (misal: Arrhenius, ionisasi, aki, kovalen, sukrosa)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
          >
            Bersihkan
          </button>
        )}
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div className="materials-layout">
        {/* SIDEBAR: MODULE LIST */}
        <aside className="materials-sidebar">
          <h3 className="sidebar-title">Daftar Bab Materi</h3>
          <div className="module-nav-list">
            {filteredModules.map((mod) => {
              const isActive = mod.id === selectedModuleId;
              const isCompleted = progress.completedModules.includes(mod.id);

              return (
                <button
                  key={mod.id}
                  id={`module-nav-btn-${mod.id}`}
                  type="button"
                  className={`module-nav-item ${isActive ? 'active' : ''} ${
                    isCompleted ? 'completed' : ''
                  }`}
                  onClick={() => {
                    setSelectedModuleId(mod.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                >
                  <div className="mod-nav-num">
                    {isCompleted ? <CheckCircle2 size={16} className="text-teal" /> : mod.number}
                  </div>
                  <div className="mod-nav-details">
                    <span className="mod-nav-title">{mod.title}</span>
                    <span className="mod-nav-meta">
                      <Clock size={12} /> {mod.estimatedMinutes} menit
                    </span>
                  </div>
                  <ChevronRight size={16} className="mod-nav-arrow" />
                </button>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="sidebar-help-card">
            <Sparkles size={20} className="help-icon" />
            <h4 className="help-title">Uji Praktik di Lab</h4>
            <p className="help-text">
              Sudah memahami teorinya? Uji langsung larutan di Laboratorium Virtual kami!
            </p>
            <button
              type="button"
              id="sidebar-goto-lab"
              className="btn btn-primary btn-sm full-width"
              onClick={() => setActiveTab('lab')}
            >
              <FlaskConical size={16} />
              <span>Buka Lab Virtual</span>
            </button>
          </div>
        </aside>

        {/* CONTENT AREA: ACTIVE MODULE */}
        <main className="materials-article-area">
          <article className="module-article-card">
            {/* Article Header */}
            <div className="article-header">
              <div className="article-meta-row">
                <span className="article-badge">Bab {currentModule.number}</span>
                <span className="article-time">
                  <Clock size={14} /> {currentModule.estimatedMinutes} Menit Membaca
                </span>
                {isCurrentCompleted && (
                  <span className="completed-tag">
                    <CheckCircle2 size={14} /> Sudah Dipelajari
                  </span>
                )}
              </div>

              <h2 className="article-title">{currentModule.title}</h2>
              <p className="article-subtitle">{currentModule.subtitle}</p>

              {/* Completion Action Button */}
              <div className="mark-complete-wrapper">
                <button
                  type="button"
                  id={`btn-toggle-complete-${currentModule.id}`}
                  className={`btn ${
                    isCurrentCompleted ? 'btn-completed-state' : 'btn-mark-complete'
                  }`}
                  onClick={() => toggleModuleCompleted(currentModule.id)}
                >
                  <CheckCircle2 size={18} />
                  <span>
                    {isCurrentCompleted
                      ? 'Telah Dipelajari (Klik untuk batalkan)'
                      : 'Tandai Selesai Dipelajari'}
                  </span>
                </button>
              </div>
            </div>

            <hr className="article-divider" />

            {/* Article Sections */}
            <div className="article-body">
              {currentModule.sections.map((sec) => (
                <div key={sec.id} className="article-section-block">
                  <h3 className="section-title-sm">{sec.title}</h3>

                  <div className="section-paragraphs">
                    {sec.content.map((p, i) => (
                      <p key={i} className="article-p">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Formula Box if available */}
                  {sec.formulaBox && (
                    <div className="formula-callout-box">
                      <div className="formula-callout-header">
                        <Sparkles size={16} />
                        <span>{sec.formulaBox.title}</span>
                      </div>
                      <div className="formula-math-display">{sec.formulaBox.formula}</div>
                      <p className="formula-desc">{sec.formulaBox.description}</p>
                    </div>
                  )}

                  {/* Key Takeaway Callout if available */}
                  {sec.keyTakeaway && (
                    <div className="takeaway-callout-box">
                      <div className="takeaway-badge">Konsep Kunci</div>
                      <p className="takeaway-text">{sec.keyTakeaway}</p>
                    </div>
                  )}

                  {/* Comparison Table if available */}
                  {sec.comparisonTable && (
                    <div className="table-wrapper-material">
                      <table className="material-data-table">
                        <thead>
                          <tr>
                            {sec.comparisonTable.headers.map((h, hi) => (
                              <th key={hi}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.comparisonTable.rows.map((row, ri) => (
                            <tr key={ri}>
                              {row.map((cell, ci) => (
                                <td key={ci}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}

              {/* Module Summary Box */}
              <div className="module-summary-card">
                <h4 className="summary-card-title">
                  <Sparkles size={18} /> Rangkuman Inti Bab {currentModule.number}
                </h4>
                <ul className="summary-bullets">
                  {currentModule.summary.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Nav / Next Steps */}
            <div className="article-footer-nav">
              <button
                type="button"
                id="btn-prev-module"
                className="btn btn-outline"
                disabled={currentModuleIndex === 0}
                onClick={handlePrevModule}
              >
                <ChevronLeft size={18} />
                <span>Bab Sebelumnya</span>
              </button>

              <button
                type="button"
                id="btn-article-goto-lab"
                className="btn btn-secondary"
                onClick={() => setActiveTab('lab')}
              >
                <FlaskConical size={18} />
                <span>Coba di Lab</span>
              </button>

              <button
                type="button"
                id="btn-next-module"
                className="btn btn-primary"
                disabled={currentModuleIndex === LEARNING_MODULES.length - 1}
                onClick={handleNextModule}
              >
                <span>Bab Selanjutnya</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
