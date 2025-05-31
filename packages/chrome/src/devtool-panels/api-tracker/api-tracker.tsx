import React from "react";
import { Button } from "@/components/atoms/button/button";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { useThemeStore } from "@/store/theme/theme-store";

const APITracker = () => {
  const { theme, setTheme } = useThemeStore();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeProvider>
      <div className="p-4 bg-background">
        <div className="flex justify-between items-center">
          <h2 className={`text-${theme}-500`}>API Tracker</h2>
          <Button onClick={handleTheme}>Toggle Theme</Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export { APITracker };
