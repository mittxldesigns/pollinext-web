"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useFocusTrap } from "@/components/ui/useFocusTrap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

export type SlideVideo = { slug: string; name: string; role: string; quote?: string };

const mp4 = (slug: string) => `/testi/${slug}.mp4`;
const poster = (slug: string) => `/testi/${slug}.jpg`;

/**
 * "Client Success Stories", paged slideshow matching the old pollinext.com section:
 * 3 vertical video cards per view (1 on mobile, 2 on tablet) with the client's name +
 * a short quote below each. Scroll-snaps per card, paged via ◀ ▶ and dots, gently
 * auto-advances (pauses on hover or while the lightbox is open). Clicking a card opens
 * the testimonial video full-screen.
 */
export function TestimonialSlideshow({ videos }: { videos: SlideVideo[] }) {
  const [open, setOpen] = useState<SlideVideo | null>(null);
  const trapRef = useFocusTrap<HTMLDivElement>(!!open);
  const railRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const [active, setActive] = useState(0);

  const cardStep = () => {
    const rail = railRef.current;
    if (!rail) return 0;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 20 : rail.clientWidth;
  };

  // gentle auto-advance (slideshow), paused on hover / lightbox / reduced-motion
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (hoverRef.current || open) return;
      if (rail.scrollLeft + rail.clientWidth + 8 >= rail.scrollWidth) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        rail.scrollBy({ left: cardStep(), behavior: "smooth" });
      }
    }, 4500);
    return () => window.clearInterval(id);
  }, [open]);

  // lightbox lifecycle: Escape + scroll-lock
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

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    setActive(Math.round(rail.scrollLeft / cardStep()));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous testimonials"
        className="absolute -left-2 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/70 text-white backdrop-blur transition-colors hover:border-gold/50 hover:text-gold sm:grid"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next testimonials"
        className="absolute -right-2 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/70 text-white backdrop-blur transition-colors hover:border-gold/50 hover:text-gold sm:grid"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={railRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 py-2 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
      >
        {videos.map((v) => (
          <div
            key={v.slug}
            data-card
            className="flex shrink-0 basis-[76%] snap-center flex-col sm:basis-[44%] lg:basis-[30%]"
          >
            <button
              type="button"
              onClick={() => setOpen(v)}
              aria-label={`Play testimonial: ${v.name}, ${v.role}`}
              className="group/card relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-gold/40 bg-black"
              style={{ boxShadow: "0 0 0 1px rgba(216,168,92,0.22), 0 22px 60px -28px rgba(216,168,92,0.5)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster(v.slug)}
                alt={`${v.name}, ${v.role}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover/card:scale-110">
                <Play size={22} className="ml-0.5" fill="currentColor" />
              </span>
            </button>

            <div className="mt-4 px-1 text-center">
              <p className="text-sm font-semibold text-white">{v.name}</p>
              <p className="text-xs text-dim">{v.role}</p>
              {v.quote && (
                <p className="mt-2 text-sm italic leading-snug text-muted">&ldquo;{v.quote}&rdquo;</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* paging dots */}
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {videos.map((v, i) => (
          <button
            key={v.slug}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => {
              const rail = railRef.current;
              if (rail) rail.scrollTo({ left: i * cardStep(), behavior: "smooth" });
            }}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === active ? "bg-gold" : "bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
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
              className="max-h-[80vh] w-auto max-w-[min(94vw,460px)] rounded-2xl border border-gold/40 bg-black shadow-2xl"
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
