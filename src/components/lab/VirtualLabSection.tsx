import React, { useState } from 'react';
import { SOLUTIONS_DATA } from '../../data/solutions';
import type { Solution } from '../../types/chemistry';
import { ApparatusView } from './ApparatusView';
import { SubmicroscopicView } from './SubmicroscopicView';
import { LabControls } from './LabControls';
import { ScientificExplanation } from './ScientificExplanation';
import { ObservationSheet } from './ObservationSheet';
import { useProgress } from '../../context/ProgressContext';
import { FlaskConical, Eye, Sparkles } from 'lucide-react';

export const VirtualLabSection: React.FC = () => {
  const { markSolutionTested, addLabRecord, setActiveTab } = useProgress();

  const [currentSolution, setCurrentSolution] = useState<Solution>(SOLUTIONS_DATA[0]);
  const [isPowered, setIsPowered] = useState<boolean>(true);
  const [concentration, setConcentration] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<'both' | 'apparatus' | 'submicro'>('both');

  const handleSelectSolution = (sol: Solution) => {
    setCurrentSolution(sol);
    markSolutionTested(sol.id);
  };

  const handleTogglePower = () => {
    setIsPowered(!isPowered);
  };

  const handleReset = () => {
    setIsPowered(false);
    setConcentration(1.0);
    // Switch to water to simulate rinsing
    const water = SOLUTIONS_DATA.find((s) => s.id === 'aquades');
    if (water) {
      setCurrentSolution(water);
    }
  };

  const handleSaveObservation = () => {
    let bulbText = isPowered ? currentSolution.bulbLabel : 'Lampu Padam (Saklar Mati)';
    let bubbleText = isPowered
      ? currentSolution.gasBubblesLabel
      : 'Tidak Ada Gelembung (Saklar Mati)';

    addLabRecord({
      solutionId: currentSolution.id,
      solutionName: currentSolution.name,
      chemicalFormula: currentSolution.chemicalFormula,
      concentration: `${concentration.toFixed(1)} M`,
      bulbObservation: bulbText,
      bubbleObservation: bubbleText,
      conclusion: currentSolution.categoryLabel,
    });
  };

  return (
    <div className="virtual-lab-container" id="virtual-lab-section">
      {/* Lab Header */}
      <div className="section-header-compact">
        <div className="section-pill">
          <FlaskConical size={14} />
          <span>Laboratorium Virtual Interaktif</span>
        </div>
        <h1 className="page-main-title">Simulasi Uji Daya Hantar Listrik</h1>
        <p className="page-main-desc">
          Uji konduktivitas listrik larutan asam, basa, garam, dan senyawa organik. Amati nyala lampu
          serta pembentukan gelembung gas secara makroskopis dan pergerakan ion pada tingkat
          submikroskopik.
        </p>
      </div>

      {/* View Switcher Pills */}
      <div className="lab-view-switcher">
        <span className="view-switch-label">Mode Tampilan:</span>
        <div className="view-switch-btns">
          <button
            type="button"
            className={`view-btn ${viewMode === 'both' ? 'active' : ''}`}
            onClick={() => setViewMode('both')}
          >
            <Sparkles size={14} />
            <span>Dual View (Alat & Ion)</span>
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'apparatus' ? 'active' : ''}`}
            onClick={() => setViewMode('apparatus')}
          >
            <FlaskConical size={14} />
            <span>Alat Praktikum Saja</span>
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'submicro' ? 'active' : ''}`}
            onClick={() => setViewMode('submicro')}
          >
            <Eye size={14} />
            <span>Partikel Ion Saja</span>
          </button>
        </div>
      </div>

      {/* Interactive Simulation Views */}
      <div className={`simulation-layout-grid ${viewMode}`}>
        {(viewMode === 'both' || viewMode === 'apparatus') && (
          <div className="sim-grid-col apparatus-col">
            <ApparatusView
              solution={currentSolution}
              isPowered={isPowered}
              togglePower={handleTogglePower}
              concentration={concentration}
            />
          </div>
        )}

        {(viewMode === 'both' || viewMode === 'submicro') && (
          <div className="sim-grid-col submicro-col">
            <SubmicroscopicView
              solution={currentSolution}
              isPowered={isPowered}
            />
          </div>
        )}
      </div>

      {/* Controls Panel */}
      <LabControls
        currentSolution={currentSolution}
        onSelectSolution={handleSelectSolution}
        isPowered={isPowered}
        onTogglePower={handleTogglePower}
        concentration={concentration}
        onChangeConcentration={setConcentration}
        onSaveObservation={handleSaveObservation}
        onReset={handleReset}
      />

      {/* Scientific Explanation Card */}
      <ScientificExplanation solution={currentSolution} />

      {/* Student Observation Sheet */}
      <ObservationSheet />

      {/* Next Step Banner */}
      <div className="lab-next-banner">
        <div className="banner-text-wrap">
          <h4 className="banner-title">Sudah Mencoba Berbagai Larutan?</h4>
          <p className="banner-desc">
            Uji pemahamanmu mengenai data pengamatan ini dengan mengerjakan Kuis Evaluasi Berpembahasan!
          </p>
        </div>
        <button
          type="button"
          id="btn-lab-goto-quiz"
          className="btn btn-primary btn-glow"
          onClick={() => setActiveTab('kuis')}
        >
          <span>Lanjut ke Kuis Evaluasi</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};
