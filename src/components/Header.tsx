"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // or "next/router" if you're using Next.js 13 or older
import { usePathname } from "next/navigation"; // Import usePathname for getting the current path
import { useAuth } from "@/contexts/useAuth"; // Use the custom useAuth hook
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { useProductContext } from "@/contexts/ProductContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const isAuthenticated = useAuth(); // Use the useAuth hook to get authentication status
  console.log("is auth dari haderr", isAuthenticated);
  // const { fetchProduct } = useProductContext();

  const initialState = () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token") ? true : false;
    }
    return false;
  };
  const [isToken, setIsToken] = useState(initialState());
  const [isMounted, setIsMounted] = useState(false);
  console.log("isclicked", isToken);
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

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

  const HandleToggleSidebar = () => {
    setIsToggleSidebar(!isToggleSidebar);
  };

  const handleNavigation = () => {
    const page = "1"; // Example dynamic page value
    router.push(`/products?page=${page}`);
  };

  return (
    <header className="relative flex flex-col h-full">
      {/* BACKDROP */}
      {isToggleSidebar && (
        <div
          className="md:hidden fixed top-0 left-0 h-full w-full bg-black opacity-50 z-10"
          onClick={HandleToggleSidebar}
        ></div>
      )}

      <div className="bg-gray-800 text-white w-full p-4 flex justify-between items-center z-50 fixed">
        <Link href="/">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faInstagram} size="2xl" />
            <h2>My Website </h2>
          </div>
        </Link>

        {/* BURGER BUTTON */}
        <div className="md:hidden">
          <button onClick={HandleToggleSidebar}>
            {isToggleSidebar ? (
              <FontAwesomeIcon icon={faXmark} size="2xl" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="2xl" />
            )}
          </button>
        </div>

        <div className="hidden md:flex gap-2">
          <Link href="/">
            <button
              className=" hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg"
              onClick={() => router.push("/")}
            >
              Home
            </button>
          </Link>
          {/* <Link href="/products">
            <button
              className="hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg"
              onClick={() => router.push("/products")}
            >
              Products
            </button>
          </Link> */}
          <button
            className="hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg"
            onClick={handleNavigation}
          >
            Products
          </button>
          {isMounted && isToken && (
            <Link href="/dashboard/product">
              <button
                className="hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg"
                onClick={() => router.push("/dashboard/product")}
              >
                Dashboard
              </button>
            </Link>
          )}
          <Link href="/about">
            <button
              className="hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg"
              onClick={() => router.push("/about")}
            >
              About
            </button>
          </Link>

          {/* Button Login */}
          {isMounted &&
            pathname !== "/login" &&
            (isToken ? (
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-black text-black hover:text-white px-4 py-2 transition-all rounded-lg"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handLogin}
                className="bg-white hover:bg-black text-black hover:text-white px-4 py-2 transition-all rounded-lg"
              >
                Login
              </button>
            ))}
        </div>
      </div>

      {/* SIDEBAR */}
      {isToggleSidebar && (
        <div className="md:hidden flex flex-col grow items-end gap-8 fixed right-0 top-[64px] bg-gray-800 w-3/4 h-screen px-5 py-10 z-40">
          <Link href="/">
            <button
              className=" hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg text-2xl font-semibold"
              onClick={() => router.push("/")}
            >
              Home
            </button>
          </Link>
          <Link href="/products">
            <button
              className="hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg text-2xl font-semibold"
              onClick={() => router.push("/products/?page=1")}
            >
              Products
            </button>
          </Link>
          {isToken && (
            <Link href="/dashboard/product">
              <button
                className="hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg text-2xl font-semibold"
                onClick={() => router.push("/dashboard/product")}
              >
                Dashboard
              </button>
            </Link>
          )}
          <Link href="/about">
            <button
              className="hover:bg-white text-white hover:text-black px-4 py-2 transition-all rounded-lg text-2xl font-semibold"
              onClick={() => router.push("/about")}
            >
              About
            </button>
          </Link>

          {/* Button Login */}
          {isMounted &&
            pathname !== "/login" &&
            (isToken ? (
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-black text-2xl font-semibold text-black hover:text-white px-4 py-4 transition-all rounded-lg  mb-20"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handLogin}
                className="bg-white hover:bg-black text-2xl font-semibold text-black hover:text-white px-4 py-4 transition-all rounded-lg "
              >
                Login
              </button>
            ))}
        </div>
      )}
    </header>
  );
};

export default Header;
