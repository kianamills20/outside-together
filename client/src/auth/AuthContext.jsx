import { useEffect, useState, createContext, useContext } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
const AUTH_TOKEN_KEY = "outside_together_token";

const AuthContext = createContext();

function saveToken(token) {

  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!storedToken) {
      setIsAuthLoading(false);
      return;
    }

    let isCancelled = false;

    async function restoreSession() {
      try {
        const response = await fetch(API_BASE + "/api/users/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const result = await response.json();

        if (!response.ok) {
          throw Error(result.error || "Session expired");
        }

        if (!isCancelled) {
          setToken(storedToken);
          setUser(result.user);
        }
      } catch {
        if (!isCancelled) {
          setToken(null);
          setUser(null);
          saveToken(null);
        }
      } finally {
        if (!isCancelled) {
          setIsAuthLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isCancelled = true;
    };
  }, []);

  function setAuthSession(nextToken, nextUser) {

    setToken(nextToken);
    setUser(nextUser);
    saveToken(nextToken);
  }

  const register = async (credentials) => {

    const response = await fetch(API_BASE + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.error || "Something went wrong");
    }
    setAuthSession(result.token, result.user);
import { useState, createContext, useContext } from "react";
import { registerUser, loginUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const register = async (credentials) => {
    const result = await registerUser(credentials);
    return result;
  };

  const login = async (credentials) => {
 
    const response = await fetch(API_BASE + "/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.error || "Something went wrong");
    }
    setAuthSession(result.token, result.user);

    const result = await loginUser(credentials);
    setToken(result.token);
    setUser(result.user);
    return result;
  };

  const logout = () => {
 
    setUser(null);
    setToken(null);
    saveToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isAuthLoading,
    register,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

    setUser(null);
    setToken(null);
  };

  const value = { user, token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
