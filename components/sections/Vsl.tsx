import { Play, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { vsl } from "@/lib/content";

/**
 * SECTION 8 — masterclass / insight videos. Per the client's Google-doc mockup:
 * a row of cards, each with a video thumbnail on top and a "Watch Now" button below.
 * Cards with a `youtubeId` play in an on-page lightbox; until an id is supplied the
 * card shows its poster and the button books a call (graceful, never a dead button).
 */
export function Vsl() {
  return (
    <section id="masterclass" className="relative px-4 py-24">
      <Orb variant="glow" size={460} className="-left-44 top-16" />
      <Orb variant="glow" size={380} className="-right-36 bottom-10 hidden lg:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">{vsl.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-gradient mt-4 font-semibold tracking-tight" style={{ fontSize: "clamp(1.9rem,4.2vw,3rem)" }}>
              {vsl.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {vsl.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vsl.videos.map((v, i) => {
            const thumb = v.youtubeId
              ? `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`
              : v.poster;

            const frame = (
              <div className="group/card relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/40 bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={v.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-black shadow-xl transition-transform duration-300 group-hover/card:scale-110">
                  <Play size={26} className="ml-1" fill="currentColor" />
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                  {v.duration}
                </span>
              </div>
            );

            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div
                  className="card-grad flex h-full flex-col gap-4 p-3"
                  style={{ boxShadow: "0 0 0 1px rgba(216,168,92,0.18), 0 24px 70px -30px rgba(216,168,92,0.5)" }}
                >
                  {v.youtubeId ? (
                    <VideoPlayer
                      youtubeId={v.youtubeId}
                      title={v.title}
                      triggerClassName="block w-full"
                    >
                      {frame}
                    </VideoPlayer>
                  ) : (
                    frame
                  )}

                  <div className="flex items-center justify-between gap-3 px-2 pb-1">
                    <p className="text-sm font-semibold leading-snug text-white">{v.title}</p>
                  </div>

                  {v.youtubeId ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dark mx-2 mb-2 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold"
                    >
                      Watch Now <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <a
                      href="/contact"
                      className="btn-dark mx-2 mb-2 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold"
                    >
                      Watch Now <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
