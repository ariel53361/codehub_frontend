import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { axiosInstance } from "../services/api-client";
import User from "../entities/User";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: User | null) => void;
  clearAuthData: () => void;
  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthStore>(
  persist<AuthStore>(
    (set) => ({
      user: null,
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setUser: (user) => set({ user }),
      clearAuthData: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ user: null, accessToken: null, refreshToken: null });
      },
      fetchUser: async () => {
        try {
          const response = await axiosInstance.get("/auth/users/me/");
          const user = response.data;
          set({ user });
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      },
    }),
    {
      name: "auth-storage", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
    }
  ) as StateCreator<AuthStore, [], []>
);

export default useAuthStore;
