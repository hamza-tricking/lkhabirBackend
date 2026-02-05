const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Debug middleware for POST requests only
router.post('*', (req, res, next) => {
  console.log(`POST ${req.path} - Headers:`, req.headers);
  console.log('Body:', req.body);
  next();
});

// Create new order (public endpoint - no auth required for initial creation)
router.post('/', async (req, res) => {
  try {
    console.log('Order creation request received:', req.body);
    
    const {
      type,
      price,
      phoneNumber,
      fullName,
      time,
      photo,
      description
    } = req.body;

    // Validate required fields
    if (!type || !price || !phoneNumber || !fullName || !time || !description) {
      console.log('Missing required fields:', { type, price, phoneNumber, fullName, time, description });
      return res.status(400).json({ message: 'Missing required fields' });
    }

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
    console.log('Order created successfully:', order._id);

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

// Create new order (authenticated user version)
router.post('/authenticated', auth, async (req, res) => {
  try {
    const {
      type,
      price,
      phoneNumber,
      fullName,
      time,
      photo,
      description,
      confirmerId,
      buyerId
    } = req.body;

    // Validate confirmer and buyer if provided
    if (confirmerId) {
      const confirmer = await User.findById(confirmerId);
      if (!confirmer || confirmer.role !== 'confirmer') {
        return res.status(400).json({ message: 'Invalid confirmer' });
      }
    }
    
    if (buyerId) {
      const buyer = await User.findById(buyerId);
      if (!buyer || buyer.role !== 'buyer') {
        return res.status(400).json({ message: 'Invalid buyer' });
      }
    }

    const order = new Order({
      type,
      price,
      phoneNumber,
      fullName,
      time,
      photo,
      description,
      confirmer: {
        currentConfirmer: confirmerId,
        status: 'call_not_response',
        callAttempts: 0,
        buyer: buyerId
      },
      buyer: {
        status: 'user_response',
        isRetrying: false
      }
    });

    await order.save();
    await order.populate('confirmer.currentConfirmer confirmer.buyer', 'username role');

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

// Get recent orders for polling (admin and confirmer only)
router.get('/recent', auth, async (req, res) => {
  try {
    const user = req.user;
    
    // Only allow admin and confirmer to poll for recent orders
    if (user.role !== 'admin' && user.role !== 'confirmer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    let orders;
    if (user.role === 'admin') {
      orders = await Order.find({
        createdAt: { $gte: fiveMinutesAgo }
      }).sort({ createdAt: -1 });
    } else {
      // Confirmer can only see orders assigned to them
      orders = await Order.find({
        'confirmer.currentConfirmer': user._id,
        createdAt: { $gte: fiveMinutesAgo }
      }).sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const orders = await Order.find()
      .populate('confirmer.currentConfirmer confirmer.buyer', 'username role')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get orders for confirmer
router.get('/confirmer', auth, async (req, res) => {
  try {
    if (req.user.role !== 'confirmer') {
      return res.status(403).json({ message: 'Confirmer access required' });
    }

    const orders = await Order.find({ 'confirmer.currentConfirmer': req.user._id })
      .populate('confirmer.buyer', 'username role')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get orders for buyer
router.get('/buyer', auth, async (req, res) => {
  try {
    if (req.user.role !== 'buyer') {
      return res.status(403).json({ message: 'Buyer access required' });
    }

    const orders = await Order.find({ 'confirmer.buyer': req.user._id })
      .populate('confirmer.currentConfirmer', 'username role')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (confirmer only)
router.put('/:id/confirmer-status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'confirmer') {
      return res.status(403).json({ message: 'Confirmer access required' });
    }

    const { status, rendezvous } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.confirmer.currentConfirmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    // Update confirmer status
    order.confirmer.status = status;
    
    if (status === 'call_not_response') {
      order.confirmer.callAttempts += 1;
    }

    if (rendezvous) {
      order.confirmer.rendezvous = rendezvous;
    }

    await order.save();
    await order.populate('confirmer.currentConfirmer confirmer.buyer', 'username role');

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update buyer status (buyer only)
router.put('/:id/buyer-status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'buyer') {
      return res.status(403).json({ message: 'Buyer access required' });
    }

    const { status, isRetrying } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.confirmer.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.buyer.status = status;
    if (isRetrying !== undefined) {
      order.buyer.isRetrying = isRetrying;
    }

    await order.save();
    await order.populate('confirmer.currentConfirmer confirmer.buyer', 'username role');

    res.json({
      message: 'Buyer status updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('confirmer.currentConfirmer confirmer.buyer', 'username role');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check access permissions
    const isAdmin = req.user.role === 'admin';
    const isConfirmer = req.user.role === 'confirmer' && order.confirmer.currentConfirmer._id.toString() === req.user._id.toString();
    const isBuyer = req.user.role === 'buyer' && order.confirmer.buyer._id.toString() === req.user._id.toString();

    if (!isAdmin && !isConfirmer && !isBuyer) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
