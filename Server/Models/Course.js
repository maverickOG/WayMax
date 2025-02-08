const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['Coursera', 'Udemy', 'edX', 'freeCodeCamp']
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  skills: [{
    type: String,
    trim: true
  }],
  duration: {
    hours: Number,
    weeks: Number
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  price: {
    amount: Number,
    currency: String
  },
  lastScraped: {
    type: Date,
    default: Date.now
  },
  lastUpdated: Date,
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);