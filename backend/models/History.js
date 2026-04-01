const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  information: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['usb', 'course', 'challenge', 'دورة مكثفة']
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
historySchema.index({ type: 1 });
historySchema.index({ orderId: 1 });
historySchema.index({ createdAt: -1 });

module.exports = mongoose.model('History', historySchema);
