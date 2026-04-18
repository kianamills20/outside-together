import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser(username, password, role) {
  // WHY (Functionality + Documentation): Return only non-sensitive fields so
  // registration responses cannot leak password hashes and are easier to trust.
  const SQL = `
    INSERT INTO users
    (username, password, role)
    VALUES ($1, $2, $3)
    RETURNING id, username, role, created_at
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

export async function getUserById(id) {
  // WHY (Functionality): Token-authenticated requests should load a current
  // user record from the database, and this helper keeps that query centralized.
  const SQL = `
    SELECT id, username, role, created_at
    FROM users
    WHERE id = $1
    `;
  const {
    rows: [user],
  } = await db.query(SQL, [id]);
  return user ?? null;
}
