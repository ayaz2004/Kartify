import express from 'express';
import { body, validationResult } from 'express-validator';
import ShoppingList from '../models/ShoppingList.js';
import ListItem from '../models/ListItem.js';
import Family from '../models/Family.js';
import { protect } from '../middleware/auth.js';
import { generateUniqueId } from '../utils/helpers.js';

const router = express.Router();

// @desc    Create a new shopping list
// @route   POST /api/shopping-lists
// @access  Private
router.post('/', protect, [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
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

    const { title, family_id } = req.body;

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

    const shoppingList = await ShoppingList.create({
      title,
      family_id,
      created_by: req.user._id,
      id: generateUniqueId()
    });

    await shoppingList.populate('created_by', 'username email');

    res.status(201).json({
      status: 'success',
      message: 'Shopping list created successfully',
      data: {
        shoppingList
      }
    });
  } catch (error) {
    console.error('Create shopping list error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while creating shopping list'
    });
  }
});

// @desc    Get family shopping lists
// @route   GET /api/shopping-lists/family/:family_id
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

    const shoppingLists = await ShoppingList.find({ family_id })
      .populate('created_by', 'username email')
      .sort({ created_at: -1 });

    res.json({
      status: 'success',
      results: shoppingLists.length,
      data: {
        shoppingLists
      }
    });
  } catch (error) {
    console.error('Get shopping lists error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching shopping lists'
    });
  }
});

// @desc    Add item to shopping list
// @route   POST /api/shopping-lists/:list_id/items
// @access  Private
router.post('/:list_id/items', protect, [
  body('product_id')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
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

    const { list_id } = req.params;
    const { product_id, quantity, priority, notes } = req.body;

    // Get shopping list and verify access
    const shoppingList = await ShoppingList.findById(list_id);
    if (!shoppingList) {
      return res.status(404).json({
        status: 'error',
        message: 'Shopping list not found'
      });
    }

    // Verify user is member of the family
    const familyMember = await Family.findOne({
      family_id: shoppingList.family_id,
      user_id: req.user._id
    });

    if (!familyMember) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. You are not a member of this family.'
      });
    }

    // Check if item already exists in the list
    const existingItem = await ListItem.findOne({
      list_id,
      product_id
    });

    if (existingItem) {
      // Update quantity instead of creating duplicate
      existingItem.quantity += quantity;
      await existingItem.save();
      await existingItem.populate(['product_id', 'added_by'], 'name category username');

      return res.json({
        status: 'success',
        message: 'Item quantity updated',
        data: {
          listItem: existingItem
        }
      });
    }

    const listItem = await ListItem.create({
      id: generateUniqueId(),
      list_id,
      product_id,
      quantity,
      priority: priority || 'medium',
      notes,
      added_by: req.user._id
    });

    await listItem.populate(['product_id', 'added_by'], 'name category username');

    res.status(201).json({
      status: 'success',
      message: 'Item added to shopping list',
      data: {
        listItem
      }
    });
  } catch (error) {
    console.error('Add list item error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while adding item to list'
    });
  }
});

// @desc    Get shopping list items
// @route   GET /api/shopping-lists/:list_id/items
// @access  Private
router.get('/:list_id/items', protect, async (req, res) => {
  try {
    const { list_id } = req.params;

    // Get shopping list and verify access
    const shoppingList = await ShoppingList.findById(list_id);
    if (!shoppingList) {
      return res.status(404).json({
        status: 'error',
        message: 'Shopping list not found'
      });
    }

    // Verify user is member of the family
    const familyMember = await Family.findOne({
      family_id: shoppingList.family_id,
      user_id: req.user._id
    });

    if (!familyMember) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. You are not a member of this family.'
      });
    }

    const items = await ListItem.find({ list_id })
      .populate('product_id', 'name category brand avg_price')
      .populate('added_by', 'username')
      .sort({ created_at: -1 });

    res.json({
      status: 'success',
      results: items.length,
      data: {
        items
      }
    });
  } catch (error) {
    console.error('Get list items error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching list items'
    });
  }
});

export default router;
