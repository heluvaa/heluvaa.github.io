"use client";

import { useMemo, useState } from "react";
import KartuAplikasi from "@/components/KartuAplikasi";
import Ikon from "@/components/Ikon";
import { katalog, type Aplikasi } from "@/lib/content";

type Kategori = Aplikasi["kategori"];

export default function KatalogExplorer() {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState<Kategori | "Semua">("Semua");

  const semuaKategori = useMemo(() => {
    const set = new Set<Kategori>(katalog.aplikasi.map((a) => a.kategori));
    return ["Semua", ...Array.from(set)] as (Kategori | "Semua")[];
  }, []);

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return katalog.aplikasi.filter((a) => {
      const cocokKategori = kategori === "Semua" || a.kategori === kategori;
      if (!cocokKategori) return false;
      if (!q) return true;
      const teks = [a.nama, a.tagline, a.ringkas, a.kategori, ...a.fitur, ...a.teknologi]
        .join(" ")
        .toLowerCase();
      return teks.includes(q);
    });
  }, [cari, kategori]);

  return (
    <div>
      {/* Kontrol */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Cari aplikasi</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <Ikon nama="cari" ukuran={17} />
          </span>
          <input
            type="search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari aplikasi, fitur, atau kata kunci…"
            className="field pl-11"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {semuaKategori.map((k) => {
            const aktif = kategori === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setKategori(k)}
                aria-pressed={aktif}
                className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                  aktif
                    ? "border-primary bg-primary text-white"
                    : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary-dark"
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hasil */}
      <p className="mt-6 font-mono text-[11.5px] text-muted">
        {hasil.length} dari {katalog.aplikasi.length} aplikasi
        {cari && ` · kata kunci "${cari}"`}
      </p>

      {hasil.length === 0 ? (
        <div className="card mt-6 p-10 text-center">
          <p className="text-[15px] font-bold text-ink">
            Tidak ada aplikasi yang cocok
          </p>
          <p className="mt-2 text-[14px] text-muted">
            Coba kata kunci lain, atau pilih kategori &ldquo;Semua&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setCari("");
              setKategori("Semua");
            }}
            className="btn btn-ghost mt-6"
          >
            Reset pencarian
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((app) => (
            <KartuAplikasi key={app.slug} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
