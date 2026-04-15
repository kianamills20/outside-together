import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser(username, password, role) {
  const SQL = `
    INSERT INTO users
    (username, password, role)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const hashedPassword = await bcrypt.hash(password, 12);
  const {
    rows: [user],
  } = await db.query(SQL, [username, hashedPassword, role]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const SQL = `
    SELECT *
    FROM users
    WHERE username = $1
    `;
  const {
    rows: [user],
  } = await db.query(SQL, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}
