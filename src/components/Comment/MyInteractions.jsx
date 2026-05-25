"use client";

import Link from "next/link";
import Image from "next/image";
import { FaComments } from "react-icons/fa";
import NoData from "../shared/NoData";
import { formatMonthYear } from "@/app/lib/helper/helper";

const MyInteractions = ({ comments = [], user, token }) => {
  return (
    <div>
      <div className="bg-linear-to-r from-white to-[#fff4f8] relative overflow-hidden pt-32 pb-35">
        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-5 py-4 rounded-lg bg-white/70 backdrop-blur-xl border border-pink-100 shadow-md mb-8">
            <span className="w-2 h-2 rounded-lg bg-[#5a0626] animate-pulse"></span>

            <span className="text-sm font-semibold tracking-wide text-[#5a0626]">
              Community Activity
            </span>
          </div>

          {/* HEADING */}
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">
            My{" "}

            <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Interactions
            </span>
          </h2>

          {/* TEXT */}
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-zinc-500">
            Explore every startup idea, insightful discussion, and meaningful
            conversation you’ve engaged with inside the IdeoNexis community.
          </p>
        </div>

        {/* MODERN PREMIUM CURVE */}
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

      {/* <div className="bg-[#fff4f8] rounded-b-full mt-12 py-20 px-5">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 ">
            My Interactions
          </h2>
          <p className="text-gray-500 mt-2 text-base text-center">
            All ideas you’ve engaged with through comments
          </p>
        </div>
      </div> */}

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
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={
                        item.idea?.imageUrl?.startsWith("http")
                        ? item.idea?.imageUrl
                        : "/fallback.jpg"
                    }
                    alt={item?.idea?.ideaTitle || "Idea Image"}
                    fill
                    className="w-20 h-20 rounded-xl object-cover ring-4 ring-gray-50 group-hover:ring-pink-100 transition"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/ideas/${item.idea?._id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-[#590626] transition line-clamp-1"
                  >
                    {item.idea?.ideaTitle}
                  </Link>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.idea?.shortDescription}
                  </p>

                  <div className="mt-3 flex items-center justify-between">

                    <span className="inline-flex items-center text-xs font-medium text-[#590626] bg-pink-50 px-3 py-1 rounded-lg">
                      {item.idea?.category}
                    </span>

                    <span className="text-xs text-gray-400">
                      {formatMonthYear(item.idea?.createdAt)}
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