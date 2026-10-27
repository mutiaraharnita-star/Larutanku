import React from 'react';
import {
  FlaskConical,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle2,
  Atom,
  Layers,
  Award,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const HomeSection: React.FC = () => {
  const { setActiveTab } = useProgress();

  return (
    <div className="home-container" id="home-section">
      {/* HERO SECTION */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} className="badge-icon" />
            <span>Media Pembelajaran Kimia SMA Kelas XII</span>
          </div>

          <h1 className="hero-title">
            Eksplorasi Daya Hantar Listrik{' '}
            <span className="text-gradient">Larutan Elektrolit</span> &{' '}
            <span className="text-gradient-cyan">Nonelektrolit</span>
          </h1>

          <p className="hero-description">
            Pahami mengapa garam dapat menghantarkan listrik sementara gula tidak.
            Pelajari teori ionisasi Svante Arrhenius melalui modul visual, lakukan
            eksperimen di <strong>Laboratorium Virtual</strong>, dan ukur pemahamanmu
            melalui kuis evaluasi komprehensif.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              id="hero-btn-lab"
              className="btn btn-primary btn-glow"
              onClick={() => setActiveTab('lab')}
            >
              <FlaskConical size={20} />
              <span>Buka Lab Virtual</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              id="hero-btn-materi"
              className="btn btn-secondary"
              onClick={() => setActiveTab('materi')}
            >
              <BookOpen size={20} />
              <span>Pelajari Materi</span>
            </button>

            <button
              type="button"
              id="hero-btn-kuis"
              className="btn btn-outline"
              onClick={() => setActiveTab('kuis')}
            >
              <HelpCircle size={20} />
              <span>Mulai Kuis</span>
            </button>
          </div>

          {/* Quick Stat Highlights */}
          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <span className="stat-number">11+</span>
              <span className="stat-label">Jenis Larutan Uji</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-number">5</span>
              <span className="stat-label">Modul Teori Lengkap</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-number">10</span>
              <span className="stat-label">Soal Kuis HOTS</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Interaktif & Mandiri</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="hero-visual-card">
          <div className="visual-card-glass">
            <div className="preview-apparatus">
              <div className="preview-header">
                <span className="preview-indicator live"></span>
                <span className="preview-title">Model Pengujian Sirkuit Elektrolit</span>
              </div>

              {/* Mini Interactive Preview Illustration */}
              <div className="mini-experiment-demo">
                <div className="demo-circuit">
                  <div className="demo-bulb-wrapper active-demo">
                    <div className="demo-bulb-glow"></div>
                    <div className="demo-bulb">💡</div>
                  </div>
                  <div className="demo-wires">
                    <div className="wire wire-left"></div>
                    <div className="wire wire-right"></div>
                  </div>
                </div>

                <div className="demo-beaker">
                  <div className="beaker-liquid">
                    <span className="demo-sol-tag">NaCl (aq) 1.0 M</span>
                    <div className="demo-electrodes">
                      <div className="demo-electrode">
                        <span className="electrode-label">+</span>
                        <div className="demo-bubbles">
                          <span className="b-dot b1"></span>
                          <span className="b-dot b2"></span>
                          <span className="b-dot b3"></span>
                        </div>
                      </div>
                      <div className="demo-electrode">
                        <span className="electrode-label">-</span>
                        <div className="demo-bubbles">
                          <span className="b-dot b1"></span>
                          <span className="b-dot b2"></span>
                          <span className="b-dot b3"></span>
                        </div>
                      </div>
                    </div>
                    <div className="demo-ions">
                      <span className="mini-ion ion-pos">Na⁺</span>
                      <span className="mini-ion ion-neg">Cl⁻</span>
                      <span className="mini-ion ion-pos">Na⁺</span>
                      <span className="mini-ion ion-neg">Cl⁻</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-caption">
                <strong>Elektrolit Kuat (NaCl):</strong> Terionisasi sempurna (&alpha; = 1),
                menyalakan lampu terang dan memunculkan gelembung gas.
              </div>

              <button
                type="button"
                id="btn-preview-simulate"
                className="btn-preview-action"
                onClick={() => setActiveTab('lab')}
              >
                Uji 11 Larutan Lainnya di Lab &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TUJUAN PEMBELAJARAN (LEARNING OBJECTIVES) */}
      <section className="section-block" id="learning-objectives-section">
        <div className="section-header text-center">
          <div className="section-pill">Kompetensi Inti & Dasar</div>
          <h2 className="section-heading">Tujuan Pembelajaran</h2>
          <p className="section-subtext">
            Sesuai standar kurikulum Kimia SMA/MA kelas XII untuk pemahaman mendalam konsep larutan.
          </p>
        </div>

        <div className="objectives-grid">
          <div className="objective-card">
            <div className="obj-icon-wrapper bg-blue">
              <Zap size={24} />
            </div>
            <h3 className="obj-title">1. Menganalisis Daya Hantar Listrik</h3>
            <p className="obj-desc">
              Membedakan larutan elektrolit kuat, elektrolit lemah, dan nonelektrolit berdasarkan
              gejala makroskopis berupa nyala lampu dan munculnya gelembung gas pada elektroda.
            </p>
          </div>

          <div className="objective-card">
            <div className="obj-icon-wrapper bg-cyan">
              <Atom size={24} />
            </div>
            <h3 className="obj-title">2. Memahami Teori Ionisasi Arrhenius</h3>
            <p className="obj-desc">
              Menjelaskan penyebab larutan dapat menghantarkan listrik melalui pembentukan kation dan
              anion yang bergerak bebas dalam medium pelarut air.
            </p>
          </div>

          <div className="objective-card">
            <div className="obj-icon-wrapper bg-teal">
              <Layers size={24} />
            </div>
            <h3 className="obj-title">3. Menghitung Derajat Ionisasi (&alpha;)</h3>
            <p className="obj-desc">
              Menghubungkan nilai derajat ionisasi kuantitatif (&alpha; = 1, 0 &lt; &alpha; &lt; 1, dan &alpha; = 0)
              dengan kekuatan elektrolit serta menuliskan persamaan reaksinya.
            </p>
          </div>

          <div className="objective-card">
            <div className="obj-icon-wrapper bg-amber">
              <FlaskConical size={24} />
            </div>
            <h3 className="obj-title">4. Praktikum Sains Virtual yang Aman</h3>
            <p className="obj-desc">
              Melakukan percobaan simulasi daya hantar listrik secara mandiri, mencatat pengamatan ke
              lembar kerja digital, dan menarik kesimpulan ilmiah secara kritis.
            </p>
          </div>
        </div>
      </section>

      {/* 3 CORE PILLARS / FITUR UTAMA */}
      <section className="section-block features-section" id="features-section">
        <div className="section-header text-center">
          <div className="section-pill">Fitur Pembelajaran</div>
          <h2 className="section-heading">Alur Belajar Terintegrasi</h2>
          <p className="section-subtext">
            Tiga tahapan belajar terstruktur untuk mencapai penguasaan materi secara komprehensif.
          </p>
        </div>

        <div className="features-grid">
          {/* Card 1: Materi */}
          <div className="feature-card" onClick={() => setActiveTab('materi')} role="button" tabIndex={0}>
            <div className="feature-badge">Langkah 1</div>
            <div className="feature-icon bg-indigo">
              <BookOpen size={32} />
            </div>
            <h3 className="feature-title">Modul Teori & Konsep</h3>
            <p className="feature-desc">
              5 bab materi yang tersusun sistematis: pengertian larutan, klasifikasi derajat ionisasi,
              teori Arrhenius, perbedaan wujud senyawa ionik vs kovalen polar, hingga penerapannya pada
              cairan tubuh dan industri.
            </p>
            <ul className="feature-points">
              <li><CheckCircle2 size={16} /> Dilengkapi persamaan reaksi ionisasi</li>
              <li><CheckCircle2 size={16} /> Tabel perbandingan komprehensif</li>
              <li><CheckCircle2 size={16} /> Catat progres baca secara otomatis</li>
            </ul>
            <div className="feature-cta">
              <span>Buka Modul Materi</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 2: Lab Virtual */}
          <div className="feature-card highlight-card" onClick={() => setActiveTab('lab')} role="button" tabIndex={0}>
            <div className="feature-badge special">Langkah 2 • Unggulan</div>
            <div className="feature-icon bg-cyan">
              <FlaskConical size={32} />
            </div>
            <h3 className="feature-title">Laboratorium Virtual Interaktif</h3>
            <p className="feature-desc">
              Simulasi alat uji daya hantar listrik dengan 11 larutan kimia realistis. Dilengkapi
              saklar on/off, pengatur konsentrasi (0.1–2.0 M), serta <strong>tampilan submikroskopik</strong>
              pergerakan ion kation-anion dan molekul netral!
            </p>
            <ul className="feature-points">
              <li><CheckCircle2 size={16} /> Efek nyala lampu & animasi gelembung gas</li>
              <li><CheckCircle2 size={16} /> Mode mikroskopis pergerakan partikel ion</li>
              <li><CheckCircle2 size={16} /> Lembar jurnal pengamatan digital yang bisa disimpan</li>
            </ul>
            <div className="feature-cta">
              <span>Mulai Praktikum Virtual</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 3: Kuis */}
          <div className="feature-card" onClick={() => setActiveTab('kuis')} role="button" tabIndex={0}>
            <div className="feature-badge">Langkah 3</div>
            <div className="feature-icon bg-amber">
              <Award size={32} />
            </div>
            <h3 className="feature-title">Kuis & Evaluasi Pemahaman</h3>
            <p className="feature-desc">
              10 butir soal pilihan ganda berstandar penilaian HOTS Kimia SMA kelas XII. Dapatkan
              skor instan, analisis ketepatan jawaban, serta kunci jawaban lengkap disertai pembahasan ilmiah.
            </p>
            <ul className="feature-points">
              <li><CheckCircle2 size={16} /> Pembahasan mendalam di setiap butir soal</li>
              <li><CheckCircle2 size={16} /> Penghitungan skor otomatis (0–100)</li>
              <li><CheckCircle2 size={16} /> Opsi mengulang untuk perbaikan nilai</li>
            </ul>
            <div className="feature-cta">
              <span>Ikuti Kuis Sekarang</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK COMPARISON TABLE PREVIEW */}
      <section className="section-block summary-preview-section">
        <div className="summary-preview-card">
          <div className="summary-header">
            <h3 className="summary-title">Ringkasan Cepat: Klasifikasi Larutan</h3>
            <p className="summary-subtitle">Tabel referensi kilas untuk mempermudah praktikum dan kuis</p>
          </div>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Jenis Larutan</th>
                  <th>Derajat Ionisasi (&alpha;)</th>
                  <th>Nyala Lampu</th>
                  <th>Gelembung Gas</th>
                  <th>Contoh Senyawa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="badge-tag strong">Elektrolit Kuat</span>
                  </td>
                  <td>&alpha; = 1 (100%)</td>
                  <td>Menyala Terang</td>
                  <td>Banyak Gelembung</td>
                  <td>NaCl, HCl, H₂SO₄, NaOH</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge-tag weak">Elektrolit Lemah</span>
                  </td>
                  <td>0 &lt; &alpha; &lt; 1</td>
                  <td>Menyala Redup / Padam</td>
                  <td>Sedikit Gelembung</td>
                  <td>CH₃COOH, HF, NH₄OH</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge-tag none">Nonelektrolit</span>
                  </td>
                  <td>&alpha; = 0 (0%)</td>
                  <td>Padam Total</td>
                  <td>Tidak Ada Gelembung</td>
                  <td>Gula (C₁₂H₂₂O₁₁), Urea, Etanol</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="summary-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveTab('lab')}
            >
              Uji Coba Langsung di Lab Virtual &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
