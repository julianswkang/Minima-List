const express = require('express');
const updateRouter = express.Router();
const listController = require('../controller/listController');
const sessionController = require('../controller/sessionController');

// // returns the whole list of todo's from the database
updateRouter.post('/getList', sessionController.verifySession, listController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

// adds a todo to the list of todos
updateRouter.post('/addItem', sessionController.verifySession, listController.addItem, (req, res) => {
  res.status(200).json(res.locals.updated);
})

// updates a specific todo 
updateRouter.put('/', sessionController.verifySession, listController.editItem, (req, res) => {
  res.status(200).json(res.locals.updated);
})

// deletes a todo from the list
updateRouter.delete('/', sessionController.verifySession, listController.deleteItem, (req, res) => {
  res.status(200).json(res.locals.updated);
})

module.exports = updateRouter;