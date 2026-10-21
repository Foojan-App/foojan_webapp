import type { InquiryType, LegalSlug } from "@/types/enums";

export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuItem {
  id?: number;
  label: string;
  href: string;
  icon_url?: string;
  visible?: boolean;
  children?: MenuLink[];
}

export interface HeaderContent {
  menu: MenuItem[];
}

export interface ApiRequest {
  url: string;
  data?: unknown;
  headers?: Record<string, string>;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminUser {
  email: string;
  full_name: string | null;
  role: string;
}

export interface ApiMessage {
  message: string;
}


export interface HomeProof {
  title: string;
  label: string;
}

export interface HomeAboutContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraphs: string[];
  link: MenuLink;
  proof: HomeProof[];
}

export interface HomeAitStep {
  number: string;
  eyebrow: string;
  title: string;
  text: string;
}

export interface HomeAitContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraphs: string[];
  button: MenuLink;
  steps: HomeAitStep[];
  caption: string;
}

export interface HomeSpeakingContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraph: string;
  card_href: string;
  image_url: string;
  image_alt: string;
  card_label: string;
  card_heading: string;
  card_heading_line2: string;
  card_heading_accent: string;
  card_text: string;
  card_hook: string;
  footer_text: string;
  footer_link: MenuLink;
}

export interface HomePublicationPanel {
  index: string;
  title: string;
  text: string;
  link: MenuLink;
}

export interface HomePublicationsContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraph: string;
  panels: HomePublicationPanel[];
  note: string;
}

export interface HomeEpisode {
  label: string;
  title: string;
  link: MenuLink;
}

export interface HomeMediaContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraph: string;
  tabs: MenuLink[];
  podcast_kicker: string;
  podcast_heading: string;
  podcast_heading_accent: string;
  podcast_text: string;
  podcast_primary: MenuLink;
  podcast_links: MenuLink[];
  podcast_image_url: string;
  podcast_image_alt: string;
  episodes: HomeEpisode[];
  podcast_note: string;
  youtube_kicker: string;
  youtube_heading: string;
  youtube_heading_accent: string;
  youtube_text: string;
  youtube_href: string;
  youtube_eyebrow: string;
  youtube_title: string;
  youtube_card_text: string;
  youtube_cta: string;
  youtube_mark: string;
  substack_kicker: string;
  substack_heading: string;
  substack_heading_accent: string;
  substack_text: string;
  substack_href: string;
  substack_link_label: string;
  substack_name: string;
  substack_byline: string;
}

export interface HomeQuoteContent {
  kicker: string;
  quote: string;
  author: string;
}

export interface HomeProduct {
  image_url: string;
  image_alt: string;
  kicker: string;
  title: string;
  title_line2: string;
  paragraphs: string[];
  highlight: string;
  link: MenuLink;
  link_text_width: number;
}

export interface HomeMiraContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraph: string;
  products: HomeProduct[];
  note: string;
}

export interface HomeInviteContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraph: string;
  form_title: string;
  submit_label: string;
}

export interface SiteFooterContent {
  tagline: string;
  explore_title: string;
  explore_links: MenuLink[];
  connect_title: string;
  connect_text: string;
  connect_link: MenuLink;
  copyright: string;
  note: string;
}

export interface HomeTickerContent {
  items: string[];
}

export interface HomeHeroContent {
  kicker: string;
  heading: string;
  heading_accent: string;
  paragraph: string;
  primary_button_label: string;
  primary_button_href: string;
  secondary_button_label: string;
  secondary_button_href: string;
  footnote: string;
  image_url: string;
  image_alt: string;
  vertical_text: string;
  caption: string;
}

export interface UploadResult {
  url: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  organization: string;
  inquiry_type: InquiryType;
  message: string;
  website: string;
  started_at: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  organization: string;
  inquiry_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactMessageUpdate {
  id: number;
  is_read: boolean;
}

export interface LegalPage {
  slug: LegalSlug;
  title: string;
  body: string;
  updated_at?: string;
}

export interface LegalContent {
  pages: LegalPage[];
}

export interface AboutHighlight {
  id?: number;
  title: string;
  items: string;
}

export interface AboutPageContent {
  eyebrow: string;
  heading: string;
  subtitle: string;
  intro: string;
  image_url: string;
  body: string;
  highlights_title: string;
  cta_heading: string;
  cta_paragraph: string;
  cta_button_label: string;
  cta_button_href: string;
  highlights: AboutHighlight[];
}
