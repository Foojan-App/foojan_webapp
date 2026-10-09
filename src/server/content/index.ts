import { getAboutContent } from "./about";
import { getAitContent } from "./ait";
import { getAnnouncementContent } from "./announcement";
import { getBooksContent } from "./books";
import { getContactBandContent } from "./contactBand";
import { getExperienceContent } from "./experience";
import { getExtendingContent } from "./extending";
import { getFooterContent } from "./footer";
import { getHeaderContent } from "./header";
import { getHeroContent } from "./hero";
import { getMediaContent } from "./media";
import { getPathwaysContent } from "./pathways";
import { getPersonalNoteContent } from "./personalNote";
import { getSpeakingContent } from "./speaking";

export const getPageContent = async () => {
  const [header, announcement, hero, about, pathways, ait, extending, books, speaking, media, experience, personalNote, contactBand, footer] =
    await Promise.all([
      getHeaderContent(),
      getAnnouncementContent(),
      getHeroContent(),
      getAboutContent(),
      getPathwaysContent(),
      getAitContent(),
      getExtendingContent(),
      getBooksContent(),
      getSpeakingContent(),
      getMediaContent(),
      getExperienceContent(),
      getPersonalNoteContent(),
      getContactBandContent(),
      getFooterContent(),
    ]);

  return { header, announcement, hero, about, pathways, ait, extending, books, speaking, media, experience, personalNote, contactBand, footer };
};
