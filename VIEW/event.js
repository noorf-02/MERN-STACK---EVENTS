const express = require('express');
const Router = express.Router();
const { postEvent, getEvents,userEvents } = require('../CONTROLLER/event');

Router.post('/post-event', postEvent);
Router.get('/user-events', userEvents);
Router.get('/get-events', getEvents);

module.exports = Router;