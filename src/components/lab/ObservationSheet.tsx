import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { ClipboardList, Trash2, Copy, Check } from 'lucide-react';

export const ObservationSheet: React.FC = () => {
  const { progress, deleteLabRecord } = useProgress();
  const [copied, setCopied] = React.useState(false);

  const handleCopyTable = () => {
    if (progress.observations.length === 0) return;
    const header = 'Waktu\tLarutan\tRumus\tKonsentrasi\tNyala Lampu\tGelembung Gas\tKesimpulan\n';
    const rows = progress.observations
      .map(
        (o) =>
          `${o.timestamp}\t${o.solutionName}\t${o.chemicalFormula}\t${o.concentration}\t${o.bulbObservation}\t${o.bubbleObservation}\t${o.conclusion}`
      )
      .join('\n');
    navigator.clipboard.writeText(header + rows);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="observation-sheet-card" id="observation-sheet">
      <div className="sheet-header">
        <div className="sheet-title-group">
          <ClipboardList size={20} className="text-teal" />
          <h3 className="sheet-title">Jurnal Lembar Kerja Praktikum Siswa</h3>
        </div>

        {progress.observations.length > 0 && (
          <div className="sheet-actions">
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={handleCopyTable}
              title="Salin tabel data pengamatan ke clipboard"
            >
              {copied ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
              <span>{copied ? 'Tersalin!' : 'Salin Data'}</span>
            </button>
          </div>
        )}
      </div>

      <p className="sheet-desc">
        Catatan hasil pengujian daya hantar listrik yang telah kamu rekam tersimpan di sini. Gunakan
        tabel ini sebagai bahan laporan praktikum atau analisis kuis.
      </p>

      {progress.observations.length === 0 ? (
        <div className="sheet-empty-state">
          <ClipboardList size={36} className="empty-icon" />
          <p className="empty-title">Belum Ada Catatan Pengamatan</p>
          <p className="empty-hint">
            Pilih larutan di atas, nyalakan saklar, lalu klik tombol <strong>"Catat Pengamatan"</strong>{' '}
            untuk merekam hasil percobaan ke dalam lembar kerja ini.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="lab-journal-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Nama Larutan</th>
                <th>Rumus Kimia</th>
                <th>Molaritas</th>
                <th>Pengamatan Lampu</th>
                <th>Pengamatan Gelembung</th>
                <th>Kesimpulan Sifat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {progress.observations.map((obs) => (
                <tr key={obs.id}>
                  <td className="text-muted">{obs.timestamp}</td>
                  <td>
                    <strong>{obs.solutionName}</strong>
                  </td>
                  <td>
                    <code className="chem-code">{obs.chemicalFormula}</code>
                  </td>
                  <td>{obs.concentration}</td>
                  <td>{obs.bulbObservation}</td>
                  <td>{obs.bubbleObservation}</td>
                  <td>
                    <span
                      className={`badge-tag ${
                        obs.conclusion.toLowerCase().includes('kuat')
                          ? 'strong'
                          : obs.conclusion.toLowerCase().includes('lemah')
                          ? 'weak'
                          : 'none'
                      }`}
                    >
                      {obs.conclusion}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-icon-delete"
                      onClick={() => deleteLabRecord(obs.id)}
                      title="Hapus baris ini"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
