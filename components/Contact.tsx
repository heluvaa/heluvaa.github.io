import { delay } from "@/lib/delay";
import { contact, contacts, site } from "@/lib/content";

export default function Contact() {
  return (
    <section id="kontak" className="section border-t border-line">
      <div className="shell">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="mono-label">{contact.label}</p>
          <h2 className="mt-3 text-[clamp(26px,6vw,44px)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-[15px] leading-relaxed text-muted">
            {contact.paragraph}
          </p>
        </div>

        {/* Kartu kontak */}
        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {contacts.map((item, i) => {
            const inner = (
              <>
                <span className="flex w-full items-center justify-between gap-3">
                  <span className="mono-label text-[10.5px]">{item.label}</span>
                  {item.pending ? (
                    <span className="rounded-full border border-line-2 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted">
                      Segera
                    </span>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon"
                    >
                      <path
                        d="M5 11L11 5M11 5H6.2M11 5v4.8"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="mt-4 block break-all text-left text-[15.5px] font-semibold tracking-tight text-ink">
                  {item.handle}
                </span>
              </>
            );

            return (
              <li key={item.label} className="reveal" style={delay(i * 70)}>
                {item.pending || !item.url ? (
                  <div
                    aria-disabled="true"
                    className="panel flex h-full cursor-not-allowed flex-col items-start p-6 opacity-60"
                  >
                    {inner}
                  </div>
                ) : (
                  <a
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="panel panel-hover group flex h-full flex-col items-start p-6"
                  >
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA utama */}
        <div
          className="reveal mt-12 flex flex-col items-center gap-4"
          style={delay(200)}
        >
          <a href={site.cv.path} download className="btn btn-primary px-7 py-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 2v8m0 0L4.8 6.8M8 10l3.2-3.2M3 13h10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {site.cv.label}
          </a>
          <p className="mono-label text-[10px]">
            PDF · diperbarui {site.cv.updated}
          </p>
        </div>
      </div>
    </section>
  );
}
