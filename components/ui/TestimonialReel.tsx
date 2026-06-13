"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { useFocusTrap } from "@/components/ui/useFocusTrap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

export type ReelVideo = { slug: string; name: string; role: string };

const mp4 = (slug: string) => `/testi/${slug}.mp4`;
const poster = (slug: string) => `/testi/${slug}.jpg`;

/**
 * Auto-scrolling, centered ticker of vertical (9:16) testimonial reels.
 * Clicking a card opens a full-viewport, centered lightbox that plays the
 * self-hosted MP4. While the lightbox is open the ticker pauses, the page
 * scroll is frozen (Lenis stopped), and focus is trapped in the dialog.
 */
export function TestimonialReel({ videos }: { videos: ReelVideo[] }) {
  const [open, setOpen] = useState<ReelVideo | null>(null);
  const trapRef = useFocusTrap<HTMLDivElement>(!!open);
  // duplicate so the marquee loops seamlessly; the clone half is hidden from AT.
  const row = [...videos, ...videos];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  return (
    <>
      {/* full-bleed, edge-faded ticker — symmetric so it reads centered, not offset.
          Pauses on hover OR keyboard focus; scrollable when motion is reduced. */}
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
        <div
          className="flex w-max items-stretch gap-5 animate-marquee-slow group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          style={{ animationPlayState: open ? "paused" : undefined }}
        >
          {row.map((v, i) => {
            const clone = i >= videos.length;
            return (
              <button
                key={`${v.slug}-${i}`}
                type="button"
                onClick={() => setOpen(v)}
                aria-hidden={clone || undefined}
                tabIndex={clone ? -1 : undefined}
                aria-label={`Play testimonial: ${v.name} — ${v.role}`}
                className="group/card relative block aspect-[9/16] w-[220px] shrink-0 overflow-hidden rounded-3xl border border-gold/40 bg-black sm:w-[250px]"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(216,168,92,0.25), 0 24px 70px -24px rgba(216,168,92,0.5)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poster(v.slug)}
                  alt={`${v.name} — ${v.role}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover/card:scale-110">
                  <Play size={22} className="ml-1" fill="currentColor" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <span className="block text-sm font-semibold text-white">{v.name}</span>
                  <span className="block text-xs text-white/70">{v.role}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* full-viewport centered lightbox */}
      {open && (
        <div
          ref={trapRef}
          tabIndex={-1}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} testimonial`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[130] grid place-items-center bg-black/90 p-4 outline-none backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <X size={20} />
          </button>
          <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={mp4(open.slug)}
              poster={poster(open.slug)}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-auto max-w-[min(94vw,480px)] rounded-2xl border border-gold/40 bg-black shadow-2xl"
            />
            <p className="max-w-[94vw] text-center text-sm text-white/80">
              <span className="font-semibold text-white">{open.name}</span> · {open.role}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
