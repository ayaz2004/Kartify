import mongoose from 'mongoose';

const purchaseHistorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  family_id: {
    type: String,
    required: [true, 'Family ID is required']
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  purchase_date: {
    type: Date,
    default: Date.now
  },
  store_location: {
    type: String,
    trim: true
  },
  price_paid: {
    type: Number,
    min: [0, 'Price cannot be negative']
  },
  consumption_rate: {
    type: Number,
    min: [0, 'Consumption rate cannot be negative']
  },
  replenishment_cycle: {
    type: Number,
    min: [1, 'Replenishment cycle must be at least 1 day']
  }
}, {
  timestamps: true
});

// Indexes for analytics and queries
purchaseHistorySchema.index({ user_id: 1, purchase_date: -1 });
purchaseHistorySchema.index({ family_id: 1, purchase_date: -1 });
purchaseHistorySchema.index({ product_id: 1, purchase_date: -1 });
purchaseHistorySchema.index({ purchase_date: -1 });

export default mongoose.model('PurchaseHistory', purchaseHistorySchema);
