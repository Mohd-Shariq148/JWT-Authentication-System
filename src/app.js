require('dotenv').config();
const express = require('express');
const ConnectDB = require('./models/connection');
const authRoutes = require('./routes/authRoutes');
const app = express();

const PORT = process.env.PORT | 4000

//1.Connecting to database
ConnectDB();

//2.middleware
app.use(express.json());

//3.routes
app.use('/api/auth',authRoutes);

app.listen(PORT,(req,res)=>{
console.log(`Server is listening at ${PORT}`);
})