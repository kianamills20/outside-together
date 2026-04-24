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
    return <nav>Loading auth...</nav>;
  }

  return (
    <nav>
      <NavLink to="/">Outside Together</NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to ="/dashboard">Dashboard</NavLink>
          <NavLink to="/account">Account</NavLink>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
}

  export default NavBar;