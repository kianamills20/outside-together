import EventCard from "./EventCard";

export default function EventList({ events, onJoin, onLeave, onDelete }) {
  return (
    <div>
      {events.map((event) => {
        return (
          <EventCard
            key={event.id}
            event={event}
            onJoin={onJoin}
            onLeave={onLeave}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}
