import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories, getEvents } from "../api";
import CategoryFilter from "../components/CategoryList";
import EventList from "../components/EventList";


export default function Dashboard() {
  const { user, token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  async function loadEvents(){
    const data = await getEvents();
    setEvents(data);
  }

  useEffect(() => {
    loadCategories();
    loadEvents();
  }, []);

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
      <div>
        <CategoryFilter categories={categories} />
        <EventList events={events} />
      </div>
    </>
  );
}
