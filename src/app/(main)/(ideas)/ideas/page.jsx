"use client";

import IdeaCard from "@/components/Idea/IdeaCard";
import SearchIdea from "@/components/Idea/Search/SearchIdea";
import CategoryFilter from "@/components/Idea/Search/CategoryFilter";
import NoData from "@/components/shared/NoData";
import FilterByDate from "@/components/Idea/Search/FilterByDate";

import { useEffect, useState, useCallback } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useSearchParams } from "next/navigation";

const IdeaPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIdeas = useCallback(async () => {
  try {
    setLoading(true);

    const params = new URLSearchParams({
      search,
      category,
      startDate,
      endDate,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/search?${params.toString()}`
    );

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    setIdeas(data?.data || []);
  } catch (err) {
    console.error(err);
    setIdeas([]);
  } finally {
    setLoading(false);
  }
}, [search, category, startDate, endDate]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas, search, category, startDate, endDate]);

  return (
    <div className="">
      {/* HEADER SECTION */}
      <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 ">
            Explore Ideas and find one for you!
          </h2>

          <SearchIdea />
        </div>
      </div>

      <div className="mx-auto max-w-7xl mb-20 px-5 lg:px-0">
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CategoryFilter />

            <FilterByDate />
        </div>

        <div className="relative">
            {ideas.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {ideas.map((idea) => (
                  <IdeaCard key={idea._id} idea={idea} />
                ))}
              </div>
            ) : (
              !loading && <NoData />
            )}

            {/* Loading overlay (non-blocking) */}
            {loading && (
              <div className="absolute inset-0 flex justify-center items-start pt-10 bg-white/40 backdrop-blur-[1px]">
                <LoadingSpinner />
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default IdeaPage;