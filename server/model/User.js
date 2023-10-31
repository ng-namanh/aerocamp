const mongoose = require('mongoose')

/* import passportLocalMongoose from 'passport-local-mongoose' */

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  refreshToken: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

/* User.plugin(passportLocalMongoose) */

module.exports = mongoose.model('User', UserSchema)
