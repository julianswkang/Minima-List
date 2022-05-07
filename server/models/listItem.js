const mongoose = require('mongoose');

const Schema = mongoose.Schema;



// //document should have 3 things:
// // to-do item, that is a string, required
// // priority level, that is a string, required
// // and date

// const listSchema = new Schema({
//   listItem: {type: String, required: true, unique: true},
//   priority: {type: String, required: true},
//   date: {type: Date, default: Date.now()}
// });

// const Todo = mongoose.model('todo', listSchema);

// module.exports = Todo;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  list: [{
    todo: {type: String, required: true, unique: true},
    priority: {type: String, required: true},
    date: {type: Date, default: Date.now()}
  }],
  points: Number
})

const User = mongoose.model('user', userSchema);

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
