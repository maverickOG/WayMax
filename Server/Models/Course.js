// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['Coursera', 'Udemy']
  },
  description: {
    type: String,
    required: true,
    default: 'No description available' // Fallback value
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Not Specified'], // Added more options
    default: 'Not Specified'
  },
  duration: {
    type: String,
    default: 'Not specified'
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  lastScraped: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);