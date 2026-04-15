import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server working");
});

app.use("/api", apiRouter);


export default app;