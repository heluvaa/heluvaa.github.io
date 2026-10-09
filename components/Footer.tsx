import Link from "next/link";
import Ikon from "@/components/Ikon";
import { footer, katalog, kontakList, nav, site, whatsapp } from "@/lib/content";
import { waLink } from "@/lib/utils";

export default function Footer() {
  const tahun = new Date().getFullYear();
  const kontakAktif = kontakList.filter((k) => !k.pending && k.url);
  const katalogTeratas = katalog.demo.slice(0, 4);

  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="shell pb-28 pt-14 sm:pb-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-mono text-[12.5px] font-bold text-white">
                {site.inisial}
              </span>
              <span className="text-[15px] font-extrabold tracking-tight">
                {site.nama}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted">
              {footer.tentang}
            </p>
            <a
              href={waLink(whatsapp.nomor, whatsapp.pesanDefault)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mt-5 px-5 py-2.5 text-[13px]"
            >
              <Ikon nama="wa" ukuran={16} />
              Chat WhatsApp
            </a>
          </div>

          {/* Navigasi */}
          <nav aria-label="Navigasi footer">
            <p className="eyebrow">Halaman</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13.5px] font-medium text-ink-soft transition-colors hover:text-primary-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-[13.5px] font-medium text-ink-soft transition-colors hover:text-primary-dark"
                >
                  Pertanyaan Umum
                </Link>
              </li>
              <li>
                <Link
                  href="/request-custom"
                  className="text-[13.5px] font-medium text-ink-soft transition-colors hover:text-primary-dark"
                >
                  Request Custom
                </Link>
              </li>
            </ul>
          </nav>

          {/* Katalog */}
          <nav aria-label="Katalog populer">
            <p className="eyebrow">Katalog</p>
            <ul className="mt-4 space-y-2.5">
              {katalogTeratas.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={d.demoUrl}
                    className="text-[13.5px] font-medium text-ink-soft transition-colors hover:text-primary-dark"
                  >
                    {d.nama}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/katalog"
                  className="text-[13.5px] font-bold text-primary-dark"
                >
                  Lihat semua →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontak */}
          <div>
            <p className="eyebrow">Kontak</p>
            <ul className="mt-4 space-y-2.5">
              {kontakAktif.map((k) => (
                <li key={k.label}>
                  <a
                    href={k.url}
                    {...(k.url.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-[13.5px] font-medium text-ink-soft transition-colors hover:text-primary-dark"
                  >
                    <span className="text-muted">{k.label}:</span> {k.nilai}
                  </a>
                </li>
              ))}
              {kontakList
                .filter((k) => k.pending)
                .map((k) => (
                  <li
                    key={k.label}
                    className="flex items-center gap-2 text-[13.5px] text-muted"
                  >
                    <span>{k.label}:</span>
                    <span className="rounded-full border border-line-2 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider">
                      belum diisi
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[11.5px] text-muted">
            © {tahun} {site.nama} · {site.domain}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {site.demo && (
              <span
                className="rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wider text-[#92400e]"
                title="Masih ada data contoh dan placeholder yang harus diganti"
              >
                Data contoh
              </span>
            )}
            <p className="font-mono text-[11.5px] text-muted">
              Next.js · Tailwind CSS · GitHub Pages
            </p>
            <a
              href="/#atas"
              className="font-mono text-[11.5px] text-muted transition-colors hover:text-primary"
            >
              Ke atas ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
