"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { FaTimes,FaPlus,FaUser } from "react-icons/fa";
import Menu from "./Menu";
import axios from "axios";




const Navbar = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState(null);
  const [image,setImage]=useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
  
    const fetchUserData = async () => {
      try {
        if(token)
        {
          const decodedToken = jwtDecode(token);
          if (decodedToken) {
            setRole(decodedToken.role);
            // setEmail(decodedToken.email);
          }
          setTimeout(async() => {
            const response = await axios.get(
              `http://localhost:3001/getimg?email=${decodedToken.email}`
            );
            const user = response.data;
            if (user) {
              setImage(user.image);
            }
          },3000);         
        }
       
      } catch (error) {
         console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black w-full h-[60px] p-2 flex justify-between shadow-2xl">
        <Link href="/books" className="flex ml-5">
          <img src="../../Assets/stack-of-books.png" alt="Logo" />
        </Link>

        <ul className="flex text-white font-teko font-bold mx-auto gap-5">
          <Link href="/books/home">
            <li className="p-2 ml-2 border-b-2 border-transparent hover:border-white hover:cursor-pointer shadow">
              Home
            </li>
          </Link>
          <Link href="/books/booksets">
            <li className="p-2 ml-2 border-b-2 border-transparent hover:border-white hover:cursor-pointer">
              Booksets
            </li>
          </Link>
          {role === "User" && (
            <Link href="/books/contactus">
              <li className="p-2 ml-2 border-b-2 border-transparent hover:border-white hover:cursor-pointer">
                Contact Us
              </li>
            </Link>
          )}
        </ul>

        <div className="flex items-center gap-4 mr-5">
          {role === "Publisher" && (
            <Link
              href="/books/addbooks"
              className="bg-gray-800 shadow-lg flex p-2 text-white rounded justify-center items-center"
            >
              <button className="flex p-1 justify-between items-baseline gap-3"><FaPlus className="mt-1"/>Add Book</button>
            </Link>
          )}
          <div className="relative w-full max-w-xs text-sandal hover:text-brown">
              <select
                name="Language"
                id="Language"
                style={{ borderRadius: "5px" }}
                className="appearance-none text-[14px] px-8 py-2 outline-none bg-transparent border-2 border-gold hover:bg-sandal hover:text-brown text-sandal flex items-center justify-center gap-4 w-full"
              >
                <option value="English">
                  <img
                    src="assets/icons/united-states.png"
                    alt="value"
                    className="w-5 h-5"
                  />
                  <span>English</span>
                </option>
                <option value="French">
                  <img
                    src="assets/icons/france.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  French
                </option>
                <option value="Spanish">
                  <img
                    src="assets/icons/spain.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  Spanish
                </option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none ">
                <FaChevronDown />
              </span>
            </div>

          {/* Profile Picture */}
          <div className="relative">
            <button
              onClick={toggleSidebar}
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none"
            ><div className="bg-gray-600 w-8 h-8 rounded-full flex justify-center items-center">
               {image ?(<img
                alt=""
                src={image}
                className="w-8 h-8 rounded-full"
              />) : (
                <FaUser className="text-white text-2xl overflow-x-hidden" />
              ) }</div>
              
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <Menu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} toggleSidebar={toggleSidebar}/>
      )}
    </>
  );
};

export default Navbar;
