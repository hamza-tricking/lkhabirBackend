const mongoose = require('mongoose');
const User = require('../models/User');

// Connect to database
require('dotenv').config();
const connectDB = require('../config/database');

async function migrateSectionNames() {
  try {
    await connectDB();
    
    console.log('Starting section name migration...');
    
    // Find all users who have the old section name
    const usersToUpdate = await User.find({
      unlockedSections: 'المستوى الأول: أساسيات العقارات'
    });
    
    console.log(`Found ${usersToUpdate.length} users to update`);
    
    // Update each user
    for (const user of usersToUpdate) {
      const oldSections = user.unlockedSections;
      const newSections = oldSections.map(section => {
        if (section === 'المستوى الأول: أساسيات العقارات') {
          return 'القانون العقاري';
        }
        return section;
      });
      
      user.unlockedSections = newSections;
      await user.save();
      
      console.log(`Updated user ${user.username}:`, {
        old: oldSections,
        new: newSections
      });
    }
    
    console.log('Migration completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateSectionNames();
