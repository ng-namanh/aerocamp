const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const {
  generateAccessToken,
  generateRefreshToken
} = require('../middlewares/jwt.js')

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

    const payload = {
      id: registeredUser.id
    }

    const token = generateAccessToken(payload)

    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: registeredUser.id,
        username: registeredUser.username,
        email: registeredUser.email
      }
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
  const payload = {
    id: user.id
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Credentials'
    })
  }
  const token = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)
  res.cookie('refreshToken', refreshToken, {
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true
  })

  await User.findByIdAndUpdate(
    user._id,
    { refreshToken, updated: Date.now() },
    { new: true }
  )
  res.status(200).json({
    success: true,
    token: `Bearer ${token}`,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  })
})

const logout = asyncHandler(async (req, res) => {
  /*  res.cookie('refresh token', '').json(true) */
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken)
    throw new Error('No refresh token in cookie')
  // delete refresh token in database
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: '' },
    { new: true }
  )
  res.clearCookie('refreshtoken', {
    httpOnly: true,
    secure: true
  })
  res.json({
    success: true,
    message: 'Logged out'
  })
})

module.exports = {
  register,
  login,
  logout
}
