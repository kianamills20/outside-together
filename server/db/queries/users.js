import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
    const SQL = `
    INSERT INTO users
    (username, password)
    VALUES ($1, $2)
    RETURNING *
    `;
    const hashedPassword = await bcrypt.hash(password, 15);
    const {
        rows: [user],
    } = await db.query(SQL, [username, hashedPassword]);
    return user;
}

