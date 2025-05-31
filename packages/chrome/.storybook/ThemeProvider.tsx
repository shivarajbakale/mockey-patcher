import React from "react";
import { useEffect, useState } from "react";
import { themes } from "@storybook/theming";
import { useDarkMode } from "storybook-dark-mode";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useDarkMode();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
};
