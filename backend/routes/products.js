import express from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';
import { generateUniqueId } from '../utils/helpers.js';

const router = express.Router();

// @desc    Get all products with pagination and search
// @route   GET /api/products
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';

    // Build query
    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    const products = await Product.find(query)
      .sort({ popularity_score: -1, name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      status: 'success',
      results: products.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        products
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching products'
    });
  }
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching product'
    });
  }
});

// @desc    Create a new product (admin functionality for future)
// @route   POST /api/products
// @access  Private
router.post('/', protect, [
  body('name')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Product name must be between 2 and 200 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
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

    const productData = {
      ...req.body,
      id: generateUniqueId()
    };

    const product = await Product.create(productData);

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while creating product'
    });
  }
});

// @desc    Get product categories
// @route   GET /api/products/categories/list
// @access  Private
router.get('/categories/list', protect, async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    
    res.json({
      status: 'success',
      results: categories.length,
      data: {
        categories: categories.filter(cat => cat).sort()
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching categories'
    });
  }
});

export default router;
