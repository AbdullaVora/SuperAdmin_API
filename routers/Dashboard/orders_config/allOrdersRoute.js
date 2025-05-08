const express = require('express');
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../../../controllers/Dashboard/orders_config/allOrdersController');
const authMiddleware = require('../../../middleware/authToken');
const router = express.Router();

router.post('/addOrder', createOrder);
router.get('/getOrders', getOrders);
router.get('/orderById/:id', getOrderById);
router.put('/updateOrder/:id', updateOrder);
router.delete('/deleteOrder/:id', deleteOrder);

module.exports = router;
