"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


const Update = () => {
  const router = useRouter();
  // const [selectedRole, setSelectedRole] = useState(""); // User or Publisher
  const [formdata, setFormData] = useState({
    contact: "",
    address: "",
  });
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  // const [Password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState();
 
  

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
  

      if (decodedToken) {
        setRole(decodedToken.role);
        setEmail(decodedToken.email);
        setName(decodedToken.name);
        setFormData({
          contact: decodedToken.contact || "",
          address: decodedToken.address || "",
        });
      }
    }
    const fetchUserData = async () => {
      if (!email) return;

      try {
        const response = await axios.get(
          `http://localhost:3001/getimg?email=${email}`
        );
        const user = response.data;

        if (user) {
          setName(user.name || "No Name Available");
          setImage(user.image);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    try {
      const uploadResponse = await axios.post(
        "http://localhost:3001/profileAdd",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (uploadResponse.data.imagePath) {
        setImage(uploadResponse.data.imagePath);
      } else {
        console.error("Image upload failed.");
        alert("Image upload failed. Please try again.");
        return;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading the image. Please try again.");
      return;
    }

    try {
      const updateResponse = await axios.put(
        `http://localhost:3001/updateuser/${email}`,
        { contact: formdata.contact, address: formdata.address }
      );

      if (updateResponse.status === 200) {
        alert("User updated successfully");
        router.back();
        console.log(updateResponse.data.user);
      } else {
        console.error("Update user failed:", updateResponse.data);
        alert("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Error updating user details. Please try again.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreview(previewURL);
    }
  };


  return (
    <div className="flex justify-center items-center p-5 min-h-screen text-black bg-gray-100">
      <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
        <form className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center text-gray-400 mb-4">
            Update Form
          </h2>
          <p className="text-center font-bold text-blue-700">{role}</p>
          <div className="flex flex-col justify-center items-center p-4">
            <div className="relative">
              <div className="border border-black rounded-full w-32 h-32 flex overflow-hidden">
                <img
                  src={preview || image || "prf"}
                  alt=""
                  className="object-cover h-60 w-60 rounded-full"
                />
              </div>

              <label htmlFor="file-input" className="absolute bottom-2 right-0">
                <div className="plus-icon border  rounded-full bg-blue-500 text-white cursor-pointer flex justify-center items-center w-8 h-8">
                  <span>+</span>
                </div>
              </label>
            </div>
            {/* <div>
            <form className="flex justify-center mt-4"> */}
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* </form>
            </div> */}
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
              // onChange={(e) => setName(e.target.value)}
              // required
              readOnly
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
              value={email}
              placeholder="Email: e.g. johndoe@example.com"
              // onChange={(e) => setEmail(e.target.value)}
              // required
              readOnly
            />
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
              name="contact"
              className="mt-1 block w-full px-3 py-2 border  border-black rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formdata.contact}
              onChange={handleInputChange}
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
              name="address"
              rows={4}
              className="mt-1 block w-full px-3 py-2 border  border-black rounded-md shadow-sm bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formdata.address}
              onChange={handleInputChange}
              placeholder="Enter your Address"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleUpload}
            className="w-full py-2 mt-3 text-white bg-green-600 hover:bg-green-700 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update
          </button>
         
        </form>
      </div>
    </div>
  );
};

export default Update;
