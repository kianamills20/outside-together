import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const result = await register({ first_name, last_name, username, password });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <h1>Register for an account</h1>
      <form action={tryRegister}>
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
