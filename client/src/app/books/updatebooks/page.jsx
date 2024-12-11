"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Addbook = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    type: "",
    language: "",
    year: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const languageOptions = [
    "English",
    "Tamil",
    "Hindi",
    "Chinese",
    "Malayalam",
    "Kannada",
    "Telugu",
    "Japanese",
  ];

  const backpage = () => {
    router.back();
  };

  useEffect(() => {
    const getItem = sessionStorage.getItem("book");
    if (getItem) {
      try {
        const parsedData = JSON.parse(getItem);
        setFormData({
          title: parsedData.title || "",
          author: parsedData.author || "",
          price: parsedData.price || "",
          year: parsedData.year || "",
          type: parsedData.type || "",
          language: parsedData.language || "",
          image: parsedData.image || null,
        });
      } catch (error) {
        console.error("Error parsing sessionStorage data:", error);
      }
    }
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    const getItem = sessionStorage.getItem("book");
    const parsedData = JSON.parse(getItem);

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("id", parsedData._id);

    try {
      await axios.post("http://localhost:3001/books/addBookimg", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updateResponse = await axios.put(
        `http://localhost:3001/books/updateBook/${parsedData._id}`,
        {
          title: formData.title,
          author: formData.author,
          price: formData.price,
          type: formData.type,
          language: formData.language,
          year: formData.year,
          image: formData.image,
        }
      );

      if (updateResponse.status === 200) {
        alert("Book updated successfully");
        router.back();
      } else {
        alert("Failed to update book. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating book details. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="flex justify-center bg-white items-center p-5 text-black">
      <div className="border border-black w-[500px] h-auto rounded-md p-4">
        <div
          className="border w-[40px] h-[40px] flex justify-center text-white items-center bg-green-400 rounded-md cursor-pointer"
          onClick={backpage}
        >
          <FaArrowLeft />
        </div>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full bg-white px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 mt-1 border bg-white border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 mt-1 border bg-white border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Booktype" className="block text-sm font-medium text-gray-700">
              Book Type
            </label>
            <select
              id="Booktype"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
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
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border bg-white border-gray-300 rounded-md"
            >
              <option value="">Select a language</option>
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="relative">
              <div className="border border-black w-60 h-64 flex overflow-hidden">
                <img
                  src={preview || formData.image || "/default-image.jpg"}
                  alt="Book Preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
