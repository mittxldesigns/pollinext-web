import type { Metadata } from "next";
import { SitePage } from "@/components/ui/SitePage";
import { LegalView } from "@/components/sections/LegalView";
import { privacyPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pollinext collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <SitePage>
      <LegalView doc={privacyPage} />
    </SitePage>
  );
}
