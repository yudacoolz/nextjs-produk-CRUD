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
// hooks/useAuth.ts
import { useEffect, useState } from "react";
// import axios from "axios";

export const useAuth = () => {
  // const [isToken, setIsToken] = useState<string | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   localStorage.getItem("token") ? true : false
  // );

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     // const token = localStorage.getItem("token");
  //     if (isAuthenticated) {
  //       // try {
  //       //   const { data } = await axios.get("/api/auth", {
  //       //     headers: { Authorization: `Bearer ${token}` },
  //       //   });

  //       //   setIsAuthenticated(!!data.userId);
  //       // } catch {
  //       //   setIsAuthenticated(false);
  //       // }

  //       setIsAuthenticated(true);

  //       // const token = localStorage.getItem("token");
  //       // setIsAuthenticated(!!token);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   if (typeof window !== "undefined") {
  //     checkAuth();
  //   }
  // }, []);

  const initialState = () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token") ? true : false;
    }
    return false;
  };
  const [isAuthenticated, setIsAuthenticated] = useState(initialState());

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, []);

  return isAuthenticated;
};
