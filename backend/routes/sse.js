const express = require('express');
const router = express.Router();

// Store active SSE connections
const connections = new Set();

// Handle CORS preflight for SSE
router.options('/notifications', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// SSE endpoint for real-time notifications
router.get('/notifications', (req, res) => {
  // Set SSE headers with proper CORS
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Cache-Control, Content-Type'
  });

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
