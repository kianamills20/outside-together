import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function Account() {
  const { user, token } = useAuth();

  if (!token) {
    return (
      <>
        <h1>Account</h1>
        <p>You're not logged in.</p>
        <div>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register if you don't have an account.</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>
        {user?.first_name} {user?.last_name}
      </h1>
      <p>Account settings</p>
    </>
  );
}
