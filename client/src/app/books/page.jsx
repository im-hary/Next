"use client";

// import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Main() {
  // const { data: session, status } = useSession();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3001/login", {
  //       email: session.user.email,
  //       logintype: session.user.type, // Use the provider from the session
  //     });
  //     console.log('res',response.data);

  //     return response;
  //   } catch (err) {
  //     console.log(err)
  //     throw err.response.data.status
  //   }
  // };

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (status === "authenticated") {
    
  //    const sm=async()=>{
  //     try {
  //       const response = await axios.post("http://localhost:3001/login", {
  //         email: session.user.email,
  //         logintype: session.user.type, // Use the provider from the session
  //       });
  //       console.log('res',response.data);
  
  //       if(response.data.status)
  //       {
  //         router.push("/books")
  //       }
  //       else
  //       {
  //         router.push("/")
  //       }
     
  //     } catch (err) {
  //       router.push("/")
        
  //     }
   
  //    } 
  //    sm()
  //     // fetchData()
  //     //   .then((response) => {
  //     //     console.log(response.data);
          
  //     //     if (response.data?.status) {
  //     //       sessionStorage.setItem("authToken", response.data.token);
  //     //       setSuccess("Login successful!");
  //     //       console.log('login with googel')

  //     //       router.push("/books");
  //     //     } else {
  //     //       console.log('go to login please');
            
  //     //       router.push("/");
  //     //     }
  //     //   })
  //     //   .catch((err) => {
  //     //     setError(
  //     //       err.response?.data?.message ||
  //     //         "An error occurred. Please try again."
  //     //     );
  //       // });
  //   } else if (token) {
  //     console.log("Login manually");
  //   } else if (status === "unauthenticated") {
  //     console.log("Not logged in");
  //   }
  // }, [status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-8xl text-center animate-slideIn font-newAmsterdam text-indigo-600 mb-8">
        WELCOME TO THE BOOKWORLD!!!
      </h1>

      <p className="text-xl font-josefin text-gray-700 text-center max-w-3xl animate-slideIn">
        Explore a world filled with fascinating books, timeless classics, and
        modern stories. Dive into genres that capture your imagination and
        expand your horizons.
      </p>

      <div className="mt-10 flex space-x-4 animate-slideIn">
        <Link href="/books/home">
        <button className="px-6 py-3 bg-indigo-500 text-white text-lg font-teko rounded-lg hover:bg-indigo-600">
          Explore Library
        </button></Link>
        <Link href='/books/community'>
        <button className="px-6 py-3 bg-gray-300 text-gray-800 text-lg font-teko rounded-lg hover:bg-gray-400">
          Join the Community
        </button></Link>
      </div>

      <footer className="mt-20 text-gray-600 text-center">
        <p className="text-sm font-josefin">
          © 2024 BookWorld. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
