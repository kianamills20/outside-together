import EventCard from "./EventCard";

export default function EventList({ events, onJoin, onLeave }) {
  return (
    <div>
      {events.map((event) => {
        return (
          <EventCard
            key={event.id}
            event={event}
            onJoin={onJoin}
            onLeave={onLeave}
          />
        );
      })}
    </div>
  );
}
