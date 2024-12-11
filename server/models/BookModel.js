const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the Book schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    maxlength: [1000, "Book title cannot be more than 1000 characters"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  price: {
    type: Number,
    required: [true, "Rate is required"],
  },
  type: {
    type: String,
    required: [true, "Book type is required"],
    trim: true,
    enum: {
      values: ["kids", "movie", "horror", "philosophy"],
      message: "Book type must be either kids, movie, or horror",
    },
  },
  image: {
    type: String, // Store the URL or file path of the uploaded thumbnail
    required: false,
  },
  language: {
    type: String,
    required: [true, "language is required"],
    trim: true,
    enum: {
      values: [ "English",
        "Tamil",
        "Hindi",
        "Chinese",
        "Malayalam",
        "Kannada",
        "Telugu",
        "Japanese",],
      message: "Book type must be either kids, movie, or horror",
    },// Only for Publishers
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Books", BookSchema);
