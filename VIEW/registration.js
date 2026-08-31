const express = require("express");

const Router = express.Router();

const {
  registerEvent,
  registeredEvents,

  getEventRegistrations,
} = require("../CONTROLLER/registration");

const { protect } = require("../MIDDLEWARE/auth");

Router.post("/register/:id", protect, registerEvent);

Router.get("/registered-events", protect, registeredEvents);

Router.get(
  "/event/:id/registrations",
  protect,
  getEventRegistrations
);

module.exports = Router;
