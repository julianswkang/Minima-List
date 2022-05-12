const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  cookieId: String,
  createdAt: {type: Date},
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 3600000
  },
  userId: {type: Schema.types.ObjectId, ref: 'User'}
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;