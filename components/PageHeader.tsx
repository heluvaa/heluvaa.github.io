import Link from "next/link";

/**
 * Header seragam untuk halaman selain beranda:
 * breadcrumb + judul + deskripsi, dengan latar dekoratif yang halus.
 */
export default function PageHeader({
  eyebrow,
  judul,
  paragraf,
  remah,
}: {
  eyebrow: string;
  judul: string;
  paragraf?: string;
  remah?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-soft">
      <div aria-hidden="true" className="deco absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-50" />
        <div className="glow-blue absolute -right-20 -top-24 h-72 w-72" />
      </div>

      <div className="shell relative py-[clamp(44px,8vw,76px)]">
        {remah && remah.length > 0 && (
          <nav aria-label="Remah roti" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
              {remah.map((r, i) => (
                <li key={r.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {r.href ? (
                    <Link href={r.href} className="hover:text-primary">
                      {r.label}
                    </Link>
                  ) : (
                    <span className="text-ink-soft">{r.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal mt-3 max-w-3xl text-[clamp(27px,5.4vw,42px)] font-extrabold leading-[1.08] text-ink">
          {judul}
        </h1>
        {paragraf && (
          <p className="reveal mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
            {paragraf}
          </p>
        )}
      </div>
    </section>
  );
}
