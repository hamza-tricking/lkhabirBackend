const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Basic order information
  type: {
    type: String,
    required: true,
    enum: ['usb', 'course']
  },
  price: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  // Time information
  time: {
    day: {
      type: Date,
      required: true
    },
    hour: {
      type: String,
      required: true
    }
  },
  photo: {
    type: String,
    default: null
  },
  description: {
    type: String,
    required: true
  },
  additionalNotes: {
    type: String,
    default: null
  },
  
  // Confirmer part
  confirmer: {
    currentConfirmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Make optional for public orders
    },
    status: {
      type: String,
      enum: ['call_confirmed', 'call_not_response', 'phone_closed'],
      required: true
    },
    callAttempts: {
      type: Number,
      default: 0
    },
    rendezvous: {
      date: {
        type: Date
      },
      hour: {
        type: String
      }
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Make optional for public orders
    }
  },
  
  // Buyer part
  buyer: {
    status: {
      type: String,
      enum: ['not_processed_yet', 'user_response', 'user_phone_closed', 'retrying'],
      required: true,
      default: 'not_processed_yet'
    },
    isRetrying: {
      type: Boolean,
      default: false
    },
    buyerResponse: {
      type: String,
      enum: ['sold', 'interested_later', 'not_sold'],
      required: false
    },
    paymentMethod: {
      type: String,
      enum: ['online_payment', 'cash_on_delivery'],
      required: false
    },
    reasonNotSold: {
      type: String,
      enum: ['price_high', 'needs_time', 'afraid_scam', 'not_interested', 'no_decision', 'other'],
      required: false
    },
    customReason: {
      type: String,
      required: false
    },
    followUpDate: {
      type: Date,
      required: false
    },
    followUpTime: {
      type: String,
      required: false
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
orderSchema.index({ 'confirmer.currentConfirmer': 1 });
orderSchema.index({ 'confirmer.buyer': 1 });
orderSchema.index({ type: 1 });
orderSchema.index({ 'time.day': 1 });

module.exports = mongoose.model('Order', orderSchema);
