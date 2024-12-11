const Auth = require("../models/Authmodel.js");
const express = require("express");
const app = express();
const sendEMail = require("../utils/Sendmail.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const sendMail = require('../nodemailer.js')

exports.Register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    contact,
    address,
    // language,
    // bookType,
    // country,
  } = req.body;

  try {
    if (!name || !email || !password || !role || !contact || !address) {
      return res
        .status(400)
        .send({ message: "All required fields must be filled" });
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with this email already exists" });
    }
    const options = {
      from: process.env.Email_Name,
      to: email,
      subject: `Send confirmation`,
      text: "Registered successfully",
    };
    const sendMail = await sendEMail(options);

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const newAuth = new Auth({
      name,
      email,
      password: hashedPassword,
      role,
      contact,
      address,
      // language: role === "Publisher" ? language : null,
      // bookType: role === "Publisher" ? bookType : null,
      // country: role === "Publisher" ? country : null,
    });

    await newAuth.save();

    res
      .status(201)
      .send({ message: "User registered successfully", Auth: newAuth });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .send({ message: "Error occurred while registering the user" });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  // console.log("Login attempted:", { email, password,logintype });

  // Validate input
  if (!email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or user does not exist please signup",
      });
    }
    if (password && password !== "") {
      const isMatch = await bcrypt.compare(password.toString(), user.password);
      if (!isMatch) {
        console.log("Password does not match");
        return res.status(400).json({ message: "Invalid password" });
      }
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name:user.name,
        contact: user.contact,
        address: user.address,
      },
      "your-secret-key",
      { expiresIn: "1h" }
    );
    
    
    res.json({
      token,
      Name: user.name,
      Email: user.email,
      Role: user.role,
      Contact:user.contact,
      Address: user.address
    });
    const options = {
      from: process.env.Email_Name,
      to: email,
      subject: `Send confirmation`,
      text: "Login successfully",
    };
    const sendMail = await sendEMail(options);

    // console.log("Login successful:", { token }, email);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.AddImg = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null; // Extract the uploaded file's filename
    const { email } = req.body; // Extract email from the request body

    // Validate the inputs
    if (!image) {
      return res
        .status(400)
        .json({ message: "File upload failed. No file received." });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required to update the profile image." });
    }

    // Update the user's profile image in the database
    const Profile = await Auth.findOneAndUpdate(
      { email: email }, // Match the user by email
      { image: image }, // Update the `image` field with the new filename
      { new: true, upsert: false } // Return the updated document, do not create a new one if not found
    );

    if (!Profile) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with success
    res.status(201).json({
      message: "Image uploaded successfully",
      imagePath: `/Profile/${image}`, // Return the relative path to the uploaded image
    });
  } catch (err) {
    console.error("Error updating profile image:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.Getimg = async (req, res) => {
  try {
    const { email } = req.query; // Extract email from the query
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Auth.findOne({ email: email }); // Find user by email
    if (user) {
      const host = `${req.protocol}://${req.get("host")}`;
      const imageUrl = user.image ? `${host}/Profile/${user.image}` : null;

      return res.status(200).json({
        name: user.name,
        email: user.email,
        image: imageUrl, // Send the full image URL
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error in Getimg:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
exports.UpdateUser = async (req, res) => {
  try {
      const { email } = req.params;      
      const { contact, address } = req.body;
      const result = await Auth.findOneAndUpdate(
          { email },
          { contact:contact,address:address },
          { new: true }
      )
      if (result) {
          res.status(200).json({ message: 'User updated successfully', user: result });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error(`Error updating user with Email: ${req.params.Email}`, error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


