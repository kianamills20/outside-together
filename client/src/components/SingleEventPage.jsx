import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api";

export default function SingleEventPage(){  
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        async function loadEvent() {
            const data = await getEvent(id);
            setEvent(data);
        }
        loadEvent();
    }, [id]);

    if (!event) {
        return <p>Loading...</p>
    }

    return (
        <>
        <div>
            <img src={event.image_url} alt={event.title} />
        </div>

        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{event.event_date}</p>
        </div>
        </>
    )
}