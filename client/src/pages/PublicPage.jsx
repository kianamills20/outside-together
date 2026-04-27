import { getCategories, getEvents } from "../api";
import CategoryFilter from "../components/CategoryList";
import { useEffect, useState } from "react";
import EventList from "../components/EventList";

export default function PublicPage() {
  const [categories, setCategories] = useState([]);
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

  return (
    <>
      <h1>Landing Page</h1>
      <div>
        <CategoryFilter categories={categories} />
        <EventList events={events} />
      </div>
    </>
  );
}
