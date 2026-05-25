"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FaFolderOpen,
  FaArrowRight,
} from "react-icons/fa";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/category`
        );

        const data = await res.json();

        setCategories(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="text-base">

      {/* HERO SECTION */}
      <div className="bg-linear-to-r from-white to-[#fff4f8] relative overflow-hidden pt-32 pb-40">

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-5 py-4 rounded-lg bg-white/70 backdrop-blur-xl border border-pink-100 shadow-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#810B38] animate-pulse"></span>

            <span className="text-sm font-semibold tracking-wide text-[#810B38]">
              Startup Categories
            </span>
          </div>

          {/* HEADING */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">
            Explore Creative{" "}
            <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Categories
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-zinc-500">
            Browse startup idea categories and discover innovative concepts
            tailored to your passion, expertise, and future goals.
          </p>
        </div>

        {/* CURVE */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="relative block w-full h-[220px]"
          >
            <path
              fill="#fff4f8"
              d="M0,64 C180,220 420,260 720,220 C1020,180 1260,40 1440,140 L1440,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="max-w-7xl mx-auto px-5 lg:px-0 my-20">

        {/* SECTION HEADER */}
        {/* <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#2b0a18]">
              Popular Categories
            </h2>

            <p className="text-zinc-500 mt-3">
              Discover categories that inspire startup innovation.
            </p>
          </div>
        </div> */}

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-64 rounded-2xl bg-[#fff4f8] animate-pulse"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (

          /* EMPTY */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-[#fff4f8] flex items-center justify-center text-[#810B38] text-4xl">
              <FaFolderOpen />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#2b0a18]">
              No Categories Found
            </h3>

            <p className="mt-3 text-zinc-500 max-w-md">
              There are currently no categories available.
            </p>
          </div>
        ) : (

          /* CATEGORY GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {categories.map((category, index) => (
              <Link
                href={`/ideas?category=${category?.name}`}
                key={category?._id || `${category?.name}-${index}`}
                className="group relative overflow-hidden rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >

                {/* BACKGROUND */}
                <div className="absolute inset-0 bg-linear-to-br from-[#fff4f8] via-white to-[#fff4f8] opacity-80" />

                {/* CONTENT */}
                <div className="relative p-8 flex flex-col h-full">

                  {/* TOP */}
                  <div className="flex items-center justify-between mb-10">

                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#810B38] text-2xl group-hover:scale-110 transition-transform duration-500">
                      <FaFolderOpen />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#fff4f8] flex items-center justify-center text-[#810B38] group-hover:bg-[#810B38] group-hover:text-white transition-all duration-300">
                      <FaArrowRight />
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-black text-[#2b0a18]">
                    {category?.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-4 text-zinc-500 leading-relaxed">
                    Explore innovative startup ideas and discover opportunities
                    in the {category?.name} category.
                  </p>

                  {/* FOOTER */}
                  <div className="mt-8 flex items-center gap-2 text-[#810B38] font-semibold">
                    Explore Ideas

                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>

                {/* GLOW */}
                <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-pink-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;