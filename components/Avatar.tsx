import { site } from "@/lib/content";

/**
 * Avatar placeholder — monogram SVG, bukan foto wajah.
 *
 * GANTI DENGAN FOTO SENDIRI:
 *   1. Taruh file di `public/avatar.jpg` (rasio 1:1, minimal 800×800).
 *   2. Ganti isi komponen ini dengan:
 *        import Image from "next/image";
 *        <Image src="/avatar.jpg" alt={site.name} width={420} height={420}
 *               className="h-full w-full rounded-[28px] object-cover" priority />
 */
export default function Avatar() {
  return (
    <div className="relative mx-auto w-[min(360px,78vw)] lg:mx-0 lg:w-[400px]">
      {/* Glow di belakang avatar */}
      <div
        aria-hidden="true"
        className="deco glow-neon absolute -inset-10 -z-10 opacity-70"
      />
      <div
        aria-hidden="true"
        className="deco glow-violet absolute -bottom-12 -right-8 -z-10 h-40 w-40 opacity-60"
      />

      <div className="relative aspect-square">
        {/* Bingkai gradien */}
        <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-cy via-vi to-neon opacity-70 blur-[1px]" />
        <div className="absolute inset-[1.5px] overflow-hidden rounded-[29px] bg-bg-soft">
          <svg
            viewBox="0 0 400 400"
            role="img"
            aria-label={`Avatar placeholder ${site.name}`}
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="mono" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="55%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#00ffa3" />
              </linearGradient>
              <pattern
                id="grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M32 0H0v32"
                  fill="none"
                  stroke="#1b1f2b"
                  strokeWidth="1"
                />
              </pattern>
              <radialGradient id="fade" cx="50%" cy="45%" r="62%">
                <stop offset="0%" stopColor="#0b0d14" stopOpacity="0" />
                <stop offset="100%" stopColor="#05060a" stopOpacity="0.95" />
              </radialGradient>
            </defs>

            <rect width="400" height="400" fill="#07080d" />
            <rect width="400" height="400" fill="url(#grid)" />
            <rect width="400" height="400" fill="url(#fade)" />

            {/* Cincin orbit */}
            <circle
              cx="200"
              cy="200"
              r="132"
              fill="none"
              stroke="#1b1f2b"
              strokeWidth="1"
            />
            <circle
              cx="200"
              cy="200"
              r="112"
              fill="none"
              stroke="url(#mono)"
              strokeWidth="1.5"
              strokeDasharray="4 10"
              opacity="0.85"
            />

            {/* Monogram */}
            <text
              x="200"
              y="200"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="var(--font-jb), ui-monospace, monospace"
              fontSize="104"
              fontWeight="700"
              letterSpacing="6"
              fill="url(#mono)"
            >
              {site.initials}
            </text>

            {/* Bracket sudut, gaya teknis */}
            <g stroke="#00ffa3" strokeWidth="2.5" strokeLinecap="round">
              <path d="M56 96V56h40" fill="none" />
              <path d="M344 304v40h-40" fill="none" />
            </g>
          </svg>
        </div>

        {/* Badge status, menempel di sudut kartu */}
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line-2 bg-panel/95 px-3.5 py-2 backdrop-blur-sm">
          <span className="dot-live" aria-hidden="true" />
          <span className="mono-label text-[10.5px] text-ink-soft">
            {site.availability}
          </span>
        </div>
      </div>
    </div>
  );
}
