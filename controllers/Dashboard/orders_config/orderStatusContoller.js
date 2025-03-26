const orderStatus = require("../../../models/Dashboard/orders_config/orderStatusModel");

// Create a new order status
exports.createOrderStatus = async (req, res) => {
    try {
        console.log(req.body);
        const order = await orderStatus.create(req.body);
        console.log(order);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all order statuses
exports.getAllOrderStatuses = async (req, res) => {
    try {
        const orders = await orderStatus.find();

        // Format the response similar to your coupon format
        const formattedOrders = orders.map((order) => ({
            _id: order._id,
            orderCode: order.orderCode,
            orderName: order.orderName,
            orderStatus: order.orderStatus,
            status: order.status, // Default status if not provided
            updatedAt: order.updatedAt,
            isAction: true,
            isOrderStatus: true, // Similar to isCoupon in your example
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get a single order status by ID
exports.getOrderStatusById = async (req, res) => {
    try {
        const order = await orderStatus.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order status not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await orderStatus.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order status not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete an order status
exports.deleteOrderStatus = async (req, res) => {
    try {
        const order = await orderStatus.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order status not found' });
        }
        res.status(200).json({ success: true, message: 'Order status deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
