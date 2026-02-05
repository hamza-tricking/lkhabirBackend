const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Create new order (public endpoint - no auth required)
router.post('/', async (req, res) => {
  try {
    const {
      type,
      price,
      phoneNumber,
      fullName,
      time,
      photo,
      description
    } = req.body;

    // Create new order without confirmer/buyer assignment
    const order = new Order({
      type,
      price,
      phoneNumber,
      fullName,
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

    // Emit WebSocket notification for new order
    const io = req.app.get('io');
    if (io) {
      io.emit('notification', {
        type: 'notification',
        notification: {
          id: order._id,
          type: 'new_order',
          title: 'طلب جديد',
          message: `طلب ${type === 'usb' ? 'USB' : 'دورة'} جديد من ${fullName}`,
          data: order,
          timestamp: new Date(),
          read: false
        }
      });
    }

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
