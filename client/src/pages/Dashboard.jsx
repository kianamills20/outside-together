import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {

    const { user } = useAuth();

  return (
    <>
      <h1>Hi, {user?.first_name}</h1>
      <p>Welcome back</p>
    </>
  );
}
