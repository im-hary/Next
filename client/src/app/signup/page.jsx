"use client";
// import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "@headlessui/react";

const Signup = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(""); // User or Publisher
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [language, setLanguage] = useState("");
  // const [bookType, setBookType] = useState("");
  // const [country, setCountry] = useState("");

  // const languages = [
  //   "English",
  //   "Tamil",
  //   "Hindi",
  //   "Chinese",
  //   "Malayalam",
  //   "Kannada",
  //   "Telugu",
  //   "Japanese",
  // ];
  // const bookTypes = ["Story", "Philosophy", "Horror", "Movie"];
  // const countries = [
  //   "India",
  //   "USA",
  //   "UK",
  //   "Canada",
  //   "Australia",
  //   "China",
  //   "Japan",
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (Password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send form data to the backend
      const response = await axios.post("http://localhost:3001/register", {
        name: Name,
        email: Email,
        password: Password,
        role: selectedRole,
        contact: Contact,
        address: Address,
        // language: selectedRole === "Publisher" ? language : null,
        // bookType: selectedRole === "Publisher" ? bookType : null,
        // country: selectedRole === "Publisher" ? country : null,
      });
      if (response.status === 201) {
        router.push("/");
      } else {
        alert("Unexpected error occurred. Please try again.");
      }

      console.log(response.data.message);
      alert("User registered successfully!");
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setContact("");
      setAddress("");
      setSelectedRole("");
      // setLanguage("");
      // setBookType("");
      // setCountry("");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data?.message || error.message
      );
      setError(
        error.response?.data?.message || "Error occurred during registration."
      );
    }
  };

  return (
    <div className="flex justify-center items-center p-5 min-h-screen text-black bg-gray-100">
      <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-center text-gray-400 mb-4">Signup Form</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Role
            </label>
            <div className="flex  gap-4 ">
              <div className="radio-wrapper-12">
              <label className="flex items-center gap-3 cursor-pointer ">
                <input
                  type="radio"
                  name="role"
                  value="User"
                  className="form-radio "
                  checked={selectedRole === "User"}
                  onChange={() => setSelectedRole("User")}
                  required
                />
                {/* <span className="circle"></span> */}
               
                <span className="text-gray-800 group-hover:text-blue-400 transition-colors text">
                  User
                </span>
              </label></div>
              <div className="radio-wrapper-12">
              <label className="flex items-center gap-2 cursor-pointer radio-wrapper-3">
                <input
                  type="radio"
                  name="role"
                  value="Publisher"
                  className="form-radio"
                  checked={selectedRole === "Publisher"}
                  onChange={() => setSelectedRole("Publisher")}
                  required
                />
                {/* <span className="circle"></span> */}
                <span className="text">Publisher</span>
              </label>
            </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="Name"
              className="mt-1 block w-full px-3 py-2 border border-black  rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={Name}
              placeholder="Name: e.g. JhonDoe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              className="mt-1 block w-full px-3 py-2 border border-black  rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={Email}
              placeholder="Email: e.g. johndoe@example.com"
              onChange={(e) => setEmail(e.target.value)}
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
              className="mt-1 block w-full px-3 py-2 border  border-black rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={Password}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border  border-black rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your Password"
              required
            />
            {isSubmitted && error && (
              <small className="text-red-500 text-sm">{error}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="Contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact
            </label>
            <input
              type="number"
              id="Contact"
              className="mt-1 block w-full px-3 py-2 border  border-black rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={Contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your Contact Number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="Address"
              rows={4}
              className="mt-1 block w-full px-3 py-2 border  border-black rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your Address"
              required
            />
          </div>
          {/* {selectedRole === "Publisher" && (
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
              <div>
                <label
                  htmlFor="bookType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Which type of book do you publish?
                </label>
                <select
                  id="bookType"
                  className="mt-1 block w-full border  px-3 py-2 border-black rounded-md bg-white focus:text-black shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
                  required
                >
                  <option value="">Select a book type</option>
                  {bookTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Which country are you from?
                </label>
                <select
                  id="country"
                  className="mt-1 block w-full border  px-3 py-2  border-black rounded-md bg-white focus:text-black shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )} */}
          <button
            type="submit"
            className="w-full py-2 mt-3 text-white bg-green-600 hover:bg-green-700 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
