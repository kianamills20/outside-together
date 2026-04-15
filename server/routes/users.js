import { createUser } from "../db/queries/users.js";


async function register(req, res) {
  try {
    const users = await createUser();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}