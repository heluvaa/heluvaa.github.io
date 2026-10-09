/** "125000" → "Rp125.000" */
export function rupiah(n: number): string {
  return "Rp" + Math.round(n).toLocaleString("id-ID");
}

/** "1250000" → "Rp1,25 jt" — untuk ringkasan yang sempit */
export function rupiahRingkas(n: number): string {
  if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(2).replace(".", ",")} jt`;
  if (n >= 1_000) return `Rp${Math.round(n / 1000)}rb`;
  return rupiah(n);
}

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** "2026-10-09" → "9 Oktober 2026" */
export function tanggalIndo(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${BULAN[m - 1]} ${y}`;
}

/** "2026-10-09" → "Kamis, 9 Okt" */
export function tanggalSingkat(iso: string): string {
  const dt = new Date(iso + "T00:00:00");
  if (Number.isNaN(dt.getTime())) return iso;
  return `${HARI[dt.getDay()]}, ${dt.getDate()} ${BULAN[dt.getMonth()].slice(0, 3)}`;
}

/** Date → "2026-10-09" waktu lokal */
export function isoDari(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Jam "14:30" → menit sejak tengah malam */
export function jamKeMenit(jam: string): number {
  const [h, m] = jam.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function menitKeJam(menit: number): string {
  const h = Math.floor(menit / 60);
  const m = menit % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Kode acak pendek, mis. "PSN-4F2A" */
export function kode(prefix: string): string {
  const s = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${s}`;
}

/** Nomor WhatsApp → tautan wa.me dengan pesan terisi */
export function waLink(nomor: string, pesan: string): string {
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
}

export function inisial(nama: string): string {
  return nama
    .split(" ")
    .filter((k) => k.length > 2)
    .slice(0, 2)
    .map((k) => k[0])
    .join("")
    .toUpperCase();
}
