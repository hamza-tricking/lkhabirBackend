const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create new order (public endpoint - no auth required for initial creation)
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

// Get all orders for confirmer (both assigned and unassigned)
router.get('/confirmer-all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'confirmer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Confirmer or Admin access required' });
    }

    const orders = await Order.find()
      .populate('confirmer.currentConfirmer confirmer.buyer', 'username role')
      .sort({ createdAt: -1 });

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

// Get unassigned orders for confirmers
router.get('/unassigned', auth, async (req, res) => {
  try {
    if (req.user.role !== 'confirmer') {
      return res.status(403).json({ message: 'Confirmer access required' });
    }

    const orders = await Order.find({ 'confirmer.currentConfirmer': null })
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
      .populate('confirmer.buyer', 'username role')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Test endpoint to verify PUT requests work
router.put('/test', auth, (req, res) => {
  console.log('TEST ENDPOINT HIT - PUT requests are working');
  res.json({ message: 'PUT test successful', user: req.user });
});

// Update order status (confirmer and admin)
router.put('/:id/confirmer-status', auth, async (req, res) => {
  try {
    console.log('Full user object:', JSON.stringify(req.user, null, 2)); // Debug log
    console.log('User role:', req.user.role); // Debug log
    if (req.user.role !== 'confirmer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin or Confirmer access required' });
    }

    const { status, rendezvous, buyer, currentConfirmer, callAttempts, additionalNotes } = req.body;
    console.log('Received update data:', { status, rendezvous, buyer, currentConfirmer, callAttempts, additionalNotes });
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Order found:', JSON.stringify(order, null, 2));

    // Ensure confirmer object exists
    if (!order.confirmer) {
      order.confirmer = {};
      console.log('Created confirmer object');
    }
    
    // Update status
    order.confirmer.status = status;
    console.log('Updated status to:', status);
    
    // Update callAttempts
    order.confirmer.callAttempts = callAttempts;
    console.log('Updated callAttempts to:', callAttempts);

    // Handle rendezvous if provided
    if (rendezvous) {
      console.log('Processing rendezvous:', rendezvous);
      try {
        // Convert date string to Date object if needed
        if (rendezvous.date && typeof rendezvous.date === 'string') {
          rendezvous.date = new Date(rendezvous.date);
          console.log('Converted rendezvous date:', rendezvous.date);
        }
        order.confirmer.rendezvous = rendezvous;
        console.log('Set rendezvous:', order.confirmer.rendezvous);
      } catch (error) {
        console.error('Error processing rendezvous:', error);
        return res.status(400).json({ message: 'Invalid rendezvous date format' });
      }
    }

    if (buyer) {
      order.confirmer.buyer = new mongoose.Types.ObjectId(buyer);
      console.log('Set confirmer buyer:', buyer);
    }

    if (currentConfirmer) {
      order.confirmer.currentConfirmer = new mongoose.Types.ObjectId(currentConfirmer);
      console.log('Set current confirmer:', currentConfirmer);
    }

    if (additionalNotes) {
      order.additionalNotes = additionalNotes;
      console.log('Set additional notes:', additionalNotes);
    }

    console.log('Order before save:', JSON.stringify(order.confirmer, null, 2));
    
    // Fix existing buyer field if it's a string
    if (order.confirmer.buyer && typeof order.confirmer.buyer === 'string') {
      order.confirmer.buyer = new mongoose.Types.ObjectId(order.confirmer.buyer);
      console.log('Fixed existing buyer field to ObjectId');
    }
    
    try {
      console.log('Attempting to save order...');
      await order.save();
      console.log('Order saved successfully');
    } catch (saveError) {
      console.error('Error saving order:', saveError);
      return res.status(500).json({ message: 'Server error', error: saveError.message });
    }
    
    try {
      await order.populate('confirmer.currentConfirmer confirmer.buyer', 'username role');
      console.log('Order populated successfully');
    } catch (populateError) {
      console.error('Error populating order:', populateError);
      return res.status(500).json({ message: 'Error populating order', error: populateError.message });
    }

    // Temporarily disable SSE notification to debug
    /*
    // Broadcast SSE notification for order update
    const { broadcastNotification } = require('./sse');
    const notification = {
      type: 'order_updated',
      title: 'تم تحديث حالة الطلب',
      message: `تم تحديث حالة طلب ${order.fullName} إلى ${status}`,
      data: order,
      timestamp: new Date(),
      read: false
    };
    
    broadcastNotification(notification);
    */

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get buyers for confirmer and admin (new endpoint)
router.get('/buyers', auth, async (req, res) => {
  try {
    if (req.user.role !== 'confirmer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin or Confirmer access required' });
    }

    const buyers = await User.find({ role: 'buyer' })
      .select('username _id')
      .sort({ username: 1 });

    res.json(buyers);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all buyer orders for admin (new endpoint)
router.get('/buyer-orders', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Get orders that have buyer assigned in confirmer.buyer
    const orders = await Order.find({ 
      'confirmer.buyer': { $exists: true, $ne: null }
    })
      .populate('confirmer.currentConfirmer', 'username role')
      .populate('confirmer.buyer', 'username role')
      .sort({ createdAt: -1 });

    console.log('Found orders with buyer assigned in confirmer.buyer:', orders.length);
    console.log('Sample filtered order:', orders[0]);

    res.json(orders);
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get confirmers for admin and confirmer
router.get('/confirmers', auth, async (req, res) => {
  try {
    let confirmers;
    
    if (req.user.role === 'admin') {
      // Admin can see all confirmers
      confirmers = await User.find({ role: 'confirmer' })
        .select('username _id')
        .sort({ username: 1 });
    } else if (req.user.role === 'confirmer') {
      // Confirmer can only see themselves
      confirmers = await User.find({ _id: req.user._id, role: 'confirmer' })
        .select('username _id')
        .sort({ username: 1 });
    } else {
      return res.status(403).json({ message: 'Admin or Confirmer access required' });
    }

    res.json(confirmers);
  } catch (error) {
    console.error('Error fetching confirmers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete all orders (admin only)
router.delete('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const result = await Order.deleteMany({});
    console.log(`Deleted ${result.deletedCount} orders`);
    
    res.json({ message: `تم حذف ${result.deletedCount} طلب بنجاح`, deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error deleting all orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete single order (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndDelete(req.params.id);
    console.log(`Deleted order: ${req.params.id}`);
    
    res.json({ message: 'تم حذف الطلب بنجاح' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update buyer status (buyer and admin only)
router.put('/:id/buyer-status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'buyer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Buyer or Admin access required' });
    }

    const { status, isRetrying } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If user is buyer, check they own this order
    if (req.user.role === 'buyer' && order.confirmer.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    // Admin can update any buyer order
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
