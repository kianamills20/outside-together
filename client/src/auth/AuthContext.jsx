import { useState, createContext, useContext } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

const AuthContext = createContext();

export function AuthProvider({ children }){
    const[user, setUser] = useState();
    const[token, setToken] = useState();



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
    setUser(result.user);
    setToken(result.token);

    return result;
}
const logout = () => {
    setUser(null);
    setToken(null);
}

const value = { user, token, register, login, logout };
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export function useAuth(){
    const context = useContext(AuthContext);
    if (!context) throw Error("useAuth must be used within AuthProvider");
    return context;
}

