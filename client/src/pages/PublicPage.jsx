import { getCategories, getEvents } from "../api";
import CategoryFilter from "../components/CategoryList";
import { useEffect, useState } from "react";
import EventList from "../components/EventList";

export default function PublicPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [events, setEvents] = useState([]);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }
  async function loadEvents() {
    const data = await getEvents();
    setEvents(data);
  }

  useEffect(() => {
    loadCategories();
    loadEvents();
  }, []);

  let filteredEvents;

  if (selectedCategoryId === null) {
    filteredEvents = events;
  } else {
    filteredEvents = events.filter((event) => {
      return event.category_id === selectedCategoryId;
    });
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Find your next outdoor plan</p>
          <h1>Fresh air, good people, and local events that feel easy to join.</h1>
          <p className="hero-text">
            Browse hikes, rides, games, and meetups in one place. Filter by
            vibe and find something that fits your day.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Upcoming events</h2>
            <p className="section-copy">
              Explore what&apos;s happening nearby and narrow it down by activity.
            </p>
          </div>
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <EventList events={filteredEvents} />
      </section>
    </main>
  );
}
