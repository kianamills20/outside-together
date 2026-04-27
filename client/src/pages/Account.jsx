import { changePassword } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Account() {
  const { user, token } = useAuth();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    setMessage("");
    setError("");

    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      const result = await changePassword(
        {
          currentPassword,
          newPassword,
        },
        token,
      );
      setMessage(result.message);
    } catch (err) {
      setError(err.message);
    }
  }

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
    <main className="page">
      <section className="form">
        <h1>
          {user?.first_name} {user?.last_name}
        </h1>
        <p>{user?.username}</p>
        <h2>Change Password</h2>
        <form action={handleSubmit}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            required
          />
          <button>Save Password</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p role="alert">{error}</p>}
      </section>
    </main>
  );
}
