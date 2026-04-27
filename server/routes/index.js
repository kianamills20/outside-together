import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import usersRouter from "./users.js";
import categoriesRouter from "./categories.js";
import eventsRouter from "./events.js";

const router = express.Router();

router.use(getUserFromToken);

router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/events", eventsRouter);

export default router;
