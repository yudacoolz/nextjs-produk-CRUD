"use client";

// components/ProtectedRoute.tsx
import React from "react";
import { useAuth } from "@/contexts/useAuth";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};
