const User = require('../models/user');


const listController = {};

listController.addItem = async function (req, res, next) {
  const { listItem, priority, username } = req.body;
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
    const found = await User.findOne({username});
    if (!found) {
      return next({
        log: 'error with listController.addItems', err,
        status: 500,
        message: {err : 'There was an error when retrieving a user!'}
      })
    }
    const newList = [...found.list, {todo: listItem, priority: priority, date: Date.now()}]
    
    await User.findOneAndUpdate({username}, {list: newList})
    res.locals.updated = newList;
    return next();
  } catch(err) {
    return next({
      log: 'error with listController.addItems', err,
      status: 500,
      message: {err: 'There was an error when adding a list item'}
    })
  }

  // try{
  //   await User.updateOne({username}, { '$push' : { 'list': { 'todo': todo }}}, {safe: true})
  //   return next();
  // } catch(err){
  //   return next({
  //     log: 'error with listController.addItems', err,
  //     status: 500,
  //     message: {err: 'There was an error when adding a list item'}
  //   })
  // } 
};

listController.getItems = async function (req, res, next) {
  const { username } = req.body;
  // User.find({user}, 'list points')
  //   .then(info => {
  //     res.locals.info = info;
  //   })
  try{
    const found = await User.findOne({username});
    if (!found) {
      return next({
        log: 'error with listController.getItems', err,
        status: 500,
        message: {err : 'There was an error when retrieving list of to-do item(s)!'}
      })
    }
    console.log('found user in listController.getItems:', found);
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

  // Todo.findOneAndDelete({ _id })
  //   .then(deleted => {
  //     res.locals.deleted = deleted;
  //     return next();
  //   }).catch(err=> {
  //     
  //   })

  //first need to find username
  //then need to get that usernames list 
  //need to filter that list and remove the item that matches the passed in item
  //need to return that updated item ? maybe
};

module.exports = listController;