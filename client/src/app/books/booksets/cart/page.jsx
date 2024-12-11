"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCart,
} from "@/redux/slice/cartSlice";
import { useRouter } from "next/navigation";
import { FaTimes, FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const router = useRouter();

  const handleCloseCart = () => {
    router.back();
  };

  return (
    <div className="h-[500px] bg-white w-full">
      <div className="w-full h-full p-6 text-black flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl mx-auto font-bold text-indigo-700">
            Your Cart
          </h1>
          <button
            onClick={handleCloseCart}
            className="text-red-800 text-3xl rounded-md"
          >
            <FaTimes />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 mt-4 text-center">
          Cart ({cart.length} items)
        </h2>

        <div className="grid grid-cols-5 text-center font-bold border-b pb-2">
          <span>Image</span>
          <span>Title</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Actions</span>
        </div>

        <div className="max-h-[450px] overflow-y-auto pr-2">
          {cart.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-5 text-center py-2 items-center border-b"
            >
              <span>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover mx-auto"
                />
              </span>
              <span className="mx-auto">{item.title}</span>

              <span className="">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>

              <div className="flex items-center justify-around ">
                <button
                  onClick={() =>
                    dispatch(decreaseCartQuantity({ id: item.id }))
                  }
                  className="bg-black px-2 text-white"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(increaseCartQuantity({ id: item.id }))
                  }
                  className="bg-black px-2 text-white"
                >
                  +
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  className="w-10 h-10 flex justify-center ml-8  items-center bg-red-600 rounded-md text-white hover:bg-red-800"
                  onClick={() => dispatch(removeCart({ id: item.id }))}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
