import { delay } from "@/lib/delay";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <section id="proyek" className="section">
      <div className="shell">
        {/* Header section */}
        <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mono-label">Proyek</p>
            <h2 className="mt-3 text-[clamp(28px,6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              Yang sudah <span className="grad-text">dirilis</span>
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14px] leading-relaxed text-muted">
            Dua proyek yang sudah live dan bisa dibuka sekarang. Keduanya
            berangkat dari kebutuhan belajar saya sendiri.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <article
              key={project.url}
              className="reveal panel panel-hover group flex flex-col p-7 sm:p-8"
              style={delay(i * 110)}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[12px] tracking-[0.2em] text-neon">
                  {project.index}
                </span>
                <span className="mono-label text-[10px]">Live</span>
              </div>

              <h3 className="mt-6 text-[23px] font-bold tracking-[-0.02em]">
                {project.title}
              </h3>
              <p className="mt-2 font-mono text-[12.5px] text-cy">
                {project.tagline}
              </p>

              <div className="mt-5 space-y-3 text-[14.5px] leading-relaxed text-muted">
                {project.description.map((sentence) => (
                  <p key={sentence}>{sentence}</p>
                ))}
              </div>

              {/* Tech stack */}
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              {/* CTA — didorong ke bawah supaya sejajar antar-kartu */}
              <div className="mt-7 border-t border-line pt-6">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  Visit Live
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 11L11 5M11 5H6.2M11 5v4.8"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">
                    — {project.title} (buka di tab baru)
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
