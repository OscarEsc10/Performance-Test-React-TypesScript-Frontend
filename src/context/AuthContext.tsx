"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/axiosClient";
import type { User } from "@/types/user";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";

export interface LoginData {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Try to read token from cookies and decode it
    const token = getCookie("token");
    if (token && typeof token === "string") {
      try {
        const decoded: any = jwtDecode(token);
        const user: User = {
          id: decoded.sub,
          username: decoded.username,
          role: decoded.role,
          email: "", // Not in JWT, can add if needed
          isActive: true, // Assume active
          createdAt: new Date().toISOString(), // Not in JWT
        };
        setUser(user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setIsLoading(false);
  }, [pathname]);

  const login = async (credentials: LoginData) => {
    const res = await api.post<{ access_token: string; user: User }>("/auth/login", credentials);
    const { access_token, user } = res.data;
    // persist token; middleware uses cookie and axios uses localStorage/cookie
    if (typeof window !== "undefined") {
      localStorage.setItem("token", access_token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      // also set cookie for Next middleware redirects
      document.cookie = `token=${access_token}; path=/`;
    }
    setUser(user);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
      document.cookie = "token=; Max-Age=0; path=/";
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
