import axios, { type AxiosError } from "axios";

const LOGIN_PATH = "/admin/login";

const Api = axios.create({
  baseURL: "/api",
  timeout: 30000,
  headers: { Accept: "application/json" },
});

Api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && window.location.pathname !== LOGIN_PATH) {
      window.location.replace(new URL(LOGIN_PATH, window.location.origin));
    }
    return Promise.reject(error);
  },
);

export default Api;
