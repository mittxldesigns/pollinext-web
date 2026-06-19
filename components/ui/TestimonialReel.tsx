"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useFocusTrap } from "@/components/ui/useFocusTrap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

export type ReelVideo = { slug: string; name: string; role: string };

const mp4 = (slug: string) => `/testi/${slug}.mp4`;
const poster = (slug: string) => `/testi/${slug}.jpg`;

/**
 * Vertical (9:16) testimonial reels on a horizontal rail that BOTH auto-scrolls
 * AND can be controlled (drag, swipe, or the ◀ ▶ buttons). Auto-scroll pauses on
 * any interaction. Clicking a card opens a full-viewport lightbox (focus-trapped,
 * page scroll frozen). The rail content is duplicated for a seamless loop.
 */
export function TestimonialReel({ videos }: { videos: ReelVideo[] }) {
  const [open, setOpen] = useState<ReelVideo | null>(null);
  const trapRef = useFocusTrap<HTMLDivElement>(!!open);
  const railRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const drag = useRef<{ active: boolean; startX: number; startLeft: number; moved: boolean }>({
    active: false,
    startX: 0,
    startLeft: 0,
    moved: false,
  });
  const row = [...videos, ...videos];

  // auto-scroll loop — slow, seamless wrap at the half-way point
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      if (!pausedRef.current && !open) {
        rail.scrollLeft += 0.6;
        const half = rail.scrollWidth / 2;
        if (rail.scrollLeft >= half) rail.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // lightbox lifecycle: Escape, scroll-lock
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

  const step = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const by = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * by, behavior: "smooth" });
  }, []);

  // pointer drag (desktop); touch uses native scroll
  const onPointerDown = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || e.pointerType === "touch") return;
    drag.current = { active: true, startX: e.clientX, startLeft: rail.scrollLeft, moved: false };
    pausedRef.current = true;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    rail.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div className="relative">
      {/* arrow controls */}
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous testimonials"
        className="absolute -left-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/70 text-white backdrop-blur transition-colors hover:border-gold/50 hover:text-gold sm:grid"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next testimonials"
        className="absolute -right-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/70 text-white backdrop-blur transition-colors hover:border-gold/50 hover:text-gold sm:grid"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={railRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => {
          pausedRef.current = false;
          endDrag();
        }}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto py-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] active:cursor-grabbing"
      >
        {row.map((v, i) => {
          const clone = i >= videos.length;
          return (
            <button
              key={`${v.slug}-${i}`}
              data-card
              type="button"
              onClick={() => {
                if (drag.current.moved) return; // ignore click that ended a drag
                setOpen(v);
              }}
              aria-hidden={clone || undefined}
              tabIndex={clone ? -1 : undefined}
              aria-label={`Play testimonial: ${v.name} — ${v.role}`}
              className="group/card relative block aspect-[9/16] w-[280px] shrink-0 select-none overflow-hidden rounded-3xl border border-gold/40 bg-black sm:w-[340px]"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(216,168,92,0.25), 0 28px 80px -26px rgba(216,168,92,0.5)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster(v.slug)}
                alt={`${v.name} — ${v.role}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover/card:scale-110">
                <Play size={26} className="ml-1" fill="currentColor" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                <span className="block text-base font-semibold text-white">{v.name}</span>
                <span className="block text-sm text-white/70">{v.role}</span>
              </span>
            </button>
          );
        })}
      </div>

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
    </div>
  );
}
