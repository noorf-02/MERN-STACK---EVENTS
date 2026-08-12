const express = require('express');
const Router = express.Router();
const Auth = require('../MODEL/auth');
const { signUp, logIn } = require('../CONTROLLER/auth');
const protect = require('../MIDDLEWARE/auth');

Router.post('/sign-up',protect, signUp);
Router.post('/log-in',protect, logIn);

module.exports = Router; 