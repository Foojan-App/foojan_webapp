import { HomeSection } from "@/types/enums";
import { defaultHeader } from "../header";
import { siteFooterContent } from "../siteFooter";
import { getHomeRow } from "../../supabase";
import { aboutContent } from "./about";
import { aitContent } from "./ait";
import { heroContent } from "./hero";
import { inviteContent } from "./invite";
import { mediaContent } from "./media";
import { miraContent } from "./mira";
import { publicationsContent } from "./publications";
import { quoteContent } from "./quote";
import { speakingContent } from "./speaking";
import { tickerContent } from "./ticker";

const homeDefaults = {
  [HomeSection.Header]: defaultHeader,
  [HomeSection.Hero]: heroContent,
  [HomeSection.Ticker]: tickerContent,
  [HomeSection.About]: aboutContent,
  [HomeSection.Ait]: aitContent,
  [HomeSection.Speaking]: speakingContent,
  [HomeSection.Publications]: publicationsContent,
  [HomeSection.Media]: mediaContent,
  [HomeSection.Quote]: quoteContent,
  [HomeSection.Mira]: miraContent,
  [HomeSection.Invite]: inviteContent,
  [HomeSection.Footer]: siteFooterContent,
};

type HomeDefaults = typeof homeDefaults;

export const isHomeSection = (key: string): key is HomeSection => (Object.values(HomeSection) as string[]).includes(key);

export const pickKnown = <K extends HomeSection>(key: K, content: Record<string, unknown>) => {
  const base = homeDefaults[key] as unknown as Record<string, unknown>;
  return Object.fromEntries(Object.keys(base).map((field) => [field, content[field] ?? base[field]])) as unknown as HomeDefaults[K];
};

export const getHomeSection = async <K extends HomeSection>(key: K): Promise<HomeDefaults[K]> => {
  const row = await getHomeRow(key).catch(() => null);
  return row ? pickKnown(key, row) : homeDefaults[key];
};

export const getHomeContent = async () => {
  const keys = Object.values(HomeSection);
  const sections = await Promise.all(keys.map((key) => getHomeSection(key)));
  return Object.fromEntries(keys.map((key, index) => [key, sections[index]])) as HomeDefaults;
};
