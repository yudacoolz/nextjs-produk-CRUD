// "use client";

// import { useRouter } from "next/navigation";
// import {
//   useState,
//   useEffect,
//   useContext,
//   createContext,
//   ReactNode,
// } from "react";

// interface AuthType {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   // handlecheckAuth: () => void;
//   handleLogout: () => void;
// }

// interface AuthProviderType {
//   children: ReactNode;
// }

// // Create a context with undefined as default for strict typing
// const AuthContext = createContext<AuthType | undefined>(undefined);

// export const AuthProvider = ({ children }: AuthProviderType) => {
//   const router = useRouter();

//   const initialState = () => {
//     if (typeof window !== "undefined") {
//       return window.localStorage.getItem("token") ? true : false;
//     }
//     return false;
//   };
//   const [isAuthenticated, setIsAuthenticated] = useState(initialState());

//   const [isLoading, setisLoading] = useState(false);

//   const token = window.localStorage.getItem("token");

//   useEffect(() => {
//     // Call handlecheckAuth once when the component mounts
//     const handlecheckAuth = () => {
//       if (token) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//       setisLoading(true); // Mark authentication check as complete
//     };
//     handlecheckAuth();
//   }, [token]); // Empty dependency array ensures this runs only once on mount

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     router.push("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isLoading, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within a AuthProvidr");
//   }
//   return context;
// };

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthType {
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLogout: () => void;
}

interface AuthProviderType {
  children: ReactNode;
}

const AuthContext = createContext<AuthType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    setIsAuthenticated(!!token);
    setIsLoading(false); // Mark loading as complete
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
