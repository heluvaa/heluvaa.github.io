import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaKontak from "@/components/CtaKontak";
import Ikon from "@/components/Ikon";
import KartuArtikel from "@/components/KartuArtikel";
import SectionHead from "@/components/SectionHead";
import { blog, site } from "@/lib/content";
import { tanggalIndo } from "@/lib/utils";

export function generateStaticParams() {
  return blog.artikel.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = blog.artikel.find((a) => a.slug === slug);
  if (!artikel) return { title: "Artikel tidak ditemukan" };
  return {
    title: artikel.judul,
    description: artikel.ringkas,
    alternates: { canonical: `/blog/${artikel.slug}` },
  };
}

export default async function DetailArtikel({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = blog.artikel.find((a) => a.slug === slug);
  if (!artikel) notFound();

  const lain = blog.artikel.filter((a) => a.slug !== artikel.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line bg-bg-soft">
          <div aria-hidden="true" className="deco absolute inset-0">
            <div className="grid-lines absolute inset-0 opacity-40" />
            <div className="glow-blue absolute -right-24 -top-20 h-64 w-64" />
          </div>

          <div className="shell relative max-w-3xl py-[clamp(40px,7vw,68px)]">
            <nav aria-label="Remah roti" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                <li className="flex items-center gap-2">
                  <Link href="/" className="hover:text-primary">Beranda</Link>
                  <span aria-hidden="true">/</span>
                </li>
                <li className="flex items-center gap-2">
                  <Link href="/blog" className="hover:text-primary">Blog</Link>
                  <span aria-hidden="true">/</span>
                </li>
                <li className="line-clamp-1 text-ink-soft">{artikel.judul}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip chip-primary">{artikel.tag}</span>
              {artikel.draft && <span className="badge-contoh">draft contoh</span>}
            </div>

            <h1 className="mt-4 text-[clamp(25px,5vw,38px)] font-extrabold leading-[1.12] text-ink">
              {artikel.judul}
            </h1>

            <p className="mt-4 font-mono text-[11.5px] text-muted">
              {tanggalIndo(artikel.tanggal)} · {artikel.menitBaca} menit baca
            </p>
          </div>
        </header>

        <div className="shell max-w-3xl py-[clamp(36px,6vw,64px)]">
          {site.demo && artikel.draft && (
            <div className="mb-9 flex items-start gap-3 rounded-[16px] border border-accent/35 bg-accent-soft px-5 py-4">
              <span className="badge-contoh mt-0.5 bg-white">draft</span>
              <p className="text-[13.5px] leading-relaxed text-[#7c4a04]">
                Artikel ini masih kerangka contoh, bukan tulisan final.
              </p>
            </div>
          )}

          <p className="text-[17px] font-semibold leading-relaxed text-ink">
            {artikel.ringkas}
          </p>

          <div className="mt-8 space-y-5">
            {artikel.isi.map((blok, i) => {
              if (blok.type === "h2") {
                return (
                  <h2
                    key={`${i}-${blok.text}`}
                    className="pt-3 text-[21px] font-extrabold tracking-tight text-ink"
                  >
                    {blok.text}
                  </h2>
                );
              }
              if (blok.type === "ul") {
                return (
                  <ul key={`${i}-list`} className="space-y-2.5">
                    {blok.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-soft">
                        <Ikon
                          nama="centang"
                          ukuran={17}
                          tebal={2.6}
                          className="mt-1 flex-none text-primary"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={`${i}-${blok.text.slice(0, 20)}`}
                  className="text-[15.5px] leading-[1.8] text-ink-soft"
                >
                  {blok.text}
                </p>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <span className="text-[13px] text-muted">Bagikan:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${artikel.judul} — ${site.url}/blog/${artikel.slug}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="chip chip-primary transition-opacity hover:opacity-80"
            >
              WhatsApp
            </a>
            <Link href="/blog" className="link-arrow ml-auto">
              Semua artikel
              <Ikon nama="panah" ukuran={14} tebal={2.2} />
            </Link>
          </div>
        </div>
      </article>

      {lain.length > 0 && (
        <section className="section border-t border-line bg-bg-soft">
          <div className="shell">
            <SectionHead eyebrow="Baca juga" judul="Artikel lainnya" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {lain.map((a) => (
                <KartuArtikel key={a.slug} artikel={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaKontak />
    </>
  );
}
