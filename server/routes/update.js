const express = require('express');
const updateRouter = express.Router();
const listController = require('../controller/listController');

// // returns the whole list of todo's from the database
updateRouter.get('/', listController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

// adds a todo to the list of todos
updateRouter.post('/', listController.addItem, listController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
})

// updates a specific todo 
updateRouter.put('/', listController.editItem, listController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
})

// deletes a todo from the list
updateRouter.delete('/', listController.deleteItem, listController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
})

module.exports = updateRouter;