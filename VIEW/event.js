const express = require('express');
const Router = express.Router();
const { postEvent, getEvents } = require('../CONTROLLER/event');

Router.post('/post-event', postEvent);
Router.get('/get-events', getEvents);

module.exports = Router;