import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories, getEvents, getJoinedEvents, joinEvent, leaveJoinedEvent } from "../api";
import CategoryFilter from "../components/CategoryList";
import EventList from "../components/EventList";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  async function loadEvents() {
    const data = await getEvents();
    setEvents(data);
  }

  async function loadJoinedEvents() {
    const data = await getJoinedEvents(token);
    setJoinedEvents(data);
  }

  useEffect(() => {
    loadCategories();
    loadEvents();
    
    if (token) {
      loadJoinedEvents();
    }
    
  }, [token]);

  async function handleJoin(eventId) {
    try {
      await joinEvent(eventId, token);
      await loadJoinedEvents();
      alert("Joined event!");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLeave(eventId) {
    try{
      await leaveJoinedEvent(eventId, token);
      await loadJoinedEvents();
    } catch(err){
      console.error(err);
    }
  }

  let filteredEvents;

  if (selectedCategoryId === null) {
    filteredEvents = events;
  } else {
    filteredEvents = events.filter((event) => {
      return event.category_id === selectedCategoryId;
    });
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
    <>
      <h1>Hi, {user?.first_name}</h1>
      <p>Welcome back</p>
      <div>
        <section>
          <h2>My Joined Events</h2>
          <EventList events={joinedEvents} onLeave={handleLeave} />
        </section>
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <Link to="/events/new">Create Event</Link>
        <EventList events={filteredEvents} onJoin={handleJoin} />
      </div>
    </>
  );
}
