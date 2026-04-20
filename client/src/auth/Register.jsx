import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";

function Register() {
  const { register, isAuthenticated, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    // WHY (Functionality): Keep submitted fields aligned with backend contract
    // so registration is predictable and easier to debug for beginners.
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (isAuthLoading) {
    // WHY (Functionality): A loading state prevents users from seeing the
    // register form briefly while an existing session is being restored.
    return <p>Checking your session...</p>;
  }

  if (isAuthenticated) {
    // WHY (Documentation): This message clarifies that registration is only for
    // signed-out users, which reduces confusion in auth-related UI flows.
    return (
      <section>
        <h1>You are already logged in</h1>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </section>
    );
  }

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <div>
          <label>Email</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required />
          <button>Register</button>
          {error && <p role="alert">{error}</p>}
        </div>
      </form>
    </>
  );
}

export default Register;
