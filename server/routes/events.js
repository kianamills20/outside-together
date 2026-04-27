import express from "express";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";
import requireAdmin from "../middleware/requireAdmin.js";
import {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
  adminDeleteEvent,
  updateEvent,
} from "../db/queries/events.js";
import {
  getAttendeesByEventId,
  joinEvent,
  leaveJoinedEvent,
} from "../db/queries/event_attendees.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await getEvents();
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/attendees", async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).send("Event id must be a number");
    }
    const event = await getEventById(eventId);

    if (!event) {
      return res.status(404).send("Event not found.");
    }
    const attendees = await getAttendeesByEventId(eventId);
    res.send(attendees);
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
    if (err.code === "23505") {
      return res.status(409).send("You already joined this event.");
    }
  }
});

router.put(
  "/:id",
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
      const eventId = Number(req.params.id);
      if (isNaN(eventId)) {
        return res.status(400).send("Event id must be a number.");
      }
      const {
        title,
        description,
        category_id,
        location,
        image_url,
        event_date,
      } = req.body;

      const updated = await updateEvent(
        eventId,
        req.user.id,
        title,
        description,
        category_id,
        location,
        image_url,
        event_date,
      );

      if (!updated) {
        return res
          .status(404)
          .send("Event not found or you are not allowed to update it.");
      }
      res.send(updated);
    } catch (err) {
      next(err);
    }
  },
);

router.delete("/:id/leave", requireUser, async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).send("Event id must be a number.");
    }
    const leftEvent = await leaveJoinedEvent(req.user.id, eventId);
    res.status(200).send(leftEvent);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/admin/:id",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const eventId = Number(req.params.id);

      if (isNaN(eventId)) {
        return res.status(400).send("Event id must be a number.");
      }
      const deletedEvent = await adminDeleteEvent(eventId);

      if (!deletedEvent) {
        return res.status(404).send("Event not found.");
      }
      res.send(deletedEvent);
    } catch (err) {
      next(err);
    }
  },
);

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).send("Event id must be a number.");
    }
    const deletedEvent = await deleteEvent(eventId, req.user.id);

    if (!deletedEvent) {
      return res
        .status(404)
        .send("Event not found or you are not allowed to delete it.");
    }
    res.send(deletedEvent);
  } catch (err) {
    next(err);
  }
});

export default router;
