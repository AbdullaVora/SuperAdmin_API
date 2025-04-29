const { orderValidation } = require("../../../helpers/JoiValidation");
const AllOrders = require("../../../models/Dashboard/orders_config/allOrdersModel");
const orderStatus = require("../../../models/Dashboard/orders_config/orderStatusModel");

// Create a new order status
exports.createOrderStatus = async (req, res) => {
    try {
        // console.log(req.body);
        const order = await orderStatus.create(req.body);
        // console.log(order);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all order statuses
exports.getAllOrderStatuses = async (req, res) => {
    try {
        const orders = await orderStatus.find();

        console.log(orders)

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
        const { orderCode, orderName, orderStatus } = req.body;
        const { id } = req.params


        // Find the order first
        const order = await AllOrders.findOne({
            $or: [
                { _id: id },
                { 'cart._id': id }
            ]
        });
        // console.log(order)
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Update only the 'name' field in cart, keeping other details intact
        if (orderName) {
            const namesArray = orderName.split(',').map(name => name.trim());

            order.cart.forEach((item, index) => {
                if (namesArray[index]) {
                    item.name = namesArray[index]; // Update only the name field
                }
            });
        }

        // Update other fields
        order.orderCode = orderCode || order.orderCode;
        order.orderStatus = orderStatus || order.orderStatus;

        // Save the updated order
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete an order status
exports.deleteOrderStatus = async (req, res) => {
    try {
        console.log(req.params.id)
        const order = await AllOrders.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order status not found' });
        }
        res.status(200).json({ success: true, message: 'Order status deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
