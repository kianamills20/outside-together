import db from "../client.js";

export async function joinEvent(userId, eventId) {
  const SQL = `
    INSERT INTO event_attendees
    (user_Id, event_Id)
    VALUES
    ($1, $2)
    RETURNING *
    `;
  const {
    rows: [attendance],
  } = await db.query(SQL, [userId, eventId]);
  return attendance;
}

export async function getJoinedEvents(userId) {
  const SQL = `
SELECT events.*
FROM event_attendees
JOIN events ON events.id = event_attendees.event_id
WHERE event_attendees.user_id = $1
ORDER BY events.event_date;
`;
  const { rows: events } = await db.query(SQL, [userId]);
  return events;
}

export async function leaveJoinedEvent(userId, eventId){
    const SQL = `
    DELETE FROM event_attendees
    WHERE user_id = $1 AND event_id = $2
    RETURNING *
    `;
    const {
        rows: [leftEvent],
    } = await db.query(SQL, [userId, eventId]);
    return leftEvent;
}

export async function getAttendeesByEventId(eventId) {
    const SQL = `
    SELECT users.id, users.first_name, users.last_name, users.username
    FROM event_attendees
    JOIN users ON users.id = event_attendees.user_id
    WHERE event_attendees.event_id = $1
    ORDER BY users.first_name
    `;

    const {
        rows: attendees
    } = await db.query(SQL, [eventId]);
    return attendees;
}