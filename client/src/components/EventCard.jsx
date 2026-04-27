import { Link } from "react-router-dom";

export default function EventCard({ event }) {
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
    </>
  );
}
