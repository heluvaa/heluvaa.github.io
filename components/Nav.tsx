"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  /* Background nav muncul setelah melewati hero — sekali listener, di-throttle
     lewat requestAnimationFrame supaya tidak memicu layout thrash. */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight link sesuai section yang sedang dibaca */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Kunci scroll saat menu mobile terbuka */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        {/* Monogram */}
        <a
          href="#top"
          aria-label={`Kembali ke atas — ${site.name}`}
          className="group flex items-center gap-2.5"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-line-2 bg-panel font-mono text-[12.5px] font-bold text-neon transition-colors duration-300 group-hover:border-neon/50">
            {site.initials}
          </span>
          <span className="hidden text-[13px] font-semibold tracking-tight text-ink-soft sm:block">
            {site.first}
          </span>
        </a>

        {/* Desktop */}
        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-neon"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.cv.path}
            download
            className="btn btn-primary hidden sm:inline-flex px-5 py-2.5 text-[13px]"
          >
            {site.cv.label}
          </a>

          {/* Toggle mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line-2 bg-panel text-ink transition-colors duration-300 hover:border-neon/50 hover:text-neon md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={open ? "M4 4l10 10M14 4L4 14" : "M2.5 5.5h13M2.5 12.5h13"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Panel mobile */}
      <div
        id="menu-mobile"
        className={`overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Navigasi mobile" className="shell py-4">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-3.5 text-[15px] font-medium text-ink-soft transition-colors hover:text-neon"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.cv.path}
            download
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-5 w-full"
          >
            {site.cv.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
