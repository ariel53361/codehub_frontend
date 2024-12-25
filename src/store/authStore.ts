import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../entities/User";
import AuthAPIClient from "../services/authApiClient";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  setUser: (user: User | null) => void;
  clearAuthData: () => void;
  fetchUser: () => Promise<void>;
}

const authApiClient = new AuthAPIClient();

const useAuthStore = create<AuthStore>(
  persist<AuthStore>(
    (set) => ({
      user: null,
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      clearAuthData: () => {
        set({ user: null, accessToken: null });
      },
      fetchUser: () => {
        return authApiClient
          .getCurrentUser()
          .then((data) => {
            set({ user: data });
            console.log(data)
          })
          .catch((err: Error) => {
            throw new Error(
              "Failed to fetch user data. Please try logging in again."
            );
          });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  ) as StateCreator<AuthStore, [], []>
);

export default useAuthStore;
