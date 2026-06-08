import type { Metadata } from "next";
import { SitePage } from "@/components/ui/SitePage";
import { CareerView } from "@/components/sections/CareerView";
import { careers } from "@/lib/pages";

export const metadata: Metadata = {
  title: careers["career-clg"].role,
  description: careers["career-clg"].subtitle,
  alternates: { canonical: "/career-clg" },
};

export default function CareerClgPage() {
  return (
    <SitePage>
      <CareerView which="career-clg" />
    </SitePage>
  );
}
