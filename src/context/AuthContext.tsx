"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/axiosClient";
import type { User } from "@/types/user";

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

  useEffect(() => {
    // Try read token from storage/cookie and keep minimal session
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      // Optionally call a /me endpoint to refresh user; for now keep session until next login
      try {
        const cached = localStorage.getItem("auth_user");
        if (cached) setUser(JSON.parse(cached));
      } catch {}
    }
    setIsLoading(false);
  }, []);

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
