# DESAIN_TEKNIS.md — Arsitektur & Desain Teknis ChemLearn XII

## 1. Manajemen State & Otentikasi Peran (Role & PIN)

### A. Struktur Data Sesi & Kuis (`src/types/chemistry.ts`)
```typescript
export type UserRole = 'siswa' | 'guru';

export interface UserSession {
  role: UserRole;
  name: string;
  studentClass?: string;
  isLoggedIn: boolean;
}

export interface QuizSubmission {
  id: string;
  studentName: string;
  studentClass: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: string;
  status: 'Lulus' | 'Remedial';
}
```

### B. Mekanisme Keamanan PIN & Switching Role
- **Kredensial Default**:
  - PIN Guru: `8888`
  - PIN Siswa: `1234`
- **Pencegahan Bypass**:
  - Peralihan akun dari Guru ke Siswa maupun sebaliknya dicegat melalui `openAuthModal(targetRole, reason)`.
  - Fungsi `verifyAndSwitchRole` memvalidasi input terhadap PIN tersimpan sebelum mengubah state sesi `session`.
  - Tab khusus Guru (`bank-soal`, `rekap-nilai`) diproteksi pada tingkat rute komponen `App.tsx` dengan komponen penjaga `AccessRestrictedCard`.

### C. Sinkronisasi Bank Soal & Rekap Nilai
- **Bank Soal**:
  - Disimpan dalam state `quizQuestions` (didukung `localStorage`) dengan fallback awal 10 butir soal kurikulum kimia kelas XII.
  - Komponen `QuizSection` mengambil soal secara reaktif dari `quizQuestions`.
- **Rekap Nilai**:
  - Data pengerjaan kuis siswa dicatat sebagai `QuizSubmission` pada `quizSubmissions`.
  - Guru dapat mengekspor rekapitulasi ke format CSV dengan penambahan UTF-8 BOM (`\uFEFF`) agar kompatibel dengan Microsoft Excel tanpa error karakter encoding.

