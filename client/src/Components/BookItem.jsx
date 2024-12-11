"use client";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaPen, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import Link from "next/link";



const BookItem = ({ book }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setRole(decodedToken.role);
        setEmail(decodedToken.email);
      }
    }
  }, []);
  const Edit =()=>{
    sessionStorage.setItem('book',JSON.stringify(book))
    
    
  }
  return (
    <div
      className="bg-white rounded-lg animate-slideIn border transition-shadow duration-500"
      id="container"
    >
      {role !== "User"&&(  
        <Link href="/books/updatebooks">
          <div className="flex justify-end p-3 text-gray-600" onClick={Edit}>
            <button
              className="border rounded-lg px-3 py-1 flex items-center gap-1 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition duration-200"
            >
              <FaPen />
              <span>Edit</span>
            </button>
          </div>
        </Link>)}
    
      <img src={book.image} alt={book.title} className="w-full h-64 p-5" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
        <p className="text-gray-600">Author: {book.author}</p>
        <p className="text-gray-600">Year: {book.year}</p>
        <p className="font-bold text-indigo-600 mt-2">Price: ₹{book.price}</p>
      </div>
      {role === "User" && (
        <div className="p-3  flex justify-between items-center bg-gray-100 z-10">
          <button
            onClick={() => dispatch(addToCart(book))}
            className="bg-black border  rounded-full text-white hover:bg-white hover:text-black px-4 py-4  transform transition duration-300 hover:scale-105 shadow"
          >
            <FaShoppingCart />
          </button>
          <button className="bg-blue-500 rounded-full text-white px-4 py-4  transform transition duration-300 hover:scale-105 hover:bg-white hover:text-black">
            <FaShoppingBag />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookItem;
