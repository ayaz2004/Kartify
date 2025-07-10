import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
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
  current_quantity: {
    type: Number,
    required: [true, 'Current quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  last_updated: {
    type: Date,
    default: Date.now
  },
  expiration_finish_date: {
    type: Date
  },
  consumption_pattern: {
    type: String,
    trim: true
  },
  auto_reorder_threshold: {
    type: Number,
    min: [0, 'Threshold cannot be negative'],
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for family and product
inventorySchema.index({ family_id: 1, product_id: 1 }, { unique: true });
inventorySchema.index({ family_id: 1, current_quantity: 1 });
inventorySchema.index({ expiration_finish_date: 1 });

export default mongoose.model('Inventory', inventorySchema);
