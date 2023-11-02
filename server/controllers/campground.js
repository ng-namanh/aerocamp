const Campground = require('../model/Campground.js')
const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')

const createCampground = asyncHandler(async (req, res) => {
  const { name, caption, imageUrl, description, price } = req.body

  const { id } = req.user
  const user = await User.findById(id)

  const campground = await Campground.create({
    submittedBy: user,
    name,
    caption,
    imageUrl,
    description,
    price
  })

  res.status(200).json({
    success: true,
    campground: campground
  })
})

module.exports = {
  createCampground
}
