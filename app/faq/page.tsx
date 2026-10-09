import type { Metadata } from "next";
import CtaKontak from "@/components/CtaKontak";
import FaqList from "@/components/FaqList";
import PageHeader from "@/components/PageHeader";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pertanyaan Umum",
  description:
    "Jawaban atas pertanyaan yang paling sering muncul soal waktu pengerjaan, revisi, pembayaran, dan garansi.",
};

export default function HalamanFaq() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        judul="Pertanyaan Umum"
        paragraf="Hal-hal yang paling sering ditanyakan sebelum memesan. Kalau pertanyaanmu belum ada di sini, tanya langsung saja."
        remah={[{ label: "Beranda", href: "/" }, { label: "Pertanyaan Umum" }]}
      />

      <section className="section">
        <div className="shell max-w-3xl">
          <FaqList items={faq} />
          <p className="mt-8 text-[13px] text-muted">
            {faq.length} pertanyaan · klik salah satu untuk membuka jawabannya.
          </p>
        </div>
      </section>

      <CtaKontak />
    </>
  );
}
