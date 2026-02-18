import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      setSession: (session) =>
        set({
          session: session,
          user: session?.user ?? null,
        }),
      clearAuth: () => set({ user: null, session: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
