import React, { useState } from 'react';
import type { Solution, ElectrolyteType } from '../../types/chemistry';
import { SOLUTIONS_DATA } from '../../data/solutions';
import { Power, Save, RotateCcw, Filter, Check, Sliders } from 'lucide-react';

interface LabControlsProps {
  currentSolution: Solution;
  onSelectSolution: (sol: Solution) => void;
  isPowered: boolean;
  onTogglePower: () => void;
  concentration: number;
  onChangeConcentration: (conc: number) => void;
  onSaveObservation: () => void;
  onReset: () => void;
}

export const LabControls: React.FC<LabControlsProps> = ({
  currentSolution,
  onSelectSolution,
  isPowered,
  onTogglePower,
  concentration,
  onChangeConcentration,
  onSaveObservation,
  onReset,
}) => {
  const [filterCategory, setFilterCategory] = useState<ElectrolyteType | 'all'>('all');
  const [justSaved, setJustSaved] = useState(false);

  const filteredSolutions = SOLUTIONS_DATA.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  const handleSaveWithFeedback = () => {
    onSaveObservation();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const concentrationOptions = [0.1, 0.5, 1.0, 2.0];

  return (
    <div className="lab-controls-panel" id="lab-controls">
      {/* Category Filter Pills */}
      <div className="controls-group">
        <div className="group-label-row">
          <Filter size={15} />
          <span className="group-label">Kategori Larutan Kimia:</span>
        </div>
        <div className="filter-pill-list">
          <button
            type="button"
            className={`filter-pill ${filterCategory === 'all' ? 'active' : ''}`}
            onClick={() => setFilterCategory('all')}
          >
            Semua (11)
          </button>
          <button
            type="button"
            className={`filter-pill strong ${filterCategory === 'strong' ? 'active' : ''}`}
            onClick={() => setFilterCategory('strong')}
          >
            Elektrolit Kuat
          </button>
          <button
            type="button"
            className={`filter-pill weak ${filterCategory === 'weak' ? 'active' : ''}`}
            onClick={() => setFilterCategory('weak')}
          >
            Elektrolit Lemah
          </button>
          <button
            type="button"
            className={`filter-pill none ${filterCategory === 'none' ? 'active' : ''}`}
            onClick={() => setFilterCategory('none')}
          >
            Nonelektrolit
          </button>
        </div>
      </div>

      {/* Solution Selector Grid */}
      <div className="controls-group">
        <label htmlFor="solution-select-dropdown" className="group-label">
          Pilih Larutan untuk Diuji:
        </label>
        <div className="solution-buttons-grid">
          {filteredSolutions.map((sol) => {
            const isSelected = sol.id === currentSolution.id;
            return (
              <button
                key={sol.id}
                id={`sol-btn-${sol.id}`}
                type="button"
                className={`solution-card-btn ${sol.category} ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectSolution(sol)}
              >
                <div className="sol-btn-top">
                  <span className="sol-btn-formula">{sol.chemicalFormula}</span>
                  {isSelected && <Check size={14} className="check-badge" />}
                </div>
                <span className="sol-btn-name">{sol.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Concentration Adjustment & Master Switch */}
      <div className="controls-row-dual">
        {/* Concentration */}
        <div className="controls-group flex-1">
          <div className="group-label-row">
            <Sliders size={15} />
            <span className="group-label">Konsentrasi Larutan (Molaritas):</span>
          </div>
          <div className="conc-button-group">
            {concentrationOptions.map((c) => (
              <button
                key={c}
                type="button"
                className={`conc-btn ${concentration === c ? 'active' : ''}`}
                onClick={() => onChangeConcentration(c)}
              >
                {c.toFixed(1)} M
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Save & Reset */}
        <div className="controls-group action-buttons-group">
          <span className="group-label">Aksi Pengamatan:</span>
          <div className="btn-actions-wrap">
            <button
              type="button"
              id="lab-control-power-btn"
              className={`btn ${isPowered ? 'switch-toggle on' : 'switch-toggle off'}`}
              onClick={onTogglePower}
              title={isPowered ? 'Matikan saklar' : 'Nyalakan saklar'}
            >
              <Power size={16} />
              <span>{isPowered ? 'Saklar ON' : 'Saklar OFF'}</span>
            </button>

            <button
              type="button"
              id="lab-save-record-btn"
              className={`btn btn-save-obs ${justSaved ? 'saved-pulse' : ''}`}
              onClick={handleSaveWithFeedback}
              title="Simpan data ke tabel jurnal pengamatan"
            >
              <Save size={16} />
              <span>{justSaved ? 'Tersimpan!' : 'Catat Pengamatan'}</span>
            </button>

            <button
              type="button"
              id="lab-reset-btn"
              className="btn btn-outline btn-reset"
              onClick={onReset}
              title="Reset alat dan bilas elektroda"
            >
              <RotateCcw size={16} />
              <span>Bilas Elektroda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
