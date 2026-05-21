"use client";

import IdeaCard from "@/components/Idea/IdeaCard";
import SearchIdea from "@/components/Idea/Search/SearchIdea";
import CategoryFilter from "@/components/Idea/Search/CategoryFilter";
import NoData from "@/components/shared/NoData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const IdeaPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIdeas = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/search?${params.toString()}`
      );

      const data = await res.json();

      if (data.success) {
        setIdeas(data.data);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [search, category, startDate, endDate]);

  return (
    <div>
      {/* HERO */}
      <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
        <div className="mx-auto max-w-7xl">

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
            Explore Ideas and find one for you!
          </h2>

          {/* FILTER BAR */}
          <div className="flex justify-center">
            <div className="flex h-12 w-200 overflow-hidden rounded-lg border border-gray-300 bg-white">

              <SearchIdea />
              <div className="w-px bg-gray-300" />
              <CategoryFilter />

            </div>
          </div>

        </div>
      </div>

      {/* GRID */}
      <div className="mx-auto max-w-7xl mb-20 px-5 lg:px-0">

        {loading ? (
          <p>Loading...</p>
        ) : ideas.length === 0 ? (
          <NoData />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default IdeaPage;