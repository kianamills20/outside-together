

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function registerUser(credentials) {
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
}
