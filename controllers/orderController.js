const orderModel = require('../models/orderModel.js');
const jwt = require('jsonwebtoken')
const accessToken = require('../controllers/accesstoken.js')


SECRET_ACCESS_TOKEN = "ijdhndkjbqiwhpoej1r3jh8as8fn129"
SECRET_REFRESH_TOKEN = "ae23no2e9gf1n0241fklkawfonastt2"


const authenticateToken = (req,res,next)=>{
    
    if(accessToken == null){
        return res.sendStatus(401);
    }
    jwt.verify(accessToken,SECRET_ACCESS_TOKEN,(err,data)=>{
        if(err) return res.status(402).send(err);
        req.user = data
        
    })
}


const getOrders = async (req, res) => {
    await authenticateToken(req,res)
    const orders = await orderModel.listAllOrders();
    res.status(200).send(orders);
}

const getOrderById = async (req, res) => {
    await authenticateToken(req,res)
    const order = await orderModel.getOrderById(parseInt(req.params.id));
    if (order===-1){
        res.status(500).json({ error: 'Internal server error' });
    }
    if(order ===0){
        res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).send(order);
  };
const newOrder = async(req,res)=>{
   await authenticateToken(req,res)
    var neworder ={
        order_id:1,
        customer_id:1,
        grand_total:"1699.98",
        order_items:[
            {
                order_id:1,
                order_item_id:1,
                product_id:3,
                quantity:1,
                base_price:"899.99",
                total_price:"899.99"
            },
            {
                order_id:1,
                order_item_id:1,
                product_id:4,
                quantity:1,
                base_price:"799.99",
                total_price:"799.99"
            }
        ]
    }
    const output = await orderModel.newOrder(neworder)
    if (output === 1){
        const orders = await orderModel.listAllOrders()
        res.status(200).send(orders)
    }
    else{
        res.status(400).json({error:'Error Inserting New Product'});
    }
}
 
const delOrder = async(req,res)=>{
    await authenticateToken(req,res)
    await orderModel.delOrder()
    res.send(200).json({msg:"Done"})
}
module.exports = {
    getOrders,
    getOrderById,
    newOrder,
    delOrder
}