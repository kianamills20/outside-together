import db from "../client.js";

export async function createEvent(title, description, creator_id, category_id, location, image_url, event_date){
    const SQL = `
    INSERT INTO events
    (title, description, creator_id, category_id, location, image_url, event_date)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;
    const {
        rows: [event]
    } = await db.query(SQL, [title, description, creator_id, category_id, location, image_url, event_date]);
    return event;
}

export async function getEvents(){
    const SQL = `
    SELECT *
    FROM events
    ORDER BY event_date ASC
    `;
    const {
        rows: events 
    } = await db.query(SQL);
    return events;
}

export async function getEventById(id){
    const SQL = `
    SELECT *
    FROM events
    WHERE id = $1
    `;
    const {
        rows: [event]
    } = await db.query(SQL, [id]);
    return event;
}