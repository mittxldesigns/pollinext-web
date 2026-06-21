"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

/**
 * "Real Results" proof carousel — square, contained cards (full screenshot visible,
 * gold border) matching the ProofGallery look on the other pages. Scroll behaves like
 * the Client Success Stories reel: slow autoscroll that BOTH pauses on hover/interaction
 * AND is controllable via ◀ ▶ buttons, drag or swipe. Clicking a card opens the
 * screenshot full-size in a lightbox so the proof stays readable.
 */
export function BookedCarousel({ images }: { images: string[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  // pause autoscroll while hovered (read live from DOM :hover, no enter/leave gaps) OR
  // for a short window after any manual interaction so the rAF loop never fights scrollBy.
  const pausedUntilRef = useRef(0);
  // float position accumulator — scrollLeft can round to integers, so a sub-pixel step
  // read back from the DOM would never advance; we keep the true float here.
  const posRef = useRef(0);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [zoom, setZoom] = useState<string | null>(null);
  const row = [...images, ...images];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const hovering = wrapRef.current?.matches(":hover") ?? false;
      if (!hovering && Date.now() >= pausedUntilRef.current && !zoom) {
        const half = rail.scrollWidth / 2;
        posRef.current += 0.6;
        if (posRef.current >= half) posRef.current -= half;
        rail.scrollLeft = posRef.current;
      } else {
        // stay in sync with manual scrolling (hover / drag / arrows) so autoscroll
        // resumes from wherever the user left it.
        posRef.current = rail.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [zoom]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    document.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [zoom]);

  const step = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    pausedUntilRef.current = Date.now() + 1600;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const by = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * by, behavior: "smooth" });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || e.pointerType === "touch") return;
    drag.current = { active: true, startX: e.clientX, startLeft: rail.scrollLeft, moved: false };
    pausedUntilRef.current = Date.now() + 1600;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    rail.scrollLeft = drag.current.startLeft - dx;
    pausedUntilRef.current = Date.now() + 1600;
  };

  return (
    <div ref={wrapRef} className="relative" onMouseLeave={() => (drag.current.active = false)}>
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous"
        className="absolute -left-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/70 text-white backdrop-blur transition-colors hover:border-gold/50 hover:text-gold sm:grid"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next"
        className="absolute -right-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/70 text-white backdrop-blur transition-colors hover:border-gold/50 hover:text-gold sm:grid"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={railRef}
        onTouchStart={() => (pausedUntilRef.current = Date.now() + 5000)}
        onTouchMove={() => (pausedUntilRef.current = Date.now() + 5000)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => (drag.current.active = false)}
        className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto py-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] active:cursor-grabbing"
      >
        {row.map((src, i) => {
          const clone = i >= images.length;
          return (
            <button
              key={`${src}-${i}`}
              data-card
              type="button"
              aria-hidden={clone || undefined}
              tabIndex={clone ? -1 : undefined}
              aria-label="View proof"
              onClick={() => {
                if (drag.current.moved) return;
                setZoom(src);
              }}
              className="group relative flex aspect-[4/3] w-[300px] shrink-0 select-none items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-[#0d0d0d] p-3 transition-colors duration-300 hover:border-gold/55 sm:w-[340px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Booking / payment confirmation"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="pointer-events-none max-h-full max-w-full rounded-lg object-contain shadow-lg"
              />
            </button>
          );
        })}
      </div>

      {zoom && (
        <div
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Proof image"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[130] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <X size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom}
            alt="Booking / payment confirmation"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-auto max-w-[min(94vw,900px)] rounded-2xl border border-gold/40 shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
