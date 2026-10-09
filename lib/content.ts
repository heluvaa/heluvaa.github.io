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
  /**
   * Set true kalau masih ada data yang belum nyata dan kamu mau
   * peringatannya tampil di footer.
   */
  demo: false,
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
/*  KATALOG — empat aplikasi yang demonya benar-benar bisa dibuka */
/* ------------------------------------------------------------ */

export type Demo = {
  slug: string;
  nama: string;
  tagline: string;
  kategori: string;
  /** Dua kalimat, ditampilkan berurutan. */
  deskripsi: [string, string];
  /** Fitur utama yang tampil di kartu katalog. */
  fitur: string[];
  /** Harga jual app siap pakai. Ubah di sini saja. */
  hargaMulai: string;
  /** Halaman demo hidup. */
  demoUrl: string;
  /**
   * Thumbnail di public/. Biarkan kosong kalau gambarnya belum siap —
   * kartu otomatis memakai pratinjau yang dirender dari `mockup`.
   */
  thumbnail: string;
  /** Pratinjau cadangan yang dirender jadi UI, bukan gambar. */
  mockup: Mockup;
  /** Pesan WhatsApp yang terisi otomatis saat tombol order ditekan. */
  pesanOrder: string;
};

export const katalog = {
  judul: "Empat aplikasi, semuanya bisa dicoba dulu",
  paragraf:
    "Klik demonya dan pakai sendiri sebelum memutuskan. Semua tombol berfungsi, dan data yang kamu ubah tersimpan di browser ini.",
  demo: [
    {
      slug: "menu-qr",
      nama: "Menu Digital QR",
      tagline: "Pesanan dari meja langsung masuk ke dapur",
      kategori: "Kuliner & F&B",
      deskripsi: [
        "Pelanggan memindai QR di meja, memilih menu, lalu mengirim pesanannya sendiri tanpa menunggu dilayani.",
        "Pesanan muncul di papan dapur lengkap dengan nomor meja dan catatan, lalu statusnya digeser sampai selesai.",
      ],
      fitur: [
        "QR per meja, dibuka lewat browser tanpa instal",
        "Kategori menu, varian, dan penanda menu habis",
        "Papan pesanan dapur dengan alur status",
        "Kelola menu dan harga sendiri, langsung berlaku",
        "Rekap pesanan harian dan total penjualan",
      ],
      hargaMulai: "Rp350.000",
      demoUrl: "/demo/menu-qr",
      thumbnail: "",
      mockup: {
        judul: "Meja 4 — Kedai Sari Rasa",
        baris: [
          { label: "Nasi Goreng Spesial", nilai: "Rp 18.000" },
          { label: "Ayam Geprek Sambal Ijo", nilai: "Rp 20.000" },
          { label: "Es Teh Manis", nilai: "Rp 5.000" },
          { label: "Es Jeruk Peras", nilai: "Rp 8.000" },
        ],
      },
      pesanOrder:
        "Halo, saya mau order aplikasi Menu Digital QR. Boleh dijelaskan paket dan prosesnya?",
    },
    {
      slug: "booking-jasa",
      nama: "Booking & Reservasi",
      tagline: "Pelanggan pilih jadwalnya sendiri",
      kategori: "Usaha Jasa",
      deskripsi: [
        "Halaman booking yang bisa ditempel di bio Instagram atau dibagikan lewat WhatsApp, lengkap dengan slot jam yang tidak bisa bentrok.",
        "Pemilik melihat jadwal tiap staf per hari, mengonfirmasi kedatangan, dan membaca laporan pendapatan per staf dan per layanan.",
      ],
      fitur: [
        "Slot jam otomatis menyesuaikan durasi layanan",
        "Pilih staf, tanggal, dan jam tanpa bentrok jadwal",
        "Catatan khusus per pelanggan",
        "Kelola antrian: konfirmasi, selesai, atau batalkan",
        "Laporan pendapatan per staf dan layanan terlaris",
      ],
      hargaMulai: "Rp450.000",
      demoUrl: "/demo/booking-jasa",
      thumbnail: "",
      mockup: {
        judul: "Jadwal hari ini — Cukur & Co",
        baris: [
          { label: "Rizky · Cukur Rambut Dewasa", nilai: "10:00" },
          { label: "Dimas · Cukur + Cuci Blow", nilai: "10:30" },
          { label: "Sari · Cukur + Creambath", nilai: "13:00" },
          { label: "Rizky · Cukur Rambut Dewasa", nilai: "15:30" },
        ],
      },
      pesanOrder:
        "Halo, saya mau order aplikasi Booking & Reservasi untuk usaha jasa saya. Boleh dijelaskan paket dan prosesnya?",
    },
    {
      slug: "toko-online",
      nama: "Toko Online + Checkout WhatsApp",
      tagline: "Katalog produk yang ordernya masuk ke WhatsApp",
      kategori: "Penjualan",
      deskripsi: [
        "Katalog produk dengan varian, stok, dan keranjang yang menghitung ongkir serta minimum pesanan secara otomatis.",
        "Begitu pelanggan menekan pesan, WhatsApp terbuka dengan rincian lengkap. Pemilik tinggal membalas dan mengonfirmasi.",
      ],
      fitur: [
        "Katalog produk dengan varian dan harga berbeda",
        "Keranjang, minimum pesanan, dan gratis ongkir",
        "Checkout langsung ke WhatsApp dengan rincian terisi",
        "Kelola produk, harga, dan stok sendiri",
        "Daftar pesanan dengan status sampai selesai",
      ],
      hargaMulai: "Rp400.000",
      demoUrl: "/demo/toko-online",
      thumbnail: "",
      mockup: {
        judul: "Dapur Bu Nia",
        baris: [
          { label: "Risoles Mayo (Isi 20)", nilai: "Rp 85.000" },
          { label: "Dimsum Ayam (Isi 25)", nilai: "Rp 65.000" },
          { label: "Brownies Kukus", nilai: "Rp 60.000" },
          { label: "Ayam Ungkep 1 kg", nilai: "Rp 70.000" },
        ],
      },
      pesanOrder:
        "Halo, saya mau order aplikasi Toko Online untuk usaha saya. Boleh dijelaskan paket dan prosesnya?",
    },
    {
      slug: "admin-sekolah",
      nama: "Administrasi Sekolah",
      tagline: "Absensi, nilai, dan SPP dalam satu tempat",
      kategori: "Pendidikan",
      deskripsi: [
        "Absensi harian per kelas, input nilai yang langsung menghitung rata-rata dan predikat, sampai rapor yang siap dicetak.",
        "Tagihan SPP tiap bulan tercatat rapi dengan rekap tunggakan, jadi menagih wali murid tidak lagi mencari di buku.",
      ],
      fitur: [
        "Absensi harian per kelas dan rekap kehadiran",
        "Input nilai, rata-rata, dan predikat otomatis",
        "Rapor lengkap dengan peringkat kelas",
        "Tagihan SPP bulanan dan rekap tunggakan",
        "Ringkasan untuk kepala sekolah dalam satu layar",
      ],
      hargaMulai: "Rp1.250.000",
      demoUrl: "/demo/admin-sekolah",
      thumbnail: "",
      mockup: {
        judul: "VII-A — hari ini",
        baris: [
          { label: "Hadir", nilai: "32 siswa" },
          { label: "Sakit", nilai: "2 siswa" },
          { label: "Izin", nilai: "1 siswa" },
          { label: "Alpa", nilai: "1 siswa" },
        ],
      },
      pesanOrder:
        "Halo, saya mau order aplikasi Administrasi Sekolah untuk sekolah/madrasah kami. Boleh dijelaskan paket dan prosesnya?",
    },
  ] as Demo[],
} as const;

/* ------------------------------------------------------------ */
/*  PORTOFOLIO — diambil dari demo yang benar-benar berjalan      */
/* ------------------------------------------------------------ */

export const portofolio = {
  judul: "Portofolio",
  paragraf:
    "Empat aplikasi di bawah ini bukan gambar mockup. Semuanya bisa kamu buka dan pakai sekarang.",
  karya: [
    {
      judul: "Menu Digital QR untuk Kedai Sari Rasa",
      kategori: "Kuliner",
      tahun: "2026",
      ringkas:
        "Pesan dari meja lewat QR, papan pesanan dapur, dan panel kelola menu dalam satu aplikasi.",
      tags: ["Menu QR", "Papan pesanan"],
      url: "/demo/menu-qr",
      demo: false,
    },
    {
      judul: "Booking & Reservasi Cukur & Co",
      kategori: "Usaha Jasa",
      tahun: "2026",
      ringkas:
        "Pelanggan memilih jadwal sendiri, pemilik mengelola antrian empat staf dan membaca laporan pendapatan.",
      tags: ["Booking", "Antrian"],
      url: "/demo/booking-jasa",
      demo: false,
    },
    {
      judul: "Toko Online Dapur Bu Nia",
      kategori: "Penjualan",
      tahun: "2026",
      ringkas:
        "Katalog bervarian, keranjang dengan hitungan ongkir, dan checkout yang mengirim rincian ke WhatsApp.",
      tags: ["Katalog", "Checkout WhatsApp"],
      url: "/demo/toko-online",
      demo: false,
    },
    {
      judul: "Administrasi MTs Nurul Hikmah",
      kategori: "Pendidikan",
      tahun: "2026",
      ringkas:
        "Absensi per kelas, nilai dengan predikat otomatis, rapor berperingkat, dan tagihan SPP bulanan.",
      tags: ["Absensi", "Rapor", "SPP"],
      url: "/demo/admin-sekolah",
      demo: false,
    },
  ] as Karya[],
} as const;

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