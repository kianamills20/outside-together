import express from "express";
import {
  createUser,
  getUserByUsernameAndPassword,
} from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import { createToken } from "../utils/jwt.js";
import { getJoinedEvents } from "../db/queries/event_attendees.js";

const router = express.Router();

router.post(
  "/register",
  requireBody(["first_name", "last_name", "username", "password"]),
  register,
);
router.post("/login", requireBody(["username", "password"]), login);
router.get("/me", requireUser, me);
router.get("/me/joined-events", requireUser, joinedEvents);

function toPublicUser(user) {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    role: user.role,
    created_at: user.created_at,
  };
}

async function register(req, res) {
  try {
    const { first_name, last_name, username, password } = req.body;

    const user = await createUser(
      first_name,
      last_name,
      username,
      password,
      "user",
    );
    const token = createToken({ id: user.id });

    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "That email is already in use." });
    }

    res.status(500).json({ error: "Unable to register user." });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = createToken({ id: user.id });
    res.status(200).json({
      token,
      user: toPublicUser(user),
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to log in." });
  }
}

function me(req, res) {
  res.status(200).json({ user: req.user });
}

async function joinedEvents(req, res, next) {
  try{
    const events = await getJoinedEvents(req.user.id);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

export default router;
