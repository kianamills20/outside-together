import express from "express";
import { createUser } from "../db/queries/users.js";

const router = express.Router();

router.post("/register", register);

async function register(req, res) {
  try {
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    if (!req.body) {
      return res.status(400).json({ error: "req.body is undefined" });
    }
    const { username, password } = req.body;

    const user = await createUser(username, password, "user");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export default router;
