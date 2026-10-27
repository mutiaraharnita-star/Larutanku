import React from 'react';
import type { Solution } from '../../types/chemistry';
import { Eye } from 'lucide-react';

interface SubmicroscopicViewProps {
  solution: Solution;
  isPowered: boolean;
}

export const SubmicroscopicView: React.FC<SubmicroscopicViewProps> = ({
  solution,
  isPowered,
}) => {
  const { cations, anions, molecules } = solution.particles;

  return (
    <div className="submicro-container" id="submicroscopic-view">
      {/* Header Info */}
      <div className="submicro-header">
        <div className="submicro-title-wrap">
          <Eye size={18} className="text-cyan" />
          <h3 className="submicro-title">Visualisasi Partikel Submikroskopik</h3>
        </div>
        <span className="submicro-badge">Skala Molekuler & Ionik</span>
      </div>

      <p className="submicro-desc">
        {isPowered ? (
          solution.category === 'none' ? (
            'Pada larutan nonelektrolit, zat hanya berupa molekul netral yang tidak terpengaruh kutub listrik elektroda.'
          ) : (
            'Saat arus listrik dinyalakan, Kation (+) ditarik ke Katoda (-) dan Anion (-) ditarik ke Anoda (+).'
          )
        ) : (
          'Saklar masih terbuka. Partikel bergerak acak karena energi kinetik termal (gerak Brown).'
        )}
      </p>

      {/* Microscopic Simulation Chamber */}
      <div className="micro-chamber">
        {/* Left Pole: Anoda (+) */}
        <div className={`chamber-pole anode ${isPowered ? 'charged' : ''}`}>
          <span className="pole-tag">+</span>
          <span className="pole-text">ANODA (+)</span>
        </div>

        {/* Liquid Matrix / Particle Space */}
        <div className="particles-canvas">
          {/* Water background molecules */}
          <div className="water-matrix">
            <span className="water-p w1">H₂O</span>
            <span className="water-p w2">H₂O</span>
            <span className="water-p w3">H₂O</span>
            <span className="water-p w4">H₂O</span>
            <span className="water-p w5">H₂O</span>
            <span className="water-p w6">H₂O</span>
          </div>

          {/* Cations (+) */}
          {cations.map((cat, idx) => (
            <div
              key={`cat-${idx}`}
              className={`particle cation ${isPowered ? 'moving-to-cathode' : 'floating'}`}
              style={{
                top: `${18 + (idx * 21) % 65}%`,
                left: `${20 + (idx * 17) % 55}%`,
                animationDelay: `${idx * 0.4}s`,
              }}
            >
              <span className="particle-label">{cat}</span>
              <span className="particle-sign">+</span>
            </div>
          ))}

          {/* Anions (-) */}
          {anions.map((an, idx) => (
            <div
              key={`an-${idx}`}
              className={`particle anion ${isPowered ? 'moving-to-anode' : 'floating'}`}
              style={{
                top: `${22 + (idx * 23) % 60}%`,
                left: `${35 + (idx * 19) % 45}%`,
                animationDelay: `${idx * 0.35 + 0.2}s`,
              }}
            >
              <span className="particle-label">{an}</span>
              <span className="particle-sign">-</span>
            </div>
          ))}

          {/* Neutral Molecules */}
          {molecules.map((mol, idx) => (
            <div
              key={`mol-${idx}`}
              className="particle molecule-neutral floating"
              style={{
                top: `${15 + (idx * 16) % 68}%`,
                left: `${25 + (idx * 22) % 50}%`,
                animationDelay: `${idx * 0.5}s`,
              }}
            >
              <span className="particle-label">{mol}</span>
            </div>
          ))}
        </div>

        {/* Right Pole: Katoda (-) */}
        <div className={`chamber-pole cathode ${isPowered ? 'charged' : ''}`}>
          <span className="pole-tag">-</span>
          <span className="pole-text">KATODA (-)</span>
        </div>
      </div>

      {/* Legend */}
      <div className="submicro-legend">
        <div className="legend-item">
          <span className="legend-dot cation-dot"></span>
          <span>Kation Bermuatan (+) [Tertarik ke Katoda]</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot anion-dot"></span>
          <span>Anion Bermuatan (-) [Tertarik ke Anoda]</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot neutral-dot"></span>
          <span>Molekul Netral [Tidak Terpengaruh Medan]</span>
        </div>
      </div>
    </div>
  );
};
