const Todo = require('../models/listItem');


const listController = {};

listController.addItem = function (req, res, next) {
  const { listItem, priority } = req.body;
  // console.log('this list item is: ', listItem)
  // console.log('this priority is', priority)
  Todo.create({listItem, priority})
    .then(item => {
      res.locals.item = item;
      return next();
    }).catch(err => {
      return next({
        log: "error with listController.addItem" , err,
        status: 500,
        message: {err : "There was an error creating the to-do item!"}
      })
    })
};

listController.getItems = function (req, res, next) {

  Todo.find({})
    .then(items => {
      //console.log(items);
      res.locals.items = items;
      return next();
    }).catch(err => {
      return next({
        log: "error with listController.getItems" , err,
        status: 500,
        message: {err : "There was an error retreiving the to-do item(s)!"}
      })
    })
};

listController.editItem = function(req, res, next) {

  const {_id, newItem, newPriority} = req.body;
  // {new: true} --> ensures that 'updated' is the updated list item
  // compared to without it, where update would be the old list item
  Todo.findOneAndUpdate({ _id}, {listItem: newItem, priority: newPriority}, {new: true})
    .then(updated => {
      console.log(updated);
      res.locals.updated = updated;
      return next();
    }).catch(err => {
      return next({
        log: "error with listController.editItem" , err,
        status: 500,
        message: {err : "There was an error editing the to-do item(s)!"}
      })
    })
};

listController.deleteItem = function (req, res, next){
  const { _id } = req.body;

  Todo.findOneAndDelete({ _id })
    .then(deleted => {
      res.locals.deleted = deleted;
      return next();
    }).catch(err=> {
      return next({
        log: "error with listController.deleteItem" , err,
        status: 500,
        message: {err : "There was an error deleting the to-do item!"}
      })
    })
};

module.exports = listController;