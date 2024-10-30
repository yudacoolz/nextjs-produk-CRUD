"use client";

import { useState, useContext, createContext, ReactNode } from "react";

interface DarkThemeType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

interface DarkThemeProviderType {
  children: ReactNode;
}

// Create a context with undefined as default for strict typing
const DarkThemeContext = createContext<DarkThemeType | undefined>(undefined);

export const DarkThemeProvider = ({ children }: DarkThemeProviderType) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <DarkThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

// Custom hook for accessing the DarkTheme context
export const useDarkTheme = () => {
  const context = useContext(DarkThemeContext);
  if (!context) {
    throw new Error("useDarkTheme must be used within a DarkThemeProvider");
  }
  return context;
};
