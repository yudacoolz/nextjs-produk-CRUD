// "use client";
// // hooks/useAuth.ts
// import { useEffect, useState } from "react";
// import axios from "axios";

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const { data } = await axios.get("/api/auth", {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           setIsAuthenticated(!!data.userId);
//         } catch {
//           setIsAuthenticated(false);
//         }
//       } else {
//         setIsAuthenticated(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   return isAuthenticated;
// };

"use client";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true); // Token found, set authenticated to true
      } else {
        setIsAuthenticated(false); // No token, set authenticated to false
      }
    };

    checkAuth(); // Check auth status when the component mounts

    // Optionally, listen for changes in localStorage (if you want to track auth dynamically)
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // const initialState = () => {
  //   if (typeof window !== "undefined") {
  //     return window.localStorage.getItem("token") ? true : false;
  //   }
  //   return false;
  // };
  // const [isAuthenticated, setIsAuthenticated] = useState(initialState());

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (isAuthenticated) {
  //       // router.push("/dashboard/product");
  //       setIsAuthenticated(true);
  //     } else {
  //       router.push("/login");
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   if (typeof window !== "undefined") {
  //     checkAuth();
  //   }
  // }, [isAuthenticated]);

  return isAuthenticated;
};
