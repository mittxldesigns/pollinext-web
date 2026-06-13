"use client";

import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/components/ui/useFocusTrap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

type Props = {
  /** YouTube id — used when no self-hosted `mp4` is given */
  youtubeId?: string;
  /** self-hosted file (e.g. /testi/gilad.mp4) — takes priority over youtubeId */
  mp4?: string;
  /** poster shown in the lightbox before an mp4 starts */
  poster?: string;
  title: string;
  /** classes for the clickable trigger (the poster/frame) */
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  /** portrait (9:16) lightbox for vertical/reel videos */
  portrait?: boolean;
  children: ReactNode;
};

/**
 * Click-to-play video that opens in an on-page lightbox — the page never navigates
 * away to YouTube. The embed iframe gets inline `pointer-events:auto` so it stays
 * clickable under Lenis (which sets `iframe { pointer-events:none }` while smooth-
 * scrolling), and the overlay carries `data-lenis-prevent` so the background doesn't
 * scroll behind it. youtube-nocookie keeps it privacy-friendly.
 */
export function VideoPlayer({
  youtubeId,
  mp4,
  poster,
  title,
  triggerClassName,
  triggerStyle,
  portrait = false,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Play video: ${title}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`cursor-pointer ${triggerClassName ?? ""}`}
        style={triggerStyle}
      >
        {children}
      </div>

      {open && (
        <div
          ref={trapRef}
          tabIndex={-1}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-4 outline-none backdrop-blur-sm sm:p-8"
        >
          <div
            className={`relative w-full ${portrait ? "max-w-[360px]" : "max-w-4xl"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/45 text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <X size={18} />
            </button>
            <div
              className={`relative w-full overflow-hidden rounded-2xl border border-gold/40 bg-black shadow-2xl ${
                portrait ? "aspect-[9/16]" : "aspect-video"
              }`}
            >
              {mp4 ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  className="absolute inset-0 h-full w-full"
                  style={{ pointerEvents: "auto" }}
                  src={mp4}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  style={{ pointerEvents: "auto" }}
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={title}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
