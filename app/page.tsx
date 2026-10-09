import Link from "next/link";
import Ikon from "@/components/Ikon";
import KartuAplikasi from "@/components/KartuAplikasi";
import KartuArtikel from "@/components/KartuArtikel";
import KartuKarya from "@/components/KartuKarya";
import KartuPaket from "@/components/KartuPaket";
import CtaKontak from "@/components/CtaKontak";
import FaqList from "@/components/FaqList";
import MockupAplikasi from "@/components/MockupAplikasi";
import SectionHead from "@/components/SectionHead";
import {
  blog,
  hero,
  katalog,
  keunggulan,
  paketHarga,
  portofolio,
  site,
} from "@/lib/content";
import { delay } from "@/lib/utils";

const IKON: Record<string, "kode" | "cepat" | "revisi" | "rawat"> = {
  kode: "kode",
  cepat: "cepat",
  revisi: "revisi",
  rawat: "rawat",
};

export default function Beranda() {
  const unggulan = katalog.aplikasi[0];
  const katalogPratinjau = katalog.aplikasi.slice(0, 3);
  const karyaPratinjau = portofolio.karya.slice(0, 3);
  const artikelPratinjau = blog.artikel.slice(0, 3);

  return (
    <>
      {/* ================= HERO ================= */}
      <section id="atas" className="relative overflow-hidden">
        <div aria-hidden="true" className="deco absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-bg-tint)_0%,#ffffff_60%)]" />
          <div className="grid-lines absolute inset-x-0 top-0 h-[420px] opacity-45" />
          <div className="glow-blue absolute -left-24 top-0 h-80 w-80" />
          <div className="glow-amber absolute right-0 top-24 h-72 w-72 opacity-70" />
        </div>

        <div className="shell grid items-center gap-14 py-[clamp(48px,8vw,92px)] lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <span className="chip chip-primary reveal">
              <span className="h-1.5 w-1.5 rounded-full bg-good" aria-hidden="true" />
              {hero.badge}
            </span>

            <h1
              className="reveal mt-6 text-[clamp(29px,5.8vw,48px)] font-extrabold leading-[1.08] text-ink"
              style={delay(70)}
            >
              {hero.judul}
            </h1>

            <p
              className="reveal mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-ink-soft"
              style={delay(130)}
            >
              {hero.paragraf}
            </p>

            <div
              className="reveal mt-8 flex flex-col gap-3 sm:flex-row"
              style={delay(190)}
            >
              <Link href={hero.ctaUtama.href} className="btn btn-primary">
                {hero.ctaUtama.label}
                <Ikon nama="panah" ukuran={16} tebal={2.2} />
              </Link>
              <Link href={hero.ctaKedua.href} className="btn btn-ghost">
                {hero.ctaKedua.label}
              </Link>
            </div>

            <p
              className="reveal mt-5 flex items-center gap-2 text-[13px] text-muted"
              style={delay(240)}
            >
              <Ikon nama="centang" ukuran={15} tebal={2.6} className="text-good" />
              {hero.catatan}
            </p>
          </div>

          {/* Pratinjau aplikasi unggulan */}
          <div className="reveal relative" style={delay(150)}>
            <div
              aria-hidden="true"
              className="deco glow-blue absolute inset-x-6 top-8 h-56"
            />
            <div className="relative">
              <div className="mb-5 text-center">
                <span className="chip chip-primary text-[11.5px]">
                  Produk unggulan
                </span>
              </div>
              <MockupAplikasi mockup={unggulan.mockup} contoh />
              <p className="mt-5 text-center text-[13.5px] font-bold text-ink">
                {unggulan.nama}
              </p>
              <p className="mt-1 text-center text-[12.5px] text-muted">
                {unggulan.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Strip target pasar */}
        <div className="border-y border-line bg-surface/70">
          <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Cocok untuk
            </span>
            {["UMKM & Warung", "Sekolah", "Toko Online", "Mahasiswa", "Kebutuhan IoT"].map(
              (t) => (
                <span key={t} className="text-[13.5px] font-semibold text-ink-soft">
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ================= KEUNGGULAN ================= */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Cara kerja"
            judul={keunggulan.judul}
            paragraf={keunggulan.paragraf}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {keunggulan.item.map((k, i) => (
              <div
                key={k.judul}
                className="card reveal p-6"
                style={delay(i * 80)}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary-dark">
                  <Ikon nama={IKON[k.ikon]} ukuran={21} />
                </span>
                <h3 className="mt-4 text-[16px] font-extrabold leading-snug text-ink">
                  {k.judul}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {k.teks}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PAKET HARGA ================= */}
      <section className="section border-y border-line bg-bg-soft">
        <div className="shell">
          <SectionHead
            eyebrow="Harga"
            judul={paketHarga.judul}
            paragraf={paketHarga.paragraf}
            tengah
          />

          <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
            {paketHarga.paket.map((p, i) => (
              <KartuPaket key={p.id} paket={p} index={i} />
            ))}
          </div>

          <p className="reveal mt-8 text-center text-[12.5px] text-muted">
            Harga di atas masih contoh. Angka final disepakati tertulis sebelum
            pekerjaan dimulai.
          </p>
        </div>
      </section>

      {/* ================= KATALOG ================= */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Katalog"
            judul={katalog.judul}
            paragraf={katalog.paragraf}
            aksi={
              <Link href="/katalog" className="btn btn-ghost">
                Lihat semua katalog
                <Ikon nama="panah" ukuran={16} tebal={2.2} />
              </Link>
            }
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {katalogPratinjau.map((app) => (
              <KartuAplikasi key={app.slug} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PORTOFOLIO ================= */}
      <section className="section border-y border-line bg-bg-soft">
        <div className="shell">
          <SectionHead
            eyebrow="Portofolio"
            judul={portofolio.judul}
            paragraf={portofolio.paragraf}
            aksi={
              <Link href="/portofolio" className="btn btn-ghost">
                Lihat semua karya
                <Ikon nama="panah" ukuran={16} tebal={2.2} />
              </Link>
            }
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {karyaPratinjau.map((k) => (
              <KartuKarya key={k.judul} karya={k} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= ARTIKEL ================= */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Blog"
            judul="Artikel Terbaru"
            paragraf={blog.paragraf}
            aksi={
              <Link href="/blog" className="btn btn-ghost">
                Lihat semua artikel
                <Ikon nama="panah" ukuran={16} tebal={2.2} />
              </Link>
            }
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {artikelPratinjau.map((a) => (
              <KartuArtikel key={a.slug} artikel={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section border-y border-line bg-bg-soft">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 text-[clamp(23px,4.4vw,34px)] font-extrabold leading-[1.12] text-ink">
              Pertanyaan Umum
            </h2>
            <p className="mt-3.5 max-w-[42ch] text-[15px] leading-relaxed text-muted">
              Pertanyaan yang paling sering muncul sebelum mulai kerja sama.
            </p>
            <Link href="/faq" className="link-arrow mt-6">
              Lihat semua pertanyaan
              <Ikon nama="panah" ukuran={15} tebal={2.2} />
            </Link>
          </div>

          <FaqList batas={4} />
        </div>
      </section>

      <CtaKontak />

      <p className="shell pb-10 text-center font-mono text-[11px] text-muted">
        {site.tagline}
      </p>
    </>
  );
}
