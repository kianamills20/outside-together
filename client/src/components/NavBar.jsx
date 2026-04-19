import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!token) {
    return (
      <div>
        <NavLink to="/">Outside Together</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    );
  }

  return (
    <div>
      <NavLink to="/">Outside Together</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">Account</NavLink>

      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
