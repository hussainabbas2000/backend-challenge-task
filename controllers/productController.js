const jwt = require('jsonwebtoken')
const productModel = require('../models/productModel.js');
const accessToken = require('../controllers/accesstoken.js')
SECRET_ACCESS_TOKEN = "ijdhndkjbqiwhpoej1r3jh8as8fn129"
SECRET_REFRESH_TOKEN = "ae23no2e9gf1n0241fklkawfonastt2"


const authenticateToken =  (req,res,next)=>{
    
    if(accessToken == null){
        return res.sendStatus(401);
    }
    jwt.verify(accessToken,SECRET_ACCESS_TOKEN,(err,data)=>{
        if(err) return res.status(402).send(err);
        req.user = data
        
    })
}

const getProducts = async (req, res) => {
    await authenticateToken(req,res)
    const products = await productModel.listAllProducts();
    res.status(200).send(products);
}
const getProductById = async (req, res) => {
    await authenticateToken(req,res)
    const product = await productModel.getProductById(parseInt(req.params.id));
    if (product===-1){
        res.status(500).json({ error: 'Internal server error' });
    }
    if(product ===0){
        res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).send(product);
  };
  const editProductById = async(req,res) =>{
    await authenticateToken(req,res)
    const updatedProduct = {
        product_id : parseInt(req.params.id),
        product_name: 'Apple iPhone 14 pro Max',
        quantity:20,
        price:1399.99
    }
    const output = await productModel.editProductById(parseInt(req.params.id),updatedProduct);
    if (output === 1){
        const product = await productModel.getProductById(parseInt(req.params.id));
        res.status(200).send(product);
    }
    else if(output === 0){
        res.status(404).json({error:'Product not found'});
    }
    else{res.status(500).json({error:'Internal Server Error'});}
  }

module.exports = {
    getProducts,
    getProductById,
    editProductById,
}