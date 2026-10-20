import { deleteApi, patchApi, postApi, putApi } from "./ApiMethods";
import type { HomeSection } from "@/types/enums";
import type {
  AdminUser,
  ApiMessage,
  LoginPayload,
  UploadResult,
  ContactPayload,
  ContactMessage,
  ContactMessageUpdate,
  LegalContent,
  AboutPageContent,
} from "./interface";

const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";
const HOME_SECTION = "/home";
const SEND_CONTACT = "/contact";
const CONTACT_MESSAGES = "/contact-messages";
const UPDATE_LEGAL = "/legal";
const UPDATE_ABOUT_PAGE = "/about-page";
const UPLOAD_IMAGE = "/upload";

export const loginApi = (payload: LoginPayload) => {
  return postApi<AdminUser>({ url: LOGIN, data: payload });
};

export const logoutApi = () => {
  return postApi<ApiMessage>({ url: LOGOUT });
};

export const uploadImageApi = (file: Blob, name: string) => {
  const data = new FormData();
  data.append("file", file, name);
  return postApi<UploadResult>({ url: UPLOAD_IMAGE, data });
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

export const updateAboutPageApi = (payload: AboutPageContent) => {
  return putApi<AboutPageContent>({ url: UPDATE_ABOUT_PAGE, data: payload });
};

export const updateHomeSectionApi = <T>(key: HomeSection, payload: T) => {
  return putApi<T>({ url: `${HOME_SECTION}/${key}`, data: payload });
};
