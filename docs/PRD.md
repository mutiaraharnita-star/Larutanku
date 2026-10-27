# Product Requirements Document (PRD)
## ChemLearn XII — Larutan Elektrolit dan Nonelektrolit

## 1. Ringkasan Produk
ChemLearn XII adalah website pembelajaran Kimia untuk siswa kelas XII SMA/MA yang membahas larutan elektrolit dan nonelektrolit. Website menyediakan materi digital, simulasi laboratorium virtual, kuis, dan evaluasi hasil belajar.

## 2. Latar Belakang
Materi larutan elektrolit dan nonelektrolit membutuhkan pemahaman tentang ion dalam larutan serta hubungannya dengan daya hantar listrik. Media pembelajaran interaktif diharapkan membantu siswa memahami konsep melalui visualisasi dan latihan.

## 3. Tujuan Produk
- Membantu siswa memahami konsep larutan elektrolit dan nonelektrolit.
- Menyediakan media pembelajaran yang menarik dan mudah digunakan.
- Memberikan pengalaman eksperimen virtual yang aman.
- Mengukur pemahaman siswa melalui kuis dan evaluasi.
- Membantu guru menyampaikan materi secara digital.

## 4. Target Pengguna
### Siswa
Mempelajari materi, menjalankan simulasi, mengerjakan kuis, dan melihat hasil belajar.

### Guru
Menggunakan materi sebagai media pembelajaran dan, jika tersedia backend, mengelola materi serta memantau hasil siswa.

## 5. Fitur Utama

### 5.1 Beranda
- Menampilkan nama dan deskripsi website.
- Menyediakan navigasi ke materi, laboratorium virtual, dan kuis.
- Menampilkan tujuan pembelajaran serta ajakan untuk mulai belajar.

### 5.2 Materi Pembelajaran
Materi mencakup:
- Pengertian larutan elektrolit dan nonelektrolit.
- Perbedaan elektrolit kuat, elektrolit lemah, dan nonelektrolit.
- Konsep ionisasi dan disosiasi.
- Hubungan ion bergerak dengan daya hantar listrik.
- Contoh senyawa dan penerapannya dalam kehidupan sehari-hari.
- Rangkuman materi.

### 5.3 Laboratorium Virtual
- Siswa dapat memilih jenis larutan untuk diuji.
- Simulasi menampilkan elektroda, lampu, dan gelembung gas secara ilustratif.
- Hasil pengamatan berubah sesuai larutan yang dipilih.
- Sistem menjelaskan alasan ilmiah di balik hasil simulasi.
- Siswa dapat mengulangi percobaan dengan larutan berbeda.

Contoh larutan:
- Larutan NaCl: elektrolit kuat.
- Larutan CH3COOH: elektrolit lemah.
- Larutan gula: nonelektrolit.
- Etanol: nonelektrolit dalam konteks daya hantar listrik larutan berair.

Catatan: simulasi merupakan model pembelajaran, bukan hasil pengukuran eksperimen nyata.

### 5.4 Kuis dan Evaluasi
- Menyediakan soal pilihan ganda.
- Memvalidasi jawaban siswa.
- Menghitung skor secara otomatis.
- Menampilkan jawaban benar dan pembahasan.
- Menyediakan opsi mengulang kuis.

### 5.5 Progres Belajar
- Menandai materi yang telah dipelajari.
- Menyimpan skor kuis pada perangkat jika belum tersedia backend.
- Menampilkan ringkasan progres secara jelas.

### 5.6 Login dan Dashboard
Jika diperlukan, sediakan rancangan login siswa dan guru. Autentikasi nyata, penyimpanan data bersama, dan pengelolaan akun harus menggunakan backend yang sesuai. Jangan menganggap penyimpanan lokal sebagai sistem login aman.

## 6. Alur Pengguna
1. Pengguna membuka beranda.
2. Pengguna memilih materi pembelajaran.
3. Pengguna membaca materi dan rangkuman.
4. Pengguna mencoba laboratorium virtual.
5. Pengguna mengerjakan kuis.
6. Pengguna melihat skor dan pembahasan.
7. Pengguna mengulang materi sesuai kebutuhan.

## 7. Kebutuhan Desain
- Antarmuka modern dan ramah pelajar.
- Palet warna biru, turquoise, putih, dan aksen kuning.
- Navigasi sederhana dan konsisten.
- Tata letak responsif.
- Tipografi mudah dibaca.
- Ilustrasi sains yang mendukung pemahaman.
- Status aktif, hasil kuis, dan umpan balik terlihat jelas.

## 8. Kebutuhan Teknis
- Framework: React.
- Bahasa: TypeScript.
- Development server: Vite.
- Gunakan komponen reusable.
- Gunakan penyimpanan lokal hanya untuk data demo atau progres sederhana.
- Validasi input dan tampilkan pesan error yang jelas.
- Pastikan build dapat dijalankan.
- Hindari penambahan dependensi yang tidak diperlukan.

## 9. Kebutuhan Nonfungsional
- Mudah dipelajari oleh siswa.
- Responsif pada berbagai ukuran layar.
- Memiliki kontras warna yang baik.
- Memiliki struktur kode yang mudah dipelihara.
- Materi ilmiah konsisten dengan konsep Kimia SMA.
- Tidak mengklaim keamanan atau kemampuan backend yang belum diimplementasikan.

## 10. Kriteria Penerimaan
- Beranda tampil dengan baik.
- Navigasi antarmenu berfungsi.
- Materi dapat dibaca dengan jelas.
- Simulasi merespons pilihan larutan.
- Kuis dapat dikerjakan dan menghasilkan skor yang benar.
- Pembahasan jawaban ditampilkan.
- Progres lokal berfungsi jika diimplementasikan.
- Tampilan responsif pada desktop dan ponsel.
- Proyek dapat dijalankan melalui Vite tanpa error build yang diketahui.

## 11. Tahapan Implementasi
Tahap 1: Beranda dan navigasi.  
Tahap 2: Materi pembelajaran.  
Tahap 3: Laboratorium virtual.  
Tahap 4: Kuis dan evaluasi.  
Tahap 5: Penyimpanan progres.  
Tahap 6: Login dan dashboard berbasis backend jika dibutuhkan.

## 12. Di Luar Cakupan Versi Awal
- Sistem pembayaran.
- Aplikasi mobile native.
- Integrasi perangkat laboratorium fisik.
- Autentikasi produksi sebelum backend tersedia.
- Analitik pembelajaran tingkat lanjut.