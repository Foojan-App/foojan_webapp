import type { AboutHighlight, AboutPageContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultAboutPage: AboutPageContent = {
  eyebrow: "About Dr. Foojan",
  heading: "Dr. Foojan Zeine, *Psy.D., LMFT*",
  subtitle: "Psychotherapist · Author · Educator · International Speaker · Originator of Awareness Integration Theory",
  intro: "Dr. Foojan Zeine is an International Speaker, Author, Psychotherapist, and a successful Life and Executive Coach. She has her Doctorate in Clinical Psychology and is a Licensed Marriage & Family Therapist. She has obtained a graduate certificate in the Topic of Human Behavior from the Harvard Extension School (HES).",
  image_url: "/images/foojan-hero.png",
  body: "Her expertise is in Intimate Relations and Addictive Behaviors. She has extensive experience treating Depression, Anxiety, Traumas, and Domestic Violence. Foojan presents internationally and is a leading expert in the field of Online Therapy.\n\nShe is the originator and the author of Awareness Integration Theory (AIT), which is a multi-modality Psychology and Educational approach and intervention toward minimizing Depression and Anxiety while improving Self-esteem and Self-confidence. She is the founder of the International Awareness Integration Institute which conducts training workshops to educate and certify psychotherapists, coaches, and teachers in this approach globally. She is the co-developer of the \"Foojan\" app and the AI companion \"Mira\" which offers a self-help app offering AIT to the public. She is a lecturer/professor at the California State University Long Beach and Université Paris Cité teaching AIT.\n\n## Books\n\nShe has authored and co-authored many psychology and personal development books. Her latest books included:\n- Awakened Leadership (Routledge, 2025)\n- Intentional Parenting (Cambridge Scholars, 2022)\n- Awareness Integration Therapy – Clear the Past, Create a New Future, and Live a Fulfilled Life Now (Cambridge Scholars, 2021)\n- Life Reset – The Awareness Integration Path to Create the Life You Want (Rowman & Littlefield Publishers, 2017)\n- Online Therapy: A Therapist's Guide to Expanding Your Practice (W.W. Norton Publishers, 2005)\n- Life Coaching. A chapter in \"A Practice That Works: Tips and Strategies for Your Stand-Alone Therapy Practice\" (2005)\n\n## Research & editorial work\n\nBesides these books, she published 20 Researched Articles on the Awareness Integration Theory in peer-reviewed journals and is a member of editorial boards and reviews for several esteemed journals, including:\n- INNOSC Theragnostics and Pharmacological Sciences\n- PLOS\n- PLOS Global Public Health\n- Journal of the Neurological Sciences\n- United Scientific Group\n- European Society of Medicine\n\n## Leadership & clinical work\n\nFor over 17 years, Dr. Zeine was the founder and CEO of the Personal Growth Institute, a non-profit organization that provided multicultural and multilingual mental health services across five Southern California locations. PGI served as a training facility for psychotherapy students from 12 universities to complete their licensing hours and qualifications.\n\nDr. Zeine also founded and served as CEO of My New Life, a licensed outpatient chemical dependency facility in Tarzana, California, which catered to the multicultural community recovering from substance and behavioral addictions that was recognized as one of the top 10 recovery programs in Los Angeles County.\n\nIn addition to her clinical roles, Dr. Zeine has an extensive background in hospital administration. She led the Partial Hospital Program Team at Hollywood Community of Van Nuys and Pacifica Hospitals, where she was responsible for organizing, facilitating, and supervising clinical and mental health staff, as well as creating impactful programs for patients. She also developed two Transitional Housing Programs for Battered Women Alternative in Northern California and Haven Hills in Southern California, offering comprehensive case management and counseling services for victims of domestic violence in a residential setting.\n\n## Boards\n\nDr. Zeine serves on the executive and advisory boards of numerous nonprofit organizations, including:\n- Executive Board Member – Iranian American Women's Foundation\n- Scientific Advisory Board Member – JC's Recovery & Counseling Center\n- Advisory Board Member – PARS Equality Center\n\n## Media & speaking\n\nDr. Zeine hosts the \"Inner Voice – a Heartfelt Chat with Dr. Foojan\" podcast and is a sought-after guest speaker at universities such as Harvard, MIT, UCLA, USC, Chicago University, and UC Santa Barbara. She has appeared on the Dr. Phil show on CBS and Fox, and contributed to outlets including YourTango.com, DivorceForce.com, Yoga Journal, Whole Life, Reader's Digest, Men's Health, and Huffington Post.",
  highlights_title: "At a glance",
  cta_heading: "Invite Dr. Foojan to *speak.*",
  cta_paragraph: "For keynotes, professional training, media and collaboration, start a conversation with Dr. Foojan’s office.",
  cta_button_label: "Get in touch",
  cta_button_href: "/contact",
  highlights: [
    { title: "Education & licensure", items: "Doctorate in Clinical Psychology (Psy.D.)\nLicensed Marriage & Family Therapist (LMFT)\nGraduate certificate in Human Behavior, Harvard Extension School" },
    { title: "Teaching", items: "California State University Long Beach\nUniversité Paris Cité" },
    { title: "Founder", items: "International Awareness Integration Institute\nPersonal Growth Institute\nMy New Life\nCo-developer of the Foojan app and Mira" },
    { title: "Media & speaking", items: "Host of Inner Voice – a Heartfelt Chat with Dr. Foojan\nDr. Phil show on CBS and Fox\nGuest speaker at Harvard, MIT, UCLA, USC and UC Santa Barbara" },
  ],
};

export const aboutPageColumns: (keyof AboutPageContent)[] = [
  "eyebrow",
  "heading",
  "subtitle",
  "intro",
  "image_url",
  "body",
  "highlights_title",
  "cta_heading",
  "cta_paragraph",
  "cta_button_label",
  "cta_button_href",
];

export const aboutHighlightColumns: (keyof AboutHighlight)[] = ["id", "title", "items"];

export const getAboutPageContent = async (): Promise<AboutPageContent> => {
  const [row, highlights] = await Promise.all([
    getSingle<AboutPageContent>(Table.AboutPage).catch(() => null),
    getList<AboutHighlight>(Table.AboutHighlights).catch(() => []),
  ]);

  const content: AboutPageContent = { ...defaultAboutPage };

  if (row) {
    Object.assign(content, pick(row, aboutPageColumns));
  }

  if (highlights.length > 0) {
    content.highlights = highlights.map((item) => pick(item, aboutHighlightColumns) as AboutHighlight);
  }

  return content;
};
