import type { Metadata } from "next";
import CtaKontak from "@/components/CtaKontak";
import KartuKarya from "@/components/KartuKarya";
import PageHeader from "@/components/PageHeader";
import SectionHead from "@/components/SectionHead";
import { portofolio } from "@/lib/content";

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