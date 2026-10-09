"use client";

import { useMemo, useState } from "react";
import Ikon from "@/components/Ikon";
import { formCustom, whatsapp } from "@/lib/content";
import { waLink } from "@/lib/utils";

type Isian = {
  nama: string;
  kontak: string;
  jenis: string;
  anggaran: string;
  tenggat: string;
  deskripsi: string;
};

const AWAL: Isian = {
  nama: "",
  kontak: "",
  jenis: formCustom.jenisProyek[0],
  anggaran: formCustom.anggaran[0],
  tenggat: formCustom.tenggat[0],
  deskripsi: "",
};

/**
 * Tidak ada backend. Formulir menyusun ringkasan permintaan lalu
 * membuka WhatsApp dengan isi yang sudah terisi otomatis —
 * pengguna masih bisa mengubahnya sebelum menekan kirim.
 */
export default function FormCustom() {
  const [isian, setIsian] = useState<Isian>(AWAL);
  const [error, setError] = useState<Partial<Record<keyof Isian, string>>>({});
  const [tersusun, setTersusun] = useState(false);

  const ubah = (key: keyof Isian, value: string) => {
    setIsian((prev) => ({ ...prev, [key]: value }));
    setError((prev) => ({ ...prev, [key]: undefined }));
  };

  const pesan = useMemo(() => {
    return [
      "Halo, saya mau request custom.",
      "",
      `Nama: ${isian.nama || "(belum diisi)"}`,
      `Kontak: ${isian.kontak || "(belum diisi)"}`,
      `Jenis proyek: ${isian.jenis}`,
      `Perkiraan anggaran: ${isian.anggaran}`,
      `Target waktu: ${isian.tenggat}`,
      "",
      "Kebutuhan:",
      isian.deskripsi || "(belum diisi)",
    ].join("\n");
  }, [isian]);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Partial<Record<keyof Isian, string>> = {};
    if (isian.nama.trim().length < 2) err.nama = "Nama wajib diisi.";
    if (isian.kontak.trim().length < 5)
      err.kontak = "Isi WhatsApp atau email yang bisa dihubungi.";
    if (isian.deskripsi.trim().length < 15)
      err.deskripsi = "Ceritakan kebutuhannya minimal satu kalimat penuh.";

    if (Object.keys(err).length > 0) {
      setError(err);
      setTersusun(false);
      const pertama = Object.keys(err)[0];
      document.getElementById(pertama)?.focus();
      return;
    }

    setError({});
    setTersusun(true);
    window.open(waLink(whatsapp.nomor, pesan), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={kirim} noValidate className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Kolom isian */}
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="nama" className="field-label">
              Nama <span className="text-primary">*</span>
            </label>
            <input
              id="nama"
              name="nama"
              className="field"
              value={isian.nama}
              onChange={(e) => ubah("nama", e.target.value)}
              placeholder="Nama kamu atau nama usaha"
              aria-invalid={Boolean(error.nama)}
              aria-describedby={error.nama ? "err-nama" : undefined}
            />
            {error.nama && (
              <p id="err-nama" className="mt-1.5 text-[12.5px] font-semibold text-[#b91c1c]">
                {error.nama}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="kontak" className="field-label">
              WhatsApp / Email <span className="text-primary">*</span>
            </label>
            <input
              id="kontak"
              name="kontak"
              className="field"
              value={isian.kontak}
              onChange={(e) => ubah("kontak", e.target.value)}
              placeholder="0812xxxxxxx atau nama@email.com"
              aria-invalid={Boolean(error.kontak)}
              aria-describedby={error.kontak ? "err-kontak" : undefined}
            />
            {error.kontak && (
              <p id="err-kontak" className="mt-1.5 text-[12.5px] font-semibold text-[#b91c1c]">
                {error.kontak}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="jenis" className="field-label">
            Jenis proyek
          </label>
          <select
            id="jenis"
            name="jenis"
            className="field"
            value={isian.jenis}
            onChange={(e) => ubah("jenis", e.target.value)}
          >
            {formCustom.jenisProyek.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="anggaran" className="field-label">
              Perkiraan anggaran
            </label>
            <select
              id="anggaran"
              name="anggaran"
              className="field"
              value={isian.anggaran}
              onChange={(e) => ubah("anggaran", e.target.value)}
            >
              {formCustom.anggaran.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tenggat" className="field-label">
              Target waktu
            </label>
            <select
              id="tenggat"
              name="tenggat"
              className="field"
              value={isian.tenggat}
              onChange={(e) => ubah("tenggat", e.target.value)}
            >
              {formCustom.tenggat.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="deskripsi" className="field-label">
            Kebutuhan kamu <span className="text-primary">*</span>
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={6}
            className="field resize-y"
            value={isian.deskripsi}
            onChange={(e) => ubah("deskripsi", e.target.value)}
            placeholder="Ceritakan singkat: masalahnya apa, siapa yang akan memakai, dan fitur apa yang dibayangkan."
            aria-invalid={Boolean(error.deskripsi)}
            aria-describedby={error.deskripsi ? "err-deskripsi" : undefined}
          />
          {error.deskripsi && (
            <p id="err-deskripsi" className="mt-1.5 text-[12.5px] font-semibold text-[#b91c1c]">
              {error.deskripsi}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-wa w-full sm:w-auto">
          <Ikon nama="wa" ukuran={17} />
          Kirim lewat WhatsApp
        </button>

        <p className="text-[12.5px] leading-relaxed text-muted">
          Data yang kamu isi tidak dikirim ke server mana pun. Isinya hanya
          disusun di browser ini menjadi pesan WhatsApp.
        </p>
      </div>

      {/* Pratinjau pesan */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <p className="eyebrow">Pratinjau pesan</p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Ini yang akan terkirim ke WhatsApp {whatsapp.tampil}.
          </p>
          <pre className="mt-4 max-h-[340px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-line bg-bg-soft p-4 font-mono text-[11.5px] leading-relaxed text-ink-soft">
{pesan}
          </pre>

          {tersusun && (
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-good/30 bg-[color-mix(in_srgb,var(--c-good)_8%,transparent)] px-3.5 py-3 text-[12.5px] font-semibold text-ink">
              <Ikon nama="centang" ukuran={15} tebal={2.6} className="mt-0.5 flex-none text-good" />
              WhatsApp dibuka di tab baru. Tekan kirim di sana untuk mengirim.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}