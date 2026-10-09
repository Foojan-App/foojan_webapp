import type { ReactNode } from "react";
import type { AboutPageContent, ContactMessage, ContactPageContent, FooterSocial, LegalContent, LegalPage, AboutContent, AitContent, ExtendingContent, AdminUser, BooksContent, ExperienceContent, MediaContent, PathwayCard, PathwaysContent, ContactBandContent, FooterContent, PersonalNoteContent, SpeakingContent, AnnouncementContent, HeaderContent, HeroContent, MenuItem } from "@/services/interface";
import type { LineBreaks, SignatureSize } from "./enums";

export interface AdminProvidersProps {
  children: ReactNode;
}

export interface HeaderProps {
  nav: MenuItem[];
  announcement: AnnouncementContent;
}

export interface HeaderEditorProps {
  initial: HeaderContent;
}

export interface AdminNavItem {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
  ready: boolean;
}

export interface AdminShellProps {
  admin: AdminUser;
  children: ReactNode;
}

export interface PageTitleProps {
  title: string;
  description?: string;
  extra?: ReactNode;
}

export interface AdminLogoProps {
  className: string;
}

export interface AnnouncementEditorProps {
  initial: AnnouncementContent;
}

export interface AccentTextProps {
  text: string;
  breaks?: LineBreaks;
}

export interface HeroProps {
  content: HeroContent;
}

export interface HeroEditorProps {
  initial: HeroContent;
}

export interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  aspect?: number;
  outputWidth: number;
  round?: boolean;
  freeShape?: boolean;
}

export interface MeetFoojanProps {
  content: AboutContent;
}

export interface AboutEditorProps {
  initial: AboutContent;
}

export interface SignatureProps {
  subtitle: string;
  name?: string;
  image?: string;
  center?: boolean;
  size?: SignatureSize;
}

export interface ClosingProps {
  content: PersonalNoteContent;
  about: AboutContent;
}

export interface PersonalNoteEditorProps {
  initial: PersonalNoteContent;
}

export interface ContactBandProps {
  content: ContactBandContent;
}

export interface ContactBandEditorProps {
  initial: ContactBandContent;
}

export interface SpeakingProps {
  content: SpeakingContent;
}

export interface SpeakingEditorProps {
  initial: SpeakingContent;
}

export interface OrderButtonsProps {
  index: number;
  count: number;
  move: (from: number, to: number) => void;
  remove: () => void;
}

export interface FooterProps {
  content: FooterContent;
}

export interface FooterEditorProps {
  initial: FooterContent;
}

export interface IconUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  size?: number;
}

export interface BooksProps {
  content: BooksContent;
}

export interface BooksEditorProps {
  initial: BooksContent;
}

export interface MediaProps {
  content: MediaContent;
}

export interface MediaEditorProps {
  initial: MediaContent;
}

export interface MaskIconProps {
  src: string;
  className?: string;
  size?: number;
}

export interface ExperienceProps {
  content: ExperienceContent;
}

export interface ExperienceEditorProps {
  initial: ExperienceContent;
}

export interface PathwaysProps {
  content: PathwaysContent;
}

export interface PathwayCardProps {
  card: PathwayCard;
  index: number;
}

export interface PathwaysEditorProps {
  initial: PathwaysContent;
}

export interface AitSectionProps {
  content: AitContent;
}

export interface AitEditorProps {
  initial: AitContent;
}

export interface ExtendingProps {
  content: ExtendingContent;
}

export interface ExtendingEditorProps {
  initial: ExtendingContent;
}

export interface CountUpProps {
  value: string;
}

export interface SitePageProps {
  children: ReactNode;
}

export interface RichTextProps {
  body: string;
}

export interface LegalPageViewProps {
  page: LegalPage;
}

export interface ContactFormProps {
  therapyHref: string;
}

export interface ContactOfficeProps {
  content: ContactPageContent;
  socials: FooterSocial[];
}

export interface ContactPageEditorProps {
  initial: ContactPageContent;
}

export interface MessagesInboxProps {
  initial: ContactMessage[];
}

export interface LegalEditorProps {
  initial: LegalContent;
}

export interface FeaturedPlayProps {
  href: string;
  title: string;
  eyebrow: string;
}

export interface LogoProps {
  light?: boolean;
}

export interface AboutPageViewProps {
  content: AboutPageContent;
}

export interface AboutPageEditorProps {
  initial: AboutPageContent;
}

export interface SectionPhotoConfig {
  aspect: number;
  position: string;
  outputWidth: number;
  sizes: string;
}

export interface SectionPhotoProps {
  src: string;
  alt: string;
  photo: SectionPhotoConfig;
  className?: string;
}
