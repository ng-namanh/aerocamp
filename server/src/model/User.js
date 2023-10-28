import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String
})

User.plugin(passportLocalMongoose)

const UserModel = mongoose.model('User', User)

export default UserModel
