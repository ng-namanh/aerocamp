const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    author: {
      type: Object,
      ref: 'User'
    },
    content: {
      type: String
    },
    campground: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campground'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Review', ReviewSchema)
