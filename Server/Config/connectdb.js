const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    console.log(process.env.MONGODB_URI);
  try {
      await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
