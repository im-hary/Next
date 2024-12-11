import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="bg-blue-300 sticky ">
        <ul className="flex justify-center gap-5 p-3 font-teko">
          <Link href="/books/booksets">
            <li className="p-1 text-black border-b-2 border-transparent hover:border-red-800  hover:text-red-800 hover:cursor-pointer">
              Kids Collections
            </li>
          </Link>
          <Link href="/books/booksets/movieCollections">
            <li className="p-1 text-black border-b-2 border-transparent hover:border-red-800  hover:text-red-800 hover:cursor-pointer">
              Movie Collections
            </li>
          </Link>
          <Link href="/books/booksets/horrorCollections">
            <li className="p-1 text-black  border-b-2 border-transparent hover:border-red-800 hover:text-red-800 hover:cursor-pointer">
              Horror Collections
            </li>
          </Link>
        </ul>
      </nav>
      <div className="w-full bg-white h-full p-6 overflow-hidden">
      {children}
      </div>
    </div>
  );
};

export default Layout;
