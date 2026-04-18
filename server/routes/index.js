import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import usersRouter from "./users.js";

const router = express.Router();

// WHY (Functionality): Attach authenticated user info early so nested routes
// can consistently rely on req.user when enforcing permissions.
router.use(getUserFromToken);

router.use("/users", usersRouter);

export default router;
