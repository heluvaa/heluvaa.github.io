import type { Metadata } from "next";
import CtaKontak from "@/components/CtaKontak";
import KartuKarya from "@/components/KartuKarya";
import PageHeader from "@/components/PageHeader";
import SectionHead from "@/components/SectionHead";
import { portofolio, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Kumpulan pekerjaan website, aplikasi web, dan solusi IoT untuk UMKM, sekolah, dan perorangan.",
};

export default function HalamanPortofolio() {
  return (
    <>
      <PageHeader
        eyebrow="Portofolio"
        judul="Pekerjaan yang sudah dikerjakan"
        paragraf={portofolio.paragraf}
        remah={[{ label: "Beranda", href: "/" }, { label: "Portofolio" }]}
      />

      <section className="section">
        <div className="shell">
          {site.demo && (
            <div className="reveal mb-10 flex items-start gap-3 rounded-[16px] border border-accent/35 bg-accent-soft px-5 py-4">
              <span className="badge-contoh mt-0.5 bg-white">perhatian</span>
              <p className="text-[13.5px] leading-relaxed text-[#7c4a04]">
                Semua karya di halaman ini masih <strong>contoh</strong>. Ganti
                dengan proyek aslimu di <code className="font-mono">lib/content.ts</code>{" "}
                sebelum situs ini dipakai untuk menawarkan jasa.
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portofolio.karya.map((k) => (
              <KartuKarya key={k.judul} karya={k} />
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-bg-soft">
        <div className="shell">
          <SectionHead
            eyebrow="Selanjutnya"
            judul="Proyek berikutnya bisa milikmu"
            paragraf="Ceritakan kebutuhanmu, dan saya bantu hitung waktu serta biaya secara jujur."
            tengah
          />
        </div>
      </section>

      <CtaKontak />
    </>
  );
}
