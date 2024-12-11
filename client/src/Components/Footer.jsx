"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-6 ">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <img
            src="../../Assets/stack-of-books.png"
            alt="BookWorld Logo"
            className="h-10 w-10 mr-2"
          />
          <p className="font-bold text-xl">BookWorld</p>
        </div>

        <div className="flex space-x-6">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <Link href="/books/contactus" className="hover:underline">
            Contact
          </Link>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-indigo-500">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white hover:text-indigo-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-indigo-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white hover:text-indigo-500">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <div className="text-center text-sm mt-4">
        <p>© 2024 BookWorld. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
