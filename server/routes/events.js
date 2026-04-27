import express from "express";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";
import { getEvents, getEventById, createEvent } from "../db/queries/events.js";
import { joinEvent } from "../db/queries/event_attendees.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await getEvents();
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send("Event id must be a number.");
    }
    const event = await getEventById(id);

    if (!event) {
      return res.status(404).send("Event not found.");
    }
    res.send(event);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  requireUser,
  requireBody([
    "title",
    "description",
    "category_id",
    "location",
    "image_url",
    "event_date",
  ]),
  async (req, res, next) => {
    try {
      const {
        title,
        description,
        category_id,
        location,
        image_url,
        event_date,
      } = req.body;
      const event = await createEvent(
        title,
        description,
        req.user.id,
        category_id,
        location,
        image_url,
        event_date,
      );
      res.status(201).send(event);
    } catch (err) {
      next(err);
    }
  },
);

router.post("/:id/join", requireUser, async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).send("Event id must be a number.");
    }
    const joinedEvent = await joinEvent(req.user.id, eventId);
    res.status(201).send(joinedEvent);
  } catch (err) {
    next(err);
  }
});

export default router;
