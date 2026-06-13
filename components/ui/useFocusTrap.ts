"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),video,input,select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * Focus management for an aria-modal dialog: on open, move focus into the dialog;
 * trap Tab / Shift+Tab inside it; on close, restore focus to whatever opened it.
 * Attach the returned ref to the dialog container (give it tabIndex={-1}).
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    const restoreTo = document.activeElement as HTMLElement | null;

    const focusables = () =>
      root
        ? Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.offsetParent !== null || el === document.activeElement
          )
        : [];

    (focusables()[0] ?? root)?.focus?.();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !root) return;
      const f = focusables();
      if (f.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = f[0];
      const last = f[f.length - 1];
      const act = document.activeElement;
      if (e.shiftKey && (act === first || act === root)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && act === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      restoreTo?.focus?.();
    };
  }, [active]);

  return ref;
}
