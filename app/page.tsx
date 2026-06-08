import { Fragment } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Results } from "@/components/sections/Results";
import { ProofGallery } from "@/components/sections/ProofGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Founder } from "@/components/sections/Founder";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Closing } from "@/components/sections/Closing";
import { revealedCount } from "@/lib/reveal";

// Rendered per request so the IST date (and thus the unlocked sections) is always current.
export const dynamic = "force-dynamic";

export default function Home() {
  const sections = [
    { id: "hero", node: <Hero /> },
    { id: "stats", node: <Stats /> },
    { id: "process", node: <Process /> },
    { id: "services", node: <Services /> },
    { id: "results", node: <Results /> },
    { id: "proof", node: <ProofGallery /> },
    { id: "testimonials", node: <Testimonials /> },
    { id: "founder", node: <Founder /> },
    { id: "roi", node: <RoiCalculator /> },
    { id: "pricing", node: <Pricing /> },
    { id: "faqs", node: <Faq /> },
    { id: "contact", node: <Contact /> },
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
