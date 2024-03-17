import { create } from 'zustand'
import { useEffect } from "react";

const useStore = create((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  resetNotifications: () => set({ notifications: [] }),

  user: null, // Initially set to null or a default state
  setUser: (user) => set({ user }),
  hydrate: () =>
    set({
      user: JSON.parse(localStorage.getItem("user") || "{}"),
    }),
}));

// Use this hook in your component to hydrate the store with localStorage values
export const useHydrateStore = () => {
  const hydrate = useStore((state) => state.hydrate);

  useEffect(() => {
    if (typeof window !== "undefined") {
      hydrate();
    }
  }, [hydrate]);
};

export default useStore;
