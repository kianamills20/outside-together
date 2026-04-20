import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function NavBar() {
  const { user, isAuthenticated, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isAuthLoading) {
    return <nav>Loading auth...</nav>;
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
export default NavBar;
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
