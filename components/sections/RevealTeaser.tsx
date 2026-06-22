"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { Orb } from "@/components/ui/Orb";
import { msToNextIstMidnight } from "@/lib/reveal";
import { brand } from "@/lib/content";

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}h ${p(m)}m ${p(sec)}s`;
}

export function RevealTeaser({ revealed, total }: { revealed: number; total: number }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(msToNextIstMidnight());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pct = Math.round((revealed / total) * 100);

  return (
    <section className="relative overflow-hidden px-4 pb-32 pt-12 text-center">
      <Orb variant="glow" size={420} className="-bottom-10 left-1/2 -translate-x-1/2" />
      <div className="relative z-10 mx-auto max-w-xl">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-gold/40 text-gold">
          <Lock size={20} />
        </span>
        <p className="eyebrow mt-6">Live reveal</p>
        <h2
          className="text-gradient mt-3 font-semibold tracking-tight"
          style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}
        >
          Day {revealed} of {total} unlocked
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The new Pollinext site is being revealed one section at a time. The next drop
          lands tomorrow, check back daily.
        </p>

        <div className="mx-auto mt-8 h-2 w-full max-w-sm overflow-hidden rounded-full bg-surface-3">
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg,#a67c3b,#d8a85c,#ecd2a0)" }}
          />
        </div>
        <p className="mt-3 text-sm text-dim">{pct}% revealed</p>

        <p className="mt-8 text-sm text-muted">
          Next section unlocks in{" "}
          <span className="font-semibold text-gold" suppressHydrationWarning>
            {left == null ? "…" : fmt(left)}
          </span>{" "}
          · IST
        </p>

        <a href={brand.bookingUrl} className="btn-gold mt-7 inline-block px-6 py-3.5">
          Book a Call
        </a>
      </div>
    </section>
  );
}
