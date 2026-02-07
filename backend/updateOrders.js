const mongoose = require('mongoose');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lkhabir');

async function updateAllOrders() {
  try {
    console.log('Starting to update all orders...');
    
    // Update all orders to set buyer.status to 'not_processed_yet'
    const result = await Order.updateMany(
      {}, // Match all documents
      { 
        $set: { 
          'buyer.status': 'not_processed_yet',
          'buyer.isRetrying': false 
        } 
      },
      { multi: true }
    );
    
    console.log(`Updated ${result.modifiedCount} orders successfully`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error updating orders:', error);
    process.exit(1);
  }
}

// Run the update
updateAllOrders();
