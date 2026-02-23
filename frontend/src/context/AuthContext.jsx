// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import api from "../utils/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!token;
  const isAdmin = user?.role === "admin";

  const login = async (email, password) => {
    setLoading(true);
    const res = await api.post("/auth/login", { email, password });
    const { token: t, user: u } = res.data;
    setToken(t); setUser(u);
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setLoading(false);
    return res.data;
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    const res = await api.post("/auth/signup", { name, email, password });
    const { token: t, user: u } = res.data;
    setToken(t); setUser(u);
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setLoading(false);
    return res.data;
  };

  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, isAdmin, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
