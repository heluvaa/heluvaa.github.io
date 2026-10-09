import Link from "next/link";
import Ikon from "@/components/Ikon";
import { kontak, whatsapp } from "@/lib/content";
import { waLink } from "@/lib/utils";

export default function CtaKontak() {
  return (
    <section className="section">
      <div className="shell">
        <div className="reveal relative overflow-hidden rounded-[24px] border border-line bg-[linear-gradient(135deg,var(--color-bg-tint)_0%,#ffffff_45%,var(--color-accent-soft)_100%)] p-8 sm:p-12">
          {/* Dekorasi */}
          <div aria-hidden="true" className="deco absolute inset-0">
            <div className="grid-lines absolute inset-0 opacity-40" />
            <div className="glow-blue absolute -left-16 -top-16 h-64 w-64" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="eyebrow">Konsultasi gratis</p>
            <h2 className="mt-3 text-[clamp(24px,4.6vw,36px)] font-extrabold leading-tight text-ink">
              {kontak.judul}
            </h2>
            <p className="mx-auto mt-4 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
              {kontak.paragraf}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={waLink(whatsapp.nomor, whatsapp.pesanDefault)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                <Ikon nama="wa" ukuran={17} />
                {kontak.ctaUtama.label}
              </a>
              <Link href={kontak.ctaKedua.href} className="btn btn-ghost">
                {kontak.ctaKedua.label}
                <Ikon nama="panah" ukuran={16} tebal={2.2} />
              </Link>
            </div>

            <p className="mt-5 font-mono text-[11px] text-muted">
              WhatsApp {whatsapp.tampil} · biasanya dibalas pada hari yang sama
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
