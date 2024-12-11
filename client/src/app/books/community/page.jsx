"use client";

import Link from "next/link";

const Community = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-6xl text-center font-newAmsterdam text-indigo-600 mb-6">
        Welcome to the BookWorld Community!
      </h1>

      <section className="mb-10 max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-700 font-josefin mb-4">
          Join our BookWorld Community to engage with fellow book lovers, share
          recommendations, and participate in exciting discussions. Whether
          you're a casual reader or an avid bibliophile, there's a place for you
          here!
        </p>
      </section>

      <section className="mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Latest Discussions
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="font-semibold text-xl text-indigo-700">
              Favorite Book of the Year
            </h3>
            <p className="text-gray-600 mt-2">
              What is the best book you've read this year? Share your thoughts
              and recommendations with others!
            </p>
            <Link href="#" className="text-blue-500 mt-2 inline-block">
              Join the Discussion →
            </Link>
          </div>

          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="font-semibold text-xl text-indigo-700">
              Upcoming Book Releases
            </h3>
            <p className="text-gray-600 mt-2">
              What upcoming books are you most excited for? Let's talk about the
              latest releases and preorders.
            </p>
            <Link href="#" className="text-blue-500 mt-2 inline-block">
              Join the Discussion →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-indigo-500 p-6 rounded-lg text-center mb-10">
        <h2 className="text-2xl text-white font-bold mb-4">
          Join the Community
        </h2>
        <p className="text-lg text-white mb-6">
          Sign up to become a part of our growing BookWorld family.
        </p>

        <form className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white text-lg font-bold rounded-md hover:bg-green-600 transition duration-300"
          >
            Sign Up Now
          </button>
        </form>
      </section>

      <footer className="text-gray-600 text-center mt-20">
        <p className="text-sm font-josefin">
          © 2024 BookWorld. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Community;
