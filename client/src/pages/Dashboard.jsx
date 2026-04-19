import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom"

export default function Dashboard() {

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
      <h1>Hi, {user?.first_name}</h1>
      <p>Welcome back</p>
    </>
  );
}
