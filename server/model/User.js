const mongoose = require('mongoose')
/* import passportLocalMongoose from 'passport-local-mongoose' */

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: String,
  password: String
})

/* User.plugin(passportLocalMongoose) */

module.exports = mongoose.model('User', User)
