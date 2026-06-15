"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

/**
 * Controllable horizontal image carousel (booking/payment proof, from pollinext.com).
 * Auto-scrolls slowly but is fully controllable — drag, swipe, or the ◀ ▶ buttons.
 * Clicking an image opens it full-size in a lightbox so the proof is readable.
 */
export function BookedCarousel({ images }: { images: string[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [zoom, setZoom] = useState<string | null>(null);
  const row = [...images, ...images];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      if (!pausedRef.current && !zoom) {
        rail.scrollLeft += 0.4;
        const half = rail.scrollWidth / 2;
        if (rail.scrollLeft >= half) rail.scrollLeft -= half;
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
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const by = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * by, behavior: "smooth" });
  }, []);

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

  return (
    <div className="relative">
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
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => {
          pausedRef.current = false;
          drag.current.active = false;
        }}
        onTouchStart={() => (pausedRef.current = true)}
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
              className="media-card relative block aspect-[9/16] w-[240px] shrink-0 select-none sm:w-[270px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Booking / payment confirmation"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="pointer-events-none h-full w-full object-cover"
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
            className="max-h-[88vh] w-auto max-w-[min(94vw,520px)] rounded-2xl border border-gold/40 shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
