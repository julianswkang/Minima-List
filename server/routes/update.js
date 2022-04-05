const express = require('express');
const updateRouter = express.Router();
const listController = require('../controller/listController');

// returns the whole list of todo's from the database
updateRouter.get('/');

// adds a todo to the list of todos
updateRouter.post('/')

// updates a specific todo 
updateRouter.put('/')

// deletes a todo from the list
updateRouter.delete('/')