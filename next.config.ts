import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about", destination: "/meet-dr-foojan-zeine", permanent: true },
      { source: "/empowering-you", destination: "/#work", permanent: true },
      { source: "/media", destination: "/#media", permanent: true },
      { source: "/press", destination: "/#media", permanent: true },
      { source: "/all-books", destination: "/#books", permanent: true },
      { source: "/publications-journals", destination: "/#books", permanent: true },
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
