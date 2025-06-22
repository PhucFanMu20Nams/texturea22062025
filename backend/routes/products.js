const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Get all products
router.get('/', (req, res) => {
  try {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/products.json'))
    );
    
    // Support pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    res.json({
      total: products.length,
      page,
      pages: Math.ceil(products.length / limit),
      products: paginatedProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get product by ID
router.get('/:id', (req, res) => {
  try {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/products.json'))
    );
    
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

module.exports = router;