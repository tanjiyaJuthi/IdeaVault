"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import toast from "react-hot-toast";
import { authClient } from "../../app/lib/auth-client";
import { useFavorites } from "@/context/FavouriteContext";

const IdeaCard = ({ idea }) => {
  const { favoriteIds, setFavoriteIds } = useFavorites();
  const isFavorite = favoriteIds?.includes(idea._id);

  const handleFavorite = async () => {
    const previousFavorites = [...favoriteIds];

    if (isFavorite) {
      setFavoriteIds((prev) => prev.filter((id) => id !== idea._id));
    } else {
      setFavoriteIds((prev) => [...prev, idea._id]);
    }

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favourite/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            ideaId: idea._id,
          }),
        }
      );

      const data = await res.json();

      if (data.isFavorite) {
        toast.success("Added to favorites ❤️");
      } else {
        toast.success("Removed from favorites 💔");
      }
    } catch (err) {
      setFavoriteIds(previousFavorites);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card
      className="
        group overflow-hidden rounded-lg
        border-0 shadow-none
        bg-white/70 backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-2
        p-0 ring-gray-100
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <Image
          src={
            idea?.imageUrl?.startsWith("http")
              ? idea.imageUrl
              : "/fallback.jpg"
          }
          alt={idea?.ideaTitle || "Idea Image"}
          width={1200}
          height={600}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

        {/* FAVORITE BUTTON */}
        <button
          onClick={handleFavorite}
          className="
            absolute top-4 right-4
            w-10 h-10
            rounded-xl
            bg-white/80 backdrop-blur-md
            flex items-center justify-center
            shadow-sm
            transition hover:scale-105
          "
        >
          {isFavorite ? (
            <MdFavorite className="text-[#810B38] text-xl" />
          ) : (
            <GrFavorite className="text-zinc-700 text-xl" />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <CardContent className="p-6 flex flex-col gap-3">
        {/* TITLE */}
        <h2 className="text-xl font-bold text-[#2b0a18] line-clamp-1">
          {idea.ideaTitle}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm leading-relaxed text-zinc-600 line-clamp-2">
          {idea.shortDescription}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-6">
          <Link
            href={`/ideas/${idea._id}`}
            className="
              inline-flex items-center gap-2
              text-[#810B38]
              font-semibold text-sm
              transition-all duration-300
              hover:gap-3
            "
          >
            Know More
            <IoArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaCard;