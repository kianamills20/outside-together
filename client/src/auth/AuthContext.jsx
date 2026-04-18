import { useEffect, useState, createContext, useContext } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
const AUTH_TOKEN_KEY = "outside_together_token";

const AuthContext = createContext();

function saveToken(token) {
  // WHY (Functionality): Keeping the token in localStorage lets auth survive
  // page refreshes, which supports a reliable end-to-end login experience.
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
    // WHY (Functionality): Hydrating user state from an existing token prevents
    // accidental logouts on refresh and keeps Context as the single auth source.
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
    // WHY (Code Style + Documentation): Centralizing session updates avoids
    // repeated auth state code and makes login/register behavior consistent.
    setToken(nextToken);
    setUser(nextUser);
    saveToken(nextToken);
  }

  const register = async (credentials) => {
    // WHY (Functionality): Register now updates Context immediately so users are
    // authenticated right after signup, matching backend response behavior.
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
    return result;
  };

  const login = async (credentials) => {
    // WHY (Functionality): Login writes both user and token into Context so all
    // components render from one shared auth state.
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

    return result;
  };

  const logout = () => {
    // WHY (Functionality): Clearing Context + localStorage ensures logout is
    // immediate and reliable across tabs and page refreshes.
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

// WHY (Code Style): This file intentionally exports both provider and hook so
// beginners can find auth logic in one place while the app remains maintainable.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
