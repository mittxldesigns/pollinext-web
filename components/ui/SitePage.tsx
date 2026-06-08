import type { ReactNode } from "react";
import { Nav } from "@/components/sections/Nav";
import { Closing } from "@/components/sections/Closing";

/** Shared shell for every inner page — keeps nav, footer and CTA identical site-wide. */
export function SitePage({ children }: { children: ReactNode }) {
  return (
    <main className="relative overflow-x-clip">
      <Nav />
      {children}
      <Closing />
    </main>
  );
}
