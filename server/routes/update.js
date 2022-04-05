const express = require('express');
const updateRouter = express.Router();
const listController = require('../controller/listController');

// // returns the whole list of todo's from the database
updateRouter.get('/', listController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

// adds a todo to the list of todos
updateRouter.post('/', listController.addItem, (req, res) => {
  res.status(200).json(res.locals.item);
})

// updates a specific todo 
updateRouter.put('/', listController.editItem, (req, res) => {
  res.status(200).json(res.locals.updated);
})

// deletes a todo from the list
updateRouter.delete('/', listController.deleteItem, (req, res) => {
  res.status(200).json(res.locals.deleted);
})

module.exports = updateRouter;