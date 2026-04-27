import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function NavBar() {
  const { user, isAuthenticated, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isAuthLoading) {
    return <nav className="top-nav">Loading auth...</nav>;
  }

  return (
    <nav className="top-nav">
      <NavLink className="brand-mark" to="/">Outside Together</NavLink>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/account">Account</NavLink>
            <span className="nav-status">{user.first_name}&apos;s Dashboard</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

  export default NavBar;
