import { useState, createContext } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

const AuthContext = createContext();

export function AuthProvider({ children }){
    const[token, setToken] = useState();



const register = async (credentials) {
    const response = await fetch(API_BASE + "/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
        throw Error(result.error || "Something went wrong");
    }
   setToken(result.token);
};



}

export function useAuth(){
    const context = useContext(AuthContext);
    if (!context) throw Error("useAuth must be used within AuthProvider");
    return context;
}

