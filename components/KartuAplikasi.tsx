import Link from "next/link";
import MockupAplikasi from "@/components/MockupAplikasi";
import Ikon from "@/components/Ikon";
import type { Aplikasi } from "@/lib/content";

export default function KartuAplikasi({
  app,
  prioritas = false,
}: {
  app: Aplikasi;
  prioritas?: boolean;
}) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      {/* Pratinjau */}
      <div className="relative border-b border-line bg-[linear-gradient(180deg,var(--color-bg-tint)_0%,var(--color-bg-soft)_100%)] px-6 pb-9 pt-7">
        <div className="flex items-start justify-between gap-3">
          <span className="chip chip-primary">{app.kategori}</span>
          {app.demo && <span className="badge-contoh bg-white">contoh</span>}
        </div>
        <div className="mt-6 transition-transform duration-500 group-hover:-translate-y-1">
          <MockupAplikasi mockup={app.mockup} />
        </div>
      </div>

      {/* Isi */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[18px] font-extrabold leading-snug text-ink transition-colors group-hover:text-primary-dark">
          {app.nama}
        </h3>
        <p className="mt-1.5 text-[13px] font-semibold text-primary">
          {app.tagline}
        </p>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
          {app.ringkas}
        </p>

        <ul className="mt-5 space-y-2">
          {app.fitur.slice(0, 2).map((f) => (
            <li
              key={f}
              className="flex gap-2 text-[13px] leading-relaxed text-ink-soft"
            >
              <Ikon
                nama="centang"
                ukuran={14}
                tebal={2.6}
                className="mt-[3px] flex-none text-good"
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              mulai dari
            </p>
            <p className="mt-0.5 text-[17px] font-extrabold tracking-tight text-ink">
              {app.mulai}
              {app.demo && app.mulai !== "Menyesuaikan" && (
                <span className="ml-1.5 align-middle font-mono text-[9.5px] font-normal uppercase tracking-wider text-muted">
                  contoh
                </span>
              )}
            </p>
          </div>
          <Link
            href={`/katalog/${app.slug}`}
            className="link-arrow text-[13.5px]"
            aria-label={`Lihat detail ${app.nama}`}
          >
            Lihat
            <Ikon nama="panahMiring" ukuran={13} tebal={2.2} />
          </Link>
        </div>
      </div>
    </article>
  );
}
