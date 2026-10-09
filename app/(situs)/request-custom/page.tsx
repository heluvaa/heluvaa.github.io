import type { Metadata } from "next";
import FormCustom from "@/components/FormCustom";
import PageHeader from "@/components/PageHeader";
import { formCustom } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request Custom",
  description:
    "Ceritakan kebutuhan proyekmu. Rincian akan disusun otomatis dan dikirim lewat WhatsApp.",
};

export default function HalamanRequestCustom() {
  return (
    <>
      <PageHeader
        eyebrow="Request Custom"
        judul={formCustom.judul}
        paragraf={formCustom.paragraf}
        remah={[{ label: "Beranda", href: "/" }, { label: "Request Custom" }]}
      />

      <section className="section">
        <div className="shell">
          <FormCustom />
        </div>
      </section>
    </>
  );
}
