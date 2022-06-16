const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BCRYPT_SALT = Number(process.env.BCRYPT_SALT);

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



//adding bcrypt salt hashing to the current password to store a hash in the database
userSchema.pre('save', function(next) {
  try {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT);
    const hash = bcrypt.hashSync(this.password, salt);
    console.log(hash);
    this.password = hash;
    return next();
  } catch (err){
    return next(err);
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
