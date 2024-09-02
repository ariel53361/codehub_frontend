import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "../store/authStore";
import BASE_URL from "./base-url";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: "django-insecure-c0%n3r)(1coucuk!k4h4w2q*)&syz8n854fa=b*+2ezpjpf8j0",
  },
});

axiosInstance.interceptors.request.use(
  
  async (config) => {

    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refreshToken;

      try {
        // Make a call to refresh the token
        const response = await axiosInstance.post("auth/jwt/refresh/", {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Failed to refresh token", err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
// console.log(axiosInstance.defaults.headers.common["Authorization"]);
export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<FetchResponse<T>>(`codehub${this.endpoint}`, config)
      .then((res) => res.data);
  };

  get = (id: string) => {
    return axiosInstance
      .get<T>(`codehub${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
  patch = (id:string, updatedInstance:T)=>{
    return axiosInstance
    .patch<T>(`codehub${this.endpoint}/${id}`,updatedInstance).then((res) => res.data);
  }
}

export { axiosInstance };
export default APIClient;
