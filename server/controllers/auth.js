const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
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
  const userEmailExisted = await User.findOne({ email })
  if (userEmailExisted)
    throw new Error('User with this email has already existed!')
  else {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash

    const registeredUser = await user.save()
    return res.status(200).json({
      status: registeredUser ? true : false,
      message: registeredUser
        ? 'Register is successfully. Pleas logging in ~'
        : 'Something went wrong'
    })
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).send({ error: 'No user found for this email' })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: 'Password Incorrect'
    })
  }
  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  })
})

module.exports = {
  register,
  login
}
