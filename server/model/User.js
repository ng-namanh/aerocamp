const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
/* import passportLocalMongoose from 'passport-local-mongoose' */

const UserSchema = new mongoose.Schema(
  {
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
    password: String
  },
  {
    timestamps: true
  }
)

/* User.plugin(passportLocalMongoose) */

module.exports = mongoose.model('User', UserSchema)
