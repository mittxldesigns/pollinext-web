import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { vsl } from "@/lib/content";

/** SECTION 8 — "Insights / Appointment Setting Masterclass" VSL (from the old pollinext.com). */
export function Vsl() {
  const v = vsl.video;

  const frameClass =
    "group relative mx-auto block aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-gold/55 bg-surface-2";
  const frameStyle = {
    boxShadow:
      "0 0 0 1px rgba(216,168,92,0.45), 0 0 60px -10px rgba(216,168,92,0.5), 0 40px 120px -30px rgba(216,168,92,0.7)",
  } as const;

  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={v.poster}
        alt={v.label}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top opacity-70 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-gold text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Play size={32} className="ml-1 fill-black" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5 text-center text-base font-semibold tracking-wide text-white">
        {v.label}
      </span>
    </>
  );

  return (
    <section id="masterclass" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-right-40 top-16" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow">{vsl.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className="text-gradient mt-4 font-semibold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(1.9rem,4.2vw,3rem)" }}
          >
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

        <Reveal delay={0.18} className="relative mt-12">
          {/* blurred gold glow behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[95%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[48px] opacity-90 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(216,168,92,0.55), rgba(166,124,59,0.2) 55%, transparent 75%)",
            }}
          />
          {v.youtubeId ? (
            <VideoPlayer
              youtubeId={v.youtubeId}
              title={v.label}
              triggerClassName={frameClass}
              triggerStyle={frameStyle}
            >
              {inner}
            </VideoPlayer>
          ) : (
            <div className={frameClass} style={frameStyle} role="img" aria-label={v.label}>
              {inner}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
