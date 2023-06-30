const knex = require('../db/knex.js');

const listAllOrders = async () => {
    const data = await knex.raw(`SELECT * FROM "order";`);
    const orders = data.rows;

    for(let i = 0; i < orders.length; i++) {
        let orderItem = await knex.raw(`SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE order_id = ${orders[i].order_id};`);
        orders[i].order_items = orderItem.rows;
    }

    return orders;
}

module.exports = {
    listAllOrders,
}