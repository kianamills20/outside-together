import { useNavigate } from "react-router-dom";
import { createEvent, getCategories } from "../api";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export default function CreateEventPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    location: "",
    image_url: "",
    event_date: "",
  });

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData({
      title: formData.title,
      description: formData.description,
      category_id: formData.category_id,
      location: formData.location,
      image_url: formData.image_url,
      event_date: formData.event_date,
      [inputName]: inputValue,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newEvent = await createEvent(formData, token);
    navigate("/events/" + newEvent.id);
  }

  return (
    <>
    <main className="page">
      <h1>Create Event</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Event title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="event_date"
          placeholder="Date"
          value={formData.event_date}
          onChange={handleChange}
        />
        <button>Create Event</button>
      </form>
      </main>
    </>
  );
}
