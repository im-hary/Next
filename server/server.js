const express = require('express')
require('dotenv').config()
const cors = require('cors');
const bodyparer = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const mongodb = require('./Database/Db.js')
const port = process.env.PORT || 3001;
const bookrouter = require('./Routes/BookRouter.js')
const Authrouter = require('./Routes/AuthRoter.js')
const nodemailer = require('nodemailer')

//middleware
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use('*', cors(corsOptions));
app.use(express.json())
app.use(bodyparer.json())
app.use('/books', bookrouter)
app.use('/', Authrouter)
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));
app.use('/Profile', express.static(path.join(__dirname,'Profile')));

//DB

mongodb()

//serverrun
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
