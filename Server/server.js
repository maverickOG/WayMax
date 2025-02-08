const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./Config/connectdb.js');
const userRoutes = require('./routes/userroutes');
const scraperRoutes = require('./routes/scraper');
const { clerkMiddleware } = require('@clerk/express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

// Clerk middleware must be added before routes
app.use(clerkMiddleware());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', scraperRoutes);
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
