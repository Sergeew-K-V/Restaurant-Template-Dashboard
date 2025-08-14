import axios from "axios";
import { cookieUtils } from "../lib/cookies";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Важно для работы с cookies
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Удаляем cookie и перенаправляем на логин
      cookieUtils.remove("dashboard-cookie");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
