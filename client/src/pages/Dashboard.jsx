import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteEvent,
  getCategories,
  getEvents,
  getJoinedEvents,
  joinEvent,
  leaveJoinedEvent,
} from "../api";
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
    try {
      await leaveJoinedEvent(eventId, token);
      await loadJoinedEvents();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(eventId) {
    try {
      await deleteEvent(eventId, token);
      await loadEvents();
    } catch (err) {
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

  let createdEvents = [];

  if (user) {
    createdEvents = events.filter((event) => {
      return event.creator_id === user.id;
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
      <main className="page">
        <div className="dashboard-header">
          <h1>Hi, {user?.first_name}</h1>
          <p>Welcome back</p>
        </div>
        <div>
          <section className="section">
            <h2 className="section-title">My Created Events</h2>
            <EventList events={createdEvents} onDelete={handleDelete} showEdit={true} />
            <Link
              className="btn-secondary"
              to={"/events/" + event.id + "/edit"}
            >
              Edit Event
            </Link>
          </section>
          <section className="section">
            <h2 className="section-title">My Joined Events</h2>
            <EventList events={joinedEvents} onLeave={handleLeave} />
          </section>
          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Explore all events</h2>
                <p className="section-copy">
                  Filter by activity, then jump into something nearby.
                </p>
              </div>
            </div>
            <div className="dashboard-actions">
              <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />
              <Link className="btn create-event-btn" to="/events/new">
                Create Event
              </Link>
            </div>
            <EventList events={filteredEvents} onJoin={handleJoin} />
          </section>
        </div>
      </main>
    </>
  );
}
