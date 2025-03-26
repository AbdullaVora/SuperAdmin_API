const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();


// Product controller
const { getAllProducts, getProductById, getProductBySlug, updateProduct, deleteProduct, createProduct } = require('../../../controllers/Dashboard/product/productContoller');


// Public routes - added directly to the server
router.get('/products', getAllProducts);
router.put('/updateProduct/:id', updateProduct);
router.get('/api/product/:id', getProductById);
router.get('/api/product/slug/:slug', getProductBySlug);
router.post('/addProduct', createProduct)
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;