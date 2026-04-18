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
    const result = await loginUser(credentials);
    setToken(result.token);
    setUser(result.user);
    return result;
  };

  const logout = () => {
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
