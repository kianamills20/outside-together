const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";


export async function getCategories(){
      const response = await fetch(`${API_BASE}/api/categories`);
      const data = await response.json();
      if (!response.ok) {
        throw Error(result.error || "Something went wrong")
      }
      return data;
}