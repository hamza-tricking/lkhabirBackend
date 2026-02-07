const mongoose = require('mongoose');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lkhabir');

async function updateAllOrders() {
  try {
    console.log('Starting to update all orders...');
    
    // First, let's see what orders exist and their current status
    const existingOrders = await Order.find({});
    console.log(`Found ${existingOrders.length} orders in database`);
    
    // Show first few orders with their current buyer status
    if (existingOrders.length > 0) {
      console.log('Sample orders:');
      for (let i = 0; i < Math.min(5, existingOrders.length); i++) {
        console.log(`Order ${i + 1}:`, {
          id: existingOrders[i]._id,
          currentBuyerStatus: existingOrders[i].buyer?.status,
          currentBuyerIsRetrying: existingOrders[i].buyer?.isRetrying
        });
      }
    }
    
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
