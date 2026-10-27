import type { QuizQuestion } from '../types/chemistry';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Larutan elektrolit dapat menghantarkan arus listrik dengan baik karena di dalam larutan tersebut terdapat...',
    options: [
      'Molekul-molekul zat terlarut yang bergerak bebas',
      'Elektron bebas yang mengalir di antara molekul air',
      'Ion-ion positif dan ion-ion negatif yang dapat bergerak bebas',
      'Atom-atom netral yang saling bertabrakan',
      'Pelarut air yang mengalami ionisasi sempurna',
    ],
    correctIndex: 2,
    topic: 'Hakikat Konduktivitas Elektrolit',
    difficulty: 'Dasar',
    explanation:
      'Menurut Teori Ion Svante Arrhenius, daya hantar listrik larutan disebabkan oleh adanya ion-ion (kation dan anion) yang terhidrasi dan bebas bergerak membawa muatan listrik ke arah elektroda yang berlawanan muatan. Pada larutan, pembawa arus bukanlah elektron bebas, melainkan ion-ion.',
  },
  {
    id: 2,
    question:
      'Suatu larutan asam HA dilarutkan sebanyak 0,2 mol ke dalam air. Setelah setimbang, diperoleh bahwa hanya 0,01 mol asam yang terurai menjadi ion-ionnya. Nilai derajat ionisasi (α) dan jenis larutan tersebut berturut-turut adalah...',
    options: [
      'α = 0,05; Elektrolit Lemah',
      'α = 0,20; Elektrolit Kuat',
      'α = 0,50; Elektrolit Kuat',
      'α = 0,01; Nonelektrolit',
      'α = 0,95; Elektrolit Kuat',
    ],
    correctIndex: 0,
    topic: 'Derajat Ionisasi (α)',
    difficulty: 'Menengah',
    explanation:
      'Derajat ionisasi (α) dihitung dengan rumus: α = (mol zat terurai) / (mol zat mula-mula) = 0,01 mol / 0,20 mol = 0,05 (atau 5%). Karena nilai 0 < α < 1 (α mendekati 0), maka larutan tersebut tergolong Elektrolit Lemah.',
  },
  {
    id: 3,
    question:
      'Perhatikan data hasil uji daya hantar listrik beberapa larutan berikut:\n• Larutan P: Lampu menyala terang, banyak gelembung gas\n• Larutan Q: Lampu padam, tidak ada gelembung gas\n• Larutan R: Lampu menyala redup, ada sedikit gelembung gas\n\nPasangan zat yang paling tepat berturut-turut untuk mewakili larutan P, Q, dan R adalah...',
    options: [
      'P = CH₃COOH, Q = NaCl, R = Gula',
      'P = NaCl, Q = Gula (C₁₂H₂₂O₁₁), R = CH₃COOH',
      'P = Gula, Q = HCl, R = Urea',
      'P = Urea, Q = H₂SO₄, R = NaOH',
      'P = Etanol, Q = CH₃COOH, R = NaCl',
    ],
    correctIndex: 1,
    topic: 'Identifikasi Hasil Uji Daya Hantar',
    difficulty: 'Menengah',
    explanation:
      'Larutan P (terang & banyak gelembung) adalah Elektrolit Kuat = NaCl. Larutan Q (lampu padam & tanpa gelembung) adalah Nonelektrolit = Gula (Sukrosa C₁₂H₂₂O₁₁). Larutan R (redup & sedikit gelembung) adalah Elektrolit Lemah = Asam Cuka (CH₃COOH).',
  },
  {
    id: 4,
    question:
      'Padatan kristal garam dapur (NaCl) tidak dapat menghantarkan listrik, tetapi lelehan NaCl dan larutan NaCl di dalam air dapat menghantarkan listrik. Penjelasan ilmiah yang paling tepat mengenai fakta tersebut adalah...',
    options: [
      'Pada padatan NaCl tidak terdapat ion, ion baru terbentuk saat dipanaskan atau dilarutkan',
      'Pada padatan NaCl, ion-ion terikat kaku dalam kisi kristal sehingga tidak dapat bergerak bebas',
      'Padatan NaCl mengikat elektron bebas lebih kuat dibanding lelehannya',
      'Pelarut air melepaskan elektron dari atom Na ke atom Cl',
      'Kristal NaCl merupakan senyawa kovalen nonpolar yang tidak berikatan',
    ],
    correctIndex: 1,
    topic: 'Ikatan Kimia & Wujud Zat',
    difficulty: 'HOTS',
    explanation:
      'Kristal padatan NaCl sudah tersusun dari ion Na⁺ dan Cl⁻, namun ion-ion tersebut terikat sangat kaku dan rapat dalam kisi kristal elektrostatik sehingga tidak memiliki kebebasan bergerak. Pada lelehan (kisi runtuh oleh panas) dan larutan (kisi terurai oleh molekul air), ion-ion terlepas dan leluasa bergerak membawa arus listrik.',
  },
  {
    id: 5,
    question:
      'Zat di bawah ini yang tergolong senyawa kovalen polar, namun di dalam air dapat menghantarkan arus listrik dengan sangat baik (elektrolit kuat) adalah...',
    options: ['NaCl', 'KCl', 'HCl', 'BaCl₂', 'C₁₂H₂₂O₁₁'],
    correctIndex: 2,
    topic: 'Senyawa Kovalen Polar',
    difficulty: 'Menengah',
    explanation:
      'HCl (gas hidrogen klorida) terbentuk dari ikatan kovalen polar antara atom bukan logam H dan Cl. Dalam wujud gas murni, HCl tidak menghantar listrik. Namun ketika dilarutkan ke dalam air, gaya tarik dipol air menyebabkan ikatan kovalen polar HCl terputus dan terionisasi sempurna 100% menjadi ion H⁺ dan Cl⁻ (sehingga menjadi larutan elektrolit kuat). Pilihan NaCl, KCl, dan BaCl₂ merupakan senyawa ion, bukan kovalen.',
  },
  {
    id: 6,
    question:
      'Manakah di antara larutan berikut yang memiliki derajat ionisasi α = 0?',
    options: [
      'Larutan Asam Sulfat (H₂SO₄)',
      'Larutan Natrium Hidroksida (NaOH)',
      'Larutan Asam Fluorida (HF)',
      'Larutan Urea (CO(NH₂)₂)',
      'Larutan Amonia (NH₄OH)',
    ],
    correctIndex: 3,
    topic: 'Nonelektrolit',
    difficulty: 'Dasar',
    explanation:
      'Urea (CO(NH₂)₂) adalah senyawa nonelektrolit dengan nilai derajat ionisasi α = 0. Dalam air, urea hanya larut dalam bentuk molekul netral dan sama sekali tidak mengalami disosiasi atau ionisasi.',
  },
  {
    id: 7,
    question:
      'Pada pengujian elektrolit lemah seperti asam cuka (CH₃COOH), mengapa gelembung gas masih dapat teramati di permukaan elektroda meskipun nyala lampu indikator sangat redup atau bahkan padam?',
    options: [
      'Karena gelembung tersebut merupakan uap air yang mendidih akibat panas lampu',
      'Karena ion-ion yang jumlahnya sedikit tetap mengalami reaksi redoks pelepasan/penerimaan elektron di elektroda',
      'Karena elektroda karbon bereaksi langsung dengan pelarut air menghasilkan gas karbondioksida',
      'Karena asam cuka bereaksi dengan oksigen di udara membentuk gas metana',
      'Karena lampu membutuhkan tegangan yang jauh lebih tinggi daripada pembentukan gelembung gas',
    ],
    correctIndex: 1,
    topic: 'Fenomena Elektroda & Redoks',
    difficulty: 'HOTS',
    explanation:
      'Meskipun konsentrasi ion pada elektrolit lemah tergolong rendah sehingga arus listrik yang mengalir tidak cukup kuat untuk memijarkan filamen lampu, ion-ion yang ada tetap bermigrasi ke elektroda dan melangsungkan reaksi serah terima elektron (reduksi di katoda dan oksidasi di anoda), melepaskan gas seperti H₂ yang tampak sebagai gelembung-gelembung halus.',
  },
  {
    id: 8,
    question:
      'Ketika seseorang mengalami dehidrasi berat akibat diare atau olahraga maraton, dokter menyarankan untuk meminum oralit bukan hanya air putih biasa. Alasan ilmiah yang paling tepat adalah...',
    options: [
      'Air putih biasa bersifat racun bagi usus yang sedang radang',
      'Oralit mengandung kalori yang setara dengan makanan pokok',
      'Tubuh kehilangan ion elektrolit vital (Na⁺, K⁺, Cl⁻) yang dibutuhkan untuk kerja saraf, jantung, dan penyerapan air di usus',
      'Garam dalam oralit berfungsi membunuh 100% kuman dan bakteri dalam lambung',
      'Oralit menghentikan pergerakan ion dalam darah agar tidak keluar melalui keringat',
    ],
    correctIndex: 2,
    topic: 'Aplikasi Elektrolit dalam Biologi',
    difficulty: 'Menengah',
    explanation:
      'Cairan tubuh manusia tersusun atas larutan elektrolit yang mengandung kation Na⁺, K⁺, Ca²⁺ dan anion Cl⁻. Dehidrasi dan diare menguras tidak hanya air melainkan juga ion-ion garam tersebut. Oralit mengembalikan keseimbangan osmotik dan elektrolit, di mana glukosa dan natrium dalam oralit bekerja sinergis memicu penyerapan air secara optimal di saluran cerna.',
  },
  {
    id: 9,
    question:
      'Di antara larutan berikut yang mempunyai konsentrasi sama yaitu 0,1 M, larutan manakah yang menghasilkan jumlah ion bebas terbanyak di dalam air dan menyalakan lampu paling terang?',
    options: [
      'CH₃COOH 0,1 M',
      'C₁₂H₂₂O₁₁ (sukrosa) 0,1 M',
      'H₂SO₄ 0,1 M',
      'NH₄OH 0,1 M',
      'HF 0,1 M',
    ],
    correctIndex: 2,
    topic: 'Kekuatan Ionisasi & Valensi Ion',
    difficulty: 'HOTS',
    explanation:
      'H₂SO₄ adalah asam kuat bervalensi dua (asam diprotik) yang terionisasi sempurna: H₂SO₄ → 2H⁺ + SO₄²⁻. Dari 0,1 M H₂SO₄ dihasilkan total ion sebesar 3 × 0,1 M = 0,3 M ion! Sedangkan CH₃COOH, NH₄OH, dan HF adalah elektrolit lemah (hanya menghasilkan sedikit ion), dan sukrosa adalah nonelektrolit (0 ion). Maka H₂SO₄ menghasilkan jumlah ion paling melimpah dan nyala lampu paling terang.',
  },
  {
    id: 10,
    question:
      'Gas HCl dilarutkan ke dalam dua wadah yang berbeda: Wadah 1 berisi air (H₂O) dan Wadah 2 berisi benzena (C₆H₆). Ketika diuji daya hantar listriknya, hasil yang tepat adalah...',
    options: [
      'Kedua wadah dapat menghantarkan listrik karena mengandung molekul HCl yang sama',
      'Hanya larutan dalam air yang menghantarkan listrik, karena air bersifat polar sehingga mampu mengionkan molekul HCl',
      'Hanya larutan dalam benzena yang menghantarkan listrik karena benzena merupakan senyawa organik',
      'Kedua wadah tidak menghantarkan listrik karena HCl berwujud gas',
      'Larutan benzena menghantarkan listrik lebih kuat daripada larutan air',
    ],
    correctIndex: 1,
    topic: 'Pengaruh Sifat Pelarut terhadap Ionisasi',
    difficulty: 'HOTS',
    explanation:
      'Ionisasi senyawa kovalen polar memerlukan pelarut yang juga bersifat polar seperti air. Gaya tarik dipol-dipol molekul air memecah ikatan kovalen polar HCl menjadi ion H⁺ dan Cl⁻. Sebaliknya, benzena adalah pelarut nonpolar, sehingga molekul HCl dalam benzena tetap berada sebagai molekul netral tanpa mengalami ionisasi dan tidak dapat menghantarkan arus listrik.',
  },
];
