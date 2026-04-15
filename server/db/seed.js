import db from "./client.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const SQL = "INSERT INTO users (username) VALUES ($1) RETURNING *";

  const {
    rows: [username],
  } = await db.query(SQL, ["Hello World"]);
  console.log(username);
}
