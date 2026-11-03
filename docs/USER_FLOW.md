# USER_FLOW.md — Alur Pengguna ChemLearn XII

Dokumen ini mendokumentasikan alur interaksi dan otentikasi peran (Guru dan Siswa) pada platform ChemLearn XII.

## 1. Alur Akses Siswa (Default / Pembelajar)
1. **Membuka Website**:
   - Pengguna masuk dengan status Siswa aktif (`Siswa Kimia XII`, kelas `XII MIPA 1`).
   - Dapat mengakses menu: Beranda, Materi, Lab Virtual, Kuis Evaluasi, dan Progres Belajar.
2. **Mengerjakan Kuis**:
   - Siswa mengerjakan kuis evaluasi pilihan ganda dari Bank Soal.
   - Saat submit, skor otomatis tersimpan di portofolio pribadi dan disinkronkan ke Rekap Nilai Guru.
3. **Mencoba Beralih ke Akun Guru**:
   - Siswa mengklik tombol "Masuk Guru", "Beralih ke Akun Guru", atau mencoba mengakses Bank Soal / Rekap Nilai.
   - **Sistem Mencegah Akses Langsung**: Muncul modal verifikasi PIN Guru (Default: `8888`).
   - Jika PIN salah: Muncul notifikasi error dan pengguna tetap berada di mode Siswa.
   - Jika PIN benar: Pengguna beralih ke Akun Guru dan diarahkan ke fitur pengajar.

---

## 2. Alur Akses Guru (Pendidik)
1. **Otentikasi Guru**:
   - Guru memasukkan PIN Guru (`8888`) pada modal otentikasi.
   - Tampilan Navbar berubah menampilkan tab khusus pendidik:
     - **Bank Soal**: Kelola (tambah, edit, hapus, reset) butir soal kuis evaluasi.
     - **Rekap Nilai**: Pantau nilai seluruh siswa, statistik ketuntasan KKM (75), ekspor CSV, dan cetak rekapitulasi.
2. **Kelola Bank Soal**:
   - Guru dapat menambah butir soal baru (soal, opsi A-E, kunci jawaban, tingkat kesulitan, pembahasan).
   - Perubahan langsung memperbarui soal yang tampil saat siswa mengerjakan kuis.
3. **Melihat Rekapitulasi Nilai**:
   - Memantau metrik rata-rata kelas, persentase kelulusan KKM, nilai tertinggi/terendah.
   - Filter berdasarkan status kelulusan (Lulus / Remedial) dan pencarian nama siswa.
   - Mengunduh rekap dalam format CSV (Excel) atau mencetak dokumen penilaian.
4. **Beralih Kembali ke Akun Siswa**:
   - Guru mengklik tombol "Beralih ke Siswa".
   - **Sistem Mencegah Akses Langsung**: Muncul modal verifikasi PIN Siswa (Default: `1234`).
   - Hanya setelah memasukkan PIN Siswa yang valid, akun beralih kembali ke mode Siswa.

