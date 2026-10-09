/**
 * Data awal untuk demo.
 *
 * Aturan isi file ini:
 * - Namanya masuk akal untuk usaha Indonesia (warung, barbershop, katering
 *   rumahan, madrasah). Tidak ada nama perusahaan nyata.
 * - Tidak ada lorem ipsum, tidak ada label "contoh".
 * - Nilai yang berulang (nilai rapor, status tagihan) dibangkitkan dengan
 *   fungsi deterministik, bukan ditulis satu per satu — hasilnya tetap
 *   sama setiap kali dijalankan, jadi tidak ada beda render server/klien.
 */

import { isoDari } from "@/lib/demo/format";

/* ============================================================
   DEMO 1 — KEDAI SARI RASA (menu QR + papan pesanan)
   ============================================================ */

export type MenuItem = {
  id: string;
  nama: string;
  kategori: "Makanan" | "Minuman" | "Camilan";
  harga: number;
  tersedia: boolean;
  ket: string;
};

export const WARUNG = {
  nama: "Kedai Sari Rasa",
  alamat: "Jl. Raya Cibubur No. 42",
  jam: "10.00 – 22.00",
  totalMeja: 12,
};

export const MENU_AWAL: MenuItem[] = [
  { id: "m1", nama: "Nasi Goreng Spesial", kategori: "Makanan", harga: 18000, tersedia: true, ket: "Telur, ayam, kerupuk" },
  { id: "m2", nama: "Ayam Geprek Sambal Ijo", kategori: "Makanan", harga: 20000, tersedia: true, ket: "Level 1–5" },
  { id: "m3", nama: "Mie Goreng Jawa", kategori: "Makanan", harga: 17000, tersedia: true, ket: "Bawang goreng, telur" },
  { id: "m4", nama: "Sate Ayam 10 Tusuk", kategori: "Makanan", harga: 25000, tersedia: true, ket: "Bumbu kacang" },
  { id: "m5", nama: "Nasi Rames Komplit", kategori: "Makanan", harga: 15000, tersedia: true, ket: "Sayur, tempe, telur" },
  { id: "m6", nama: "Soto Ayam Lamongan", kategori: "Makanan", harga: 16000, tersedia: false, ket: "Kuah bening, koya" },
  { id: "m7", nama: "Es Teh Manis", kategori: "Minuman", harga: 5000, tersedia: true, ket: "Gelas 400 ml" },
  { id: "m8", nama: "Es Jeruk Peras", kategori: "Minuman", harga: 8000, tersedia: true, ket: "Jeruk peras asli" },
  { id: "m9", nama: "Kopi Tubruk", kategori: "Minuman", harga: 7000, tersedia: true, ket: "Robusta lokal" },
  { id: "m10", nama: "Es Kelapa Muda", kategori: "Minuman", harga: 10000, tersedia: true, ket: "Kelapa asli" },
  { id: "m11", nama: "Teh Tarik", kategori: "Minuman", harga: 9000, tersedia: true, ket: "Panas atau dingin" },
  { id: "m12", nama: "Tahu Crispy", kategori: "Camilan", harga: 8000, tersedia: true, ket: "6 potong" },
  { id: "m13", nama: "Pisang Goreng", kategori: "Camilan", harga: 10000, tersedia: true, ket: "5 potong, topping keju" },
  { id: "m14", nama: "Kacang Kulit", kategori: "Camilan", harga: 6000, tersedia: false, ket: "Porsi kecil" },
];

export type ItemPesanan = { nama: string; harga: number; qty: number };
export type StatusPesanan = "Baru" | "Diproses" | "Siap" | "Selesai";

export type Pesanan = {
  id: string;
  meja: number;
  item: ItemPesanan[];
  total: number;
  status: StatusPesanan;
  waktu: string;
  catatan: string;
};

const pesan = (
  id: string,
  meja: number,
  item: ItemPesanan[],
  status: StatusPesanan,
  waktu: string,
  catatan = "",
): Pesanan => ({
  id,
  meja,
  item,
  total: item.reduce((s, i) => s + i.harga * i.qty, 0),
  status,
  waktu,
  catatan,
});

export function seedPesanan(): Pesanan[] {
  return [
    pesan("PSN-1041", 4, [{ nama: "Ayam Geprek Sambal Ijo", harga: 20000, qty: 2 }, { nama: "Es Teh Manis", harga: 5000, qty: 2 }], "Baru", "12:18", "Gepreknya level 3"),
    pesan("PSN-1040", 9, [{ nama: "Nasi Goreng Spesial", harga: 18000, qty: 1 }, { nama: "Kopi Tubruk", harga: 7000, qty: 1 }], "Diproses", "12:11", ""),
    pesan("PSN-1039", 2, [{ nama: "Sate Ayam 10 Tusuk", harga: 25000, qty: 2 }, { nama: "Es Jeruk Peras", harga: 8000, qty: 2 }], "Siap", "12:04", "Tanpa lontong"),
  ];
}

/* ============================================================
   DEMO 2 — CUKUR & CO (booking jasa)
   ============================================================ */

export const BISNIS_JASA = {
  nama: "Cukur & Co",
  jenis: "Barbershop & Salon",
  alamat: "Jl. Melati Raya No. 8",
  buka: 9,
  tutup: 21,
  jedaSlot: 30,
};

export type Layanan = { id: string; nama: string; durasi: number; harga: number };

export const LAYANAN: Layanan[] = [
  { id: "l1", nama: "Cukur Rambut Dewasa", durasi: 30, harga: 35000 },
  { id: "l2", nama: "Cukur Rambut Anak", durasi: 25, harga: 30000 },
  { id: "l3", nama: "Cukur + Cuci Blow", durasi: 45, harga: 45000 },
  { id: "l4", nama: "Cukur + Creambath", durasi: 60, harga: 75000 },
  { id: "l5", nama: "Cukur KUMIS & Jenggot", durasi: 20, harga: 25000 },
  { id: "l6", nama: "Pewarnaan Rambut", durasi: 90, harga: 150000 },
  { id: "l7", nama: "Hair Tonic Treatment", durasi: 40, harga: 60000 },
];

export type Staf = { id: string; nama: string; peran: string };

export const STAF: Staf[] = [
  { id: "s1", nama: "Rizky Pratama", peran: "Barber senior" },
  { id: "s2", nama: "Dimas Saputra", peran: "Barber" },
  { id: "s3", nama: "Bayu Nugroho", peran: "Barber" },
  { id: "s4", nama: "Sari Wulandari", peran: "Hair stylist" },
];

export type StatusBooking = "Menunggu" | "Terkonfirmasi" | "Selesai" | "Batal";

export type Booking = {
  id: string;
  tanggal: string;
  jam: string;
  layananId: string;
  stafId: string;
  nama: string;
  wa: string;
  status: StatusBooking;
  catatan: string;
};

export function seedBooking(hariIni: string): Booking[] {
  const besok = (() => {
    const d = new Date(hariIni + "T00:00:00");
    d.setDate(d.getDate() + 1);
    return isoDari(d);
  })();

  return [
    { id: "BK-2291", tanggal: hariIni, jam: "10:00", layananId: "l1", stafId: "s1", nama: "Andra Wijaya", wa: "0812-1111-2201", status: "Selesai", catatan: "" },
    { id: "BK-2292", tanggal: hariIni, jam: "10:30", layananId: "l3", stafId: "s2", nama: "Fajar Ramadhan", wa: "0813-2211-3302", status: "Selesai", catatan: "" },
    { id: "BK-2293", tanggal: hariIni, jam: "13:00", layananId: "l4", stafId: "s4", nama: "Nadia Puspita", wa: "0857-9988-1122", status: "Terkonfirmasi", catatan: "Minta creambath tanpa pewangi" },
    { id: "BK-2294", tanggal: hariIni, jam: "15:30", layananId: "l1", stafId: "s1", nama: "Rendi Kurniawan", wa: "0819-4455-6677", status: "Terkonfirmasi", catatan: "" },
    { id: "BK-2295", tanggal: hariIni, jam: "17:00", layananId: "l2", stafId: "s3", nama: "Bagas Aditya", wa: "0878-1234-9090", status: "Menunggu", catatan: "Anak umur 6 tahun" },
    { id: "BK-2296", tanggal: besok, jam: "09:30", layananId: "l6", stafId: "s4", nama: "Melati Anggraini", wa: "0812-7788-3344", status: "Terkonfirmasi", catatan: "Warna coklat muda" },
    { id: "BK-2297", tanggal: besok, jam: "11:00", layananId: "l5", stafId: "s2", nama: "Yoga Prasetyo", wa: "0856-3322-1100", status: "Menunggu", catatan: "" },
  ];
}

/* ============================================================
   DEMO 3 — DAPUR BU NIA (toko online + checkout WhatsApp)
   ============================================================ */

export const TOKO = {
  nama: "Dapur Bu Nia",
  jenis: "Katering rumahan & frozen food",
  wa: "0819-1371-1189",
  ongkirDalamKota: 12000,
  gratisOngkirMulai: 150000,
  minimumOrder: 50000,
};

export type Varian = { nama: string; harga: number };

export type Produk = {
  id: string;
  nama: string;
  kategori: "Frozen Food" | "Kue & Roti" | "Lauk Matang";
  harga: number;
  varian: Varian[];
  stok: number;
  aktif: boolean;
  deskripsi: string;
};

export const PRODUK_AWAL: Produk[] = [
  { id: "p1", nama: "Risoles Mayo", kategori: "Frozen Food", harga: 45000, varian: [{ nama: "Isi 10", harga: 45000 }, { nama: "Isi 20", harga: 85000 }], stok: 38, aktif: true, deskripsi: "Isi smoked beef, telur, dan saus mayo. Digoreng sendiri di rumah." },
  { id: "p2", nama: "Pastel Mini", kategori: "Frozen Food", harga: 50000, varian: [{ nama: "Isi 20", harga: 50000 }, { nama: "Isi 40", harga: 95000 }], stok: 24, aktif: true, deskripsi: "Kulit tipis, isi bihun dan wortel. Cukup digoreng 4 menit." },
  { id: "p3", nama: "Dimsum Ayam", kategori: "Frozen Food", harga: 65000, varian: [{ nama: "Isi 25", harga: 65000 }, { nama: "Isi 50", harga: 125000 }], stok: 15, aktif: true, deskripsi: "Ayam paha fillet, tanpa pengawet. Kukus 12 menit." },
  { id: "p4", nama: "Pangsit Goreng", kategori: "Frozen Food", harga: 55000, varian: [{ nama: "Isi 25", harga: 55000 }], stok: 20, aktif: true, deskripsi: "Renyah tahan lama, cocok untuk lauk sarapan." },
  { id: "p5", nama: "Bolu Pandan", kategori: "Kue & Roti", harga: 55000, varian: [{ nama: "Loyang 20 cm", harga: 55000 }], stok: 9, aktif: true, deskripsi: "Pandan asli, tanpa pewarna. Dibuat sesuai pesanan." },
  { id: "p6", nama: "Brownies Kukus", kategori: "Kue & Roti", harga: 60000, varian: [{ nama: "Loyang 20 cm", harga: 60000 }, { nama: "Loyang 22 cm", harga: 75000 }], stok: 7, aktif: true, deskripsi: "Cokelat compound, tekstur lembut. Tahan 3 hari di kulkas." },
  { id: "p7", nama: "Lapis Legit Mini", kategori: "Kue & Roti", harga: 95000, varian: [{ nama: "Loyang 18 cm", harga: 95000 }], stok: 4, aktif: true, deskripsi: "Dipanggang lapis per lapis. Perlu pesan 2 hari sebelumnya." },
  { id: "p8", nama: "Ayam Ungkep Bumbu Kuning", kategori: "Lauk Matang", harga: 70000, varian: [{ nama: "1 kg", harga: 70000 }, { nama: "500 gram", harga: 38000 }], stok: 12, aktif: true, deskripsi: "Siap goreng atau bakar. Bumbu meresap sampai dalam." },
  { id: "p9", nama: "Rendang Daging Sapi", kategori: "Lauk Matang", harga: 120000, varian: [{ nama: "500 gram", harga: 120000 }], stok: 0, aktif: true, deskripsi: "Dimasak 6 jam. Tahan 5 hari di kulkas." },
  { id: "p10", nama: "Sambal Goreng Kentang", kategori: "Lauk Matang", harga: 42000, varian: [{ nama: "500 gram", harga: 42000 }], stok: 18, aktif: false, deskripsi: "Dengan hati ayam. Sedang tidak diproduksi." },
];

export type StatusToko = "Baru" | "Diproses" | "Dikirim" | "Selesai";

export type PesananToko = {
  id: string;
  nama: string;
  wa: string;
  alamat: string;
  item: ItemPesanan[];
  subtotal: number;
  ongkir: number;
  total: number;
  status: StatusToko;
  waktu: string;
  catatan: string;
};

export function seedPesananToko(): PesananToko[] {
  const buat = (
    id: string,
    nama: string,
    wa: string,
    alamat: string,
    item: ItemPesanan[],
    status: StatusToko,
    waktu: string,
    catatan: string,
  ): PesananToko => {
    const subtotal = item.reduce((s, i) => s + i.harga * i.qty, 0);
    const ongkir = subtotal >= TOKO.gratisOngkirMulai ? 0 : TOKO.ongkirDalamKota;
    return { id, nama, wa, alamat, item, subtotal, ongkir, total: subtotal + ongkir, status, waktu, catatan };
  };

  return [
    buat("PSN-3182", "Ibu Ratna", "0812-3344-5566", "Perum Griya Asri Blok C2 No. 14", [{ nama: "Risoles Mayo (Isi 20)", harga: 85000, qty: 1 }, { nama: "Dimsum Ayam (Isi 25)", harga: 65000, qty: 1 }], "Baru", "09:12", "Tolong dibungkus terpisah"),
    buat("PSN-3181", "Pak Hendra", "0813-7788-9900", "Jl. Kenanga No. 27", [{ nama: "Brownies Kukus (Loyang 20 cm)", harga: 60000, qty: 2 }], "Diproses", "08:40", "Untuk hadiah, minta pita"),
    buat("PSN-3180", "Mbak Sinta", "0857-1122-3344", "Jl. Anggrek Raya No. 5", [{ nama: "Ayam Ungkep Bumbu Kuning (1 kg)", harga: 70000, qty: 1 }, { nama: "Pastel Mini (Isi 20)", harga: 50000, qty: 1 }], "Dikirim", "07:55", ""),
  ];
}

/* ============================================================
   DEMO 4 — MTs NURUL HIKMAH (administrasi sekolah)
   ============================================================ */

export const MADRASAH = {
  nama: "MTs Nurul Hikmah",
  npsn: "20251987",
  alamat: "Jl. Pesantren No. 15",
  tahunAjaran: "2026/2027",
  sppBulanan: 150000,
};

export const KELAS = ["VII-A", "VII-B", "VIII-A"] as const;
export type NamaKelas = (typeof KELAS)[number];

export const MAPEL = [
  "Matematika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "IPA Terpadu",
  "Al-Qur'an Hadis",
  "Fikih",
] as const;

export type Siswa = {
  id: string;
  nis: string;
  nama: string;
  kelas: NamaKelas;
  waWali: string;
};

const daftarSiswa: [string, NamaKelas][] = [
  ["Ahmad Fauzan Hakim", "VII-A"],
  ["Aisyah Nur Fadilah", "VII-A"],
  ["Bagas Setiawan", "VII-A"],
  ["Citra Ayu Lestari", "VII-A"],
  ["Dimas Ardiansyah", "VII-A"],
  ["Elsa Rahmawati", "VII-A"],
  ["Farhan Maulana", "VII-A"],
  ["Gita Pertiwi", "VII-A"],
  ["Hafiz Abdullah", "VII-B"],
  ["Indah Permata Sari", "VII-B"],
  ["Joko Susilo", "VII-B"],
  ["Kartika Dewi", "VII-B"],
  ["Lukman Nur Hakim", "VII-B"],
  ["Maya Anggraini", "VII-B"],
  ["Naufal Rizky", "VII-B"],
  ["Oktavia Ramadhani", "VII-B"],
  ["Putra Wijaya", "VIII-A"],
  ["Qonita Zahra", "VIII-A"],
  ["Rizal Fadillah", "VIII-A"],
  ["Siti Aminah", "VIII-A"],
  ["Taufik Hidayat", "VIII-A"],
  ["Umi Kalsum", "VIII-A"],
  ["Vino Pratama", "VIII-A"],
  ["Wulan Sari", "VIII-A"],
];

export const SISWA: Siswa[] = daftarSiswa.map(([nama, kelas], i) => ({
  id: `sw${String(i + 1).padStart(2, "0")}`,
  nis: `2026${String(i + 1).padStart(3, "0")}`,
  nama,
  kelas,
  waWali: `08${(11 + (i % 8))}-${String(3000 + i * 7).slice(0, 4)}-${String(1000 + i * 13).slice(0, 4)}`,
}));

export type StatusAbsen = "Hadir" | "Sakit" | "Izin" | "Alpa";
export type Absensi = { siswaId: string; tanggal: string; status: StatusAbsen };

/** Angka deterministik 0..n-1 dari sebuah teks — supaya data sama tiap render. */
function acak(teks: string, n: number): number {
  let h = 0;
  for (let i = 0; i < teks.length; i++) h = (h * 31 + teks.charCodeAt(i)) % 100000;
  return h % n;
}

export function seedAbsensi(tanggal: string): Absensi[] {
  return SISWA.map((s) => {
    const r = acak(s.id + tanggal, 100);
    const status: StatusAbsen = r < 88 ? "Hadir" : r < 92 ? "Sakit" : r < 96 ? "Izin" : "Alpa";
    return { siswaId: s.id, tanggal, status };
  });
}

export type NilaiSiswa = { siswaId: string; mapel: string; nilai: number };

export function seedNilai(): NilaiSiswa[] {
  const hasil: NilaiSiswa[] = [];
  for (const s of SISWA) {
    for (const m of MAPEL) {
      hasil.push({ siswaId: s.id, mapel: m, nilai: 74 + acak(s.id + m, 22) });
    }
  }
  return hasil;
}

export type StatusBayar = "Lunas" | "Belum bayar";
export type Tagihan = { siswaId: string; bulan: string; jumlah: number; status: StatusBayar };

/** Bulan dalam format "2026-10" untuk n bulan terakhir. */
export function bulanTerakhir(n: number, dari = new Date()): string[] {
  const hasil: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(dari.getFullYear(), dari.getMonth() - i, 1);
    hasil.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return hasil;
}

export function seedTagihan(bulan: string[]): Tagihan[] {
  const hasil: Tagihan[] = [];
  for (const s of SISWA) {
    bulan.forEach((b, idx) => {
      const sudah = acak(s.id + b, 100) < (idx === bulan.length - 1 ? 62 : 94);
      hasil.push({
        siswaId: s.id,
        bulan: b,
        jumlah: MADRASAH.sppBulanan,
        status: sudah ? "Lunas" : "Belum bayar",
      });
    });
  }
  return hasil;
}

export const NAMA_BULAN: Record<string, string> = {
  "01": "Januari", "02": "Februari", "03": "Maret", "04": "April",
  "05": "Mei", "06": "Juni", "07": "Juli", "08": "Agustus",
  "09": "September", "10": "Oktober", "11": "November", "12": "Desember",
};

export function labelBulan(ym: string): string {
  const [y, m] = ym.split("-");
  return `${NAMA_BULAN[m] ?? m} ${y}`;
}
