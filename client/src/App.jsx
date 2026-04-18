import "./App.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Dashboard";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
