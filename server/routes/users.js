import express from "express";
import {
  createUser,
  getUserByUsernameAndPassword,
} from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import { createToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", requireBody(["username", "password"]), register);
router.post("/login", requireBody(["username", "password"]), login);
router.get("/me", requireUser, me);

function toPublicUser(user) {
  // WHY (Functionality + Documentation): Returning a public-safe user shape
  // documents what clients can depend on and avoids exposing sensitive fields.
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    created_at: user.created_at,
  };
}

async function register(req, res) {
  try {
    const { username, password } = req.body;

    const user = await createUser(username, password, "user");
    const token = createToken({ id: user.id });

    // WHY (Functionality): Sending token + user after registration keeps auth
    // response shape consistent with login and supports a smooth first login flow.
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (error) {
    // WHY (Functionality): Duplicate usernames are a normal user mistake, so
    // return a clear client-friendly 409 instead of an unhelpful server error.
    if (error.code === "23505") {
      return res.status(409).json({ error: "Username is already taken." });
    }

    res.status(500).json({ error: "Unable to register user." });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);

    if (!user) {
      // WHY (Functionality): Return JSON on auth failures so frontend code that
      // parses JSON does not crash and can show meaningful error messages.
      return res.status(401).json({ error: "Invalid username or password." });
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
  // WHY (Functionality): A dedicated "who am I" endpoint helps clients verify
  // persisted tokens and restore auth state after page refresh.
  res.status(200).json({ user: req.user });
}


export default router;
