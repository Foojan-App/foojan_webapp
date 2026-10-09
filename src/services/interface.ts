import type { InquiryType, LegalSlug } from "@/types/enums";

export interface MenuItem {
  id?: number;
  label: string;
  href: string;
  visible?: boolean;
}

export interface HeaderContent {
  menu: MenuItem[];
}

export interface AnnouncementContent {
  enabled: boolean;
  text: string;
  link_label: string;
  link_href: string;
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


export interface HeroStat {
  id?: number;
  value: string;
  suffix: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  primary_button_label: string;
  primary_button_href: string;
  secondary_button_label: string;
  secondary_button_href: string;
  award_title: string;
  award_subtitle: string;
  image_url: string;
  badge_value: string;
  badge_label: string;
  stats: HeroStat[];
}

export interface UploadResult {
  url: string;
}

export interface AboutContent {
  avatar_url: string;
  signature_name: string;
  eyebrow: string;
  heading: string;
  signature_subtitle: string;
  lead: string;
  body: string;
  quote: string;
  quote_author: string;
  link_label: string;
  link_href: string;
}

export interface PersonalNoteContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  signature_subtitle: string;
}

export interface ContactBandContent {
  heading: string;
  paragraph: string;
  primary_button_label: string;
  primary_button_href: string;
  secondary_button_label: string;
  secondary_button_href: string;
}

export interface SpeakingFormat {
  id?: number;
  title: string;
  body: string;
}

export interface SpeakingTopic {
  id?: number;
  label: string;
}

export interface SpeakingContent {
  image_url: string;
  image_alt: string;
  eyebrow: string;
  heading: string;
  paragraph: string;
  button_label: string;
  button_href: string;
  topics_title: string;
  formats: SpeakingFormat[];
  topics: SpeakingTopic[];
}

export interface FooterLink {
  id?: number;
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  id?: number;
  name: string;
  url: string;
  icon_url: string;
}

export interface FooterContent {
  tagline: string;
  copyright: string;
  address: string;
  columns: FooterColumn[];
  socials: FooterSocial[];
}

export interface FooterRow {
  tagline: string;
  copyright: string;
  address: string;
  column_1_title: string;
  column_2_title: string;
  column_3_title: string;
}

export interface FooterLinkRow extends FooterLink {
  column_no: number;
}

export interface Book {
  id?: number;
  category: string;
  title: string;
  description: string;
  cover_url: string;
  link: string;
}

export interface BooksContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  footer_text: string;
  button_label: string;
  button_href: string;
  books: Book[];
}

export interface MediaItem {
  id?: number;
  kicker: string;
  title: string;
  body: string;
  link: string;
  icon_url: string;
}

export interface MediaContent {
  eyebrow: string;
  heading: string;
  featured_eyebrow: string;
  featured_title: string;
  featured_text: string;
  featured_button_label: string;
  featured_button_href: string;
  items: MediaItem[];
}

export interface ExperienceTag {
  id?: number;
  label: string;
}

export interface ExperienceItem {
  id?: number;
  kicker: string;
  title: string;
  body: string;
  highlight: boolean;
  badge_label: string;
}

export interface ExperienceContent {
  image_url: string;
  image_alt: string;
  eyebrow: string;
  heading: string;
  paragraph: string;
  link_label: string;
  link_href: string;
  tags: ExperienceTag[];
  items: ExperienceItem[];
}

export interface PathwayCard {
  id?: number;
  title: string;
  body: string;
  link_label: string;
  href: string;
  icon_url: string;
}

export interface PathwaysContent {
  image_url: string;
  image_alt: string;
  eyebrow: string;
  heading: string;
  paragraph: string;
  note: string;
  cards: PathwayCard[];
}

export interface AitPillar {
  id?: number;
  title: string;
  body: string;
}

export interface AitTab {
  id?: number;
  title: string;
  body: string;
  icon_url: string;
  tags: string[];
}

export interface AitContent {
  image_url: string;
  image_alt: string;
  eyebrow: string;
  heading: string;
  paragraph: string;
  primary_button_label: string;
  primary_button_href: string;
  secondary_button_label: string;
  secondary_button_href: string;
  pillars: AitPillar[];
  tabs: AitTab[];
}

export interface ExtendingLink {
  label: string;
  href: string;
  external: boolean;
}

export interface ExtendingCard {
  id?: number;
  kicker: string;
  title: string;
  body: string;
  icon_text: string;
  icon_url: string;
  links: ExtendingLink[];
}

export interface ExtendingContent {
  image_url: string;
  image_alt: string;
  eyebrow: string;
  heading: string;
  paragraph: string;
  link_label: string;
  link_href: string;
  cards: ExtendingCard[];
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

export interface ContactPageContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  office_title: string;
  office_area: string;
  address: string;
  map_url: string;
  email: string;
  phone: string;
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
