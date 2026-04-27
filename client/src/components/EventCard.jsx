import { Link } from "react-router-dom";

export default function EventCard({ event, onJoin }) {
  console.log("onJoin is:", onJoin);
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
    </>
  );
}
