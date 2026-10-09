import type { Mockup } from "@/lib/content";

/**
 * Pratinjau mini aplikasi — dirender sebagai UI asli di dalam bingkai
 * ponsel, bukan gambar. Jadi tidak ada gambar rusak dan isinya selalu
 * ikut berubah saat data konten diubah.
 */
export default function MockupAplikasi({
  mockup,
  contoh = false,
}: {
  mockup: Mockup;
  contoh?: boolean;
}) {
  const isChart = mockup.jenis === "chart";

  return (
    <div className="relative select-none" aria-hidden="true">
      {/* Bingkai ponsel */}
      <div className="mx-auto w-full max-w-[300px] rounded-[26px] border border-line-2 bg-bg-soft p-2.5 shadow-[0_18px_40px_-24px_rgba(15,19,32,.45)]">
        <div className="overflow-hidden rounded-[18px] border border-line bg-surface">
          {/* Bilah atas */}
          <div className="flex items-center justify-between gap-2 border-b border-line bg-bg-soft px-3 py-2.5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
              {mockup.judul}
            </span>
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-line-2" />
              <span className="h-1.5 w-1.5 rounded-full bg-line-2" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            </span>
          </div>

          {/* Isi */}
          <ul className="divide-y divide-line">
            {mockup.baris.map((b) => (
              <li key={b.label} className="flex items-center gap-3 px-3 py-2.5">
                {isChart ? (
                  <>
                    <span className="flex-1 truncate text-[11.5px] font-medium text-ink-soft">
                      {b.label}
                    </span>
                    <span className="h-1.5 w-14 overflow-hidden rounded-full bg-line">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${b.bar ?? 50}%` }}
                      />
                    </span>
                    <span className="w-[52px] flex-none text-right font-mono text-[10.5px] font-bold text-ink">
                      {b.nilai}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-lg bg-primary-soft font-mono text-[8.5px] font-bold text-primary-dark">
                      {b.label.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="flex-1 truncate text-[11.5px] font-medium text-ink-soft">
                      {b.label}
                    </span>
                    <span className="flex-none font-mono text-[10.5px] font-bold text-ink">
                      {b.nilai}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {contoh && (
        <span className="badge-contoh absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white">
          tampilan contoh
        </span>
      )}
    </div>
  );
}
