import axios from "axios";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../constants/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post("auth/jwt/refresh/");

        const newAccessToken = response.data.access;
        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        useAuthStore.getState().clearAuthData();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
