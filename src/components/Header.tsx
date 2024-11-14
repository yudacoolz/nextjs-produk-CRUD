"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // or "next/router" if you're using Next.js 13 or older
import { usePathname } from "next/navigation"; // Import usePathname for getting the current path
import { useAuth } from "@/contexts/useAuth"; // Use the custom useAuth hook

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const isAuthenticated = useAuth(); // Use the useAuth hook to get authentication status
  console.log("is auth dari haderr", isAuthenticated);

  const initialState = () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token") ? true : false;
    }
    return false;
  };
  const [isToken, setIsToken] = useState(initialState());
  const [isMounted, setIsMounted] = useState(false);
  console.log("isclicked", isToken);

  useEffect(() => {
    // UNTUK HINDARI HYDRATION, This checks if the code is running on the client rather than on the server, dengan window

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsToken(!!token);
      setIsMounted(true); // Set mounted state to true
    }
  }, []);

  const handLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1>My Website Header</h1>
      <div>
        {isMounted &&
          pathname !== "/login" &&
          (isToken ? (
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-black text-black hover:text-white px-4 py-2 transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handLogin}
              className="bg-white hover:bg-black text-black hover:text-white px-4 py-2 transition-all"
            >
              Login
            </button>
          ))}
      </div>
    </header>
  );
};

export default Header;
