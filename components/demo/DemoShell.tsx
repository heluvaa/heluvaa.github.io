import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { whatsapp } from "@/lib/content";
import { waLink } from "@/lib/demo/format";

/**
 * Shell untuk semua halaman demo.
 *
 * Sengaja tidak memakai navigasi situs: demo harus terasa seperti
 * aplikasinya sendiri, bukan bagian dari halaman jualan. Yang tersisa
 * hanya tiga hal penting — jalan kembali, ganti tema, dan tombol order.
 */
export default function DemoShell({
  judul,
  subjudul,
  pesanOrder,
  children,
}: {
  judul: string;
  subjudul: string;
  pesanOrder: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-soft">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/katalog"
            className="flex flex-none items-center gap-2 rounded-xl border border-line-2 bg-surface px-3 py-2 text-[13px] font-semibold text-ink-soft transition-colors hover:border-primary hover:text-primary"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Katalog</span>
          </Link>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-extrabold tracking-tight text-ink">
              {judul}
            </p>
            <p className="hidden truncate text-[11.5px] text-muted sm:block">
              {subjudul}
            </p>
          </div>

          <span className="badge badge-good hidden flex-none lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-good" aria-hidden="true" />
            demo interaktif
          </span>

          <ThemeToggle className="h-10 w-10 flex-none" />

          <a
            href={waLink(whatsapp.nomor, pesanOrder)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa btn-sm flex-none"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.86 9.86 0 004.68 1.19c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2zm5.76 14.03c-.24.68-1.42 1.31-1.95 1.36-.53.05-1.02.24-3.44-.72-2.92-1.15-4.75-4.2-4.9-4.4-.14-.19-1.15-1.55-1.15-2.96 0-1.4.73-2.09 1-2.38.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.63.49.24.58.8 2 .87 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.44.29.15.46.12.63-.07.17-.19.72-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.68.8 1.97.94.29.15.48.22.55.34.07.13.07.73-.17 1.42z" />
            </svg>
            <span className="hidden sm:inline">Order via WhatsApp</span>
            <span className="sm:hidden">Order</span>
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>

      <footer className="border-t border-line bg-bg">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6">
          <p className="text-center text-[12px] text-muted sm:text-left">
            Perubahan yang kamu lakukan tersimpan di browser ini saja — muat
            ulang halaman dan datanya tetap ada.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/katalog"
              className="text-[12.5px] font-semibold text-primary-dark hover:underline"
            >
              Semua demo
            </Link>
            <Link
              href="/request-custom"
              className="text-[12.5px] font-semibold text-primary-dark hover:underline"
            >
              Minta versi custom
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
