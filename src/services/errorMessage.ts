import { isAxiosError } from "axios";

export const errorMessage = (error: unknown, fallback = "Something went wrong. Please try again.") => {
  if (isAxiosError<{ message?: string }>(error)) return error.response?.data?.message ?? fallback;
  return fallback;
};
