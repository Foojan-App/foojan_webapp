import type { Metadata } from "next";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_TITLE, SITE_URL } from "@/server/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSansArrow = localFont({
  variable: "--font-dm-sans-arrow",
  src: [
    { path: "./fonts/dm-sans-arrow-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-arrow-700.woff2", weight: "700", style: "normal" },
  ],
  declarations: [{ prop: "unicode-range", value: "U+2197-2198" }],
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: SITE_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
};

const fitDesktop = `(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const fit = () => {
    const width = window.innerWidth;
    const scaled = width >= 1024 && width < 1280 && !location.pathname.startsWith("/admin");
    root.style.zoom = scaled ? String(width / 1280) : "";
  };
  fit();
  window.addEventListener("resize", fit);
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${dmSans.variable} ${dmSansArrow.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: fitDesktop }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
