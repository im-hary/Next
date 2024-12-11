"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "@/components/BookItem";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loader from "@/Components/Loader";
import { FaShoppingCart } from "react-icons/fa";

const KidsCollections = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart.items);
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
    axios
      .get("http://localhost:3001/books/get", { params: { type: "kids" } })
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-white h-full p-6 overflow-x-hidden">
    {loading ? (
      <div className="flex justify-center items-center text-green-800">
        <Loader />
      </div>
    ) : (
      <>
        {role === "User" && (
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
              Discover Our Collection
            </h1>
            {cart.length == 0 ? (
              ""
            ) : (
              <Link href="/books/booksets/cart">
                <div className="cart-icon border flex justify-center text-white bg-black  relative hover:text-black items-center shadow hover:bg-white w-[50px] h-[50px] rounded-full">
                  <FaShoppingCart />
                  <span className="absolute bottom-2/3 right-2/3 text-white border rounded-full w-[15px] h-[15px] bg-red-600 flex justify-center items-center text-xs">
                    {cart.length}
                  </span>
                </div>
              </Link>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {book.map((book) => (
            <BookItem key={book._id} book={book} />
          ))}
        </div>
      </>
    )}
  </div>
  );
};

export default KidsCollections;
