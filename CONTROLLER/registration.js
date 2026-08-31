const Event = require("../MODEL/event");
const Registration = require("../MODEL/registration");

const registerEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.status !== "approved") {
      return res.status(400).json({
        message: "This event is not available for registration",
      });
    }

    const alreadyRegistered = await Registration.findOne({
      attendee: req.user.id,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "You are already registered for this event",
      });
    }

    const registration = await Registration.create({
      attendee: req.user.id,
      event: eventId,
    });

    res.status(201).json({
      message: "Successfully registered for event",
      registration,
    });
  } catch (error) {
    console.log("REGISTRATION BACKEND ERROR:", error);

    res.status(500).json({
      message: "Could not register for event",
      error: error.message,
    });
  }
};

const registeredEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({
      attendee: req.user.id,
    }).populate("event");

    res.status(200).json({
      registrations,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not fetch registered events",
    });
  }
};

module.exports = {
  registerEvent,
  registeredEvents,
};