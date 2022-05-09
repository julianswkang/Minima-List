const User = require('../models/listItem');


const listController = {};

listController.addItem = async function (req, res, next) {
  const { listItem, priority, user } = req.body;
  // console.log('this list item is: ', listItem)
  // console.log('this priority is', priority)
  // Todo.create({listItem, priority})
  //   .then(item => {
  //     res.locals.item = item;
  //     return next();
  //   }).catch(err => {
  //     return next({
  //       log: "error with listController.addItem" , err,
  //       status: 500,
  //       message: {err : "There was an error creating the to-do item!"}
  //     })
  //   })

  try{

  } catch(err) {
    console.log(err);
  }
  //first need to find username
  //then add to that username's todo list
};

listController.getItems = function (req, res, next) {
  const { username } = req.body;
  // User.find({user}, 'list points')
  //   .then(info => {
  //     res.locals.info = info;
  //   })
  try{
    const found = User.find({username});
    if (!found) {
      return next({
        log: 'error with listController.getItems', err,
        status: 500,
        message: {err : 'There was an error when retrieving list of to-do item(s)!'}
      })
    }
    res.locals.items = found.list;
    return next();
  } catch(err){
    return next({
      log: 'error with retrieiving list of items from database at getItems',
      status: 500,
      message: {err: 'There was an error accessing the database when retrieving to-do items'}
    })
  }
  //will need to find all based on passed in username, and return username and list items 
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

  //first need to find username
  //then need to get that usernames list 
  //need to filter that list and remove the item that matches the passed in item
  //need to return that updated item ? maybe
};

module.exports = listController;