import type { ReactNode } from "react";

/**
 * Kepala section yang seragam di seluruh situs:
 * label kecil + judul + deskripsi, dengan slot aksi opsional di kanan.
 */
export default function SectionHead({
  eyebrow,
  judul,
  paragraf,
  aksi,
  tengah = false,
}: {
  eyebrow: string;
  judul: ReactNode;
  paragraf?: string;
  aksi?: ReactNode;
  tengah?: boolean;
}) {
  return (
    <div
      className={`reveal flex flex-col gap-5 ${
        tengah
          ? "mx-auto max-w-2xl text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={tengah ? "" : "max-w-2xl"}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-[clamp(23px,4.4vw,34px)] font-extrabold leading-[1.12] text-ink">
          {judul}
        </h2>
        {paragraf && (
          <p
            className={`mt-3.5 text-[15px] leading-relaxed text-muted ${
              tengah ? "mx-auto max-w-[56ch]" : "max-w-[58ch]"
            }`}
          >
            {paragraf}
          </p>
        )}
      </div>
      {aksi && <div className="flex-none">{aksi}</div>}
    </div>
  );
}
