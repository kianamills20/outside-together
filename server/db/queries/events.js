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

export async function getEvent(){
    
}