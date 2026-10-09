import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import PageHeader from "@/components/PageHeader";
import { kontak, kontakList, site, whatsapp } from "@/lib/content";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi untuk konsultasi gratis soal website, aplikasi web, atau solusi IoT. Ceritakan kebutuhanmu, dapatkan perkiraan waktu dan biaya.",
};

export default function HalamanKontak() {
  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        judul={kontak.judul}
        paragraf={kontak.paragraf}
        remah={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]}
      />

      <section className="section">
        <div className="shell">
          <div className="reveal card relative overflow-hidden p-8 sm:p-10">
            <div aria-hidden="true" className="deco absolute inset-0">
              <div className="glow-blue absolute -right-16 -top-16 h-56 w-56" />
            </div>

            <div className="relative">
              <h2 className="text-[clamp(20px,3.4vw,26px)] font-extrabold tracking-tight text-ink">
                Mulai dari percakapan singkat
              </h2>
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-muted">
                Tidak perlu menyiapkan dokumen apa pun. Ceritakan saja
                masalahnya, lalu kita lihat bersama apakah perlu dibangun
                sekarang atau ditunda dulu.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>

          {/* Daftar kontak */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kontakList.map((k, i) => {
              const aktif = !k.pending && k.url !== "";
              const isi = (
                <>
                  <span className="flex w-full items-center justify-between gap-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                      {k.label}
                    </span>
                    {aktif ? (
                      <Ikon
                        nama="panahMiring"
                        ukuran={14}
                        tebal={2.2}
                        className="text-muted transition-colors group-hover:text-primary"
                      />
                    ) : (
                      <span className="rounded-full border border-line-2 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted">
                        belum diisi
                      </span>
                    )}
                  </span>
                  <span className="mt-3 block break-words text-[15px] font-bold tracking-tight text-ink">
                    {k.nilai}
                  </span>
                </>
              );

              return (
                <div
                  key={k.label}
                  className="reveal"
                  style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                >
                  {aktif ? (
                    <a
                      href={k.url}
                      {...(k.url.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="card card-hover group flex h-full flex-col p-5"
                    >
                      {isi}
                    </a>
                  ) : (
                    <div className="card flex h-full flex-col p-5 opacity-60">
                      {isi}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="reveal mt-8 text-[12.5px] leading-relaxed text-muted">
            {site.nama} beroperasi dari {site.target.split(",")[0]} area Indonesia.
            Pesan WhatsApp biasanya dibalas pada hari yang sama di jam kerja.
          </p>
        </div>
      </section>
    </>
  );
}
