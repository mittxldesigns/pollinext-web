import { Fragment } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Results } from "@/components/sections/Results";
import { Founder } from "@/components/sections/Founder";
import { Vsl } from "@/components/sections/Vsl";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Closing } from "@/components/sections/Closing";
import { revealedCount } from "@/lib/reveal";

// Rendered per request so the IST date (and thus the unlocked sections) is always current.
export const dynamic = "force-dynamic";

export default function Home() {
  // Order follows the client design doc, SECTION 2–11 (SECTION 1 = nav, always live;
  // SECTION 11 = Closing, structural chrome rendered outside the drip array).
  const sections = [
    { id: "hero", node: <Hero /> }, // S2
    { id: "stats", node: <Stats /> }, // S3
    { id: "testimonials-video", node: <Testimonials show="video" /> }, // S4
    { id: "pricing", node: <Pricing /> }, // S5
    { id: "results", node: <Results /> }, // S6
    { id: "founder", node: <Founder /> }, // S7
    { id: "masterclass", node: <Vsl /> }, // S8
    { id: "roi", node: <RoiCalculator /> }, // S9
    { id: "testimonials-marquee", node: <Testimonials show="marquee" /> }, // S10
  ];

  const total = sections.length;
  const revealed = revealedCount(total);
  const shown = sections.slice(0, revealed);

  // Nav links point to standalone pages (always live), so the full menu shows from day one
  // even while the homepage's own sections drip in over time.
  return (
    <main className="relative overflow-x-clip">
      <Nav />
      {shown.map((s) => (
        <Fragment key={s.id}>{s.node}</Fragment>
      ))}
      {/* Footer/CTA is structural chrome — always shown, never drip-gated. */}
      <Closing />
    </main>
  );
}
