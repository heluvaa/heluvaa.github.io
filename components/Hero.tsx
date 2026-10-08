import Avatar from "@/components/Avatar";
import { delay } from "@/lib/delay";
import { hero, marqueeWords, projects, site, skills } from "@/lib/content";

export default function Hero() {
  const facts = [
    { value: String(projects.length).padStart(2, "0"), label: "Proyek live" },
    { value: String(skills.length).padStart(2, "0"), label: "Teknologi" },
    { value: site.location, label: "Basis" },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      {/* Latar dekoratif */}
      <div aria-hidden="true" className="deco absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-x-0 top-0 h-[560px]" />
        <div className="glow-neon absolute -top-32 left-[-10%] h-[420px] w-[420px] opacity-50" />
        <div className="glow-violet absolute right-[-12%] top-24 h-[460px] w-[460px] opacity-45" />
      </div>

      <div className="shell grid items-center gap-14 py-[clamp(56px,11vw,120px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Kolom teks */}
        <div>
          <span
            className="reveal chip chip-accent"
            style={delay(0)}
          >
            <span className="dot-live" aria-hidden="true" />
            {hero.badge}
          </span>

          <h1
            className="reveal mt-7 text-[clamp(38px,8.2vw,72px)] font-extrabold leading-[0.98] tracking-[-0.035em]"
            style={delay(80)}
          >
            {site.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="grad-text">
              {site.name.split(" ").slice(2).join(" ")}
            </span>
          </h1>

          <p
            className="reveal mt-6 font-mono text-[clamp(13px,3.4vw,15.5px)] text-neon"
            style={delay(140)}
          >
            {hero.headlineLead} {hero.headlineAccent}
          </p>

          <p
            className="reveal mt-1 text-[clamp(15px,4vw,19px)] font-medium tracking-tight text-ink-soft"
            style={delay(180)}
          >
            {site.role}
          </p>

          <p
            className="reveal mt-6 max-w-[52ch] text-[15px] leading-relaxed text-muted"
            style={delay(240)}
          >
            {hero.paragraph}
          </p>

          <div
            className="reveal mt-9 flex flex-wrap items-center gap-3"
            style={delay(300)}
          >
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </a>
          </div>

          {/* Fakta — angkanya dihitung dari file konten */}
          <dl
            className="reveal mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-7"
            style={delay(360)}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="mono-label text-[10px]">{fact.label}</dt>
                <dd className="mt-1.5 text-[19px] font-bold tracking-tight text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Kolom avatar */}
        <div className="reveal" style={delay(200)}>
          <Avatar />
        </div>
      </div>

      {/* Marquee kata kunci */}
      <div className="reveal border-y border-line bg-bg-soft/60 py-4">
        <div className="marquee-mask">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? "true" : undefined}
                className="flex shrink-0 items-center"
              >
                {marqueeWords.map((word) => (
                  <li
                    key={`${copy}-${word}`}
                    className="flex items-center gap-6 px-6 font-mono text-[12.5px] uppercase tracking-[0.18em] text-muted"
                  >
                    {word}
                    <span className="text-neon" aria-hidden="true">
                      ◆
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
