import React from "react";
import { useEffect } from "react";
import { useThemeStore } from "@store/theme/theme-store";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();

  // Function to update theme classes
  const updateTheme = (newTheme: string) => {
    const root = document.documentElement;
    const body = document.body;

    // Remove both themes from both elements
    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");

    // Add the new theme to both elements
    root.classList.add(newTheme);
    body.classList.add(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    updateTheme(theme);
  }, []);

  // Update theme when it changes
  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return <>{children}</>;
}
