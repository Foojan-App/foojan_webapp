import type { HomePublicationsContent } from "@/services/interface";

export const publicationsContent: HomePublicationsContent = {
  kicker: "04 / Books & research",
  heading: "Ideas worth reading.",
  heading_accent: "Research worth exploring.",
  paragraph:
    "Discover Dr. Foojan's published writing and research exploring self-awareness, relationships, emotional well-being, and Awareness Integration Theory.",
  panels: [
    {
      index: "01 / Books",
      title: "Words that stay with you.",
      text: "Explore books that bring psychological insight and practical reflection into everyday life.",
      link: { label: "Explore writing", href: "#" },
    },
    {
      index: "02 / Research papers",
      title: "The thinking behind the work.",
      text: "Explore research papers, scholarly contributions, and the theoretical foundation of Dr. Foojan's approach.",
      link: { label: "Explore research", href: "#" },
    },
  ],
  note: "Publication listings and verified document links can be connected when the approved bibliography is supplied.",
};
