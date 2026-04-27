import { useState } from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event, onJoin, onLeave, onDelete }) {
  const fallbackImage = "/default-event.svg";
  const [imageSrc, setImageSrc] = useState(event.image_url || fallbackImage);
  const formattedDate = new Date(event.event_date).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="event-card">
      <Link className="event-card-link" to={"/events/" + event.id}>
        <div>
          <img
            src={imageSrc}
            alt={event.title}
            onError={() => setImageSrc(fallbackImage)}
          />
        </div>
        <div className="event-card-content">
          <p className="event-meta">{event.location}</p>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p className="event-date">{formattedDate}</p>
        </div>
      </Link>
      <div className="button-row">
        {typeof onJoin === "function" && (
          <button onClick={() => onJoin(event.id)}>Join Event</button>
        )}
        {typeof onLeave === "function" && (
          <button className="btn-secondary" onClick={() => onLeave(event.id)}>Leave Event</button>
        )}
        {typeof onDelete === "function" && (
          <button className="delete-btn" onClick={() => onDelete(event.id)}>Delete Event</button>
        )}
      </div>
    </div>
  );
}
