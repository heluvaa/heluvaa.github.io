import { contacts, footer, nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = contacts.filter((c) => !c.pending && c.url);

  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="shell py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identitas */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-line-2 bg-panel font-mono text-[12.5px] font-bold text-neon">
                {site.initials}
              </span>
              <span className="text-[14px] font-semibold tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              {site.roleId}
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-muted">
              {footer.note}
            </p>
          </div>

          {/* Navigasi + sosial */}
          <div className="flex gap-14">
            <nav aria-label="Navigasi footer">
              <p className="mono-label text-[10px]">Halaman</p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[13.5px] text-ink-soft transition-colors hover:text-neon"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mono-label text-[10px]">Temukan saya</p>
              <ul className="mt-4 space-y-2.5">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-[13.5px] text-ink-soft transition-colors hover:text-neon"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[11.5px] text-muted">
            © {year} {site.name}
          </p>

          <div className="flex items-center gap-4">
            {footer.demo && (
              <span
                className="rounded-full border border-vi/40 bg-vi/10 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wider text-vi"
                title="Masih ada placeholder placeholder yang harus diganti"
              >
                Ada placeholder
              </span>
            )}
            <a
              href="#top"
              className="font-mono text-[11.5px] text-muted transition-colors hover:text-neon"
            >
              Kembali ke atas ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
