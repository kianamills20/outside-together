import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api";

export default function SingleEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const fallbackImage = "/default-event.svg";
  const [imageSrc, setImageSrc] = useState(fallbackImage);

  useEffect(() => {
    async function loadEvent() {
      const data = await getEvent(id);
      setEvent(data);
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
        </div>
        </div>
      </main>
    </>
  );
}
