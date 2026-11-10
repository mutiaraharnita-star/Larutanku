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
  Compass,
  LogIn,
  Lock,
  GraduationCap,
  UserCheck,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const HomeSection: React.FC = () => {
  const { setActiveTab, session, openAuthModal, continueAsGuest } = useProgress();

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

      {/* PINTU MASUK & PILIHAN AKSES (LOGIN SISWA, GURU & FITUR TAMU SEBELUM EXPLORE) */}
      <section className="section-block entrance-gateway-section" id="auth-gateway-section">
        {!session.isLoggedIn ? (
          <div className="gateway-container">
            <div className="gateway-header text-center">
              <div className="section-pill">
                <Sparkles size={14} />
                <span>Pintu Masuk & Pilihan Akses Belajar</span>
              </div>
              <h2 className="gateway-main-title">Pilih Cara Masuk Sebelum Mengeksplorasi Web</h2>
              <p className="gateway-subtitle">
                Masuk dengan akun Siswa atau Guru untuk menyimpan riwayat belajar dan kuis, atau
                langsung coba modul dan laboratorium virtual secara bebas sebagai tamu.
              </p>
            </div>

            <div className="gateway-cards-grid">
              {/* Card 1: Siswa */}
              <div className="gateway-card student-card">
                <div className="gw-card-top">
                  <div className="gw-icon-box bg-cyan">
                    <GraduationCap size={24} />
                  </div>
                  <span className="gw-badge badge-student">Akses Siswa</span>
                </div>
                <h3 className="gw-title">Login / Daftar Siswa</h3>
                <p className="gw-desc">
                  Mengerjakan kuis evaluasi 10 butir soal berstandar HOTS, mencatat perolehan nilai
                  kelulusan KKM, dan menyimpan lembar jurnal praktikum laboratorium virtual.
                </p>
                <div className="gw-features">
                  <span>✓ Simpan nilai kuis evaluasi otomatis</span>
                  <span>✓ Lembar pengamatan laboratorium virtual</span>
                  <span>✓ Lencana capaian & riwayat belajar</span>
                </div>
                <div className="gw-actions">
                  <button
                    type="button"
                    id="btn-gw-login-siswa"
                    className="btn btn-primary btn-sm full-width"
                    onClick={() => openAuthModal('siswa', 'Masuk ke Akun Siswa')}
                  >
                    <LogIn size={15} />
                    <span>Masuk sebagai Siswa</span>
                  </button>
                  <button
                    type="button"
                    id="btn-gw-register-siswa"
                    className="btn btn-outline btn-xs full-width"
                    onClick={() => openAuthModal('register')}
                  >
                    <span>Belum punya akun? Daftar Baru</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Guru */}
              <div className="gateway-card teacher-card">
                <div className="gw-card-top">
                  <div className="gw-icon-box bg-purple">
                    <Lock size={24} />
                  </div>
                  <span className="gw-badge badge-teacher">Akses Guru (PIN/Email)</span>
                </div>
                <h3 className="gw-title">Login Tenaga Pendidik</h3>
                <p className="gw-desc">
                  Khusus Guru Kimia: Mengelola Bank Soal kuis dinamis (tambah/edit/hapus butir soal),
                  memantau ketuntasan KKM siswa kelas XII, dan mengekspor rekapitulasi nilai ke Excel.
                </p>
                <div className="gw-features">
                  <span>✓ Kelola & sunting Bank Soal kuis</span>
                  <span>✓ Rekapitulasi nilai seluruh siswa</span>
                  <span>✓ Ekspor spreadsheet & cetak laporan</span>
                </div>
                <div className="gw-actions">
                  <button
                    type="button"
                    id="btn-gw-login-guru"
                    className="btn btn-teacher-portal btn-sm full-width"
                    onClick={() => openAuthModal('guru', 'Masuk ke Portal Pengelolaan Guru')}
                  >
                    <Lock size={15} />
                    <span>Masuk Portal Guru (PIN: 8888)</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Tamu (Guest Mode) */}
              <div className="gateway-card guest-card">
                <div className="gw-card-top">
                  <div className="gw-icon-box bg-emerald">
                    <Compass size={24} />
                  </div>
                  <span className="gw-badge badge-guest">Tanpa Perlu Login</span>
                </div>
                <h3 className="gw-title">Explore Mode Tamu</h3>
                <p className="gw-desc">
                  Ingin melihat dan mencoba terlebih dahulu? Langsung telusuri 5 bab materi konsep daya
                  hantar listrik dan operasikan simulasi alat uji 11 larutan secara bebas tanpa akun.
                </p>
                <div className="gw-features">
                  <span>✓ Akses 5 modul teori Arrhenius</span>
                  <span>✓ Uji simulasi saklar 9V & mikroskop ion</span>
                  <span>✓ Langsung coba tanpa registrasi</span>
                </div>
                <div className="gw-actions">
                  <button
                    type="button"
                    id="btn-gw-continue-guest"
                    className="btn btn-emerald btn-sm full-width"
                    onClick={() => continueAsGuest('lab')}
                  >
                    <Compass size={15} />
                    <span>Mulai Explore sebagai Tamu &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* User is already logged in */
          <div className="active-session-banner">
            <div className="asb-left">
              <div className={`asb-icon-wrap ${session.role === 'guru' ? 'teacher' : 'student'}`}>
                {session.role === 'guru' ? <GraduationCap size={26} /> : <UserCheck size={26} />}
              </div>
              <div className="asb-text">
                <div className="asb-badge">
                  <span>Sesi Aktif: {session.role === 'guru' ? '👨‍🏫 Guru Kimia' : '🎒 Siswa XII'}</span>
                </div>
                <h3 className="asb-welcome">
                  Selamat Datang, <strong>{session.name}</strong>!
                </h3>
                <p className="asb-desc">
                  {session.role === 'guru'
                    ? 'Akses pengelolaan Bank Soal dan Rekapitulasi Nilai Siswa kelas XII siap digunakan.'
                    : `Anda aktif di kelas ${session.studentClass || 'XII MIPA 1'}. Siap untuk melanjutkan eksplorasi pembelajaran hari ini?`}
                </p>
              </div>
            </div>
            <div className="asb-actions">
              {session.role === 'guru' ? (
                <>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveTab('bank-soal')}
                  >
                    <span>Buka Bank Soal</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveTab('rekap-nilai')}
                  >
                    <span>Rekap Nilai Siswa</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveTab('lab')}
                  >
                    <FlaskConical size={16} />
                    <span>Buka Lab Virtual</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveTab('kuis')}
                  >
                    <Award size={16} />
                    <span>Mulai Kuis</span>
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn btn-outline btn-xs"
                onClick={() => openAuthModal('login')}
              >
                <span>Ganti Akun</span>
              </button>
            </div>
          </div>
        )}
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
