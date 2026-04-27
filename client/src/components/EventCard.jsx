import { Link } from "react-router-dom";

export default function EventCard({ event, onJoin, onLeave, onDelete }) {
  return (
    <>
      <Link to={"/events/" + event.id}>
        <div>
          <img src={event.image_url} alt={event.title} />
        </div>
        <div>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.event_date}</p>
        </div>
      </Link>
      {typeof onJoin === "function" && (
        <button onClick={() => onJoin(event.id)}>Join Event</button>
      )}
      {typeof onLeave === "function" && (
        <button onClick={() => onLeave(event.id)}>Leave Event</button>
      )}
      {typeof onDelete === "function" && (
        <button onClick={() => onDelete(event.id)}>Delete Event</button>
      )}
    </>
  );
}
