"use client";

// components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/useAuth";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuth();

  const router = useRouter();
  console.log("isAuthenticated dari protected rout", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/dashboard/product");
    }
  }, [isAuthenticated, router]);

  return <>{children} </>;
};
