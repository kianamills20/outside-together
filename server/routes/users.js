import express from "express";
import { createUser } from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

router.post("/register", requireBody(["username", "password"]), register);

async function register(req, res) {
  try {
    const { username, password } = req.body;

    const user = await createUser(username, password, "user");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export default router;
