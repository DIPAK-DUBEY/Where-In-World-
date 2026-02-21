import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create((
  persist(
    (set) => ({
      Input: "",

      setInput: (value) => {
        set({ Input: value });
      },
      Mode: false,
      hasHydrated: false,

      setMode: (value) => set({ Mode: value }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'ThemeColor',
      partialize: (state) => ({
        Mode: state.Mode
      }),
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },

    }
  )
));

export default useStore;
