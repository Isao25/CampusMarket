import { logout, refreshAccessToken } from "@/context/AuthContext";
import { Tokens } from "@/types";
import axios, { AxiosInstance} from "axios";
export const baseURL = "http://localhost:8000";

export class AxiosService {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
}

export class AxiosProtectedService extends AxiosService {
  constructor(baseURL: string) {
    super(baseURL);
    this.addInterceptors();
  }

  addInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const tokens: Tokens | null = JSON.parse(localStorage.getItem("tokens") || "null");
      if (tokens?.access) {
          config.headers.Authorization = `Bearer ${tokens.access}`;
          console.log("request with auth header :)");
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newTokens = await refreshAccessToken();
            if (newTokens) {
              originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            logout();
          }
        }

        return Promise.reject(error);
      }
    );
  }
}