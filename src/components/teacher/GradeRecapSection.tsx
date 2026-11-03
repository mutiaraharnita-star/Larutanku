import React, { useState } from 'react';
import {
  GraduationCap,
  Printer,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trash2,
  TrendingUp,
  Award,
  Users,
  AlertTriangle,
  X,
  FileSpreadsheet,
  PlusCircle,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const KKM_SCORE = 75;

export const GradeRecapSection: React.FC = () => {
  const {
    quizSubmissions,
    deleteQuizSubmission,
    resetQuizSubmissionsToDefault,
    clearAllQuizSubmissions,
    addQuizSubmission,
  } = useProgress();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Lulus' | 'Remedial'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score-desc' | 'score-asc' | 'name'>('date');
  const [showClearModal, setShowClearModal] = useState<boolean>(false);

  // New simulated student state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newSimName, setNewSimName] = useState<string>('');
  const [newSimClass, setNewSimClass] = useState<string>('XII MIPA 1');
  const [newSimScore, setNewSimScore] = useState<number>(8);
  const [newSimTotal, setNewSimTotal] = useState<number>(10);

  // Calculations
  const totalStudents = quizSubmissions.length;
  const passedStudents = quizSubmissions.filter((s) => s.percentage >= KKM_SCORE).length;
  const remedialStudents = totalStudents - passedStudents;

  const averageScore =
    totalStudents > 0
      ? Math.round(
          quizSubmissions.reduce((acc, curr) => acc + curr.percentage, 0) / totalStudents
        )
      : 0;

  const highestScore =
    totalStudents > 0
      ? Math.max(...quizSubmissions.map((s) => s.percentage))
      : 0;

  const lowestScore =
    totalStudents > 0
      ? Math.min(...quizSubmissions.map((s) => s.percentage))
      : 0;

  const passRate =
    totalStudents > 0 ? Math.round((passedStudents / totalStudents) * 100) : 0;

  // Filter & Sort
  const filteredSubmissions = quizSubmissions
    .filter((s) => {
      const matchSearch =
        s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.studentClass.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'all' || s.status === statusFilter;

      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'score-desc') return b.percentage - a.percentage;
      if (sortBy === 'score-asc') return a.percentage - b.percentage;
      if (sortBy === 'name') return a.studentName.localeCompare(b.studentName);
      return 0; // Default: 'date' preserves insertion order (newest first)
    });

  // Export to CSV
  const handleExportCSV = () => {
    if (quizSubmissions.length === 0) {
      alert('Tidak ada data nilai untuk diekspor.');
      return;
    }

    const headers = ['No', 'Nama Siswa', 'Kelas', 'Waktu Submit', 'Skor Benar', 'Total Soal', 'Nilai Akhir', 'Status (KKM 75)'];
    const rows = quizSubmissions.map((s, idx) => [
      idx + 1,
      `"${s.studentName.replace(/"/g, '""')}"`,
      `"${s.studentClass.replace(/"/g, '""')}"`,
      `"${s.submittedAt}"`,
      s.score,
      s.totalQuestions,
      s.percentage,
      s.status,
    ]);

    const csvContent =
      '\uFEFF' + // UTF-8 BOM for Microsoft Excel compatibility
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Rekap_Nilai_Kimia_XII_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddSimulated = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSimName.trim()) return;

    const percentage = Math.round((newSimScore / newSimTotal) * 100);
    addQuizSubmission({
      studentName: newSimName.trim(),
      studentClass: newSimClass.trim() || 'XII MIPA 1',
      score: newSimScore,
      totalQuestions: newSimTotal,
      percentage,
      status: percentage >= KKM_SCORE ? 'Lulus' : 'Remedial',
    });

    setNewSimName('');
    setShowAddModal(false);
  };

  return (
    <div className="teacher-section-container" id="rekap-nilai-section">
      {/* Header */}
      <div className="section-header-compact">
        <div className="section-pill teacher-pill">
          <GraduationCap size={14} />
          <span>Laporan Asesmen & Penilaian</span>
        </div>
        <h1 className="page-main-title">Rekapitulasi Nilai Siswa XII</h1>
        <p className="page-main-desc">
          Pantau hasil evaluasi kuis pemahaman larutan elektrolit dan nonelektrolit secara terpusat.
          Nilai siswa diperbarui otomatis setiap kali siswa menyelesaikan kuis pada aplikasi.
        </p>

        {/* Global Summary Cards */}
        <div className="rekap-metrics-grid">
          <div className="rekap-metric-card metric-primary">
            <div className="rm-icon-box">
              <Users size={22} />
            </div>
            <div className="rm-data">
              <span className="rm-val">{totalStudents}</span>
              <span className="rm-lbl">Total Siswa Ujian</span>
            </div>
          </div>

          <div className="rekap-metric-card metric-info">
            <div className="rm-icon-box">
              <TrendingUp size={22} />
            </div>
            <div className="rm-data">
              <span className="rm-val">{averageScore}</span>
              <span className="rm-lbl">Rata-Rata Nilai</span>
            </div>
          </div>

          <div className="rekap-metric-card metric-success">
            <div className="rm-icon-box">
              <CheckCircle2 size={22} />
            </div>
            <div className="rm-data">
              <span className="rm-val">{passRate}%</span>
              <span className="rm-lbl">Kelulusan ({passedStudents} Tuntas)</span>
            </div>
          </div>

          <div className="rekap-metric-card metric-warning">
            <div className="rm-icon-box">
              <Award size={22} />
            </div>
            <div className="rm-data">
              <span className="rm-val">
                {highestScore} / {lowestScore}
              </span>
              <span className="rm-lbl">Tertinggi / Terendah</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="rekap-controls-bar">
        <div className="rekap-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari berdasarkan nama siswa atau kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="rekap-actions-row">
          {/* Status Filter */}
          <div className="rekap-filter-group">
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Semua ({totalStudents})
            </button>
            <button
              type="button"
              className={`filter-btn filter-lulus ${statusFilter === 'Lulus' ? 'active' : ''}`}
              onClick={() => setStatusFilter('Lulus')}
            >
              Lulus KKM ({passedStudents})
            </button>
            <button
              type="button"
              className={`filter-btn filter-remedial ${statusFilter === 'Remedial' ? 'active' : ''}`}
              onClick={() => setStatusFilter('Remedial')}
            >
              Remedial ({remedialStudents})
            </button>
          </div>

          {/* Sort Selector */}
          <select
            className="rekap-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'score-desc' | 'score-asc' | 'name')}
          >
            <option value="date">Urutan: Waktu Pengerjaan Terbaru</option>
            <option value="score-desc">Urutan: Nilai Tertinggi</option>
            <option value="score-asc">Urutan: Nilai Terendah</option>
            <option value="name">Urutan: Nama Siswa (A - Z)</option>
          </select>

          {/* Export & Action Buttons */}
          <div className="rekap-btn-group">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleExportCSV}
              title="Unduh berkas spreadsheet CSV / Excel"
            >
              <FileSpreadsheet size={15} />
              <span>Ekspor CSV</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handlePrint}
              title="Cetak atau simpan sebagai dokumen PDF"
            >
              <Printer size={15} />
              <span>Cetak Rekap</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowAddModal(true)}
              title="Tambah entri nilai siswa baru secara manual"
            >
              <PlusCircle size={15} />
              <span>+ Entri Siswa</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-sm btn-danger-tone"
              onClick={() => setShowClearModal(true)}
              title="Bersihkan atau reset rekap nilai"
            >
              <RotateCcw size={15} />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="rekap-table-card">
        <div className="table-responsive">
          <table className="rekap-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th>Nama Lengkap Siswa</th>
                <th>Kelas / Rombel</th>
                <th>Waktu Pengumpulan</th>
                <th>Jawaban Benar</th>
                <th>Nilai Akhir</th>
                <th>Status (KKM {KKM_SCORE})</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty-cell">
                    <div className="table-empty-content">
                      <GraduationCap size={40} className="empty-icon" />
                      <p className="empty-title">Belum ada data nilai yang sesuai</p>
                      <span className="empty-sub">
                        Siswa yang mengerjakan kuis akan otomatis tercatat pada daftar ini.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub, index) => {
                  const isPassed = sub.percentage >= KKM_SCORE;
                  return (
                    <tr key={sub.id} className={isPassed ? 'row-passed' : 'row-remedial'}>
                      <td className="cell-num">{index + 1}</td>
                      <td className="cell-name">
                        <strong>{sub.studentName}</strong>
                      </td>
                      <td className="cell-class">
                        <span className="class-badge">{sub.studentClass}</span>
                      </td>
                      <td className="cell-date">{sub.submittedAt}</td>
                      <td className="cell-raw-score">
                        {sub.score} / {sub.totalQuestions} Soal
                      </td>
                      <td className="cell-score">
                        <span className={`score-badge ${isPassed ? 'score-high' : 'score-low'}`}>
                          {sub.percentage}
                        </span>
                      </td>
                      <td className="cell-status">
                        <span className={`status-pill ${isPassed ? 'status-pass' : 'status-remedial'}`}>
                          {isPassed ? (
                            <>
                              <CheckCircle2 size={13} /> Tuntas
                            </>
                          ) : (
                            <>
                              <XCircle size={13} /> Remedial
                            </>
                          )}
                        </span>
                      </td>
                      <td className="cell-actions">
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => deleteQuizSubmission(sub.id)}
                          title="Hapus rekaman nilai ini"
                          aria-label="Hapus rekaman nilai"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer info */}
        <div className="rekap-table-footer">
          <div className="rt-info">
            <span>
              Menampilkan <strong>{filteredSubmissions.length}</strong> dari{' '}
              <strong>{totalStudents}</strong> rekaman nilai
            </span>
          </div>
          <div className="rt-legend">
            <span className="legend-item">
              <span className="legend-dot pass-dot" /> Tuntas (Nilai &ge; {KKM_SCORE})
            </span>
            <span className="legend-item">
              <span className="legend-dot rem-dot" /> Remedial (Nilai &lt; {KKM_SCORE})
            </span>
          </div>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div
            className="auth-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="auth-modal-header header-guru">
              <div className="auth-header-icon-wrapper">
                <PlusCircle size={28} />
              </div>
              <div className="auth-header-text">
                <h3 className="auth-modal-title">Tambah Entri Nilai Manual</h3>
                <span className="auth-modal-intro" style={{ margin: 0 }}>
                  Masukkan nilai hasil tugas atau evaluasi susulan siswa
                </span>
              </div>
              <button
                type="button"
                className="auth-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSimulated} className="auth-modal-body">
              <div className="form-group">
                <label className="form-label">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: Muhammad Rayhan"
                  value={newSimName}
                  onChange={(e) => setNewSimName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kelas / Rombel</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: XII MIPA 2"
                  value={newSimClass}
                  onChange={(e) => setNewSimClass(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Jumlah Benar</label>
                  <input
                    type="number"
                    min={0}
                    max={newSimTotal}
                    className="form-control"
                    value={newSimScore}
                    onChange={(e) => setNewSimScore(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Soal</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    className="form-control"
                    value={newSimTotal}
                    onChange={(e) => setNewSimTotal(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="auth-security-notice" style={{ marginTop: '4px' }}>
                <Award size={14} />
                <span>
                  Estimasi Nilai Akhir: <strong>{Math.round((newSimScore / newSimTotal) * 100)}</strong>{' '}
                  ({Math.round((newSimScore / newSimTotal) * 100) >= KKM_SCORE ? 'Lulus KKM' : 'Remedial'})
                </span>
              </div>

              <div className="auth-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan ke Rekap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clear / Reset Modal */}
      {showClearModal && (
        <div className="modal-backdrop" onClick={() => setShowClearModal(false)}>
          <div
            className="confirm-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
          >
            <div className="confirm-icon-wrapper danger-tone">
              <AlertTriangle size={32} />
            </div>
            <h3 className="confirm-title">Kelola Rekap Nilai Siswa</h3>
            <p className="confirm-desc">
              Pilih apakah Anda ingin mengembalikan data ke daftar sampel bawaan atau mengosongkan
              seluruh riwayat nilai siswa.
            </p>
            <div className="confirm-actions" style={{ flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  resetQuizSubmissionsToDefault();
                  setShowClearModal(false);
                }}
              >
                Kembalikan ke Contoh Sampel (7 Siswa)
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  clearAllQuizSubmissions();
                  setShowClearModal(false);
                }}
              >
                Kosongkan Semua Data Nilai
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowClearModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
