import type { ExperienceContent, ExperienceItem, ExperienceTag } from "@/services/interface";
import { Table } from "@/types/enums";
import { withPhotoSize } from "../photoSize";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultExperience: ExperienceContent = {
  image_url: "/images/photos/experience.png",
  image_alt: "Dr. Foojan Zeine at an international psychotherapy conference",
  eyebrow: "Professional Experience",
  heading: "Experience shaped\nby|*service.*",
  paragraph: "More than three decades of clinical practice,\nscholarship, leadership and service across\ndiverse communities.",
  link_label: "Full experience & credentials",
  link_href: "#",
  tags: [{ label: "Clinical Psychology" }, { label: "Psychotherapy" }, { label: "Education" }, { label: "Leadership" }],
  items: [
    {
      kicker: "Education & Licensure",
      title: "Clinical psychologist & LMFT",
      body: "I hold a Doctorate in Clinical Psychology, am a Licensed Marriage and Family Therapist, and earned a Graduate Certificate in Human Behavior from Harvard Extension School. My clinical and scholarly work has included intimate relationships, trauma, anxiety, depression, addictive behaviors, domestic violence, personal development, and integrative mental health.",
      highlight: false,
      badge_label: "",
    },
    {
      kicker: "Leadership",
      title: "Founder — Personal Growth Institute & My New Life",
      body: "Earlier in my career, I founded and led the Personal Growth Institute, a nonprofit that delivered multicultural and multilingual mental-health services across five Southern California locations and trained psychotherapy students from 12 universities. I also founded and served as CEO of My New Life, a licensed outpatient chemical-dependency program serving multicultural communities.",
      highlight: false,
      badge_label: "",
    },
    {
      kicker: "Recognition · 2026",
      title: "AAMFT Clinical Practice Innovation Award",
      body: "In 2026, I received the American Association for Marriage and Family Therapy Clinical Practice Innovation Award in recognition of innovative clinical practice and the development of Awareness Integration Theory.",
      highlight: true,
      badge_label: "Award recipient",
    },
  ],
};

export const experienceSectionColumns: (keyof ExperienceContent)[] = ["image_url", "image_alt", "eyebrow", "heading", "paragraph", "link_label", "link_href"];

export const experienceTagColumns: (keyof ExperienceTag)[] = ["id", "label"];

export const experienceItemColumns: (keyof ExperienceItem)[] = ["id", "kicker", "title", "body", "highlight", "badge_label"];

export const getExperienceContent = async (): Promise<ExperienceContent> => {
  const [row, tags, items] = await Promise.all([
    getSingle<ExperienceContent>(Table.ExperienceSection).catch(() => null),
    getList<ExperienceTag>(Table.ExperienceTags).catch(() => []),
    getList<ExperienceItem>(Table.ExperienceItems).catch(() => []),
  ]);

  const content: ExperienceContent = { ...defaultExperience };

  if (row) {
    Object.assign(content, pick(row, experienceSectionColumns));
  }

  if (tags.length > 0) {
    content.tags = tags.map((tag) => pick(tag, experienceTagColumns) as ExperienceTag);
  }

  if (items.length > 0) {
    content.items = items.map((item) => pick(item, experienceItemColumns) as ExperienceItem);
  }

  return withPhotoSize(content);
};
