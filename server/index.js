import pg from "pg";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/greet", helloWorld);

function helloWorld(req, res) {
  try {
    res.status(200).json({ greeting: "hello world" });
  } catch (error) {
    console.log("error");
  }
}

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
