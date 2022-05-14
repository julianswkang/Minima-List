const express = require('express');
const authRouter = express.Router();
const authController = require('../controller/authController.js');
const sessionController = require('../controller/sessionController');

authRouter.post('/signup', authController.signUp, sessionController.createSession, (req, res) => {
  res.status(200).json(res.locals.username);
})

authRouter.post('/login', authController.logIn, sessionController.createSession, (req, res) => {
  res.status(200).json(res.locals.username);
})





module.exports = authRouter;