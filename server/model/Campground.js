const mongoose = require('mongoose')

const CampgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  images: {
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
  author: { type: Object, ref: 'User' },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema)
