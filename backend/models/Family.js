import mongoose from 'mongoose';

const familySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  family_id: {
    type: String,
    unique: true,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'member', 'child'],
    default: 'member'
  },
  joined_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index for family_id and user_id
familySchema.index({ family_id: 1, user_id: 1 }, { unique: true });

export default mongoose.model('Family', familySchema);
