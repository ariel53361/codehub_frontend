import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Profile } from "../entities/Profile";
import UserApiClient from "../services/userApiClient";
import ProfileAPIClient from "../services/profileApiClient";

interface AuthStore {
  profile: Profile | null;
  accessToken: string | null;
  setProfile: (user: Profile | null) => void;
  setAccessToken: (token: string) => void;
  clearAuthData: () => void;
  fetchUser: () => Promise<void>;
}

const userApiClient = new UserApiClient();
const profileApiClient = new ProfileAPIClient();

const useAuthStore = create<AuthStore>(
  persist<AuthStore>(
    (set) => ({
      profile: null,
      accessToken: null,
      setProfile: (user) => set({ profile: user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAuthData: () => {
        set({ profile: null, accessToken: null });
      },
      fetchUser: () => {
        return userApiClient
          .getCurrentUser()
          .then((user) => {
            return profileApiClient.getCurrentProfile().then((profile) => {
              set({ profile });
            });
          })
          .catch((err) => {
            throw new Error("Failed to fetch user data. Please log in again.");
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
