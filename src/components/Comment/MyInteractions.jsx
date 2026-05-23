"use client";

import Link from "next/link";
import Image from "next/image";
import { FaComments } from "react-icons/fa";
import NoData from "../shared/NoData";
import { formatMonthYear } from "@/app/lib/helper/helper";

const MyInteractions = ({ comments = [] }) => {
  return (
    <div>
      <div className="bg-[#fff4f8] rounded-b-full mt-12 py-20 px-5">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 ">
            My Interactions
          </h2>
          <p className="text-gray-500 mt-2 text-base text-center">
            All ideas you’ve engaged with through comments
          </p>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="max-w-7xl mx-auto px-5 py-16">
          <NoData />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-5 lg:px-0 pt-6 pb-16">
          {comments.map((item) => (
            <div
              key={item._id}
              className="mt-10 group relative bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 flex gap-4">
                <div className="relative">
                  <Image
                    src={
                      item?.imageUrl?.startsWith("http" || "https")
                        ? item.imageUrl
                        : "/fallback.jpg"
                    }
                    alt={item?.ideaTitle || "Idea Image"}
                    fill
                    className="w-20 h-20 rounded-xl object-cover ring-4 ring-gray-50 group-hover:ring-pink-100 transition"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/ideas/${item.ideaId}`}
                    className="text-lg font-semibold text-gray-900 hover:text-[#590626] transition line-clamp-1"
                  >
                    {item.ideaTitle}
                  </Link>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>

                  <div className="mt-3 flex items-center justify-between">

                    <span className="inline-flex items-center text-xs font-medium text-[#590626] bg-pink-50 px-3 py-1 rounded-lg">
                      {item.category}
                    </span>

                    <span className="text-xs text-gray-400">
                      {formatMonthYear(item.createdAt)}
                    </span>

                  </div>
                </div>
              </div>

              {/* COMMENT SECTION */}
              <div className="px-6 pb-6">
                <div className="bg-linear-to-r from-[#fff5f9] to-pink-50 border border-pink-100 rounded-lg p-4 relative">

                  {/* ICON */}
                  <div className="flex items-center gap-2 mb-2 text-[#590626]">
                    <FaComments className="text-sm" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Your Comment
                    </span>
                  </div>

                  {/* COMMENT TEXT */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.commentText}
                  </p>

                  {/* subtle glow effect */}
                  <div className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none bg-pink-100/30 blur-xl" />
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInteractions;