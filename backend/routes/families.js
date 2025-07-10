import express from 'express';
import { body, validationResult } from 'express-validator';
import Family from '../models/Family.js';
import { protect } from '../middleware/auth.js';
import { generateUniqueId } from '../utils/helpers.js';

const router = express.Router();

// @desc    Create a new family
// @route   POST /api/families
// @access  Private
router.post('/', protect, [
  body('family_name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Family name must be between 2 and 50 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const familyId = generateUniqueId();
    
    const family = await Family.create({
      id: generateUniqueId(),
      family_id: familyId,
      user_id: req.user._id,
      role: 'admin'
    });

    await family.populate('user_id', 'username email');

    res.status(201).json({
      status: 'success',
      message: 'Family created successfully',
      data: {
        family
      }
    });
  } catch (error) {
    console.error('Create family error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while creating family'
    });
  }
});

// @desc    Join a family
// @route   POST /api/families/join
// @access  Private
router.post('/join', protect, [
  body('family_id')
    .notEmpty()
    .withMessage('Family ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { family_id } = req.body;

    // Check if family exists
    const existingFamily = await Family.findOne({ family_id });
    if (!existingFamily) {
      return res.status(404).json({
        status: 'error',
        message: 'Family not found'
      });
    }

    // Check if user is already in the family
    const existingMember = await Family.findOne({
      family_id,
      user_id: req.user._id
    });

    if (existingMember) {
      return res.status(400).json({
        status: 'error',
        message: 'You are already a member of this family'
      });
    }

    const family = await Family.create({
      id: generateUniqueId(),
      family_id,
      user_id: req.user._id,
      role: 'member'
    });

    await family.populate('user_id', 'username email');

    res.status(201).json({
      status: 'success',
      message: 'Successfully joined family',
      data: {
        family
      }
    });
  } catch (error) {
    console.error('Join family error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while joining family'
    });
  }
});

// @desc    Get user's families
// @route   GET /api/families/my-families
// @access  Private
router.get('/my-families', protect, async (req, res) => {
  try {
    const families = await Family.find({ user_id: req.user._id })
      .populate('user_id', 'username email')
      .sort({ created_at: -1 });

    res.json({
      status: 'success',
      results: families.length,
      data: {
        families
      }
    });
  } catch (error) {
    console.error('Get my families error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching families'
    });
  }
});

// @desc    Get family members
// @route   GET /api/families/:family_id/members
// @access  Private
router.get('/:family_id/members', protect, async (req, res) => {
  try {
    const { family_id } = req.params;

    // Check if user is a member of this family
    const userFamily = await Family.findOne({
      family_id,
      user_id: req.user._id
    });

    if (!userFamily) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. You are not a member of this family.'
      });
    }

    const members = await Family.find({ family_id })
      .populate('user_id', 'username email created_at')
      .sort({ joined_at: 1 });

    res.json({
      status: 'success',
      results: members.length,
      data: {
        members
      }
    });
  } catch (error) {
    console.error('Get family members error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching family members'
    });
  }
});

export default router;
