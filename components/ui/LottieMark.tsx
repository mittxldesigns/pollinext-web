"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import pulse from "./pulse.json";

// lottie-web touches `window`, so load the player client-side only.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/** Small abstract gold "sonar pulse" — an original Lottie used as a live-activity motif. */
export function LottieMark({ size = 56, className = "" }: { size?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span
      aria-hidden
      className={className}
      style={{ display: "inline-block", width: size, height: size }}
    >
      <Lottie animationData={pulse} loop autoplay={!reduce} />
    </span>
  );
}
