import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { vsl } from "@/lib/content";

/** SECTION 8 — "Insights / Appointment Setting Masterclass" VSL (from the old pollinext.com). */
export function Vsl() {
  const v = vsl.video;

  const frameClass =
    "group relative mx-auto block aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/45 bg-surface-2";
  const frameStyle = {
    boxShadow: "0 0 0 1px rgba(216,168,92,0.30), 0 28px 90px -28px rgba(216,168,92,0.6)",
  } as const;

  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={v.poster}
        alt={v.label}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play size={26} className="ml-0.5 fill-black" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5 text-center text-sm font-semibold tracking-wide text-white">
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
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-[40px] opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(216,168,92,0.4), rgba(166,124,59,0.15) 55%, transparent 75%)",
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
