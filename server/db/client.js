import pg from "pg";

const url = process.env.DATABASE_URL 
const db = new pg.Client(url);

export default db;
