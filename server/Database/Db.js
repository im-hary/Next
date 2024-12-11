const mongoose = require('mongoose')
require('dotenv').config()
const Mongo_url = process.env.MONGO_URL

const mongodb = () => {
    mongoose.connect(Mongo_url)
    console.log("MongoDB Connected")
}

module.exports = mongodb