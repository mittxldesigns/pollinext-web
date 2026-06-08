"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type OrbProps = {
  className?: string;
  variant?: "glow" | "sphere";
  size?: number;
  /** how far (px) the orb drifts across its scroll journey */
  speed?: number;
  parallax?: boolean;
};

/** Gold sphere / ambient glow that drifts on scroll for an abstract parallax feel.
 *  The element (and its scroll-target ref) is always rendered so it's present at
 *  hydration; only the transform style is applied after mount, which keeps SSR and
 *  the first client paint identical (no hydration mismatch, no unhydrated-ref error). */
export function Orb({
  className = "",
  variant = "glow",
  size = 520,
  speed = 90,
  parallax = true,
}: OrbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  const animate = mounted && parallax && !reduce;
  const cls = `${variant === "sphere" ? "sphere" : "orb-glow"} absolute ${className}`;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={animate ? { y, width: size, height: size } : { width: size, height: size }}
      className={cls}
    />
  );
}
