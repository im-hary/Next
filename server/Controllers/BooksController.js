const express = require("express");
const app = express();

const Books = require("../models/BookModel.js");

exports.GetBooks = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};

    if (type) {
      query.type = type;
    }

    // Simulating a delay with setTimeout
    setTimeout(async () => {
      // Fetch the books after the delay
      const books = await Books.find(query);

      const host = req.protocol + "://" + req.get("host");
      const booksWithImages = books.map((book) => ({
        ...book._doc,
        image: `${host}/Assets/${book.image}`,
      }));

      res.json(booksWithImages); // Send the response after the delay
    }, 2000); // 2 seconds delay (you can adjust this as needed)
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
};

exports.AddBook = async (req, res) => {
  try {
    console.log("req.file:", req.file); // Check if file is received
    console.log("req.body:", req.body); // Check the other form data fields

    const { title, author, year, price, type, language } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const book = new Books({
      title,
      author,
      year,
      price,
      type,
      image: image,
      language,
    });
    await book.save();

    res.status(200).json({
      message: "Book Added Successfully",
      data: book,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

exports.UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, year, author, type, language, image } = req.body;
    console.log(req.body);
    
    const result = await Books.findByIdAndUpdate(
      id,
      { title:title,price:price,year:year,author:author,type:type,language:language },
      { new: true }
    );
    if (result) {
      res
        .status(200)
        .json({ message: "User updated successfully", user: result });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(`Error updating user with Email: ${req.params.Email}`, error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
exports.DeleteBook = async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({
      message: "not deleted",
      success: false,
    });
  }
};

exports.GetBookimg = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Books.findOne({ id: id }); // Find user by email
    if (data) {
      const host = `${req.protocol}://${req.get("host")}`;
      const imageUrl = data.image ? `${host}/Assets/${data.image}` : null;

      return res.status(200).json({
        id: id,
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
exports.AddImg = async (req, res) => {
    try {
      const image = req.file ? req.file.filename : null; // Extract the uploaded file's filename
      const { id } = req.body; // Extract email from the request body
  
      // Validate the inputs
      if (!image) {
        return res
          .status(400)
          .json({ message: "File upload failed. No file received." });
      }
  
  
  
      // Update the user's profile image in the database
      const Profile = await Books.findByIdAndUpdate(
         id , // Match the user by email
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
