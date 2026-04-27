import { Link } from "react-router-dom";

export default function EventList({ events }) {
  return (
    <div>
      {events.map((event) => {
        return <EventListItem key={event.id} event={event} />;
      })}
    </div>
  );
}

function EventListItem({ event }) {
  return (
    <>
      <Link to={"/events/" + event.id}>
        <img src={event.image_url} alt={event.title} />
        <div>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.event_date}</p>
        </div>
      </Link>
    </>
  );
}
