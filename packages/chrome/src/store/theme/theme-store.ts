import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);

type TabValue = "todo-list" | "create-todo";

interface CurrentTabState {
  tab: TabValue;
  setTab: (tab: TabValue) => void;
}

export const useCurrentTab = create<CurrentTabState>()(
  persist(
    (set) => ({
      tab: "todo-list",
      setTab: (tab) => set({ tab }),
    }),
    {
      name: "current-tab",
    }
  )
);
