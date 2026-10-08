/**
 * ============================================================
 *  SATU-SATUNYA FILE KONTEN
 * ============================================================
 * Ubah teks, link, dan daftar di sini. Jangan sentuh komponen.
 * Setiap angka yang tampil di halaman dihitung dari data ini,
 * jadi tidak ada nilai yang bisa "basi".
 *
 * TANDA [ISI] = masih placeholder, wajib diganti sebelum publik.
 */

export type Project = {
  index: string;
  title: string;
  tagline: string;
  /** Dua kalimat deskripsi, persis seperti brief. */
  description: [string, string];
  /** Baris tech stack. GANTI kalau tidak sesuai stack aslinya. */
  stack: string[];
  url: string;
};

export type Skill = {
  name: string;
  group: "Frontend" | "Bahasa" | "Backend & Data";
  note: string;
};

export type ContactLink = {
  label: string;
  handle: string;
  url: string;
  /** true = belum ada URL asli; kartu dirender non-aktif, bukan link palsu. */
  pending?: boolean;
};

/* ------------------------------------------------------------ */

export const site = {
  name: "Gaizka Nazaryo Widiansyah",
  first: "Gaizka",
  initials: "GN",
  /** Sub-headline / positioning — sesuai brief, sengaja English. */
  role: "SMK TKJ graduate building AI products",
  /** Versi Bahasa Indonesia untuk meta description & section about. */
  roleId: "Lulusan SMK TKJ yang membangun produk AI",
  location: "Indonesia",
  availability: "Terbuka untuk peluang baru",
  lang: "id",

  /** Ganti dengan domain sendiri kalau nanti pakai custom domain. */
  url: "https://heluvaa.github.io",
  description:
    "Portfolio Gaizka Nazaryo Widiansyah — lulusan SMK TKJ yang membangun produk AI dan web app. Proyek: AI Mastery ID dan Anatomi App.",

  /** File CV: taruh di public/ lalu tulis ulang pathnya di sini. */
  cv: {
    path: "/cv-gaizka.pdf",
    label: "Download CV",
    /** Ganti angka ini saat CV-nya diperbarui. */
    updated: "Oktober 2026",
  },
} as const;

/* ------------------------------------------------------------ */

export const nav = [
  { label: "Tentang", href: "#tentang" },
  { label: "Proyek", href: "#proyek" },
  { label: "Skills", href: "#skills" },
  { label: "Kontak", href: "#kontak" },
] as const;

/* ------------------------------------------------------------ */

export const hero = {
  badge: "Portfolio 2026",
  headlineLead: "Membangun produk AI,",
  headlineAccent: "satu modul setiap hari.",
  /** Paragraf pendukung di bawah sub-headline. */
  paragraph:
    "Lulusan SMK Teknik Komputer & Jaringan yang bergerak dari dasar jaringan ke pengembangan produk digital. Sekarang fokus merancang dan merilis web app yang benar-benar dipakai orang — bukan sekadar latihan.",
  primaryCta: { label: "Lihat Proyek", href: "#proyek" },
  secondaryCta: { label: "Hubungi Saya", href: "#kontak" },
} as const;

/** Marquee di bawah hero — kata kunci, bukan klaim. */
export const marqueeWords = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "JavaScript",
  "Python",
  "Supabase",
  "AI Products",
  "Web App",
] as const;

/* ------------------------------------------------------------ */
/*  PROYEK — hanya dua, sesuai brief.                            */
/* ------------------------------------------------------------ */

export const projects: Project[] = [
  {
    index: "01",
    title: "AI Mastery ID",
    tagline: "Platform modul belajar AI",
    description: [
      "Platform modul belajar AI yang menyusun materi secara bertahap, dari konsep dasar sampai praktik.",
      "Dirancang supaya pemula bisa belajar mandiri tanpa bingung harus mulai dari mana.",
    ],
    // [ISI] sesuaikan dengan stack asli proyeknya
    stack: ["Next.js", "React", "Tailwind CSS"],
    url: "https://heluvaa.github.io/ai-mastery-id/",
  },
  {
    index: "02",
    title: "Anatomi App",
    tagline: "Aplikasi belajar anatomi",
    description: [
      "Aplikasi belajar anatomi yang menyajikan materi tubuh manusia dalam tampilan yang ringan dan mudah ditelusuri.",
      "Dibuat untuk latihan hafalan dan pengulangan, sehingga materi lebih cepat melekat.",
    ],
    // [ISI] sesuaikan dengan stack asli proyeknya
    stack: ["React", "Tailwind CSS", "JavaScript"],
    url: "https://heluvaa.github.io/anatomi-app/",
  },
];

/* ------------------------------------------------------------ */
/*  ABOUT — placeholder elegan, belum ada klaim spesifik.        */
/* ------------------------------------------------------------ */

export const about = {
  label: "Tentang",
  heading: "Dari kabel jaringan ke produk yang dipakai orang.",
  paragraphs: [
    "Perjalanan saya mulai dari bangku SMK Teknik Komputer & Jaringan: mengenal IP, routing, dan cara kerja sistem dari lapisan paling bawah. Dari sana ketertarikan bergeser ke lapisan yang lebih tinggi — bagaimana sebuah antarmuka dibangun, bagaimana data mengalir, dan bagaimana sebuah ide bisa menjadi produk yang benar-benar dibuka orang setiap hari.",
    "Sekarang saya menghabiskan sebagian besar waktu untuk belajar sambil membangun: merancang antarmuka, menulis kode, dan merilisnya ke internet. Setiap proyek yang saya buat berangkat dari masalah yang saya alami sendiri, lalu dibangun sampai bisa dipakai orang lain.",
  ],
  /**
   * [ISI] Slot cerita — ganti dua paragraf di atas dengan cerita aslimu.
   * Kerangka yang disarankan (tulis 2–4 kalimat per poin):
   */
  storySlot: [
    "Awal mula: kenapa masuk TKJ, dan momen apa yang membuat kamu pindah ke arah pemrograman.",
    "Titik balik: proyek pertama, kesulitan terbesar, dan cara kamu melewatinya.",
    "Yang sedang dikerjakan sekarang: skill apa yang sedang dipelajari, target terdekat.",
  ],
  /** Angka di bawah ini dihitung dari data, bukan diketik manual. */
  factsNote:
    "Angka pada kartu di bawah dihitung otomatis dari daftar proyek dan skill di file konten.",
} as const;

/* ------------------------------------------------------------ */

export const skills: Skill[] = [
  {
    name: "Next.js",
    group: "Frontend",
    note: "App Router, static export, routing halaman",
  },
  {
    name: "React",
    group: "Frontend",
    note: "Komponen, state, hooks",
  },
  {
    name: "Tailwind CSS",
    group: "Frontend",
    note: "Design token, layout responsif, dark mode",
  },
  {
    name: "JavaScript",
    group: "Bahasa",
    note: "DOM, async, manipulasi data",
  },
  {
    name: "Python",
    group: "Bahasa",
    note: "Scripting, otomasi, dasar data",
  },
  {
    name: "Supabase",
    group: "Backend & Data",
    note: "Auth, database Postgres, API instan",
  },
];

/* ------------------------------------------------------------ */
/*  KONTAK                                                       */
/* ------------------------------------------------------------ */

export const contacts: ContactLink[] = [
  {
    label: "GitHub",
    handle: "@heluvaa",
    url: "https://github.com/heluvaa",
  },
  {
    label: "LinkedIn",
    handle: "[ISI] belum diisi",
    // [ISI] ganti dengan URL profil LinkedIn yang benar
    url: "",
    pending: true,
  },
  {
    label: "WhatsApp",
    handle: "0819-1371-1189",
    url: "https://wa.me/6281913711189",
  },
  {
    label: "Email",
    handle: "gaizkanazaryo@gmail.com",
    url: "mailto:gaizkanazaryo@gmail.com",
  },
];

export const contact = {
  label: "Kontak",
  heading: "Punya proyek, atau cuma mau ngobrol soal AI?",
  paragraph:
    "Saya terbuka untuk kolaborasi, kerja sama proyek, maupun pertanyaan seputar web development dan AI. Balasan paling cepat lewat WhatsApp atau email.",
} as const;

/* ------------------------------------------------------------ */

export const footer = {
  note: "Dibangun dengan Next.js & Tailwind CSS. Static export, di-host di GitHub Pages.",
  /** Set false kalau kamu sudah menghapus semua placeholder [ISI]. */
  demo: true,
} as const;
