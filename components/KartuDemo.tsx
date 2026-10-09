import Link from "next/link";
import Ikon from "@/components/Ikon";
import MockupAplikasi from "@/components/MockupAplikasi";
import type { Demo } from "@/lib/content";
import { whatsapp } from "@/lib/content";
import { waLink } from "@/lib/demo/format";

export default function KartuDemo({ demo }: { demo: Demo }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      {/* Thumbnail — pakai gambar kalau ada, kalau belum dipakai pratinjau hidup */}
      <div className="relative border-b border-line bg-[linear-gradient(180deg,var(--c-bg-tint)_0%,var(--c-bg-soft)_100%)] px-6 pb-10 pt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="chip chip-primary">{demo.kategori}</span>
          <span className="badge badge-good">bisa dicoba</span>
        </div>
        <div className="mt-5 transition-transform duration-500 group-hover:-translate-y-1">
          {demo.thumbnail ? (
            <img
              src={demo.thumbnail}
              alt={`Tampilan aplikasi ${demo.nama}`}
              loading="lazy"
              className="mx-auto w-full max-w-[300px] rounded-[18px] border border-line"
            />
          ) : (
            <MockupAplikasi mockup={demo.mockup} />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[18px] font-extrabold leading-snug text-ink">{demo.nama}</h3>
        <p className="mt-1.5 text-[13px] font-semibold text-primary">{demo.tagline}</p>

        <div className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-muted">
          {demo.deskripsi.map((k) => (
            <p key={k.slice(0, 20)}>{k}</p>
          ))}
        </div>

        <div className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Fitur utama</p>
          <ul className="mt-2.5 space-y-1.5">
            {demo.fitur.map((f) => (
              <li key={f} className="flex gap-2 text-[13px] leading-relaxed text-ink-soft">
                <Ikon nama="centang" ukuran={14} tebal={2.6} className="mt-[3px] flex-none text-good" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">mulai dari</p>
            <p className="mt-0.5 text-[18px] font-extrabold tracking-tight text-ink">{demo.hargaMulai}</p>
          </div>
          <p className="text-right text-[11px] leading-snug text-muted">
            sekali bayar
            <br />
            kode sumber diserahkan
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link href={demo.demoUrl} className="btn btn-primary btn-sm flex-1">
            Coba demo
            <Ikon nama="panahMiring" ukuran={14} tebal={2.2} />
          </Link>
          <a
            href={waLink(whatsapp.nomor, demo.pesanOrder)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa btn-sm flex-1"
          >
            Order
          </a>
        </div>
      </div>
    </article>
  );
}
