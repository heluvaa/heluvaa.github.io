import type { Metadata } from "next";
import Link from "next/link";
import Ikon from "@/components/Ikon";
import KartuDemo from "@/components/KartuDemo";
import { katalog } from "@/lib/content";

export const metadata: Metadata = {
  title: "Demo Aplikasi",
  description:
    "Semua demo aplikasi dalam satu halaman. Klik, coba sendiri, lalu order kalau cocok.",
  robots: { index: false, follow: true },
};

export default function HalamanDemo() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-soft">
      <header className="border-b border-line bg-bg">
        <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/katalog"
            className="btn btn-ghost btn-sm"
          >
            <Ikon nama="panah" ukuran={15} tebal={2.2} className="rotate-180" />
            Katalog
          </Link>
          <p className="text-[14px] font-extrabold tracking-tight text-ink">
            Demo aplikasi
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-[clamp(24px,4.4vw,34px)] font-extrabold leading-tight text-ink">
          {katalog.judul}
        </h1>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-muted">
          {katalog.paragraf}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {katalog.demo.map((d) => (
            <KartuDemo key={d.slug} demo={d} />
          ))}
        </div>
      </main>
    </div>
  );
}
