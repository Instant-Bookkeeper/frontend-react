import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "./constants";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ====================== Request Interceptor ======================
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    // Request logger for dev mode
    if (import.meta.env.DEV) {
      console.log(
        "%c[API Request]",
        "color: white; background: blue; font-weight: bold; padding: 2px 4px; border-radius: 3px;",
        config.method?.toUpperCase(),
        config.url,
        config.data
      );
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

type ErrorRespone = {
  messageCode: number;
  description: string;
  createdId?: number;
};
// ====================== Response Interceptor ======================
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    let message = "An unknown error occurred.";

    if (error.response) {
      // Server responded with a non-2xx status
      const data = error.response.data as ErrorRespone;
      if (data?.messageCode && data?.description) {
        message = data.description;
      } else {
        message = data?.description || error.response.statusText;
      }
      console.error(
        "[API Error Response]",
        error.response.status,
        `[${data.messageCode}]`,
        message
      );
    } else if (error.request) {
      // No response received
      message = "No response from server. Please try again.";
      console.error("[API Error Request]", error.request);
    } else {
      // Something else
      message = error.message;
      console.error("[API Error Message]", message);
    }

    // Global 401 handler
    if (error.response?.status === 401) {
      message = error.response.data as string; // 401 response data returns as plain string from this API
    }

    return Promise.reject(new Error(message));
  }
);
