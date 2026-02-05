const express = require('express');
const router = express.Router();

// Store active SSE connections
const connections = new Set();

// Handle CORS preflight for SSE
router.options('/notifications', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  return res.sendStatus(204);
});

// SSE endpoint for real-time notifications
router.get('/notifications', (req, res) => {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Add connection to active connections
  connections.add(res);

  // Send initial connection message
  res.write('data: {"type":"connected","message":"Connected to notifications"}\n\n');

  // Remove connection on client disconnect
  req.on('close', () => {
    connections.delete(res);
  });
});

// Function to broadcast notifications to all connected clients
function broadcastNotification(notification) {
  const message = `data: ${JSON.stringify(notification)}\n\n`;
  
  connections.forEach(connection => {
    try {
      connection.write(message);
    } catch (error) {
      // Remove dead connections
      connections.delete(connection);
    }
  });
}

// Export the broadcast function for use in other routes
module.exports = router;
module.exports.broadcastNotification = broadcastNotification;
