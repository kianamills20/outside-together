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
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    try {
      await register({ username, password, first_name, last_name });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (isAuthLoading) {
    return (
      <main className="page">
        <p>Checking your session...</p>
      </main>
    );
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
    <main className="page">
      <form className="form" action={tryRegister}>
        <h1>Register for an account</h1>
        <div>
          <label>First Name</label>
          <input type="text" name="first_name" required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="last_name" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="username" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required />
        </div>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </main>
  );
}

export default Register;
