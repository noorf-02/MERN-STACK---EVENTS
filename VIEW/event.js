const express = require('express');
const Router = express.Router();
const { postEvent, getEvents,userEvents, deleteEvent, editEvent,getSingleEvent } = require('../CONTROLLER/event');
const protect = require('../MIDDLEWARE/auth');

Router.post('/post-event', protect, postEvent);

Router.get('/get-events', getEvents);
Router.get('/user-events',protect, userEvents);
Router.get('/event/:id', protect, getSingleEvent);

Router.delete('/delete-event/:id',protect, deleteEvent);
Router.patch('/edit-event/:id',protect, editEvent);

module.exports = Router;