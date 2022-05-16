const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  todo: {type: String, required: true},
  priority: {type: String, required: true},
  date: {type: Date, default: Date.now()}
})

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  list: [listSchema],
  sessionId: {type: Schema.Types.ObjectId, ref: 'Session'},
  points: Number
})



const User = mongoose.model('User', userSchema);

module.exports = User;
