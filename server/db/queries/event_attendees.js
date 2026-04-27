import db from "../client.js";

export async function joinEvent(userId, eventId) {
    const SQL = `
    INSERTS INTO event_attendees
    (userId, eventId)
    VALUES
    ($1, $2)
    RETURNING *
    `;
    const {
        rows: [attendance],
    } = await db.query(SQL, [userId, eventId]);
    return attendance;
}