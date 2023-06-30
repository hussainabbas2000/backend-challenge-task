const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',productController.editProductById);


module.exports = router;