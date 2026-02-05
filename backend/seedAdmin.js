require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management');
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'waillkhabir' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      username: 'waillkhabir',
      password: 'wail123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Username: waillkhabir');
    console.log('Password: wail123');
    console.log('Role: admin');

    // Create sample users for each role
    const sampleUsers = [
      { username: 'client1', password: 'password123', role: 'client' },
      { username: 'confirmer1', password: 'password123', role: 'confirmer' },
      { username: 'buyer1', password: 'password123', role: 'buyer' }
    ];

    for (const userData of sampleUsers) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`Sample ${userData.role} user created: ${userData.username}`);
      }
    }

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAdmin();
