"use client"

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import IdeaCard from "@/components/Idea/IdeaCard";
import NoData from "@/components/shared/NoData";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const { data: tokenData } = await authClient.token()

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favourite`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        }
      )

      const data = await response.json()

      setFavorites(data.favorites || [])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="bg-linear-to-r from-white to-[#fff4f8] relative overflow-hidden pt-32 pb-40">

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-5 py-4 rounded-lg bg-white/70 backdrop-blur-xl border border-pink-100 shadow-md mb-8">
            <span className="w-2 h-2 rounded-lg bg-[#810B38] animate-pulse"></span>

            <span className="text-sm font-semibold tracking-wide text-[#810B38]">
              Favorites
            </span>
          </div>

          {/* HEADING */}
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">
            Explore your{" "}
            <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
              favourite ideas
            </span>
            !
          </h2>

          {/* SUBTEXT */}
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-zinc-500">
            Quickly access the ideas you love most. Keep track of inspiration and revisit what truly matters to you.
          </p>

        </div>

        {/* MODERN CURVE */}
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

      <div className="mx-auto max-w-7xl px-5 lg:px-0 mb-20">
        {favorites.length === 0 ? (
          <div className="mt-20">
            <NoData />
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...new Map(favorites.map(favorite => [favorite._id, favorite])).values()].map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage