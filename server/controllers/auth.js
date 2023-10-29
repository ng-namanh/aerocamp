const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  if (!email || !username || !password)
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  const response = await User.create(req.body)
  return res.status(200).json({
    status: response ? true : false,
    response
  })
})

module.exports = {
  register
}
