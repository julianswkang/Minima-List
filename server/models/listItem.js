const mongoose = require('mongoose');

const Schema = mongoose.Schema;



//document should have 2 things:
// to-do item, that is a string, required
// priority level, that is a string, required

const listSchema = new Schema({
  listItem: {type: String, required: true, unique: true},
  priority: {type: String, required: true}
});

const Todo = mongoose.model('todo', listSchema);

module.exports = Todo;