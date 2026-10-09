import type { Metadata } from "next";
import CtaKontak from "@/components/CtaKontak";
import KartuArtikel from "@/components/KartuArtikel";
import PageHeader from "@/components/PageHeader";
import { blog, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips dan wawasan seputar website, aplikasi, dan IoT untuk usaha kecil.",
};

export default function HalamanBlog() {
  const urut = [...blog.artikel].sort((a, b) =>
    b.tanggal.localeCompare(a.tanggal),
  );

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        judul="Artikel Terbaru"
        paragraf={blog.paragraf}
        remah={[{ label: "Beranda", href: "/" }, { label: "Blog" }]}
      />

      <section className="section">
        <div className="shell">
          {site.demo && (
            <div className="reveal mb-10 flex items-start gap-3 rounded-[16px] border border-accent/35 bg-accent-soft px-5 py-4">
              <span className="badge-contoh mt-0.5 bg-white">perhatian</span>
              <p className="text-[13.5px] leading-relaxed text-[#7c4a04]">
                Ketiga artikel ini masih <strong>draft contoh</strong> dan belum
                ditulis serius. Ganti judul dan isinya di{" "}
                <code className="font-mono">lib/content.ts</code> sebelum
                dipublikasikan.
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {urut.map((a) => (
              <KartuArtikel key={a.slug} artikel={a} />
            ))}
          </div>
        </div>
      </section>

      <CtaKontak />
    </>
  );
}
