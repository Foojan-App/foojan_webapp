import { deleteApi, patchApi, postApi, putApi } from "./ApiMethods";
import type {
  AboutContent,
  AdminUser,
  BooksContent,
  AnnouncementContent,
  ApiMessage,
  ContactBandContent,
  ExperienceContent,
  FooterContent,
  HeaderContent,
  HeroContent,
  LoginPayload,
  MediaContent,
  PathwaysContent,
  AitContent,
  ExtendingContent,
  PersonalNoteContent,
  SpeakingContent,
  UploadResult,
  ContactPayload,
  ContactMessage,
  ContactMessageUpdate,
  LegalContent,
  ContactPageContent,
  AboutPageContent,
} from "./interface";

const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";
const UPDATE_HEADER = "/menu";
const UPDATE_ANNOUNCEMENT = "/announcement";
const UPDATE_HERO = "/hero";
const UPDATE_ABOUT = "/about";
const UPDATE_PERSONAL_NOTE = "/personal-note";
const UPDATE_CONTACT_BAND = "/contact-band";
const UPDATE_SPEAKING = "/speaking";
const UPDATE_FOOTER = "/footer";
const UPDATE_BOOKS = "/books";
const UPDATE_MEDIA = "/media";
const UPDATE_EXPERIENCE = "/experience";
const UPDATE_PATHWAYS = "/pathways";
const UPDATE_AIT = "/ait";
const UPDATE_EXTENDING = "/extending";
const SEND_CONTACT = "/contact";
const CONTACT_MESSAGES = "/contact-messages";
const UPDATE_LEGAL = "/legal";
const UPDATE_CONTACT_PAGE = "/contact-page";
const UPDATE_ABOUT_PAGE = "/about-page";
const UPLOAD_IMAGE = "/upload";

export const loginApi = (payload: LoginPayload) => {
  return postApi<AdminUser>({ url: LOGIN, data: payload });
};

export const logoutApi = () => {
  return postApi<ApiMessage>({ url: LOGOUT });
};

export const updateHeaderApi = (payload: HeaderContent) => {
  return putApi<HeaderContent>({ url: UPDATE_HEADER, data: payload });
};

export const updateAnnouncementApi = (payload: AnnouncementContent) => {
  return putApi<AnnouncementContent>({ url: UPDATE_ANNOUNCEMENT, data: payload });
};

export const updateHeroApi = (payload: HeroContent) => {
  return putApi<HeroContent>({ url: UPDATE_HERO, data: payload });
};

export const uploadImageApi = (file: Blob, name: string) => {
  const data = new FormData();
  data.append("file", file, name);
  return postApi<UploadResult>({ url: UPLOAD_IMAGE, data });
};

export const updateAboutApi = (payload: AboutContent) => {
  return putApi<AboutContent>({ url: UPDATE_ABOUT, data: payload });
};

export const updatePersonalNoteApi = (payload: PersonalNoteContent) => {
  return putApi<PersonalNoteContent>({ url: UPDATE_PERSONAL_NOTE, data: payload });
};

export const updateContactBandApi = (payload: ContactBandContent) => {
  return putApi<ContactBandContent>({ url: UPDATE_CONTACT_BAND, data: payload });
};

export const updateSpeakingApi = (payload: SpeakingContent) => {
  return putApi<SpeakingContent>({ url: UPDATE_SPEAKING, data: payload });
};

export const updateFooterApi = (payload: FooterContent) => {
  return putApi<FooterContent>({ url: UPDATE_FOOTER, data: payload });
};

export const updateBooksApi = (payload: BooksContent) => {
  return putApi<BooksContent>({ url: UPDATE_BOOKS, data: payload });
};

export const updateMediaApi = (payload: MediaContent) => {
  return putApi<MediaContent>({ url: UPDATE_MEDIA, data: payload });
};

export const updateExperienceApi = (payload: ExperienceContent) => {
  return putApi<ExperienceContent>({ url: UPDATE_EXPERIENCE, data: payload });
};

export const updatePathwaysApi = (payload: PathwaysContent) => {
  return putApi<PathwaysContent>({ url: UPDATE_PATHWAYS, data: payload });
};

export const updateAitApi = (payload: AitContent) => {
  return putApi<AitContent>({ url: UPDATE_AIT, data: payload });
};

export const updateExtendingApi = (payload: ExtendingContent) => {
  return putApi<ExtendingContent>({ url: UPDATE_EXTENDING, data: payload });
};

export const sendContactApi = (payload: ContactPayload) => {
  return postApi<ApiMessage>({ url: SEND_CONTACT, data: payload });
};

export const updateContactMessageApi = (payload: ContactMessageUpdate) => {
  return patchApi<ContactMessage[]>({ url: CONTACT_MESSAGES, data: payload });
};

export const deleteContactMessageApi = (id: number) => {
  return deleteApi<ContactMessage[]>({ url: CONTACT_MESSAGES, data: { id } });
};

export const updateLegalApi = (payload: LegalContent) => {
  return putApi<LegalContent>({ url: UPDATE_LEGAL, data: payload });
};

export const updateContactPageApi = (payload: ContactPageContent) => {
  return putApi<ContactPageContent>({ url: UPDATE_CONTACT_PAGE, data: payload });
};

export const updateAboutPageApi = (payload: AboutPageContent) => {
  return putApi<AboutPageContent>({ url: UPDATE_ABOUT_PAGE, data: payload });
};
