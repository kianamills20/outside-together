import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import usersRouter from "./users.js";

const router = express.Router();

router.use(getUserFromToken);
router.use("/users", usersRouter);



export default router;
