"use client";
import axios from "axios";
import React, { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Addbook = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
   const [language, setLanguage] = useState("");
  // const [country, setCountry] = useState("");

  const languages = [
    "English",
    "Tamil",
    "Hindi",
    "Chinese",
    "Malayalam",
    "Kannada",
    "Telugu",
    "Japanese",
  ];
  const bookTypes = ["Story", "Philosophy", "Horror", "Movie"];
  // const countries = [
  //   "India",
  //   "USA",
  //   "UK",
  //   "Canada",
  //   "Australia",
  //   "China",
  //   "Japan",
  // ];

  const fileInputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("year", year);
    formData.append("type", type);
    formData.append("language",language);
    // formData.append("country",country)

    try {
      const response = await axios.post(
        "http://localhost:3001/books/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setAuthor("");
      setPrice("");
      setYear("");
      setType("");
      // setCountry("")
      setLanguage("")
      fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
    }
  };
  const handleCloseCart = () => {
    router.back();
  };

  return (
    <div className="flex justify-center bg-white items-center p-5 text-black">
      <div className="border border-black w-[500px] h-auto rounded-md p-4">
        <div
          className="border w-[40px] h-[40px] flex justify-center text-white items-center bg-green-400 rounded-md cursor-pointer"
          onClick={handleCloseCart}
        >
          <FaArrowLeft />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm  font-medium text-gray-700"
            >
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="1000"
              className="w-full px-3 py-2 mt-1 border bg-white border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border bg-white border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Booktype"
              className="block text-sm font-medium text-gray-700"
            >
              Book Type
            </label>
            <select
              id="Booktype"
              name="Booktype"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border bg-white border-gray-300 rounded-md"
            >
              <option value="">Select a type</option>
              <option value="kids">Kids</option>
              <option value="movie">Movie</option>
              <option value="horror">Horror</option>
              <option value="philosophy">Philosophy</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block bg-white text-sm font-medium text-gray-700"
            >
              Thumbnail (Image Upload)
            </label>
            <input
              type="file"
              name="file"
              ref={fileInputRef}
              required
              accept="image/*"
              className="w-full px-3 py-2 mt-1 border bg-white border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-4">
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Which language book do you publish?
                </label>
                <select
                  id="language"
                  className="mt-1 block w-full  px-3 py-2 border  border-black rounded-md bg-white focus:text-black shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                >
                  <option value="">Select a language</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
   
              
            </div>

          <button
            type="submit"
            className="w-full  px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
