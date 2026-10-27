import React from 'react';
import type { Solution } from '../../types/chemistry';
import { Power } from 'lucide-react';

interface ApparatusViewProps {
  solution: Solution;
  isPowered: boolean;
  togglePower: () => void;
  concentration: number;
}

export const ApparatusView: React.FC<ApparatusViewProps> = ({
  solution,
  isPowered,
  togglePower,
  concentration,
}) => {
  // Determine actual bulb state when powered
  let effectiveBulbState: 'bright' | 'dim' | 'off' = 'off';
  let bubbleIntensity: 'many' | 'few' | 'none' = 'none';

  if (isPowered) {
    if (solution.category === 'strong') {
      effectiveBulbState = 'bright';
      bubbleIntensity = 'many';
    } else if (solution.category === 'weak') {
      // High concentration might make weak electrolyte slightly brighter, low concentration makes it very dim
      effectiveBulbState = concentration >= 1.0 ? 'dim' : 'dim';
      bubbleIntensity = 'few';
    } else {
      effectiveBulbState = 'off';
      bubbleIntensity = 'none';
    }
  }

  return (
    <div className="apparatus-container" id="apparatus-view">
      {/* Top Circuit Overhead: Battery & Switch */}
      <div className="circuit-overhead">
        {/* DC Power Supply */}
        <div className={`power-supply-box ${isPowered ? 'active' : ''}`}>
          <div className="power-indicator-led"></div>
          <div className="power-meta">
            <span className="power-label">Sumber Arus DC</span>
            <span className="power-voltage">9.0 V</span>
          </div>
        </div>

        {/* Electrical Switch */}
        <div className="switch-wrapper">
          <button
            type="button"
            id="lab-switch-toggle-btn"
            className={`switch-toggle ${isPowered ? 'on' : 'off'}`}
            onClick={togglePower}
            title={isPowered ? 'Klik untuk memutus saklar (OFF)' : 'Klik untuk menyambung saklar (ON)'}
          >
            <Power size={18} />
            <span>{isPowered ? 'SAKLAR ON' : 'SAKLAR OFF'}</span>
          </button>
        </div>

        {/* Light Bulb Fixture */}
        <div className="bulb-fixture">
          <div className="socket-base"></div>
          <div className={`bulb-globe ${effectiveBulbState}`}>
            {/* Filament */}
            <div className="bulb-filament"></div>
            {/* Glow Aura */}
            {effectiveBulbState === 'bright' && (
              <>
                <div className="bulb-glow-halo bright"></div>
                <div className="bulb-rays">
                  <span className="ray ray-1"></span>
                  <span className="ray ray-2"></span>
                  <span className="ray ray-3"></span>
                  <span className="ray ray-4"></span>
                </div>
              </>
            )}
            {effectiveBulbState === 'dim' && (
              <div className="bulb-glow-halo dim"></div>
            )}
          </div>
          <div className="bulb-label-tag">
            {isPowered ? (
              effectiveBulbState === 'bright' ? (
                <span className="text-bright">💡 Menyala Terang</span>
              ) : effectiveBulbState === 'dim' ? (
                <span className="text-dim">💡 Menyala Redup</span>
              ) : (
                <span className="text-off">⚫ Lampu Padam</span>
              )
            ) : (
              <span className="text-muted">Saklar Terbuka</span>
            )}
          </div>
        </div>
      </div>

      {/* Circuit Wires */}
      <div className="wires-layout">
        <svg className="wires-svg" viewBox="0 0 500 90" preserveAspectRatio="none">
          {/* Left Wire (Red / Positive / Anode) */}
          <path
            d="M 100 0 L 100 45 L 205 45 L 205 90"
            className={`wire-path wire-red ${isPowered ? 'energized' : ''}`}
          />
          {/* Right Wire (Blue / Negative / Cathode) */}
          <path
            d="M 400 0 L 400 45 L 295 45 L 295 90"
            className={`wire-path wire-blue ${isPowered ? 'energized' : ''}`}
          />
        </svg>
      </div>

      {/* Beaker Apparatus */}
      <div className="beaker-station">
        <div className="beaker-glass">
          {/* Measurement ticks */}
          <div className="beaker-graduations">
            <span>400 mL</span>
            <span>300 mL</span>
            <span>200 mL</span>
            <span>100 mL</span>
          </div>

          {/* Solution Liquid */}
          <div
            className="beaker-liquid-fill"
            style={{ backgroundColor: solution.liquidColor }}
          >
            {/* Liquid Surface Shine */}
            <div className="liquid-meniscus"></div>

            {/* Solution Label Badge floating inside */}
            <div className="beaker-solution-pill">
              <span className="beaker-sol-name">{solution.chemicalFormula}</span>
              <span className="beaker-sol-conc">{concentration.toFixed(1)} M</span>
            </div>

            {/* Two Electrodes */}
            <div className="electrodes-container">
              {/* Anode (+) Electrode */}
              <div className="electrode-bar anode">
                <div className="electrode-top-clamp">
                  <span className="pole-sign">+</span>
                  <span className="pole-name">Anoda</span>
                </div>
                <div className="electrode-submerged">
                  {/* Dynamic Bubbles */}
                  {isPowered && bubbleIntensity === 'many' && (
                    <div className="bubbles-stream strong">
                      {[...Array(14)].map((_, i) => (
                        <span key={`a-str-${i}`} className={`bubble b-${(i % 5) + 1}`} />
                      ))}
                    </div>
                  )}
                  {isPowered && bubbleIntensity === 'few' && (
                    <div className="bubbles-stream weak">
                      {[...Array(5)].map((_, i) => (
                        <span key={`a-wk-${i}`} className={`bubble b-${(i % 3) + 1}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cathode (-) Electrode */}
              <div className="electrode-bar cathode">
                <div className="electrode-top-clamp">
                  <span className="pole-sign">-</span>
                  <span className="pole-name">Katoda</span>
                </div>
                <div className="electrode-submerged">
                  {/* Dynamic Bubbles */}
                  {isPowered && bubbleIntensity === 'many' && (
                    <div className="bubbles-stream strong">
                      {[...Array(14)].map((_, i) => (
                        <span key={`c-str-${i}`} className={`bubble b-${(i % 5) + 1}`} />
                      ))}
                    </div>
                  )}
                  {isPowered && bubbleIntensity === 'few' && (
                    <div className="bubbles-stream weak">
                      {[...Array(5)].map((_, i) => (
                        <span key={`c-wk-${i}`} className={`bubble b-${(i % 3) + 1}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Observation Ribbon */}
        <div className="apparatus-live-status">
          <div className="status-item">
            <span className="status-lbl">Kondisi Lampu:</span>
            <strong className={`status-val ${effectiveBulbState}`}>
              {isPowered ? solution.bulbLabel : 'Mati (Saklar Terputus)'}
            </strong>
          </div>
          <div className="status-divider"></div>
          <div className="status-item">
            <span className="status-lbl">Gejala Elektroda:</span>
            <strong className="status-val">
              {isPowered ? solution.gasBubblesLabel : 'Tidak Ada Arus Mengalir'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
