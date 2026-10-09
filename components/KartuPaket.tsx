import type { CSSProperties } from "react";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import type { Paket } from "@/lib/content";

export default function KartuPaket({
  paket,
  index,
}: {
  paket: Paket;
  index: number;
}) {
  const unggulan = Boolean(paket.unggulan);

  return (
    <article
      className={`card reveal relative flex h-full flex-col p-7 ${
        unggulan ? "card-featured lg:-mt-4 lg:mb-4" : ""
      }`}
      style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
    >
      {unggulan && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_22px_-10px_rgba(37,99,235,.9)]">
          Paling laris
        </span>
      )}

      <h3 className="text-[19px] font-extrabold tracking-tight text-ink">
        {paket.nama}
      </h3>
      <p className="mt-2 min-h-[42px] text-[13.5px] leading-relaxed text-muted">
        {paket.ringkas}
      </p>

      <div className="mt-5 border-y border-line py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {paket.hargaNote}
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="text-[27px] font-extrabold tracking-tight text-ink">
            {paket.harga}
          </span>
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {paket.fitur.map((f) => (
          <li key={f} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
            <Ikon
              nama="centang"
              ukuran={16}
              tebal={2.6}
              className="mt-[3px] flex-none text-good"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={paket.cta.href}
        className={`btn mt-7 w-full ${unggulan ? "btn-primary" : "btn-ghost"}`}
      >
        {paket.cta.label}
      </Link>
    </article>
  );
}