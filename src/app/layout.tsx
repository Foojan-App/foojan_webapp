import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_TITLE, SITE_URL } from "@/server/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const loraItalic = Lora({
  variable: "--font-lora-italic",
  subsets: ["latin"],
  style: "italic",
  preload: false,
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
      className={`${inter.variable} ${lora.variable} ${loraItalic.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: fitDesktop }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
