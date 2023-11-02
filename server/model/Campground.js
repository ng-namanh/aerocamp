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
  imageUrl: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema)
