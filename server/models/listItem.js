const mongoose = require('mongoose');

const Schema = mongoose.Schema;



//document should have 3 things:
// to-do item, that is a string, required
// priority level, that is a string, required
// and date

const listSchema = new Schema({
  listItem: {type: String, required: true, unique: true},
  priority: {type: String, required: true},
  date: {type: Date, default: Date.now()}
});

const Todo = mongoose.model('todo', listSchema);

module.exports = Todo;

//will need to restructure model
// const newListSchema = newSchema(
// { 
//   username: {type: String, required: true, unique: true},
//   todos: [
//     {
//       listItem: {type: String, required: true, unique: true},
//       priority: {type: String, required: true},
//       date: {type: Date, default: Date.now()}
//     }
//   ]
// });
