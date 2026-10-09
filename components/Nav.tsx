"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { nav, site } from "@/lib/content";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu tiap kali pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/85 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-line shadow-[0_6px_24px_-18px_rgba(15,19,32,.5)]" : "border-transparent"
      }`}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${site.nama} — kembali ke beranda`}
          className="flex items-center gap-2.5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-mono text-[12.5px] font-bold text-white">
            {site.inisial}
          </span>
          <span className="text-[15px] font-extrabold tracking-tight text-ink">
            {site.nama}
          </span>
        </Link>

        {/* Desktop */}
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-primary-soft text-primary-dark"
                      : "text-ink-soft hover:bg-bg-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="h-10 w-10" />

          <Link
            href="/request-custom"
            className="btn btn-primary hidden sm:inline-flex px-5 py-2.5 text-[13.5px]"
          >
            Request Custom
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line-2 bg-surface text-ink transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2.5 5.5h13M2.5 12.5h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Panel mobile */}
      <div
        id="menu-mobile"
        className={`overflow-hidden border-t border-line bg-bg transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Navigasi mobile" className="shell py-3">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block border-b border-line/70 py-3.5 text-[15px] font-semibold transition-colors ${
                    isActive(item.href) ? "text-primary-dark" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-bg-soft px-4 py-3">
            <span className="text-[13.5px] font-semibold text-ink-soft">
              Mode gelap
            </span>
            <ThemeToggle className="h-9 w-9" />
          </div>
          <Link href="/request-custom" className="btn btn-primary mt-4 w-full">
            Request Custom
          </Link>
        </nav>
      </div>
    </header>
  );
}
