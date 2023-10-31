const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '14d' })

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err)
        return res.status(401).json({
          success: false,
          message: 'Invalid access token'
        })
      console.log(payload)
      req.user = payload
      next()
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Required authentication!'
    })
  }
})

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken
}
