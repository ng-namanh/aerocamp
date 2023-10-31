const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id)

  return res.status(200).json({
    success: true,
    response: user ? user : 'User not found'
  })
})

module.exports = {
  getUserProfile
}
