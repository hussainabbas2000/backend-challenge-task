const orderModel = require('../models/orderModel.js');

const getOrders = async (req, res) => {
    const orders = await orderModel.listAllOrders();
    res.status(200).send(orders);
}

module.exports = {
    getOrders,
}