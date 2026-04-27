import { Link } from "react-router-dom";

export default function EventCard({ event, onJoin, onLeave, onDelete }) {
  return (
    <>
      <div className="event-card">
        <Link to={"/events/" + event.id}>
          <div>
            <img src={event.image_url} alt={event.title} />
          </div>
          <div className="event-card-content">
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{event.event_date}</p>
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
    </>
  );
}
