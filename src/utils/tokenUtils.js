const jwt = require('jsonwebtoken');
const secretKey = 'qwertyuiop123456789'

exports.generateToken = (userId) =>{
return jwt.sign({id: userId},secretKey,{expiresIn : '1h'}); //jwt.sign function is used to generate token by mixing userid,secretkey,expirydate
};

exports.verifyToken = (token) =>{
return jwt.verify(token,secretKey);
};