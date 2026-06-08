import type { Metadata } from "next";
import { SitePage } from "@/components/ui/SitePage";
import { CareerView } from "@/components/sections/CareerView";
import { careers } from "@/lib/pages";

export const metadata: Metadata = {
  title: careers["career-setters"].role,
  description: careers["career-setters"].subtitle,
  alternates: { canonical: "/career-setters" },
};

export default function CareerSettersPage() {
  return (
    <SitePage>
      <CareerView which="career-setters" />
    </SitePage>
  );
}
