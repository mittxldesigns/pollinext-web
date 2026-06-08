import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

// Every public route + its crawl priority. Keep in sync with the nav/footer.
const routes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
  { path: "/aboutus", priority: 0.7, changeFrequency: "monthly" },
  { path: "/career-setters", priority: 0.6, changeFrequency: "monthly" },
  { path: "/career-va", priority: 0.6, changeFrequency: "monthly" },
  { path: "/career-clg", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: r.path === "/" ? siteUrl : `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
