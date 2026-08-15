const express = require('express');
const Router = express.Router();
const { postEvent, getEvents,userEvents } = require('../CONTROLLER/event');
const protect = require('../MIDDLEWARE/auth');

Router.post('/post-event', protect, postEvent);
Router.get('/user-events', userEvents);
Router.get('/get-events', getEvents);

module.exports = Router;