import type { ComponentProps, ReactNode } from "react";
import type { AboutPageContent, ContactMessage, LegalContent, LegalPage, AdminUser, HomeAboutContent, HomeAitContent, HomeHeroContent, HomeInviteContent, HomeMediaContent, HomeMiraContent, HomePublicationsContent, HomeQuoteContent, HomeSpeakingContent, MenuItem, SiteFooterContent, HomeTickerContent } from "@/services/interface";
import type { FieldKind, HomeSection, LineBreaks } from "./enums";

export interface AdminProvidersProps {
  children: ReactNode;
}

export interface HeaderProps {
  nav: MenuItem[];
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

export interface AccentTextProps {
  text: string;
  breaks?: LineBreaks;
}

export interface BoldTextProps {
  text: string;
  className?: string;
}

export interface HomeAboutProps {
  content: HomeAboutContent;
}

export interface HomeAitProps {
  content: HomeAitContent;
}

export interface HomeSpeakingProps {
  content: HomeSpeakingContent;
}

export interface HomePublicationsProps {
  content: HomePublicationsContent;
}

export interface HomeMediaProps {
  content: HomeMediaContent;
}

export interface HomeQuoteProps {
  content: HomeQuoteContent;
}

export interface HomeMiraProps {
  content: HomeMiraContent;
}

export interface InviteModalProps {
  content: HomeInviteContent;
}

export interface HomeTickerProps {
  content: HomeTickerContent;
}

export interface HomeHeroProps {
  content: HomeHeroContent;
}

export interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  aspect?: number;
  outputWidth: number;
  round?: boolean;
  freeShape?: boolean;
}

export interface OrderButtonsProps {
  index: number;
  count: number;
  move: (from: number, to: number) => void;
  remove: () => void;
}

export interface FooterProps {
  content: SiteFooterContent;
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

export interface MessagesInboxProps {
  initial: ContactMessage[];
}

export interface LegalEditorProps {
  initial: LegalContent;
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

export type SiteLinkProps = ComponentProps<"a"> & { href: string };

export interface HomeField {
  name: string;
  label: string;
  kind: FieldKind;
  help?: string;
  optional?: boolean;
  aspect?: number;
  outputWidth?: number;
  freeShape?: boolean;
  itemLabel?: string;
  fields?: HomeField[];
}

export interface HomeFieldCard {
  title: string;
  description?: string;
  fields: HomeField[];
}

export interface HomeSectionConfig {
  key: HomeSection;
  label: string;
  description: string;
  icon: ReactNode;
  cards: HomeFieldCard[];
}

export interface HomeSectionEditorProps {
  sectionKey: HomeSection;
  initial: object;
}

export interface HomeFieldInputProps {
  field: HomeField;
  path: (string | number)[];
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface EyebrowProps {
  children: ReactNode;
  center?: boolean;
}

export interface ButtonProps {
  href?: string;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
}
