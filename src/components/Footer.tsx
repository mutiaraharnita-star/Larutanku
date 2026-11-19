import React from 'react';
import { FlaskConical, Sparkles } from 'lucide-react';
import { useProgress, type ActiveTab } from '../context/ProgressContext';

const CURRENT_YEAR = 2026;

export const Footer: React.FC = () => {
  const { setActiveTab } = useProgress();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="app-footer" id="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand & Description */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <FlaskConical className="footer-brand-icon" size={26} />
              <span className="footer-title">ChemLearn XII</span>
            </div>
            <p className="footer-desc">
              Platform pembelajaran digital interaktif mata pelajaran Kimia SMA/MA kelas XII,
              mengeksplorasi konsep larutan elektrolit kuat, elektrolit lemah, dan nonelektrolit
              melalui modul ilmiah, simulasi laboratorium virtual, dan evaluasi berbasis kuis.
            </p>
            <div className="footer-kd-badge">
              <Sparkles size={14} />
              <span>Kurikulum Kimia SMA — KD 3.8 & KD 4.8</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigasi Belajar</h4>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  id="footer-link-beranda"
                  onClick={() => handleNav('beranda')}
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-materi"
                  onClick={() => handleNav('materi')}
                >
                  Materi & Teori Arrhenius
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-lab"
                  onClick={() => handleNav('lab')}
                >
                  Simulasi Lab Virtual
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-kuis"
                  onClick={() => handleNav('kuis')}
                >
                  Kuis & Evaluasi Pemahaman
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-link-progres"
                  onClick={() => handleNav('progres')}
                >
                  Laporan Progres Belajar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Rangkuman Cepat */}
          <div className="footer-col">
            <h4 className="footer-heading">Indikator Pencapaian</h4>
            <ul className="footer-checklist">
              <li>
                <span className="bullet">✓</span> Menganalisis daya hantar larutan melalui uji nyala & gas
              </li>
              <li>
                <span className="bullet">✓</span> Memahami ionisasi senyawa ion & kovalen polar
              </li>
              <li>
                <span className="bullet">✓</span> Menghitung derajat ionisasi (&alpha;)
              </li>
              <li>
                <span className="bullet">✓</span> Mengidentifikasi elektrolit dalam cairan tubuh & industri
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {CURRENT_YEAR} ChemLearn XII. Media Pembelajaran Kimia Mandiri & Kolaboratif.
          </p>
          <p className="disclaimer-text">
            Simulasi laboratorium virtual merupakan model visual konseptual untuk keperluan pemahaman sains.
          </p>
        </div>
      </div>
    </footer>
  );
};
