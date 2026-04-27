import EventCard from "./EventCard";

export default function EventList({ events, onJoin, onLeave, onDelete, showEdit }) {
  return (
    <div className="card-grid">
      {events.map((event) => {
        return (
          <EventCard
            key={event.id}
            event={event}
            onJoin={onJoin}
            onLeave={onLeave}
            showEdit={showEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}
