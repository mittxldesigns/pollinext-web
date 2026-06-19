import { Fragment } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Problems } from "@/components/sections/Problems";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Pricing } from "@/components/sections/Pricing";
import { CallsBooked } from "@/components/sections/CallsBooked";
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
    { id: "hero", node: <Hero /> },
    { id: "stats", node: <Stats /> },
    { id: "testimonials-video", node: <Testimonials show="video" /> },
    { id: "problems", node: <Problems /> },
    { id: "who-we-help", node: <WhoWeHelp /> },
    { id: "pricing", node: <Pricing /> },
    { id: "calls-booked", node: <CallsBooked /> },
    { id: "founder", node: <Founder /> },
    { id: "masterclass", node: <Vsl /> },
    { id: "roi", node: <RoiCalculator /> },
    { id: "testimonials-marquee", node: <Testimonials show="marquee" /> },
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
