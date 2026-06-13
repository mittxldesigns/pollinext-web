import type Lenis from "lenis";

// Lenis owns scroll programmatically, so `overflow:hidden` alone does NOT stop the
// page drifting behind a modal — we must call lenis.stop()/start(). SmoothScroll
// registers its instance here; modals lock/unlock through these helpers.
let lenis: Lenis | null = null;
let locks = 0;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Freeze background scroll while a modal/lightbox is open (reference-counted). */
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    lenis?.stop();
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "hidden";
    }
  }
}

/** Release one lock; restores scroll once the last modal closes. */
export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    lenis?.start();
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
    }
  }
}
