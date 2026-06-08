import { Play } from "lucide-react";
import { hero } from "@/lib/content";

/**
 * Hero showreel frame — sits on the right of the hero with a golden glow around its
 * border (per client spec). Resolution order:
 *   1. `hero.video.mp4`      → native <video controls> (no iframe, so Lenis-safe)
 *   2. `hero.video.youtubeId`→ poster that opens the video on YouTube in a new tab
 *      (an embedded iframe would be unclickable while Lenis smooth-scroll is active)
 *   3. neither set           → poster + play button linking to `fallbackHref`
 * It is therefore never "broken" while the real showreel is still being produced.
 */
export function HeroVideo() {
  const v = hero.video;

  const glow = (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-6 -z-10 rounded-[34px] opacity-80 blur-2xl"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 45%, rgba(216,168,92,0.45), rgba(166,124,59,0.18) 55%, transparent 75%)",
      }}
    />
  );

  const frameClass =
    "group relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/45 bg-surface-2";
  const frameStyle = {
    boxShadow:
      "0 0 0 1px rgba(216,168,92,0.30), 0 28px 90px -28px rgba(216,168,92,0.6)",
  } as const;

  if (v.mp4) {
    return (
      <div className="relative">
        {glow}
        <video
          className={frameClass}
          style={frameStyle}
          src={v.mp4}
          poster={v.poster}
          controls
          preload="metadata"
          playsInline
        />
      </div>
    );
  }

  const href = v.youtubeId
    ? `https://www.youtube.com/watch?v=${v.youtubeId}`
    : v.fallbackHref;
  const external = Boolean(v.youtubeId);

  return (
    <div className="relative">
      {glow}
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={v.label}
        className={`${frameClass} block`}
        style={frameStyle}
      >
        {/* poster */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={v.poster}
          alt={v.label}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* play button */}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play size={26} className="ml-0.5 fill-black" />
          </span>
        </span>

        <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 text-sm font-medium text-white">
          {v.label}
        </span>
      </a>
    </div>
  );
}
