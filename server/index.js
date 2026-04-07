import { getUsers } from "./db/queries/users.js";
import express from "express";
import db from "./db/client.js"
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server working");
});

app.get("/greet", helloWorld);

async function helloWorld(req, res) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

console.log("DATABASE_URL:", process.env.DATABASE_URL);
await db.connect();

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
