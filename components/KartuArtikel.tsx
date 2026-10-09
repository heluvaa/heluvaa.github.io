import Link from "next/link";
import Ikon from "@/components/Ikon";
import type { Artikel } from "@/lib/content";
import { tanggalIndo } from "@/lib/utils";

export default function KartuArtikel({ artikel }: { artikel: Artikel }) {
  return (
    <article className="card card-hover group flex h-full flex-col p-6">
      <div className="flex items-center gap-2.5">
        <span className="chip chip-primary text-[11px]">{artikel.tag}</span>
        {artikel.draft && <span className="badge badge-accent">draft</span>}
      </div>

      <h3 className="mt-4 text-[17px] font-extrabold leading-snug text-ink transition-colors group-hover:text-primary-dark">
        <Link href={`/blog/${artikel.slug}`}>{artikel.judul}</Link>
      </h3>

      <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">
        {artikel.ringkas}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <p className="font-mono text-[11px] text-muted">
          {tanggalIndo(artikel.tanggal)} · {artikel.menitBaca} menit
        </p>
        <Link
          href={`/blog/${artikel.slug}`}
          className="link-arrow text-[13px]"
          aria-label={`Baca ${artikel.judul}`}
        >
          Baca
          <Ikon nama="panah" ukuran={14} tebal={2.2} />
        </Link>
      </div>
    </article>
  );
}