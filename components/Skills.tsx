import { delay } from "@/lib/delay";
import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-line">
      <div className="shell">
        <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mono-label">Skills</p>
            <h2 className="mt-3 text-[clamp(28px,6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              Perkakas <span className="grad-text">harian</span>
            </h2>
          </div>
          <p className="max-w-[36ch] text-[14px] leading-relaxed text-muted">
            {skills.length} teknologi yang saya pakai untuk membangun dan
            merilis produk.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              className="reveal panel panel-hover group relative overflow-hidden p-6"
              style={delay(i * 70)}
            >
              {/* Aksen sudut yang menyala saat hover */}
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 h-16 w-16 translate-x-6 -translate-y-6 rounded-full bg-neon/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
              />

              <span className="mono-label text-[10px]">{skill.group}</span>

              <h3 className="mt-4 text-[19px] font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-neon">
                {skill.name}
              </h3>

              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                {skill.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
