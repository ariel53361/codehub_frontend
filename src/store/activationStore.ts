import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ActivationStore {
  pendingEmail: string | null;
  nextResendAt: number | null;
  setPendingEmail: (email: string) => void;
  clearPendingEmail: () => void;

  startResendCooldown: (seconds: number) => void;
  clearResendCooldown: () => void;

  clearActivationData: () => void;
}

export const useActivationStore = create<ActivationStore>()(
  persist<ActivationStore>(
    (set) => ({
      pendingEmail: null,
      nextResendAt: null,

      setPendingEmail: (email) => set({ pendingEmail: email }),
      clearPendingEmail: () => set({ pendingEmail: null }),

      startResendCooldown: (seconds) =>
        set({ nextResendAt: Date.now() + seconds * 1000 }),

      clearResendCooldown: () => set({ nextResendAt: null }),
      clearActivationData: () =>
        set({ pendingEmail: null, nextResendAt: null }),
    }),
    {
      name: "activation-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
