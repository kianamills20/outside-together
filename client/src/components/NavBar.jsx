import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function NavBar() {
  const { user, isAuthenticated, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // WHY (Functionality): Keep logout in Context so every component updates
    // from one shared auth state and the UI immediately reflects sign-out.
    logout();
    navigate("/login");
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
