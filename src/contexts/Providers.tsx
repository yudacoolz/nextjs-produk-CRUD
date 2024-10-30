import React from "react";
import { ProductProvider } from "./ProductContext";
import { DarkThemeProvider } from "./DarkThemeContext";

type AppProvidersProps = {
  children: React.ReactNode;
};
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <div>
      <ProductProvider>
        <DarkThemeProvider>{children}</DarkThemeProvider>
      </ProductProvider>
    </div>
  );
};
