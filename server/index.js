import db from "./db/client.js"
import app from "./app.js";

const PORT = process.env.PORT || 3001;

console.log("DATABASE_URL:", process.env.DATABASE_URL);
await db.connect();

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
