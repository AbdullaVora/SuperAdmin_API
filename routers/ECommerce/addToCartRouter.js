const express = require('express');
const { addToCart, getCartItems, updateCartItem, removeFromCart, clearCart, allCarts } = require('../../controllers/ECommerce/addToCartController');
const router = express.Router();


router.post('/cart', addToCart);
router.get('/getCart', allCarts);
router.get('/cart/:userId', getCartItems);
router.put('/updateCart/:id', updateCartItem);
router.delete('/:id', removeFromCart);
router.delete('/clear/:userId', clearCart);

module.exports = router;