import { Play, Check, ArrowUpRight } from "lucide-react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/content";

// YouTube channel for the "View more" button (client to confirm final URL).
const CHANNEL_URL = "https://www.youtube.com/@pollinext";

/** Case studies — 4 cards, each a HORIZONTAL (16:9) video on top + write-up below. */
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

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.items.map((c, i) => {
            const poster = `/testi/${c.video}.jpg`;
            const mp4 = `/testi/${c.video}.mp4`;
            // youtubeId is optional in data; client will supply landscape YouTube links.
            const yt = (c as { youtubeId?: string }).youtubeId;
            const frame = (
              <div className="group/v relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/40 bg-black">
                {/* blurred fill so a portrait poster fills the 16:9 frame cleanly */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : poster}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : poster}
                  alt={`${c.client} testimonial`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 z-10 h-full w-full object-contain transition-transform duration-500 group-hover/v:scale-[1.03]"
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 z-30 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover/v:scale-110">
                  <Play size={26} className="ml-1" fill="currentColor" />
                </span>
              </div>
            );
            return (
              <Reveal key={c.client} delay={i * 0.06}>
                <article className="card-grad flex h-full flex-col gap-5 p-5 sm:p-6">
                  <VideoPlayer
                    {...(yt ? { youtubeId: yt } : { mp4, poster })}
                    title={`${c.client} — case study`}
                    triggerClassName="block w-full"
                  >
                    {frame}
                  </VideoPlayer>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {c.category}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-white">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>

                    <ul className="mt-4 space-y-2">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-white/85">
                          <Check size={17} className="mt-0.5 shrink-0 text-gold" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex gap-8 border-t border-line pt-5">
                      {c.stats.map((s) => (
                        <div key={s.label}>
                          <p className="text-2xl font-semibold tracking-tight text-white">{s.value}</p>
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

        <div className="mt-12 flex justify-center">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark inline-flex items-center gap-1.5 px-6 py-3.5 text-sm font-semibold"
          >
            View more on YouTube <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
