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
      link: { label: "Explore writing", href: "https://foojanzeine.com/all-books/" },
    },
    {
      index: "02 / Research papers",
      title: "The thinking behind the work.",
      text: "Explore research papers, scholarly contributions, and the theoretical foundation of Dr. Foojan's approach.",
      link: { label: "Explore research", href: "https://foojanzeine.com/publications-journals/" },
    },
  ],
  books: [
    {
      category: "Leadership",
      title: "Awakened Leadership",
      description: "Uniting organization development and Awareness Integration Theory.",
      cover_url: "/images/home/book-awakened-leadership.png",
      link: "https://www.amazon.com/Awakened-Leadership-Organization-Development-Integration-ebook/dp/B0DG8M4GHT/",
    },
    {
      category: "Clinical",
      title: "Awareness Integration Therapy",
      description: "A comprehensive presentation of the AIT therapeutic approach.",
      cover_url: "/images/home/book-ait-therapy.png",
      link: "https://www.amazon.com/Awareness-Integration-Therapy-Foojan-Zeine/dp/1527568318/",
    },
    {
      category: "Personal Growth",
      title: "Life Reset",
      description: "The Awareness Integration path to creating the life you want.",
      cover_url: "/images/home/book-life-reset.png",
      link: "https://www.amazon.com/Life-Reset-Awareness-Integration-Create/dp/1442276096",
    },
    {
      category: "Parenting",
      title: "Intentional Parenting",
      description: "A practical guide informed by Awareness Integration Theory.",
      cover_url: "/images/home/book-intentional-parenting.png",
      link: "https://www.cambridgescholars.com/product/978-1-5275-8375-7/",
    },
  ],
  note: "",
};
