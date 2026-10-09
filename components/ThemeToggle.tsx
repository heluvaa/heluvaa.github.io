"use client";

/**
 * Tombol ganti tema.
 *
 * Tanpa state React sama sekali — tombolnya hanya membalik atribut
 * `data-theme` di <html> dan menyimpannya. Tampilan ikon diatur CSS
 * lewat varian `dark:`, jadi tidak ada risiko salah render saat hidrasi.
 */
export default function ThemeToggle({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const balik = () => {
    const akar = document.documentElement;
    const sekarang = akar.getAttribute("data-theme");
    const berikut = sekarang === "dark" ? "light" : "dark";
    akar.setAttribute("data-theme", berikut);
    try {
      localStorage.setItem("tema", berikut);
    } catch {
      /* localStorage diblokir — tema tetap berubah untuk sesi ini */
    }
  };

  return (
    <button
      type="button"
      onClick={balik}
      aria-label="Ganti mode terang atau gelap"
      title="Ganti mode terang / gelap"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-line-2 bg-surface text-ink-soft transition-colors duration-200 hover:border-primary hover:text-primary ${className}`}
    >
      {/* Bulan → tampil saat tema terang */}
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="dark:hidden"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
      {/* Matahari → tampil saat tema gelap */}
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="hidden dark:block"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {label && <span className="text-[13px] font-semibold">{label}</span>}
    </button>
  );
}
