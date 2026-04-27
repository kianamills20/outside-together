import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getEventAttendees } from "../api";

export default function SingleEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const fallbackImage = "/default-event.svg";
  const [imageSrc, setImageSrc] = useState(fallbackImage);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    async function loadEvent() {
      const data = await getEvent(id);
      const attendeesData = await getEventAttendees(id);

      setEvent(data);
      setAttendees(attendeesData);
      setImageSrc(data.image_url || fallbackImage);
    }
    loadEvent();
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="page">
        <div className="single-event">
          <div>
            <img
              src={imageSrc}
              alt={event.title}
              onError={() => setImageSrc(fallbackImage)}
            />
          </div>

          <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{event.event_date}</p>
            <section className="section">
              <h2>Attendees</h2>
              {attendees.length === 0 && <p>No one has joined yet.</p>}
              {attendees.map((attendee) => {
                return (
                  <p key={attendee.id}>
                    {attendee.first_name} {attendee.last_name}
                  </p>
                );
              })}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
