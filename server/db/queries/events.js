import db from "../client.js";

export async function createEvent(
  title,
  description,
  creator_id,
  category_id,
  location,
  image_url,
  event_date,
) {
  const SQL = `
    INSERT INTO events
    (title, description, creator_id, category_id, location, image_url, event_date)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;
  const {
    rows: [event],
  } = await db.query(SQL, [
    title,
    description,
    creator_id,
    category_id,
    location,
    image_url,
    event_date,
  ]);
  return event;
}

export async function getEvents() {
  const SQL = `
    SELECT *
    FROM events
    ORDER BY event_date ASC
    `;
  const { rows: events } = await db.query(SQL);
  return events;
}

export async function getEventById(id) {
  const SQL = `
    SELECT *
    FROM events
    WHERE id = $1
    `;
  const {
    rows: [event],
  } = await db.query(SQL, [id]);
  return event;
}

export async function deleteEvent(eventId, userId) {
  const SQL = `
    DELETE FROM events
    WHERE id = $1 AND creator_id = $2
    RETURNING *
    `;
  const {
    rows: [deleteEvent],
  } = await db.query(SQL, [eventId, userId]);
  return deleteEvent;
}

export async function adminDeleteEvent(eventId) {
  const SQL = `
    DELETE FROM events
    WHERE id = $1
    RETURNING *
    `;
  const {
    rows: [deleteEvent],
  } = await db.query(SQL, [eventId]);
  return deleteEvent;
}

export async function updateEvent(
  title,
  description,
  category_id,
  location,
  image_url,
  event_date,
  eventId,
  userId,
) {
  const SQL = `
    UPDATE events
    SET title = $1, 
    description = $2,
    category_id = $3,
    location = $4,
    image_url = $5,
    event_date = $6
    WHERE id = $7 and creator_id = $8
    RETURNING *
    `;
  const {
    rows: [event],
  } = await db.query(SQL, [
    title,
    description,
    category_id,
    location,
    image_url,
    event_date,
    eventId,
    userId,
  ]);
  return event;
}
