const express = require('express');
const History = require('../models/History');

const router = express.Router();

// Create new history record
router.post('/', async (req, res) => {
  try {
    const { information, type, orderId } = req.body;

    // Validate required fields
    if (!information || !type || !orderId) {
      return res.status(400).json({ 
        message: 'Missing required fields: information, type, orderId' 
      });
    }

    // Validate type enum
    const validTypes = ['usb', 'course', 'challenge', 'دورة مكثفة'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        message: 'Invalid type. Must be one of: usb, course, challenge, دورة مكثفة' 
      });
    }

    // Create new history record
    const history = new History({
      information,
      type,
      orderId
    });

    await history.save();

    res.status(201).json({
      message: 'History record created successfully',
      history
    });
  } catch (error) {
    console.error('History creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get history records by type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;

    // Validate type enum
    const validTypes = ['usb', 'course', 'challenge', 'دورة مكثفة'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        message: 'Invalid type. Must be one of: usb, course, challenge, دورة مكثفة' 
      });
    }

    const historyRecords = await History.find({ type })
      .populate('orderId', 'type price fullName phoneNumber createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'History records retrieved successfully',
      history: historyRecords
    });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get history records by order ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const historyRecords = await History.find({ orderId })
      .populate('orderId', 'type price fullName phoneNumber createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'History records retrieved successfully',
      history: historyRecords
    });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all history records
router.get('/', async (req, res) => {
  try {
    const historyRecords = await History.find({})
      .populate('orderId', 'type price fullName phoneNumber createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'History records retrieved successfully',
      history: historyRecords
    });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
