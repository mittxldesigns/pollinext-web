import type { Metadata } from "next";
import { SitePage } from "@/components/ui/SitePage";
import { CareerView } from "@/components/sections/CareerView";
import { careers } from "@/lib/pages";

export const metadata: Metadata = {
  title: careers["career-va"].role,
  description: careers["career-va"].subtitle,
  alternates: { canonical: "/career-va" },
};

export default function CareerVaPage() {
  return (
    <SitePage>
      <CareerView which="career-va" />
    </SitePage>
  );
}
