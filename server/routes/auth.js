const express = require('express');
const authRouter = express.Router();
const authController = require('./../controller/authController.js');

authRouter.post('/signup', authController.signUp, (req, res) => {
  res.status(200).json(res.locals.username);
})

authRouter.post('/login', authController.logIn, (req, res) => {
  res.status(200).json(res.locals.username);
})





module.exports = authRouter;