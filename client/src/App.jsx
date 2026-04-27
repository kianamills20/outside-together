import "./App.css";
import { Routes, Route, UNSAFE_SingleFetchRedirectSymbol } from "react-router-dom";

import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Register from "./auth/Register";
import Login from "./auth/Login";
import PublicPage from "./pages/PublicPage";
import Error404 from "./pages/NotFound";
import SingleEventPage from "./components/SingleEventPage";


function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/events/:id" element={<SingleEventPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
