const customerModel = require('../models/customerModel.js');

const getCustomers = async (req, res) => {
    const customers = await customerModel.listAllCustomers();
    res.status(200).send(customers);
}

module.exports = {
    getCustomers,
}