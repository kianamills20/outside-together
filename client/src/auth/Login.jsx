import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";

function Login() {
  const { login, isAuthenticated, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/");
      const result = await login({ username, password });
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  if (isAuthLoading) {
   
    return <p>Checking your session...</p>;
  }

  if (isAuthenticated) {
    return (
      <section>
        <h1>You're already logged in</h1>
        <button onClick={() => navigate("/dashboard")}>Go to Home</button>
      </section>
    );
  }

  return (
    <>
      <h1>Log into your account</h1>
      <form action={tryLogin}>
        <div>
          <label>Email</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required />
          <button>Login</button>
          {error && <p role="alert">{error}</p>}
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </>
  );
}

export default Login;
