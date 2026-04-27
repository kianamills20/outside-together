import "./App.css";
import { Routes, Route} from "react-router-dom";

import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Register from "./auth/Register";
import Login from "./auth/Login";
import PublicPage from "./pages/PublicPage";
import Error404 from "./pages/NotFound";
import SingleEventPage from "./pages/SingleEventPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";


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
        <Route path="/events/new" element={<CreateEventPage />} />
        <Route path="/events/:id" element={<SingleEventPage />} />
        <Route path="/events/:id/edit" element={<EditEventPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
