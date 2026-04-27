import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvent, updateEvent } from "../api";
import { useAuth } from "../auth/AuthContext";

export default function EditEventPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
    async function loadData() {
      const categoriesData = await getCategories();
      setCategories(categoriesData);

      const eventData = await getEvent(id);

      setFormData({
        title: formData.get("title"),
        description: formData.get("description"),
        category_id: Number(formData.get("category_id")),
        location: formData.get("location"),
        image_url: formData.get("image_url"),
        event_date: formData.get("event_date"),
      });
    }
    loadData();
  }, [id]);

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

    const updatedEvent = await updateEvent(id, formData, token);
    navigate("/events/" + updatedEvent.id);
  }

  return (
    <main className="page">
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Event title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
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
          required
        />

        <input
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
        />

        <button>Save Changes</button>
      </form>
    </main>
  );
}
