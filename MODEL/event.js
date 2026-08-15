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
    date:{
        type: Date,
        required: true,
    },
    startAt: {
        type: String,
        required: true,
    },
    endAt: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        maxLength: 12,
    },
    organizerName: {
        type: String,
        required:true
    },
    organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required:true
    }
    });

    const Event = mongoose.model("Event", eventSchema);
    module.exports = Event;
