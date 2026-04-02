import db from "../client.js";

export async function getGreeting(){
    const SQL = "SELECT message FROM greetings ORDER BY id LIMIT 1;";
    const result = db.query(SQL);
}