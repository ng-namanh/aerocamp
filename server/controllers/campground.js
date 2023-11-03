const Campground = require('../model/Campground.js')
const User = require('../model/User.js')
const asyncHandler = require('express-async-handler')
const imageDownloader = require('image-downloader')
const path = require('path')

const getAllCampground = asyncHandler(async (req, res) => {
  res.json(await Campground.find())
})

const getCampground = asyncHandler(async (req, res) => {
  const { id } = req.params
  res.json(await Campground.findById(id))
})

const createCampground = asyncHandler(async (req, res) => {
  const { name, caption, image, description, price, location } = req.body

  const { id } = req.user
  const user = await User.findById(id)
  const userInfo = {
    id: user.id,
    username: user.username
  }
  const campground = await Campground.create({
    submittedBy: userInfo,
    name,
    caption,
    image,
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

module.exports = {
  createCampground,
  uploadCampgroundImage,
  getAllCampground,
  getCampground,
  uploadImgByLink
}
