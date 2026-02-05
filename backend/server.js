require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orders');

// Initialize express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://dmtart.pro/lkhabir'],
    methods: ['GET', 'POST']
  }
});

// Make io available to routes
app.set('io', io);

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://dmtart.pro/lkhabir'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

// Test route for order creation
app.post('/api/orders/test', (req, res) => {
  console.log('Test route hit:', req.body);
  res.json({ message: 'Test route working', body: req.body });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle authentication
  socket.on('auth', async (data) => {
    try {
      const { token } = data;
      // Verify token here if needed
      socket.userId = token; // Store user info if needed
      console.log('User authenticated:', socket.id);
    } catch (error) {
      console.error('Authentication error:', error);
      socket.disconnect();
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
