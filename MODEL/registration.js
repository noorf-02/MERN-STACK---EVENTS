const mongoose = require("mongoose");

const registrationModel = new mongoose.Schema(
  {
    attendee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Registration = mongoose.model("Registration", registrationModel);
module.exports = Registration;
