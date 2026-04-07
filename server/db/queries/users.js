import db from "../client.js";

export async function getUsers(){
    const SQL = "SELECT username FROM users;";
    const { rows: [users] } = await db.query(SQL);
    return users;
}