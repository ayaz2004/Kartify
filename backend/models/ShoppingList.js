import mongoose from 'mongoose';

const shoppingListSchema = new mongoose.Schema({
  family_id: {
    type: String,
    required: [true, 'Family ID is required']
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active'
  },
  title: {
    type: String,
    required: [true, 'Shopping list title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  id: {
    type: String,
    unique: true,
    required: true
  },
  completed_at: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for family-based queries
shoppingListSchema.index({ family_id: 1, status: 1 });
shoppingListSchema.index({ created_by: 1 });

export default mongoose.model('ShoppingList', shoppingListSchema);
