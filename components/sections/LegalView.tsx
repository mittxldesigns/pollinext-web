import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalDoc } from "@/lib/pages";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Shared layout for Terms / Privacy — readable column + sticky TOC on desktop. */
export function LegalView({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} subtitle={doc.intro} />

      <section className="relative px-4 pb-28">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[220px_1fr]">
          {/* table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs uppercase tracking-[0.18em] text-dim">On this page</p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {doc.sections.map((s) => (
                  <a
                    key={s.heading}
                    href={`#${slug(s.heading)}`}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {s.heading}
                  </a>
                ))}
              </nav>
              <p className="mt-8 text-xs text-dim">Last updated: {doc.lastUpdated}</p>
            </div>
          </aside>

          {/* content */}
          <div className="max-w-2xl">
            <p className="mb-10 text-sm text-dim lg:hidden">Last updated: {doc.lastUpdated}</p>
            <div className="space-y-10">
              {doc.sections.map((s, i) => (
                <Reveal key={s.heading} delay={Math.min(i, 4) * 0.04}>
                  <section id={slug(s.heading)} className="scroll-mt-28">
                    <h2 className="text-xl font-semibold text-white">{s.heading}</h2>
                    {s.body?.map((p, j) => (
                      <p key={j} className="mt-3 leading-relaxed text-muted">
                        {p}
                      </p>
                    ))}
                    {s.bullets && (
                      <ul className="mt-4 space-y-2">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
