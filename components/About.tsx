import { delay } from "@/lib/delay";
import { about, projects, skills } from "@/lib/content";

export default function About() {
  const facts = [
    { value: String(projects.length), label: "Proyek live" },
    { value: String(skills.length), label: "Teknologi dipakai" },
    { value: "TKJ", label: "Latar belakang" },
  ];

  return (
    <section id="tentang" className="section border-t border-line">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Kiri: label + kartu fakta */}
        <div className="reveal">
          <p className="mono-label">{about.label}</p>

          <div className="panel mt-7 p-6">
            <dl className="space-y-5">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                >
                  <dt className="text-[13.5px] text-muted">{fact.label}</dt>
                  <dd className="font-mono text-[16px] font-bold text-neon">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 border-t border-line pt-4 text-[11.5px] leading-relaxed text-muted">
              {about.factsNote}
            </p>
          </div>
        </div>

        {/* Kanan: cerita */}
        <div>
          <h2
            className="reveal text-[clamp(26px,5.6vw,42px)] font-extrabold leading-[1.08] tracking-[-0.03em]"
            style={delay(80)}
          >
            {about.heading}
          </h2>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24)}
                className="reveal max-w-[62ch] text-[15.5px] leading-[1.75] text-ink-soft"
                style={delay(160 + i * 80)}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            className="reveal mt-9 flex items-center gap-3 border-l-2 border-neon/40 pl-4"
            style={delay(340)}
          >
            <p className="text-[13px] leading-relaxed text-muted">
              Cerita di atas masih placeholder — akan diganti dengan kisah
              perjalanan aslinya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
