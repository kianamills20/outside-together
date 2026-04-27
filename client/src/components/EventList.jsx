export default function EventList({ events }) {
    return (
        <div>
            {events.map((event) => {
            return <EventListItem key={event.id} event={event} />
            })}
        </div>
    )
};

function EventListItem({ event }){
    return (<>
    
    </>)
};