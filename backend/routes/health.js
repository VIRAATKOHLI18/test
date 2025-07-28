const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: 'connected', // Mock status
      cache: 'connected',     // Mock status
      external_api: 'connected' // Mock status
    }
  };

  res.json({
    success: true,
    data: healthData
  });
});

module.exports = router;