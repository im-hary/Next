"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import google from "../../public/icons8-google-50.png";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [Error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  // const GLogin = async (e) => {
  //   e.preventDefault();
  //   await signIn("google", { callbackUrl: "/books" });
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      setEmail("");
      setPassword("");
      if (response.data?.token) {
        sessionStorage.setItem("authToken", response.data.token);
        setSuccess("Login successful!");
        router.push("/books");
      } else {
        setError("Invalid Email or Password. Please signup.");
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center p-5 min-h-screen bg-gray-200">
      <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <h2 className="text-xl font-bold text-center mb-4">Log in</h2>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300  focus:text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              className="mt-1 block w-full px-3 py-2 border bg-white border-gray-300  focus:text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {Error ? (
            <div className="text-red-500 text-sm">{Error}</div>
          ) : (
            <div className="text-green-500 text-sm">{success}</div>
          )}
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="w-[100px]  mt-2 text-white bg-green-600 shadow-lg hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Login
            </button>
            {/* Uncomment below when using navigation */}
            <Link href="/signup">
              <button
                type="button"
                className="w-[100px] py-2 mt-2 text-white bg-blue-600 shadow-lg hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Signup
              </button>
            </Link>
          </div>
        </form>
        <span className="border-b p-4 "></span>

        {/* <button
          onClick={(e) => {
            e.preventDefault();
            signIn("google", { callbackUrl: "/books" });
          }}
          className="mt-2 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 px-4 py-2"
        >
          Sign in With Google
        </button> */}
      </div>
    </div>
  );
};

export default Login;
