import db from "./client.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const categories = [
    "Hiking",
    "Running",
    "Paddleboarding",
    "Soccer",
    "Pickleball",
    "Tennis",
    "Camping",
    "Volleyball",
    "Golfing",
    "Skateboarding",
    "Walking",
    "Kite Flying"
  ]
}
