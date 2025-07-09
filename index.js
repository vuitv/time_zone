const express = require('express');
const cors = require('cors');
const moment = require('moment-timezone');
require('dotenv').config();

const TimeZoneHandler = require('./src/TimeZoneHandler');
const timeZoneRoutes = require('./src/routes/timeZoneRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/timezone', timeZoneRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Time Zone Service is running',
    timestamp: moment().format(),
    supportedRegions: ['US', 'AU']
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

app.listen(PORT, () => {
  console.log(`Time Zone Service running on port ${PORT}`);
  console.log(`Available at: http://localhost:${PORT}`);
});

module.exports = app;
