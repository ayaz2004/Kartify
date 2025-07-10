import express from 'express';
import { body, validationResult } from 'express-validator';
import PurchaseHistory from '../models/PurchaseHistory.js';
import Family from '../models/Family.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Add purchase to history
// @route   POST /api/purchase-history
// @access  Private
router.post('/', protect, [
  body('family_id')
    .notEmpty()
    .withMessage('Family ID is required'),
  body('product_id')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('price_paid')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
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

    const { family_id, product_id, quantity, price_paid, store_location, consumption_rate, replenishment_cycle } = req.body;

    // Verify user is member of the family
    const familyMember = await Family.findOne({
      family_id,
      user_id: req.user._id
    });

    if (!familyMember) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. You are not a member of this family.'
      });
    }

    const purchase = await PurchaseHistory.create({
      user_id: req.user._id,
      family_id,
      product_id,
      quantity,
      price_paid,
      store_location,
      consumption_rate,
      replenishment_cycle
    });

    await purchase.populate(['user_id', 'product_id'], 'username email name category brand');

    res.status(201).json({
      status: 'success',
      message: 'Purchase recorded successfully',
      data: {
        purchase
      }
    });
  } catch (error) {
    console.error('Add purchase error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while recording purchase'
    });
  }
});

// @desc    Get family purchase history
// @route   GET /api/purchase-history/family/:family_id
// @access  Private
router.get('/family/:family_id', protect, async (req, res) => {
  try {
    const { family_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Verify user is member of the family
    const familyMember = await Family.findOne({
      family_id,
      user_id: req.user._id
    });

    if (!familyMember) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. You are not a member of this family.'
      });
    }

    const purchases = await PurchaseHistory.find({ family_id })
      .populate('user_id', 'username email')
      .populate('product_id', 'name category brand avg_price')
      .sort({ purchase_date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await PurchaseHistory.countDocuments({ family_id });

    res.json({
      status: 'success',
      results: purchases.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        purchases
      }
    });
  } catch (error) {
    console.error('Get purchase history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching purchase history'
    });
  }
});

// @desc    Get user's purchase history
// @route   GET /api/purchase-history/my-purchases
// @access  Private
router.get('/my-purchases', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const purchases = await PurchaseHistory.find({ user_id: req.user._id })
      .populate('product_id', 'name category brand avg_price')
      .sort({ purchase_date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await PurchaseHistory.countDocuments({ user_id: req.user._id });

    res.json({
      status: 'success',
      results: purchases.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        purchases
      }
    });
  } catch (error) {
    console.error('Get my purchases error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching purchases'
    });
  }
});

export default router;
