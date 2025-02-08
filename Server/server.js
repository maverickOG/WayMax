const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ClerkExpressWithAuth } = require('@clerk/clerk-express');
const connectDB = require('./Config/connectdb.js');
const userRoutes = require('./routes/userroutes');
const scraperRoutes = require('./routes/scraper');
const PORT = process.env.PORT || 3000;
const app = express();

require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', scraperRoutes);

const clerk = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY
});

app.use('/api', clerk, userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;