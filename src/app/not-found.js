"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-white bg-linear-to-r from-[#810b38] to-[#590626]">
      <div className="text-center max-w-xl">
        <h1 className="text-8xl md:text-9xl font-extrabold bg-clip-text text-white">
          404
        </h1>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-lg">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="px-4 py-2 rounded-none bg-white text-[#590626] font-semibold hover:scale-105 transition duration-300 border border-[#590626] hover:bg-slate-900 hover:text-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;