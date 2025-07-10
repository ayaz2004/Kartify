import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  weight: {
    type: String,
    trim: true
  },
  avg_price: {
    type: Number,
    min: [0, 'Price cannot be negative']
  },
  pack_size: {
    type: String,
    trim: true
  },
  expiry_date: {
    type: Date
  },
  popularity_score: {
    type: Number,
    min: [0, 'Popularity score cannot be negative'],
    max: [100, 'Popularity score cannot exceed 100'],
    default: 0
  },
  nutritional_info: {
    type: String,
    trim: true
  },
  ingredients: {
    type: [String],
    default: []
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true
  },
  id: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', category: 'text', brand: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ popularity_score: -1 });

export default mongoose.model('Product', productSchema);
