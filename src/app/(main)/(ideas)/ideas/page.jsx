import IdeaCard from "@/components/Idea/IdeaCard"
import SearchIdea from "@/components/Idea/Search/SearchIdea"
import CategoryFilter from "@/components/Idea/Search/CategoryFilter"
import NoData from "@/components/shared/NoData"
import FilterByDate from "@/components/Idea/Search/FilterByDate"

const IdeaPage = async ({ searchParams }) => {
  const search = searchParams?.search || ""
  const category = searchParams?.category || ""
  const startDate = searchParams?.startDate || ""
  const endDate = searchParams?.endDate || ""

  let ideas = []

  try {
    const params = new URLSearchParams({
      search,
      category,
      startDate,
      endDate,
    })

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/search?${params.toString()}`,
      {
        cache: "no-store",
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch ideas")
    }

    const data = await res.json()

    ideas = data?.data || []
  } catch (error) {
    console.error(error)
  }

  return (
    <div className="text-base">
      {/* HEADER SECTION */}
      <div className="bg-linear-to-r from-white to-[#fff4f8] relative overflow-hidden pt-32 pb-40">

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-5 py-4 rounded-lg bg-white/70 backdrop-blur-xl border border-pink-100 shadow-md mb-8">
            <span className="w-2 h-2 rounded-lg bg-[#810B38] animate-pulse"></span>

            <span className="text-sm font-semibold tracking-wide text-[#810B38]">
              Idea Discovery
            </span>
          </div>

          {/* HEADING */}
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">
            Explore{" "}
            <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Ideas
            </span>
            {" "}and find one for you!
          </h2>

          {/* TEXT */}
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-zinc-500">
            Discover startup ideas tailored to your curiosity, skills, and ambition.
            Search, explore, and start building something meaningful today.
          </p>

          {/* SEARCH */}
          <div className="mt-10">
            <SearchIdea />
          </div>

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

      <div className="mx-auto max-w-7xl my-20 px-5 lg:px-0">
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CategoryFilter />

          <FilterByDate />
        </div>

        {ideas.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  )
}

export default IdeaPage

// "use client";

// import IdeaCard from "@/components/Idea/IdeaCard";
// import SearchIdea from "@/components/Idea/Search/SearchIdea";
// import CategoryFilter from "@/components/Idea/Search/CategoryFilter";
// import NoData from "@/components/shared/NoData";
// import FilterByDate from "@/components/Idea/Search/FilterByDate";

// import { useEffect, useState, useCallback } from "react";
// import LoadingSpinner from "@/components/shared/LoadingSpinner";
// import { useSearchParams } from "next/navigation";

// const IdeaPage = () => {
//   const searchParams = useSearchParams();

//   const search = searchParams.get("search") || "";
//   const category = searchParams.get("category") || "";
//   const startDate = searchParams.get("startDate") || "";
//   const endDate = searchParams.get("endDate") || "";

//   const [ideas, setIdeas] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchIdeas = useCallback(async () => {
//   try {
//     setLoading(true);

//     const params = new URLSearchParams({
//       search,
//       category,
//       startDate,
//       endDate,
//     });

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/search?${params.toString()}`
//     );

//     if (!res.ok) throw new Error("API failed");

//     const data = await res.json();

//     setIdeas(data?.data || []);
//   } catch (err) {
//     console.error(err);
//     setIdeas([]);
//   } finally {
//     setLoading(false);
//   }
// }, [search, category, startDate, endDate]);

//   useEffect(() => {
//     fetchIdeas();
//   }, [fetchIdeas, search, category, startDate, endDate]);

//   return (
//     <div className="">
//       {/* HEADER SECTION */}
//       <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
//         <div className="mx-auto max-w-7xl">
//           <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 ">
//             Explore Ideas and find one for you!
//           </h2>

//           <SearchIdea />
//         </div>
//       </div>

//       <div className="mx-auto max-w-7xl mb-20 px-5 lg:px-0">
//         <div className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <CategoryFilter />

//             <FilterByDate />
//         </div>

//         <div className="relative">
//             {ideas.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//                 {ideas.map((idea) => (
//                   <IdeaCard key={idea._id} idea={idea} />
//                 ))}
//               </div>
//             ) : (
//               !loading && <NoData />
//             )}

//             {/* Loading overlay (non-blocking) */}
//             {loading && (
//               <div className="absolute inset-0 flex justify-center items-start pt-10 bg-white/40 backdrop-blur-[1px]">
//                 <LoadingSpinner />
//               </div>
//             )}
//           </div>
//       </div>
//     </div>
//   );
// };

// export default IdeaPage;