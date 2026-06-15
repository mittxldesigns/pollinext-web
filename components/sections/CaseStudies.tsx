import { Play, Check } from "lucide-react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/content";

/** Case studies — a vertical testimonial reel on one side, the write-up on the other. */
export function CaseStudies() {
  return (
    <section id="case-studies" className="relative px-4 py-24">
      <Orb variant="glow" size={440} className="-right-40 top-20 hidden lg:block" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            center
            eyebrow={caseStudies.eyebrow}
            title={caseStudies.title}
            subtitle={caseStudies.subtitle}
          />
        </div>

        <div className="mt-16 space-y-8">
          {caseStudies.items.map((c, i) => {
            const flip = i % 2 === 1; // alternate sides on desktop
            const poster = `/testi/${c.video}.jpg`;
            const mp4 = `/testi/${c.video}.mp4`;
            return (
              <Reveal key={c.client}>
                <article className="card-grad grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[320px_1fr] lg:gap-10">
                  {/* video */}
                  <VideoPlayer
                    mp4={mp4}
                    poster={poster}
                    portrait
                    title={`${c.client} — case study`}
                    triggerClassName={`group/v relative mx-auto block aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-2xl border border-gold/40 bg-black ${
                      flip ? "lg:order-2" : ""
                    }`}
                    triggerStyle={{
                      boxShadow: "0 0 0 1px rgba(216,168,92,0.25), 0 24px 70px -26px rgba(216,168,92,0.5)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={poster}
                      alt={`${c.client} testimonial`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/v:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
                    <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover/v:scale-110">
                      <Play size={26} className="ml-1" fill="currentColor" />
                    </span>
                  </VideoPlayer>

                  {/* info */}
                  <div className={flip ? "lg:order-1" : ""}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {c.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-white">
                      {c.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted">{c.body}</p>

                    <ul className="mt-6 space-y-2.5">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-white/85">
                          <Check size={18} className="mt-0.5 shrink-0 text-gold" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex gap-10 border-t border-line pt-6">
                      {c.stats.map((s) => (
                        <div key={s.label}>
                          <p className="text-3xl font-semibold tracking-tight text-white">{s.value}</p>
                          <p className="mt-1 text-xs text-dim">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
