const jwt = require('jsonwebtoken');
const secretKey = 'ijdhndkjbqiwhpoej1r3jh8as8fn129';
const username = "Hussain_Abbas"
// Generate and export the JWT
const token = jwt.sign(username, secretKey);
module.exports = token;