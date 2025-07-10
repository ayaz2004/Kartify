import mongoose from 'mongoose';

const listItemSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShoppingList',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'purchased', 'unavailable'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Compound index for list and product
listItemSchema.index({ list_id: 1, product_id: 1 }, { unique: true });
listItemSchema.index({ added_by: 1 });

export default mongoose.model('ListItem', listItemSchema);
