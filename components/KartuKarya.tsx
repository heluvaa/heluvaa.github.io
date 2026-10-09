import type { Karya } from "@/lib/content";
import Ikon from "@/components/Ikon";

export default function KartuKarya({ karya }: { karya: Karya }) {
  return (
    <article className="card card-hover flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="chip chip-primary text-[11px]">{karya.kategori}</span>
        <span className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted">{karya.tahun}</span>
        </span>
      </div>

      <h3 className="mt-4 text-[17.5px] font-extrabold leading-snug text-ink">
        {karya.judul}
      </h3>

      <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">
        {karya.ringkas}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {karya.tags.map((t) => (
          <li key={t} className="chip text-[11.5px]">
            {t}
          </li>
        ))}
      </ul>

      {karya.url && (
        <a
          href={karya.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow mt-5 border-t border-line pt-4 text-[13px]"
        >
          Lihat hasilnya
          <Ikon nama="panahMiring" ukuran={13} tebal={2.2} />
        </a>
      )}
    </article>
  );
}