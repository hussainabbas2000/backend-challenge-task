const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')


//TOKENS
// SECRET_ACCESS_TOKEN = "ijdhndkjbqiwhpoej1r3jh8as8fn129"
// SECRET_REFRESH_TOKEN = "ae23no2e9gf1n0241fklkawfonastt2"
// const username = "Hussain_Abbas"

// app.post('/setAccessToken',(req,res)=>{
//     const accessToken = jwt.sign(username,SECRET_ACCESS_TOKEN);
//     //localStorage.setItem('jsontoken',accessToken)
//     res.send({accessToken:accessToken})
// })

// Importing routes
const customerRoutes = require('./routes/customerRouter.js');
const productRoutes = require('./routes/productRouter.js');
const orderRoutes = require('./routes/orderRouter.js');

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

// Middleware for parsing JSON and URL-encoded query string
app.use(bodyParser.json({
    limit: '50mb',
})); // parse JSON
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
})); // parse URL-encoded bodies

app.use('/customer', customerRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
