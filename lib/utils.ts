import type { CSSProperties } from "react";

/**
 * Helper stagger untuk animasi scroll-reveal.
 * Dipakai sebagai: <div className="reveal" style={delay(120)} />
 */
export function delay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

/** Nomor WhatsApp → tautan wa.me dengan pesan yang sudah diisi. */
export function waLink(nomor: string, pesan: string): string {
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
}

/** "2026-10-08" → "8 Oktober 2026" */
export function tanggalIndo(iso: string): string {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${bulan[m - 1]} ${y}`;
}
