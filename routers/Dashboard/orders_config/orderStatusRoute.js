const express = require('express');
const router = express.Router();
const { createOrderStatus, getAllOrderStatuses, getOrderStatusById, updateOrderStatus, deleteOrderStatus } = require('../../../controllers/Dashboard/orders_config/orderStatusContoller');

router.post('/addOrderStatus', createOrderStatus);
router.get('/orderStatus', getAllOrderStatuses);
router.get('/orderStatusById/:id', getOrderStatusById);
router.put('/updateOrderStatus/:id', updateOrderStatus);
router.delete('/deleteOrderStatus/:id', deleteOrderStatus);

module.exports = router;
