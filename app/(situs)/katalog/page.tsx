import type { Metadata } from "next";
import KatalogExplorer from "@/components/KatalogExplorer";
import CtaKontak from "@/components/CtaKontak";
import PageHeader from "@/components/PageHeader";
import { katalog } from "@/lib/content";

export const metadata: Metadata = {
  title: "Katalog Aplikasi",
  description:
    "Aplikasi siap pakai untuk UMKM, sekolah, dan perorangan — katalog menu QR, kasir, toko online, absensi, undangan digital, dan dashboard IoT.",
};

export default function HalamanKatalog() {
  return (
    <>
      <PageHeader
        eyebrow="Katalog"
        judul="Aplikasi yang siap dipakai hari ini"
        paragraf={katalog.paragraf}
        remah={[{ label: "Beranda", href: "/" }, { label: "Katalog" }]}
      />

      <section className="section">
        <div className="shell">
          <KatalogExplorer />
        </div>
      </section>

      <CtaKontak />
    </>
  );
}
