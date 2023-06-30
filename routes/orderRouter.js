const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');




router.get('/', orderController.getOrders);
router.get('/:id',orderController.getOrderById);
router.post('/',orderController.newOrder);
router.delete('/d',orderController.delOrder);



module.exports = router;