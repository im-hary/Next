const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // Change from Number to String
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Publisher"],
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the URL or file path of the uploaded thumbnail
},
  
  loginType: {
    type: String
  }
});

module.exports = mongoose.model("Users", UserSchema);
