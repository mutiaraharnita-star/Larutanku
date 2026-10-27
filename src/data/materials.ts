import type { MaterialModule } from '../types/chemistry';

export const LEARNING_MODULES: MaterialModule[] = [
  {
    id: 'modul-1',
    number: 1,
    title: 'Pengertian & Hakikat Larutan Elektrolit',
    subtitle: 'Konsep dasar campuran homogen, zat terlarut, pelarut, dan kemampuan konduksi listrik.',
    iconName: 'Sparkles',
    estimatedMinutes: 6,
    sections: [
      {
        id: 'sec-1-1',
        title: 'Apa Itu Larutan Elektrolit?',
        content: [
          'Larutan adalah campuran homogen antara zat terlarut (solute) dan zat pelarut (solvent). Ketika kita melarutkan garam ke dalam air, butiran kristal garam tampak menghilang dan menyatu membentuk satu fasa cair.',
          'Larutan Elektrolit adalah larutan yang dapat menghantarkan arus listrik. Jika larutan ini dihubungkan dengan rangkaian uji daya hantar listrik (terdiri dari baterai, elektroda karbon, dan lampu indikator), lampu akan menyala dan/atau terbentuk gelembung-gelembung gas di sekitar elektroda.',
          'Sebaliknya, Larutan Nonelektrolit adalah larutan yang tidak dapat menghantarkan arus listrik sama sekali. Ketika diuji dengan alat yang sama, lampu tidak menyala dan tidak tampak adanya gelembung gas di sekitar elektroda.',
        ],
        keyTakeaway:
          'Kunci pembeda utama adalah ada atau tidaknya partikel bermuatan (ion-ion) yang dapat bergerak bebas membawa muatan listrik di dalam pelarut air.',
      },
      {
        id: 'sec-1-2',
        title: 'Rangkaian Alat Uji Daya Hantar Listrik',
        content: [
          'Uji daya hantar listrik larutan pertama kali dikembangkan secara sistematis oleh para kimiawan abad ke-19 untuk meneliti sifat kelistrikan zat cair.',
          'Rangkaian alat uji sederhana terdiri atas:',
          '1. Sumber Arus Listrik Searah (DC): seperti baterai atau adaptor arus searah.',
          '2. Dua Buah Elektroda: biasanya batang karbon (grafit) atau platina yang inert/tidak mudah bereaksi.',
          '3. Lampu Pijar/LED: sebagai indikator visual ada tidaknya aliran arus listrik.',
          '4. Wadah Beaker Gelas: berisi cairan atau larutan yang akan diuji.',
          'Ketika kedua elektroda dicelupkan ke dalam larutan (tanpa saling bersentuhan satu sama lain) dan saklar ditutup, larutan bertindak sebagai medium penutup rangkaian listrik.',
        ],
        comparisonTable: {
          headers: ['Gejala Uji', 'Larutan Elektrolit', 'Larutan Nonelektrolit'],
          rows: [
            ['Nyala Lampu', 'Menyala terang atau redup', 'Padam (tidak menyala)'],
            ['Gelembung Gas', 'Banyak atau sedikit pada elektroda', 'Tidak ada gelembung gas'],
            ['Partikel dalam Air', 'Terdapat ion positif dan ion negatif', 'Hanya berupa molekul netral'],
            ['Daya Hantar Arus', 'Mampu mengalirkan arus listrik', 'Tidak dapat mengalirkan arus'],
          ],
        },
      },
    ],
    summary: [
      'Larutan elektrolit dapat menghantarkan arus listrik karena mengandung ion-ion yang bergerak bebas.',
      'Larutan nonelektrolit tidak dapat menghantarkan arus listrik karena zat terlarut tetap berupa molekul netral.',
      'Indikator keberadaan arus listrik dalam uji laboratorium adalah nyala lampu dan munculnya gelembung gas pada elektroda.',
    ],
  },
  {
    id: 'modul-2',
    number: 2,
    title: 'Klasifikasi Larutan & Derajat Ionisasi (α)',
    subtitle: 'Mengenal perbedaan mendasar elektrolit kuat, elektrolit lemah, dan nonelektrolit.',
    iconName: 'Zap',
    estimatedMinutes: 8,
    sections: [
      {
        id: 'sec-2-1',
        title: 'Derajat Ionisasi (α)',
        content: [
          'Kekuatan suatu larutan elektrolit bergantung pada seberapa banyak molekul zat terlarut yang terurai menjadi ion di dalam pelarut. Ukuran kuantitatif ini disebut Derajat Ionisasi (disimbolkan dengan huruf Yunani α, alfa).',
          'Derajat ionisasi didefinisikan sebagai perbandingan antara jumlah mol zat yang terionisasi dengan jumlah mol zat yang dilarutkan mula-mula.',
        ],
        formulaBox: {
          title: 'Rumus Derajat Ionisasi (α)',
          formula: 'α = (Jumlah mol zat yang terionisasi) / (Jumlah mol zat mula-mula)',
          description:
            'Nilai α berkisar antara 0 hingga 1 (atau 0% hingga 100%). Semakin mendekati 1, semakin kuat daya hantar listrik larutannya.',
        },
      },
      {
        id: 'sec-2-2',
        title: 'Tiga Kategori Berdasarkan Nilai α',
        content: [
          '1. Elektrolit Kuat (α = 1 atau 100%):',
          'Seluruh molekul zat terlarut terurai sempurna menjadi ion-ion bebas. Tidak ada lagi molekul asal yang tersisa dalam wujud netral. Karena konsentrasi ionnya sangat banyak, arus listrik mengalir kuat: lampu menyala sangat terang dan gelembung gas timbul dalam jumlah melimpah.',
          'Contoh: Asam kuat (HCl, H₂SO₄, HNO₃), Basa kuat (NaOH, KOH, Ca(OH)₂), dan hampir semua Garam mudah larut (NaCl, KCl, KNO₃).',
          '',
          '2. Elektrolit Lemah (0 < α < 1, biasanya α << 1):',
          'Zat terlarut hanya terurai sebagian kecil menjadi ion, sedangkan sebagian besar sisanya tetap berada dalam bentuk molekul netral. Terjadi kesetimbangan dinamis bolak-balik antara molekul dan ion-ionnya. Konsentrasi ion pembawa muatan sedikit: lampu menyala redup (atau bahkan padam pada konsentrasi rendah) namun tetap terdapat gelembung gas di elektroda.',
          'Contoh: Asam lemah (CH₃COOH, HF, H₂CO₃, HCN) dan Basa lemah (NH₄OH, Al(OH)₃).',
          '',
          '3. Nonelektrolit (α = 0):',
          'Zat terlarut sama sekali tidak mengalami ionisasi ketika larut dalam air. Zat hanya terdispersi menjadi molekul-molekul netral yang tidak bermuatan. Lampu padam total dan tidak timbul gelembung gas sama sekali.',
          'Contoh: Gula pasir (sukrosa C₁₂H₂₂O₁₁), Urea (CO(NH₂)₂), Glukosa (C₆H₁₂O₆), dan Etanol (C₂H₅OH).',
        ],
        comparisonTable: {
          headers: ['Parameter', 'Elektrolit Kuat', 'Elektrolit Lemah', 'Nonelektrolit'],
          rows: [
            ['Derajat Ionisasi', 'α = 1 (100%)', '0 < α < 1 (sebagian kecil)', 'α = 0 (0%)'],
            ['Nyala Lampu', 'Terang benderang', 'Redup / samar', 'Padam total'],
            ['Gelembung Gas', 'Banyak di kedua elektroda', 'Sedikit / gelembung halus', 'Tidak ada gelembung'],
            ['Zat dalam Larutan', 'Hanya ion-ion', 'Campuran ion & banyak molekul', 'Hanya molekul netral'],
            ['Jenis Reaksi', 'Searah (→)', 'Bolak-balik / reversible (⇌)', 'Hanya pelarutan fisik'],
          ],
        },
      },
    ],
    summary: [
      'Elektrolit kuat terionisasi sempurna (α = 1), menghasilkan lampu terang dan banyak gelembung gas.',
      'Elektrolit lemah terionisasi sebagian (0 < α < 1), lampu redup dan sedikit gelembung.',
      'Nonelektrolit tidak terionisasi sama sekali (α = 0), lampu padam dan tanpa gelembung gas.',
    ],
  },
  {
    id: 'modul-3',
    number: 3,
    title: 'Teori Ionisasi Arrhenius & Mekanisme Listrik',
    subtitle: 'Bagaimana ion-ion bergerak bebas menghantarkan muatan di tingkat submikroskopik.',
    iconName: 'Atom',
    estimatedMinutes: 7,
    sections: [
      {
        id: 'sec-3-1',
        title: 'Teori Ion Svante Arrhenius (1887)',
        content: [
          'Pada tahun 1887, kimiawan asal Swedia, Svante August Arrhenius, mengemukakan teori revolusioner yang memenangkan Hadiah Nobel Kimia: "Zat elektrolit dalam larutan air akan terurai menjadi partikel-partikel bermuatan listrik yang disebut ion."',
          'Ion bermuatan positif dinamakan Kation, sedangkan ion bermuatan negatif dinamakan Anion.',
          'Meskipun larutan mengandung ion-ion bermuatan, larutan elektrolit secara makroskopis tetap bersifat Netral (jumlah total muatan positif sama persis dengan jumlah total muatan negatif).',
        ],
        formulaBox: {
          title: 'Contoh Persamaan Ionisasi',
          formula: 'NaCl(s) → Na⁺(aq) + Cl⁻(aq)   |   CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)',
          description:
            'Tanda panah searah (→) menandakan ionisasi sempurna pada elektrolit kuat, sedangkan tanda panah bolak-balik (⇌) menandakan kesetimbangan ionisasi pada elektrolit lemah.',
        },
      },
      {
        id: 'sec-3-2',
        title: 'Bagaimana Arus Listrik Mengalir di Dalam Larutan?',
        content: [
          'Pada konduktor logam (seperti kawat tembaga), arus listrik dialirkan oleh aliran elektron bebas.',
          'Namun di dalam larutan cair, elektron TIDAK mengalir bebas melalui air. Sebaliknya, arus listrik dihantarkan oleh perpindahan ion-ion yang bergerak menuju elektroda yang berlawanan muatan:',
          '1. Kation (ion positif) ditarik dan bergerak menuju Katoda (elektroda bermuatan negatif). Di katoda terjadi reaksi reduksi di mana kation menangkap elektron.',
          '2. Anion (ion negatif) ditarik dan bergerak menuju Anoda (elektroda bermuatan positif). Di anoda terjadi reaksi oksidasi di mana anion melepaskan elektron.',
          'Reaksi serah terima elektron di permukaan elektroda inilah yang menghasilkan gelembung gas (misalnya gas hidrogen H₂ di katoda atau gas klorin Cl₂/oksigen O₂ di anoda) dan melengkapi sirkuit listrik sehingga lampu dapat menyala.',
        ],
        keyTakeaway:
          'Kunci daya hantar listrik larutan: (1) Adanya partikel bermuatan (ion), dan (2) Ion-ion tersebut dapat bergerak bebas (mobile). Jika ion terkunci rapat di tempatnya, arus listrik tidak dapat mengalir.',
      },
    ],
    summary: [
      'Svante Arrhenius membuktikan bahwa elektrolit terurai menjadi kation (+) dan anion (-).',
      'Arus listrik dalam larutan dibawa oleh mobilitas gerak ion-ion bebas, bukan elektron bebas.',
      'Gelembung gas di elektroda timbul akibat reaksi redoks (serah terima elektron) pada permukaan elektroda.',
    ],
  },
  {
    id: 'modul-4',
    number: 4,
    title: 'Ikatan Kimia: Senyawa Ionik vs Kovalen Polar',
    subtitle: 'Mengapa lelehan NaCl menghantarkan listrik namun kristal padat NaCl tidak?',
    iconName: 'Boxes',
    estimatedMinutes: 8,
    sections: [
      {
        id: 'sec-4-1',
        title: 'Wujud Zat dan Daya Hantar Listrik Senyawa Ion',
        content: [
          'Senyawa ionik (seperti NaCl, KBr, NaOH, CaCl₂) tersusun dari kisi kristal kation dan anion yang terikat kuat oleh gaya elektrostatik.',
          'Mari kita tinjau 3 wujud fisik senyawa ion:',
          '1. Padatan (Kristal): TIDAK dapat menghantarkan listrik. Meskipun mengandung ion, ion-ion tersebut terikat kaku dan kuat dalam kisi kristal sehingga tidak bisa bergerak bebas.',
          '2. Lelehan (Cairan Murni / Molten): DAPAT menghantarkan listrik dengan sangat baik. Pemanasan hingga meleleh memutuskan kisi kristal, memungkinkan ion-ion bergerak leluasa.',
          '3. Larutan (Dalam Air): DAPAT menghantarkan listrik dengan sangat baik. Molekul air yang bersifat polar mendisolusi dan menghidrasi ion-ion, membuat ion bebas bergerak ke segala arah.',
        ],
        comparisonTable: {
          headers: ['Wujud Senyawa Ion', 'Daya Hantar Listrik', 'Alasan Ilmiah'],
          rows: [
            ['Padatan', 'Isolator (Tidak menghantar)', 'Ion terikat kaku dalam kisi kristal, tidak dapat bergerak'],
            ['Lelehan', 'Konduktor Baik', 'Kisi kristal runtuh oleh panas, ion bebas bergerak'],
            ['Larutan', 'Konduktor Sangat Baik', 'Molekul air memisahkan ion menjadi ion terhidrasi bebas'],
          ],
        },
      },
      {
        id: 'sec-4-2',
        title: 'Senyawa Kovalen Polar',
        content: [
          'Senyawa kovalen terbentuk melalui pemakaian elektron bersama. Sebagian senyawa kovalen memiliki perbedaan keelektronegatifan yang cukup besar sehingga membentuk kutub muatan (senyawa kovalen polar), misalnya HCl, H₂SO₄, NH₃, dan CH₃COOH.',
          'Apakah senyawa kovalen murni menghantarkan listrik?',
          '- Dalam wujud murni (gas atau cairan murni): Senyawa kovalen TIDAK menghantarkan listrik karena tersusun atas molekul-molekul netral, bukan ion.',
          '- Dalam wujud larutan air: Ketika dilarutkan ke dalam air yang juga polar, tarikan dipol air menyebabkan ikatan kovalen polar putus dan terionisasi menghasilkan ion H⁺ dan anion pendampingnya! Karena itu, larutan airnya menjadi konduktif.',
          'Catatan: Senyawa kovalen nonpolar (seperti minyak, bensin, gas metana) tidak dapat terionisasi dalam air dan sama sekali tidak menghantarkan listrik.',
        ],
        keyTakeaway:
          'Senyawa kovalen HANYA dapat menghantarkan listrik jika berikatan kovalen polar DAN berada dalam wujud larutan air yang menyebabkannya terionisasi.',
      },
    ],
    summary: [
      'Senyawa ionik padat tidak menghantar listrik, tetapi lelehan dan larutannya menghantar listrik.',
      'Senyawa kovalen murni tidak menghantar listrik. Senyawa kovalen polar hanya menghantar listrik ketika dilarutkan dalam air.',
      'Senyawa kovalen nonpolar tidak pernah menghantarkan listrik dalam kondisi apapun.',
    ],
  },
  {
    id: 'modul-5',
    number: 5,
    title: 'Aplikasi Nyata & Larutan Elektrolit Tubuh',
    subtitle: 'Peran vital larutan elektrolit dalam fisiologi manusia, otomotif, dan industri.',
    iconName: 'HeartPulse',
    estimatedMinutes: 6,
    sections: [
      {
        id: 'sec-5-1',
        title: 'Elektrolit dalam Tubuh Manusia',
        content: [
          'Sekitar 60% tubuh manusia tersusun atas air yang mengandung berbagai jenis elektrolit vital: Na⁺, K⁺, Ca²⁺, Mg²⁺, Cl⁻, dan HCO₃⁻.',
          'Fungsi fisiologis utama elektrolit dalam tubuh:',
          '1. Transmisi Impuls Saraf: Perbedaan konsentrasi ion Na⁺ di luar sel dan K⁺ di dalam sel menghasilkan potensial membran yang memungkinkan sinyal saraf merambat ke otak dan otot.',
          '2. Kontraksi Otot Jantung & Rangka: Ion kalsium (Ca²⁺) memicu pengikatan protein aktin-miosin untuk kontraksi otot.',
          '3. Keseimbangan Cairan & Tekanan Osmotik: Mengatur volume darah dan hidrasi sel agar sel tidak dehidrasi atau pecah.',
          'Oralit dan Minuman Isotonik: Ketika seseorang diare atau berolahraga berat hingga berkeringat banyak, tubuh kehilangan air sekaligus ion garam. Meminum air murni saja tidak cukup; larutan oralit (campuran air, garam NaCl, dan sedikit glukosa) mempercepat penyerapan kembali ion elektrolit melalui dinding usus.',
        ],
      },
      {
        id: 'sec-5-2',
        title: 'Aplikasi Industri & Kehidupan Sehari-hari',
        content: [
          '1. Akumulator (Aki Kendaraan): Menggunakan larutan elektrolit asam sulfat (H₂SO₄ ~30%) untuk memfasilitasi reaksi redoks antara pelat timbal (Pb) dan timbal dioksida (PbO₂), menghasilkan listrik penyala mesin kendaraan.',
          '2. Elektroplating (Penyepuhan Logam): Memanfaatkan larutan garam logam (misal CuSO₄ untuk pelapisan tembaga atau AgCN untuk pelapisan perak) agar ion logam menempel rata melindungi permukaan logam lain dari karat.',
          '3. Pengolahan Air Limbah: Menggunakan tawas Al₂(SO₄)₃ yang terionisasi menghasilkan ion Al³⁺ untuk menggumpalkan (koagulasi) partikel kotoran koloid bermuatan negatif dalam air keruh.',
        ],
      },
    ],
    summary: [
      'Ion Na⁺, K⁺, dan Ca²⁺ sangat penting untuk kerja saraf, jantung, dan otot manusia.',
      'Oralit mengembalikan keseimbangan ion tubuh yang hilang saat dehidrasi.',
      'Aki kendaraan bermotor dan industri pelapisan logam sangat bergantung pada larutan elektrolit.',
    ],
  },
];
