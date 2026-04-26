import express from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";
import { createCategory, getAllCategories } from "../db/queries/categories.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.send(categories);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  requireUser,
  requireAdmin,
  requireBody(["name"]),
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const category = await createCategory(name);
      res.status(201).send(category);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
