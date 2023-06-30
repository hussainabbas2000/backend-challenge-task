const customerModel = require('../models/customerModel.js');
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
        req.user = data;
        
    })
}
const getCustomers = async (req, res) => {
    await authenticateToken(req,res)
    const customers = await customerModel.listAllCustomers();
    res.status(200).send(customers);
}

module.exports = {
    getCustomers,
}