const express = require('express');
const dotenv = require('dotenv').config();
const connectToDb = require('./config/db');
const routes = require('./ROUTES/authRoutes'); // your master routes

const app = express();

// Body parser middleware
app.use(express.json());

// Mount all routes
app.use('/api', routes);  // all routes will be under /api

// Connect to DB and start server
const PORT = process.env.PORT || 2000;

connectToDb()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('DB connection failed', err));
