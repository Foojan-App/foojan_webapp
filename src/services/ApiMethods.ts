import Api from "./Interceptor";
import type { ApiRequest } from "./interface";

export const getApi = async <T>(url: string) => {
  const result = await Api.get<T>(url);
  return result.data;
};

export const postApi = async <T>({ url, data, headers }: ApiRequest) => {
  const result = await Api.post<T>(url, data, { headers });
  return result.data;
};

export const putApi = async <T>({ url, data, headers }: ApiRequest) => {
  const result = await Api.put<T>(url, data, { headers });
  return result.data;
};

export const patchApi = async <T>({ url, data, headers }: ApiRequest) => {
  const result = await Api.patch<T>(url, data, { headers });
  return result.data;
};

export const deleteApi = async <T>({ url, data, headers }: ApiRequest) => {
  const result = await Api.delete<T>(url, { data, headers });
  return result.data;
};
