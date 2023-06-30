const productModel = require('../models/productModel.js');

const getProducts = async (req, res) => {
    const products = await productModel.listAllProducts();
    res.status(200).send(products);
}

module.exports = {
    getProducts,
}