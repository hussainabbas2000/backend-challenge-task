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

const getOrderById = async (orderId) => {
    try {
      //const order = await knex.raw(`SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE order_id = ${orderId};`)
      //let orderItem = await knex.raw(`SELECT order_item_id, order_id, quantity, base_price, total_price FROM "order_item" WHERE order_id = ${orderId};`);
      //order.order_items = orderItem.rows;
      const order = await knex('order').where('order_id', orderId).first();
      let items = await knex.raw(`SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE order_id = ${orderId};`);
      order.order_items = items.rows
      if (!order) {
        return 0
      }
  
      return order
    } catch (error) {
      console.error('Error retrieving order by ID', error);
      return -1
    }
  };
async function setAppropriateIDs(neworder){
    const rows = await listAllOrders();  
    neworder.order_id = rows.length + 1;
    let updatedid = rows[rows.length-1].order_items[rows[rows.length-1].order_items.length-1].order_item_id + 1    
    for(let i =0;i<neworder.order_items.length;i++){
        neworder.order_items[i].order_item_id = updatedid;
        updatedid++;
    }
}

  const newOrder = async (order)=>{
    await setAppropriateIDs(order)
    const mainorder = {
        order_id:order.order_id,
        customer_id:order.customer_id,
        grand_total:order.grand_total,
    }  
    const result = await knex('order').insert(mainorder)
    const items = order.order_items
    let flag = false;
    for(let i =0;i<items.length;i++){
        try{
            items[i].order_id=order.order_id
       await knex('order_item').insert(items[i])
       flag = true
        }
        catch(err){
            console.log(err)
            flag = false
        }
    }
    if(result && flag === true){
        return 1
    }
    else{
        return 0
    }
}

const delOrder = async () => {
    await knex('order').where('order_id',6).del()
}
module.exports = {
    listAllOrders,
    getOrderById,
    newOrder,
    delOrder
}