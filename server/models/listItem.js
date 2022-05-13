const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  list: [{
    todo: {type: String, required: true, unique: true},
    priority: {type: String, required: true},
    date: {type: Date, default: Date.now()}
  }],
  sessionId: {type: Schema.Types.ObjectId, ref: 'Session'},
  points: Number
})

const User = mongoose.model('User', userSchema);

module.exports = User;
//   {user: name,
//   todos: [{todo: fdsfdsa, priority: low, date: 4232432},{todo: fdsfdsa, priority: low, date: 4232432},{todo: fdsfdsa, priority: low, date: 4232432}],
//   points: 4}

// users : { user1: {
//             todos: [
//               {
//                 todo: fdsfdsa,
//                 priority: low,
//                 date: 4432423
//               }
//             ],
//             points: 4
//             },
          
//           user2: {
//             todos: [
//               {
//                 todo: fdsafdsa,
//                 priority: low,
//                 date: 543534
//               },
//               {
//                 todo: fdsafdsa,
//                 priority: low,
//                 date: 543534
//               },
//               {
//                 todo: fdsafdsa,
//                 priority: low,
//                 date: 543534
//               }
//             ]
//           }
          
//           }
