const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  if (!email || !username || !password)
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  const user = new User({
    email,
    username,
    password
  })

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)

  user.password = hash

  const registeredUser = await user.save()
  return res.status(200).json({
    status: registeredUser ? true : false,
    registeredUser
  })
})

const login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
})

module.exports = {
  register
}
