import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    async function getGreeting() {
      const response = await fetch(`${API_BASE}/greet`);
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setMessage(json.username || "No username found");
      }
    }
    getGreeting();
  }, []);

  return (
    <>
      <h1>{message}</h1>;
    </>
  );
}

export default App;
