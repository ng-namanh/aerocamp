const mongoose = require('mongoose')

const CampgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  caption: {
    type: String,
    required: true
  },
  image: {
    type: [String]
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  submittedBy: { type: Object, ref: 'User' },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema)
