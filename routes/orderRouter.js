const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

router.get('/', orderController.getOrders);

module.exports = router;