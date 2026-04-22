import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser(first_name, last_name, username, password, role) {
  const SQL = `
    INSERT INTO users
    (first_name, last_name, username, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING first_name, last_name, username, role, id, created_at
    `;
  const hashedPassword = await bcrypt.hash(password, 12);
  const {
    rows: [user],
  } = await db.query(SQL, [first_name, last_name, username, hashedPassword, role]);
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

export async function getUserById(id) {
  const SQL = `
    SELECT id, first_name, last_name, username, role, created_at
    FROM users
    WHERE id = $1
    `;
  const {
    rows: [user],
  } = await db.query(SQL, [id]);
  return user ?? null;
}
