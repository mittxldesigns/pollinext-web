"use client";

import { useRef, type ReactNode } from "react";

/** Card wrapper that tracks the cursor and exposes --mx/--my for the `.spotlight`
 *  CSS glow. Updates CSS vars directly (no React re-render) so it stays cheap. */
export function Spotlight({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
