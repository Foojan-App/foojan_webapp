import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/contact-us", destination: "/#contact", permanent: true },
      { source: "/about", destination: "/meet-dr-foojan-zeine", permanent: true },
      { source: "/empowering-you", destination: "/#work", permanent: true },
      { source: "/media", destination: "/#media-library", permanent: true },
      { source: "/press", destination: "/#media-library", permanent: true },
      { source: "/all-books", destination: "/#publications", permanent: true },
      { source: "/publications-journals", destination: "/#publications", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
