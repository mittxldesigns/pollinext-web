import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a stray lockfile in a parent dir can't mis-root the build.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
