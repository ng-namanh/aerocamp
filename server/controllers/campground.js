const Campground = require('../model/Campground.js')
const User = require('../model/User.js')
const Review = require('../model/Review.js')
const asyncHandler = require('express-async-handler')
const imageDownloader = require('image-downloader')
const path = require('path')

const getAllCampground = asyncHandler(async (req, res) => {
  res.json(await Campground.find())
})

const getCampground = asyncHandler(async (req, res) => {
  const { id } = req.params
  const campground = await Campground.findById(id)
  const reviews = await Review.find({ campground: id }).sort({ createdAt: -1 })
  campground.reviews = reviews
  res.json({
    succes: true,
    campground
  })
})

const createCampground = asyncHandler(async (req, res) => {
  const { name, images, description, price, location } = req.body

  const { id } = req.user
  const user = await User.findById(id)
  const userInfo = {
    id: user.id,
    username: user.username
  }
  const campground = await Campground.create({
    author: userInfo,
    name,
    images,
    description,
    price,
    location
  })

  res.status(200).json({
    success: true,
    campground: campground
  })
})

const uploadCampgroundImage = asyncHandler(async (req, res) => {
  const uploadedFiles = []
  req.files.forEach((file) => {
    uploadedFiles.push(file.filename)
  })
  res.json(uploadedFiles)
})

const uploadImgByLink = asyncHandler(async (req, res) => {
  const { link } = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  const dirPath = path.join(__dirname, '..', 'uploads')
  const imagePath = path.join(dirPath, newName)
  await imageDownloader.image({
    url: link,
    dest: imagePath
  })
  res.json(newName)
})

const addReview = asyncHandler(async (req, res) => {
  const { content } = req.body
  const { id } = req.user
  const { id: campgroundId } = req.params
  const user = await User.findById(id)
  const userInfo = {
    id: user.id,
    username: user.username
  }
  const newReview = await Review.create({
    author: userInfo,
    campground: campgroundId,
    content
  })
  await Campground.findOneAndUpdate(
    {
      _id: { $eq: campgroundId }
    },
    {
      $addToSet: {
        reviews: newReview._id
      }
    }
  )
  res.status(200).json({
    message: 'Review added successfully',
    data: newReview
  })
})

module.exports = {
  createCampground,
  uploadCampgroundImage,
  getAllCampground,
  getCampground,
  uploadImgByLink,
  addReview
}
