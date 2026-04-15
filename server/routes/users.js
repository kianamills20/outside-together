import express from "express";
import {
  createUser,
  getUserByUsernameAndPassword,
} from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

router.post("/register", requireBody(["username", "password"]), register);
router.post("/login", requireBody(["username", "password"]), login);

async function register(req, res) {
  try {
    const { username, password } = req.body;

    const user = await createUser(username, password, "user");

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export default router;
