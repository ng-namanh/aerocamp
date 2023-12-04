require('dotenv').config()
const Campground = require('../model/Campground.js')
const User = require('../model/User.js')
const Review = require('../model/Review.js')
const asyncHandler = require('express-async-handler')
const imageDownloader = require('image-downloader')
const path = require('path')
// const geocodingService = require('../services/gecoding.js')
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding.js')

// Mapbox Access Token
const mapboxToken = process.env.MAPBOX_TOKEN

// Define Mapbox Geocoding Service
const geocodingService = mbxGeocoder(
  mbxClient({
    accessToken: mapboxToken
  })
)

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

  // define geoData to extract geometry coordinates
  const geoData = await geocodingService
    .forwardGeocode({
      query: location,
      limit: 1
    })
    .send()

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
    location,
    geometry: geoData.body.features[0].geometry
  })

  res.status(200).json({
    success: true,
    campground: campground
  })
})

const deleteCampground = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { id: userId } = req.user
  const campground = await Campground.findById(id)
  if (!campground) {
    return res.status(404).json({
      message:
        'Camground not found. This campground may have been deleted already!'
    })
  }
  if (userId === campground.author.id) {
    await Campground.deleteOne({ _id: id })
    res.status(200).json({
      message: 'Campground deleted successfully'
    })
  }
})

const updateCampground = asyncHandler(async (req, res) => {
  const { id: campgroundId } = req.params
  const { id: userId } = req.user
  const { name, description, price, location } = req.body
  const geoData = await geocodingService
    .forwardGeocode({
      query: location,
      limit: 1
    })
    .send()
  const campground = await Campground.findById(campgroundId)
  if (!campground) {
    return res.status(404).json({
      message: 'Cannot found any campground to update'
    })
  }
  if (userId === campground.author.id) {
    campground.set({
      name,
      description,
      price,
      location,
      geometry: geoData.body.features[0].geometry
    })
    await campground.save()
    res.status(200).json({
      success: true,
      message: 'Campground succesfully eddited!',
      updatedCampground: campground
    })
  } else {
    res.status(404).json({
      message: 'Wrong credential!'
    })
  }
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
  addReview,
  deleteCampground,
  updateCampground
}
