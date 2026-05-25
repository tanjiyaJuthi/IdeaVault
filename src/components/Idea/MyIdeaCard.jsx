'use client';

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { SlEye } from "react-icons/sl";

const MyIdeaCard = ({ idea }) => {
  return (
    <div className="mt-10 group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300 flex flex-col lg:flex-row">

      {/* IMAGE */}
      <div className="relative w-full lg:w-95 h-55 lg:h-auto overflow-hidden">
        <Image
          src={idea.imageUrl}
          alt={idea.ideaTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col justify-between w-full gap-5">

        {/* TOP SECTION */}
        <div className="space-y-4">

          {/* CATEGORY */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#fff4f8] text-[#5a0626] text-sm font-medium">
            <FaCheckCircle className="text-[#5a0626]" />
            {idea.category}
          </div>

          {/* TITLE */}
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
            {idea.ideaTitle}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {idea.shortDescription}
          </p>

          {/* META GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">

            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-xs text-gray-500">Target Audience:</p>
              <p className="font-medium text-gray-800">
                {idea.targetAudience}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-xs text-gray-500">Tags:</p>
              <p className="font-medium text-gray-800">
                {idea.tags.join(", ")}
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">

          {/* PRICE */}
          <div className="text-[#5a0627] font-bold text-2xl">
            ${idea.estimatedBudget}
          </div>

          {/* ACTION */}
          <Link
            href={`/ideas/${idea._id}`}
            className="inline-flex items-center gap-2 bg-[#5a0627] hover:bg-slate-900 text-white px-4 py-4 rounded-lg text-sm font-medium transition"
          >
            <SlEye />
            View Idea
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MyIdeaCard;