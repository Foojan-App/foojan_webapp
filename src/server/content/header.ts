import type { HeaderContent } from "@/services/interface";

export const defaultHeader: HeaderContent = {
  announcement: {
    enabled: true,
    text: "Recipient of the 2026 AAMFT Clinical Practice Innovation Award.",
    link_label: "Read more",
    link_href: "/meet-dr-foojan-zeine",
  },
  menu: [
    { label: "Home", href: "#home" },
    {
      label: "About Dr. Foojan",
      href: "#about",
      children: [
        { label: "Her Story", href: "#about" },
        { label: "The AIT Method", href: "https://awarenessintegration.com/awareness-integration-theory/" },
        { label: "Full Biography", href: "/meet-dr-foojan-zeine" },
      ],
    },
    {
      label: "Her Work",
      href: "#work",
      children: [
        { label: "Speaking & Keynotes", href: "#work" },
        { label: "Foojan App & Mira™", href: "#mira" },
        { label: "Therapy & Coaching", href: "https://foojanzeine.com/empowering-you/" },
      ],
    },
    {
      label: "Media",
      href: "#media-library",
      children: [
        { label: "Inner Voice Podcast", href: "#podcast" },
        { label: "YouTube", href: "#youtube" },
        { label: "Substack", href: "#substack" },
        { label: "Earlier Media & Interviews", href: "https://foojanzeine.com/media/" },
      ],
    },
    {
      label: "Books & Research",
      href: "#publications",
      children: [
        { label: "Books", href: "#publications" },
        { label: "Research Publications", href: "https://foojanzeine.com/publications-journals/" },
      ],
    },
    { label: "Press", href: "https://foojanzeine.com/media/" },
  ],
};
