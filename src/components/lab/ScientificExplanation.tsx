import React from 'react';
import type { Solution } from '../../types/chemistry';
import { Sparkles, BookOpen, AlertCircle } from 'lucide-react';

interface ScientificExplanationProps {
  solution: Solution;
}

export const ScientificExplanation: React.FC<ScientificExplanationProps> = ({
  solution,
}) => {
  return (
    <div className="sci-explanation-card" id="scientific-explanation-panel">
      {/* Header */}
      <div className="sci-header">
        <div className="sci-header-title">
          <BookOpen size={20} className="text-blue" />
          <h3 className="sci-title">Penjelasan Ilmiah & Reaksi Kimia</h3>
        </div>
        <span className={`sci-cat-badge ${solution.category}`}>
          {solution.categoryLabel}
        </span>
      </div>

      <div className="sci-meta-grid">
        <div className="sci-meta-box">
          <span className="sci-meta-lbl">Derajat Ionisasi (&alpha;)</span>
          <strong className="sci-meta-val text-cyan">{solution.alphaText}</strong>
        </div>
        <div className="sci-meta-box">
          <span className="sci-meta-lbl">Daya Hantar Lampu</span>
          <strong className="sci-meta-val">{solution.bulbLabel}</strong>
        </div>
        <div className="sci-meta-box">
          <span className="sci-meta-lbl">Aktivitas Elektroda</span>
          <strong className="sci-meta-val">{solution.gasBubblesLabel}</strong>
        </div>
      </div>

      {/* Chemical Equation Box */}
      <div className="equation-container">
        <div className="equation-label">
          <Sparkles size={14} />
          <span>Persamaan Reaksi Ionisasi / Disosiasi:</span>
        </div>
        <div className="equation-code">{solution.ionizationEquation}</div>
      </div>

      {/* Detailed Scientific Reasoning */}
      <div className="sci-reasoning-body">
        <h4 className="sci-subhead">Mekanisme Pembawa Arus Listrik:</h4>
        <p className="sci-text">{solution.scientificExplanation}</p>

        <h4 className="sci-subhead">Penerapan Praktis & Kehidupan Sehari-hari:</h4>
        <p className="sci-text">{solution.practicalUse}</p>
      </div>

      {/* PRD Mandated Educational Disclaimer */}
      <div className="edu-disclaimer">
        <AlertCircle size={16} className="disclaimer-icon" />
        <span className="disclaimer-text">
          <strong>Catatan Edukasi:</strong> Simulasi ini merupakan model aproksimasi visual
          pembelajaran sains untuk memahami konsep ionisasi SMA, bukan hasil pengukuran eksperimen nyata laboratorium.
        </span>
      </div>
    </div>
  );
};
