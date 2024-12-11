import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaTimes, FaPen,FaUser } from "react-icons/fa";

const Menu = ({ isSidebarOpen, toggleSidebar }) => {
  const [formdata, setFormData] = useState({
    contact: "",
    address: "",
    name:""
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [Name, setName] = useState("");
  const [isopen, setIsopen] = useState(false);
  

  const toggleopen = () => {
    setIsopen(true);
  };
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email); 
      setFormData({
        contact: decodedToken.contact,
        address: decodedToken.address,
        name:decodedToken.name
      })
      
    }
    const fetchUserData = async () => {
      if (!email) return; 

      try {
        setTimeout(async() => {
          const response = await axios.get(
            `http://localhost:3001/getimg?email=${email}`
          );
          const user = response.data;
  
          if (user) {
            setName(user.name || "No Name Available");
            setImage(user.image);
          }
          
        }, 1000);
       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);
  console.log(formdata);
  

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   if (selectedFile) {
  //     const previewURL = URL.createObjectURL(selectedFile);
  //     setPreview(previewURL); 
  //   }
  // };
  const handleRemoveImage = () => {
    setImage(null); 
    setPreview(null); 
  };

  return (
    <div>
    {isSidebarOpen && (
      <div className="absolute top-16 right-4 w-80 bg-white shadow-xl rounded-lg z-10">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-blue-600 text-white rounded-t-lg border-b">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-blue-700 transition duration-200"
          >
            <FaTimes size={20} />
          </button>
        </div>
  
        {/* Edit Button */}
        <Link href="/update">
          <div className="flex justify-end p-3 text-gray-600">
            <button
              onClick={toggleopen}
              className="border rounded-lg px-3 py-1 flex items-center gap-1 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition duration-200"
            >
              <FaPen />
              <span>Edit</span>
            </button>
          </div>
        </Link>
  
        {/* Profile Content */}
        <div className="flex flex-col items-center p-5 space-y-4">
          {/* Profile Picture */}
          <div className="relative border rounded-full overflow-hidden shadow-md">
           { image ? (<img
              src={preview || image || "default-user-icon.png"}
              alt="Profile"
              className="w-28 h-28 object-cover"
            />):(
              <FaUser className="w-28 h-28"/>
            )} 
          </div>
  
          {/* Profile Details */}
          <div className="text-center text-gray-800">
            <p className="text-lg font-bold">{formdata.name.toUpperCase()}</p>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-sm text-gray-700 mt-2">{formdata.address}</p>
            <p className="text-sm text-gray-700">{formdata.contact}</p>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Menu;
