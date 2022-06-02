const User = require('../models/user');


const listController = {};

//addItem function to handle add item logic
listController.addItem = async function (req, res, next) {
  const { listItem, priority, username } = req.body;

  //will check to see find user
  try{
    const found = await User.findOne({username});
    //if for whatever reason the user does not exist on database, will throw an error
    if (!found) {
      return next({
        log: 'error with listController.addItems', err,
        status: 500,
        message: {err : 'There was an error when retrieving a user!'}
      })
    }
    //creating list with new item added on 
    const newList = [...found.list, {todo: listItem, priority: priority, date: Date.now()}]
    //updating the current user's list with the new list
    await User.findOneAndUpdate({username}, {list: newList})
    //adding the newList to res.locals
    res.locals.updated = newList;
    return next();
  } catch(err) {
    return next({
      log: 'error with listController.addItems', err,
      status: 500,
      message: {err: 'There was an error when adding a list item'}
    })
  }
};

//function to get items from the database
listController.getItems = async function (req, res, next) {
  const { username } = req.body;
  try{
    const found = await User.findOne({username});
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

};

  /*
  TODO: Need to verify that this logic works for editing a list item
  */

//function to edit a specific list item.. functionality not operational yet.
listController.editItem = function(req, res, next) {

  const {_id, newItem, newPriority} = req.body;
  Todo.findOneAndUpdate({ _id}, {listItem: newItem, priority: newPriority}, {new: true})
    .then(updated => {
      console.log(updated);
      res.locals.updated = updated.list;
      return next();
    }).catch(err => {
      return next({
        log: "error with listController.editItem" , err,
        status: 500,
        message: {err : "There was an error editing the to-do item(s)!"}
      })
    })
};

  /*
  TODO: Need to verify that this logic works to delete and item
  */
//function to delete a specific list item based on the specific todo passed to the server
listController.deleteItem = async function (req, res, next){
  const { todo, username } = req.body;

  //use $pull to remove specific todo list item
  try{
    const updated = await User.findOneAndUpdate({username}, { '$pull' : { 'list': { 'todo': todo }}}, {new: true})
    res.locals.updated = updated.list;
    return next();
  } catch(err){
    return next({
      log: "error with listController.deleteItem" , err,
      status: 500,
      message: {err : "There was an error deleting the to-do item!"}
    })
  } 
};

module.exports = listController;