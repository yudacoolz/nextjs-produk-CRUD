import React from "react";
import { ProductProvider } from "./ProductContext";
import { DarkThemeProvider } from "./DarkThemeContext";
import { AuthProvider } from "./AuthContext";

type AppProvidersProps = {
  children: React.ReactNode;
};
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <div>
      <AuthProvider>
        <ProductProvider>
          <DarkThemeProvider>{children}</DarkThemeProvider>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
};
