"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * The hero gold sphere.
 *  - inner: continuous idle float + breathe loop (CSS, hydration-safe)
 *  - middle: reacts to scroll *velocity* — drifts & tilts more the faster you scroll, springs back when you stop
 *  - outer: scroll *position* parallax
 * Elements (and the scroll-target ref) render on the server too; only the transform
 * styles are applied after mount, so hydration stays clean and the ref is hydrated.
 */
export function HeroOrb({ className = "", size = 560 }: { className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  const rawVel = useVelocity(scrollY);
  const vel = useSpring(rawVel, { stiffness: 90, damping: 28, mass: 0.7 });
  const velY = useTransform(vel, [-3000, 0, 3000], [55, 0, -55]);
  const velRotate = useTransform(vel, [-3000, 0, 3000], [-9, 0, 9]);

  const animate = mounted && !reduce;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={animate ? { y: parallaxY } : undefined}
      className={`absolute ${className}`}
    >
      <motion.div style={animate ? { y: velY, rotate: velRotate } : undefined}>
        <div className="sphere animate-hero-float" style={{ width: size, height: size }} />
      </motion.div>
    </motion.div>
  );
}
