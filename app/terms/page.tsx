import type { Metadata } from "next";
import { SitePage } from "@/components/ui/SitePage";
import { LegalView } from "@/components/sections/LegalView";
import { termsPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of the Pollinext website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SitePage>
      <LegalView doc={termsPage} />
    </SitePage>
  );
}
