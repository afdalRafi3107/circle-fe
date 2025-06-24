import Cookies from "js-cookie";
import React, { useEffect, useState, type ReactNode, useContext } from "react";

interface AuthContextType {
  isAuth: boolean;
  logIn: () => void;
  logOut: () => void;
}

// Buat context
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const logIn = () => {
    setIsAuth(true);
  };

  const logOut = () => {
    Cookies.remove("token");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook agar lebih mudah digunakan di komponen
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
