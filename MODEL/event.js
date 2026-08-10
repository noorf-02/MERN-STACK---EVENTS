const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
    trim: true,
  },
  category: {
    type: String,
    enum: ["workshop", "education", "tech", "sports", "business"],
    required: true,
    default: "workshop",
  },
  venue: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    enum: ["Lahore", "Islamabad"],
    default: "Lahore",
  },
  startAt: {
    type: String,
    required: true,
  },
  endAt: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    maxLength: 12,
  },
  organzierName: {
    required: true,
    maxLength: 50,
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
