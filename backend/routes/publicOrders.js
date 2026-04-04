const express = require('express');
const Order = require('../models/Order');
const History = require('../models/History');
const { broadcastNotification } = require('./sse');

const router = express.Router();

// Health check for public orders route
router.get('/health', (req, res) => {
  res.json({ 
    message: 'Public orders route is working',
    timestamp: new Date().toISOString()
  });
});

// Create new order (public endpoint - no auth required)
router.post('/', async (req, res) => {
  try {
    const {
      type,
      price,
      phoneNumber,
      fullName,
      personType,
      time,
      photo,
      description,
      email,
      willaya,
      city
    } = req.body;

    // Create new order without confirmer/buyer assignment
    const order = new Order({
      type,
      price,
      phoneNumber,
      fullName,
      personType,
      willaya,
      city,
      time,
      photo,
      description,
      confirmer: {
        currentConfirmer: null, // Will be assigned by admin
        status: 'call_not_response',
        callAttempts: 0,
        buyer: null // Will be assigned by admin
      },
      buyer: {
        status: 'user_response',
        isRetrying: false
      }
    });

    await order.save();

    // Create history record with all order information
    const historyInformation = {
      fullName,
      phoneNumber,
      email,
      willaya,
      city,
      price,
      type,
      time,
      description,
      photo,
      createdAt: order.createdAt
    };

    const history = new History({
      information: JSON.stringify(historyInformation),
      type,
      orderId: order._id
    });

    await history.save();

    // Broadcast SSE notification for new order
    const notification = {
      type: 'new_order',
      title: 'طلب جديد',
      message: `طلب ${type} جديد من ${fullName}`,
      data: order,
      timestamp: new Date(),
      read: false
    };
    
    broadcastNotification(notification);

    res.status(201).json({
      message: 'Order created successfully',
      order,
      history
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
