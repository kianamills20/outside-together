import EventCard from "./EventCard";

export default function EventList({ events, onJoin }) {
  return (
    <div>
      {events.map((event) => {
        return <EventCard key={event.id} event={event} onJoin={onJoin}/>;
      })}
    </div>
  );
}


