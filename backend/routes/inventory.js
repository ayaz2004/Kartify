import express from 'express';
import { body, validationResult } from 'express-validator';
import Inventory from '../models/Inventory.js';
import Family from '../models/Family.js';
import { protect } from '../middleware/auth.js';
import { generateUniqueId } from '../utils/helpers.js';

const router = express.Router();

// @desc    Add item to inventory
// @route   POST /api/inventory
// @access  Private
router.post('/', protect, [
  body('family_id')
    .notEmpty()
    .withMessage('Family ID is required'),
  body('product_id')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('current_quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative number')
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

    const { family_id, product_id, current_quantity, expiration_finish_date, consumption_pattern, auto_reorder_threshold } = req.body;

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

    // Check if item already exists in inventory
    const existingItem = await Inventory.findOne({
      family_id,
      product_id
    });

    if (existingItem) {
      // Update existing inventory
      existingItem.current_quantity = current_quantity;
      existingItem.last_updated = new Date();
      if (expiration_finish_date) existingItem.expiration_finish_date = expiration_finish_date;
      if (consumption_pattern) existingItem.consumption_pattern = consumption_pattern;
      if (auto_reorder_threshold !== undefined) existingItem.auto_reorder_threshold = auto_reorder_threshold;

      await existingItem.save();
      await existingItem.populate('product_id', 'name category brand');

      return res.json({
        status: 'success',
        message: 'Inventory updated successfully',
        data: {
          inventory: existingItem
        }
      });
    }

    const inventory = await Inventory.create({
      id: generateUniqueId(),
      family_id,
      product_id,
      current_quantity,
      expiration_finish_date,
      consumption_pattern,
      auto_reorder_threshold: auto_reorder_threshold || 0
    });

    await inventory.populate('product_id', 'name category brand');

    res.status(201).json({
      status: 'success',
      message: 'Item added to inventory',
      data: {
        inventory
      }
    });
  } catch (error) {
    console.error('Add inventory error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while adding to inventory'
    });
  }
});

// @desc    Get family inventory
// @route   GET /api/inventory/family/:family_id
// @access  Private
router.get('/family/:family_id', protect, async (req, res) => {
  try {
    const { family_id } = req.params;

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

    const inventory = await Inventory.find({ family_id })
      .populate('product_id', 'name category brand avg_price')
      .sort({ last_updated: -1 });

    res.json({
      status: 'success',
      results: inventory.length,
      data: {
        inventory
      }
    });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching inventory'
    });
  }
});

// @desc    Get low stock items
// @route   GET /api/inventory/family/:family_id/low-stock
// @access  Private
router.get('/family/:family_id/low-stock', protect, async (req, res) => {
  try {
    const { family_id } = req.params;

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

    const lowStockItems = await Inventory.find({
      family_id,
      $expr: {
        $lte: ['$current_quantity', '$auto_reorder_threshold']
      }
    })
      .populate('product_id', 'name category brand avg_price')
      .sort({ current_quantity: 1 });

    res.json({
      status: 'success',
      results: lowStockItems.length,
      data: {
        lowStockItems
      }
    });
  } catch (error) {
    console.error('Get low stock items error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching low stock items'
    });
  }
});

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private
router.put('/:id', protect, [
  body('current_quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative number')
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

    const inventoryItem = await Inventory.findById(req.params.id);
    
    if (!inventoryItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Inventory item not found'
      });
    }

    // Verify user is member of the family
    const familyMember = await Family.findOne({
      family_id: inventoryItem.family_id,
      user_id: req.user._id
    });

    if (!familyMember) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. You are not a member of this family.'
      });
    }

    const { current_quantity, expiration_finish_date, consumption_pattern, auto_reorder_threshold } = req.body;

    if (current_quantity !== undefined) inventoryItem.current_quantity = current_quantity;
    if (expiration_finish_date) inventoryItem.expiration_finish_date = expiration_finish_date;
    if (consumption_pattern) inventoryItem.consumption_pattern = consumption_pattern;
    if (auto_reorder_threshold !== undefined) inventoryItem.auto_reorder_threshold = auto_reorder_threshold;
    
    inventoryItem.last_updated = new Date();

    await inventoryItem.save();
    await inventoryItem.populate('product_id', 'name category brand');

    res.json({
      status: 'success',
      message: 'Inventory updated successfully',
      data: {
        inventory: inventoryItem
      }
    });
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating inventory'
    });
  }
});

export default router;
