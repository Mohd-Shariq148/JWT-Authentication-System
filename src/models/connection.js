const mongoose = require('mongoose');
const ConnectDB = async()=>{
try {
await mongoose.connect('mongodb://localhost:27017/Jwt-token',{useNewUrlParser : true, useUnifiedTopology: true});
console.log('Connected to MongoDB :)');
} catch (error) {
console.log("Error in connecting with MongoDB" + error);
process.exit(1);
}
}
module.exports = ConnectDB;