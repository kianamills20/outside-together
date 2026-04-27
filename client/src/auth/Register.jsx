import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";

function Register() {
  const { register, isAuthenticated, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
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
    <main className="page">
      return <p>Checking your session...</p>
    </main>;
  }

  if (isAuthenticated) {
    return (
      <main className="page">
        <section className="form">
          <h1>You are already logged in</h1>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="page">
        <form className="form" action={tryRegister}>
          <h1>Register for an account</h1>
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
      </main>
    </>
  );
}

export default Register;
