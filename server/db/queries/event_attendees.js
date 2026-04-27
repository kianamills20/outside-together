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
