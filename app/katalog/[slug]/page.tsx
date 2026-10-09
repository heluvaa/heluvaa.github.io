import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaKontak from "@/components/CtaKontak";
import Ikon from "@/components/Ikon";
import MockupAplikasi from "@/components/MockupAplikasi";
import SectionHead from "@/components/SectionHead";
import KartuAplikasi from "@/components/KartuAplikasi";
import { katalog, whatsapp } from "@/lib/content";
import { waLink } from "@/lib/utils";

export function generateStaticParams() {
  return katalog.aplikasi.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = katalog.aplikasi.find((a) => a.slug === slug);
  if (!app) return { title: "Aplikasi tidak ditemukan" };
  return {
    title: app.nama,
    description: app.ringkas,
    alternates: { canonical: `/katalog/${app.slug}` },
  };
}

export default async function DetailAplikasi({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = katalog.aplikasi.find((a) => a.slug === slug);
  if (!app) notFound();

  const lain = katalog.aplikasi.filter((a) => a.slug !== app.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-bg-soft">
        <div aria-hidden="true" className="deco absolute inset-0">
          <div className="grid-lines absolute inset-0 opacity-50" />
          <div className="glow-blue absolute -right-20 -top-24 h-72 w-72" />
        </div>

        <div className="shell relative grid items-center gap-12 py-[clamp(40px,7vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <nav aria-label="Remah roti" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                <li className="flex items-center gap-2">
                  <Link href="/" className="hover:text-primary">Beranda</Link>
                  <span aria-hidden="true">/</span>
                </li>
                <li className="flex items-center gap-2">
                  <Link href="/katalog" className="hover:text-primary">Katalog</Link>
                  <span aria-hidden="true">/</span>
                </li>
                <li className="text-ink-soft">{app.nama}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip chip-primary reveal">{app.kategori}</span>
              {app.demo && <span className="badge-contoh reveal">produk contoh</span>}
            </div>

            <h1 className="reveal mt-4 text-[clamp(26px,5.2vw,40px)] font-extrabold leading-[1.1] text-ink">
              {app.nama}
            </h1>
            <p className="reveal mt-2 text-[15px] font-semibold text-primary">
              {app.tagline}
            </p>

            <div className="reveal mt-6 space-y-4">
              {app.deskripsi.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>

            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(
                  whatsapp.nomor,
                  `Halo, saya tertarik dengan aplikasi ${app.nama}. Boleh minta info lebih lanjut?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                <Ikon nama="wa" ukuran={17} />
                Tanya soal aplikasi ini
              </a>
              <Link href="/request-custom" className="btn btn-ghost">
                Minta kustomisasi
              </Link>
            </div>
          </div>

          <div className="reveal">
            <MockupAplikasi mockup={app.mockup} contoh={app.demo} />
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="text-[22px] font-extrabold tracking-tight text-ink">
              Fitur yang sudah termasuk
            </h2>
            <ul className="mt-6 space-y-3.5">
              {app.fitur.map((f, i) => (
                <li
                  key={f}
                  className="card reveal flex items-start gap-3 p-4"
                  style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                >
                  <Ikon
                    nama="centang"
                    ukuran={18}
                    tebal={2.6}
                    className="mt-0.5 flex-none text-good"
                  />
                  <span className="text-[14.5px] leading-relaxed text-ink-soft">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="reveal lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {app.mulai === "Menyesuaikan" ? "harga" : "mulai dari"}
              </p>
              <p className="mt-1.5 flex flex-wrap items-baseline gap-2">
                <span className="text-[26px] font-extrabold tracking-tight text-ink">
                  {app.mulai}
                </span>
                {app.mulai !== "Menyesuaikan" && (
                  <span className="badge-contoh">harga contoh</span>
                )}
              </p>

              <div className="mt-5 border-t border-line pt-5">
                <p className="text-[13px] font-bold text-ink-soft">Teknologi</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {app.teknologi.map((t) => (
                    <li key={t} className="chip text-[11.5px]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-line pt-5">
                <p className="text-[13px] font-bold text-ink-soft">Kategori</p>
                <p className="mt-1 text-[13.5px] text-muted">{app.kategori}</p>
              </div>

              <a
                href={waLink(
                  whatsapp.nomor,
                  `Halo, saya mau order aplikasi ${app.nama}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-6 w-full"
              >
                Order lewat WhatsApp
              </a>
              <p className="mt-3 text-center text-[11.5px] text-muted">
                Belum yakin? Tanya dulu saja, gratis.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Aplikasi lain */}
      <section className="section border-t border-line bg-bg-soft">
        <div className="shell">
          <SectionHead
            eyebrow="Katalog"
            judul="Aplikasi lain yang mungkin cocok"
            aksi={
              <Link href="/katalog" className="btn btn-ghost">
                Semua katalog
                <Ikon nama="panah" ukuran={16} tebal={2.2} />
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lain.map((a) => (
              <KartuAplikasi key={a.slug} app={a} />
            ))}
          </div>
        </div>
      </section>

      <CtaKontak />
    </>
  );
}
