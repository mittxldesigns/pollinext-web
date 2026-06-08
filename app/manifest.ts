import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pollinext — Fill Your Calendar. Close More Deals.",
    short_name: "Pollinext",
    description:
      "Done-for-you appointment setting, DM closing & AI sales systems for coaches, consultants and service providers.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
