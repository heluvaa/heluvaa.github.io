/**
 * ============================================================
 *  SATU-SATUNYA FILE KONTEN
 * ============================================================
 * Semua teks, harga, produk, artikel, dan kontak ada di sini.
 * Komponen tidak menyimpan string apa pun — ubah file ini saja.
 *
 * TANDA [ISI] = masih placeholder, WAJIB diganti sebelum dipakai jualan.
 * Selama `site.demo` masih true, halaman menampilkan badge "CONTOH"
 * di harga dan data yang belum nyata.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Paket = {
  id: string;
  nama: string;
  ringkas: string;
  harga: string;
  hargaNote: string;
  unggulan?: boolean;
  fitur: string[];
  cta: { label: string; href: string };
};

export type Aplikasi = {
  slug: string;
  nama: string;
  tagline: string;
  kategori: "Kuliner" | "Kasir" | "Penjualan" | "Sekolah" | "IoT" | "Lainnya";
  mulai: string;
  ringkas: string;
  /** Paragraf di halaman detail. */
  deskripsi: string[];
  fitur: string[];
  teknologi: string[];
  /** Pratinjau mini yang dirender jadi UI asli di kartu (bukan gambar). */
  mockup: Mockup;
  /** true = produk contoh, belum benar-benar dijual. */
  demo: boolean;
};

export type MockupBaris = { label: string; nilai?: string; bar?: number };
export type Mockup = { jenis?: "list" | "chart"; judul: string; baris: MockupBaris[] };

export type Karya = {
  judul: string;
  kategori: string;
  tahun: string;
  ringkas: string;
  tags: string[];
  /** Kosongkan kalau belum ada demo publik. */
  url: string;
  demo: boolean;
};

export type Artikel = {
  slug: string;
  judul: string;
  tanggal: string;
  tag: string;
  ringkas: string;
  menitBaca: number;
  isi: Block[];
  draft: boolean;
};

export type Faq = { tanya: string; jawab: string };

export type Kontak = {
  label: string;
  nilai: string;
  url: string;
  /** true = belum ada data asli; dirender non-aktif, bukan link palsu. */
  pending?: boolean;
};

/* ------------------------------------------------------------ */

export const site = {
  /** Ganti dengan nama brand/usaha yang kamu mau. */
  nama: "Decu",
  lengkap: "Decu — Jasa Website & Aplikasi",
  inisial: "DC",
  tagline: "Website, aplikasi web, dan solusi IoT yang siap dipakai.",
  deskripsi:
    "Jasa pembuatan website, aplikasi web, dan solusi IoT untuk UMKM, sekolah, dan perorangan. Tersedia aplikasi siap pakai maupun custom dari nol.",
  domain: "heluvaa.github.io",
  url: "https://heluvaa.github.io",
  /** Target pembeli — dipakai di copy section keunggulan. */
  target: "UMKM, sekolah, dan mahasiswa",
  /** Set false setelah semua [ISI] diganti dan data demo dihapus. */
  demo: true,
} as const;

export const nav = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
] as const;

/* ------------------------------------------------------------ */

export const hero = {
  badge: "Terima order — respons cepat",
  judul: "Punya website & aplikasi sendiri, tanpa ribet dan tanpa mahal.",
  paragraf:
    "Saya bantu UMKM, sekolah, dan perorangan punya website, aplikasi web, atau solusi IoT yang modern dan langsung bisa dipakai. Pilih aplikasi siap pakai dari katalog, atau minta dibuatkan khusus sesuai kebutuhan.",
  ctaUtama: { label: "Lihat Katalog", href: "/katalog" },
  ctaKedua: { label: "Minta Penawaran", href: "/request-custom" },
  /** Kalimat penenang di bawah tombol. */
  catatan: "Konsultasi dulu gratis — hitung waktu dan biaya jujur sebelum mulai.",
} as const;

export const keunggulan = {
  judul: "Kenapa kerja sama di sini",
  paragraf:
    "Bukan cuma jual file jadi lalu hilang. Kamu dapat kode sumbernya, panduannya, dan orang yang bisa ditanya setelahnya.",
  item: [
    {
      ikon: "kode",
      judul: "Kode sumber jadi milikmu",
      teks: "Kamu terima source code lengkap plus panduan cara pakai dan menaruhnya di hosting.",
    },
    {
      ikon: "cepat",
      judul: "Waktu pengerjaan jelas",
      teks: "Estimasi disampaikan di depan, bukan sambil jalan. Ada tonggak progres yang bisa kamu pantau.",
    },
    {
      ikon: "revisi",
      judul: "Revisi dijelaskan jujur",
      teks: "Batas revisi dan cakupannya ditulis sejak awal, jadi tidak ada kejutan di akhir.",
    },
    {
      ikon: "rawat",
      judul: "Bisa ditanya setelah serah terima",
      teks: "Ada masa garansi untuk perbaikan bug dari hasil pengerjaan, dan jalur komunikasi yang tetap terbuka.",
    },
  ],
} as const;

/* ------------------------------------------------------------ */
/*  PAKET HARGA — semua angka masih contoh. Ganti dengan harga asli.  */
/* ------------------------------------------------------------ */

export const paketHarga = {
  judul: "Paket Harga",
  paragraf:
    "Tiga cara mulai. Semua harga di bawah adalah contoh — angka final tergantung kebutuhan dan tingkat kesulitan.",
  paket: [
    {
      id: "siap-pakai",
      nama: "Aplikasi Siap Pakai",
      ringkas: "Pilih aplikasi jadi dari katalog, langsung jalan.",
      harga: "Rp 300.000",
      hargaNote: "sekali bayar, mulai dari",
      fitur: [
        "Pilih aplikasi apa pun dari katalog",
        "Kode sumber lengkap + panduan pemasangan",
        "Akses demo online sebelum memutuskan",
        "Dukungan lewat WhatsApp selama pemasangan",
      ],
      cta: { label: "Lihat Katalog", href: "/katalog" },
    },
    {
      id: "kustomisasi",
      nama: "Kustomisasi",
      ringkas: "Aplikasi jadi yang disesuaikan dengan brand dan alurmu.",
      harga: "Rp 500.000",
      hargaNote: "sekali bayar, mulai dari",
      unggulan: true,
      fitur: [
        "Semua fitur paket Aplikasi Siap Pakai",
        "Tampilan disesuaikan dengan warna dan logo kamu",
        "Penambahan modul sesuai kebutuhan",
        "Pendampingan sampai kamu bisa menjalankannya sendiri",
      ],
      cta: { label: "Minta Penawaran", href: "/request-custom" },
    },
    {
      id: "custom-rumit",
      nama: "Custom Rumit",
      ringkas: "Dibangun dari nol, termasuk sistem survei dan IoT.",
      harga: "Menyesuaikan",
      hargaNote: "harga sesuai lingkup pekerjaan",
      fitur: [
        "Perancangan sistem dari nol sesuai kebutuhan",
        "Pengembangan web dan integrasi perangkat IoT",
        "Penyambungan sensor, alat, dan aliran data",
        "Garansi perbaikan bug dari hasil pengerjaan",
      ],
      cta: { label: "Request Custom", href: "/request-custom" },
    },
  ] as Paket[],
} as const;

/* ------------------------------------------------------------ */
/*  KATALOG — semua demo: true. Ganti dengan produk sungguhan.   */
/* ------------------------------------------------------------ */

export const katalog = {
  judul: "Katalog Aplikasi",
  paragraf:
    "Semuanya bisa dicoba dulu lewat demo sebelum kamu putuskan. Klik salah satu untuk melihat fitur lengkapnya.",
  aplikasi: [
    {
      slug: "menu-digital-qr",
      nama: "Katalog Menu Digital QR",
      tagline: "Menu warung dan restoran yang dibuka lewat scan QR",
      kategori: "Kuliner",
      mulai: "Rp 300.000",
      ringkas:
        "Pelanggan tinggal scan QR di meja, menu langsung terbuka di HP. Tanpa pasang aplikasi, tanpa cetak ulang setiap harga berubah.",
      deskripsi: [
        "Pelanggan mengarahkan kamera ke QR di meja, dan menu lengkap dengan foto serta harga langsung terbuka di browser mereka. Tidak perlu memasang apa pun.",
        "Pemilik warung bisa mengubah nama menu, harga, dan ketersediaan sendiri tanpa perlu menghubungi siapa pun. Cocok untuk usaha yang menunya sering berubah mengikuti harga pasar.",
      ],
      fitur: [
        "QR per meja atau satu QR untuk seluruh kedai",
        "Ubah menu dan harga sendiri, langsung berlaku",
        "Tanda menu habis tanpa perlu hapus data",
        "Kategori menu agar pelanggan cepat menemukan",
      ],
      teknologi: ["HTML", "CSS", "JavaScript", "Static hosting"],
      mockup: {
        judul: "Menu Kedai Kopi",
        baris: [
            { label: "Nasi Goreng Spesial", nilai: "Rp 15.000" },
            { label: "Ayam Geprek Sambal Ijo", nilai: "Rp 13.000" },
            { label: "Es Teh Manis", nilai: "Rp 5.000" },
            { label: "Kerupuk Udang", nilai: "Rp 2.000" },
        ],
      },
      demo: true,
    },
    {
      slug: "kasir-stok-warung",
      nama: "Kasir & Stok Warung",
      tagline: "Catat penjualan dan stok harian dari HP",
      kategori: "Kasir",
      mulai: "Rp 350.000",
      ringkas:
        "Mencatat penjualan, belanja, dan stok dalam satu aplikasi sederhana. Laporan harian bisa dibaca dari HP tanpa perlu buka buku.",
      deskripsi: [
        "Setiap transaksi dicatat dalam hitungan detik. Stok berkurang otomatis, jadi kamu tahu kapan harus kulakan sebelum barang di rak benar-benar kosong.",
        "Di akhir hari, laporan penjualan dan laba tersusun sendiri. Tidak ada lagi menghitung uang kembalian dan menebak-nebak untung.",
      ],
      fitur: [
        "Input transaksi cepat dengan tombol angka besar",
        "Stok berkurang otomatis tiap penjualan",
        "Peringatan barang hampir habis",
        "Rekap penjualan harian dan bulanan",
      ],
      teknologi: ["HTML", "CSS", "JavaScript", "Local storage"],
      mockup: {
        judul: "Rekap Hari Ini",
        baris: [
            { label: "Penjualan", nilai: "Rp 1.240.000" },
            { label: "Laba kotor", nilai: "Rp 380.000" },
            { label: "Transaksi", nilai: "87 kali" },
            { label: "Stok menipis", nilai: "3 item" },
        ],
      },
      demo: true,
    },
    {
      slug: "toko-online-whatsapp",
      nama: "Toko Online Sederhana",
      tagline: "Katalog produk yang ordernya langsung masuk WhatsApp",
      kategori: "Penjualan",
      mulai: "Rp 400.000",
      ringkas:
        "Punya halaman produk yang bisa dibagikan ke pelanggan, dan setiap pesanan langsung masuk WhatsApp dengan rincian sudah terisi.",
      deskripsi: [
        "Kamu punya satu tautan yang bisa dibagikan di status, bio, atau grup. Pelanggan melihat produk beserta fotonya, lalu memilih varian dan jumlah.",
        "Saat menekan tombol pesan, WhatsApp terbuka dengan rincian pesanan yang sudah tertulis rapi. Kamu tinggal membalas dan mengonfirmasi.",
      ],
      fitur: [
        "Halaman produk dengan foto dan varian",
        "Keranjang sederhana tanpa perlu akun",
        "Pesanan terkirim ke WhatsApp lengkap dengan rincian",
        "Tautan bisa dibagikan ke mana saja",
      ],
      teknologi: ["HTML", "CSS", "JavaScript", "WhatsApp deep link"],
      mockup: {
        judul: "Katalog Produk",
        baris: [
            { label: "Kaos Polos Premium", nilai: "Rp 75.000" },
            { label: "Totebag Kanvas", nilai: "Rp 55.000" },
            { label: "Topi Baseball", nilai: "Rp 45.000" },
            { label: "Di keranjang", nilai: "2 item" },
        ],
      },
      demo: true,
    },
    {
      slug: "absensi-sekolah-qr",
      nama: "Absensi Sekolah QR",
      tagline: "Absensi siswa dan guru dengan scan kartu QR",
      kategori: "Sekolah",
      mulai: "Rp 450.000",
      ringkas:
        "Guru dan siswa cukup menempelkan kartu ke kamera. Kehadiran tercatat rapi dan rekapnya bisa diunduh untuk laporan.",
      deskripsi: [
        "Sekolah tidak perlu lagi mengumpulkan daftar hadir kertas. Setiap scan langsung tercatat dengan waktu dan keterangan terlambat.",
        "Rekap per kelas dan per bulan bisa diunduh sebagai berkas untuk keperluan administrasi maupun laporan ke orang tua.",
      ],
      fitur: [
        "Scan QR atau barcode dari kartu siswa",
        "Penanda otomatis untuk yang terlambat",
        "Rekap per kelas, per bulan, siap diunduh",
        "Riwayat kehadiran tiap siswa",
      ],
      teknologi: ["HTML", "CSS", "JavaScript", "QR scanner"],
      mockup: {
        judul: "Kelas VII-A",
        baris: [
            { label: "Hadir", nilai: "32 siswa" },
            { label: "Terlambat", nilai: "3 siswa" },
            { label: "Izin", nilai: "2 siswa" },
            { label: "Tanpa keterangan", nilai: "1 siswa" },
        ],
      },
      demo: true,
    },
    {
      slug: "undangan-digital",
      nama: "Undangan Digital",
      tagline: "Undangan acara online dengan tautan yang bisa dibagikan",
      kategori: "Lainnya",
      mulai: "Rp 300.000",
      ringkas:
        "Undangan berbentuk halaman web yang dibuka dari HP. Bisa memuat detail acara, galeri foto, dan lokasi yang langsung tersambung ke peta.",
      deskripsi: [
        "Cukup kirim satu tautan ke keluarga dan teman. Mereka membuka undanganmu di HP, lengkap dengan hitung mundur menuju hari acara.",
        "Bagian lokasi tersambung ke peta, jadi tamu tidak perlu lagi bertanya arah. Kamu juga bisa melihat siapa saja yang sudah membuka undangan.",
      ],
      fitur: [
        "Hitung mundur menuju hari acara",
        "Galeri foto dan cerita singkat",
        "Lokasi yang tersambung langsung ke peta",
        "Rekap tamu yang membuka undangan",
      ],
      teknologi: ["HTML", "CSS", "JavaScript"],
      mockup: {
        judul: "Undangan Pernikahan",
        baris: [
            { label: "Akad nikah", nilai: "09.00 WIB" },
            { label: "Resepsi", nilai: "11.00 WIB" },
            { label: "Lokasi", nilai: "Gedung Serbaguna" },
            { label: "Tamu membuka", nilai: "128 orang" },
        ],
      },
      demo: true,
    },
    {
      slug: "dashboard-iot",
      nama: "Dashboard Monitoring IoT",
      tagline: "Pantau alat dan sensor dari jarak jauh",
      kategori: "IoT",
      mulai: "Menyesuaikan",
      ringkas:
        "Untuk kebutuhan pemantauan: suhu, kelembapan, daya, atau status alat yang dibaca dari sensor dan ditampilkan di satu dashboard.",
      deskripsi: [
        "Sensor membaca kondisi di lapangan lalu mengirimkannya ke dashboard yang bisa kamu buka dari HP atau komputer, dari mana saja.",
        "Kalau nilai yang dibaca keluar dari batas wajar, sistem bisa memberi peringatan sehingga masalah ditangani sebelum membesar.",
      ],
      fitur: [
        "Pembacaan sensor secara berkala",
        "Grafik riwayat untuk melihat tren",
        "Peringatan otomatis saat nilai di luar batas",
        "Pengaturan batas wajar per sensor",
      ],
      teknologi: ["Sensor", "Mikrokontroler", "Web dashboard"],
      mockup: {
        jenis: "chart",
        judul: "Gudang — Sensor 01",
        baris: [
            { label: "Suhu", nilai: "28 °C", bar: 62 },
            { label: "Kelembapan", nilai: "64 %", bar: 64 },
            { label: "Daya", nilai: "420 W", bar: 42 },
            { label: "Status", nilai: "Normal", bar: 88 },
        ],
      },
      demo: true,
    },
  ] as Aplikasi[],
} as const;

/* ------------------------------------------------------------ */
/*  PORTOFOLIO — semua demo: true. Isi dengan karya aslimu.       */
/* ------------------------------------------------------------ */

export const portofolio = {
  judul: "Portofolio",
  paragraf:
    "Sebagian pekerjaan yang sudah dikerjakan. Semua masih contoh — ganti dengan proyek aslimu sendiri.",
  karya: [
    {
      judul: "Menu Digital untuk Kedai Kopi",
      kategori: "Kuliner",
      tahun: "2026",
      ringkas:
        "Menu QR untuk kedai dengan 40 item, dibuka rata-rata 300 kali setiap minggu oleh pelanggan.",
      tags: ["Menu QR", "Static site"],
      url: "",
      demo: true,
    },
    {
      judul: "Sistem Kasir Toko Kelontong",
      kategori: "Kasir",
      tahun: "2026",
      ringkas:
        "Pencatatan penjualan dan stok harian, menggantikan pencatatan manual di buku tulis.",
      tags: ["Kasir", "Laporan harian"],
      url: "",
      demo: true,
    },
    {
      judul: "Absensi QR untuk Sekolah Menengah",
      kategori: "Sekolah",
      tahun: "2025",
      ringkas:
        "Absensi harian 400 siswa dengan rekap bulanan yang siap diunduh untuk administrasi.",
      tags: ["Absensi", "QR"],
      url: "",
      demo: true,
    },
    {
      judul: "Monitoring Suhu Gudang",
      kategori: "IoT",
      tahun: "2025",
      ringkas:
        "Sensor suhu dan kelembapan yang mengirim data ke dashboard, lengkap dengan peringatan batas wajar.",
      tags: ["IoT", "Dashboard"],
      url: "",
      demo: true,
    },
  ] as Karya[],
} as const;

/* ------------------------------------------------------------ */
/*  BLOG — semua draft: true. Tulis ulang dengan gayamu sendiri.  */
/* ------------------------------------------------------------ */

export const blog = {
  judul: "Artikel",
  paragraf: "Tips dan wawasan seputar website, aplikasi, dan IoT untuk usaha kecil.",
  artikel: [
    {
      slug: "kenapa-warung-butuh-menu-qr",
      judul: "Kenapa Warung Butuh Menu Digital QR",
      tanggal: "2026-10-08",
      tag: "Kuliner",
      ringkas:
        "Pelanggan sudah terbiasa memindai QR. Ini alasan menu digital lebih menguntungkan daripada menu cetak.",
      menitBaca: 4,
      draft: true,
      isi: [
        {
          type: "p",
          text: "Menu cetak punya satu masalah yang tidak bisa dihindari: begitu harga bahan naik, kamu harus mencetak ulang semuanya. Menu digital menghilangkan masalah itu sepenuhnya.",
        },
        { type: "h2", text: "Harga berubah tanpa biaya cetak" },
        {
          type: "p",
          text: "Mengubah harga di menu digital selesai dalam satu menit dan langsung berlaku untuk semua pelanggan. Tidak ada biaya cetak, tidak ada menu lama yang masih beredar dengan harga keliru.",
        },
        { type: "h2", text: "Pelanggan lebih cepat memutuskan" },
        {
          type: "ul",
          items: [
            "Foto menu membantu pelanggan membayangkan porsi yang dipesan.",
            "Kategori membuat pelanggan tidak perlu membaca satu halaman penuh.",
            "Tanda menu habis mencegah pelanggan memesan barang yang tidak ada.",
          ],
        },
        {
          type: "p",
          text: "Kalau kamu ingin mencobanya, mulai dari satu meja dulu. Ukur berapa pelanggan yang benar-benar memindai, baru perluas ke seluruh kedai.",
        },
      ],
    },
    {
      slug: "aplikasi-jadi-atau-custom",
      judul: "Aplikasi Jadi atau Custom, Mana yang Cocok?",
      tanggal: "2026-10-07",
      tag: "Panduan",
      ringkas:
        "Tidak semua kebutuhan harus dibangun dari nol. Ini cara menentukan mana yang masuk akal untuk usaha kecil.",
      menitBaca: 5,
      draft: true,
      isi: [
        {
          type: "p",
          text: "Pertanyaan yang paling sering muncul: mending beli aplikasi jadi, atau pesan custom dari nol? Jawabannya tergantung pada seberapa berbeda alur kerjamu dari kebanyakan orang.",
        },
        { type: "h2", text: "Ambil yang jadi kalau alurnya sudah umum" },
        {
          type: "p",
          text: "Kasir, absensi, dan katalog produk punya pola yang sudah mapan. Membangunnya dari nol hanya menghabiskan waktu dan biaya untuk hasil yang serupa.",
        },
        { type: "h2", text: "Pesan custom kalau ada satu hal yang benar-benar khas" },
        {
          type: "p",
          text: "Kalau usahamu punya cara kerja yang berbeda dari kebanyakan, atau butuh menyambungkan alat dan sensor, barulah custom masuk akal. Di luar itu, kustomisasi aplikasi jadi biasanya sudah cukup.",
        },
        {
          type: "ul",
          items: [
            "Mulai dari yang paling murah yang bisa menyelesaikan masalahmu.",
            "Naik ke custom hanya setelah kamu tahu bagian mana yang tidak muat.",
            "Minta perkiraan waktu dan biaya tertulis sebelum memutuskan.",
          ],
        },
      ],
    },
    {
      slug: "lima-fitur-wajib-aplikasi-kasir",
      judul: "Lima Fitur Wajib Aplikasi Kasir untuk Usaha Kecil",
      tanggal: "2026-10-06",
      tag: "Kasir",
      ringkas:
        "Banyak aplikasi kasir menawarkan puluhan fitur, padahal usaha kecil biasanya hanya butuh lima.",
      menitBaca: 4,
      draft: true,
      isi: [
        {
          type: "p",
          text: "Aplikasi kasir yang terlalu banyak fitur justru lebih sering ditinggalkan. Semakin banyak yang harus diisi, semakin malas dicatat setiap hari.",
        },
        { type: "h2", text: "Yang benar-benar dipakai setiap hari" },
        {
          type: "ul",
          items: [
            "Input transaksi cepat, bisa diselesaikan sambil melayani pembeli.",
            "Stok yang berkurang sendiri tanpa perlu dihitung ulang.",
            "Peringatan barang hampir habis sebelum rak benar-benar kosong.",
            "Rekap harian yang bisa dibaca dalam hitungan detik.",
            "Riwayat transaksi untuk menelusuri selisih uang.",
          ],
        },
        {
          type: "p",
          text: "Kalau ada aplikasi yang menawarkan kelima hal itu tanpa memaksa kamu mengisi data yang tidak perlu, itu sudah cukup untuk memulai.",
        },
      ],
    },
  ] as Artikel[],
} as const;

/* ------------------------------------------------------------ */
/*  FAQ                                                          */
/* ------------------------------------------------------------ */

export const faq: Faq[] = [
  {
    tanya: "Berapa lama waktu pengerjaannya?",
    jawab:
      "Untuk aplikasi siap pakai, penyerahan biasanya selesai dalam hitungan hari karena tinggal disiapkan dan dipasang. Kustomisasi ringan berkisar satu sampai dua minggu. Sedangkan custom dari nol sangat tergantung lingkup pekerjaan, dan perkiraannya disampaikan tertulis sebelum mulai.",
  },
  {
    tanya: "Apakah bisa minta revisi desain?",
    jawab:
      "Bisa. Batas jumlah revisi dan apa saja yang termasuk di dalamnya disepakati sebelum pekerjaan dimulai, supaya tidak ada kesalahpahaman di akhir. Untuk kustomisasi, penyesuaian warna dan logo sudah termasuk.",
  },
  {
    tanya: "Bagaimana sistem pembayarannya?",
    jawab:
      "Pembayaran dibagi dua tahap: sebagian sebagai tanda mulai, sisanya setelah hasilnya siap diserahkan dan kamu sudah mencobanya. Rincian persentase dan caranya dibicarakan langsung sebelum pekerjaan dimulai.",
  },
  {
    tanya: "Dapat garansi dan pemeliharaan?",
    jawab:
      "Ya. Ada masa garansi untuk perbaikan bug yang berasal dari hasil pengerjaan. Kerusakan akibat perubahan yang dilakukan sendiri di luar pendampingan tidak termasuk, tapi tetap bisa dibantu dengan kesepakatan terpisah.",
  },
  {
    tanya: "Bisa menambah fitur sendiri di kemudian hari?",
    jawab:
      "Bisa, dan kamu memang menerima kode sumbernya. Kalau nanti ingin menambah modul, pekerjaannya bisa dilanjutkan dari kode yang sama tanpa perlu membangun ulang dari awal.",
  },
  {
    tanya: "Bagaimana cara mulai memesannya?",
    jawab:
      "Kirimkan gambaran kebutuhanmu lewat WhatsApp atau isi formulir permintaan custom. Dari situ akan dihitung perkiraan waktu dan biaya, lalu kamu putuskan tanpa ada kewajiban apa pun.",
  },
];

/* ------------------------------------------------------------ */
/*  TESTIMONI                                                    */
/* ------------------------------------------------------------ */
/**
 * SENGAJA DIKOSONGKAN.
 *
 * Hanya isi bagian ini dengan ulasan asli dari pelanggan yang benar-benar
 * ada, dan sudah memberi izin namanya dicantumkan. Testimoni karangan
 * melanggar UU Perlindungan Konsumen Pasal 10 tentang iklan menyesatkan.
 *
 * Kalau array ini kosong, section testimoni tidak dirender sama sekali.
 */
export const testimoni: { nama: string; usaha: string; kutipan: string; rating: number }[] = [];

export const testimoniSection = {
  judul: "Kata Mereka",
  paragraf: "Ulasan dari pelanggan yang sudah memakai hasil kerjanya.",
} as const;

/* ------------------------------------------------------------ */
/*  KONTAK                                                       */
/* ------------------------------------------------------------ */

/** Nomor WhatsApp dalam format internasional tanpa tanda plus. */
export const whatsapp = {
  nomor: "6281913711189",
  tampil: "0819-1371-1189",
  pesanDefault: "Halo, saya mau tanya soal pembuatan website/aplikasi.",
  /**
   * [ISI] Verifikasi nomor ini benar milikmu sebelum dipakai jualan —
   * tombol WhatsApp di seluruh situs memakai nomor di atas.
   */
} as const;

export const kontak = {
  judul: "Punya ide proyek? Mari diskusikan.",
  paragraf:
    "Ceritakan kebutuhanmu, sekecil apa pun. Konsultasi gratis dan kamu akan dapat perkiraan waktu serta biaya yang jujur — tanpa paksaan untuk lanjut.",
  ctaUtama: { label: "Chat WhatsApp", href: `https://wa.me/6281913711189` },
  ctaKedua: { label: "Request Custom", href: "/request-custom" },
} as const;

export const kontakList: Kontak[] = [
  {
    label: "WhatsApp",
    nilai: "0819-1371-1189",
    url: "https://wa.me/6281913711189",
  },
  {
    label: "Email",
    nilai: "Belum diisi",
    url: "",
    pending: true,
  },
  {
    label: "Instagram",
    nilai: "Belum diisi",
    url: "",
    pending: true,
  },
  {
    label: "Threads",
    nilai: "Belum diisi",
    url: "",
    pending: true,
  },
  {
    label: "GitHub",
    nilai: "@heluvaa",
    url: "https://github.com/heluvaa",
  },
  {
    label: "Lokasi",
    nilai: "Indonesia",
    url: "",
    pending: true,
  },
];

/* ------------------------------------------------------------ */
/*  FORM REQUEST CUSTOM                                          */
/* ------------------------------------------------------------ */

export const formCustom = {
  judul: "Request Custom",
  paragraf:
    "Isi sebanyak yang kamu tahu. Setelah selesai, rinciannya akan tersusun otomatis dan dikirim lewat WhatsApp — kamu masih bisa mengubah sebelum mengirim.",
  jenisProyek: [
    "Website / company profile",
    "Aplikasi web",
    "Kustomisasi aplikasi yang sudah ada",
    "Sistem survei",
    "Solusi IoT",
    "Lainnya",
  ],
  anggaran: [
    "Di bawah Rp 500.000",
    "Rp 500.000 – Rp 2.000.000",
    "Rp 2.000.000 – Rp 5.000.000",
    "Di atas Rp 5.000.000",
    "Belum tahu, minta saran",
  ],
  tenggat: [
    "Secepatnya (kurang dari 2 minggu)",
    "1 bulan",
    "2 – 3 bulan",
    "Belum ada tenggat",
  ],
} as const;

/* ------------------------------------------------------------ */

export const footer = {
  tentang:
    "Membantu UMKM, sekolah, dan perorangan punya website, aplikasi web, dan solusi IoT yang modern dan siap dipakai.",
  catatan: "Dibangun dengan Next.js & Tailwind CSS. Static export, di-host di GitHub Pages.",
} as const;